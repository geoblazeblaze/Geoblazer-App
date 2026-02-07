
import React from 'react';
import { Trash2, Send, ShoppingBag, Truck, Loader2 } from 'lucide-react';
import { CartItem, UserInfo } from '../types';

interface CartProps {
  items: CartItem[];
  userInfo: UserInfo;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const Cart: React.FC<CartProps> = ({ 
  items, 
  userInfo, 
  onUpdateQuantity, 
  onRemove, 
  onSubmit,
  isSubmitting 
}) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] px-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-gray-300" />
        </div>
        <h2 className="text-xl font-bold mb-2 text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500">Start adding trackables to your bulk order!</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6 pb-12 animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between px-1">
        <h1 className="text-2xl font-black text-gray-900">Checkout</h1>
        <span className="bg-orange-500 text-white px-3 py-1 rounded-lg text-xs font-black shadow-sm">
          {items.length} {items.length === 1 ? 'ITEM' : 'ITEMS'}
        </span>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-2xl flex space-x-4 items-center shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-white rounded-xl p-1 shrink-0 overflow-hidden border border-gray-50">
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm truncate text-gray-800">{item.name}</h3>
              <p className="text-[#00863f] font-black text-sm mt-0.5">${item.price.toFixed(2)}</p>
              
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-3 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="text-gray-500 font-bold hover:text-[#00863f] w-4 text-center"
                  >
                    -
                  </button>
                  <span className="text-xs font-black w-4 text-center text-gray-800">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="text-gray-500 font-bold hover:text-[#00863f] w-4 text-center"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={() => onRemove(item.id)}
                  className="p-2 text-red-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-black text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-3xl space-y-4 shadow-lg border border-gray-100">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-gray-500 text-sm font-medium">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-gray-500 text-sm font-medium">
            <div className="flex items-center space-x-1">
              <span>Bulk Freight Share</span>
              <Truck size={14} className="text-orange-500" />
            </div>
            <span className="text-orange-500 font-bold">INCLUDED</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-lg font-black text-gray-900">Order Total</span>
          <span className="text-2xl font-black text-[#00863f]">${total.toFixed(2)}</span>
        </div>

        <button 
          onClick={onSubmit}
          disabled={isSubmitting || !userInfo.name || !userInfo.phone}
          className={`w-full py-4 rounded-2xl flex items-center justify-center space-x-2 font-black transition-all shadow-lg text-lg
            ${(isSubmitting || !userInfo.name || !userInfo.phone) 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-[#00863f] text-white hover:brightness-105 active:scale-[0.98]'}`}
        >
          {isSubmitting ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              <Send size={20} />
              <span>Confirm Order</span>
            </>
          )}
        </button>
        {!userInfo.name || !userInfo.phone ? (
          <p className="text-red-500 font-bold text-[10px] text-center uppercase tracking-wider">Missing Identity Details</p>
        ) : null}
      </div>
    </div>
  );
};
