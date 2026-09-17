import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from '../data/products';
import { useAuth } from './AuthContext';

export interface CartItem {
  id: string; // unique key: productId-size-color
  product: Product;
  quantity: number;
  size: string;
  color: { name: string; hex: string };
}

export interface AppliedCoupon {
  code: string;
  discountValue: number;
  type: 'percent' | 'flat';
  description: string;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  rewardPointsUsed: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'Paid' | 'Pending COD Verification';
  shippingAddress: any;
  rewardEarned: {
    points: number;
    couponCode: string;
    description: string;
  };
}

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, size?: string, color?: { name: string; hex: string }, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  appliedCoupon: AppliedCoupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  applyRewardPoints: boolean;
  setApplyRewardPoints: (apply: boolean) => void;
  subtotal: number;
  originalTotal: number;
  totalSavings: number;
  couponDiscount: number;
  rewardDiscountAmount: number;
  shippingFee: number;
  finalTotal: number;
  totalItemsCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isRewardModalOpen: boolean;
  setIsRewardModalOpen: (open: boolean) => void;
  lastOrder: OrderDetails | null;
  setLastOrder: (order: OrderDetails | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const AVAILABLE_COUPONS: Record<string, { discountValue: number; type: 'percent' | 'flat'; description: string; minSpend?: number }> = {
  'TRENDY20': {
    discountValue: 20,
    type: 'percent',
    description: '20% off on all trendsetter items'
  },
  'FIRSTPRO': {
    discountValue: 300,
    type: 'flat',
    description: 'Flat ₹300 off on your first stylish purchase'
  },
  'LUXE500': {
    discountValue: 500,
    type: 'flat',
    minSpend: 2000,
    description: 'Flat ₹500 off on orders above ₹2,000'
  },
  'PRO-WELCOME-20': {
    discountValue: 20,
    type: 'percent',
    description: 'VIP Welcome 20% discount unlocked'
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, useRewardCredits } = useAuth();

  // Initial cart with a curated aesthetic item so user can immediately test checkout if they wish
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sho_pro_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    const sampleProduct = PRODUCTS[0]; // Oversized Florence Linen Blazer
    return [
      {
        id: `${sampleProduct.id}-S-Oatmeal Beige`,
        product: sampleProduct,
        quantity: 1,
        size: 'S',
        color: sampleProduct.colors[0]
      }
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sho_pro_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['sp-02', 'sp-09'];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [applyRewardPoints, setApplyRewardPoints] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  useEffect(() => {
    localStorage.setItem('sho_pro_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sho_pro_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (
    product: Product,
    size?: string,
    color?: { name: string; hex: string },
    quantity = 1
  ) => {
    const selectedSize = size || product.sizes[0] || 'M';
    const selectedColor = color || product.colors[0] || { name: 'Standard', hex: '#111' };
    const cartItemId = `${product.id}-${selectedSize}-${selectedColor.name}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: cartItemId, product, quantity, size: selectedSize, color: selectedColor }];
    });

    showToast(`Added "${product.name}" to your shopping bag!`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Item removed from shopping bag');
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from your curated wishlist' : 'Saved to your wishlist');
      return updated;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const originalTotal = cart.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0);
  const totalSavings = originalTotal - subtotal;

  const applyCoupon = (code: string) => {
    const upper = code.trim().toUpperCase();
    const found = AVAILABLE_COUPONS[upper];
    if (!found) {
      return { success: false, message: 'Invalid promo code. Try "TRENDY20" or "FIRSTPRO"' };
    }
    if (found.minSpend && subtotal < found.minSpend) {
      return { success: false, message: `Minimum cart value of ₹${found.minSpend} required for this coupon.` };
    }
    setAppliedCoupon({
      code: upper,
      discountValue: found.discountValue,
      type: found.type,
      description: found.description
    });
    showToast(`Coupon "${upper}" applied successfully!`);
    return { success: true, message: 'Promo code applied!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      couponDiscount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
    } else {
      couponDiscount = appliedCoupon.discountValue;
    }
  }

  // Reward points can discount up to 20% of remaining total
  let rewardDiscountAmount = 0;
  if (applyRewardPoints && user && user.rewardPoints > 0) {
    const maxUsable = Math.min(user.rewardPoints, Math.round(subtotal * 0.25));
    rewardDiscountAmount = maxUsable;
  }

  // Free delivery over ₹999
  const shippingFee = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const finalTotal = Math.max(0, subtotal - couponDiscount - rewardDiscountAmount + shippingFee);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        applyRewardPoints,
        setApplyRewardPoints,
        subtotal,
        originalTotal,
        totalSavings,
        couponDiscount,
        rewardDiscountAmount,
        shippingFee,
        finalTotal,
        totalItemsCount,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isRewardModalOpen,
        setIsRewardModalOpen,
        lastOrder,
        setLastOrder,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
