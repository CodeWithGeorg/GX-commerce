
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
      className={`flex items-center gap-3 px-6 py-4 border-b-2 font-orbitron text-xs tracking-widest uppercase transition-all ${
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
    <section className="container mx-auto px-8 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12">
        <h2 className="text-4xl font-orbitron font-black mb-2 flex items-center gap-4 theme-text-primary">
          <SettingsIcon size={32} className="text-[#fa1e4e]" />
          SYSTEM <span className="text-[#fa1e4e]">CONFIG</span>
        </h2>
        <p className="theme-text-secondary font-orbitron text-xs tracking-widest uppercase">Manage hardware interface and legal protocols</p>
      </div>

      <div className="theme-bg-secondary border theme-border flex flex-col min-h-[600px] shadow-xl">
        {/* Settings Navigation */}
        <div className="flex border-b theme-border overflow-x-auto no-scrollbar">
          <TabButton id="appearance" icon={Palette} label="Appearance" />
          <TabButton id="privacy" icon={Shield} label="Privacy Policy" />
          <TabButton id="about" icon={Info} label="About" />
        </div>

        {/* Settings Content */}
        <div className="p-8 flex-1">
          {activeTab === 'appearance' && (
            <div className="space-y-10 animate-in fade-in duration-500">
              <div>
                <h3 className="theme-text-primary font-orbitron font-bold mb-6 flex items-center gap-2">
                  <Eye size={18} className="text-[#fa1e4e]" />
                  VISUAL INTERFACE
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="theme-bg-primary p-6 border theme-border rounded-sm">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        {isDarkMode ? <Moon size={18} className="text-[#fa1e4e]" /> : <Sun size={18} className="text-orange-400" />}
                        <span className="theme-text-primary text-sm font-orbitron uppercase tracking-widest">
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
                        ? 'Forced GX Dark Protocol is currently powering your terminal. Immersion at maximum.' 
                        : 'Light Mode Protocol active. Optical clarity increased for daytime operations.'}
                    </p>
                  </div>
                  
                  <div className="theme-bg-primary p-6 border theme-border rounded-sm">
                    <div className="flex justify-between items-center mb-4">
                      <span className="theme-text-primary text-sm font-orbitron tracking-widest uppercase">RGB INTENSITY</span>
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
                <h3 className="theme-text-primary font-orbitron font-bold mb-6 tracking-widest uppercase">ACCENT COLOR</h3>
                <div className="flex gap-4">
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
            <div className="max-w-3xl space-y-8 animate-in fade-in duration-500">
              <div className="flex items-center gap-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-sm">
                <Lock className="text-blue-500" size={24} />
                <p className="text-xs text-blue-600 dark:text-blue-200 font-orbitron uppercase leading-relaxed">
                  Encryption Layer 7 active. Your connection is protected by GX Secure-Net.
                </p>
              </div>
              
              <div className="prose prose-sm theme-text-primary">
                <h4 className="text-[#fa1e4e] font-orbitron uppercase mb-2">1. Data Collection</h4>
                <p className="theme-text-secondary leading-relaxed mb-6">
                  We collect telemetry data including hardware specs, browser performance, and peripheral interactions to optimize your shopping experience. We do not sell your soul to mega-corps.
                </p>
                
                <h4 className="text-[#fa1e4e] font-orbitron uppercase mb-2">2. Security Protocols</h4>
                <p className="theme-text-secondary leading-relaxed mb-6">
                  All transactions are processed through an isolated vault. Credit details are never stored on local terminals. 
                </p>

                <h4 className="text-[#fa1e4e] font-orbitron uppercase mb-2">3. Cookies</h4>
                <p className="theme-text-secondary leading-relaxed">
                  We use essential cookies to keep your mission log active and maintain your wishlist targets.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="max-w-3xl space-y-8 animate-in fade-in duration-500">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#fa1e4e] to-[#ff4e7e] blur opacity-25" />
                <div className="relative theme-bg-primary p-8 border theme-border">
                  <h3 className="text-2xl font-orbitron font-black theme-text-primary mb-4">GX COMMERCE v2.5.0</h3>
                  <p className="theme-text-secondary leading-relaxed mb-6">
                    GX Commerce is a high-performance shopping hub designed for the modern hardware enthusiast. Born from the need for speed and aggressive aesthetics, we provide the ultimate platform for acquiring elite gaming components.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {[
                      { val: '99.9%', label: 'Uptime' },
                      { val: '10ms', label: 'Latency' },
                      { val: '1M+', label: 'Users' }
                    ].map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-[#fa1e4e] font-orbitron font-bold text-xl mb-1">{stat.val}</div>
                        <div className="theme-text-secondary text-[10px] uppercase font-orbitron">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 theme-bg-tertiary border theme-border flex items-center gap-4">
                  <Globe className="text-[#fa1e4e]" />
                  <div>
                    <div className="theme-text-primary text-xs font-orbitron font-bold uppercase">Headquarters</div>
                    <div className="theme-text-secondary text-[10px]">Cyber-Hub, Nairobi</div>
                  </div>
                </div>
                <div className="p-4 theme-bg-tertiary border theme-border flex items-center gap-4">
                  <Cpu className="text-[#fa1e4e]" />
                  <div>
                    <div className="theme-text-primary text-xs font-orbitron font-bold uppercase">Engine</div>
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
