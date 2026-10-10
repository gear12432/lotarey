import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  signInWithPopup
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  onSnapshot, 
  updateDoc, 
  getDoc,
  serverTimestamp,
  collection,
  addDoc
} from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../lib/firebase';
import { UserProfile } from '../types/user';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (name: string, email: string, pass: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfileData: (data: Partial<UserProfile>) => Promise<void>;
  updateWalletBalance: (deltaAmount: number, description: string, type: 'deposit' | 'withdrawal' | 'ticket_purchase' | 'checkin_reward' | 'spin_reward' | 'lottery_win', reference?: string) => Promise<boolean>;
  claimDailyCheckIn: () => Promise<{ success: boolean; reward: number; message: string }>;
  spinLuckyWheel: () => Promise<{ success: boolean; reward: number; prizeName: string; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        const userRef = doc(db, 'users', user.uid);
        
        // Listen to realtime user profile changes
        unsubscribeProfile = onSnapshot(
          userRef,
          async (snapshot) => {
            if (snapshot.exists()) {
              setUserProfile({ uid: user.uid, ...snapshot.data() } as UserProfile);
            } else {
              // Create default profile if not exists
              const todayStr = new Date().toISOString().split('T')[0];
              const newProfile: Omit<UserProfile, 'uid'> = {
                displayName: user.displayName || user.email?.split('@')[0] || 'User',
                email: user.email || '',
                photoURL: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`,
                walletBalance: 100, // Welcome ₹100 starting bonus
                vipStatus: 'Free',
                checkInStreak: 0,
                spinsLeftToday: 3,
                createdAt: new Date().toISOString(),
                lastCheckInDate: '',
              };
              try {
                await setDoc(userRef, newProfile);
                setUserProfile({ uid: user.uid, ...newProfile });
              } catch (err) {
                console.error("Failed to set user profile:", err);
              }
            }
            setLoading(false);
          },
          (error) => {
            console.error("User profile snapshot error:", error);
            setLoading(false);
          }
        );
      } else {
        if (unsubscribeProfile) unsubscribeProfile();
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  const signIn = async (email: string, pass: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const signUp = async (name: string, email: string, pass: string) => {
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      const userRef = doc(db, 'users', cred.user.uid);
      const todayStr = new Date().toISOString().split('T')[0];
      
      const newProfile: Omit<UserProfile, 'uid'> = {
        displayName: name.trim(),
        email: email.trim().toLowerCase(),
        photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cred.user.uid}`,
        walletBalance: 100, // ₹100 Welcome Bonus
        vipStatus: 'Free',
        checkInStreak: 0,
        spinsLeftToday: 3,
        createdAt: new Date().toISOString(),
        lastCheckInDate: '',
      };

      await setDoc(userRef, newProfile);

      // Log welcome transaction
      const transRef = collection(db, 'transactions');
      await addDoc(transRef, {
        userId: cred.user.uid,
        type: 'checkin_reward',
        amount: 100,
        status: 'completed',
        reference: `WEL-${Date.now()}`,
        description: 'Welcome Bonus ₹100',
        createdAt: new Date().toISOString()
      });

    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const updateProfileData = async (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    const userRef = doc(db, 'users', currentUser.uid);
    try {
      await updateDoc(userRef, {
        ...data,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${currentUser.uid}`);
    }
  };

  const updateWalletBalance = async (
    deltaAmount: number, 
    description: string, 
    type: 'deposit' | 'withdrawal' | 'ticket_purchase' | 'checkin_reward' | 'spin_reward' | 'lottery_win',
    reference?: string
  ): Promise<boolean> => {
    if (!currentUser || !userProfile) return false;

    const newBalance = userProfile.walletBalance + deltaAmount;
    if (newBalance < 0) {
      throw new Error('Insufficient wallet balance');
    }

    const userRef = doc(db, 'users', currentUser.uid);
    const transRef = collection(db, 'transactions');

    try {
      // Update balance
      await updateDoc(userRef, {
        walletBalance: newBalance,
        updatedAt: new Date().toISOString()
      });

      // Log transaction
      await addDoc(transRef, {
        userId: currentUser.uid,
        type,
        amount: deltaAmount,
        status: 'completed',
        reference: reference || `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        description,
        createdAt: new Date().toISOString()
      });

      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${currentUser.uid}`);
      return false;
    }
  };

  const claimDailyCheckIn = async () => {
    if (!currentUser || !userProfile) {
      return { success: false, reward: 0, message: 'Please login first' };
    }

    const todayStr = new Date().toISOString().split('T')[0];
    if (userProfile.lastCheckInDate === todayStr) {
      return { success: false, reward: 0, message: 'You have already checked in today!' };
    }

    const newStreak = (userProfile.checkInStreak || 0) + 1;
    // Reward schedule: Day 1: ₹10, Day 2: ₹15, Day 3: ₹20, Day 4: ₹25, Day 5: ₹30, Day 6: ₹40, Day 7: ₹100!
    const streakRewardMap = [10, 15, 20, 25, 30, 40, 100];
    const rewardAmount = streakRewardMap[(newStreak - 1) % 7];

    const userRef = doc(db, 'users', currentUser.uid);
    try {
      await updateDoc(userRef, {
        walletBalance: (userProfile.walletBalance || 0) + rewardAmount,
        lastCheckInDate: todayStr,
        checkInStreak: newStreak,
        spinsLeftToday: (userProfile.spinsLeftToday || 0) + 1, // Bonus 1 spin on check-in
        updatedAt: new Date().toISOString()
      });

      const transRef = collection(db, 'transactions');
      await addDoc(transRef, {
        userId: currentUser.uid,
        type: 'checkin_reward',
        amount: rewardAmount,
        status: 'completed',
        reference: `CHK-${Date.now()}`,
        description: `Day ${newStreak} Check-in Bonus`,
        createdAt: new Date().toISOString()
      });

      return { 
        success: true, 
        reward: rewardAmount, 
        message: `Success! Claimed ₹${rewardAmount} Day ${newStreak} Check-in Bonus!` 
      };
    } catch (error) {
      console.error('Check-in error:', error);
      return { success: false, reward: 0, message: 'Failed to claim check-in reward' };
    }
  };

  const spinLuckyWheel = async () => {
    if (!currentUser || !userProfile) {
      return { success: false, reward: 0, prizeName: '', message: 'Please login first' };
    }

    if ((userProfile.spinsLeftToday || 0) <= 0) {
      return { success: false, reward: 0, prizeName: '', message: 'No spins left today! Check in tomorrow for more.' };
    }

    // Wheel prizes probabilities
    const prizes = [
      { name: '₹10 Cash', reward: 10, prob: 0.3 },
      { name: '₹20 Cash', reward: 20, prob: 0.25 },
      { name: '₹50 Cash', reward: 50, prob: 0.15 },
      { name: '₹100 Jackpot', reward: 100, prob: 0.05 },
      { name: '₹5 Cash', reward: 5, prob: 0.2 },
      { name: 'VIP Points', reward: 15, prob: 0.05 }
    ];

    const rand = Math.random();
    let cumulative = 0;
    let selectedPrize = prizes[0];

    for (const p of prizes) {
      cumulative += p.prob;
      if (rand <= cumulative) {
        selectedPrize = p;
        break;
      }
    }

    const userRef = doc(db, 'users', currentUser.uid);
    try {
      const remainingSpins = userProfile.spinsLeftToday - 1;
      const newBal = (userProfile.walletBalance || 0) + selectedPrize.reward;

      await updateDoc(userRef, {
        walletBalance: newBal,
        spinsLeftToday: remainingSpins,
        updatedAt: new Date().toISOString()
      });

      if (selectedPrize.reward > 0) {
        const transRef = collection(db, 'transactions');
        await addDoc(transRef, {
          userId: currentUser.uid,
          type: 'spin_reward',
          amount: selectedPrize.reward,
          status: 'completed',
          reference: `SPN-${Date.now()}`,
          description: `Lucky Spin Prize: ${selectedPrize.name}`,
          createdAt: new Date().toISOString()
        });
      }

      return {
        success: true,
        reward: selectedPrize.reward,
        prizeName: selectedPrize.name,
        message: `Won ${selectedPrize.name}!`
      };
    } catch (error) {
      console.error('Lucky spin error:', error);
      return { success: false, reward: 0, prizeName: '', message: 'Failed to spin wheel' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        signIn,
        signUp,
        loginWithGoogle,
        logout,
        resetPassword,
        updateProfileData,
        updateWalletBalance,
        claimDailyCheckIn,
        spinLuckyWheel,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
