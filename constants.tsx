
import { Product, Category } from './types';

export const COLORS = {
  primary: '#00863f', // Geocaching Green
  accent: '#f3a63b',  // Geocaching Orange
  lightBg: '#f9fafb',
  darkBg: '#121212',
  textSecondary: '#9ca3af'
};

export const CATEGORIES: Category[] = [
  'New & Featured', 'Recently Added', '25 Years of Geocaching', 'CITO Collection', 'Premium Member Collection', 'Event Hosting', 'EarthCache™ Collection', 'Adventure Lab® Products', 'Challenges & Milestones', 'Happy Holidays Collection',
  'Find-a-cache', 'GPS Devices', 'Packs & Gear', 'TOTT - Tools Of The Trade', 'Pencils & Pens', 'Flashlights', 'Puzzle Caches', 'Starter Kits',
  'Hide-a-cache', 'Cache Containers', 'Back to Nature', 'Devious Caches', 'Ready to Hide Cache Kits', 'Geocache Labels', 'Rite in the Rain®', 'Logbooks', 'First To Find', 'Night Caching', 'Make / Maintain Caches',
  'Trackables', 'Travel Bugs®', 'Geocoins', 'Trackable Tags', 'QR Tags', 'Novelty Trackables', 'Trackable Gear', 'Trackable Patches', 'Trackable Nametags',
  'Wearables', 'Shirts', 'Jackets & Hoodies', 'Hats & Gloves', 'Patches & Pins', 'Bags & Packs', 'Hiking Gear', 'Kids', 'Pet Gear',
  'Gifts & Swags', 'Geocaching Gift Ideas', 'Gift Certificates', 'Swag & Trade Items', 'Stickers and Clings', 'Vehicle Gear', 'Signal the Frog®', 'Geocaching Logo Gear', 'Novelty items', 'Geocaching Books', 'Geocaching Kids', 'Plush Items',
  'Clearance', 'Items On Sale', 'Last Chance Items'
];

export const CATEGORY_TO_SHEET_MAP: Record<string, string> = {
  // New & Featured
  'Recently Added': 'recently-added',
  '25 Years of Geocaching': '25-years-of-geocaching',
  'CITO Collection': 'CITO',
  'Premium Member Collection': 'premium-member-collection',
  'Event Hosting': 'hq-event',
  'EarthCache™ Collection': 'international-earthcache-day',
  'Adventure Lab® Products': 'adventure-lab-products',
  'Challenges & Milestones': 'Challenges & Milestones',
  'Happy Holidays Collection': 'happy-holidays-collection',

  // Find-a-cache
  'GPS Devices': 'gps-devices',
  'Packs & Gear': 'packs-gear',
  'TOTT - Tools Of The Trade': 'tott',
  'Pencils & Pens': 'pencils-pens',
  'Flashlights': 'flashlights',
  'Puzzle Caches': 'puzzle-caches',
  'Starter Kits': 'starter-kits',

  // Hide-a-cache
  'Cache Containers': 'cache-containers',
  'Back to Nature': 'back-to-nature',
  'Devious Caches': 'devious-caches',
  'Ready to Hide Cache Kits': 'cache-kits',
  'Geocache Labels': 'cache-labels',
  'Rite in the Rain®': 'rite-in-the-rain',
  'Logbooks': 'logbooks',
  'First To Find': 'first-to-find',
  'Night Caching': 'night-caching',
  'Make / Maintain Caches': 'cache-maintenance',

  // Wearables
  'Shirts': 'shirts-wearables',
  'Jackets & Hoodies': 'jackets-and-hoodies',
  'Hats & Gloves': 'hats',
  'Patches & Pins': 'patches-and-pins',
  'Bags & Packs': 'bags-packs',
  'Hiking Gear': 'hiking-gear',
  'Kids': 'kids',
  'Pet Gear': 'pet-gear',

  // Gifts & Swags
  'Geocaching Gift Ideas': 'gift-ideas',
  'Gift Certificates': 'gift-certificates',
  'Swag & Trade Items': 'swag',
  'Stickers and Clings': 'stickers-and-clings',
  'Vehicle Gear': 'vehicle-gear',
  'Signal the Frog®': 'signal-the-frog',
  'Geocaching Logo Gear': 'geocaching-logo-collection',
  'Novelty items': 'novelty-items-gifts-swag',
  'Geocaching Books': 'geocaching-books',
  'Geocaching Kids': 'geocaching-kids',
  'Plush Items': 'plush-items',

  // Clearance
  'Items On Sale': 'on-sale',
  'Last Chance Items': 'last-chance-items',

  // Trackables (Updated to match likely exact sheet names)
  'Travel Bugs®': 'Travel Bugs',
  'Geocoins': 'Geocoins',
  'Trackable Tags': 'Trackable Tags',
  'QR Tags': 'QR Tags',
  'Novelty Trackables': 'Novelty Trackables',
  'Trackable Gear': 'Trackable Gear',
  'Trackable Patches': 'Trackable Patches',
  'Trackable Nametags': 'Trackable Nametags'
};

export const MOCK_PRODUCTS: Product[] = []; 

export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyxT2rsaPDWXxWKnxK63qGgX_BEq1SwAaCZ8AG5fnEALnxahJg-mGlCA3kRIQGAiRD-/exec';
