import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import useAuth from '../hooks/useAuth';
import { ConfirmModal } from '../components/ConfirmModal';
import { User, Wallet, History, Headphones, ShieldAlert, FileText, Lock, LogOut, Edit3, Crown, ChevronRight, ArrowLeft } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutConfirm = async () => {
    setShowLogoutModal(false);
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#EEF2F3] pb-24 text-[#242424]">
      <AppHeader />

      <main className="max-w-md mx-auto px-3.5 pt-3 space-y-3">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4 text-[#F36B16]" />
            <span>Home</span>
          </button>
          
          <button
            onClick={() => navigate('/edit-profile')}
            className="text-xs font-bold text-[#F36B16] bg-orange-100 px-3 py-1 rounded-full border border-orange-200 flex items-center gap-1"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Profile
          </button>
        </div>

        {/* User Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center gap-3.5">
          <img 
            src={userProfile?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile?.uid}`}
            alt={userProfile?.displayName}
            className="w-14 h-14 rounded-full border-2 border-[#F36B16] bg-orange-50 shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <h2 className="font-extrabold text-base text-slate-900 truncate">
              {userProfile?.displayName || 'User Profile'}
            </h2>
            <p className="text-xs text-slate-500 font-medium truncate">
              {userProfile?.email}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-extrabold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300 flex items-center gap-1">
                <Crown className="w-3 h-3 text-amber-600 fill-amber-600" />
                {userProfile?.vipStatus || 'Free VIP'}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Joined {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : '2026'}
              </span>
            </div>
          </div>
        </div>

        {/* Wallet Quick Balance Box */}
        <div 
          onClick={() => navigate('/wallet')}
          className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-2xl p-4 shadow-md cursor-pointer flex items-center justify-between border border-slate-800 hover:border-orange-400 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 text-slate-950 flex items-center justify-center font-extrabold">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">YOUR WALLET BALANCE</p>
              <p className="text-xl font-black text-yellow-300">
                {formatCurrency(userProfile?.walletBalance || 0)}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </div>

        {/* Settings Links List */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-200 divide-y divide-slate-100 text-xs font-bold text-slate-800">
          
          <button 
            onClick={() => navigate('/transactions')}
            className="w-full p-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <History className="w-4 h-4 text-[#F36B16]" />
              <span>Transaction History</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button 
            onClick={() => navigate('/vip-tickets')}
            className="w-full p-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Crown className="w-4 h-4 text-amber-500" />
              <span>VIP Pass Privileges</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button 
            onClick={() => navigate('/support')}
            className="w-full p-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Headphones className="w-4 h-4 text-[#F36B16]" />
              <span>Customer Support & Helpline</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button 
            onClick={() => navigate('/responsible-play')}
            className="w-full p-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
              <span>18+ Responsible Play</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button 
            onClick={() => navigate('/terms')}
            className="w-full p-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Terms of Service & Rules</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button 
            onClick={() => navigate('/privacy')}
            className="w-full p-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-slate-500" />
              <span>Privacy Policy</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-extrabold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <LogOut className="w-4 h-4" />
          <span>LOGOUT FROM ACCOUNT</span>
        </button>

      </main>

      <ConfirmModal
        isOpen={showLogoutModal}
        title="Logout Confirmation"
        message="Are you sure you want to log out of Kerala Lottery Live?"
        confirmText="Logout"
        cancelText="Cancel"
        isDanger={true}
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutModal(false)}
      />

      <BottomNavigation />
    </div>
  );
};
