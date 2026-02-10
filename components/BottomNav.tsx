
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

  // Optimized sizes for better mobile accessibility
  const iconSize = 26; 
  const activeStroke = 2.5;
  const inactiveStroke = 2;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-100 flex items-center justify-around z-50 px-4 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] pb-safe">
      <button 
        onClick={() => setActiveTab(AppTab.TRACKABLES)}
        className={`flex flex-col items-center justify-center space-y-1.5 flex-1 h-full transition-all duration-200 ${isSelected(AppTab.TRACKABLES) ? 'scale-105' : 'opacity-50 hover:opacity-80'}`}
      >
        <Database 
          size={iconSize} 
          color={isSelected(AppTab.TRACKABLES) ? COLORS.primary : '#64748b'} 
          strokeWidth={isSelected(AppTab.TRACKABLES) ? activeStroke : inactiveStroke} 
        />
        <span className={`text-[11px] uppercase font-black tracking-tight ${isSelected(AppTab.TRACKABLES) ? 'text-[#00863f]' : 'text-slate-500'}`}>
          Catalog
        </span>
      </button>

      <button 
        onClick={() => setActiveTab(AppTab.INFO)}
        className={`flex flex-col items-center justify-center space-y-1.5 flex-1 h-full transition-all duration-200 ${isSelected(AppTab.INFO) ? 'scale-105' : 'opacity-50 hover:opacity-80'}`}
      >
        <User 
          size={iconSize} 
          color={isSelected(AppTab.INFO) ? COLORS.primary : '#64748b'} 
          strokeWidth={isSelected(AppTab.INFO) ? activeStroke : inactiveStroke} 
        />
        <span className={`text-[11px] uppercase font-black tracking-tight ${isSelected(AppTab.INFO) ? 'text-[#00863f]' : 'text-slate-500'}`}>
          Contact Info
        </span>
      </button>

      <button 
        onClick={() => setActiveTab(AppTab.CART)}
        className={`flex flex-col items-center justify-center space-y-1.5 flex-1 h-full relative transition-all duration-200 ${isSelected(AppTab.CART) ? 'scale-105' : 'opacity-50 hover:opacity-80'}`}
      >
        <div className="relative">
          <ShoppingCart 
            size={iconSize} 
            color={isSelected(AppTab.CART) ? COLORS.primary : '#64748b'} 
            strokeWidth={isSelected(AppTab.CART) ? activeStroke : inactiveStroke} 
          />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-black border-2 border-white shadow-md animate-in zoom-in duration-300">
              {cartCount}
            </span>
          )}
        </div>
        <span className={`text-[11px] uppercase font-black tracking-tight ${isSelected(AppTab.CART) ? 'text-[#00863f]' : 'text-slate-500'}`}>
          My Cart
        </span>
      </button>
    </nav>
  );
};
