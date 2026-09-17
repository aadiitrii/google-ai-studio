import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, Phone, Sparkles, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authMode, setAuthMode, login, signup, loginDemoUser } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (authMode === 'login') {
      if (!email.trim()) {
        setError('Please enter your email address');
        return;
      }
      login(email, password);
    } else {
      if (!name.trim() || !email.trim()) {
        setError('Please fill in your name and email');
        return;
      }
      signup(name, email, password, phone);
    }
  };

  return (
    <div id="auth-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div 
        id="auth-modal-container"
        className="bg-[#FAF8F5] border border-[#E6E0D6] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="auth-modal-close-btn"
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-[#8E8275] hover:text-[#1A1816] p-1.5 rounded-full hover:bg-[#F3EFEA] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pt-8 pb-6 px-8 text-center border-b border-[#E6E0D6]/60 bg-gradient-to-b from-[#F3EFEA]/80 to-transparent">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A880]/15 text-[#A88656] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            sho-pro Privilège
          </div>
          <h2 className="text-3xl font-serif font-medium text-[#1A1816] tracking-tight">
            {authMode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="text-xs text-[#8E8275] mt-1.5 max-w-xs mx-auto">
            {authMode === 'login'
              ? 'Sign in to access your curated style bag, member rewards, and order tracking.'
              : 'Join the sho-pro circle to unlock personal style picks and instant ₹250 welcome reward.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 border-b border-[#E6E0D6]">
          <button
            id="auth-tab-login"
            type="button"
            onClick={() => { setAuthMode('login'); setError(''); }}
            className={`py-3 text-sm font-medium transition-colors ${
              authMode === 'login'
                ? 'text-[#1A1816] border-b-2 border-[#1A1816] bg-[#FAF8F5]'
                : 'text-[#8E8275] hover:text-[#1A1816] bg-[#F3EFEA]/40'
            }`}
          >
            Sign In
          </button>
          <button
            id="auth-tab-signup"
            type="button"
            onClick={() => { setAuthMode('signup'); setError(''); }}
            className={`py-3 text-sm font-medium transition-colors ${
              authMode === 'signup'
                ? 'text-[#1A1816] border-b-2 border-[#1A1816] bg-[#FAF8F5]'
                : 'text-[#8E8275] hover:text-[#1A1816] bg-[#F3EFEA]/40'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-[#4A443E] uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8E8275] absolute left-3.5 top-3" />
                  <input
                    id="signup-name-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aria Montgomery"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E6E0D6] bg-white text-sm text-[#1A1816] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#4A443E] uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8E8275] absolute left-3.5 top-3" />
                <input
                  id="auth-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@fashion.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E6E0D6] bg-white text-sm text-[#1A1816] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]"
                />
              </div>
            </div>

            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-[#4A443E] uppercase tracking-wider mb-1.5">
                  Phone (For Delivery Updates)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8E8275] absolute left-3.5 top-3" />
                  <input
                    id="signup-phone-input"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E6E0D6] bg-white text-sm text-[#1A1816] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#4A443E] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8E8275] absolute left-3.5 top-3" />
                <input
                  id="auth-password-input"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E6E0D6] bg-white text-sm text-[#1A1816] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]"
                />
              </div>
            </div>

            <button
              id="auth-submit-btn"
              type="submit"
              className="w-full mt-2 py-3 px-6 rounded-lg bg-[#1A1816] text-[#FAF8F5] text-sm font-medium tracking-wide hover:bg-[#2E2A27] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              {authMode === 'login' ? 'Continue to sho-pro' : 'Create Member Account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E6E0D6]" />
            </div>
            <span className="relative px-3 bg-[#FAF8F5] text-[11px] uppercase tracking-wider text-[#8E8275]">
              Or Quick Test
            </span>
          </div>

          {/* Quick Demo Fill Button */}
          <button
            id="demo-login-quick-btn"
            type="button"
            onClick={loginDemoUser}
            className="w-full py-2.5 px-4 rounded-lg border border-[#C5A880]/60 bg-[#C5A880]/10 hover:bg-[#C5A880]/20 text-[#A88656] text-xs font-medium tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            1-Click Demo Login (Gold VIP • 450 Credits)
          </button>
        </div>
      </div>
    </div>
  );
};
