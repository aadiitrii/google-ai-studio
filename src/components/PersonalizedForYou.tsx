import React from 'react';
import { Product } from '../data/products';
import { UserStyleProfile } from '../services/recommendation';
import { ProductCard } from './ProductCard';
import { Sparkles, SlidersHorizontal, ArrowRight, Heart } from 'lucide-react';

interface PersonalizedForYouProps {
  products: Product[];
  styleProfile: UserStyleProfile;
  onOpenStyleQuiz: () => void;
  onOpenStylist: () => void;
  onOpenQuickView: (product: Product) => void;
}

export const PersonalizedForYou: React.FC<PersonalizedForYouProps> = ({
  products,
  styleProfile,
  onOpenStyleQuiz,
  onOpenStylist,
  onOpenQuickView
}) => {
  if (products.length === 0) return null;

  return (
    <section className="py-12 bg-[#FAF8F5] border-b border-[#E6E0D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Personalized Pill */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/15 text-[#A88656] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Suggested By Your Choices
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A1816]">
              Curated For Your Taste
            </h2>
            <p className="text-xs text-[#8E8275] mt-1 max-w-xl">
              Tuned to your selected aesthetics: <strong className="text-[#1A1816]">{styleProfile.selectedStyles.join(', ')}</strong> • Department: <strong className="text-[#1A1816]">{styleProfile.favoriteCategory}</strong> • Occasion: <strong className="text-[#1A1816]">{styleProfile.currentOccasion || 'Any'}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenStylist}
              className="px-4 py-2 rounded-lg bg-[#1A1816] text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-sm hover:bg-[#2E2A27] transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              Style Concierge
            </button>

            <button
              onClick={onOpenStyleQuiz}
              className="px-4 py-2 rounded-lg bg-white border border-[#E6E0D6] hover:border-[#C5A880] text-[#1A1816] text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#A88656]" />
              Modify Taste
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.slice(0, 4).map(product => (
            <ProductCard
              key={`rec-${product.id}`}
              product={product}
              onOpenQuickView={onOpenQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
