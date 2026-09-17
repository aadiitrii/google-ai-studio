import { Product, PRODUCTS } from '../data/products';

export interface UserStyleProfile {
  selectedStyles: string[];
  budgetPreference: 'all' | 'under1000' | 'under2000' | 'under3000';
  favoriteCategory: 'All' | 'Women' | 'Men' | 'Unisex' | 'Accessories';
  colorPreference: 'all' | 'neutrals' | 'earthy' | 'dark' | 'vibrant';
  currentOccasion?: string;
}

const STORAGE_KEY = 'sho_pro_user_style_profile';

export const DEFAULT_STYLE_PROFILE: UserStyleProfile = {
  selectedStyles: ['Quiet Luxury', 'Minimalist Chic'],
  budgetPreference: 'all',
  favoriteCategory: 'All',
  colorPreference: 'all',
  currentOccasion: 'Smart Casual Outing'
};

export function getSavedStyleProfile(): UserStyleProfile {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // fallback
  }
  return DEFAULT_STYLE_PROFILE;
}

export function saveStyleProfile(profile: UserStyleProfile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // fallback
  }
}

export function getRecommendedProducts(
  profile: UserStyleProfile,
  viewedIds: string[] = [],
  cartIds: string[] = []
): Product[] {
  return [...PRODUCTS].sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    // 1. Style matching
    profile.selectedStyles.forEach(style => {
      if (a.styles.includes(style as any)) scoreA += 30;
      if (b.styles.includes(style as any)) scoreB += 30;
    });

    // 2. Category match
    if (profile.favoriteCategory !== 'All') {
      if (a.category === profile.favoriteCategory) scoreA += 25;
      if (b.category === profile.favoriteCategory) scoreB += 25;
    }

    // 3. Budget match
    if (profile.budgetPreference === 'under1000') {
      if (a.price <= 1000) scoreA += 20;
      if (b.price <= 1000) scoreB += 20;
    } else if (profile.budgetPreference === 'under2000') {
      if (a.price <= 2000) scoreA += 20;
      if (b.price <= 2000) scoreB += 20;
    } else if (profile.budgetPreference === 'under3000') {
      if (a.price <= 3000) scoreA += 15;
      if (b.price <= 3000) scoreB += 15;
    }

    // 4. Cart / Viewed affinity (pairing boost)
    cartIds.forEach(id => {
      const inCart = PRODUCTS.find(p => p.id === id);
      if (inCart?.pairingIds.includes(a.id)) scoreA += 35;
      if (inCart?.pairingIds.includes(b.id)) scoreB += 35;
    });

    // 5. Rating weight
    scoreA += a.rating * 4;
    scoreB += b.rating * 4;

    return scoreB - scoreA;
  });
}

export interface CuratedLook {
  occasion: string;
  tagline: string;
  aesthetic: string;
  items: Product[];
  bundlePrice: number;
  originalBundlePrice: number;
  bundleDiscount: number;
}

export function getCuratedLooks(profile: UserStyleProfile): CuratedLook[] {
  const all = PRODUCTS;
  return [
    {
      occasion: 'Rooftop Sunset & Cocktail Dinner',
      tagline: 'Lustrous silk slip paired with an architectural shoulder bag & gold choker',
      aesthetic: 'Lavish Evening Glamour',
      items: [
        all.find(p => p.id === 'sp-02')!, // Milan Silk Dress
        all.find(p => p.id === 'sp-09')!, // Aura Leather Bag
        all.find(p => p.id === 'sp-10')!  // Monaco Choker
      ].filter(Boolean),
      bundlePrice: 3899,
      originalBundlePrice: 8697,
      bundleDiscount: 55
    },
    {
      occasion: 'Riviera High-Society Brunch',
      tagline: 'Breathable European linen blazer over wide-leg trousers with leather accents',
      aesthetic: 'Old Money & Quiet Luxury',
      items: [
        all.find(p => p.id === 'sp-01')!, // Florence Blazer
        all.find(p => p.id === 'sp-04')!, // Riviera Trousers
        all.find(p => p.id === 'sp-09')!  // Aura Bag
      ].filter(Boolean),
      bundlePrice: 5299,
      originalBundlePrice: 11797,
      bundleDiscount: 55
    },
    {
      occasion: 'Urban Minimalist Off-Duty',
      tagline: 'Heavyweight boxy combed tee matched with Scandinavian pleated chinos',
      aesthetic: 'Streetwear Clean Aesthetics',
      items: [
        all.find(p => p.id === 'sp-03')!, // Kyoto Heavyweight Tee
        all.find(p => p.id === 'sp-06')!, // Stockholm Chino
        all.find(p => p.id === 'sp-10')!  // Monaco Chain
      ].filter(Boolean),
      bundlePrice: 2999,
      originalBundlePrice: 6597,
      bundleDiscount: 54
    },
    {
      occasion: 'Capri & Mediterranean Vacation',
      tagline: 'Textured resort camp collar shirt with hand-crocheted holiday coordinates',
      aesthetic: 'Bohemian Resort Luxury',
      items: [
        all.find(p => p.id === 'sp-05')!, // Saint-Tropez Shirt
        all.find(p => p.id === 'sp-12')!, // Capri Sundress
        all.find(p => p.id === 'sp-10')!  // Choker
      ].filter(Boolean),
      bundlePrice: 3399,
      originalBundlePrice: 7197,
      bundleDiscount: 52
    }
  ];
}
