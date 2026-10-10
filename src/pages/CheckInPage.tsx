import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import useAuth from '../hooks/useAuth';
import { Calendar, Gift, CheckCircle2, Flame, Award, ArrowLeft, Sparkles } from 'lucide-react';

export const CheckInPage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, claimDailyCheckIn } = useAuth();
  const [claiming, setClaiming] = useState(false);
  const [claimMessage, setClaimMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const todayStr = new Date().toISOString().split('T')[0];
  const isCheckedInToday = userProfile?.lastCheckInDate === todayStr;
  const currentStreak = userProfile?.checkInStreak || 0;

  const days = [
    { dayNum: 1, reward: 10, label: 'Day 1' },
    { dayNum: 2, reward: 15, label: 'Day 2' },
    { dayNum: 3, reward: 20, label: 'Day 3' },
    { dayNum: 4, reward: 25, label: 'Day 4' },
    { dayNum: 5, reward: 30, label: 'Day 5' },
    { dayNum: 6, reward: 40, label: 'Day 6' },
    { dayNum: 7, reward: 100, label: 'Day 7', isBig: true },
  ];

  const handleClaim = async () => {
    setClaiming(true);
    setClaimMessage(null);

    const result = await claimDailyCheckIn();
    if (result.success) {
      setClaimMessage({ type: 'success', text: result.message });
    } else {
      setClaimMessage({ type: 'error', text: result.message });
    }
    setClaiming(false);
  };

  return (
    <div className="min-h-screen bg-[#EEF2F3] pb-24 text-[#242424]">
      <AppHeader />

      <main className="max-w-md mx-auto px-3.5 pt-3 space-y-3">
        
        {/* Top Navigation Back bar */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4 text-[#F36B16]" />
            <span>Back to Home</span>
          </button>
          <span className="text-xs font-black text-[#F36B16] bg-orange-100 px-2.5 py-1 rounded-full border border-orange-200 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-[#F36B16]" />
            Streak: {currentStreak} Days
          </span>
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-2.5 py-0.5 rounded-full w-fit border border-white/20 text-yellow-300 font-extrabold text-[10px]">
              <Gift className="w-3.5 h-3.5" />
              DAILY REWARD CALENDAR
            </div>
            <h2 className="text-xl font-black text-white leading-tight">
              Check In Daily for Up to ₹100 Free Cash!
            </h2>
            <p className="text-xs text-orange-100 font-medium">
              Keep your streak alive! Check in 7 days in a row to unlock the ₹100 Mega Bonus.
            </p>
          </div>
        </div>

        {/* Feedback Alert */}
        {claimMessage && (
          <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 border ${
            claimMessage.type === 'success' 
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
              : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}>
            <Sparkles className="w-4 h-4 shrink-0 text-amber-500" />
            <span>{claimMessage.text}</span>
          </div>
        )}

        {/* 7-Day Grid Calendar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#F36B16]" />
            Your 7-Day Streak
          </h3>

          <div className="grid grid-cols-4 gap-2.5">
            {days.slice(0, 4).map((d) => {
              const activeDay = (currentStreak % 7) || 7;
              const isPassed = d.dayNum < activeDay || (isCheckedInToday && d.dayNum <= activeDay);
              const isCurrent = d.dayNum === activeDay && !isCheckedInToday;

              return (
                <div
                  key={d.dayNum}
                  className={`rounded-xl p-2.5 text-center flex flex-col justify-between border transition-all ${
                    isPassed
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : isCurrent
                      ? 'bg-orange-50 border-[#F36B16] ring-2 ring-orange-400 text-slate-900 animate-pulse'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase">{d.label}</span>
                  <div className="my-1">
                    {isPassed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />
                    ) : (
                      <span className="text-sm font-black text-[#F36B16]">₹{d.reward}</span>
                    )}
                  </div>
                  <span className="text-[9px] font-semibold text-slate-400">
                    {isPassed ? 'Claimed' : 'Cash'}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-2.5 pt-1">
            {days.slice(4).map((d) => {
              const activeDay = (currentStreak % 7) || 7;
              const isPassed = d.dayNum < activeDay || (isCheckedInToday && d.dayNum <= activeDay);
              const isCurrent = d.dayNum === activeDay && !isCheckedInToday;

              return (
                <div
                  key={d.dayNum}
                  className={`rounded-xl p-3 text-center flex flex-col justify-between border transition-all ${
                    d.isBig
                      ? isPassed
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-yellow-300 shadow-md col-span-3 sm:col-span-1'
                      : isPassed
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : isCurrent
                      ? 'bg-orange-50 border-[#F36B16] ring-2 ring-orange-400 text-slate-900'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase">{d.label}</span>
                    {d.isBig && <Award className="w-4 h-4 text-yellow-300" />}
                  </div>

                  <div className="my-1.5">
                    {isPassed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                    ) : (
                      <span className={`font-black text-base ${d.isBig ? 'text-yellow-300' : 'text-[#F36B16]'}`}>
                        ₹{d.reward}
                      </span>
                    )}
                  </div>

                  <span className={`text-[10px] font-bold ${d.isBig && !isPassed ? 'text-amber-100' : 'text-slate-400'}`}>
                    {d.isBig ? 'MEGA BONUS' : isPassed ? 'Claimed' : 'Cash'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Claim Button */}
          <button
            onClick={handleClaim}
            disabled={claiming || isCheckedInToday}
            className={`w-full py-3 rounded-xl font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
              isCheckedInToday
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#F36B16] to-[#C95C2D] text-white hover:from-orange-600 hover:to-orange-700 active:scale-95'
            }`}
          >
            {claiming ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isCheckedInToday ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>CHECKED IN TODAY (RETURN TOMORROW)</span>
              </>
            ) : (
              <>
                <Gift className="w-4 h-4 text-yellow-300" />
                <span>CLAIM TODAY'S REWARD</span>
              </>
            )}
          </button>
        </div>

      </main>

      <BottomNavigation />
    </div>
  );
};
