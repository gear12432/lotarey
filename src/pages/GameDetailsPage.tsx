import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { POPULAR_GAMES } from '../data/lotteryData';
import useAuth from '../hooks/useAuth';
import { Flame, Play, Trophy, ArrowLeft, Sparkles, RefreshCw, AlertCircle, Award } from 'lucide-react';

export const GameDetailsPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { userProfile, updateWalletBalance } = useAuth();

  const game = POPULAR_GAMES.find(g => g.id === gameId) || POPULAR_GAMES[0];

  const [selectedDigits, setSelectedDigits] = useState('789');
  const [betAmount, setBetAmount] = useState(game.minBet);
  const [playing, setPlaying] = useState(false);
  const [gameResult, setGameResult] = useState<{ won: boolean; prize: number; msg: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePlayGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) {
      navigate('/login');
      return;
    }

    if (userProfile.walletBalance < betAmount) {
      setErrorMsg(`Insufficient wallet balance (₹${userProfile.walletBalance}). Please deposit cash to play.`);
      return;
    }

    setErrorMsg('');
    setGameResult(null);
    setPlaying(true);

    try {
      // 1. Deduct bet
      await updateWalletBalance(-betAmount, `Played ${game.title}`, 'spin_reward');

      setTimeout(async () => {
        // Random win probability ~ 40%
        const won = Math.random() < 0.4;
        let winPrize = 0;

        if (won) {
          const multiplier = Math.floor(2 + Math.random() * 8);
          winPrize = betAmount * multiplier;
          await updateWalletBalance(winPrize, `Won ${game.title} Prize!`, 'lottery_win');
          setGameResult({
            won: true,
            prize: winPrize,
            msg: `🎉 MATCH WINNER! You matched digits "${selectedDigits}" and won ₹${winPrize} (${multiplier}x multiplier)!`
          });
        } else {
          setGameResult({
            won: false,
            prize: 0,
            msg: `Better luck next time! Winning draw digits were "${Math.floor(100 + Math.random() * 899)}".`
          });
        }
        setPlaying(false);
      }, 2000);

    } catch (err: any) {
      console.error('Game error:', err);
      setErrorMsg(err.message || 'Failed to play game.');
      setPlaying(false);
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
          
          <span className="text-xs font-black text-white bg-red-600 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-white" />
            {game.category}
          </span>
        </div>

        {/* Hero Card */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg bg-slate-950 text-white p-5 border border-slate-800 space-y-2">
          <img 
            src={game.image} 
            alt={game.title}
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="relative z-10">
            <span className="bg-yellow-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase">
              Up to {game.maxWinMultiplier} Multiplier
            </span>
            <h1 className="text-xl font-black text-white mt-1">{game.title}</h1>
            <p className="text-xs text-slate-300 font-medium">{game.description}</p>
          </div>
        </div>

        {/* Game Simulator Box */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-4">
          <h3 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#F36B16]" />
            Enter Prediction Digits & Bet
          </h3>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {gameResult && (
            <div className={`p-4 rounded-xl text-center space-y-1 ${
              gameResult.won ? 'bg-emerald-50 border border-emerald-200 text-emerald-900 font-extrabold text-xs' : 'bg-slate-100 text-slate-700 font-bold text-xs'
            }`}>
              {gameResult.won && <Award className="w-8 h-8 text-emerald-600 mx-auto" />}
              <p>{gameResult.msg}</p>
            </div>
          )}

          <form onSubmit={handlePlayGame} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                3-Digit Prediction (000 - 999)
              </label>
              <input
                type="text"
                maxLength={3}
                required
                value={selectedDigits}
                onChange={(e) => setSelectedDigits(e.target.value.replace(/\D/g, ''))}
                className="w-full text-center font-mono font-black text-xl py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-[#F36B16]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Bet Amount (Min ₹{game.minBet})
              </label>
              <div className="flex gap-2">
                {[10, 20, 50, 100].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setBetAmount(amt)}
                    className={`flex-1 py-1.5 rounded-xl font-black text-xs border ${
                      betAmount === amt ? 'bg-[#F36B16] text-white border-[#F36B16]' : 'bg-slate-50 text-slate-700'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={playing}
              className="w-full bg-gradient-to-r from-[#F36B16] to-[#C95C2D] text-white font-extrabold text-xs py-3 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              {playing ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>START PREDICTION GAME (₹{betAmount})</span>
                </>
              )}
            </button>
          </form>
        </div>

      </main>

      <BottomNavigation />
    </div>
  );
};
