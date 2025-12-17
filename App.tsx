
import React, { useState, useMemo } from 'react';
import { ShoppingBag, Zap, Cpu, MousePointer2, ChevronRight, X, Trash2, Search, Heart } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import AIChat from './components/AIChat';
import Profile from './components/Profile';
import Trailers from './components/Trailers';
import Settings from './components/Settings';
import { Product, CartItem } from './types';
import { PRODUCTS, CATEGORIES } from './constants';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('market');
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;
    
    // Section-based filtering
    if (activeSection === 'wishlist') {
      list = list.filter(p => wishlist.includes(p.id));
    }
    
    // Category-based filtering
    if (activeCategory !== 'All' && !['wishlist', 'profile', 'trailers', 'settings'].includes(activeSection)) {
      list = list.filter(p => p.category === activeCategory);
    }

    // Search term filtering
    if (searchTerm.trim() !== '' && activeSection === 'search') {
      const term = searchTerm.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    }

    return list;
  }, [activeSection, activeCategory, searchTerm, wishlist]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <Profile />;
        
      case 'trailers':
        return <Trailers />;

      case 'settings':
        return <Settings />;
        
      case 'search':
        return (
          <section className="container mx-auto px-8 py-12 animate-in fade-in duration-500">
            <div className="mb-12">
              <h2 className="text-4xl font-orbitron font-black mb-6 flex items-center gap-4">
                <Search size={32} className="text-[#fa1e4e]" />
                GLOBAL <span className="text-[#fa1e4e]">SEARCH</span>
              </h2>
              <div className="relative group max-w-2xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-500 group-focus-within:text-[#fa1e4e] transition-colors" />
                </div>
                <input 
                  autoFocus
                  type="text"
                  placeholder="Scan hardware database..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#161618] border border-gray-800 focus:border-[#fa1e4e] outline-none text-white font-orbitron py-4 pl-12 pr-6 rounded-sm transition-all text-xl"
                />
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(p => (
                  <ProductCard 
                    key={p.id} 
                    product={p} 
                    onAddToCart={addToCart} 
                    onToggleWishlist={toggleWishlist}
                    isWishlisted={wishlist.includes(p.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border border-dashed border-gray-800 rounded-lg">
                <p className="text-gray-500 font-orbitron text-lg">No matching signals found in the network.</p>
              </div>
            )}
          </section>
        );

      case 'wishlist':
        return (
          <section className="container mx-auto px-8 py-12 animate-in fade-in duration-500">
            <div className="mb-12">
              <h2 className="text-4xl font-orbitron font-black mb-2 flex items-center gap-4">
                <Heart size={32} className="text-[#fa1e4e]" />
                SAVED <span className="text-[#fa1e4e]">TARGETS</span>
              </h2>
              <p className="text-gray-500 font-orbitron text-xs tracking-widest uppercase">Your curated high-performance list</p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(p => (
                  <ProductCard 
                    key={p.id} 
                    product={p} 
                    onAddToCart={addToCart} 
                    onToggleWishlist={toggleWishlist}
                    isWishlisted={wishlist.includes(p.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border border-dashed border-gray-800 rounded-lg">
                <p className="text-gray-500 font-orbitron text-lg">Wishlist protocol empty. Mark targets to save them here.</p>
                <button 
                  onClick={() => setActiveSection('market')}
                  className="mt-6 text-[#fa1e4e] font-orbitron text-sm underline hover:text-white transition-colors"
                >
                  Return to Market
                </button>
              </div>
            )}
          </section>
        );

      default: // 'market'
        return (
          <>
            <section className="relative h-[400px] overflow-hidden">
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1920" 
                  alt="Hero" 
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0d] via-[#0b0b0d]/80 to-transparent" />
              </div>

              <div className="relative h-full container mx-auto px-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4 text-[#fa1e4e]">
                  <Zap size={20} fill="currentColor" />
                  <span className="font-orbitron tracking-widest text-sm uppercase">Limited Edition Series</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-orbitron font-black leading-none mb-6">
                  BEYOND <br />
                  <span className="text-[#fa1e4e] gx-glow">LIMITS.</span>
                </h1>
                <p className="max-w-xl text-gray-400 text-lg mb-8">
                  Upgrade your setup with the world's most aggressive hardware. 
                  Powered by GX architecture for gamers who demand nothing less than perfection in Kenya.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      const el = document.getElementById('market-grid');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-[#fa1e4e] hover:bg-[#ff4e7e] text-white font-orbitron font-bold py-3 px-8 rounded-sm transition-all shadow-[0_0_20px_rgba(250,30,78,0.3)]"
                  >
                    BROWSE GEAR
                  </button>
                  <button 
                    onClick={() => setActiveSection('trailers')}
                    className="border border-gray-700 hover:border-white text-white font-orbitron font-bold py-3 px-8 rounded-sm transition-all"
                  >
                    TRAILER
                  </button>
                </div>
              </div>
            </section>

            <div id="market-grid" className="sticky top-0 z-40 bg-[#0b0b0d]/90 backdrop-blur-md border-b border-gray-800 py-4 px-8">
              <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs font-orbitron uppercase tracking-widest whitespace-nowrap px-4 py-2 border border-transparent transition-all ${
                      activeCategory === cat 
                        ? 'text-[#fa1e4e] border-b-[#fa1e4e]' 
                        : 'text-gray-500 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <section className="container mx-auto px-8 py-12">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="text-3xl font-orbitron font-bold mb-2">HOT <span className="text-[#fa1e4e]">DROPS</span></h2>
                  <p className="text-gray-500">Live inventory of high-performance components</p>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-xs font-orbitron text-gray-500">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500" /> STABLE
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#fa1e4e]" /> LOW STOCK
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(p => (
                  <ProductCard 
                    key={p.id} 
                    product={p} 
                    onAddToCart={addToCart} 
                    onToggleWishlist={toggleWishlist}
                    isWishlisted={wishlist.includes(p.id)}
                  />
                ))}
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <Sidebar 
        onToggleCart={() => setIsCartOpen(!isCartOpen)} 
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        activeSection={activeSection}
        setActiveSection={(s) => {
          setActiveSection(s);
          if (s !== 'search') setSearchTerm(''); 
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <main className="pl-14 transition-all duration-300">
        {renderContent()}

        {/* Generic App Features (Shown on all main pages) */}
        <section className="bg-[#111113] py-20 border-t border-gray-800">
          <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#fa1e4e]/10 border border-[#fa1e4e]/30 rounded-full flex items-center justify-center mb-6">
                <Cpu className="text-[#fa1e4e]" size={32} />
              </div>
              <h3 className="text-xl font-orbitron font-bold mb-4">GX-CONTROL</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Sync all your GX hardware with a single interface. Real-time telemetry and RGB management.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#fa1e4e]/10 border border-[#fa1e4e]/30 rounded-full flex items-center justify-center mb-6">
                <MousePointer2 className="text-[#fa1e4e]" size={32} />
              </div>
              <h3 className="text-xl font-orbitron font-bold mb-4">PRECISION REWARDS</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Earn points for every purchase. Level up your account to unlock exclusive founder series hardware.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#fa1e4e]/10 border border-[#fa1e4e]/30 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="text-[#fa1e4e]" size={32} />
              </div>
              <h3 className="text-xl font-orbitron font-bold mb-4">FAST SHIP GRID</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Next-day delivery across Kenyan major cities. Real-time satellite tracking for every package.
              </p>
            </div>
          </div>
        </section>

        <footer className="border-t border-gray-800 py-12 bg-[#0b0b0d]">
          <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#fa1e4e] flex items-center justify-center font-orbitron font-black text-white text-xl">G</div>
              <div>
                <span className="font-orbitron font-bold text-white block">GX COMMERCE</span>
                <span className="text-[10px] text-gray-500 tracking-widest uppercase">The Gear of Tomorrow</span>
              </div>
            </div>
            <div className="flex gap-8 text-xs font-orbitron text-gray-500">
              <a href="#" className="hover:text-white transition-colors">TERMINALS</a>
              <a href="#" className="hover:text-white transition-colors">SUPPORT</a>
              <a href="#" className="hover:text-white transition-colors">PRIVACY GRID</a>
              <a href="#" className="hover:text-white transition-colors">NETWORK</a>
            </div>
            <p className="text-[10px] text-gray-600 font-orbitron">
              &copy; 2024 GX CORP. ALL RIGS RESERVED.
            </p>
          </div>
        </footer>
      </main>

      <div className={`fixed top-0 right-0 w-full sm:w-[400px] h-screen bg-[#0b0b0d] border-l border-gray-800 z-[60] flex flex-col transition-transform duration-500 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#1a1a1c]">
          <h2 className="text-white font-orbitron font-bold text-sm tracking-widest uppercase flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#fa1e4e]" />
            Cart Control
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50">
              <ShoppingBag size={48} className="mb-4" />
              <p className="font-orbitron text-sm">Cart is Empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="bg-[#161618] border border-gray-800 p-3 flex gap-4">
                <img src={item.image} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-white text-xs font-bold truncate">{item.name}</h4>
                  <p className="text-[#fa1e4e] text-sm font-orbitron mt-1">KSh {item.price.toLocaleString()}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] text-gray-500 uppercase">Qty: {item.quantity}</span>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-[#fa1e4e] self-center transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-gray-800 bg-[#1a1a1c]">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-500 font-orbitron text-sm uppercase">Grid Total</span>
            <span className="text-xl font-orbitron font-bold text-white">KSh {cartTotal.toLocaleString()}</span>
          </div>
          <button className="w-full bg-[#fa1e4e] hover:bg-[#ff4e7e] text-white font-orbitron font-bold py-4 rounded-sm flex items-center justify-center gap-2 transition-all group">
            INITIATE CHECKOUT
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <AIChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        availableProducts={PRODUCTS} 
      />

      {(isCartOpen || isChatOpen) && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={() => {
            setIsCartOpen(false);
            setIsChatOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default App;
