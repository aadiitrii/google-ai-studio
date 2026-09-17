import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Sparkles, Check } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    originalTotal,
    totalSavings,
    couponDiscount,
    rewardDiscountAmount,
    shippingFee,
    finalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    applyRewardPoints,
    setApplyRewardPoints,
    setIsCheckoutOpen
  } = useCart();

  const { user, openAuthModal } = useAuth();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const freeShippingThreshold = 999;
  const progressToFree = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = freeShippingThreshold - subtotal;

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        id="cart-drawer-panel"
        className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#E6E0D6] animate-slideLeft relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E6E0D6] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#1A1816]" />
            <h2 className="text-lg font-serif font-medium text-[#1A1816]">
              Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h2>
          </div>
          <button
            id="close-cart-btn"
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-[#8E8275] hover:text-[#1A1816] rounded-full hover:bg-[#F3EFEA]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-5 py-3 bg-[#F3EFEA] border-b border-[#E6E0D6]">
          <div className="flex items-center justify-between text-xs text-[#5E574E] mb-1.5 font-medium">
            <span>
              {amountNeeded > 0
                ? `Add ₹${amountNeeded.toLocaleString('en-IN')} more for Free Express Delivery`
                : 'Complimentary Express Delivery Unlocked!'}
            </span>
            <span className="font-bold text-[#A88656]">{progressToFree}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#E6E0D6] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C5A880] rounded-full transition-all duration-500"
              style={{ width: `${progressToFree}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#8E8275]">
              <div className="w-16 h-16 rounded-full bg-[#F3EFEA] flex items-center justify-center mb-3 text-[#A88656]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <p className="text-base font-serif font-medium text-[#1A1816]">Your bag is empty</p>
              <p className="text-xs text-[#8E8275] mt-1 max-w-xs">
                Explore our aesthetic drops and trendy essentials at reasonable rates.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-5 px-5 py-2.5 rounded-lg bg-[#1A1816] text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase cursor-pointer hover:bg-[#2E2A27]"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3.5 p-3.5 bg-white rounded-xl border border-[#E6E0D6] relative group"
              >
                {/* Thumbnail */}
                <div className="w-20 aspect-[3/4] rounded-lg overflow-hidden bg-[#F3EFEA] flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between pr-5">
                      <h4 className="text-xs font-semibold text-[#1A1816] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#8E8275] hover:text-rose-600 transition-colors p-1"
                        aria-label="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-[#8E8275] mt-1">
                      <span>Size: <strong className="text-[#1A1816]">{item.size}</strong></span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/20"
                          style={{ backgroundColor: item.color.hex }}
                        />
                        {item.color.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F3EFEA]">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#E6E0D6] rounded-md overflow-hidden bg-[#FAF8F5]">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-xs text-[#8E8275] hover:text-[#1A1816] font-medium"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-semibold text-[#1A1816]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-xs text-[#8E8275] hover:text-[#1A1816] font-medium"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <span className="text-sm font-semibold text-[#1A1816]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <span className="block text-[10px] text-[#8E8275] line-through">
                        ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[#E6E0D6] space-y-3.5">
            {/* Promo Code Box */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <Tag className="w-3.5 h-3.5" />
                    <span><strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.description})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-emerald-900 font-semibold underline hover:text-emerald-950"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter Promo Code (e.g. TRENDY20)"
                    className="flex-1 px-3 py-2 rounded-lg border border-[#E6E0D6] text-xs uppercase placeholder:normal-case focus:outline-none focus:border-[#C5A880]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#FAF8F5] border border-[#E6E0D6] hover:bg-[#1A1816] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>}
            </div>

            {/* Loyalty / Rewards Deduction */}
            {user ? (
              <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E6E0D6] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#A88656]" />
                  <div>
                    <p className="font-semibold text-[#1A1816]">sho-pro Luxe Credits</p>
                    <p className="text-[10px] text-[#8E8275]">
                      You have {user.rewardPoints} points (Worth ₹{user.rewardPoints})
                    </p>
                  </div>
                </div>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={applyRewardPoints}
                    onChange={(e) => setApplyRewardPoints(e.target.checked)}
                    className="rounded border-[#C5A880] text-[#1A1816] focus:ring-[#C5A880]"
                  />
                  <span className="text-[11px] font-medium text-[#1A1816]">Use Points</span>
                </label>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="w-full text-left p-2 rounded-lg bg-[#FAF8F5] border border-[#E6E0D6] text-xs flex items-center justify-between text-[#8E8275] hover:text-[#1A1816]"
              >
                <span>Sign in to redeem reward credits & unlock scratchcard</span>
                <span className="font-semibold text-[#A88656]">Login</span>
              </button>
            )}

            {/* Bill Calculation */}
            <div className="space-y-1.5 text-xs text-[#5E574E] pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Coupon Discount</span>
                  <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              {rewardDiscountAmount > 0 && (
                <div className="flex justify-between text-[#A88656]">
                  <span>Luxe Credits Used</span>
                  <span>-₹{rewardDiscountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-800">FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-[11px] text-emerald-800 font-medium">
                  <span>Total Value Savings</span>
                  <span>₹{totalSavings.toLocaleString('en-IN')} Saved</span>
                </div>
              )}
              <div className="flex justify-between text-base font-semibold text-[#1A1816] pt-2 border-t border-[#E6E0D6]">
                <span>Total Amount</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              id="cart-checkout-proceed-btn"
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-6 rounded-xl bg-[#1A1816] hover:bg-[#2E2A27] text-[#FAF8F5] text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
