import React, { useState } from 'react';
import { X, Sparkles, Check, SlidersHorizontal } from 'lucide-react';
import { STYLE_VIBES } from '../data/products';
import { UserStyleProfile } from '../services/recommendation';

interface StyleQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserStyleProfile;
  onSaveProfile: (profile: UserStyleProfile) => void;
}

export const StyleQuizModal: React.FC<StyleQuizModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile
}) => {
  const [styles, setStyles] = useState<string[]>(currentProfile.selectedStyles);
  const [category, setCategory] = useState<UserStyleProfile['favoriteCategory']>(currentProfile.favoriteCategory);
  const [budget, setBudget] = useState<UserStyleProfile['budgetPreference']>(currentProfile.budgetPreference);
  const [occasion, setOccasion] = useState(currentProfile.currentOccasion || 'Smart Casual Outing');

  if (!isOpen) return null;

  const toggleStyle = (styleId: string) => {
    setStyles(prev => {
      if (prev.includes(styleId)) {
        if (prev.length === 1) return prev; // keep at least 1
        return prev.filter(s => s !== styleId);
      }
      return [...prev, styleId];
    });
  };

  const handleSave = () => {
    onSaveProfile({
      selectedStyles: styles,
      favoriteCategory: category,
      budgetPreference: budget,
      colorPreference: 'all',
      currentOccasion: occasion
    });
    onClose();
  };

  const OCCASIONS = [
    'Smart Casual Outing',
    'Rooftop Cocktails & Sunset',
    'Mediterranean Vacation',
    'Streetwear Everyday',
    'Workplace & Minimalist Luxe'
  ];

  return (
    <div id="style-quiz-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div 
        id="style-quiz-container"
        className="bg-[#FAF8F5] border border-[#E6E0D6] rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#FAF8F5]/95 backdrop-blur-md z-10 px-6 py-5 border-b border-[#E6E0D6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#C5A880]/15 text-[#A88656]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-medium text-[#1A1816]">
                sho-pro Personal Style Curator
              </h2>
              <p className="text-xs text-[#8E8275]">
                Tailor our catalog to your exact aesthetic, occasion & budget
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

        <div className="p-6 space-y-6">
          {/* Section 1: Style Vibes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A443E]">
                1. Select Your Aesthetic Vibes (Choose 1 or more)
              </label>
              <span className="text-[11px] text-[#A88656]">{styles.length} selected</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {STYLE_VIBES.map(vibe => {
                const isSelected = styles.includes(vibe.id);
                return (
                  <button
                    key={vibe.id}
                    type="button"
                    onClick={() => toggleStyle(vibe.id)}
                    className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#1A1816] bg-[#F3EFEA] shadow-sm ring-1 ring-[#1A1816]'
                        : 'border-[#E6E0D6] bg-white hover:border-[#C5A880]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#1A1816]">{vibe.title}</span>
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-[#1A1816] text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      ) : (
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF8F5] text-[#8E8275] border border-[#E6E0D6]">
                          {vibe.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#8E8275] mt-1 leading-snug">{vibe.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Preferred Category */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A443E] mb-2.5">
              2. Preferred Department
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {(['All', 'Women', 'Men', 'Unisex', 'Accessories'] as const).map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all cursor-pointer text-center ${
                    category === cat
                      ? 'bg-[#1A1816] text-white border-[#1A1816]'
                      : 'bg-white text-[#4A443E] border-[#E6E0D6] hover:bg-[#F3EFEA]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Reasonable Budget Range */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A443E] mb-2.5">
              3. Target Price Comfort
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'all', label: 'All Trendy Drops' },
                { id: 'under1000', label: 'Under ₹1,000' },
                { id: 'under2000', label: 'Under ₹2,000' },
                { id: 'under3000', label: 'Under ₹3,000' }
              ].map(b => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBudget(b.id as any)}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all cursor-pointer text-center ${
                    budget === b.id
                      ? 'bg-[#C5A880] text-white border-[#C5A880] shadow-sm font-semibold'
                      : 'bg-white text-[#4A443E] border-[#E6E0D6] hover:bg-[#F3EFEA]'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Upcoming Occasion */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A443E] mb-2.5">
              4. Dressing For What Occasion?
            </label>
            <div className="flex flex-wrap gap-2">
              {OCCASIONS.map(occ => (
                <button
                  key={occ}
                  type="button"
                  onClick={() => setOccasion(occ)}
                  className={`py-1.5 px-3 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                    occasion === occ
                      ? 'bg-[#1A1816] text-white border-[#1A1816]'
                      : 'bg-white text-[#5E574E] border-[#E6E0D6] hover:border-[#C5A880]'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#FAF8F5]/95 backdrop-blur-md px-6 py-4 border-t border-[#E6E0D6] flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setStyles(['Quiet Luxury', 'Minimalist Chic']);
              setCategory('All');
              setBudget('all');
            }}
            className="text-xs text-[#8E8275] hover:text-[#1A1816] underline underline-offset-4 cursor-pointer"
          >
            Reset to Standard
          </button>

          <button
            id="save-style-preferences-btn"
            type="button"
            onClick={handleSave}
            className="py-2.5 px-6 rounded-lg bg-[#1A1816] text-[#FAF8F5] text-sm font-medium tracking-wide hover:bg-[#2E2A27] transition-all flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
            Apply Curated Picks
          </button>
        </div>
      </div>
    </div>
  );
};
