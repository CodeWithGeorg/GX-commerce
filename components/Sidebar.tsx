
import React from 'react';
import { ShoppingCart, LayoutGrid, Heart, Search, MessageSquare, Settings, User, Play, LogIn } from 'lucide-react';

interface SidebarProps {
  onToggleCart: () => void;
  onToggleChat: () => void;
  activeSection: string;
  setActiveSection: (s: string) => void;
  isLoggedIn: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggleCart, onToggleChat, activeSection, setActiveSection, isLoggedIn }) => {
  const NavItem = ({ icon: Icon, label, id, onClick }: { icon: any, label: string, id?: string, onClick?: () => void }) => (
    <button 
      onClick={onClick || (() => id && setActiveSection(id))}
      className={`group relative flex items-center justify-center flex-1 md:flex-none w-full md:w-12 h-full md:h-12 transition-all duration-300 ${
        activeSection === id ? 'text-[#fa1e4e]' : 'theme-text-secondary hover:theme-text-primary'
      }`}
    >
      <Icon size={20} className="relative z-10 md:w-[22px]" />
      {activeSection === id && (
        <div className="absolute bottom-0 md:bottom-auto md:left-0 left-1/4 right-1/4 md:right-auto md:top-1/4 md:bottom-1/4 h-0.5 md:h-auto md:w-1 bg-[#fa1e4e] rounded-t-full md:rounded-r-full shadow-[0_0_10px_#fa1e4e]" />
      )}
      <div className="hidden md:block absolute left-14 px-2 py-1 theme-bg-tertiary border theme-border rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg font-orbitron uppercase tracking-widest text-[9px]">
        {label}
      </div>
    </button>
  );

  return (
    <aside className="fixed bottom-0 md:bottom-auto left-0 md:top-0 h-16 md:h-screen w-full md:w-14 theme-bg-primary border-t md:border-t-0 md:border-r theme-border flex flex-row md:flex-col items-center px-2 md:px-0 md:py-6 z-50">
      {/* Logo - Desktop Only */}
      <div className="hidden md:block mb-10 cursor-pointer" onClick={() => setActiveSection('market')}>
        <div className="w-8 h-8 rounded bg-gradient-to-br from-[#fa1e4e] to-[#ff4e7e] flex items-center justify-center font-orbitron font-black text-white text-lg shadow-[0_0_15px_rgba(250,30,78,0.4)]">
          G
        </div>
      </div>

      {/* Navigation Container */}
      <div className="flex flex-row md:flex-col gap-1 md:gap-4 flex-1 w-full h-full items-center">
        {/* Top Section Items */}
        <NavItem icon={LayoutGrid} label="Market" id="market" />
        <NavItem icon={Search} label="Search" id="search" />
        <NavItem icon={Play} label="Trailers" id="trailers" />
        <NavItem icon={Heart} label="Wishlist" id="wishlist" />
        <NavItem icon={MessageSquare} label="AI Specialist" onClick={onToggleChat} />

        {/* Dynamic Spacer */}
        <div className="hidden md:block flex-1 w-full" />

        {/* Bottom Section Items */}
        <NavItem icon={ShoppingCart} label="Cart" onClick={onToggleCart} />
        <NavItem 
          icon={isLoggedIn ? User : LogIn} 
          label={isLoggedIn ? "Profile" : "Login"} 
          id="profile" 
        />
        <NavItem icon={Settings} label="Settings" id="settings" />
      </div>
    </aside>
  );
};

export default Sidebar;
