
import React, { useState } from 'react';
import { X, ChevronRight, ChevronDown } from 'lucide-react';
import { Category } from '../types';
import { CATEGORIES } from '../constants';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, selectedCategory, onSelectCategory }) => {
  // Define parent structure
  const categoryStructure: Record<string, Category[]> = {
    'New & Featured': [
      'Recently Added',
      '25 Years of Geocaching',
      'CITO Collection',
      'Premium Member Collection',
      'Event Hosting',
      'EarthCache™ Collection',
      'Adventure Lab® Products',
      'Challenges & Milestones',
      'Happy Holidays Collection'
    ],
    'Find-a-cache': [
      'GPS Devices',
      'Packs & Gear',
      'TOTT - Tools Of The Trade',
      'Pencils & Pens',
      'Flashlights',
      'Puzzle Caches',
      'Starter Kits'
    ],
    'Hide-a-cache': [
      'Cache Containers',
      'Back to Nature',
      'Devious Caches',
      'Ready to Hide Cache Kits',
      'Geocache Labels',
      'Rite in the Rain®',
      'Logbooks',
      'First To Find',
      'Night Caching',
      'Make / Maintain Caches'
    ],
    'Trackables': [
      'Travel Bugs®',
      'Geocoins',
      'Trackable Tags',
      'QR Tags',
      'Novelty Trackables',
      'Trackable Gear',
      'Trackable Patches',
      'Trackable Nametags',
      'Challenges & Milestones'
    ],
    'Wearables': [
      'Shirts',
      'Jackets & Hoodies',
      'Hats & Gloves',
      'Patches & Pins',
      'Bags & Packs',
      'Hiking Gear',
      'Kids',
      'Pet Gear'
    ],
    'Gifts & Swags': [
      'Geocaching Gift Ideas',
      'Gift Certificates',
      'Swag & Trade Items',
      'Stickers and Clings',
      'Vehicle Gear',
      'Signal the Frog®',
      'Geocaching Logo Gear',
      'Novelty items',
      'Geocaching Books',
      'Geocaching Kids',
      'Plush Items'
    ],
    'Clearance': [
      'Items On Sale',
      'Last Chance Items'
    ]
  };

  const parents = Object.keys(categoryStructure);

  // Track expanded state for each parent section
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'New & Featured': true,
    'Find-a-cache': false,
    'Hide-a-cache': false,
    'Trackables': false,
    'Wearables': false,
    'Gifts & Swags': false,
    'Clearance': false
  });

  const handleSelectSubCategory = (cat: Category) => {
    onSelectCategory(cat);
    onClose();
  };

  const toggleSection = (parent: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [parent]: !prev[parent]
    }));
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div className={`fixed top-0 left-0 bottom-0 w-80 bg-white z-[80] transition-transform duration-300 transform shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between border-b border-gray-100 bg-gray-50">
          <h2 className="text-2xl font-black text-gray-900">Store</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-xl transition-colors text-gray-500">
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>
        
        <div className="overflow-y-auto h-full pb-24 no-scrollbar bg-white">
          <div className="p-4 space-y-2">
            {parents.map((parent) => {
              const children = categoryStructure[parent];
              const isExpanded = expandedSections[parent];
              const isChildSelected = children.includes(selectedCategory);
              // Parent is "active" if one of its children is selected
              const isParentActive = isChildSelected || selectedCategory === parent;

              return (
                <div key={parent} className="space-y-1">
                  <div
                    onClick={() => toggleSection(parent)}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all cursor-pointer group
                      ${isParentActive 
                        ? 'bg-[#00863f] text-white shadow-md font-black' 
                        : 'text-gray-600 hover:bg-gray-50 font-bold'}
                    `}
                  >
                    <span className="text-base uppercase tracking-wider">{parent}</span>
                    <div className={`p-1 rounded-lg transition-colors ${isParentActive ? 'text-white/70' : 'text-gray-400 group-hover:text-gray-600'}`}>
                      {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-1 space-y-1 animate-in slide-in-from-top-2 duration-200">
                      {children.map((child, idx) => (
                        <button
                          key={`${child}-${idx}`}
                          onClick={() => handleSelectSubCategory(child)}
                          className={`w-[calc(100%-1.5rem)] ml-6 flex items-center justify-between px-5 py-3 rounded-xl transition-all border-l-2
                            ${selectedCategory === child 
                              ? 'bg-[#00863f]/10 text-[#00863f] border-[#00863f] font-black' 
                              : 'text-gray-500 hover:bg-gray-50 border-gray-100 font-bold'}
                          `}
                        >
                          <span className="text-sm">{child}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
