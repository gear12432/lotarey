import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { ShieldAlert, PhoneCall, AlertTriangle, ArrowLeft, HeartHandshake } from 'lucide-react';

export const ResponsiblePlayPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#EEF2F3] pb-24 text-[#242424]">
      <AppHeader />

      <main className="max-w-md mx-auto px-3.5 pt-3 space-y-3">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/profile')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4 text-[#F36B16]" />
            <span>Profile</span>
          </button>
          
          <h2 className="font-extrabold text-sm text-slate-900 flex items-center gap-1">
            <ShieldAlert className="w-4 h-4 text-emerald-600" />
            Responsible Gaming
          </h2>
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-4 text-white shadow-md space-y-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-yellow-300" />
            <h3 className="font-extrabold text-base">Play Responsibly (18+)</h3>
          </div>
          <p className="text-xs text-emerald-100 font-medium">
            Kerala Lottery Live is committed to fostering a safe, transparent, and healthy gaming environment for all users.
          </p>
        </div>

        {/* Responsible Gaming Principles */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3 text-xs leading-relaxed text-slate-700">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-[#F36B16]" />
            Essential Rules for Responsible Gaming
          </h3>

          <ul className="space-y-2 list-disc pl-4 font-medium">
            <li><strong>Strict 18+ Age Restriction:</strong> Persons under 18 years of age are strictly prohibited from creating an account or participating in draw tickets.</li>
            <li><strong>Set Daily & Monthly Limits:</strong> Never spend more money than you can comfortably afford to lose. Treat lottery draws as entertainment, not as an investment.</li>
            <li><strong>Do Not Chase Losses:</strong> Attempting to win back money lost can lead to financial strain and distress.</li>
            <li><strong>Keep Track of Time:</strong> Set time limits for checking results and playing mini-games.</li>
          </ul>
        </div>

        {/* Helpline Contact Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-amber-900 font-extrabold">
            <PhoneCall className="w-4 h-4 text-[#F36B16]" />
            <span>Need Assistance or Self-Exclusion?</span>
          </div>
          <p className="text-slate-700 font-medium leading-relaxed">
            If you feel you may be developing a gambling problem or need assistance with self-exclusion from Kerala Lottery Live, please contact national gaming helplines or our support team immediately.
          </p>
          <div className="pt-1 font-bold text-slate-900">
            Helpline Number: <a href="tel:18002333330" className="text-[#F36B16] underline">1800-233-3330</a>
          </div>
        </div>

      </main>

      <BottomNavigation />
    </div>
  );
};
