
import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Info, Palette, Eye, Lock, Globe, Cpu, Moon, Sun, Activity, Zap } from 'lucide-react';

interface SettingsProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  accentColor: string;
  onAccentColorChange: (color: string) => void;
  rgbIntensity: number;
  onRgbIntensityChange: (intensity: number) => void;
}

const Settings: React.FC<SettingsProps> = ({ 
  isDarkMode, 
  onToggleTheme, 
  accentColor, 
  onAccentColorChange, 
  rgbIntensity, 
  onRgbIntensityChange 
}) => {
  const [activeTab, setActiveTab] = useState<'appearance' | 'privacy' | 'about'>('appearance');

  const TabButton = ({ id, icon: Icon, label }: { id: any, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-6 py-4 border-b-2 font-orbitron text-[10px] md:text-xs tracking-widest uppercase transition-all whitespace-nowrap ${
        activeTab === id 
          ? 'border-accent text-accent theme-bg-tertiary/10' 
          : 'border-transparent theme-text-secondary hover:theme-text-primary'
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );

  const ACCENT_COLORS = [
    { name: 'Classic Red', hex: '#fa1e4e' },
    { name: 'Neon Cyan', hex: '#00ffcc' },
    { name: 'Royal Purple', hex: '#9d00ff' },
    { name: 'Cyber Yellow', hex: '#ffee00' },
    { name: 'Ghost White', hex: '#ffffff' }
  ];

  return (
    <section className="container mx-auto px-4 md:px-8 py-8 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-orbitron font-black mb-2 flex items-center gap-4 theme-text-primary">
          <SettingsIcon size={28} className="text-accent" />
          SYSTEM <span className="text-accent">CONFIG</span>
        </h2>
        <p className="theme-text-secondary font-orbitron text-[10px] md:text-xs tracking-widest uppercase">Manage hardware interface and legal protocols</p>
      </div>

      <div className="theme-bg-secondary border theme-border flex flex-col min-h-[500px] md:min-h-[600px] shadow-xl overflow-hidden relative">
        {/* Settings Navigation */}
        <div className="flex border-b theme-border overflow-x-auto no-scrollbar scroll-smooth bg-black/20">
          <TabButton id="appearance" icon={Palette} label="Appearance" />
          <TabButton id="privacy" icon={Shield} label="Privacy Policy" />
          <TabButton id="about" icon={Info} label="About" />
        </div>

        {/* Settings Content */}
        <div className="p-4 md:p-8 flex-1">
          {activeTab === 'appearance' && (
            <div className="space-y-8 md:space-y-12 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Visual Controls */}
                <div className="lg:col-span-7 space-y-10">
                  <div>
                    <h3 className="theme-text-primary font-orbitron font-bold mb-6 flex items-center gap-2 text-sm md:text-base">
                      <Eye size={18} className="text-accent" />
                      RGB_CALIBRATION
                    </h3>
                    
                    <div className="space-y-8">
                      <div className="theme-bg-primary p-6 border theme-border rounded-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 opacity-5">
                          <Activity size={100} className="text-accent" />
                        </div>
                        <div className="flex justify-between items-center mb-6">
                          <div className="flex items-center gap-3">
                            <Zap size={18} className="text-accent gx-pulse" />
                            <span className="theme-text-primary text-xs font-orbitron uppercase tracking-widest">
                              PHOTON_INTENSITY
                            </span>
                          </div>
                          <span className="text-accent font-orbitron font-black text-sm">{Math.round(rgbIntensity * 100)}%</span>
                        </div>
                        
                        <div className="relative h-8 flex items-center">
                          <input 
                            type="range" 
                            min="0"
                            max="1"
                            step="0.01"
                            value={rgbIntensity}
                            onChange={(e) => onRgbIntensityChange(parseFloat(e.target.value))}
                            className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-accent" 
                          />
                        </div>
                        
                        <div className="flex justify-between mt-4 text-[9px] font-orbitron theme-text-secondary tracking-widest">
                          <span className={rgbIntensity < 0.2 ? 'text-accent' : ''}>STEALTH_MODE</span>
                          <span className={rgbIntensity > 0.8 ? 'text-accent' : ''}>OVERDRIVE</span>
                        </div>
                      </div>

                      <div className="theme-bg-primary p-6 border theme-border rounded-sm">
                        <h4 className="theme-text-primary font-orbitron font-bold mb-6 text-xs tracking-widest uppercase">CHROMA_SYNC_COLOR</h4>
                        <div className="flex flex-wrap gap-4">
                          {ACCENT_COLORS.map(color => (
                            <button 
                              key={color.hex}
                              onClick={() => onAccentColorChange(color.hex)}
                              style={{ backgroundColor: color.hex, boxShadow: accentColor === color.hex ? `0 0 ${20 * rgbIntensity}px ${color.hex}` : 'none' }}
                              className={`w-12 h-12 rounded-sm border-2 transition-all ${
                                accentColor === color.hex 
                                  ? 'border-white scale-110 z-10' 
                                  : 'border-transparent opacity-40 hover:opacity-100 hover:scale-105'
                              }`}
                            />
                          ))}
                          <div className="relative w-12 h-12">
                            <input 
                              type="color" 
                              value={accentColor}
                              onChange={(e) => onAccentColorChange(e.target.value)}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="w-full h-full rounded-sm border-2 border-dashed border-gray-600 flex items-center justify-center theme-text-secondary hover:border-accent transition-colors">
                              <span className="text-lg">+</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="theme-text-primary font-orbitron font-bold mb-6 flex items-center gap-2 text-sm md:text-base">
                      <Moon size={18} className="text-accent" />
                      INTERFACE_THEME
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => !isDarkMode && onToggleTheme()}
                        className={`p-6 border flex flex-col items-center gap-3 transition-all ${isDarkMode ? 'border-accent bg-accent/5' : 'theme-border opacity-50 hover:opacity-100'}`}
                      >
                        <Moon size={24} className={isDarkMode ? 'text-accent' : ''} />
                        <span className="font-orbitron text-[10px] tracking-widest uppercase">Dark_Net</span>
                      </button>
                      <button 
                        onClick={() => isDarkMode && onToggleTheme()}
                        className={`p-6 border flex flex-col items-center gap-3 transition-all ${!isDarkMode ? 'border-accent bg-accent/5' : 'theme-border opacity-50 hover:opacity-100'}`}
                      >
                        <Sun size={24} className={!isDarkMode ? 'text-accent' : ''} />
                        <span className="font-orbitron text-[10px] tracking-widest uppercase">Day_Sight</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Live Preview Area */}
                <div className="lg:col-span-5">
                  <div className="sticky top-8">
                    <h3 className="theme-text-primary font-orbitron font-bold mb-6 text-xs tracking-widest uppercase text-center">LIVE_PREVIEW_ANALYSIS</h3>
                    <div className="theme-bg-primary border theme-border aspect-square rounded-sm p-8 flex flex-col items-center justify-center relative overflow-hidden group">
                      {/* Decorative grid */}
                      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--accent-color) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                      
                      {/* Glowing Sample Component */}
                      <div className="relative z-10 w-48 h-48 flex items-center justify-center">
                        <div 
                          className="absolute inset-0 rounded-full border-4 border-accent opacity-20"
                          style={{ boxShadow: `0 0 ${60 * rgbIntensity}px ${accentColor}`, opacity: 0.1 + (0.5 * rgbIntensity) }}
                        />
                        <div className="absolute inset-4 rounded-full border-2 border-dashed border-accent/30 animate-[spin_10s_linear_infinite]" />
                        <Cpu 
                          size={80} 
                          className="text-accent relative z-20 transition-all duration-500"
                          style={{ 
                            filter: `drop-shadow(0 0 ${15 * rgbIntensity}px ${accentColor})`,
                            transform: `scale(${1 + (0.1 * rgbIntensity)})`
                          }} 
                        />
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-32 h-1 bg-accent/20">
                          <div className="h-full bg-accent gx-pulse" style={{ width: `${rgbIntensity * 100}%` }} />
                        </div>
                      </div>

                      <div className="mt-20 text-center space-y-2">
                         <div className="text-accent font-orbitron font-black text-xl tracking-tighter uppercase">CORE_STABILITY</div>
                         <div className="theme-text-secondary font-mono text-[9px] uppercase tracking-widest">
                           {rgbIntensity > 0.8 ? 'WARNING: HIGH THERMAL OUTPUT' : 'STATUS: NOMINAL OPERATION'}
                         </div>
                      </div>
                    </div>
                  </div>
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
                <h4 className="text-accent font-orbitron uppercase mb-2 text-sm">1. Data Collection</h4>
                <p className="theme-text-secondary leading-relaxed mb-6 text-xs md:text-sm">
                  We collect telemetry data including hardware specs and performance to optimize your shopping experience.
                </p>
                
                <h4 className="text-accent font-orbitron uppercase mb-2 text-sm">2. Security Protocols</h4>
                <p className="theme-text-secondary leading-relaxed mb-6 text-xs md:text-sm">
                  All transactions are processed through an isolated vault. Credit details are never stored locally. 
                </p>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="max-w-3xl space-y-6 md:space-y-8 animate-in fade-in duration-500">
              <div className="relative">
                <div className="absolute -inset-1 bg-accent blur opacity-25" />
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
                        <div className="text-accent font-orbitron font-bold text-lg md:text-xl mb-1">{stat.val}</div>
                        <div className="theme-text-secondary text-[10px] uppercase font-orbitron">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 theme-bg-tertiary border theme-border flex items-center gap-4">
                  <Globe className="text-accent shrink-0" />
                  <div>
                    <div className="theme-text-primary text-[10px] md:text-xs font-orbitron font-bold uppercase">Headquarters</div>
                    <div className="theme-text-secondary text-[10px]">Cyber-Hub, Nairobi</div>
                  </div>
                </div>
                <div className="p-4 theme-bg-tertiary border theme-border flex items-center gap-4">
                  <Cpu className="text-accent shrink-0" />
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
