export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number; // In INR / reasonable currency
  originalPrice: number;
  discountPercentage: number;
  category: 'Women' | 'Men' | 'Unisex' | 'Accessories';
  styles: ('Quiet Luxury' | 'Streetwear' | 'Minimalist Chic' | 'Old Money' | 'Boho Luxe' | 'Party & Glamour')[];
  rating: number;
  reviewsCount: number;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  fabric: string;
  fit: string;
  badge?: 'Trending' | 'Bestseller' | 'Editor Choice' | 'Limited Drop' | 'Under ₹1499';
  pairingIds: string[]; // for "Complete the Look" suggestions
}

export const PRODUCTS: Product[] = [
  {
    id: 'sp-01',
    name: 'Oversized Florence Linen Blazer',
    subtitle: 'Relaxed tailored silhouette in Italian flax weave',
    price: 2499,
    originalPrice: 4999,
    discountPercentage: 50,
    category: 'Women',
    styles: ['Quiet Luxury', 'Minimalist Chic', 'Old Money'],
    rating: 4.9,
    reviewsCount: 142,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Oatmeal Beige', hex: '#E6DEC9' },
      { name: 'Midnight Charcoal', hex: '#222224' },
      { name: 'Warm Cream', hex: '#F7F4EB' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Effortless quiet luxury meets modern tailoring. Designed with structured shoulders and an airy, breathable linen texture that elevates everyday denims or matching trousers.',
    fabric: '85% European Flax Linen, 15% Mulberry Silk',
    fit: 'Relaxed contemporary boxy fit',
    badge: 'Trending',
    pairingIds: ['sp-04', 'sp-08', 'sp-10']
  },
  {
    id: 'sp-02',
    name: 'Milan Silk Slip Evening Dress',
    subtitle: 'Bias-cut drape with cowl neckline & delicate straps',
    price: 1899,
    originalPrice: 3899,
    discountPercentage: 51,
    category: 'Women',
    styles: ['Party & Glamour', 'Quiet Luxury', 'Minimalist Chic'],
    rating: 4.8,
    reviewsCount: 98,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#D4AF37' },
      { name: 'Emerald Forest', hex: '#1C3B2B' },
      { name: 'Noir Black', hex: '#111111' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Cut on the bias to hug and flatter every curve softly. The lustrous matte-satin fabric catches golden-hour light beautifully for cocktail evenings and upscale dinners.',
    fabric: 'Satin-finish Mulberry Silk composite',
    fit: 'Fluid body-skimming bias cut',
    badge: 'Bestseller',
    pairingIds: ['sp-01', 'sp-09']
  },
  {
    id: 'sp-03',
    name: 'Kyoto Heavyweight Boxy Tee',
    subtitle: '300 GSM combed cotton with dropped shoulders',
    price: 899,
    originalPrice: 1799,
    discountPercentage: 50,
    category: 'Unisex',
    styles: ['Streetwear', 'Minimalist Chic'],
    rating: 4.9,
    reviewsCount: 310,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Washed Charcoal', hex: '#373739' },
      { name: 'Off-White Ecru', hex: '#F4F1EA' },
      { name: 'Vintage Sage', hex: '#8A9A86' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'The definitive streetwear staple. High-density 300 GSM cotton provides a crisp silhouette that maintains its architectural drape wash after wash.',
    fabric: '100% Ring-spun Heavyweight Cotton',
    fit: 'Oversized boxy streetwear drape',
    badge: 'Under ₹1499',
    pairingIds: ['sp-06', 'sp-11']
  },
  {
    id: 'sp-04',
    name: 'Riviera Pleated Wide-Leg Trousers',
    subtitle: 'Double front pleats with tailored drape',
    price: 1799,
    originalPrice: 3499,
    discountPercentage: 48,
    category: 'Women',
    styles: ['Quiet Luxury', 'Old Money', 'Minimalist Chic'],
    rating: 4.7,
    reviewsCount: 86,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Warm Taupe', hex: '#8E8275' },
      { name: 'Classic Bone', hex: '#EBE5D8' },
      { name: 'Deep Espresso', hex: '#2E221B' }
    ],
    sizes: ['26', '28', '30', '32', '34'],
    description: 'Inspired by Mediterranean coastal elegance. Designed with sharp pressed pleats, high-rise waistline, and an elongated fluid leg opening.',
    fabric: 'Tencel & Lyocell Wool blend',
    fit: 'High-rise relaxed wide leg',
    badge: 'Editor Choice',
    pairingIds: ['sp-01', 'sp-05', 'sp-09']
  },
  {
    id: 'sp-05',
    name: 'Saint-Tropez Textured Resort Shirt',
    subtitle: 'Camp collar with waffle jacquard breathable texture',
    price: 1299,
    originalPrice: 2499,
    discountPercentage: 48,
    category: 'Men',
    styles: ['Old Money', 'Quiet Luxury', 'Boho Luxe'],
    rating: 4.8,
    reviewsCount: 124,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Olive Grove', hex: '#5B6652' },
      { name: 'Ivory Sand', hex: '#F3EDE2' },
      { name: 'Aegean Blue', hex: '#39536C' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Understated summer luxury. Retro camp collar design constructed from lightweight textured jacquard knit that breathes easily under tropical sun or holiday evenings.',
    fabric: '100% Breathable Jacquard Slub Cotton',
    fit: 'Relaxed retro holiday fit',
    badge: 'Under ₹1499',
    pairingIds: ['sp-04', 'sp-06']
  },
  {
    id: 'sp-06',
    name: 'Stockholm Minimalist Pleated Chino',
    subtitle: 'Tailored casual straight fit with clean waist tab',
    price: 1699,
    originalPrice: 3299,
    discountPercentage: 48,
    category: 'Men',
    styles: ['Old Money', 'Quiet Luxury', 'Minimalist Chic'],
    rating: 4.9,
    reviewsCount: 165,
    images: [
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Khaki Stone', hex: '#C2B69D' },
      { name: 'Navy Abyss', hex: '#1C2434' },
      { name: 'Olive Drab', hex: '#4A5043' }
    ],
    sizes: ['30', '32', '34', '36'],
    description: 'The epitome of refined Scandinavian minimalism. Features cleanly pressed creases and a slight taper towards the ankle for effortless shoe styling.',
    fabric: '98% Organic Pima Cotton, 2% Elastane',
    fit: 'Tailored straight-leg cut',
    badge: 'Bestseller',
    pairingIds: ['sp-03', 'sp-05', 'sp-07']
  },
  {
    id: 'sp-07',
    name: 'Geneva Cashmere-Blend Knit Polo',
    subtitle: 'Fine-gauge knitwear with ribbed collar & mother-of-pearl buttons',
    price: 1999,
    originalPrice: 3999,
    discountPercentage: 50,
    category: 'Men',
    styles: ['Old Money', 'Quiet Luxury'],
    rating: 5.0,
    reviewsCount: 72,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Caramel Toffee', hex: '#9A6B43' },
      { name: 'Cashmere Grey', hex: '#9B9B9B' },
      { name: 'Midnight Navy', hex: '#182030' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Ultra-soft fine gauge knit polo crafted with genuine cashmere touch. Light enough for spring layering and warm enough for cozy evenings.',
    fabric: '30% Mongolian Cashmere, 70% Extra-fine Merino Wool',
    fit: 'Modern tailored drape',
    badge: 'Editor Choice',
    pairingIds: ['sp-06', 'sp-04']
  },
  {
    id: 'sp-08',
    name: 'Santorini Crochet Resort Halter Set',
    subtitle: 'Hand-crocheted coordinate with scallop edging',
    price: 2199,
    originalPrice: 4299,
    discountPercentage: 49,
    category: 'Women',
    styles: ['Boho Luxe', 'Party & Glamour'],
    rating: 4.7,
    reviewsCount: 93,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Sunlit Terracotta', hex: '#C86D51' },
      { name: 'Natural Shell', hex: '#EAE5D9' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Bohemian lavishness made wearable. Handcrafted crochet texture inspired by Aegean islands with matching adjustable halter top and midi skirt.',
    fabric: '100% Mercerized Cotton Thread',
    fit: 'Customizable tie back & elastic waist',
    badge: 'Limited Drop',
    pairingIds: ['sp-09', 'sp-10']
  },
  {
    id: 'sp-09',
    name: 'Aura Minimalist Leather Shoulder Bag',
    subtitle: 'Sculptural asymmetric curved silhouette with gold brass hardware',
    price: 1599,
    originalPrice: 3299,
    discountPercentage: 51,
    category: 'Accessories',
    styles: ['Quiet Luxury', 'Minimalist Chic', 'Party & Glamour'],
    rating: 4.9,
    reviewsCount: 215,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Buttery Caramel', hex: '#B87A47' },
      { name: 'Jet Gloss', hex: '#1E1E1E' },
      { name: 'Cloud Cream', hex: '#F5F0E6' }
    ],
    sizes: ['One Size'],
    description: 'Architectural arm candy designed to fit your phone, keys, lipstick and cardholder with graceful aesthetic symmetry.',
    fabric: 'Full-Grain Vegan Nappa Leather & 18K Gold-plated hardware',
    fit: 'Structured ergonomic shoulder drop',
    badge: 'Trending',
    pairingIds: ['sp-01', 'sp-02', 'sp-04']
  },
  {
    id: 'sp-10',
    name: 'Monaco Chunky 18K Plated Chain Choker',
    subtitle: 'Hypoallergenic waterproof link necklace with toggle closure',
    price: 699,
    originalPrice: 1499,
    discountPercentage: 53,
    category: 'Accessories',
    styles: ['Quiet Luxury', 'Streetwear', 'Party & Glamour'],
    rating: 4.9,
    reviewsCount: 380,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611591475879-c56784d0b0b8?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: '18K Yellow Gold', hex: '#DFB15B' },
      { name: 'Platinum Silver', hex: '#D1D5DB' }
    ],
    sizes: ['40cm + 5cm Extender'],
    description: 'An everyday statement piece. Triple coated in 18K gold over surgical stainless steel, engineered to never tarnish or turn green even in showers.',
    fabric: '316L Surgical Stainless Steel with 18K PVD Gold Plating',
    fit: 'Adjustable collar fit',
    badge: 'Under ₹1499',
    pairingIds: ['sp-01', 'sp-02', 'sp-03']
  },
  {
    id: 'sp-11',
    name: 'Berlin Acid-Wash Vintage Cargo Joggers',
    subtitle: 'Tactical multi-pocket streetwear with cinchable ankle toggles',
    price: 1599,
    originalPrice: 2999,
    discountPercentage: 46,
    category: 'Unisex',
    styles: ['Streetwear'],
    rating: 4.8,
    reviewsCount: 156,
    images: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Faded Obsidian', hex: '#2A2A2E' },
      { name: 'Distressed Moss', hex: '#4B5320' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Urban attitude meets utility comfort. Heavy mineral washed canvas with reinforced knee paneling and adjustable shock-cord cuffs.',
    fabric: '100% Heavy Twill Cotton (340 GSM)',
    fit: 'Relaxed tapered balloon silhouette',
    badge: 'Trending',
    pairingIds: ['sp-03', 'sp-10']
  },
  {
    id: 'sp-12',
    name: 'Capri Linen Cross-Tie Sundress',
    subtitle: 'Tiered flowy skirt with open back and delicate waist ties',
    price: 1699,
    originalPrice: 3199,
    discountPercentage: 47,
    category: 'Women',
    styles: ['Boho Luxe', 'Quiet Luxury'],
    rating: 4.9,
    reviewsCount: 114,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Mediterranean Terracotta', hex: '#C9684C' },
      { name: 'Pristine White', hex: '#FFFFFF' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Effortless romantic charm for sun-drenched days. Features a flattering square neckline, smocked elastic back bodice, and cascading tier hem.',
    fabric: '70% French Linen, 30% Modal',
    fit: 'Fitted bodice with flowy A-line skirt',
    badge: 'Trending',
    pairingIds: ['sp-09', 'sp-10']
  }
];

export const STYLE_VIBES = [
  {
    id: 'Quiet Luxury',
    title: 'Quiet Luxury',
    desc: 'Understated elegance, impeccable fabrics, neutral tones',
    badge: 'Trending #1'
  },
  {
    id: 'Old Money',
    title: 'Old Money Classic',
    desc: 'Timeless polo knits, pleated trousers, heritage tailoring',
    badge: 'Classic'
  },
  {
    id: 'Streetwear',
    title: 'Streetwear Chic',
    desc: 'Heavyweight boxy cuts, relaxed cargos, urban utility',
    badge: 'Edgy'
  },
  {
    id: 'Minimalist Chic',
    title: 'Minimalist Chic',
    desc: 'Clean silhouettes, monochrome palette, effortless daily luxury',
    badge: 'Essential'
  },
  {
    id: 'Party & Glamour',
    title: 'Party & Evening Glam',
    desc: 'Lustrous satin, evening cocktail cuts, sculpted silhouettes',
    badge: 'Lavish'
  },
  {
    id: 'Boho Luxe',
    title: 'Bohemian Resort',
    desc: 'Crochet textures, linen sundresses, sun-drenched earth tones',
    badge: 'Vacation'
  }
];
