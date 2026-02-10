import React, { useState } from 'react';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const originalPrice = Number(product.price) || 0;
  const discountPrice = product.discountPrice ? Number(product.discountPrice) : null;
  const hasDiscount = !!discountPrice && discountPrice < originalPrice;
  const displayPrice = hasDiscount ? discountPrice! : originalPrice;

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => Math.max(1, q - 1));

  const isSoldOut = product.discount?.toUpperCase().includes('SOLD OUT');

  return (
    <div className="fixed inset-0 bg-white z-[60] flex flex-col animate-in slide-in-from-right duration-300">
      <div className="p-4 flex items-center">
        <button onClick={onBack} className="p-3 rounded-2xl bg-gray-100 text-gray-800 shadow-sm border border-black/5">
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-32">
        <div className={`bg-white rounded-3xl p-6 mb-8 shadow-md border border-gray-100 flex items-center justify-center relative gap-4 ${product.imageUrl2 ? 'flex-col sm:flex-row' : ''}`}>
          {product.discount && (
            <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-black text-white shadow-lg z-10 ${isSoldOut ? 'bg-gray-400' : 'bg-red-500'}`}>
              {product.discount}
            </div>
          )}
          <div className="flex-1 flex justify-center">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className={`w-full max-w-[300px] aspect-square object-contain ${isSoldOut ? 'grayscale opacity-60' : ''}`}
            />
          </div>
          {product.imageUrl2 && (
            <div className="flex-1 flex justify-center">
              <img 
                src={product.imageUrl2} 
                alt={`${product.name} view 2`}
                className={`w-full max-w-[300px] aspect-square object-contain ${isSoldOut ? 'grayscale opacity-60' : ''}`}
              />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-black leading-tight text-gray-900">{product.name}</h1>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-[#00863f]/10 rounded text-[10px] font-black text-[#00863f] tracking-tighter uppercase">{product.category}</span>
              <span className="text-gray-400 text-xs font-bold">{product.sku}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Price (USD)</span>
            <div className="flex flex-col items-end">
              {hasDiscount && (
                <span className="text-gray-400 line-through text-sm font-bold">${originalPrice.toFixed(2)}</span>
              )}
              <span className={`text-3xl font-black ${hasDiscount ? 'text-red-500' : 'text-[#00863f]'}`}>
                ${displayPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between py-6">
            <span className="font-black text-gray-900 uppercase text-xs tracking-widest">Quantity</span>
            <div className="flex items-center space-x-8 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100 shadow-sm">
              <button onClick={decrement} className="text-[#00863f] hover:opacity-70 active:scale-90 transition-transform">
                <Minus size={24} strokeWidth={3} />
              </button>
              <span className="text-xl font-black w-6 text-center text-gray-900">{quantity}</span>
              <button onClick={increment} className="text-[#00863f] hover:opacity-70 active:scale-90 transition-transform">
                <Plus size={24} strokeWidth={3} />
              </button>
            </div>
          </div>

          <button 
            onClick={() => onAddToCart({ ...product, price: displayPrice }, quantity)}
            disabled={isSoldOut}
            className={`w-full py-5 text-white font-black rounded-2xl text-xl transition-all shadow-xl 
              ${isSoldOut ? 'bg-gray-300 cursor-not-allowed shadow-none' : 'bg-[#00863f] hover:brightness-110 active:scale-[0.98] shadow-[#00863f]/20'}`}
          >
            {isSoldOut ? 'Currently Sold Out' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  );
};