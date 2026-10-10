import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import useAuth from '../hooks/useAuth';
import { Disc, Trophy, ArrowLeft, Sparkles, RefreshCw, AlertCircle, Award } from 'lucide-react';

export const LuckySpinPage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, spinLuckyWheel } = useAuth();

  const [spinning, setSpinning] = useState(false);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [lastReward, setLastReward] = useState<{ reward: number; prizeName: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const spinsLeft = userProfile?.spinsLeftToday ?? 3;

  const handleSpin = async () => {
    if (spinsLeft <= 0) {
      setErrorMsg('No spins left today. Come back tomorrow or check-in!');
      return;
    }

    if (spinning) return;

    setErrorMsg('');
    setLastReward(null);
    setSpinning(true);

    // Calculate extra rotations
    const randomDeg = 1440 + Math.floor(Math.random() * 360);
    setRotationDegrees((prev) => prev + randomDeg);

    setTimeout(async () => {
      const result = await spinLuckyWheel();
      setSpinning(false);

      if (result.success) {
        setLastReward({ reward: result.reward, prizeName: result.prizeName });
      } else {
        setErrorMsg(result.message);
      }
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#EEF2F3] pb-24 text-[#242424]">
      <AppHeader />

      <main className="max-w-md mx-auto px-3.5 pt-3 space-y-3">
        
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4 text-[#F36B16]" />
            <span>Back to Home</span>
          </button>
          
          <span className="text-xs font-black text-[#F36B16] bg-orange-100 px-3 py-1 rounded-full border border-orange-200 flex items-center gap-1">
            <RefreshCw className={`w-3.5 h-3.5 ${spinning ? 'animate-spin' : ''}`} />
            Spins Left Today: {spinsLeft}
          </span>
        </div>

        {/* Hero Card */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-700 rounded-2xl p-4 text-white shadow-lg text-center space-y-1 relative overflow-hidden">
          <div className="inline-flex items-center gap-1 bg-yellow-400 text-slate-950 px-2.5 py-0.5 rounded-full font-black text-[10px]">
            <Sparkles className="w-3 h-3" />
            LUCKY SPIN JACKPOT
          </div>
          <h2 className="text-lg font-black text-white">Spin & Win Guaranteed Cash Rewards!</h2>
          <p className="text-xs text-indigo-100 font-medium">
            3 Free daily spins for every active Kerala Lottery user.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Reward Winner Modal Overlay */}
        {lastReward && (
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 text-center space-y-2 animate-bounce shadow-md">
            <Award className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="font-extrabold text-base text-emerald-900">
              🎉 Congratulations! You Won {lastReward.prizeName}!
            </h3>
            <p className="text-xs font-bold text-emerald-700">
              ₹{lastReward.reward} has been credited to your wallet balance.
            </p>
          </div>
        )}

        {/* Wheel Graphic Container */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col items-center justify-center relative overflow-hidden my-2">
          
          {/* Wheel Pointer Indicator */}
          <div className="absolute top-3 z-30 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-red-600 drop-shadow-md" />

          {/* Rotating Wheel */}
          <div className="relative w-64 h-64 my-4">
            <div
              style={{
                transform: `rotate(${rotationDegrees}deg)`,
                transition: spinning ? 'transform 3.5s cubic-bezier(0.15, 0.85, 0.35, 1.2)' : 'none'
              }}
              className="w-full h-full rounded-full border-8 border-amber-400 shadow-2xl relative overflow-hidden bg-gradient-to-tr from-[#F36B16] via-amber-400 to-[#C95C2D] flex items-center justify-center"
            >
              {/* Wheel Center Hub */}
              <div className="w-16 h-16 rounded-full bg-slate-900 border-4 border-yellow-300 z-20 flex items-center justify-center shadow-inner">
                <Disc className="w-8 h-8 text-yellow-400 animate-spin" />
              </div>

              {/* Wheel Sectors Text overlay */}
              <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <span className="absolute top-3 font-black text-xs text-white drop-shadow">₹10 Cash</span>
                <span className="absolute right-3 font-black text-xs text-white drop-shadow">₹20 Cash</span>
                <span className="absolute bottom-3 font-black text-xs text-yellow-300 drop-shadow">₹100 JACKPOT</span>
                <span className="absolute left-3 font-black text-xs text-white drop-shadow">₹50 Cash</span>
              </div>
            </div>
          </div>

          {/* Spin Action Button */}
          <button
            onClick={handleSpin}
            disabled={spinning || spinsLeft <= 0}
            className={`w-full max-w-xs py-3.5 rounded-2xl font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2 ${
              spinsLeft <= 0
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 text-white hover:opacity-95 active:scale-95'
            }`}
          >
            {spinning ? (
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Disc className="w-5 h-5 text-yellow-300" />
                <span>{spinsLeft <= 0 ? 'NO SPINS LEFT TODAY' : 'SPIN THE WHEEL NOW'}</span>
              </>
            )}
          </button>
        </div>

      </main>

      <BottomNavigation />
    </div>
  );
};
