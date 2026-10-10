import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import useAuth from '../hooks/useAuth';
import { Crown, Sparkles, ShieldCheck, Check, ArrowLeft, Trophy } from 'lucide-react';

export const VipTicketsPage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, updateProfileData } = useAuth();
  const [upgrading, setUpgrading] = useState(false);
  const [msg, setMsg] = useState('');

  const vipTiers = [
    {
      name: 'Bronze VIP',
      price: 'Free',
      bonus: '5% Extra Deposit Cashback',
      perks: ['Daily Check-in Rewards', '3 Daily Lucky Spins', 'Standard Draw Access'],
      color: 'from-amber-700 to-yellow-800'
    },
    {
      name: 'Gold VIP Pass',
      price: '₹299 / Mo',
      bonus: '20% Extra Deposit Cashback + Bumper Allocation',
      perks: ['Priority ₹25 Cr Bumper Ticket Queue', '10 Daily Lucky Spins', 'Exclusive VIP Ticket Discount', 'Dedicated WhatsApp Support'],
      color: 'from-amber-500 via-orange-500 to-yellow-500',
      isHot: true
    },
    {
      name: 'Platinum VIP',
      price: '₹999 / Mo',
      bonus: '35% Extra Deposit Cashback + Free Bumper Ticket',
      perks: ['1 Free Mega Bumper Ticket Every Month', 'Unlimited Daily Lucky Spins', 'Zero Withdrawal Processing Fees', 'Personal Relationship Manager'],
      color: 'from-purple-600 via-indigo-600 to-blue-700'
    }
  ];

  const handleClaimVip = async (tierName: string) => {
    setUpgrading(true);
    try {
      await updateProfileData({ vipStatus: tierName as any });
      setMsg(`Success! You have activated ${tierName}. Enjoy your VIP benefits!`);
    } catch (err: any) {
      console.error('VIP upgrade error:', err);
    } finally {
      setUpgrading(false);
    }
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
          
          <span className="text-xs font-extrabold text-amber-900 bg-yellow-300 px-3 py-1 rounded-full border border-yellow-400 flex items-center gap-1 shadow-sm">
            <Crown className="w-3.5 h-3.5 fill-amber-900" />
            Tier: {userProfile?.vipStatus || 'Free'}
          </span>
        </div>

        {/* Hero Card */}
        <div className="bg-gradient-to-r from-red-700 via-orange-600 to-amber-600 rounded-2xl p-5 text-white shadow-lg space-y-2 relative overflow-hidden">
          <div className="inline-flex items-center gap-1 bg-yellow-400 text-slate-950 px-2.5 py-0.5 rounded-full font-black text-[10px]">
            <Crown className="w-3 h-3 fill-slate-900" />
            VIP CLUB PRIVILEGES
          </div>
          <h2 className="text-xl font-black text-white">
            Unlock Priority Bumper Ticket Allocations & Weekly Cashback!
          </h2>
          <p className="text-xs text-amber-100 font-medium">
            Join thousands of Kerala Lottery Live VIP members enjoying higher cash rewards and guaranteed draw allocations.
          </p>
        </div>

        {msg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-3 rounded-xl text-center shadow-sm">
            {msg}
          </div>
        )}

        {/* VIP Tier Cards */}
        <div className="space-y-3 pt-1">
          {vipTiers.map((tier) => (
            <div 
              key={tier.name}
              className={`bg-white rounded-2xl p-4 shadow-sm border border-slate-200 relative overflow-hidden space-y-3 ${
                tier.isHot ? 'ring-2 ring-yellow-400' : ''
              }`}
            >
              {tier.isHot && (
                <span className="absolute top-0 right-0 bg-yellow-400 text-slate-950 text-[9px] font-black px-3 py-0.5 rounded-bl-xl uppercase tracking-wider shadow-sm">
                  MOST POPULAR
                </span>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-amber-500 fill-amber-500" />
                    {tier.name}
                  </h3>
                  <p className="text-xs font-black text-[#F36B16] mt-0.5">{tier.bonus}</p>
                </div>
                <span className="text-xs font-black text-slate-800 bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200">
                  {tier.price}
                </span>
              </div>

              <div className="space-y-1.5 pt-1 border-t border-slate-100 text-xs text-slate-700">
                {tier.perks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-medium text-[11px]">{perk}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleClaimVip(tier.name)}
                disabled={upgrading || userProfile?.vipStatus === tier.name}
                className={`w-full py-2.5 rounded-xl font-extrabold text-xs shadow-md transition-all ${
                  userProfile?.vipStatus === tier.name
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-gradient-to-r from-[#F36B16] to-[#C95C2D] text-white hover:from-orange-600 hover:to-orange-700 active:scale-95'
                }`}
              >
                {userProfile?.vipStatus === tier.name ? 'ACTIVE TIER' : `UPGRADE TO ${tier.name.toUpperCase()}`}
              </button>
            </div>
          ))}
        </div>

      </main>

      <BottomNavigation />
    </div>
  );
};
