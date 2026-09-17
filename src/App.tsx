/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { PRODUCTS, Product, STYLE_VIBES } from './data/products';
import { 
  getSavedStyleProfile, 
  saveStyleProfile, 
  getRecommendedProducts, 
  UserStyleProfile 
} from './services/recommendation';
import { Navbar } from './components/Navbar';
import { HeroLookbook } from './components/HeroLookbook';
import { PersonalizedForYou } from './components/PersonalizedForYou';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { StyleQuizModal } from './components/StyleQuizModal';
import { SmartStylistModal } from './components/SmartStylistModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { RewardModal } from './components/RewardModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { 
  Sparkles, SlidersHorizontal, ArrowUpDown, Filter, 
  ShoppingBag, Heart, Check, X, Search 
} from 'lucide-react';

function ShoppingApp() {
  // Navigation & Filtering State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVibeFilter, setActiveVibeFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');
  
  // Style Profile for recommendations
  const [styleProfile, setStyleProfile] = useState<UserStyleProfile>(() => getSavedStyleProfile());
  
  // Modals state
  const [isStyleQuizOpen, setIsStyleQuizOpen] = useState(false);
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { cart, wishlist, setIsCartOpen, setIsWishlistOpen, totalItemsCount } = useCart();

  // Handle saving new style profile
  const handleSaveProfile = (newProfile: UserStyleProfile) => {
    setStyleProfile(newProfile);
    saveStyleProfile(newProfile);
  };

  // Recommended products for the "Curated For You" section
  const recommendedProducts = useMemo(() => {
    const cartIds = cart.map(item => item.product.id);
    return getRecommendedProducts(styleProfile, [], cartIds);
  }, [styleProfile, cart]);

  // Main catalog filtering and sorting
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Category filter
    if (selectedCategory === 'Under ₹1499') {
      list = list.filter(p => p.price <= 1499);
    } else if (selectedCategory !== 'All') {
      list = list.filter(p => p.category === selectedCategory);
    }

    // Aesthetic Vibe filter
    if (activeVibeFilter) {
      list = list.filter(p => p.styles.includes(activeVibeFilter as any));
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.styles.some(s => s.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // Recommended sort: boost matching user styles
      list.sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;
        styleProfile.selectedStyles.forEach(s => {
          if (a.styles.includes(s as any)) scoreA += 10;
          if (b.styles.includes(s as any)) scoreB += 10;
        });
        return scoreB - scoreA;
      });
    }

    return list;
  }, [selectedCategory, activeVibeFilter, searchQuery, sortBy, styleProfile]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1816] font-sans selection:bg-[#E6DEC9]">
      {/* Navigation Bar */}
      <Navbar
        onOpenStyleQuiz={() => setIsStyleQuizOpen(true)}
        onOpenStylist={() => setIsStylistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Editorial Hero Banner */}
      <HeroLookbook
        onOpenStyleQuiz={() => setIsStyleQuizOpen(true)}
        onOpenStylist={() => setIsStylistOpen(true)}
        onSelectVibe={setActiveVibeFilter}
        activeVibeFilter={activeVibeFilter}
      />

      {/* Dynamic Personalized Recommendations (According to user's choices) */}
      {!searchQuery && selectedCategory === 'All' && !activeVibeFilter && (
        <PersonalizedForYou
          products={recommendedProducts}
          styleProfile={styleProfile}
          onOpenStyleQuiz={() => setIsStyleQuizOpen(true)}
          onOpenStylist={() => setIsStylistOpen(true)}
          onOpenQuickView={setQuickViewProduct}
        />
      )}

      {/* Main Catalog Section */}
      <main id="main-catalog-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Controls and Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E6E0D6]">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A1816]">
              {selectedCategory === 'All' ? 'All Trendy Drops' : selectedCategory}
              {activeVibeFilter && <span className="text-[#A88656] text-xl font-normal italic"> — {activeVibeFilter}</span>}
            </h2>
            <p className="text-xs text-[#8E8275] mt-1">
              Showing {filteredProducts.length} contemporary pieces crafted at accessible rates
            </p>
          </div>

          {/* Controls Bar: Vibe pills, Reset, and Sort */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Active filter badge if vibe is selected */}
            {activeVibeFilter && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A1816] text-[#FAF8F5] text-xs font-semibold">
                <span>{activeVibeFilter}</span>
                <button
                  onClick={() => setActiveVibeFilter(null)}
                  className="hover:text-[#C5A880] ml-1 cursor-pointer"
                  aria-label="Remove filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 bg-white border border-[#E6E0D6] rounded-xl px-3 py-1.5 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#8E8275]" />
              <span className="text-[#8E8275] font-medium hidden sm:inline">Sort by:</span>
              <select
                id="catalog-sort-select"
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-transparent text-[#1A1816] font-semibold focus:outline-none cursor-pointer"
              >
                <option value="recommended">Curated For You</option>
                <option value="price-asc">Price: Low to High (Budget)</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated by Stylists</option>
              </select>
            </div>

            {/* Style Concierge Shortcut */}
            <button
              id="catalog-stylist-shortcut-btn"
              onClick={() => setIsStylistOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#E6E0D6] hover:border-[#C5A880] text-xs font-semibold text-[#1A1816] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A88656]" />
              <span>Matching Looks</span>
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-[#8E8275]">
            <div className="w-16 h-16 rounded-full bg-[#F3EFEA] flex items-center justify-center mx-auto mb-3 text-[#A88656]">
              <Search className="w-7 h-7" />
            </div>
            <p className="text-lg font-serif font-medium text-[#1A1816]">No matching trendy pieces found</p>
            <p className="text-xs text-[#8E8275] mt-1 max-w-sm mx-auto">
              Try adjusting your search terms, clearing the aesthetic filter, or choosing a different category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setActiveVibeFilter(null);
              }}
              className="mt-5 px-5 py-2.5 rounded-lg bg-[#1A1816] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Floating Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#E6E0D6] py-2 px-4 flex items-center justify-around md:hidden shadow-lg">
        <button
          onClick={() => {
            setSelectedCategory('All');
            setActiveVibeFilter(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 text-[#1A1816]"
        >
          <span className="font-serif text-sm font-bold">sho-pro</span>
          <span className="text-[10px] text-[#8E8275]">Explore</span>
        </button>

        <button
          onClick={() => setIsStylistOpen(true)}
          className="flex flex-col items-center gap-1 text-[#1A1816]"
        >
          <Sparkles className="w-5 h-5 text-[#A88656]" />
          <span className="text-[10px] text-[#8E8275]">Stylist</span>
        </button>

        <button
          onClick={() => setIsStyleQuizOpen(true)}
          className="flex flex-col items-center gap-1 text-[#1A1816]"
        >
          <SlidersHorizontal className="w-5 h-5 text-[#8E8275]" />
          <span className="text-[10px] text-[#8E8275]">Quiz</span>
        </button>

        <button
          onClick={() => setIsWishlistOpen(true)}
          className="flex flex-col items-center gap-1 text-[#1A1816] relative"
        >
          <Heart className="w-5 h-5 text-[#8E8275]" />
          {wishlist.length > 0 && (
            <span className="absolute -top-1 right-2 w-3.5 h-3.5 bg-rose-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
          <span className="text-[10px] text-[#8E8275]">Saved</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 text-[#1A1816] relative"
        >
          <ShoppingBag className="w-5 h-5 text-[#1A1816]" />
          {totalItemsCount > 0 && (
            <span className="absolute -top-1 right-2 w-3.5 h-3.5 bg-[#1A1816] text-[#FAF8F5] rounded-full text-[9px] font-bold flex items-center justify-center">
              {totalItemsCount}
            </span>
          )}
          <span className="text-[10px] text-[#1A1816] font-semibold">Bag</span>
        </button>
      </div>

      {/* Modals and Drawers */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOpenAnotherProduct={(p) => setQuickViewProduct(p)}
      />

      <StyleQuizModal
        isOpen={isStyleQuizOpen}
        onClose={() => setIsStyleQuizOpen(false)}
        currentProfile={styleProfile}
        onSaveProfile={handleSaveProfile}
      />

      <SmartStylistModal
        isOpen={isStylistOpen}
        onClose={() => setIsStylistOpen(false)}
        styleProfile={styleProfile}
        onOpenProduct={(p) => {
          setIsStylistOpen(false);
          setQuickViewProduct(p);
        }}
      />

      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <RewardModal />
      <AuthModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ShoppingApp />
      </CartProvider>
    </AuthProvider>
  );
}
