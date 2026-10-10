import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import useAuth from '../hooks/useAuth';
import { collection, query, where, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { WalletTransaction } from '../types/transaction';
import { formatCurrency, formatPrizeCompact } from '../utils/formatCurrency';
import { Wallet, PlusCircle, ArrowUpRight, ArrowDownLeft, Clock, History, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

export const WalletPage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, updateWalletBalance } = useAuth();

  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loadingTxns, setLoadingTxns] = useState(true);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(100);
  const [withdrawUpi, setWithdrawUpi] = useState('');
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawError, setWithdrawError] = useState('');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  useEffect(() => {
    if (!userProfile) return;

    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', userProfile.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: WalletTransaction[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as WalletTransaction);
      });
      // Sort desc
      items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setTransactions(items);
      setLoadingTxns(false);
    }, (error) => {
      console.error('Transactions onSnapshot error:', error);
      setLoadingTxns(false);
    });

    return () => unsubscribe();
  }, [userProfile]);

  const handleWithdrawSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;

    if (withdrawAmount < 100) {
      setWithdrawError('Minimum withdrawal amount is ₹100.');
      return;
    }

    if (withdrawAmount > userProfile.walletBalance) {
      setWithdrawError('Insufficient wallet balance for this withdrawal amount.');
      return;
    }

    if (!withdrawUpi.trim()) {
      setWithdrawError('Please enter your UPI ID or Bank Account number.');
      return;
    }

    setWithdrawError('');
    setWithdrawing(true);

    try {
      const deducted = await updateWalletBalance(
        -withdrawAmount,
        `Withdrawal Request to ${withdrawUpi.trim()}`,
        'withdrawal'
      );

      if (deducted) {
        setWithdrawSuccess(true);
        setTimeout(() => {
          setWithdrawSuccess(false);
          setShowWithdrawModal(false);
        }, 2000);
      }
    } catch (err: any) {
      setWithdrawError(err.message || 'Withdrawal failed. Please try again.');
    } finally {
      setWithdrawing(false);
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
          
          <button
            onClick={() => navigate('/transactions')}
            className="text-xs font-bold text-[#F36B16] bg-orange-100 px-3 py-1 rounded-full border border-orange-200 flex items-center gap-1"
          >
            <History className="w-3.5 h-3.5" />
            Full History
          </button>
        </div>

        {/* Balance Main Card */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden space-y-3 border border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-yellow-400 text-slate-950 flex items-center justify-center font-black">
                <Wallet className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-300">AVAILABLE BALANCE</span>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
              Verified Realtime
            </span>
          </div>

          <div>
            <h1 className="text-3xl font-black text-yellow-300 tracking-tight">
              {formatCurrency(userProfile?.walletBalance || 0)}
            </h1>
            <p className="text-[11px] text-slate-400 font-medium mt-1">
              Kerala Lottery Live Verified Deposit & Prize Wallet
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex gap-2.5">
            <button
              onClick={() => navigate('/deposit')}
              className="flex-1 py-2.5 bg-gradient-to-r from-[#F36B16] to-[#C95C2D] text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>DEPOSIT CASH</span>
            </button>

            <button
              onClick={() => setShowWithdrawModal(true)}
              className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs rounded-xl border border-white/20 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <ArrowUpRight className="w-4 h-4 text-yellow-300" />
              <span>WITHDRAW</span>
            </button>
          </div>
        </div>

        {/* Withdrawal Modal */}
        {showWithdrawModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                  <ArrowUpRight className="w-4 h-4 text-[#F36B16]" />
                  Request Withdrawal
                </h3>
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Close
                </button>
              </div>

              {withdrawSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl p-4 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="font-bold text-sm">Withdrawal Submitted!</p>
                  <p className="text-slate-600">
                    ₹{withdrawAmount} withdrawal request is being processed to <strong>{withdrawUpi}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleWithdrawSubmit} className="space-y-3">
                  {withdrawError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{withdrawError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Withdrawal Amount (₹)
                    </label>
                    <input
                      type="number"
                      min={100}
                      max={userProfile?.walletBalance || 0}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 outline-none focus:border-[#F36B16]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      UPI ID / Bank Account Details
                    </label>
                    <input
                      type="text"
                      required
                      value={withdrawUpi}
                      onChange={(e) => setWithdrawUpi(e.target.value)}
                      placeholder="e.g. rahul@upi or Account No."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 outline-none focus:border-[#F36B16]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={withdrawing}
                    className="w-full bg-[#F36B16] hover:bg-orange-600 text-white font-extrabold text-xs py-2.5 rounded-xl shadow-md flex items-center justify-center gap-2"
                  >
                    {withdrawing ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span>SUBMIT WITHDRAWAL (₹{withdrawAmount})</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Recent Transactions Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
              <History className="w-4 h-4 text-[#F36B16]" />
              Recent Wallet Activity
            </h3>
            <span className="text-[10px] text-slate-400 font-medium">
              Realtime Logs
            </span>
          </div>

          {loadingTxns ? (
            <div className="text-center py-6">
              <div className="w-5 h-5 border-2 border-[#F36B16] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-400 font-medium mt-2">Loading transactions...</p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-6 text-slate-400 space-y-1">
              <Wallet className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs font-bold text-slate-600">No Transactions Yet</p>
              <p className="text-[11px]">Your deposits, ticket purchases, and rewards will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 text-xs">
              {transactions.slice(0, 10).map((txn) => {
                const isPositive = txn.amount > 0;
                return (
                  <div key={txn.id} className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {isPositive ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-900 text-xs leading-snug">
                          {txn.description}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium">
                          Ref: {txn.reference} • {new Date(txn.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`font-black text-xs block ${
                        isPositive ? 'text-emerald-600' : 'text-slate-900'
                      }`}>
                        {isPositive ? '+' : ''}{formatCurrency(txn.amount)}
                      </span>
                      <span className="text-[9px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.2 rounded uppercase">
                        {txn.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </main>

      <BottomNavigation />
    </div>
  );
};
