export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  phone?: string;
  state?: string;
  walletBalance: number;
  vipStatus?: 'Free' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  lastCheckInDate?: string;
  checkInStreak: number;
  spinsLeftToday: number;
  createdAt: string;
  updatedAt?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type?: 'general' | 'reward' | 'ticket' | 'deposit' | 'withdrawal';
}

export interface SupportTicket {
  id: string;
  userId: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
}
