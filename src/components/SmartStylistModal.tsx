import React, { useState } from 'react';
import { Product } from '../data/products';
import { UserStyleProfile, getCuratedLooks, CuratedLook } from '../services/recommendation';
import { useCart } from '../context/CartContext';
import { X, Sparkles, ShoppingBag, Check, ArrowRight, Layers, Tag } from 'lucide-react';

interface SmartStylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  styleProfile: UserStyleProfile;
  onOpenProduct: (product: Product) => void;
}

export const SmartStylistModal: React.FC<SmartStylistModalProps> = ({
  isOpen,
  onClose,
  styleProfile,
  onOpenProduct
}) => {
  const { addToCart } = useCart();
  const curatedLooks = getCuratedLooks(styleProfile);
  const [selectedLookIndex, setSelectedLookIndex] = useState(0);
  const [addedBundle, setAddedBundle] = useState(false);

  if (!isOpen) return null;

  const currentLook = curatedLooks[selectedLookIndex] || curatedLooks[0];

  const handleAddEntireBundle = (look: CuratedLook) => {
    look.items.forEach(item => {
      addToCart(item, item.sizes[0], item.colors[0]);
    });
    setAddedBundle(true);
    setTimeout(() => setAddedBundle(false), 2200);
  };

  return (
    <div id="smart-stylist-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
      <div 
        id="smart-stylist-container"
        className="bg-[#FAF8F5] border border-[#E6E0D6] rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative my-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#FAF8F5]/95 backdrop-blur-md z-10 px-6 py-4 border-b border-[#E6E0D6] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#1A1816] text-[#C5A880]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-medium text-[#1A1816]">
                sho-pro Personal Style Concierge
              </h2>
              <p className="text-xs text-[#8E8275]">
                Tailored aesthetic ensembles curated for your profile & upcoming events
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#8E8275] hover:text-[#1A1816] p-1.5 rounded-full hover:bg-[#F3EFEA]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Look selection tabs */}
        <div className="px-6 py-3 bg-[#F3EFEA] border-b border-[#E6E0D6] flex gap-2 overflow-x-auto">
          {curatedLooks.map((look, idx) => (
            <button
              key={look.occasion}
              type="button"
              onClick={() => {
                setSelectedLookIndex(idx);
                setAddedBundle(false);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedLookIndex === idx
                  ? 'bg-[#1A1816] text-[#FAF8F5] shadow-sm'
                  : 'bg-white text-[#5E574E] hover:text-[#1A1816] border border-[#E6E0D6]'
              }`}
            >
              {look.occasion}
            </button>
          ))}
        </div>

        {/* Current Look Spotlight */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-[#E6E0D6] shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#F3EFEA]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#A88656] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  {currentLook.aesthetic}
                </span>
                <h3 className="text-2xl font-serif font-medium text-[#1A1816] mt-1">
                  {currentLook.occasion}
                </h3>
                <p className="text-xs text-[#8E8275] mt-0.5">
                  {currentLook.tagline}
                </p>
              </div>

              {/* Bundle Pricing Card */}
              <div className="text-left md:text-right bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E6E0D6]">
                <div className="flex md:justify-end items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1A1816]">
                    ₹{currentLook.bundlePrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#8E8275] line-through">
                    ₹{currentLook.originalBundlePrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {currentLook.bundleDiscount}% OFF
                  </span>
                </div>
                <p className="text-[10px] text-[#8E8275] mt-0.5">
                  Save ₹{(currentLook.originalBundlePrice - currentLook.bundlePrice).toLocaleString('en-IN')} on complete look
                </p>
              </div>
            </div>

            {/* Look Pieces Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {currentLook.items.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-[#FAF8F5] rounded-xl border border-[#E6E0D6] p-3 flex flex-col justify-between group hover:border-[#C5A880] transition-all"
                >
                  <div>
                    <div 
                      className="aspect-[3/4] rounded-lg overflow-hidden bg-white mb-2 relative cursor-pointer"
                      onClick={() => onOpenProduct(item)}
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#1A1816]/90 text-white backdrop-blur-md">
                        Piece 0{index + 1}
                      </span>
                    </div>

                    <h4 
                      onClick={() => onOpenProduct(item)}
                      className="text-xs font-semibold text-[#1A1816] line-clamp-1 hover:text-[#A88656] cursor-pointer"
                    >
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-[#8E8275] line-clamp-1 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E6E0D6]">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs font-bold text-[#1A1816]">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-[#8E8275] line-through">
                        ₹{item.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(item, item.sizes[0], item.colors[0])}
                      className="p-1.5 rounded-md hover:bg-white text-[#1A1816] border border-[#E6E0D6] transition-colors cursor-pointer"
                      title="Add single piece to bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Complete Look CTA */}
            <div className="mt-6 pt-6 border-t border-[#F3EFEA] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#5E574E]">
                <Tag className="w-4 h-4 text-[#A88656]" />
                <span>Bundle includes all 3 matching tailored items with coordinated color tone.</span>
              </div>

              <button
                id="add-curated-bundle-btn"
                type="button"
                onClick={() => handleAddEntireBundle(currentLook)}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                  addedBundle
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#1A1816] hover:bg-[#2E2A27] text-[#FAF8F5]'
                }`}
              >
                {addedBundle ? (
                  <>
                    <Check className="w-4 h-4" />
                    Complete Look Added to Bag!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
                    Add Entire Curated Look (₹{currentLook.bundlePrice.toLocaleString('en-IN')})
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
