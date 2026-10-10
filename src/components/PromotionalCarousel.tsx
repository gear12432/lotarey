import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, Gift, Zap, ShieldCheck } from 'lucide-react';

export const PromotionalCarousel: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      title: "X'MAS NEW YEAR BUMPER",
      subtitle: "First Prize ₹25 Crore Bumper Jackpot",
      tag: "MEGA BUMPER 2026",
      badge: "HOT DRAW",
      bgGradient: "from-amber-600 via-orange-600 to-red-700",
      btnText: "Buy Ticket ₹500",
      btnAction: () => navigate('/lottery/draw-br-2026'),
      icon: Sparkles
    },
    {
      id: 2,
      title: "AKSHAYA LIVE DRAW TODAY",
      subtitle: "First Prize ₹70 Lakhs | Draw at 3:00 PM",
      tag: "TODAY'S LIVE",
      badge: "LIVE RESULT",
      bgGradient: "from-orange-500 via-red-600 to-rose-700",
      btnText: "Check Live Result",
      btnAction: () => navigate('/results'),
      icon: Zap
    },
    {
      id: 3,
      title: "DAILY CHECK-IN REWARDS",
      subtitle: "Claim up to ₹100 Free Cash Every Week!",
      tag: "FREE BONUS",
      badge: "CLAIM NOW",
      bgGradient: "from-emerald-600 via-teal-600 to-cyan-700",
      btnText: "Claim Check-In",
      btnAction: () => navigate('/check-in'),
      icon: Gift
    },
    {
      id: 4,
      title: "LUCKY SPIN WHEEL",
      subtitle: "3 Free Daily Spins! Win Cash & Free Tickets",
      tag: "INSTANT WIN",
      badge: "FREE SPINS",
      bgGradient: "from-purple-600 via-indigo-600 to-blue-700",
      btnText: "Spin Wheel Now",
      btnAction: () => navigate('/lucky-spin'),
      icon: ShieldCheck
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlide = slides[currentIndex];
  const IconComp = currentSlide.icon;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-lg my-3 border border-orange-200/50">
      <div className={`w-full bg-gradient-to-r ${currentSlide.bgGradient} text-white p-4 sm:p-5 transition-all duration-500 flex flex-col justify-between min-h-[140px] relative`}>
        
        {/* Background Decorative Pattern */}
        <div className="absolute right-[-10px] bottom-[-20px] opacity-15 text-white pointer-events-none">
          <IconComp className="w-40 h-40" />
        </div>

        {/* Top Badges */}
        <div className="flex items-center justify-between mb-2 z-10">
          <span className="text-[10px] font-black uppercase tracking-wider bg-black/30 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 text-yellow-300">
            {currentSlide.tag}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wide bg-yellow-400 text-slate-950 px-2 py-0.5 rounded-full shadow-sm">
            {currentSlide.badge}
          </span>
        </div>

        {/* Slide Content */}
        <div className="z-10 my-1">
          <h2 className="text-lg sm:text-xl font-black tracking-tight leading-snug drop-shadow">
            {currentSlide.title}
          </h2>
          <p className="text-xs sm:text-sm text-orange-100 font-medium mt-0.5 drop-shadow-sm">
            {currentSlide.subtitle}
          </p>
        </div>

        {/* CTA Button & Indicators */}
        <div className="flex items-center justify-between mt-3 z-10">
          <button
            onClick={currentSlide.btnAction}
            className="bg-white hover:bg-yellow-300 text-slate-900 hover:text-slate-950 font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5"
          >
            <IconComp className="w-3.5 h-3.5 text-orange-600" />
            {currentSlide.btnText}
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1 bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-4 bg-yellow-300' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Slide Navigation Buttons */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-1 top-1/2 -translate-y-1/2 p-1 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm opacity-60 hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
        className="absolute right-1 top-1/2 -translate-y-1/2 p-1 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm opacity-60 hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
