import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { PromotionalCarousel } from '../components/PromotionalCarousel';
import { WinnerTicker } from '../components/WinnerTicker';
import { QuickActionCard } from '../components/QuickActionCard';
import { VipPromoBanner } from '../components/VipPromoBanner';
import { LotteryCard } from '../components/LotteryCard';
import { GameCard } from '../components/GameCard';
import { DepositButton } from '../components/DepositButton';
import { BottomNavigation } from '../components/BottomNavigation';
import { KERALA_LOTTERIES, POPULAR_GAMES } from '../data/lotteryData';
import { ArrowRight, Info, ShieldCheck, Flame } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#EEF2F3] pb-24 text-[#242424]">
      {/* A. Top Header */}
      <AppHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />

      {/* Main Container Container */}
      <main className="max-w-md mx-auto px-3.5 pt-1 space-y-3">
        
        {/* B. Hero Promotional Carousel */}
        <PromotionalCarousel />

        {/* C. Winner Announcement Ticker */}
        <WinnerTicker />

        {/* D. Four Quick Actions */}
        <QuickActionCard />

        {/* E. VIP Promotional Banner */}
        <VipPromoBanner />

        {/* F. Kerala Lotteries Carousel Section */}
        <section className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-5 bg-[#F36B16] rounded-full" />
              <h2 className="font-extrabold text-base text-slate-900 tracking-tight">
                Kerala Lotteries
              </h2>
            </div>
            <button
              onClick={() => navigate('/lotteries')}
              className="text-xs font-bold text-[#F36B16] hover:underline flex items-center gap-1"
            >
              <span>See All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Horizontal Scroll Cards */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none pt-1">
            {KERALA_LOTTERIES.map((lottery) => (
              <LotteryCard key={lottery.id} lottery={lottery} />
            ))}
          </div>
        </section>

        {/* G. Most Popular Games Section */}
        <section className="space-y-2.5 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Flame className="w-5 h-5 text-red-600 fill-red-600 animate-pulse" />
              <h2 className="font-extrabold text-base text-slate-900 tracking-tight">
                Most Popular Games
              </h2>
            </div>
            <span className="text-[11px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
              Instant Rewards
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {POPULAR_GAMES.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Legal Disclaimer Box */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-3 border border-slate-200/60 my-4 text-[11px] text-slate-500 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-700 font-bold">
            <Info className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span>Fair Play & Verified Results</span>
          </div>
          <p className="leading-relaxed text-[10px]">
            Kerala Lottery Live provides user access to live draw details, ticket results, and wallet management. Please play responsibly. 18+ only.
          </p>
        </div>

      </main>

      {/* H. Floating Deposit Button */}
      <DepositButton />

      {/* I. Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};
