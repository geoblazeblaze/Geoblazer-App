
export type Category = 
  | 'New & Featured'
  | 'Recently Added'
  | '25 Years of Geocaching'
  | 'CITO Collection'
  | 'Premium Member Collection'
  | 'Event Hosting'
  | 'EarthCache™ Collection'
  | 'Adventure Lab® Products'
  | 'Challenges & Milestones'
  | 'Happy Holidays Collection'
  | 'Find-a-cache'
  | 'GPS Devices'
  | 'Packs & Gear'
  | 'TOTT - Tools Of The Trade'
  | 'Pencils & Pens'
  | 'Flashlights'
  | 'Puzzle Caches'
  | 'Starter Kits'
  | 'Hide-a-cache'
  | 'Cache Containers'
  | 'Back to Nature'
  | 'Devious Caches'
  | 'Ready to Hide Cache Kits'
  | 'Geocache Labels'
  | 'Rite in the Rain®'
  | 'Logbooks'
  | 'First To Find'
  | 'Night Caching'
  | 'Make / Maintain Caches'
  | 'Trackables'
  | 'Travel Bugs®' 
  | 'Geocoins' 
  | 'Trackable Tags' 
  | 'QR Tags' 
  | 'Novelty Trackables' 
  | 'Trackable Gear' 
  | 'Trackable Patches' 
  | 'Trackable Nametags'
  | 'Wearables'
  | 'Shirts'
  | 'Jackets & Hoodies'
  | 'Hats & Gloves'
  | 'Patches & Pins'
  | 'Bags & Packs'
  | 'Hiking Gear'
  | 'Kids'
  | 'Pet Gear'
  | 'Gifts & Swags'
  | 'Geocaching Gift Ideas'
  | 'Gift Certificates'
  | 'Swag & Trade Items'
  | 'Stickers and Clings'
  | 'Vehicle Gear'
  | 'Signal the Frog®'
  | 'Geocaching Logo Gear'
  | 'Novelty items'
  | 'Geocaching Books'
  | 'Geocaching Kids'
  | 'Plush Items'
  | 'Clearance'
  | 'Items On Sale'
  | 'Last Chance Items';

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  imageUrl: string;
  imageUrl2?: string;
  pageUrl: string;
  category: Category;
  description?: string;
  discount?: string;
  discountPrice?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserInfo {
  name: string;
  phone: string;
  email: string;
  notes?: string;
}

export enum AppTab {
  TRACKABLES = 'trackables',
  CART = 'cart',
  INFO = 'info'
}