import React from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounceIn">
      <div className="bg-[#1A1816] text-[#FAF8F5] px-4 py-3 rounded-xl shadow-2xl border border-[#C5A880]/60 flex items-center gap-2.5 max-w-sm">
        <Sparkles className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
        <span className="text-xs font-medium tracking-wide">{toastMessage}</span>
      </div>
    </div>
  );
};
