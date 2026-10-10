import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PlusCircle, Wallet } from 'lucide-react';
import useAuth from '../hooks/useAuth';

export const DepositButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile } = useAuth();

  // Hide on deposit page itself or auth screens
  if (['/deposit', '/login', '/signup', '/splash'].includes(location.pathname)) {
    return null;
  }

  return (
    <div className="fixed bottom-16 right-3 z-40">
      <button
        onClick={() => navigate('/deposit')}
        className="group relative flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-700 text-white font-extrabold text-xs px-3.5 py-2.5 rounded-full shadow-lg shadow-emerald-600/30 border border-emerald-300/40 hover:scale-105 active:scale-95 transition-all"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
        </span>
        <PlusCircle className="w-4 h-4 text-yellow-300" />
        <span className="tracking-wide">DEPOSIT</span>
      </button>
    </div>
  );
};
