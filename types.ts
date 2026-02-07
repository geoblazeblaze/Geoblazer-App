
export type Category = 
  | 'All'
  | 'Travel Bugs®' 
  | 'Geocoins' 
  | 'Trackable Tags' 
  | 'QR Tags' 
  | 'Novelty Trackables' 
  | 'Trackable Gear' 
  | 'Trackable Patches' 
  | 'Trackable Nametags' 
  | 'Challenges & Milestones';

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  imageUrl: string;
  pageUrl: string; // New field
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
