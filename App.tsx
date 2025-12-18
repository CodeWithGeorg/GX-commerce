
import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingBag, Zap, Cpu, MousePointer2, ChevronRight, X, Trash2, Search, Heart, Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import AIChat from './components/AIChat';
import Profile from './components/Profile';
import Trailers from './components/Trailers';
import Settings from './components/Settings';
import AuthModal from './components/AuthModal';
import { Product, CartItem } from './types';
import { PRODUCTS, CATEGORIES } from './constants';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('market');
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [user, setUser] = useState<{ name: string } | null>(null);

  // Sync theme with HTML class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;
    
    if (activeSection === 'wishlist') {
      list = list.filter(p => wishlist.includes(p.id));
    }
    
    if (activeCategory !== 'All' && !['wishlist', 'profile', 'trailers', 'settings'].includes(activeSection)) {
      list = list.filter(p => p.category === activeCategory);
    }

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
    if (!user) {
      setIsAuthOpen(true);
      return;
    }

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
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleLogin = (username: string) => {
    setUser({ name: username });
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setWishlist([]);
    setActiveSection('market');
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': return <Profile user={user} onLogout={handleLogout} onLoginClick={() => setIsAuthOpen(true)} />;
      case 'trailers': return <Trailers />;
      case 'settings': return <Settings isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />;
      case 'search':
        return (
          <section className="container mx-auto px-4 md:px-8 py-24 md:py-32 animate-in fade-in duration-500">
            <div className="mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-orbitron font-black mb-6 flex items-center gap-4 theme-text-primary">
                <Search size={28} className="text-[#fa1e4e]" />
                GLOBAL <span className="text-[#fa1e4e]">SEARCH</span>
              </h2>
              <div className="relative group w-full lg:max-w-2xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-500 group-focus-within:text-[#fa1e4e] transition-colors" />
                </div>
                <input 
                  autoFocus
                  type="text"
                  placeholder="Scan hardware database..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full theme-bg-secondary border theme-border focus:border-[#fa1e4e] outline-none theme-text-primary font-orbitron py-4 pl-12 pr-6 rounded-sm transition-all text-lg md:text-xl"
                />
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map(p => (
                  <ProductCard key={p.id} product={p} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} isWishlisted={wishlist.includes(p.id)} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border border-dashed theme-border rounded-lg">
                <p className="theme-text-secondary font-orbitron text-lg">No matching signals found in the network.</p>
              </div>
            )}
          </section>
        );

      case 'wishlist':
        return (
          <section className="container mx-auto px-4 md:px-8 py-24 md:py-32 animate-in fade-in duration-500">
            <div className="mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-orbitron font-black mb-2 flex items-center gap-4 theme-text-primary">
                <Heart size={28} className="text-[#fa1e4e]" />
                SAVED <span className="text-[#fa1e4e]">TARGETS</span>
              </h2>
              <p className="theme-text-secondary font-orbitron text-[10px] md:text-xs tracking-widest uppercase">Your curated high-performance list</p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map(p => (
                  <ProductCard key={p.id} product={p} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} isWishlisted={wishlist.includes(p.id)} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border border-dashed theme-border rounded-lg">
                <p className="theme-text-secondary font-orbitron text-lg">Wishlist protocol empty.</p>
                <button onClick={() => setActiveSection('market')} className="mt-6 text-[#fa1e4e] font-orbitron text-sm underline hover:text-white transition-colors">Return to Market</button>
              </div>
            )}
          </section>
        );

      default: // 'market'
        return (
          <>
            <section className="relative h-[550px] md:h-[500px] overflow-hidden">
              <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1920" alt="Hero" className="w-full h-full object-cover opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent" />
              </div>

              <div className="relative h-full container mx-auto px-4 md:px-8 flex flex-col justify-center pt-24 md:pt-32">
                <div className="flex items-center gap-2 mb-4 text-[#fa1e4e]">
                  <Zap size={20} fill="currentColor" />
                  <span className="font-orbitron tracking-widest text-[10px] md:text-sm uppercase">Limited Edition Series</span>
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-orbitron font-black leading-tight md:leading-none mb-6 theme-text-primary">
                  BEYOND <br className="hidden sm:block" />
                  <span className="text-[#fa1e4e] gx-glow">LIMITS.</span>
                </h1>
                <p className="max-w-xl theme-text-secondary text-sm md:text-lg mb-8 leading-relaxed">
                  Upgrade your setup with the world's most aggressive hardware. 
                  Powered by GX architecture for gamers who demand perfection.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => document.getElementById('market-grid')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#fa1e4e] hover:bg-[#ff4e7e] text-white font-orbitron font-bold py-4 md:py-3 px-8 rounded-sm transition-all shadow-[0_0_20px_rgba(250,30,78,0.3)] w-full sm:w-auto">BROWSE GEAR</button>
                  <button onClick={() => setActiveSection('trailers')} className="border theme-border hover:border-[#fa1e4e] theme-text-primary font-orbitron font-bold py-4 md:py-3 px-8 rounded-sm transition-all w-full sm:w-auto">TRAILER</button>
                </div>
              </div>
            </section>

            <div id="market-grid" className="sticky top-0 z-40 theme-bg-primary/90 backdrop-blur-md border-b theme-border py-4 px-4 md:px-8">
              <div className="flex items-center gap-4 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth">
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} className={`text-[10px] md:text-xs font-orbitron uppercase tracking-widest whitespace-nowrap px-4 py-2 border border-transparent transition-all ${activeCategory === cat ? 'text-[#fa1e4e] border-b-[#fa1e4e]' : 'theme-text-secondary hover:theme-text-primary'}`}>{cat}</button>
                ))}
              </div>
            </div>

            <section className="container mx-auto px-4 md:px-8 py-8 md:py-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-orbitron font-bold mb-2 theme-text-primary">HOT <span className="text-[#fa1e4e]">DROPS</span></h2>
                  <p className="theme-text-secondary text-sm">Live inventory of high-performance components</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map(p => (
                  <ProductCard key={p.id} product={p} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} isWishlisted={wishlist.includes(p.id)} />
                ))}
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen theme-bg-primary theme-text-primary transition-colors duration-300">
      <Sidebar 
        onToggleCart={() => setIsCartOpen(!isCartOpen)} 
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        activeSection={activeSection}
        setActiveSection={(s) => {
          setActiveSection(s);
          if (s !== 'search') setSearchTerm(''); 
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isLoggedIn={!!user}
      />

      <main className="pl-0 md:pl-14 pb-20 md:pb-0 relative">
        {/* Updated Transparent Top Header */}
        <header className="absolute top-0 left-0 right-0 h-20 md:h-24 z-30 flex items-center justify-between pl-10 pr-6 md:pl-20 md:pr-12 pointer-events-none transition-all duration-500">
          <div 
            className={`flex items-center gap-2 pointer-events-auto cursor-pointer transition-all duration-500 ${activeSection !== 'market' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`} 
            onClick={() => setActiveSection('market')}
          >
             <div className="md:hidden w-8 h-8 rounded bg-[#fa1e4e] flex items-center justify-center font-orbitron font-black text-white text-lg">G</div>
             <span className="font-orbitron font-black text-sm md:text-lg tracking-tighter text-[#fa1e4e] md:theme-text-primary">GX <span className="hidden md:inline theme-text-primary">COMMERCE</span></span>
          </div>
          
          <div className="flex items-center gap-6 pointer-events-auto">
             <div className="hidden lg:flex items-center gap-8 text-[10px] font-orbitron tracking-[0.2em] uppercase theme-text-secondary">
                <span className={`hover:text-[#fa1e4e] cursor-pointer transition-colors ${activeSection === 'market' ? 'text-[#fa1e4e]' : ''}`} onClick={() => setActiveSection('market')}>Home</span>
                <span className={`hover:text-[#fa1e4e] cursor-pointer transition-colors ${activeSection === 'search' ? 'text-[#fa1e4e]' : ''}`} onClick={() => setActiveSection('search')}>Archive</span>
                <span className={`hover:text-[#fa1e4e] cursor-pointer transition-colors ${activeSection === 'trailers' ? 'text-[#fa1e4e]' : ''}`} onClick={() => setActiveSection('trailers')}>Media</span>
             </div>
             
             <div className="flex items-center gap-3">
               {!user && (
                 <button 
                  onClick={() => setIsAuthOpen(true)}
                  className="hidden md:block bg-[#fa1e4e]/10 border border-[#fa1e4e]/30 px-6 py-2 rounded-sm theme-text-primary font-orbitron text-[10px] uppercase tracking-widest hover:bg-[#fa1e4e] hover:text-white transition-all shadow-sm"
                 >
                   Initialize Access
                 </button>
               )}
               <div className="w-10 h-10 rounded-full border theme-border flex items-center justify-center theme-bg-primary/50 backdrop-blur-sm cursor-pointer hover:border-[#fa1e4e] transition-all group shadow-sm" onClick={() => setIsCartOpen(true)}>
                  <ShoppingBag size={18} className="theme-text-primary group-hover:text-[#fa1e4e] transition-colors" />
               </div>
             </div>
          </div>
        </header>

        {renderContent()}

        <section className="theme-bg-secondary py-16 md:py-20 border-t theme-border">
          <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {[
              { icon: Cpu, title: 'GX-CONTROL', text: 'Sync all your GX hardware with a single interface. Real-time telemetry and RGB management.' },
              { icon: MousePointer2, title: 'PRECISION REWARDS', text: 'Earn points for every purchase. Level up your account to unlock exclusive founder series hardware.' },
              { icon: ShoppingBag, title: 'FAST SHIP GRID', text: 'Next-day delivery across Kenyan major cities. Real-time satellite tracking for every package.' }
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center p-4">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#fa1e4e]/10 border border-[#fa1e4e]/30 rounded-full flex items-center justify-center mb-6">
                  <f.icon className="text-[#fa1e4e]" size={28} />
                </div>
                <h3 className="text-lg md:text-xl font-orbitron font-bold mb-4 theme-text-primary">{f.title}</h3>
                <p className="theme-text-secondary text-sm leading-relaxed max-w-xs">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t theme-border py-12 theme-bg-primary">
          <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#fa1e4e] flex items-center justify-center font-orbitron font-black text-white text-xl">G</div>
              <div>
                <span className="font-orbitron font-bold theme-text-primary block text-sm">GX COMMERCE</span>
                <span className="text-[10px] theme-text-secondary tracking-widest uppercase">The Gear of Tomorrow</span>
              </div>
            </div>
            <p className="text-[10px] theme-text-secondary font-orbitron uppercase tracking-widest text-center">&copy; 2025 GX CORP. ALL RIGS RESERVED.</p>
          </div>
        </footer>
      </main>

      {/* Cart Control Panel */}
      <div className={`fixed top-0 right-0 w-full sm:w-[400px] h-screen theme-bg-primary border-l theme-border z-[60] flex flex-col transition-transform duration-500 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b theme-border flex justify-between items-center theme-bg-tertiary">
          <h2 className="theme-text-primary font-orbitron font-bold text-sm tracking-widest uppercase flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#fa1e4e]" /> Cart Control
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="theme-text-secondary hover:theme-text-primary"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center theme-text-secondary opacity-50">
              <ShoppingBag size={48} className="mb-4" />
              <p className="font-orbitron text-sm">Cart is Empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="theme-bg-secondary border theme-border p-3 flex gap-4">
                <img src={item.image} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <h4 className="theme-text-primary text-xs font-bold truncate">{item.name}</h4>
                  <p className="text-[#fa1e4e] text-sm font-orbitron mt-1">KSh {item.price.toLocaleString()}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="theme-text-secondary hover:text-[#fa1e4e] self-center"><Trash2 size={16} /></button>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t theme-border theme-bg-tertiary">
          <div className="flex justify-between items-center mb-6">
            <span className="theme-text-secondary font-orbitron text-sm uppercase">Grid Total</span>
            <span className="text-xl font-orbitron font-bold theme-text-primary">KSh {cartTotal.toLocaleString()}</span>
          </div>
          <button className="w-full bg-[#fa1e4e] hover:bg-[#ff4e7e] text-white font-orbitron font-bold py-4 rounded-sm flex items-center justify-center gap-2">INITIATE CHECKOUT <ChevronRight size={18} /></button>
        </div>
      </div>

      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} availableProducts={PRODUCTS} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLogin={handleLogin} />
      {(isCartOpen || isChatOpen || isAuthOpen) && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={() => {setIsCartOpen(false); setIsChatOpen(false); setIsAuthOpen(false);}} />}
    </div>
  );
};

export default App;
