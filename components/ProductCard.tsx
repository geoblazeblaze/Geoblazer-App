
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const originalPrice = Number(product.price) || 0;
  const discountPrice = product.discountPrice ? Number(product.discountPrice) : null;
  const hasDiscount = !!discountPrice && discountPrice < originalPrice;
  
  const isSoldOut = product.discount?.toUpperCase().includes('SOLD OUT');

  return (
    <div 
      onClick={() => onClick(product)}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#00863f] transition-all flex flex-col h-full border border-gray-100 shadow-sm group relative"
    >
      {/* Discount/Sold Out Badge */}
      {product.discount && (
        <div className={`absolute top-2 left-2 px-2.5 py-1 rounded-full text-[10px] font-black text-white shadow-md z-10 animate-in fade-in zoom-in duration-300 ${isSoldOut ? 'bg-gray-400' : 'bg-red-500'}`}>
          {product.discount}
        </div>
      )}

      <div className="aspect-square relative overflow-hidden bg-white">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className={`w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-500 ${isSoldOut ? 'grayscale opacity-60' : ''}`}
        />
        {/* Quick View Overlay (Visual only) */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-bold text-gray-600 shadow-sm">Quick view</span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1 bg-gray-50/50 border-t border-gray-50">
        <div className="flex items-center space-x-2 mb-1">
          {hasDiscount ? (
            <>
              <span className="text-gray-400 line-through text-[11px] font-bold">
                ${originalPrice.toFixed(2)}
              </span>
              <span className="text-red-500 font-black text-sm">
                ${discountPrice!.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-[#00863f] font-black text-sm">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        <h3 className="text-gray-900 text-[11px] font-bold line-clamp-2 leading-snug">
          {product.name}
        </h3>
      </div>
    </div>
  );
};
