
import React from 'react';
import { AppTab } from '../types';
import { BottomNav } from './BottomNav';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  cartCount: number;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, cartCount }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pb-20">
        {children}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} cartCount={cartCount} />
    </div>
  );
};
