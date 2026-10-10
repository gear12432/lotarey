import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Sparkles, Flame } from 'lucide-react';
import { PopularGame } from '../types/lottery';

interface GameCardProps {
  game: PopularGame;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/game/${game.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-md hover:border-orange-300 transition-all cursor-pointer group flex flex-col justify-between"
    >
      <div className="relative h-28 w-full overflow-hidden bg-slate-900">
        <img 
          src={game.image} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 opacity-85" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {game.isHot && (
            <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
              <Flame className="w-2.5 h-2.5 fill-white" />
              HOT
            </span>
          )}
          {game.isNew && (
            <span className="bg-yellow-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
              <Sparkles className="w-2.5 h-2.5" />
              NEW
            </span>
          )}
        </div>

        {/* Category */}
        <span className="absolute top-2 right-2 bg-black/40 backdrop-blur-md text-amber-300 text-[9px] font-bold px-2 py-0.5 rounded-md border border-white/20">
          {game.category}
        </span>

        {/* Play Overlay Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[1px]">
          <div className="w-10 h-10 rounded-full bg-yellow-400 text-slate-950 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
          </div>
        </div>
      </div>

      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-extrabold text-xs text-slate-900 group-hover:text-[#F36B16] transition-colors line-clamp-1">
            {game.title}
          </h4>
          <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5 font-medium leading-relaxed">
            {game.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100 text-[10px]">
          <span className="text-slate-500 font-medium">
            Min: <strong className="text-slate-800">₹{game.minBet}</strong>
          </span>
          <span className="text-[#16834A] font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            Up to {game.maxWinMultiplier}
          </span>
        </div>
      </div>
    </div>
  );
};
