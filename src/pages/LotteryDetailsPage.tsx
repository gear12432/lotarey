import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { KERALA_LOTTERIES } from '../data/lotteryData';
import useAuth from '../hooks/useAuth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Trophy, Ticket, Calendar, Clock, ArrowLeft, CheckCircle2, ShieldCheck, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

export const LotteryDetailsPage: React.FC = () => {
  const { drawId } = useParams<{ drawId: string }>();
  const navigate = useNavigate();
  const { userProfile, updateWalletBalance } = useAuth();

  const lottery = KERALA_LOTTERIES.find(l => l.id === drawId) || KERALA_LOTTERIES[0];

  const [seriesPrefix, setSeriesPrefix] = useState('AK');
  const [ticketNumberDigit, setTicketNumberDigit] = useState('789120');
  const [purchasing, setPurchasing] = useState(false);
  const [successTicket, setSuccessTicket] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const fullTicketNumber = `${seriesPrefix}-${ticketNumberDigit}`;

  const handleRandomizeNumber = () => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000).toString();
    const seriesList = ['AK', 'AY', 'AZ', 'FF', 'KN', 'NR', 'SS'];
    const randomSeries = seriesList[Math.floor(Math.random() * seriesList.length)];
    setSeriesPrefix(randomSeries);
    setTicketNumberDigit(randomDigits);
  };

  const handleBuyTicket = async () => {
    if (!userProfile) {
      navigate('/login');
      return;
    }

    if (userProfile.walletBalance < lottery.ticketPrice) {
      setErrorMsg(`Insufficient wallet balance (₹${userProfile.walletBalance}). Please deposit ₹${lottery.ticketPrice - userProfile.walletBalance} to buy.`);
      return;
    }

    setErrorMsg('');
    setPurchasing(true);

    try {
      // 1. Deduct wallet balance
      const deducted = await updateWalletBalance(
        -lottery.ticketPrice,
        `Ticket Purchase: ${lottery.name} (${fullTicketNumber})`,
        'ticket_purchase'
      );

      if (deducted) {
        // 2. Add ticket to Firestore 'tickets' collection
        const ticketsRef = collection(db, 'tickets');
        await addDoc(ticketsRef, {
          userId: userProfile.uid,
          drawId: lottery.id,
          lotteryName: lottery.name,
          drawCode: lottery.code,
          ticketNumber: fullTicketNumber,
          price: lottery.ticketPrice,
          purchaseDate: new Date().toISOString(),
          drawDate: lottery.drawDate,
          status: 'active'
        });

        setSuccessTicket(fullTicketNumber);
      }
    } catch (err: any) {
      console.error('Ticket purchase error:', err);
      setErrorMsg(err.message || 'Failed to purchase ticket. Please try again.');
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF2F3] pb-24 text-[#242424]">
      <AppHeader />

      <main className="max-w-md mx-auto px-3.5 pt-3 space-y-3">
        
        {/* Navigation Back */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/lotteries')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4 text-[#F36B16]" />
            <span>All Lotteries</span>
          </button>
          <span className="text-xs font-bold text-[#F36B16] bg-orange-100 px-2.5 py-1 rounded-full border border-orange-200">
            {lottery.code}
          </span>
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-orange-500 via-[#F36B16] to-[#C95C2D] rounded-2xl p-5 text-white shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full text-yellow-300">
              {lottery.day} DRAW
            </span>
            <span className="text-xs font-black bg-yellow-400 text-slate-950 px-2 py-0.5 rounded-full">
              ₹{lottery.ticketPrice} / Ticket
            </span>
          </div>

          <h1 className="text-xl font-black tracking-tight drop-shadow">
            {lottery.name}
          </h1>

          <div className="bg-black/20 backdrop-blur-md p-3 rounded-xl flex items-center justify-between border border-white/20">
            <div>
              <p className="text-[10px] uppercase font-bold text-yellow-200">FIRST PRIZE</p>
              <p className="text-xl font-black text-white">{lottery.firstPrize}</p>
            </div>
            <Trophy className="w-8 h-8 text-yellow-300" />
          </div>
        </div>

        {/* Success Confirmation Card */}
        {successTicket ? (
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 text-center space-y-3 shadow-md">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-base font-extrabold text-emerald-900">
              Ticket Purchased Successfully!
            </h3>
            <div className="bg-white p-3 rounded-xl border border-emerald-200 inline-block font-mono text-lg font-black text-slate-900 tracking-wider">
              {successTicket}
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Your ticket has been saved to your account. You can view all active tickets in your profile or wallet history.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setSuccessTicket(null)}
                className="flex-1 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-sm"
              >
                Buy Another Ticket
              </button>
              <button
                onClick={() => navigate('/wallet')}
                className="flex-1 py-2 bg-white text-slate-800 font-bold text-xs rounded-xl border border-slate-200"
              >
                View Wallet
              </button>
            </div>
          </div>
        ) : (
          /* Ticket Purchase Selector Form */
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-xs text-slate-800 flex items-center gap-1.5">
                <Ticket className="w-4 h-4 text-[#F36B16]" />
                Select Ticket Number
              </h3>
              <button
                type="button"
                onClick={handleRandomizeNumber}
                className="text-[11px] font-bold text-[#F36B16] hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                Randomize
              </button>
            </div>

            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Ticket Preview Box */}
            <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-2xl p-4 text-center space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                PREVIEW TICKET
              </span>
              <div className="flex items-center justify-center gap-2">
                <input
                  type="text"
                  maxLength={3}
                  value={seriesPrefix}
                  onChange={(e) => setSeriesPrefix(e.target.value.toUpperCase())}
                  className="w-14 text-center font-mono font-black text-lg py-1 rounded-xl bg-white border border-amber-300 text-slate-900 outline-none"
                />
                <span className="text-lg font-black text-amber-600">-</span>
                <input
                  type="text"
                  maxLength={6}
                  value={ticketNumberDigit}
                  onChange={(e) => setTicketNumberDigit(e.target.value.replace(/\D/g, ''))}
                  className="w-32 text-center font-mono font-black text-lg py-1 rounded-xl bg-white border border-amber-300 text-slate-900 outline-none"
                />
              </div>
              <p className="text-[10px] font-semibold text-slate-500">
                Official {lottery.name} Ticket Series
              </p>
            </div>

            {/* Wallet Balance Info */}
            <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-slate-500 font-medium">Your Wallet Balance:</span>
              <strong className="font-extrabold text-slate-900">₹{userProfile?.walletBalance || 0}</strong>
            </div>

            {/* Buy Action Button */}
            <button
              onClick={handleBuyTicket}
              disabled={purchasing}
              className="w-full bg-gradient-to-r from-[#F36B16] to-[#C95C2D] hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-xs py-3 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-60"
            >
              {purchasing ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Ticket className="w-4 h-4" />
                  <span>CONFIRM & BUY TICKET (₹{lottery.ticketPrice})</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Prize Breakdown Table */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-2">
          <h3 className="font-extrabold text-xs text-slate-800 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-[#F36B16]" />
            Official Prize Structure
          </h3>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-2 flex justify-between font-semibold">
              <span className="text-slate-600">1st Prize</span>
              <span className="font-extrabold text-[#F36B16]">{lottery.firstPrize}</span>
            </div>
            <div className="py-2 flex justify-between font-semibold">
              <span className="text-slate-600">2nd Prize</span>
              <span className="font-bold text-slate-900">₹10,00,000</span>
            </div>
            <div className="py-2 flex justify-between font-semibold">
              <span className="text-slate-600">3rd Prize</span>
              <span className="font-bold text-slate-900">₹1,00,000</span>
            </div>
            <div className="py-2 flex justify-between font-semibold">
              <span className="text-slate-600">Consolation Prize</span>
              <span className="font-bold text-slate-900">₹8,000</span>
            </div>
          </div>
        </div>

      </main>

      <BottomNavigation />
    </div>
  );
};
