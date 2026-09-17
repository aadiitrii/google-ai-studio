import React, { useState } from 'react';
import { Product, PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { X, Heart, Star, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenAnotherProduct: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onOpenAnotherProduct
}) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const activeSize = selectedSize || product.sizes[0];
  const activeColor = product.colors[selectedColorIndex] || product.colors[0];

  const handleAdd = () => {
    addToCart(product, activeSize, activeColor, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const pairings = product.pairingIds
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <div id="product-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn overflow-y-auto">
      <div 
        id="product-modal-container"
        className="bg-[#FAF8F5] border border-[#E6E0D6] rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-[#8E8275] hover:text-[#1A1816] p-2 rounded-full bg-white/80 backdrop-blur-md shadow hover:bg-white transition-all cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left Column: Image Gallery */}
          <div className="p-6 md:p-8 bg-white border-b md:border-b-0 md:border-r border-[#E6E0D6] flex flex-col justify-between">
            <div>
              {/* Main Image */}
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#F3EFEA] border border-[#E6E0D6]/60">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />

                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-md text-xs font-semibold bg-[#1A1816]/90 text-white uppercase tracking-wider backdrop-blur-md">
                    {product.badge}
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-3 right-3 p-2.5 rounded-full shadow-md backdrop-blur-md transition-all cursor-pointer ${
                    isFavorited
                      ? 'bg-rose-50 text-rose-600'
                      : 'bg-white/90 text-[#4A443E] hover:text-[#1A1816]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 mt-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 aspect-[3/4] rounded-lg overflow-hidden border transition-all cursor-pointer ${
                        selectedImageIndex === idx
                          ? 'border-[#1A1816] ring-2 ring-[#1A1816]/20'
                          : 'border-[#E6E0D6] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quality Assurances */}
            <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-[#F3EFEA] text-[11px] text-[#8E8275]">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#A88656]" />
                <span>Express Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A88656]" />
                <span>Certified Authentic</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-[#A88656]" />
                <span>7-Day Return</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-semibold tracking-wider text-[#A88656]">
                    {product.category} • {product.styles[0]}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#1A1816] bg-[#F3EFEA] px-2.5 py-1 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-[#8E8275]">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#1A1816] mt-2 leading-tight">
                {product.name}
              </h2>
              <p className="text-sm text-[#8E8275] mt-1">
                {product.subtitle}
              </p>

              {/* Pricing & Reasonable Rates Value Box */}
              <div className="mt-4 p-3.5 rounded-xl bg-white border border-[#E6E0D6] flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold text-[#1A1816]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-[#8E8275] line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({product.discountPercentage}% OFF)
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8E8275] mt-0.5">
                    Inclusive of all taxes • Eligible for Post-Purchase Scratchcard Reward
                  </p>
                </div>
              </div>

              {/* Color Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold uppercase tracking-wider text-[#4A443E]">
                    Color: <span className="font-normal text-[#1A1816]">{activeColor.name}</span>
                  </span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((c, idx) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                        selectedColorIndex === idx
                          ? 'border-[#1A1816] bg-white ring-1 ring-[#1A1816] font-medium text-[#1A1816]'
                          : 'border-[#E6E0D6] bg-white/60 text-[#8E8275] hover:border-[#C5A880]'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold uppercase tracking-wider text-[#4A443E]">
                    Select Size
                  </span>
                  <span className="text-[11px] text-[#A88656] underline cursor-pointer">
                    Size Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(sz => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[44px] h-10 px-3 rounded-lg border text-xs font-semibold uppercase transition-all cursor-pointer flex items-center justify-center ${
                        activeSize === sz
                          ? 'border-[#1A1816] bg-[#1A1816] text-white shadow-sm'
                          : 'border-[#E6E0D6] bg-white text-[#4A443E] hover:border-[#C5A880]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabric & Silhouette */}
              <div className="mt-5 text-xs text-[#5E574E] space-y-1.5 bg-[#F3EFEA]/60 p-3 rounded-xl border border-[#E6E0D6]">
                <p><strong className="text-[#1A1816]">Fabric:</strong> {product.fabric}</p>
                <p><strong className="text-[#1A1816]">Fit & Silhouette:</strong> {product.fit}</p>
                <p className="text-[#8E8275] pt-1">{product.description}</p>
              </div>

              {/* Quantity and Actions */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center border border-[#E6E0D6] bg-white rounded-lg overflow-hidden h-11">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-2 text-[#8E8275] hover:text-[#1A1816] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-semibold text-[#1A1816]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3 py-2 text-[#8E8275] hover:text-[#1A1816] transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  id="modal-add-to-bag-btn"
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 h-11 px-6 rounded-lg text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                    justAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#1A1816] hover:bg-[#2E2A27] text-[#FAF8F5]'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added to Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      Add to Bag • ₹{(product.price * quantity).toLocaleString('en-IN')}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Complete the Look / Recommendation pairing */}
            {pairings.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[#E6E0D6]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1816]">
                    Complete The Look (Curated Pairings)
                  </h4>
                  <span className="text-[11px] text-[#A88656]">Styled together</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {pairings.slice(0, 3).map(pair => (
                    <div
                      key={pair.id}
                      onClick={() => onOpenAnotherProduct(pair)}
                      className="group/pair p-2 bg-white rounded-lg border border-[#E6E0D6] hover:border-[#C5A880] transition-all cursor-pointer"
                    >
                      <div className="aspect-square rounded overflow-hidden bg-[#F3EFEA] mb-1.5">
                        <img src={pair.images[0]} alt={pair.name} className="w-full h-full object-cover group-hover/pair:scale-105 transition-transform" />
                      </div>
                      <p className="text-[11px] font-medium text-[#1A1816] line-clamp-1 group-hover/pair:text-[#A88656]">
                        {pair.name}
                      </p>
                      <p className="text-[10px] font-semibold text-[#1A1816]">
                        ₹{pair.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
