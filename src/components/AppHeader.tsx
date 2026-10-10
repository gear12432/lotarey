import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCw, Bell, Headphones, User as UserIcon, Wallet } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { formatPrizeCompact } from '../utils/formatCurrency';

interface AppHeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onRefresh, isRefreshing }) => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#F36B16] via-[#E25A0B] to-[#C95C2D] text-white shadow-md">
      <div className="max-w-md mx-auto px-3 py-2.5 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-xl text-yellow-300 border border-white/30 shadow-inner group-hover:scale-105 transition-transform">
            KL
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight leading-none text-white drop-shadow-sm flex items-center gap-1">
              Kerala Lottery
              <span className="text-[10px] bg-red-600 font-bold uppercase text-white px-1.5 py-0.5 rounded-full animate-pulse border border-white/40">
                Live
              </span>
            </h1>
            <p className="text-[10px] text-orange-100 font-medium">Official Result & Play App</p>
          </div>
        </div>

        {/* Right Actions Header Icons */}
        <div className="flex items-center gap-1.5">
          {/* Refresh Icon */}
          <button
            onClick={() => {
              if (onRefresh) onRefresh();
              else window.location.reload();
            }}
            title="Refresh Data"
            className="p-1.5 rounded-full hover:bg-white/15 active:scale-95 transition-all text-white"
          >
            <RotateCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          {/* Support Icon */}
          <button
            onClick={() => navigate('/support')}
            title="Customer Support"
            className="p-1.5 rounded-full hover:bg-white/15 active:scale-95 transition-all text-white"
          >
            <Headphones className="w-4 h-4" />
          </button>

          {/* Notifications Icon with Badge */}
          <button
            onClick={() => navigate('/notifications')}
            title="Notifications"
            className="p-1.5 rounded-full hover:bg-white/15 active:scale-95 transition-all text-white relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-yellow-300 ring-2 ring-orange-600 animate-ping" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-yellow-300" />
          </button>

          {/* Balance / User Avatar */}
          {userProfile ? (
            <button
              onClick={() => navigate('/wallet')}
              className="flex items-center gap-1.5 bg-black/20 hover:bg-black/30 border border-white/20 pl-2 pr-2.5 py-1 rounded-full active:scale-95 transition-all"
            >
              <div className="w-5 h-5 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center font-bold text-xs">
                <Wallet className="w-3 h-3 text-slate-900" />
              </div>
              <span className="text-xs font-bold text-yellow-300">
                {formatPrizeCompact(userProfile.walletBalance || 0)}
              </span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs px-2.5 py-1 rounded-full shadow-sm active:scale-95 transition-all"
            >
              <UserIcon className="w-3.5 h-3.5" />
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
