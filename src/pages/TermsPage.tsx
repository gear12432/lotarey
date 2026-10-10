import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { FileText, ArrowLeft } from 'lucide-react';

export const TermsPage: React.FC = () => {
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
            <FileText className="w-4 h-4 text-[#F36B16]" />
            Terms of Service
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3 text-xs leading-relaxed text-slate-700">
          <h1 className="font-extrabold text-base text-slate-900">Terms of Service</h1>
          <p className="text-[11px] text-slate-400 font-medium">Last updated: October 2026</p>

          <section className="space-y-1">
            <h3 className="font-bold text-slate-900 text-xs">1. Eligibility</h3>
            <p>Users must be at least 18 years of age and legally permitted under Indian state laws to participate in lottery draw checking and wallet services.</p>
          </section>

          <section className="space-y-1">
            <h3 className="font-bold text-slate-900 text-xs">2. Verified Information</h3>
            <p>All draw result data and prize breakdowns are referenced from official published sources. Demonstration and test data are clearly identified.</p>
          </section>

          <section className="space-y-1">
            <h3 className="font-bold text-slate-900 text-xs">3. User Wallet & Transactions</h3>
            <p>Wallet deposits and withdrawals are subject to verification against valid UPI and transaction references. Financial transaction records are maintained in Firebase.</p>
          </section>

          <section className="space-y-1">
            <h3 className="font-bold text-slate-900 text-xs">4. Account Security</h3>
            <p>Users are responsible for keeping their authentication credentials secure. Never share passwords or payment PINs.</p>
          </section>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};
