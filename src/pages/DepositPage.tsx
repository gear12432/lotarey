import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import useAuth from '../hooks/useAuth';
import { Wallet, QrCode, CreditCard, ArrowLeft, CheckCircle2, ShieldCheck, AlertCircle, Copy, Check } from 'lucide-react';

export const DepositPage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, updateWalletBalance } = useAuth();

  const [amount, setAmount] = useState<number>(500);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'netbanking' | 'card'>('upi');
  const [transactionRef, setTransactionRef] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const quickAmounts = [100, 300, 500, 1000, 2000, 5000];
  const upiVpa = 'keralalottery@upi';

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiVpa);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount < 50) {
      setErrorMsg('Minimum deposit amount is ₹50.');
      return;
    }

    if (!transactionRef.trim()) {
      setErrorMsg('Please enter your UPI / UTR Transaction Reference ID.');
      return;
    }

    setErrorMsg('');
    setSubmitting(true);

    try {
      const added = await updateWalletBalance(
        amount,
        `UPI Deposit (Ref: ${transactionRef.trim()})`,
        'deposit',
        transactionRef.trim()
      );

      if (added) {
        setSuccess(true);
      }
    } catch (err: any) {
      console.error('Deposit error:', err);
      setErrorMsg(err.message || 'Deposit failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF2F3] pb-24 text-[#242424]">
      <AppHeader />

      <main className="max-w-md mx-auto px-3.5 pt-3 space-y-3">
        
        {/* Back Button */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/wallet')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4 text-[#F36B16]" />
            <span>Wallet</span>
          </button>
          
          <span className="text-xs font-bold text-slate-600 bg-white px-2.5 py-1 rounded-full border border-slate-200 flex items-center gap-1">
            <Wallet className="w-3.5 h-3.5 text-[#F36B16]" />
            Balance: ₹{userProfile?.walletBalance || 0}
          </span>
        </div>

        {/* Deposit Success Screen */}
        {success ? (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-extrabold text-slate-900">
              Deposit Successful!
            </h2>
            <p className="text-xs text-slate-600 font-medium max-w-xs mx-auto">
              ₹{amount} has been added to your wallet balance. Reference: <strong>{transactionRef}</strong>.
            </p>
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => navigate('/')}
                className="flex-1 py-2.5 bg-[#F36B16] text-white font-bold text-xs rounded-xl shadow-sm"
              >
                Go to Home
              </button>
              <button
                onClick={() => {
                  setSuccess(false);
                  setTransactionRef('');
                }}
                className="flex-1 py-2.5 bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border border-slate-200"
              >
                Deposit More
              </button>
            </div>
          </div>
        ) : (
          /* Deposit Form */
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h2 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-[#F36B16]" />
                Add Funds to Wallet
              </h2>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Instant Credit
              </span>
            </div>

            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Quick Amount Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Select Deposit Amount (₹)
              </label>
              
              <div className="grid grid-cols-3 gap-2">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className={`py-2 rounded-xl font-black text-xs transition-all border ${
                      amount === amt
                        ? 'bg-[#F36B16] text-white border-[#F36B16] shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-orange-300'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div className="pt-2">
                <input
                  type="number"
                  min={50}
                  max={100000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="Enter custom amount..."
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-bold text-sm text-slate-900 outline-none focus:border-[#F36B16]"
                />
              </div>
            </div>

            {/* Payment Gateway Mock / UPI QR Display */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-amber-900 flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-[#F36B16]" />
                  Pay via Any UPI App (GPay, PhonePe, Paytm)
                </span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-amber-200 text-center space-y-2 max-w-[220px] mx-auto shadow-sm">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi://pay?pa=${upiVpa}&pn=KeralaLotteryLive&am=${amount}`} 
                  alt="UPI Deposit QR Code"
                  className="w-36 h-36 mx-auto rounded-lg"
                />
                <p className="text-[10px] font-bold text-slate-500 uppercase">
                  Scan QR to pay ₹{amount}
                </p>
              </div>

              {/* UPI ID copy box */}
              <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-amber-200 text-xs">
                <span className="font-mono font-bold text-slate-800">{upiVpa}</span>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="text-xs font-bold text-[#F36B16] flex items-center gap-1"
                >
                  {copiedUpi ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy UPI</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Transaction Reference Submission */}
            <form onSubmit={handleDepositSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  UPI / UTR Transaction Ref ID (12 Digits)
                </label>
                <input
                  type="text"
                  required
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  placeholder="e.g. 402910293812"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-mono font-bold text-xs text-slate-900 outline-none focus:border-[#F36B16]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-xs py-3 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-60"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-yellow-300" />
                    <span>SUBMIT DEPOSIT (₹{amount})</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

      </main>

      <BottomNavigation />
    </div>
  );
};
