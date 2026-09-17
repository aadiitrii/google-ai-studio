import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, Heart, User, Sparkles, SlidersHorizontal, 
  Search, Menu, X, ArrowRight, ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  onOpenStyleQuiz: () => void;
  onOpenStylist: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenStyleQuiz,
  onOpenStylist,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory
}) => {
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const { totalItemsCount, wishlist, setIsCartOpen, setIsWishlistOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const CATEGORIES = ['All', 'Women', 'Men', 'Unisex', 'Accessories', 'Under ₹1499'];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E6E0D6]">
      {/* Top Announcement Bar */}
      <div className="bg-[#1A1816] text-[#FAF8F5] py-2 px-4 text-center text-[11px] font-medium tracking-wider flex items-center justify-center gap-3">
        <span className="flex items-center gap-1 text-[#C5A880]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AUTUMN / RESORT '26</span>
        </span>
        <span className="hidden md:inline">•</span>
        <span className="hidden md:inline">COMPLIMENTARY EXPRESS SHIPPING OVER ₹999</span>
        <span>•</span>
        <span className="text-[#C5A880]">MULTIPLE EASY PAYMENTS: COD, GPAY, PHONEPE</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline">INSTANT POST-PURCHASE REWARD CASHBACK</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#1A1816] hover:bg-[#F3EFEA] rounded-lg"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onSelectCategory('All'); }}
              className="group flex items-baseline gap-1"
            >
              <span className="font-serif text-3xl md:text-4xl font-semibold tracking-tighter text-[#1A1816] group-hover:text-[#A88656] transition-colors">
                sho-pro
              </span>
              <span className="w-2 h-2 rounded-full bg-[#C5A880] inline-block animate-pulse" />
            </a>

            {/* Desktop Navigation Categories */}
            <nav className="hidden lg:flex items-center gap-1 pl-4">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-widest font-semibold rounded-full transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#1A1816] text-[#FAF8F5]'
                      : 'text-[#5E574E] hover:text-[#1A1816] hover:bg-[#F3EFEA]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xs relative">
            <Search className="w-4 h-4 text-[#8E8275] absolute left-3 top-3 pointer-events-none" />
            <input
              id="desktop-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search blazers, silk slip, linen..."
              className="w-full pl-9 pr-4 py-2 rounded-full text-xs bg-white border border-[#E6E0D6] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] text-[#1A1816] placeholder:text-[#8E8275]"
            />
          </div>

          {/* Action cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Style Concierge / AI Outfit Matcher button */}
            <button
              id="concierge-trigger-btn"
              type="button"
              onClick={onOpenStylist}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#1A1816] text-[#FAF8F5] hover:bg-[#2E2A27] text-xs font-semibold tracking-wide uppercase transition-all shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Style Concierge</span>
            </button>

            {/* Style Quiz button */}
            <button
              id="style-quiz-trigger-btn"
              type="button"
              onClick={onOpenStyleQuiz}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-[#E6E0D6] hover:border-[#C5A880] text-[#1A1816] text-xs font-semibold tracking-wide transition-all cursor-pointer"
              title="Personalize Recommendations"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#A88656]" />
              <span className="hidden md:inline">Vibe Quiz</span>
            </button>

            {/* Wishlist Icon */}
            <button
              id="nav-wishlist-btn"
              type="button"
              onClick={() => setIsWishlistOpen(true)}
              className="p-2.5 text-[#1A1816] hover:bg-[#F3EFEA] rounded-full relative transition-colors cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon with Live Count */}
            <button
              id="nav-cart-btn"
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 text-[#1A1816] hover:bg-[#F3EFEA] rounded-full relative transition-colors cursor-pointer"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#1A1816] text-[#FAF8F5] text-[10px] font-bold flex items-center justify-center ring-2 ring-[#FAF8F5]">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* User Account / Login */}
            <div className="relative">
              {isAuthenticated && user ? (
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full border border-[#E6E0D6] bg-white hover:border-[#C5A880] transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-[#1A1816] text-[#C5A880] flex items-center justify-center text-xs font-bold font-serif">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden xl:inline text-xs font-semibold text-[#1A1816] max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                </button>
              ) : (
                <button
                  id="login-trigger-btn"
                  onClick={() => openAuthModal('login')}
                  className="px-4 py-2 rounded-full border border-[#1A1816] text-[#1A1816] hover:bg-[#1A1816] hover:text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Sign In
                </button>
              )}

              {/* User Dropdown */}
              {isUserMenuOpen && isAuthenticated && user && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#E6E0D6] p-4 z-50 animate-fadeIn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="pb-3 border-b border-[#F3EFEA]">
                    <p className="text-xs font-bold text-[#1A1816]">{user.name}</p>
                    <p className="text-[11px] text-[#8E8275] truncate">{user.email}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C5A880]/15 text-[#A88656] text-[10px] font-bold uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" />
                      {user.vipTier}
                    </div>
                  </div>

                  <div className="py-2.5 space-y-1.5 border-b border-[#F3EFEA] text-xs">
                    <div className="flex justify-between items-center text-[#5E574E]">
                      <span>Luxe Credits</span>
                      <strong className="text-[#1A1816]">₹{user.rewardPoints}</strong>
                    </div>
                    <div className="flex justify-between items-center text-[#5E574E]">
                      <span>Active Vouchers</span>
                      <strong className="text-emerald-800">{user.rewards.length} Available</strong>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-1">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenStyleQuiz();
                      }}
                      className="text-left text-xs py-1.5 text-[#5E574E] hover:text-[#1A1816]"
                    >
                      My Style Preferences
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="text-left text-xs py-1.5 text-rose-600 hover:text-rose-700"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8E8275] absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search blazers, silk slip, linen..."
              className="w-full pl-9 pr-4 py-2 rounded-full text-xs bg-white border border-[#E6E0D6] focus:outline-none focus:border-[#C5A880] text-[#1A1816]"
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E6E0D6] bg-[#FAF8F5] px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  onSelectCategory(cat);
                  setIsMobileMenuOpen(false);
                }}
                className={`py-2 px-3 text-left text-xs font-semibold rounded-lg ${
                  selectedCategory === cat
                    ? 'bg-[#1A1816] text-[#FAF8F5]'
                    : 'bg-white border border-[#E6E0D6] text-[#5E574E]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenStylist();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#1A1816] text-[#FAF8F5] text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              Open Style Concierge
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenStyleQuiz();
              }}
              className="w-full py-2 px-4 rounded-xl bg-white border border-[#E6E0D6] text-[#1A1816] text-xs font-semibold flex items-center justify-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#A88656]" />
              Personalize Style Vibe
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
