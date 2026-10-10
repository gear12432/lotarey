import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User as UserIcon, ArrowRight, ShieldCheck, AlertCircle, CheckSquare, Square } from 'lucide-react';
import useAuth from '../hooks/useAuth';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!acceptedTerms) {
      setError('You must accept the Terms and Privacy Policy to continue.');
      return;
    }

    setLoading(true);

    try {
      await signUp(name.trim(), email.trim(), password);
      navigate('/', { replace: true });
    } catch (err: any) {
      console.error('Signup error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email address is already registered. Please sign in instead.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else {
        setError(err.message || 'Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF2F3] flex flex-col justify-center py-6 px-4 sm:px-6">
      <div className="max-w-md w-full mx-auto space-y-4">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#F36B16] to-[#C95C2D] text-white font-black text-2xl flex items-center justify-center mx-auto shadow-lg shadow-orange-500/20">
            KL
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Create Account
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Join Kerala Lottery Live & Get ₹100 Welcome Bonus!
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
          
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-3.5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Kumar"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#F36B16] focus:ring-1 focus:ring-[#F36B16] text-xs font-medium outline-none transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul.k@gmail.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#F36B16] focus:ring-1 focus:ring-[#F36B16] text-xs font-medium outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password (Min 6 characters)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 focus:border-[#F36B16] focus:ring-1 focus:ring-[#F36B16] text-xs font-medium outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#F36B16] focus:ring-1 focus:ring-[#F36B16] text-xs font-medium outline-none transition-all"
                />
              </div>
            </div>

            {/* Terms Acceptance */}
            <div className="flex items-start gap-2 pt-1">
              <button
                type="button"
                onClick={() => setAcceptedTerms(!acceptedTerms)}
                className="mt-0.5 text-[#F36B16] shrink-0"
              >
                {acceptedTerms ? (
                  <CheckSquare className="w-4 h-4 fill-[#F36B16] text-white" />
                ) : (
                  <Square className="w-4 h-4 text-slate-300" />
                )}
              </button>
              <label 
                onClick={() => setAcceptedTerms(!acceptedTerms)} 
                className="text-[11px] text-slate-600 font-medium cursor-pointer leading-tight"
              >
                I am 18+ years old and agree to the{' '}
                <Link to="/terms" className="font-bold text-[#F36B16] hover:underline">
                  Terms of Service
                </Link>{' '}
                &{' '}
                <Link to="/privacy" className="font-bold text-[#F36B16] hover:underline">
                  Privacy Policy
                </Link>.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#F36B16] to-[#C95C2D] hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-xs py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60 mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>CREATE ACCOUNT</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="text-center text-xs text-slate-600 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="font-extrabold text-[#F36B16] hover:underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
};
