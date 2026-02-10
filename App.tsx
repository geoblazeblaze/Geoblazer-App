
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Search, Info, CheckCircle2, Menu, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Product, CartItem, UserInfo, AppTab, Category } from './types';
import { GOOGLE_SCRIPT_URL, CATEGORY_TO_SHEET_MAP } from './constants';
import { Layout } from './components/Layout';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { Drawer } from './components/Drawer';
import { LandingPage } from './components/LandingPage';
import { submitOrderToSheet } from './services/googleSheetsService';
import html2canvas from 'html2canvas';

const ITEMS_PER_PAGE = 16;

const App: React.FC = () => {
  // Navigation
  const [showLanding, setShowLanding] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>('Recently Added');
  
  // Data State
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  
  // App Logic State
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.TRACKABLES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>(() => {
    const saved = localStorage.getItem('hk_geo_user_info');
    return saved ? JSON.parse(saved) : { name: '', phone: '', email: '', notes: '' };
  });

  const receiptRef = useRef<HTMLDivElement>(null);

  // Fetch Products based on Category
  const fetchProducts = useCallback(async () => {
    if (showLanding || !GOOGLE_SCRIPT_URL) return;

    setIsLoading(true);
    setFetchError(null);
    
    // Explicit mapping prioritization
    let sheetName = CATEGORY_TO_SHEET_MAP[selectedCategory];
    
    // If not in map, sanitize the category name for use as a sheet name
    if (!sheetName) {
      sheetName = selectedCategory.replace(/[®™]/g, '').trim();
    }

    console.log(`[Geoblazer] Requesting sheet: "${sheetName}" for category: "${selectedCategory}"`);

    try {
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?sheet=${encodeURIComponent(sheetName)}`);
      
      if (!response.ok) {
        throw new Error(`Failed to reach the server (Status: ${response.status})`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        console.warn(`[Geoblazer] Received non-array data for sheet: ${sheetName}`, data);
        setProducts([]);
        return;
      }

      const sanitizedData = data.map((p: any, index: number) => ({
        ...p,
        id: p.sku ? String(p.sku) : `item-${index}`,
        pageUrl: p.pageUrl || '',
        imageUrl2: p.imageUrl2 || '',
        price: typeof p.price === 'number' ? p.price : parseFloat(String(p.price || 0).replace(/[^0-9.]/g, '')),
        discountPrice: (p.discountPrice && p.discountPrice !== '') ? (typeof p.discountPrice === 'number' ? p.discountPrice : parseFloat(String(p.discountPrice).replace(/[^0-9.]/g, ''))) : undefined
      }));
      
      setProducts(sanitizedData);
    } catch (error: any) {
      console.error("[Geoblazer] Fetch Error:", error);
      setFetchError(`Could not load section "${selectedCategory}". Error: ${error.message}`);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [showLanding, selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Pagination Logic
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loaderRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setVisibleCount(prev => prev + ITEMS_PER_PAGE);
    }
  }, []);

  useEffect(() => {
    if (isLoading || fetchError || activeTab !== AppTab.TRACKABLES) return;

    const option = { root: null, rootMargin: "150px", threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);
    
    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }
    
    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [handleObserver, activeTab, isLoading, fetchError]);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchQuery, selectedCategory]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const nameMatch = p.name?.toLowerCase().includes(searchQuery.toLowerCase());
      const skuMatch = p.sku?.toLowerCase().includes(searchQuery.toLowerCase());
      return nameMatch || skuMatch;
    });
  }, [searchQuery, products]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const handleAddToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    setSelectedProduct(null);
    setActiveTab(AppTab.CART);
  };

  const handleQuickAdd = (product: Product) => {
    handleAddToCart(product, 1);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)));
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.id !== id));

  const generateReceipt = async () => {
    if (!receiptRef.current) return;
    try {
      // Temporarily show the receipt container for capture
      receiptRef.current.style.visibility = 'visible';
      await new Promise(resolve => setTimeout(resolve, 300));
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true
      });
      receiptRef.current.style.visibility = 'hidden';
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = `Geoblazer_Order_${new Date().getTime()}.png`;
      link.click();
    } catch (err) {
      console.error("[Geoblazer] Failed to generate receipt image:", err);
      if (receiptRef.current) receiptRef.current.style.visibility = 'hidden';
    }
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    const finalItems = [...cart];
    const success = await submitOrderToSheet(userInfo, finalItems);
    
    if (success) {
      await generateReceipt();
      setCart([]);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } else {
      alert('Error submitting order.');
    }
    setIsSubmitting(false);
  };

  if (showLanding) return <LandingPage onStart={() => setShowLanding(false)} />;

  // General input class with reduced left padding for standard fields
  const inputClass = "w-full p-4 pl-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#00863f] focus:bg-white transition-all";

  return (
    <div className="min-h-screen bg-[#f4f7f5] text-gray-900 overflow-x-hidden">
      <Layout activeTab={activeTab} setActiveTab={setActiveTab} cartCount={cartCount}>
        
        {/* Header */}
        <div className="p-4 sticky top-0 z-40 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <button onClick={() => setIsDrawerOpen(true)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <Menu size={24} className="text-gray-700" />
            </button>
            <div>
              <h1 className="text-xl font-black text-[#00863f]">Geoblazer</h1>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Shop Geocaching HK Distributor</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-[#00863f]/10 rounded-full flex items-center justify-center">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-[#00863f]" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-[#00863f] animate-pulse"></div>
            )}
          </div>
        </div>

        {/* Catalog Content */}
        {activeTab === AppTab.TRACKABLES && (
          <div className="p-4 space-y-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
              <input 
                type="text"
                placeholder={`Search in ${selectedCategory}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${inputClass} !pl-12`} // Use !pl-12 to ensure it overrides and provides enough room for the icon
              />
            </div>

            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-bold text-gray-800">{selectedCategory}</h2>
              <span className="text-xs text-gray-500 font-medium">{filteredProducts.length} items</span>
            </div>

            {fetchError ? (
              <div className="p-8 bg-red-50 border border-red-100 rounded-3xl text-center space-y-4">
                <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-900">Connection Failed</h3>
                  <p className="text-red-600 text-sm mt-1">{fetchError}</p>
                </div>
                <button 
                  onClick={fetchProducts}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-red-500 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-transform"
                >
                  <RefreshCw size={18} />
                  <span>Retry Connection</span>
                </button>
              </div>
            ) : isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-[#00863f]" />
                <p className="text-gray-500 font-medium">Updating catalog...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {visibleProducts.map(product => (
                  <ProductCard key={product.id} product={product} onClick={setSelectedProduct} onQuickAdd={handleQuickAdd} />
                ))}
              </div>
            )}

            {!isLoading && !fetchError && (
              <div ref={loaderRef} className="py-10 flex justify-center">
                {hasMore ? (
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 h-8 border-4 border-[#00863f] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Loading more</p>
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <p className="text-gray-400 text-sm italic">End of stash list</p>
                ) : !isLoading && (
                   <p className="text-gray-400 text-sm italic">No items found in this section.</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Contact Info Tab */}
        {activeTab === AppTab.INFO && (
           <div className="max-w-md mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
             <div className="flex items-center space-x-3">
               <div className="p-3 bg-[#00863f]/10 rounded-2xl text-[#00863f] shadow-inner"><Info size={24} strokeWidth={2.5} /></div>
               <h2 className="text-2xl font-black text-gray-800">Contact Info</h2>
             </div>
             
             <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 px-1 uppercase tracking-widest">Geocaching Username</label>
                  <input placeholder="Enter your username" value={userInfo.name} onChange={e => setUserInfo({...userInfo, name: e.target.value})} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 px-1 uppercase tracking-widest">WhatsApp / WeChat / Phone</label>
                  <input placeholder="Enter your number or WeChat username" value={userInfo.phone} onChange={e => setUserInfo({...userInfo, phone: e.target.value})} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 px-1 uppercase tracking-widest">Email Address</label>
                  <input placeholder="Enter email address" value={userInfo.email} onChange={e => setUserInfo({...userInfo, email: e.target.value})} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 px-1 uppercase tracking-widest">Delivery Notes</label>
                  <textarea placeholder="e.g. MTR pickup, special instructions..." value={userInfo.notes} onChange={e => setUserInfo({...userInfo, notes: e.target.value})} rows={3} className={`${inputClass} resize-none`} />
                </div>
             </div>
             <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
               <p className="text-xs text-gray-500 leading-relaxed">
                 Identity data is stored locally. We use this to process your bulk order requests and notify you of arrivals.
               </p>
             </div>
           </div>
        )}

        {/* Cart Tab */}
        {activeTab === AppTab.CART && (
          <Cart 
            items={cart} userInfo={userInfo} 
            onUpdateQuantity={updateCartQuantity} onRemove={removeFromCart} 
            onSubmit={handleSubmitOrder} isSubmitting={isSubmitting} 
          />
        )}

        {/* Overlays */}
        <Drawer 
          isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} 
          selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} 
        />
        
        {selectedProduct && (
          <ProductDetail 
            product={selectedProduct} onBack={() => setSelectedProduct(null)} 
            onAddToCart={handleAddToCart} 
          />
        )}

        {showSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in zoom-in duration-300">
            <div className="bg-white p-8 rounded-3xl text-center space-y-4 max-w-sm w-full shadow-2xl">
              <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"><CheckCircle2 size={48} /></div>
              <h2 className="text-2xl font-black text-gray-900">Order Sent!</h2>
              <p className="text-gray-500">Your order has been recorded and a receipt image has been saved to your device.</p>
              <button onClick={() => setShowSuccess(false)} className="w-full py-4 bg-[#00863f] text-white font-bold rounded-2xl shadow-xl active:scale-95 transition-transform">Perfect</button>
            </div>
          </div>
        )}

        <div 
          ref={receiptRef} 
          style={{ visibility: 'hidden', position: 'absolute', top: '-10000px', pointerEvents: 'none' }} 
          className="w-[500px] bg-white p-8 space-y-6 text-gray-900 border-8 border-[#00863f]"
        >
            <div className="text-center border-b-2 border-gray-100 pb-6">
              <h1 className="text-4xl font-black text-[#00863f] mb-1">GEOBLAZER</h1>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Shop Geocaching Bulk Order Receipt</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Username</p>
                <p className="font-bold">{userInfo.name || 'Anonymous'}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone</p>
                <p className="font-bold">{userInfo.phone || 'N/A'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</p>
                <p className="font-bold">{new Date().toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-1">Order Details</p>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-[10px] text-gray-400">SKU: {item.sku} | Qty: {item.quantity}</p>
                  </div>
                  <p className="font-black">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t-4 border-gray-100 flex justify-between items-center">
              <span className="text-xl font-black">TOTAL</span>
              <span className="text-3xl font-black text-[#00863f]">
                ${cart.reduce((s, i) => s + (i.price * i.quantity), 0).toFixed(2)}
              </span>
            </div>

            <div className="text-[10px] text-center text-gray-400 pt-8 border-t border-gray-100">
              <p className="font-bold mb-1 italic">"We use million dollar satellites to find penny treasures!"</p>
              <p>Thank you for using Geoblazer Bulk Ordering HK</p>
            </div>
        </div>
      </Layout>
    </div>
  );
};

export default App;
