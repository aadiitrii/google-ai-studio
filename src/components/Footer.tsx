import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Truck, RefreshCw, Smartphone, CreditCard, Banknote, ArrowRight, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useCart();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    showToast('VIP Privilège pass & ₹300 discount code sent to your email!');
    setEmailInput('');
  };

  return (
    <footer className="bg-[#141312] text-[#E6E0D6] border-t border-[#22201E] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & VIP Welcome section */}
        <div className="bg-[#1A1816] rounded-2xl p-6 sm:p-8 border border-[#33302B] mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A880]/15 text-[#C5A880] text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                sho-pro Privilège Circle
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-medium text-white">
                Unlock 20% Off Your First Aesthetic Drop
              </h3>
              <p className="text-xs text-[#9B958C] mt-1">
                Receive secret sale access, bespoke styling drops, and post-purchase loyalty credits.
              </p>
            </div>

            <div className="md:col-span-5">
              {subscribed ? (
                <div className="p-3.5 bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                  <span>Welcome to the Circle! Use code <strong>TRENDY20</strong> at checkout.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#22201E] border border-[#3A3631] text-xs text-white placeholder:text-[#8E8275] focus:outline-none focus:border-[#C5A880]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#C5A880] hover:bg-[#B3946C] text-[#141312] text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-[#2A2723] text-xs">
          <div>
            <span className="font-serif text-2xl font-bold text-white tracking-tight">sho-pro</span>
            <p className="text-xs text-[#9B958C] mt-2 leading-relaxed">
              Curating runway-inspired aesthetics, European flax linens, and structural streetwear at delightfully reasonable rates.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-[#C5A880]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Aesthetic • Classy • Lavish</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold uppercase tracking-wider text-white mb-3">Trending Drops</h4>
            <ul className="space-y-2 text-[#9B958C]">
              <li><a href="#" className="hover:text-white transition-colors">Florence Linen Blazers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Milan Silk Slip Dresses</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Heavyweight Kyoto Boxy Tees</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Riviera Pleated Trousers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">18K Hypoallergenic Jewelry</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold uppercase tracking-wider text-white mb-3">Client Care & FAQ</h4>
            <ul className="space-y-2 text-[#9B958C]">
              <li><a href="#" className="hover:text-white transition-colors">Track Active Shipment</a></li>
              <li><a href="#" className="hover:text-white transition-colors">7-Day Return Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Post-Purchase Rewards FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guide & Fit Predictor</a></li>
              <li><a href="#" className="hover:text-white transition-colors">VIP Privilège Points</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold uppercase tracking-wider text-white mb-3">Supported Payments</h4>
            <div className="space-y-2 text-[#9B958C]">
              <div className="flex items-center gap-2">
                <Banknote className="w-4 h-4 text-emerald-500" />
                <span>Cash on Delivery (COD)</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Google Pay (GPay) & PhonePe</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#C5A880]" />
                <span>Credit/Debit Cards & UPI QR</span>
              </div>
              <p className="text-[10px] text-[#6E685F] pt-2">
                Zero processing surcharges on COD or UPI transactions.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6E685F] gap-4">
          <p>© {new Date().getFullYear()} sho-pro Inc. All rights reserved. Crafted with aesthetic precision.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Terms of Luxury Service</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Security Guarantee</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
