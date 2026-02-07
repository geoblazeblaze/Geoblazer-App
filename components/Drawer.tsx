
import React from 'react';
import { X, ChevronRight, Hash } from 'lucide-react';
import { Category } from '../types';
import { CATEGORIES } from '../constants';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, selectedCategory, onSelectCategory }) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div className={`fixed top-0 left-0 bottom-0 w-80 bg-white z-[80] transition-transform duration-300 transform shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between border-b border-gray-100 bg-gray-50">
          <h2 className="text-2xl font-black text-gray-900">Categories</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-xl transition-colors text-gray-500">
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>
        
        <div className="overflow-y-auto h-full pb-24 no-scrollbar bg-white">
          <div className="p-4 space-y-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all ${selectedCategory === cat ? 'bg-[#00863f] text-white shadow-md font-black' : 'text-gray-600 hover:bg-gray-50 font-bold'}`}
              >
                <div className="flex items-center space-x-4">
                  <Hash size={18} className={selectedCategory === cat ? 'text-white' : 'text-[#00863f]/40'} />
                  <span className="text-sm">{cat}</span>
                </div>
                <ChevronRight size={16} className={selectedCategory === cat ? 'text-white/50' : 'text-gray-300'} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
