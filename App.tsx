
import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingBag, Zap, Cpu, MousePointer2, ChevronRight, X, Trash2, Search, Heart, Menu } from 'lucide-react';
import { supabase } from './services/supabaseClient';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import AIChat from './components/AIChat';
import Profile from './components/Profile';
import Trailers from './components/Trailers';
import Settings from './components/Settings';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
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
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [accentColor, setAccentColor] = useState('#fa1e4e');
  const [rgbIntensity, setRgbIntensity] = useState(0.8);
  const [user, setUser] = useState<any>(null);

  // Initial Auth Sync
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sync theme with HTML class and CSS variables
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.remove('light');
    } else {
      root.classList.add('light');
    }
    root.style.setProperty('--accent-color', accentColor);
    root.style.setProperty('--glow-intensity', rgbIntensity.toString());
  }, [isDarkMode, accentColor, rgbIntensity]);

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;
    if (activeSection === 'wishlist') list = list.filter(p => wishlist.includes(p.id));
    if (activeCategory !== 'All' && !['wishlist', 'profile', 'trailers', 'settings'].includes(activeSection)) {
      list = list.filter(p => p.category === activeCategory);
    }
    if (searchTerm.trim() !== '' && activeSection === 'search') {
      const term = searchTerm.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term));
    }
    return list;
  }, [activeSection, activeCategory, searchTerm, wishlist]);

  const addToCart = (product: Product) => {
    if (!user) { setIsAuthOpen(true); return; }
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const toggleWishlist = (id: string) => {
    if (!user) { setIsAuthOpen(true); return; }
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCart([]);
    setWishlist([]);
    setActiveSection('market');
  };

  // Fixed: removed unused orderData parameter to match the onSuccess signature of CheckoutModal
  const handleCheckoutSuccess = async () => {
    // In a real app, we would insert the order into Supabase here
    setCart([]);
    setIsCartOpen(false);
    setActiveSection('profile');
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
        <header className="absolute top-0 left-0 right-0 h-20 md:h-24 z-30 flex items-center justify-between pl-10 pr-6 md:pl-20 md:pr-12 pointer-events-none transition-all duration-500">
          <div className={`flex items-center gap-2 pointer-events-auto cursor-pointer transition-all duration-500 ${activeSection !== 'market' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`} onClick={() => setActiveSection('market')}>
             <div className="md:hidden w-8 h-8 rounded bg-accent flex items-center justify-center font-orbitron font-black text-white text-lg">G</div>
             <span className="font-orbitron font-black text-sm md:text-lg tracking-tighter text-accent">GX <span className="hidden md:inline theme-text-primary">COMMERCE</span></span>
          </div>
          
          <div className="flex items-center gap-6 pointer-events-auto">
             {!user && (
               <button onClick={() => setIsAuthOpen(true)} className="hidden md:block bg-accent/10 border border-accent/30 px-6 py-2 rounded-sm theme-text-primary font-orbitron text-[10px] uppercase tracking-widest hover:bg-accent transition-all">Initialize Access</button>
             )}
             <div className="w-10 h-10 rounded-full border theme-border flex items-center justify-center theme-bg-primary/50 backdrop-blur-sm cursor-pointer hover:border-accent group" onClick={() => setIsCartOpen(true)}>
                <ShoppingBag size={18} className="theme-text-primary group-hover:text-accent" />
             </div>
          </div>
        </header>

        {activeSection === 'profile' ? (
          <Profile user={user} onLogout={handleLogout} onLoginClick={() => setIsAuthOpen(true)} onNavigateToSettings={() => setActiveSection('settings')} />
        ) : activeSection === 'trailers' ? (
          <Trailers />
        ) : activeSection === 'settings' ? (
          <Settings isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} accentColor={accentColor} onAccentColorChange={setAccentColor} rgbIntensity={rgbIntensity} onRgbIntensityChange={setRgbIntensity} />
        ) : activeSection === 'search' ? (
          <section className="container mx-auto px-4 md:px-8 py-24">
            <h2 className="text-4xl font-orbitron font-black mb-8">GLOBAL <span className="text-accent">SEARCH</span></h2>
            <input type="text" placeholder="Scan hardware database..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full theme-bg-secondary border theme-border py-4 px-6 mb-12" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(p => <ProductCard key={p.id} product={p} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} isWishlisted={wishlist.includes(p.id)} />)}
            </div>
          </section>
        ) : (
          /* Market View */
          <>
            <section className="relative h-[500px] flex items-center px-8">
              <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1920" className="absolute inset-0 w-full h-full object-cover opacity-20" />
              <div className="relative z-10 max-w-2xl">
                <h1 className="text-8xl font-orbitron font-black mb-6">BEYOND <span className="text-accent gx-glow">LIMITS.</span></h1>
                <p className="theme-text-secondary text-lg mb-8">Upgrade your setup with the world's most aggressive hardware.</p>
                <button onClick={() => document.getElementById('market-grid')?.scrollIntoView()} className="bg-accent px-8 py-4 font-orbitron font-bold">BROWSE GEAR</button>
              </div>
            </section>
            <div id="market-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
              {filteredProducts.map(p => <ProductCard key={p.id} product={p} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} isWishlisted={wishlist.includes(p.id)} />)}
            </div>
          </>
        )}
      </main>

      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} availableProducts={PRODUCTS} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLogin={() => {}} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} cart={cart} total={cartTotal} onSuccess={handleCheckoutSuccess} />
    </div>
  );
};

export default App;
