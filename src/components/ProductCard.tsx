import React, { useState } from 'react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { Heart, Star, Eye, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenQuickView }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const activeImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[selectedColorIndex]);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-white rounded-xl border border-[#E6E0D6] overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#C5A880]/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Stage */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#F3EFEA] cursor-pointer"
        onClick={() => onOpenQuickView(product)}
      >
        <img
          src={activeImage}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className="inline-block px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-md bg-[#1A1816]/90 backdrop-blur-md text-[#FAF8F5] shadow-sm">
              {product.badge}
            </span>
          </div>
        )}

        {/* Discount Tag */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          <button
            id={`wishlist-toggle-${product.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md shadow-sm transition-all duration-200 cursor-pointer ${
              isFavorited
                ? 'bg-rose-50 text-rose-600 scale-110'
                : 'bg-white/85 text-[#4A443E] hover:bg-white hover:text-[#1A1816]'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
          </button>

          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C5A880] text-white">
            {product.discountPercentage}% OFF
          </span>
        </div>

        {/* Quick View Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
          <button
            id={`quick-view-btn-${product.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickView(product);
            }}
            className="flex-1 py-2.5 px-3 rounded-lg bg-white/95 hover:bg-white text-[#1A1816] text-xs font-semibold tracking-wider uppercase shadow-md backdrop-blur-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Style Tags & Rating */}
          <div className="flex items-center justify-between text-xs text-[#8E8275] mb-1.5">
            <span className="font-medium tracking-wide uppercase text-[10px] text-[#A88656]">
              {product.styles[0]}
            </span>
            <div className="flex items-center gap-1 text-[#1A1816]">
              <Star className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
              <span className="text-xs font-semibold">{product.rating}</span>
              <span className="text-[11px] text-[#8E8275]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 
            className="text-sm font-medium text-[#1A1816] line-clamp-1 group-hover:text-[#A88656] transition-colors cursor-pointer"
            onClick={() => onOpenQuickView(product)}
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#8E8275] line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-[#F3EFEA]">
          {/* Colors & Price */}
          <div className="flex items-center justify-between">
            {/* Color swatches */}
            <div className="flex items-center gap-1.5">
              {product.colors.map((c, idx) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedColorIndex(idx)}
                  className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                    selectedColorIndex === idx
                      ? 'ring-2 ring-[#1A1816] ring-offset-1 scale-110 border-white'
                      : 'border-black/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                  aria-label={c.name}
                />
              ))}
            </div>

            {/* Price with strikethrough */}
            <div className="text-right">
              <span className="text-base font-semibold text-[#1A1816]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="ml-1.5 text-xs text-[#8E8275] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Direct Add to Bag CTA */}
          <button
            id={`quick-add-btn-${product.id}`}
            type="button"
            onClick={handleQuickAdd}
            className={`w-full mt-3 py-2 px-3 rounded-lg text-xs font-medium tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-[#FAF8F5] hover:bg-[#1A1816] text-[#1A1816] hover:text-[#FAF8F5] border border-[#E6E0D6]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                In Bag
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                Add to Bag
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
