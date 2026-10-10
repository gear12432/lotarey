import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import useAuth from '../hooks/useAuth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Headphones, MessageSquare, Send, CheckCircle2, ChevronDown, ChevronUp, ArrowLeft, ShieldCheck } from 'lucide-react';

export const SupportPage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I check my Kerala Lottery live results?',
      a: 'Go to the Results tab in the bottom navigation or homepage shortcut. You can search by draw code (e.g., AK-680) or type your ticket number to check if you won.'
    },
    {
      q: 'How long does a wallet deposit take to credit?',
      a: 'UPI deposits are credited instantly or within 2-5 minutes once the 12-digit UTR reference ID is submitted.'
    },
    {
      q: 'How do I claim my daily check-in rewards and spins?',
      a: 'Click on the "Check In" button on the home page every 24 hours. Maintaining a 7-day streak unlocks up to ₹100 bonus cash.'
    },
    {
      q: 'Is my personal data and wallet balance secure?',
      a: 'Yes, Kerala Lottery Live uses official Firebase Authentication & encrypted Firestore rules with zero-trust access control.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;

    setSubmitting(true);
    try {
      const ref = collection(db, 'supportRequests');
      await addDoc(ref, {
        userId: userProfile.uid,
        name: userProfile.displayName,
        email: userProfile.email,
        subject: subject.trim(),
        message: message.trim(),
        status: 'open',
        createdAt: new Date().toISOString()
      });
      setSubmitted(true);
      setSubject('');
      setMessage('');
    } catch (err: any) {
      console.error('Support submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

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
            <Headphones className="w-4 h-4 text-[#F36B16]" />
            Customer Support
          </h2>
        </div>

        {/* Support Channels Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-[#C95C2D] rounded-2xl p-4 text-white shadow-md space-y-2">
          <div className="flex items-center gap-2">
            <Headphones className="w-6 h-6 text-yellow-300" />
            <h3 className="font-extrabold text-base">24/7 Live Support Helpline</h3>
          </div>
          <p className="text-xs text-orange-100 font-medium">
            Have a question regarding draws, deposits, or prize claims? Our support team is here to assist you.
          </p>
        </div>

        {/* Contact Form Saved to Firestore */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
          <h3 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-[#F36B16]" />
            Submit Support Request
          </h3>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl p-4 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="font-bold text-sm">Ticket Submitted!</p>
              <p className="text-slate-600">
                Your ticket has been received and saved in Firebase. Our team will respond shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 py-1.5 px-4 bg-[#F36B16] text-white font-bold text-xs rounded-xl"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Deposit Query or Result Assistance"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 outline-none focus:border-[#F36B16]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message Details
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your query or issue in detail..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 outline-none focus:border-[#F36B16]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#F36B16] hover:bg-orange-600 text-white font-extrabold text-xs py-2.5 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SUBMIT TICKET TO SUPPORT</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* FAQs Accordion */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
          <h3 className="font-extrabold text-xs text-slate-900">Frequently Asked Questions</h3>

          <div className="space-y-2">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="border border-slate-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-3 text-left font-bold text-xs text-slate-800 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#F36B16]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="p-3 text-xs text-slate-600 font-medium leading-relaxed bg-white border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </main>

      <BottomNavigation />
    </div>
  );
};
