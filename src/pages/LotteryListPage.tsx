import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { KERALA_LOTTERIES } from '../data/lotteryData';
import { LotteryCard } from '../components/LotteryCard';
import { Ticket, ArrowLeft, Filter, Sparkles } from 'lucide-react';

export const LotteryListPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'weekly' | 'bumper'>('all');

  const filteredLotteries = KERALA_LOTTERIES.filter(item => {
    if (filter === 'weekly') return !item.isBumper;
    if (filter === 'bumper') return item.isBumper;
    return true;
  });

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
          <div className="flex items-center gap-1">
            <Ticket className="w-4 h-4 text-[#F36B16]" />
            <h2 className="font-extrabold text-[#F36B16] text-sm">All Kerala Draws</h2>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'all' ? 'bg-[#F36B16] text-white shadow-sm' : 'text-slate-600'
            }`}
          >
            All Draws
          </button>
          <button
            onClick={() => setFilter('weekly')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'weekly' ? 'bg-[#F36B16] text-white shadow-sm' : 'text-slate-600'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setFilter('bumper')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'bumper' ? 'bg-[#F36B16] text-white shadow-sm' : 'text-slate-600'
            }`}
          >
            Bumper Draws
          </button>
        </div>

        {/* List Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {filteredLotteries.map((lottery) => (
            <div key={lottery.id} className="w-full flex justify-center">
              <LotteryCard lottery={lottery} />
            </div>
          ))}
        </div>

      </main>

      <BottomNavigation />
    </div>
  );
};
