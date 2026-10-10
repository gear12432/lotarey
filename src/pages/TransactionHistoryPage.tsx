import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import useAuth from '../hooks/useAuth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { WalletTransaction } from '../types/transaction';
import { formatCurrency } from '../utils/formatCurrency';
import { History, Search, ArrowLeft, ArrowUpRight, ArrowDownLeft, Filter } from 'lucide-react';

export const TransactionHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();

  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

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
      items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setTransactions(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userProfile]);

  const filtered = transactions.filter(t => {
    if (filterType !== 'all' && t.type !== filterType) return false;
    if (searchQuery.trim()) {
      const term = searchQuery.toLowerCase();
      return (
        t.description.toLowerCase().includes(term) ||
        t.reference.toLowerCase().includes(term)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#EEF2F3] pb-24 text-[#242424]">
      <AppHeader />

      <main className="max-w-md mx-auto px-3.5 pt-3 space-y-3">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/wallet')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4 text-[#F36B16]" />
            <span>Wallet</span>
          </button>
          
          <h2 className="font-extrabold text-sm text-slate-900 flex items-center gap-1">
            <History className="w-4 h-4 text-[#F36B16]" />
            Transaction Logs
          </h2>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reference or description..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium outline-none focus:border-[#F36B16]"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px] font-bold">
            {['all', 'deposit', 'withdrawal', 'ticket_purchase', 'checkin_reward', 'spin_reward'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-lg shrink-0 capitalize transition-all ${
                  filterType === type 
                    ? 'bg-[#F36B16] text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-2">
          {loading ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-5 h-5 border-2 border-[#F36B16] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-400 font-medium">Loading history from Firebase...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-8 text-center text-slate-400 space-y-1">
              <History className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs font-bold text-slate-600">No matching transactions found</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 text-xs">
              {filtered.map((txn) => {
                const isPositive = txn.amount > 0;
                return (
                  <div key={txn.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {isPositive ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-900 text-xs leading-snug">
                          {txn.description}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono font-medium">
                          Ref: {txn.reference} • {new Date(txn.createdAt).toLocaleString()}
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
