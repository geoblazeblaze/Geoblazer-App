
import React from 'react';
import { ShoppingCart, User, Database } from 'lucide-react';
import { AppTab } from '../types';
import { COLORS } from '../constants';

interface BottomNavProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  cartCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, cartCount }) => {
  const isSelected = (tab: AppTab) => activeTab === tab;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-100 flex items-center justify-around z-50 px-2 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)]">
      <button 
        onClick={() => setActiveTab(AppTab.TRACKABLES)}
        className={`flex flex-col items-center justify-center space-y-1 w-full h-full transition-all ${isSelected(AppTab.TRACKABLES) ? 'scale-105' : 'opacity-40'}`}
      >
        <Database size={22} color={isSelected(AppTab.TRACKABLES) ? COLORS.primary : '#6b7280'} strokeWidth={isSelected(AppTab.TRACKABLES) ? 2.5 : 2} />
        <span className={`text-[9px] uppercase font-black tracking-tighter ${isSelected(AppTab.TRACKABLES) ? 'text-[#00863f]' : 'text-gray-500'}`}>
          Catalog
        </span>
      </button>

      <button 
        onClick={() => setActiveTab(AppTab.INFO)}
        className={`flex flex-col items-center justify-center space-y-1 w-full h-full transition-all ${isSelected(AppTab.INFO) ? 'scale-105' : 'opacity-40'}`}
      >
        <User size={22} color={isSelected(AppTab.INFO) ? COLORS.primary : '#6b7280'} strokeWidth={isSelected(AppTab.INFO) ? 2.5 : 2} />
        <span className={`text-[9px] uppercase font-black tracking-tighter ${isSelected(AppTab.INFO) ? 'text-[#00863f]' : 'text-gray-500'}`}>
          Contact Info
        </span>
      </button>

      <button 
        onClick={() => setActiveTab(AppTab.CART)}
        className={`flex flex-col items-center justify-center space-y-1 w-full h-full relative transition-all ${isSelected(AppTab.CART) ? 'scale-105' : 'opacity-40'}`}
      >
        <div className="relative">
          <ShoppingCart size={22} color={isSelected(AppTab.CART) ? COLORS.primary : '#6b7280'} strokeWidth={isSelected(AppTab.CART) ? 2.5 : 2} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-black border-2 border-white shadow-sm">
              {cartCount}
            </span>
          )}
        </div>
        <span className={`text-[9px] uppercase font-black tracking-tighter ${isSelected(AppTab.CART) ? 'text-[#00863f]' : 'text-gray-500'}`}>
          Cart
        </span>
      </button>
    </nav>
  );
};
