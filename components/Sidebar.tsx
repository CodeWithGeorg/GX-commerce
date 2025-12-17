
import React from 'react';
import { ShoppingCart, LayoutGrid, Heart, Search, MessageSquare, Settings, User, Play } from 'lucide-react';

interface SidebarProps {
  onToggleCart: () => void;
  onToggleChat: () => void;
  activeSection: string;
  setActiveSection: (s: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggleCart, onToggleChat, activeSection, setActiveSection }) => {
  const NavItem = ({ icon: Icon, label, id, onClick }: { icon: any, label: string, id?: string, onClick?: () => void }) => (
    <button 
      onClick={onClick || (() => id && setActiveSection(id))}
      className={`group relative flex items-center justify-center w-12 h-12 transition-all duration-300 ${
        activeSection === id ? 'text-[#fa1e4e]' : 'text-gray-400 hover:text-white'
      }`}
    >
      <Icon size={22} className="relative z-10" />
      {activeSection === id && (
        <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[#fa1e4e] rounded-r-full shadow-[0_0_10px_#fa1e4e]" />
      )}
      <div className="absolute left-14 px-2 py-1 bg-[#1a1a1c] border border-gray-800 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
        {label}
      </div>
    </button>
  );

  return (
    <aside className="fixed left-0 top-0 h-screen w-14 bg-[#0b0b0d] border-r border-gray-800 flex flex-col items-center py-6 z-50">
      <div className="mb-10 cursor-pointer" onClick={() => setActiveSection('market')}>
        <div className="w-8 h-8 rounded bg-gradient-to-br from-[#fa1e4e] to-[#ff4e7e] flex items-center justify-center font-orbitron font-black text-white text-lg">
          G
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        <NavItem icon={LayoutGrid} label="Market" id="market" />
        <NavItem icon={Search} label="Search" id="search" />
        <NavItem icon={Play} label="Trailers" id="trailers" />
        <NavItem icon={Heart} label="Wishlist" id="wishlist" />
        <NavItem icon={MessageSquare} label="AI Specialist" onClick={onToggleChat} />
      </div>

      <div className="flex flex-col gap-4">
        <NavItem icon={ShoppingCart} label="Cart Control" onClick={onToggleCart} />
        <NavItem icon={User} label="Profile" id="profile" />
        <NavItem icon={Settings} label="Settings" id="settings" />
      </div>
    </aside>
  );
};

export default Sidebar;
