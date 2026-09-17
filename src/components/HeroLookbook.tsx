import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Percent, Gift } from 'lucide-react';
import { STYLE_VIBES } from '../data/products';

interface HeroLookbookProps {
  onOpenStyleQuiz: () => void;
  onOpenStylist: () => void;
  onSelectVibe: (vibe: string) => void;
  activeVibeFilter: string | null;
}

export const HeroLookbook: React.FC<HeroLookbookProps> = ({
  onOpenStyleQuiz,
  onOpenStylist,
  onSelectVibe,
  activeVibeFilter
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#F3EFEA] to-[#FAF8F5] border-b border-[#E6E0D6]">
      {/* Subtle architectural background grid line accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E6E0D615_1px,transparent_1px),linear-gradient(to_bottom,#E6E0D615_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-14 sm:pb-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Super tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#C5A880]/40 backdrop-blur-md shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-ping" />
              <span className="text-xs font-semibold tracking-widest uppercase text-[#1A1816]">
                Autumn / Resort Collection '26
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-[#1A1816] leading-[1.1]">
              Aesthetic Elegance.
              <span className="block italic font-normal text-[#A88656]">Accessible Luxury.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#5E574E] max-w-xl leading-relaxed">
              Step into <strong>sho-pro</strong> — where runway silhouettes, European flax linen, mulberry silk, and architectural streetwear meet fair, honest prices. Every purchase is paired with an exclusive post-purchase reward.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-explore-btn"
                type="button"
                onClick={onOpenStylist}
                className="py-3.5 px-6 rounded-xl bg-[#1A1816] hover:bg-[#2E2A27] text-[#FAF8F5] text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C5A880]" />
                <span>Style Concierge</span>
              </button>

              <button
                id="hero-quiz-btn"
                type="button"
                onClick={onOpenStyleQuiz}
                className="py-3.5 px-6 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#1A1816] border border-[#E6E0D6] hover:border-[#C5A880] text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <span>Take Style Quiz</span>
                <ArrowRight className="w-4 h-4 text-[#8E8275]" />
              </button>
            </div>

            {/* Aesthetic Style Chips */}
            <div className="pt-4">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#8E8275] mb-2.5">
                Explore by Aesthetic Vibe:
              </span>
              <div className="flex flex-wrap gap-2">
                {STYLE_VIBES.map(vibe => {
                  const isActive = activeVibeFilter === vibe.id;
                  return (
                    <button
                      key={vibe.id}
                      type="button"
                      onClick={() => onSelectVibe(isActive ? '' : vibe.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-[#1A1816] text-[#FAF8F5] border-[#1A1816] shadow-sm'
                          : 'bg-white/80 hover:bg-white text-[#4A443E] border-[#E6E0D6] hover:border-[#C5A880]'
                      }`}
                    >
                      {vibe.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Main Look Card */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#E6E0D6] shadow-2xl bg-white group">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80"
                  alt="High fashion editorial look"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay Badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-[#C5A880] text-black font-bold text-[10px] uppercase">
                      Curator Pick
                    </span>
                    <span className="text-xs text-white/90 font-medium">Under ₹2,499</span>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">The Florence Capsule</h3>
                  <p className="text-xs text-white/80 mt-0.5">Crafted with pure Italian flax weave & mother-of-pearl accents</p>
                </div>
              </div>

              {/* Floating Mini Highlight Card 1 */}
              <div className="absolute -top-4 -left-6 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-[#E6E0D6] shadow-xl hidden sm:flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-lg bg-[#F3EFEA] flex items-center justify-center text-[#A88656]">
                  <Percent className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1A1816]">Up to 55% OFF</p>
                  <p className="text-[10px] text-[#8E8275]">Reasonable rates guaranteed</p>
                </div>
              </div>

              {/* Floating Mini Highlight Card 2 */}
              <div className="absolute -bottom-5 -right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#C5A880]/60 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1A1816] flex items-center justify-center text-[#C5A880]">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1A1816]">Post-Purchase Reward</p>
                  <p className="text-[10px] text-emerald-800 font-semibold">Instant Cashback on Orders</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[#E6E0D6]/80 text-xs">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/60 border border-[#E6E0D6]/60">
            <Percent className="w-4 h-4 text-[#A88656] flex-shrink-0" />
            <div>
              <p className="font-semibold text-[#1A1816]">Reasonable Pricing</p>
              <p className="text-[10px] text-[#8E8275]">Luxury without markup</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/60 border border-[#E6E0D6]/60">
            <Sparkles className="w-4 h-4 text-[#A88656] flex-shrink-0" />
            <div>
              <p className="font-semibold text-[#1A1816]">Personalized For You</p>
              <p className="text-[10px] text-[#8E8275]">Smart style curation</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/60 border border-[#E6E0D6]/60">
            <ShieldCheck className="w-4 h-4 text-[#A88656] flex-shrink-0" />
            <div>
              <p className="font-semibold text-[#1A1816]">COD, GPay & PhonePe</p>
              <p className="text-[10px] text-[#8E8275]">Seamless checkout options</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/60 border border-[#E6E0D6]/60">
            <Gift className="w-4 h-4 text-[#A88656] flex-shrink-0" />
            <div>
              <p className="font-semibold text-[#1A1816]">Mystery Scratch Rewards</p>
              <p className="text-[10px] text-[#8E8275]">After each confirmed purchase</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
