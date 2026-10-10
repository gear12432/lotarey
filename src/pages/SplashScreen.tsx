import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Ticket, Sparkles, ShieldCheck } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        if (currentUser) {
          navigate('/', { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loading, currentUser, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F36B16] via-[#E25A0B] to-[#C95C2D] text-white flex flex-col items-center justify-between p-6 relative overflow-hidden">
      
      {/* Background Decorative Art */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-12 -left-12 w-60 h-60 rounded-full bg-yellow-400/10 blur-3xl" />

      {/* Top Branding Tag */}
      <div className="pt-8 text-center z-10">
        <span className="text-[10px] font-black uppercase tracking-widest bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-yellow-300 flex items-center gap-1.5 justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-yellow-300" />
          KERALA LOTTERY LIVE USER APP
        </span>
      </div>

      {/* Center Hero Icon */}
      <div className="flex flex-col items-center text-center z-10 my-auto">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-3xl bg-white text-slate-900 flex items-center justify-center font-black text-4xl shadow-2xl shadow-black/30 border-2 border-yellow-300">
            KL
          </div>
          <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-slate-950 p-2 rounded-2xl shadow-lg border-2 border-white animate-bounce">
            <Ticket className="w-5 h-5" />
          </div>
        </div>

        <h1 className="text-2xl font-black tracking-tight text-white drop-shadow-md">
          Kerala Lottery Live
        </h1>
        <p className="text-xs text-orange-100 font-medium mt-1 max-w-xs">
          Realtime Draw Results, Live Winning Updates & Instant Rewards
        </p>
      </div>

      {/* Bottom Loading Indicator */}
      <div className="pb-8 w-full max-w-xs text-center z-10 space-y-3">
        <div className="w-8 h-8 border-3 border-white/30 border-t-yellow-300 rounded-full animate-spin mx-auto" />
        <p className="text-[11px] font-semibold text-orange-200 animate-pulse">
          Connecting to Firebase Database...
        </p>
      </div>
    </div>
  );
};
