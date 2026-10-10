import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const VipPromoBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-700 via-orange-600 to-amber-600 text-white p-4 shadow-md my-3 border border-yellow-300/30">
      {/* Decorative Golden Ticket Edge */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#EEF2F3]" />
      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#EEF2F3]" />

      <div className="flex items-center justify-between gap-3 pl-2 pr-2">
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="bg-yellow-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 uppercase tracking-wider">
              <Crown className="w-3 h-3 text-slate-900 fill-slate-900" />
              VIP TICKET PASS
            </span>
            <span className="text-[10px] text-yellow-200 font-semibold animate-pulse flex items-center gap-0.5">
              <Sparkles className="w-3 h-3" />
              20% Bonus Cash
            </span>
          </div>

          <h3 className="text-sm sm:text-base font-extrabold leading-tight tracking-tight text-white drop-shadow">
            Get Priority Bumper Tickets & Weekly Cashback
          </h3>

          <p className="text-[11px] text-amber-100 font-medium">
            Unlock Gold VIP Tier • Exclusive ₹25 Cr Bumper Allocation
          </p>
        </div>

        {/* Claim / View VIP Button */}
        <button
          onClick={() => navigate('/vip-tickets')}
          className="shrink-0 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-1 active:scale-95 transition-all"
        >
          <span>Claim VIP</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
