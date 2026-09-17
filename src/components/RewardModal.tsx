import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, Gift, Check, Copy, ArrowRight, 
  RotateCw, Award, CheckCircle2, PackageCheck, Truck, Clock, ShieldCheck
} from 'lucide-react';

export const RewardModal: React.FC = () => {
  const { isRewardModalOpen, setIsRewardModalOpen, lastOrder } = useCart();
  const { addReward, user } = useAuth();

  const [activeTab, setActiveTab] = useState<'reward' | 'order_summary'>('reward');
  const [rewardMode, setRewardMode] = useState<'scratch' | 'wheel'>('scratch');
  
  // Scratchcard state
  const [isScratched, setIsScratched] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [copied, setCopied] = useState(false);

  // Wheel state
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wheelReward, setWheelReward] = useState<string | null>(null);

  // Reward parameters generated for this purchase
  const earnedCashback = lastOrder ? Math.max(300, Math.round(lastOrder.total * 0.2)) : 350;
  const rewardVoucherCode = `PRO-LUXE-${Math.floor(100 + Math.random() * 900)}`;

  // Trigger celebration confetti on open
  useEffect(() => {
    if (isRewardModalOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C5A880', '#1A1816', '#FAF8F5', '#E6DEC9']
        });
      } catch {
        // ignore if not supported
      }
    }
  }, [isRewardModalOpen]);

  if (!isRewardModalOpen || !lastOrder) return null;

  const handleScratchReveal = () => {
    if (isScratched) return;
    setIsScratched(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#FAF8F5', '#A88656']
      });
    } catch {
      // ignore
    }
  };

  const handleSpinWheel = () => {
    if (isSpinning || isScratched) return;
    setIsSpinning(true);
    const spins = 5;
    const randomAngle = Math.floor(Math.random() * 360);
    const totalAngle = wheelRotation + spins * 360 + randomAngle;
    setWheelRotation(totalAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setIsScratched(true);
      setWheelReward(`₹${earnedCashback} Luxe Cashback + 30% Privilege Drop Voucher`);
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          colors: ['#C5A880', '#DFB15B', '#111']
        });
      } catch {
        // ignore
      }
    }, 3200);
  };

  const handleClaimReward = () => {
    addReward({
      id: `rew-${Date.now()}`,
      title: 'Post-Purchase Mystery Reward',
      code: rewardVoucherCode,
      value: `₹${earnedCashback} Cashback`,
      expiry: '60 Days',
      type: 'cashback'
    }, earnedCashback);

    setIsClaimed(true);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(rewardVoucherCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="reward-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto animate-fadeIn">
      <div 
        id="reward-modal-container"
        className="bg-[#FAF8F5] border border-[#C5A880]/60 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl relative my-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Banner */}
        <div className="bg-[#1A1816] text-[#FAF8F5] p-6 text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#C5A880]/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-[#C5A880]/20 rounded-full blur-2xl" />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/40 text-[#C5A880] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Order Placed Successfully
          </div>
          
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-white tracking-tight">
            Thank You for Shopping with sho-pro
          </h2>
          <p className="text-xs text-[#E6E0D6] mt-1">
            Order #{lastOrder.orderId} has been received & is being tailored for dispatch.
          </p>

          {/* Navigation View Switch */}
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => setActiveTab('reward')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'reward'
                  ? 'bg-[#C5A880] text-[#1A1816] shadow-md'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              🎁 Unlock Your Post-Purchase Reward
            </button>
            <button
              onClick={() => setActiveTab('order_summary')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'order_summary'
                  ? 'bg-[#C5A880] text-[#1A1816] shadow-md'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              📦 Order Receipt & Tracking
            </button>
          </div>
        </div>

        {/* Tab 1: Interactive Reward Flow */}
        {activeTab === 'reward' && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="text-center max-w-md mx-auto">
              <span className="text-xs uppercase font-bold tracking-widest text-[#A88656]">
                sho-pro Privilège Circle
              </span>
              <h3 className="text-xl font-serif font-medium text-[#1A1816] mt-1">
                Your Exclusive Post-Purchase Reward
              </h3>
              <p className="text-xs text-[#8E8275] mt-1">
                Every purchase unlocks an instant reward! Scratch the card or spin the wheel to claim your surprise perk.
              </p>

              {/* Mode switch */}
              <div className="inline-flex rounded-lg p-1 bg-[#F3EFEA] border border-[#E6E0D6] mt-3">
                <button
                  type="button"
                  onClick={() => setRewardMode('scratch')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    rewardMode === 'scratch'
                      ? 'bg-white text-[#1A1816] shadow-xs'
                      : 'text-[#8E8275] hover:text-[#1A1816]'
                  }`}
                >
                  Golden Scratch Card
                </button>
                <button
                  type="button"
                  onClick={() => setRewardMode('wheel')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    rewardMode === 'wheel'
                      ? 'bg-white text-[#1A1816] shadow-xs'
                      : 'text-[#8E8275] hover:text-[#1A1816]'
                  }`}
                >
                  Spin Fortune Wheel
                </button>
              </div>
            </div>

            {/* Mode A: Scratchcard */}
            {rewardMode === 'scratch' && (
              <div className="max-w-sm mx-auto">
                <div
                  id="scratch-card-interactive"
                  onClick={handleScratchReveal}
                  className={`relative aspect-[16/10] w-full rounded-2xl overflow-hidden border-2 transition-all duration-500 cursor-pointer shadow-xl ${
                    isScratched
                      ? 'border-[#C5A880] bg-gradient-to-br from-[#FFFBF2] via-[#F7EED9] to-[#EBD9BA]'
                      : 'border-[#C5A880]/80 bg-gradient-to-br from-[#DFB15B] via-[#C5A880] to-[#8C6D3F] hover:scale-[1.02]'
                  }`}
                >
                  {/* Underneath Revealed Content */}
                  <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-[#1A1816] text-[#C5A880] flex items-center justify-center mb-2 shadow">
                      <Gift className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#A88656]">
                      Jackpot Unlocked
                    </span>
                    <h4 className="text-2xl font-serif font-bold text-[#1A1816] mt-0.5">
                      ₹{earnedCashback} Cashback
                    </h4>
                    <p className="text-xs text-[#5E574E] mt-0.5">
                      + 25% Off VIP Voucher on Next Drop
                    </p>
                  </div>

                  {/* Top Scratch Foil Overlay */}
                  {!isScratched && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#DFB15B] via-[#C5A880] to-[#9C7A45] flex flex-col items-center justify-center text-center text-white p-4 select-none">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 animate-bounce">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <p className="font-serif text-lg font-bold tracking-wide drop-shadow-sm">
                        GOLDEN SCRATCH CARD
                      </p>
                      <p className="text-xs text-white/90 mt-1 font-medium bg-black/20 px-3 py-1 rounded-full">
                        Tap to Scratch & Reveal
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mode B: Wheel */}
            {rewardMode === 'wheel' && (
              <div className="max-w-xs mx-auto text-center">
                <div className="relative w-48 h-48 mx-auto my-2">
                  {/* Wheel Pointer */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[16px] border-t-[#1A1816]" />
                  
                  {/* Rotating Wheel graphic */}
                  <div
                    className="w-full h-full rounded-full border-4 border-[#C5A880] overflow-hidden shadow-xl transition-transform duration-3000 ease-out flex items-center justify-center"
                    style={{
                      transform: `rotate(${wheelRotation}deg)`,
                      background: 'conic-gradient(#C5A880 0deg 60deg, #1A1816 60deg 120deg, #DFB15B 120deg 180deg, #2E2A27 180deg 240deg, #C5A880 240deg 300deg, #4A443E 300deg 360deg)'
                    }}
                  >
                    <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border-2 border-[#C5A880] flex items-center justify-center text-xs font-bold text-[#1A1816] shadow-md z-10">
                      sho-pro
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isSpinning || isScratched}
                  onClick={handleSpinWheel}
                  className="mt-3 px-6 py-2 rounded-xl bg-[#1A1816] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#2E2A27] transition-all disabled:opacity-60 cursor-pointer shadow-md flex items-center justify-center gap-2 mx-auto"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
                  {isSpinning ? 'Spinning for Perks...' : isScratched ? 'Prize Unlocked!' : 'Spin the Luxe Wheel'}
                </button>
              </div>
            )}

            {/* Revealed Reward Claim & Voucher Box */}
            {isScratched && (
              <div className="p-5 rounded-xl bg-white border border-[#E6E0D6] space-y-4 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#A88656]">
                      Privilege Coupon Code
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-base font-bold text-[#1A1816] bg-[#F3EFEA] px-3 py-1 rounded-md border border-[#E6E0D6]">
                        {rewardVoucherCode}
                      </span>
                      <button
                        onClick={handleCopyCode}
                        className="p-1.5 rounded-md hover:bg-[#F3EFEA] text-[#8E8275] hover:text-[#1A1816] border border-[#E6E0D6]"
                        title="Copy Code"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Claim Button */}
                  <div>
                    {isClaimed ? (
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-2.5 rounded-lg border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4" />
                        ₹{earnedCashback} Credited to Your Wallet!
                      </div>
                    ) : (
                      <button
                        id="claim-reward-btn"
                        onClick={handleClaimReward}
                        className="py-2.5 px-6 rounded-lg bg-[#1A1816] hover:bg-[#2E2A27] text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                        Claim & Add ₹{earnedCashback} to Wallet
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-[11px] text-[#8E8275] border-t border-[#F3EFEA] pt-3">
                  • Instant reward points have 60 days validity • Valid on all upcoming drops, luxury coordinates, and curated collections.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Order Receipt & Tracking */}
        {activeTab === 'order_summary' && (
          <div className="p-6 md:p-8 space-y-6">
            {/* Delivery Tracking Step Timeline */}
            <div className="bg-white p-5 rounded-xl border border-[#E6E0D6]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1816] mb-4">
                Delivery Dispatch Timeline
              </h4>
              
              <div className="grid grid-cols-4 gap-2 text-center relative">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold mb-1 shadow-xs">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#1A1816]">Confirmed</span>
                  <span className="text-[9px] text-[#8E8275]">Today</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#1A1816] text-[#C5A880] flex items-center justify-center text-xs font-bold mb-1 shadow-xs animate-pulse">
                    <PackageCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#1A1816]">Packing</span>
                  <span className="text-[9px] text-[#8E8275]">Within 12 hrs</span>
                </div>

                <div className="flex flex-col items-center opacity-60">
                  <div className="w-8 h-8 rounded-full bg-[#F3EFEA] border border-[#E6E0D6] text-[#8E8275] flex items-center justify-center text-xs font-bold mb-1">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#5E574E]">In Transit</span>
                  <span className="text-[9px] text-[#8E8275]">Express Courier</span>
                </div>

                <div className="flex flex-col items-center opacity-60">
                  <div className="w-8 h-8 rounded-full bg-[#F3EFEA] border border-[#E6E0D6] text-[#8E8275] flex items-center justify-center text-xs font-bold mb-1">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#5E574E]">Delivery</span>
                  <span className="text-[9px] text-[#8E8275]">2-3 Days</span>
                </div>
              </div>
            </div>

            {/* Order Items & Breakdown */}
            <div className="bg-white p-5 rounded-xl border border-[#E6E0D6] space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-[#F3EFEA]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#A88656]">Order Reference</span>
                  <p className="text-xs font-mono font-bold text-[#1A1816]">#{lastOrder.orderId}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-[#A88656]">Payment Method</span>
                  <p className="text-xs font-semibold text-[#1A1816]">{lastOrder.paymentMethod}</p>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {lastOrder.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-8 h-10 object-cover rounded" />
                      <div>
                        <p className="font-medium text-[#1A1816]">{item.product.name}</p>
                        <p className="text-[10px] text-[#8E8275]">Size: {item.size} • Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-[#1A1816]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Summary */}
              <div className="pt-3 border-t border-[#F3EFEA] space-y-1 text-xs text-[#5E574E]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{lastOrder.subtotal.toLocaleString('en-IN')}</span>
                </div>
                {lastOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Discount</span>
                    <span>-₹{lastOrder.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {lastOrder.rewardPointsUsed > 0 && (
                  <div className="flex justify-between text-[#A88656]">
                    <span>Luxe Credits</span>
                    <span>-₹{lastOrder.rewardPointsUsed.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-semibold text-[#1A1816] pt-2 border-t border-[#E6E0D6]">
                  <span>Total Paid</span>
                  <span>₹{lastOrder.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Delivery address display */}
            <div className="p-4 rounded-xl bg-[#F3EFEA] text-xs text-[#5E574E]">
              <p className="font-semibold text-[#1A1816] mb-0.5">Shipping Destination:</p>
              <p>{lastOrder.shippingAddress.fullName} • {lastOrder.shippingAddress.phone}</p>
              <p>{lastOrder.shippingAddress.street}, {lastOrder.shippingAddress.city}, {lastOrder.shippingAddress.pincode}</p>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="p-6 bg-white border-t border-[#E6E0D6] flex items-center justify-between">
          <button
            onClick={() => setIsRewardModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-[#8E8275] hover:text-[#1A1816] cursor-pointer"
          >
            Close Receipt
          </button>

          <button
            onClick={() => setIsRewardModalOpen(false)}
            className="py-2.5 px-6 rounded-lg bg-[#1A1816] hover:bg-[#2E2A27] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <span>Continue Browsing New Drops</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
          </button>
        </div>
      </div>
    </div>
  );
};
