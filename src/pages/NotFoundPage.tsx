import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { Home, AlertCircle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#EEF2F3] pb-24 text-[#242424]">
      <AppHeader />

      <main className="max-w-md mx-auto px-3.5 pt-12 text-center space-y-3">
        <div className="w-16 h-16 rounded-3xl bg-orange-100 text-[#F36B16] flex items-center justify-center mx-auto shadow-sm">
          <AlertCircle className="w-8 h-8" />
        </div>

        <h1 className="text-xl font-black text-slate-900">404 - Page Not Found</h1>
        <p className="text-xs text-slate-600 font-medium max-w-xs mx-auto">
          The screen or draw page you requested does not exist or has been moved.
        </p>

        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 bg-[#F36B16] text-white font-extrabold text-xs py-2.5 px-5 rounded-xl shadow-md"
        >
          <Home className="w-4 h-4" />
          <span>Return to Home</span>
        </button>
      </main>

      <BottomNavigation />
    </div>
  );
};
