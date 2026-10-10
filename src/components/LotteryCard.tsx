import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Ticket, Trophy, ArrowRight } from 'lucide-react';
import { LotteryDraw } from '../types/lottery';
import { calculateCountdown } from '../utils/dateUtils';

interface LotteryCardProps {
  lottery: LotteryDraw;
}

export const LotteryCard: React.FC<LotteryCardProps> = ({ lottery }) => {
  const navigate = useNavigate();
  const countdown = calculateCountdown(`${lottery.drawDate} ${lottery.drawTime}`);

  return (
    <div className="shrink-0 w-64 bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200/80 hover:border-orange-300 hover:shadow-md transition-all flex flex-col justify-between relative group">
      
      {/* Top Header Badge */}
      <div className="flex items-center justify-between mb-2">
        <span className="bg-orange-100 text-[#F36B16] text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-orange-200">
          {lottery.code}
        </span>
        
        {lottery.isBumper ? (
          <span className="bg-red-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full animate-pulse shadow-sm">
            MEGA BUMPER
          </span>
        ) : (
          <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            {lottery.day}
          </span>
        )}
      </div>

      {/* Title & Prize */}
      <div className="my-1">
        <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-[#F36B16] transition-colors leading-snug">
          {lottery.name}
        </h3>
        
        <div className="mt-1.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 p-2 rounded-xl flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-yellow-400 text-slate-900 flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
            <Trophy className="w-4 h-4 text-orange-700" />
          </div>
          <div>
            <p className="text-[9px] uppercase font-bold text-amber-800">First Prize</p>
            <p className="text-sm font-black text-[#F36B16] leading-none">
              {lottery.firstPrize}
            </p>
          </div>
        </div>
      </div>

      {/* Countdown & Price */}
      <div className="my-2.5 space-y-1.5 text-xs text-slate-600">
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 bg-slate-50 p-1.5 rounded-lg">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-orange-500" />
            Draw Countdown:
          </span>
          <span className="font-bold text-slate-800">
            {countdown.isExpired ? (
              <span className="text-emerald-600 font-extrabold">LIVE NOW</span>
            ) : (
              `${countdown.hours}h ${countdown.minutes}m`
            )}
          </span>
        </div>

        <div className="flex items-center justify-between font-semibold text-slate-700 px-0.5">
          <span className="flex items-center gap-1 text-[11px] text-slate-500">
            <Ticket className="w-3 h-3 text-slate-400" />
            Ticket Price:
          </span>
          <span className="font-extrabold text-slate-900 text-xs">
            ₹{lottery.ticketPrice}
          </span>
        </div>
      </div>

      {/* Buy / View Button */}
      <button
        onClick={() => navigate(`/lottery/${lottery.id}`)}
        className="w-full bg-gradient-to-r from-[#F36B16] to-[#C95C2D] hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-xs py-2 px-3 rounded-xl shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all"
      >
        <span>View Details & Buy</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
