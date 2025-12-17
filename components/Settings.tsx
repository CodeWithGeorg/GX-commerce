
import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Info, Palette, Eye, Lock, Globe, Cpu, Moon, Sun } from 'lucide-react';

interface SettingsProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isDarkMode, onToggleTheme }) => {
  const [activeTab, setActiveTab] = useState<'appearance' | 'privacy' | 'about'>('appearance');

  const TabButton = ({ id, icon: Icon, label }: { id: any, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-6 py-4 border-b-2 font-orbitron text-[10px] md:text-xs tracking-widest uppercase transition-all whitespace-nowrap ${
        activeTab === id 
          ? 'border-[#fa1e4e] text-[#fa1e4e] theme-bg-tertiary/10' 
          : 'border-transparent theme-text-secondary hover:theme-text-primary'
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );

  return (
    <section className="container mx-auto px-4 md:px-8 py-8 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-orbitron font-black mb-2 flex items-center gap-4 theme-text-primary">
          <SettingsIcon size={28} className="text-[#fa1e4e]" />
          SYSTEM <span className="text-[#fa1e4e]">CONFIG</span>
        </h2>
        <p className="theme-text-secondary font-orbitron text-[10px] md:text-xs tracking-widest uppercase">Manage hardware interface and legal protocols</p>
      </div>

      <div className="theme-bg-secondary border theme-border flex flex-col min-h-[500px] md:min-h-[600px] shadow-xl overflow-hidden">
        {/* Settings Navigation */}
        <div className="flex border-b theme-border overflow-x-auto no-scrollbar scroll-smooth">
          <TabButton id="appearance" icon={Palette} label="Appearance" />
          <TabButton id="privacy" icon={Shield} label="Privacy Policy" />
          <TabButton id="about" icon={Info} label="About" />
        </div>

        {/* Settings Content */}
        <div className="p-4 md:p-8 flex-1">
          {activeTab === 'appearance' && (
            <div className="space-y-8 md:space-y-10 animate-in fade-in duration-500">
              <div>
                <h3 className="theme-text-primary font-orbitron font-bold mb-6 flex items-center gap-2 text-sm md:text-base">
                  <Eye size={18} className="text-[#fa1e4e]" />
                  VISUAL INTERFACE
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                  <div className="theme-bg-primary p-5 md:p-6 border theme-border rounded-sm">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        {isDarkMode ? <Moon size={18} className="text-[#fa1e4e]" /> : <Sun size={18} className="text-orange-400" />}
                        <span className="theme-text-primary text-xs md:text-sm font-orbitron uppercase tracking-widest">
                          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                        </span>
                      </div>
                      <button 
                        onClick={onToggleTheme}
                        className={`w-12 h-6 rounded-full relative p-1 transition-colors duration-300 shadow-inner ${
                          isDarkMode ? 'bg-[#fa1e4e]' : 'bg-gray-400'
                        }`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full shadow transition-all duration-300 transform ${
                          isDarkMode ? 'translate-x-6' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                    <p className="theme-text-secondary text-[10px] uppercase font-orbitron tracking-tight leading-relaxed">
                      {isDarkMode 
                        ? 'Forced GX Dark Protocol is currently powering your terminal.' 
                        : 'Light Mode Protocol active. Optical clarity increased for daytime operations.'}
                    </p>
                  </div>
                  
                  <div className="theme-bg-primary p-5 md:p-6 border theme-border rounded-sm">
                    <div className="flex justify-between items-center mb-4">
                      <span className="theme-text-primary text-xs md:text-sm font-orbitron tracking-widest uppercase">RGB INTENSITY</span>
                    </div>
                    <input type="range" className="w-full accent-[#fa1e4e] bg-gray-300 dark:bg-gray-800" defaultValue="80" />
                    <div className="flex justify-between mt-2 text-[10px] font-orbitron theme-text-secondary">
                      <span>STEALTH</span>
                      <span>MAX GLOW</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="theme-text-primary font-orbitron font-bold mb-6 tracking-widest uppercase text-sm md:text-base">ACCENT COLOR</h3>
                <div className="flex flex-wrap gap-4">
                  {['#fa1e4e', '#00ffcc', '#9d00ff', '#ffee00'].map(color => (
                    <button 
                      key={color}
                      style={{ backgroundColor: color }}
                      className={`w-10 h-10 rounded-sm border-2 transition-transform hover:scale-110 ${
                        color === '#fa1e4e' ? 'border-white dark:border-white shadow-lg' : 'border-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="max-w-3xl space-y-6 md:space-y-8 animate-in fade-in duration-500">
              <div className="flex items-center gap-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-sm">
                <Lock className="text-blue-500 shrink-0" size={24} />
                <p className="text-[10px] md:text-xs text-blue-600 dark:text-blue-200 font-orbitron uppercase leading-relaxed">
                  Encryption Layer 7 active. Your connection is protected by GX Secure-Net.
                </p>
              </div>
              
              <div className="prose prose-sm theme-text-primary max-w-none">
                <h4 className="text-[#fa1e4e] font-orbitron uppercase mb-2 text-sm">1. Data Collection</h4>
                <p className="theme-text-secondary leading-relaxed mb-6 text-xs md:text-sm">
                  We collect telemetry data including hardware specs and performance to optimize your shopping experience.
                </p>
                
                <h4 className="text-[#fa1e4e] font-orbitron uppercase mb-2 text-sm">2. Security Protocols</h4>
                <p className="theme-text-secondary leading-relaxed mb-6 text-xs md:text-sm">
                  All transactions are processed through an isolated vault. Credit details are never stored locally. 
                </p>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="max-w-3xl space-y-6 md:space-y-8 animate-in fade-in duration-500">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#fa1e4e] to-[#ff4e7e] blur opacity-25" />
                <div className="relative theme-bg-primary p-6 md:p-8 border theme-border">
                  <h3 className="text-xl md:text-2xl font-orbitron font-black theme-text-primary mb-4">GX COMMERCE v2.5.0</h3>
                  <p className="theme-text-secondary leading-relaxed mb-6 text-xs md:text-sm">
                    GX Commerce is a high-performance shopping hub designed for hardware enthusiasts. Born for speed and aggressive aesthetics.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                    {[
                      { val: '99.9%', label: 'Uptime' },
                      { val: '10ms', label: 'Latency' },
                      { val: '1M+', label: 'Users' }
                    ].map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-[#fa1e4e] font-orbitron font-bold text-lg md:text-xl mb-1">{stat.val}</div>
                        <div className="theme-text-secondary text-[10px] uppercase font-orbitron">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 theme-bg-tertiary border theme-border flex items-center gap-4">
                  <Globe className="text-[#fa1e4e] shrink-0" />
                  <div>
                    <div className="theme-text-primary text-[10px] md:text-xs font-orbitron font-bold uppercase">Headquarters</div>
                    <div className="theme-text-secondary text-[10px]">Cyber-Hub, Nairobi</div>
                  </div>
                </div>
                <div className="p-4 theme-bg-tertiary border theme-border flex items-center gap-4">
                  <Cpu className="text-[#fa1e4e] shrink-0" />
                  <div>
                    <div className="theme-text-primary text-[10px] md:text-xs font-orbitron font-bold uppercase">Engine</div>
                    <div className="theme-text-secondary text-[10px]">GX-Nexus Core</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Settings;
