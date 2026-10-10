import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { RECENT_RESULTS } from '../data/lotteryData';
import { Trophy, Search, Download, CheckCircle, ShieldCheck, Ticket, Calendar, Clock, Filter, ArrowLeft } from 'lucide-react';

export const LotteryResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [ticketLookup, setTicketLookup] = useState('');
  const [lookupResult, setLookupResult] = useState<{ found: boolean; prize?: string; msg?: string } | null>(null);

  const filteredResults = RECENT_RESULTS.filter(r => 
    r.drawCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.lotteryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.firstPrizeNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTicketLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketLookup.trim()) return;

    const term = ticketLookup.trim().toUpperCase();
    let won = false;
    let prize = '';

    for (const res of RECENT_RESULTS) {
      if (res.firstPrizeNumber === term) {
        won = true;
        prize = `🎉 FIRST PRIZE WINNER! (${res.firstPrizeAmount} on ${res.lotteryName} ${res.drawCode})`;
        break;
      }
      if (res.secondPrizeNumbers.includes(term)) {
        won = true;
        prize = `🎉 SECOND PRIZE WINNER! (${res.secondPrizeAmount} on ${res.lotteryName} ${res.drawCode})`;
        break;
      }
    }

    if (won) {
      setLookupResult({ found: true, prize });
    } else {
      setLookupResult({
        found: false,
        msg: `No winning match found for ticket "${term}" in recent draws. Check draw code and date.`
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF2F3] pb-24 text-[#242424]">
      <AppHeader />

      <main className="max-w-md mx-auto px-3.5 pt-3 space-y-3">
        
        {/* Header Title Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-5 h-5 text-[#F36B16]" />
            <h2 className="font-extrabold text-lg text-slate-900 tracking-tight">
              Kerala Lottery Results
            </h2>
          </div>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            Verified Source
          </span>
        </div>

        {/* Ticket Lookup Box */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-2">
          <h3 className="font-extrabold text-xs text-slate-800 flex items-center gap-1.5">
            <Ticket className="w-4 h-4 text-[#F36B16]" />
            Check Your Ticket Number
          </h3>

          <form onSubmit={handleTicketLookup} className="flex gap-2">
            <input
              type="text"
              value={ticketLookup}
              onChange={(e) => setTicketLookup(e.target.value)}
              placeholder="e.g. AZ-739201"
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold uppercase outline-none focus:border-[#F36B16]"
            />
            <button
              type="submit"
              className="bg-[#F36B16] hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition-all"
            >
              SEARCH
            </button>
          </form>

          {lookupResult && (
            <div className={`p-3 rounded-xl text-xs font-bold ${
              lookupResult.found 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-slate-100 text-slate-700 border border-slate-200'
            }`}>
              {lookupResult.found ? lookupResult.prize : lookupResult.msg}
            </div>
          )}
        </div>

        {/* Filter Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search draw code, e.g. AK-679 or Fifty Fifty..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium outline-none focus:border-[#F36B16]"
          />
        </div>

        {/* Results List */}
        <div className="space-y-3">
          {filteredResults.map((result) => (
            <div 
              key={result.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3"
            >
              {/* Result Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="bg-orange-100 text-[#F36B16] text-xs font-black px-2 py-0.5 rounded-md border border-orange-200">
                      {result.drawCode}
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      {result.lotteryName} Result
                    </h3>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    Draw Date: {result.drawDate} ({result.drawTime})
                  </p>
                </div>

                <button 
                  onClick={() => alert(`Downloading official PDF for ${result.drawCode}...`)}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5 text-[#F36B16]" />
                  <span>PDF</span>
                </button>
              </div>

              {/* First Prize Highlight Box */}
              <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white rounded-xl p-3 flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[9px] uppercase font-black text-yellow-200 tracking-wider">
                    FIRST PRIZE WINNER ({result.firstPrizeAmount})
                  </span>
                  <p className="text-lg font-black tracking-wider font-mono">
                    {result.firstPrizeNumber}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-yellow-300">
                  <Trophy className="w-5 h-5 text-yellow-300" />
                </div>
              </div>

              {/* Second Prize Breakdown */}
              <div className="space-y-1 text-xs">
                <span className="font-bold text-slate-700 text-[11px] block">
                  Second Prize ({result.secondPrizeAmount}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {result.secondPrizeNumbers.map((num, i) => (
                    <span key={i} className="bg-slate-100 text-slate-800 font-mono font-bold px-2 py-1 rounded-md text-xs border border-slate-200">
                      {num}
                    </span>
                  ))}
                </div>
              </div>

              {/* Third Prize Breakdown */}
              <div className="space-y-1 text-xs pt-1 border-t border-slate-100">
                <span className="font-bold text-slate-700 text-[11px] block">
                  Third Prize ({result.thirdPrizeAmount}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {result.thirdPrizeNumbers.map((num, i) => (
                    <span key={i} className="bg-slate-50 text-slate-700 font-mono font-medium px-2 py-0.5 rounded text-[11px] border border-slate-200">
                      {num}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Source Footer */}
              <p className="text-[9px] text-slate-400 font-medium pt-1 text-right italic">
                Source: {result.verifiedSource}
              </p>
            </div>
          ))}
        </div>

      </main>

      <BottomNavigation />
    </div>
  );
};
