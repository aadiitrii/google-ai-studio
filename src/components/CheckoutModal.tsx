import React, { useState } from 'react';
import { useCart, OrderDetails } from '../context/CartContext';
import { useAuth, UserAddress } from '../context/AuthContext';
import { 
  X, Check, ShieldCheck, Truck, CreditCard, 
  Smartphone, Banknote, QrCode, ArrowRight, Loader2, Sparkles, AlertCircle
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    subtotal,
    couponDiscount,
    rewardDiscountAmount,
    shippingFee,
    finalTotal,
    appliedCoupon,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    setLastOrder,
    setIsRewardModalOpen
  } = useCart();

  const { user, updateAddress } = useAuth();

  // Address state
  const [address, setAddress] = useState<UserAddress>(() => {
    if (user?.address) return user.address;
    return {
      fullName: 'Aria Montgomery',
      phone: '+91 98765 43210',
      street: 'Flat 4B, The Oberoi Enclave, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      landmark: 'Near Turner Road'
    };
  });

  // Payment method selection
  // Options: 'gpay' | 'phonepe' | 'cod' | 'upi_qr' | 'card' | 'wallet'
  const [paymentMethod, setPaymentMethod] = useState<'gpay' | 'phonepe' | 'cod' | 'upi_qr' | 'card' | 'wallet'>('gpay');

  // Specific payment states
  const [gpayUpiId, setGpayUpiId] = useState('aria.fashion@okaxis');
  const [phonepeNumber, setPhonepeNumber] = useState('9876543210');
  const [cardDetails, setCardDetails] = useState({
    number: '4532 •••• •••• 8821',
    name: 'ARIA MONTGOMERY',
    expiry: '08/29',
    cvv: '742'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isCheckoutOpen) return null;

  const handleAddressChange = (field: keyof UserAddress, value: string) => {
    const updated = { ...address, [field]: value };
    setAddress(updated);
    updateAddress(updated);
  };

  const handlePlaceOrder = () => {
    if (!address.fullName.trim() || !address.street.trim() || !address.pincode.trim()) {
      setErrorMessage('Please complete your delivery address');
      return;
    }

    setErrorMessage('');
    setIsProcessing(true);

    // Simulate luxury payment gateway authorization
    setTimeout(() => {
      const orderId = `SHO-${Math.floor(100000 + Math.random() * 900000)}`;
      const earnedRewardPoints = Math.round(finalTotal * 0.15); // 15% cashback in reward points!

      const newOrder: OrderDetails = {
        orderId,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        items: [...cart],
        subtotal,
        discount: couponDiscount,
        rewardPointsUsed: rewardDiscountAmount,
        shipping: shippingFee,
        total: finalTotal,
        paymentMethod:
          paymentMethod === 'gpay'
            ? 'Google Pay (GPay UPI)'
            : paymentMethod === 'phonepe'
            ? 'PhonePe UPI'
            : paymentMethod === 'cod'
            ? 'Cash on Delivery (COD)'
            : paymentMethod === 'upi_qr'
            ? 'Paytm / Scan & Pay UPI'
            : paymentMethod === 'wallet'
            ? 'sho-pro Luxe Wallet Credits'
            : 'Credit / Debit Card',
        paymentStatus: paymentMethod === 'cod' ? 'Pending COD Verification' : 'Paid',
        shippingAddress: address,
        rewardEarned: {
          points: earnedRewardPoints,
          couponCode: `PRO-REWARD-${Math.floor(10 + Math.random() * 90)}`,
          description: `₹${earnedRewardPoints} Luxe Credits + Post-Purchase Surprise Reward`
        }
      };

      setLastOrder(newOrder);
      clearCart();
      setIsProcessing(false);
      setIsCheckoutOpen(false);

      // Trigger reward modal immediately!
      setIsRewardModalOpen(true);
    }, 1600);
  };

  return (
    <div id="checkout-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
      <div 
        id="checkout-modal-container"
        className="bg-[#FAF8F5] border border-[#E6E0D6] rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative my-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#FAF8F5]/95 backdrop-blur-md z-10 px-6 py-4 border-b border-[#E6E0D6] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#1A1816] text-[#C5A880]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-medium text-[#1A1816]">
                Secure Express Checkout
              </h2>
              <p className="text-xs text-[#8E8275]">
                256-bit Encrypted • 100% Secure Payment • Buyer Protection
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="text-[#8E8275] hover:text-[#1A1816] p-1.5 rounded-full hover:bg-[#F3EFEA]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Address & Payment Options */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Shipping Address */}
            <div className="bg-white rounded-xl p-5 border border-[#E6E0D6]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1A1816] text-[#FAF8F5] text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1A1816]">
                    Delivery Address
                  </h3>
                </div>
                <span className="text-[11px] text-[#A88656] font-medium flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" />
                  Estimated: 2-3 Days
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-[#5E574E] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={e => handleAddressChange('fullName', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E6E0D6] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#5E574E] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    value={address.phone}
                    onChange={e => handleAddressChange('phone', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E6E0D6] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-[#5E574E] mb-1">
                    Street Address / Apartment *
                  </label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={e => handleAddressChange('street', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E6E0D6] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#5E574E] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={e => handleAddressChange('city', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E6E0D6] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#5E574E] mb-1">
                    Pincode / Postal Code *
                  </label>
                  <input
                    type="text"
                    value={address.pincode}
                    onChange={e => handleAddressChange('pincode', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E6E0D6] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method Options */}
            <div className="bg-white rounded-xl p-5 border border-[#E6E0D6]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1A1816] text-[#FAF8F5] text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1A1816]">
                    Select Payment Method
                  </h3>
                </div>
                <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Multiple Options Available
                </span>
              </div>

              {/* Payment Tabs / Radio Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {/* 1. Google Pay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('gpay')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'gpay'
                      ? 'border-[#1A1816] bg-[#F3EFEA] ring-1 ring-[#1A1816]'
                      : 'border-[#E6E0D6] hover:border-[#C5A880]/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-[#1A1816]">Google Pay</span>
                    <Smartphone className="w-4 h-4 text-emerald-800" />
                  </div>
                  <span className="text-[10px] text-[#8E8275]">Instant UPI / Fast</span>
                </button>

                {/* 2. PhonePe */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('phonepe')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'phonepe'
                      ? 'border-[#1A1816] bg-[#F3EFEA] ring-1 ring-[#1A1816]'
                      : 'border-[#E6E0D6] hover:border-[#C5A880]/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-[#5f259f]">PhonePe</span>
                    <Smartphone className="w-4 h-4 text-[#5f259f]" />
                  </div>
                  <span className="text-[10px] text-[#8E8275]">UPI & Wallet</span>
                </button>

                {/* 3. Cash on Delivery (COD) */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'cod'
                      ? 'border-[#1A1816] bg-[#F3EFEA] ring-1 ring-[#1A1816]'
                      : 'border-[#E6E0D6] hover:border-[#C5A880]/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-[#1A1816]">Cash on Delivery</span>
                    <Banknote className="w-4 h-4 text-emerald-700" />
                  </div>
                  <span className="text-[10px] text-[#8E8275]">Pay at Doorstep</span>
                </button>

                {/* 4. Paytm / UPI QR */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi_qr')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'upi_qr'
                      ? 'border-[#1A1816] bg-[#F3EFEA] ring-1 ring-[#1A1816]'
                      : 'border-[#E6E0D6] hover:border-[#C5A880]/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-[#002e6e]">Paytm / UPI QR</span>
                    <QrCode className="w-4 h-4 text-[#002e6e]" />
                  </div>
                  <span className="text-[10px] text-[#8E8275]">Scan Any App</span>
                </button>

                {/* 5. Credit / Debit Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'card'
                      ? 'border-[#1A1816] bg-[#F3EFEA] ring-1 ring-[#1A1816]'
                      : 'border-[#E6E0D6] hover:border-[#C5A880]/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-[#1A1816]">Cards</span>
                    <CreditCard className="w-4 h-4 text-[#A88656]" />
                  </div>
                  <span className="text-[10px] text-[#8E8275]">Visa / Master / Amex</span>
                </button>

                {/* 6. sho-pro Luxe Wallet */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'wallet'
                      ? 'border-[#1A1816] bg-[#F3EFEA] ring-1 ring-[#1A1816]'
                      : 'border-[#E6E0D6] hover:border-[#C5A880]/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-[#A88656]">Luxe Wallet</span>
                    <Sparkles className="w-4 h-4 text-[#C5A880]" />
                  </div>
                  <span className="text-[10px] text-[#8E8275]">₹{user?.rewardPoints || 0} Credits</span>
                </button>
              </div>

              {/* Dynamic Payment Method Details Panel */}
              <div className="mt-4 p-4 rounded-xl bg-[#FAF8F5] border border-[#E6E0D6]">
                {/* GPay View */}
                {paymentMethod === 'gpay' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#1A1816]">Google Pay UPI VPA</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                        Fast & Verified
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={gpayUpiId}
                        onChange={e => setGpayUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="flex-1 px-3 py-2 text-xs rounded-lg border border-[#E6E0D6] bg-white focus:outline-none focus:border-[#C5A880]"
                      />
                      <button
                        type="button"
                        className="px-3 py-2 rounded-lg bg-white border border-[#E6E0D6] text-xs font-semibold text-[#1A1816]"
                      >
                        Verify UPI
                      </button>
                    </div>
                    <p className="text-[11px] text-[#8E8275]">
                      A secure payment notification prompt will be initiated directly via your Google Pay app.
                    </p>
                  </div>
                )}

                {/* PhonePe View */}
                {paymentMethod === 'phonepe' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#5f259f]">PhonePe Linked Number</span>
                      <span className="text-[10px] bg-purple-100 text-[#5f259f] font-semibold px-2 py-0.5 rounded">
                        Direct UPI Auth
                      </span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-xs text-[#8E8275]">+91</span>
                      <input
                        type="text"
                        value={phonepeNumber}
                        onChange={e => setPhonepeNumber(e.target.value)}
                        placeholder="9876543210"
                        className="w-full pl-10 pr-3 py-2 text-xs rounded-lg border border-[#E6E0D6] bg-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                    <p className="text-[11px] text-[#8E8275]">
                      Accept the incoming mandate on your PhonePe mobile app to complete the transaction.
                    </p>
                  </div>
                )}

                {/* COD View */}
                {paymentMethod === 'cod' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800">
                      <Banknote className="w-4 h-4" />
                      <span className="text-xs font-semibold">Cash on Delivery Confirmed</span>
                    </div>
                    <p className="text-xs text-[#5E574E]">
                      Pay ₹{finalTotal.toLocaleString('en-IN')} with cash or via any UPI app upon delivery at your doorstep. Zero extra processing surcharge.
                    </p>
                    <p className="text-[11px] text-[#8E8275]">
                      • Free inspection before accepting • Seamless contactless option available with delivery partner.
                    </p>
                  </div>
                )}

                {/* UPI QR View */}
                {paymentMethod === 'upi_qr' && (
                  <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <div className="w-24 h-24 p-2 bg-white rounded-lg border border-[#E6E0D6] flex items-center justify-center shadow-xs">
                      {/* Stylized QR Code Visual */}
                      <div className="w-full h-full border-2 border-dashed border-[#1A1816] flex flex-col items-center justify-center p-1">
                        <QrCode className="w-12 h-12 text-[#1A1816]" />
                        <span className="text-[8px] font-bold tracking-widest text-[#1A1816]">UPI • PAY</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-[#1A1816]">Scan & Pay with Any UPI App</p>
                      <p className="text-[11px] text-[#8E8275]">
                        Compatible with Paytm, Google Pay, PhonePe, CRED, Amazon Pay, or BHIM.
                      </p>
                      <p className="text-xs font-mono font-bold text-[#A88656]">
                        UPI ID: shopro.luxe@icici
                      </p>
                    </div>
                  </div>
                )}

                {/* Card View */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                      <div className="col-span-2">
                        <label className="block text-[10px] uppercase font-semibold text-[#8E8275] mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardDetails.number}
                          onChange={e => setCardDetails({ ...cardDetails, number: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-[#E6E0D6] bg-white text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-semibold text-[#8E8275] mb-1">
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardDetails.expiry}
                          onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-[#E6E0D6] bg-white text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-semibold text-[#8E8275] mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          value={cardDetails.cvv}
                          onChange={e => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-[#E6E0D6] bg-white text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Wallet View */}
                {paymentMethod === 'wallet' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#1A1816]">sho-pro Luxe Credits Balance</span>
                      <span className="font-bold text-[#A88656]">₹{user?.rewardPoints || 0}</span>
                    </div>
                    <p className="text-[11px] text-[#8E8275]">
                      Use your membership earnings, scratchcard rewards, and VIP credits toward this purchase.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Order Review & Final Pay */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-xl p-5 border border-[#E6E0D6] space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1A1816] pb-2 border-b border-[#F3EFEA]">
                Order Summary ({cart.length} unique styles)
              </h3>

              {/* Items preview list */}
              <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-9 h-11 object-cover rounded bg-[#F3EFEA]"
                      />
                      <div className="max-w-[140px]">
                        <p className="font-medium text-[#1A1816] truncate">{item.product.name}</p>
                        <p className="text-[10px] text-[#8E8275]">
                          Qty: {item.quantity} • {item.size}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-[#1A1816]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculation breakdown */}
              <div className="space-y-2 pt-3 border-t border-[#F3EFEA] text-xs text-[#5E574E]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Coupon ({appliedCoupon.code})</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {rewardDiscountAmount > 0 && (
                  <div className="flex justify-between text-[#A88656] font-medium">
                    <span>Luxe Credits</span>
                    <span>-₹{rewardDiscountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-800">FREE EXPRESS</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#1A1816] pt-2 border-t border-[#E6E0D6]">
                  <span>Total Payable</span>
                  <span className="text-lg">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Post Purchase Reward Teaser Banner */}
              <div className="p-3 rounded-lg bg-gradient-to-r from-[#FAF8F5] to-[#F3EFEA] border border-[#C5A880]/50 flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#C5A880] flex-shrink-0" />
                <p className="text-[11px] text-[#4A443E] leading-snug">
                  <strong className="text-[#A88656]">Reward Guaranteed:</strong> You'll unlock a mystery scratchcard & earn ₹{Math.round(finalTotal * 0.15)} reward points right after placing this order!
                </p>
              </div>

              {errorMessage && (
                <div className="p-2.5 rounded bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errorMessage}
                </div>
              )}

              {/* Place Order CTA */}
              <button
                id="place-order-submit-btn"
                type="button"
                disabled={isProcessing}
                onClick={handlePlaceOrder}
                className="w-full py-3.5 px-6 rounded-xl bg-[#1A1816] hover:bg-[#2E2A27] text-[#FAF8F5] text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#C5A880]" />
                    <span>Authorizing Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Pay ₹{finalTotal.toLocaleString('en-IN')} & Unlock Rewards</span>
                    <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-[#8E8275] pt-1">
                <span>• 100% Purchase Protection</span>
                <span>• Easy 7-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
