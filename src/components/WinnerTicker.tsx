import React, { useState } from 'react';
import { Volume2, Pause, Play } from 'lucide-react';
import { SAMPLE_TICKER_WINNERS } from '../data/lotteryData';

export const WinnerTicker: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-orange-200/80 p-2 my-2 flex items-center gap-2 overflow-hidden">
      {/* Icon Label */}
      <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-[11px] px-2 py-1 rounded-lg shrink-0 shadow-sm">
        <Volume2 className="w-3.5 h-3.5 animate-bounce" />
        <span>WINNERS</span>
      </div>

      {/* Ticker Content */}
      <div 
        className="flex-1 overflow-hidden relative cursor-pointer"
        onClick={() => setIsPaused(!isPaused)}
      >
        <div 
          className={`whitespace-nowrap flex items-center gap-8 text-xs font-semibold text-slate-800 ${
            isPaused ? '' : 'animate-marquee'
          }`}
        >
          {SAMPLE_TICKER_WINNERS.concat(SAMPLE_TICKER_WINNERS).map((winner, idx) => (
            <span key={idx} className="inline-flex items-center gap-1">
              <span className="text-[#F36B16] font-extrabold">•</span>
              {winner}
            </span>
          ))}
        </div>
      </div>

      {/* Pause/Play Toggle */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        title={isPaused ? "Play ticker" : "Pause ticker"}
        className="text-slate-400 hover:text-slate-700 p-1 shrink-0 rounded-md hover:bg-slate-100 transition-colors"
      >
        {isPaused ? <Play className="w-3.5 h-3.5 text-orange-600" /> : <Pause className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};
