import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { Bell, CheckCheck, ArrowLeft, Ticket, Gift, Wallet } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Welcome Bonus Credited!',
      message: '₹100 Welcome Bonus has been credited to your wallet balance. Check your balance now!',
      time: 'Just now',
      read: false,
      type: 'reward'
    },
    {
      id: '2',
      title: 'Akshaya AK-680 Live Result Out',
      message: 'Today\'s Akshaya draw results are live. Check if your ticket won 1st prize ₹70 Lakhs!',
      time: '2 hours ago',
      read: false,
      type: 'ticket'
    },
    {
      id: '3',
      title: 'Daily Check-in Streak Reminder',
      message: 'Don\'t forget to claim your Day 1 Check-In bonus before midnight!',
      time: '5 hours ago',
      read: true,
      type: 'general'
    }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
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
            onClick={markAllRead}
            className="text-xs font-bold text-[#F36B16] bg-orange-100 px-3 py-1 rounded-full border border-orange-200 flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark All Read
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-2.5">
          {notifications.map((n) => (
            <div 
              key={n.id}
              className={`rounded-2xl p-4 border transition-all flex items-start gap-3 shadow-sm ${
                n.read ? 'bg-white border-slate-200' : 'bg-orange-50/60 border-orange-200 ring-1 ring-orange-300'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#F36B16] to-[#C95C2D] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                {n.type === 'reward' ? <Gift className="w-4 h-4" /> : n.type === 'ticket' ? <Ticket className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
              </div>

              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-xs text-slate-900">{n.title}</h3>
                  <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {n.message}
                </p>
              </div>
            </div>
          ))}
        </div>

      </main>

      <BottomNavigation />
    </div>
  );
};
