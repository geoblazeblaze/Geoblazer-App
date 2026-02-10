import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onQuickAdd }) => {
  const [isHovered, setIsHovered] = useState(false);
  const originalPrice = Number(product.price) || 0;
  const discountPrice = product.discountPrice ? Number(product.discountPrice) : null;
  const hasDiscount = !!discountPrice && discountPrice < originalPrice;
  
  const isSoldOut = product.discount?.toUpperCase().includes('SOLD OUT');

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSoldOut) {
      onQuickAdd(product);
    }
  };

  return (
    <div 
      onClick={() => onClick(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          src={isHovered && product.imageUrl2 ? product.imageUrl2 : product.imageUrl} 
          alt={product.name}
          className={`w-full h-full object-contain p-3 transition-all duration-500 ${isSoldOut ? 'grayscale opacity-60' : ''} ${isHovered && product.imageUrl2 ? 'scale-105' : 'group-hover:scale-110'}`}
        />
        {/* Quick View Overlay (Visual only) */}
        {!isHovered && (
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-bold text-gray-600 shadow-sm">Quick view</span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-1 bg-gray-50/50 border-t border-gray-50 space-y-3">
        <div>
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
          
          <h3 className="text-gray-900 text-[11px] font-bold line-clamp-2 leading-snug h-8">
            {product.name}
          </h3>
        </div>

        <button
          onClick={handleQuickAdd}
          disabled={isSoldOut}
          className={`w-full py-2.5 rounded-xl flex items-center justify-center space-x-2 text-[10px] font-black uppercase tracking-wider transition-all shadow-sm
            ${isSoldOut 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-[#00863f] text-white hover:brightness-110 active:scale-95'}`}
        >
          {isSoldOut ? (
            <span>Sold out</span>
          ) : (
            <>
              <ShoppingCart size={14} />
              <span>Add to cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};