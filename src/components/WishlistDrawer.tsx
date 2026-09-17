import React from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart } = useCart();

  if (!isWishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div id="wishlist-drawer-overlay" className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        id="wishlist-drawer-panel"
        className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#E6E0D6] animate-slideLeft relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E6E0D6] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h2 className="text-lg font-serif font-medium text-[#1A1816]">
              Curated Wishlist ({wishlistProducts.length})
            </h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 text-[#8E8275] hover:text-[#1A1816] rounded-full hover:bg-[#F3EFEA]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#8E8275]">
              <div className="w-16 h-16 rounded-full bg-[#F3EFEA] flex items-center justify-center mb-3 text-rose-500">
                <Heart className="w-7 h-7" />
              </div>
              <p className="text-base font-serif font-medium text-[#1A1816]">Your wishlist is empty</p>
              <p className="text-xs text-[#8E8275] mt-1 max-w-xs">
                Tap the heart icon on any outfit to curate your personal style archive.
              </p>
            </div>
          ) : (
            wishlistProducts.map(product => (
              <div
                key={product.id}
                className="flex gap-3.5 p-3.5 bg-white rounded-xl border border-[#E6E0D6] relative group"
              >
                <div className="w-20 aspect-[3/4] rounded-lg overflow-hidden bg-[#F3EFEA] flex-shrink-0">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="text-xs font-semibold text-[#1A1816] line-clamp-1">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-[#8E8275] hover:text-rose-600 transition-colors p-1"
                        aria-label="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-[#A88656] uppercase tracking-wider font-semibold mt-0.5">
                      {product.styles[0]}
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-semibold text-[#1A1816]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-[#8E8275] line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(product);
                      toggleWishlist(product.id);
                    }}
                    className="w-full mt-2 py-2 px-3 rounded-lg bg-[#1A1816] text-[#FAF8F5] text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-1.5 hover:bg-[#2E2A27] transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Move to Bag
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
