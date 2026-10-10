import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { Lock, ArrowLeft } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#EEF2F3] pb-24 text-[#242424]">
      <AppHeader />

      <main className="max-w-md mx-auto px-3.5 pt-3 space-y-3">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/profile')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4 text-[#F36B16]" />
            <span>Profile</span>
          </button>
          
          <h2 className="font-extrabold text-sm text-slate-900 flex items-center gap-1">
            <Lock className="w-4 h-4 text-[#F36B16]" />
            Privacy Policy
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3 text-xs leading-relaxed text-slate-700">
          <h1 className="font-extrabold text-base text-slate-900">Privacy Policy</h1>
          <p className="text-[11px] text-slate-400 font-medium">Last updated: October 2026</p>

          <section className="space-y-1">
            <h3 className="font-bold text-slate-900 text-xs">1. Data Collection</h3>
            <p>We store basic account profile details (display name, email, wallet balance) securely in Firebase Firestore. We never sell or share user data to third parties.</p>
          </section>

          <section className="space-y-1">
            <h3 className="font-bold text-slate-900 text-xs">2. Security & Firestore Rules</h3>
            <p>User account data is protected by strict Firebase Security Rules (ABAC). Users can only access their authorized user document and transaction records.</p>
          </section>

          <section className="space-y-1">
            <h3 className="font-bold text-slate-900 text-xs">3. Cookies & Storage</h3>
            <p>Firebase Authentication stores session tokens locally on your browser to keep you logged in across app sessions.</p>
          </section>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};
