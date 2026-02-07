
import { Product, Category } from './types';

// Fix: Added textSecondary to avoid property 'textSecondary' does not exist error in BottomNav.tsx
export const COLORS = {
  primary: '#00863f', // Geocaching Green
  accent: '#f3a63b',  // Geocaching Orange
  lightBg: '#f9fafb',
  darkBg: '#121212',
  textSecondary: '#9ca3af'
};

export const CATEGORIES: Category[] = [
  'All',
  'Travel Bugs®',
  'Geocoins',
  'Trackable Tags',
  'QR Tags',
  'Novelty Trackables',
  'Trackable Gear',
  'Trackable Patches',
  'Trackable Nametags',
  'Challenges & Milestones'
];

export const MOCK_PRODUCTS: Product[] = [
  // Fix: Added required pageUrl property to mock products
  { id: '1', category: 'Travel Bugs®', name: 'Geocaching Travel Bug®', sku: 'TB-01', price: 4.99, imageUrl: 'https://shop.geocaching.com/cdn/shop/products/travel-bug-trackable-tag_1_600x600.jpg?v=1646261545', pageUrl: 'https://shop.geocaching.com/products/travel-bug-trackable-tag' },
  { id: '2', category: 'Geocoins', name: 'Official 2024 Geocoin', sku: 'GC-2024', price: 15.99, imageUrl: 'https://picsum.photos/seed/coin1/400/400', pageUrl: '#' },
  { id: '3', category: 'Trackable Tags', name: 'Signal the Frog® Tag', sku: 'TAG-01', price: 5.25, imageUrl: 'https://shop.geocaching.com/cdn/shop/products/signal-the-frog-trackable-tag_1_600x600.jpg?v=1646261564', pageUrl: 'https://shop.geocaching.com/products/signal-the-frog-trackable-tag' },
  { id: '4', category: 'Novelty Trackables', name: 'Cache Kin® Ladybug', sku: 'NOV-01', price: 5.99, imageUrl: 'https://shop.geocaching.com/cdn/shop/products/cache-kin-ladybug_1_600x600.jpg?v=1646261568', pageUrl: 'https://shop.geocaching.com/products/cache-kin-ladybug' },
  { id: '5', category: 'QR Tags', name: 'Munzee QR Trackable', sku: 'QR-01', price: 3.50, imageUrl: 'https://picsum.photos/seed/qr1/400/400', pageUrl: '#' },
  { id: '6', category: 'Trackable Gear', name: 'Reflective TB Decal', sku: 'GEAR-01', price: 11.99, imageUrl: 'https://shop.geocaching.com/cdn/shop/products/travel-bug-reflective-decal-6-inch_1_600x600.jpg?v=1646261552', pageUrl: 'https://shop.geocaching.com/products/travel-bug-reflective-decal-6-inch' },
  { id: '7', category: 'Trackable Patches', name: 'Embroidered TB Patch', sku: 'PATCH-01', price: 6.50, imageUrl: 'https://picsum.photos/seed/patch1/400/400', pageUrl: '#' },
  { id: '8', category: 'Challenges & Milestones', name: '100 Finds Milestone Coin', sku: 'MILE-100', price: 12.99, imageUrl: 'https://picsum.photos/seed/mile1/400/400', pageUrl: '#' },
  { id: '9', category: 'Trackable Nametags', name: 'Custom Name Tag', sku: 'NAME-01', price: 8.99, imageUrl: 'https://picsum.photos/seed/name1/400/400', pageUrl: '#' },
  // Adding duplicates for infinite scroll demonstration
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: `extra-${i}`,
    category: CATEGORIES[Math.floor(Math.random() * (CATEGORIES.length - 1)) + 1],
    name: `Bulk Item #${i + 10}`,
    sku: `SKU-B-${i}`,
    price: Math.floor(Math.random() * 20) + 5.99,
    imageUrl: `https://picsum.photos/seed/item${i}/400/400`,
    pageUrl: '#'
  }))
];

export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyxT2rsaPDWXxWKnxK63qGgX_BEq1SwAaCZ8AG5fnEALnxahJg-mGlCA3kRIQGAiRD-/exec';
