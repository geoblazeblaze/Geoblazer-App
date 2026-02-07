
import React from 'react';
import { Package, ArrowRight } from 'lucide-react';
import { COLORS } from '../constants';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
      <div className="w-24 h-24 bg-[#00863f] rounded-3xl flex items-center justify-center mb-8 shadow-xl rotate-3">
        <Package size={48} color="white" />
      </div>
      
      <div className="space-y-4 max-w-sm">
        <h1 className="text-3xl font-black text-gray-900 leading-tight">
          Welcome to <span className="text-[#00863f]">Geoblazer</span>
        </h1>
        <p className="text-gray-500 text-lg">
          Your Shop Geocaching Bulk Order app
        </p>
        <p className="text-gray-400 font-medium">
          Shop Geocaching 統一訂單 APP
        </p>
      </div>

      <div className="mt-12 w-full max-w-xs space-y-4">
        <button 
          onClick={onStart}
          className="w-full py-4 bg-[#00863f] text-white font-bold rounded-2xl flex items-center justify-center space-x-2 hover:brightness-110 shadow-lg"
        >
          <span>Start Shopping</span>
          <ArrowRight size={20} />
        </button>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
          Hong Kong Distributor System
        </p>
      </div>

      <div className="absolute bottom-8 text-gray-300">
        <div className="flex space-x-2 justify-center">
          <div className="w-2 h-2 rounded-full bg-[#00863f]"></div>
          <div className="w-2 h-2 rounded-full bg-[#f3a63b]"></div>
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
        </div>
      </div>
    </div>
  );
};
