
import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Info, Palette, Eye, Lock, Globe, Cpu } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'appearance' | 'privacy' | 'about'>('appearance');

  const TabButton = ({ id, icon: Icon, label }: { id: any, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-6 py-4 border-b-2 font-orbitron text-xs tracking-widest uppercase transition-all ${
        activeTab === id 
          ? 'border-[#fa1e4e] text-[#fa1e4e] bg-[#fa1e4e]/5' 
          : 'border-transparent text-gray-500 hover:text-white'
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );

  return (
    <section className="container mx-auto px-8 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12">
        <h2 className="text-4xl font-orbitron font-black mb-2 flex items-center gap-4">
          <SettingsIcon size={32} className="text-[#fa1e4e]" />
          SYSTEM <span className="text-[#fa1e4e]">CONFIG</span>
        </h2>
        <p className="text-gray-500 font-orbitron text-xs tracking-widest uppercase">Manage hardware interface and legal protocols</p>
      </div>

      <div className="bg-[#161618] border border-gray-800 flex flex-col min-h-[600px]">
        {/* Settings Navigation */}
        <div className="flex border-b border-gray-800 overflow-x-auto no-scrollbar">
          <TabButton id="appearance" icon={Palette} label="Appearance" />
          <TabButton id="privacy" icon={Shield} label="Privacy Policy" />
          <TabButton id="about" icon={Info} label="About" />
        </div>

        {/* Settings Content */}
        <div className="p-8 flex-1">
          {activeTab === 'appearance' && (
            <div className="space-y-10 animate-in fade-in duration-500">
              <div>
                <h3 className="text-white font-orbitron font-bold mb-6 flex items-center gap-2">
                  <Eye size={18} className="text-[#fa1e4e]" />
                  VISUAL INTERFACE
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#0b0b0d] p-6 border border-gray-800 rounded-sm">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-400 text-sm font-orbitron">DARK MODE</span>
                      <div className="w-12 h-6 bg-[#fa1e4e] rounded-full relative p-1 cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </div>
                    </div>
                    <p className="text-gray-600 text-[10px] uppercase">Forced GX Dark Protocol is active and cannot be disabled in high-performance mode.</p>
                  </div>
                  <div className="bg-[#0b0b0d] p-6 border border-gray-800 rounded-sm">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-400 text-sm font-orbitron">RGB INTENSITY</span>
                    </div>
                    <input type="range" className="w-full accent-[#fa1e4e] bg-gray-800" defaultValue="80" />
                    <div className="flex justify-between mt-2 text-[10px] font-orbitron text-gray-600">
                      <span>STEALTH</span>
                      <span>MAX GLOW</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white font-orbitron font-bold mb-6">ACCENT COLOR</h3>
                <div className="flex gap-4">
                  {['#fa1e4e', '#00ffcc', '#9d00ff', '#ffee00'].map(color => (
                    <button 
                      key={color}
                      style={{ backgroundColor: color }}
                      className={`w-10 h-10 rounded-sm border-2 ${color === '#fa1e4e' ? 'border-white' : 'border-transparent hover:scale-110 transition-transform'}`}
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
                <p className="text-xs text-blue-200 font-orbitron uppercase leading-relaxed">
                  Encryption Layer 7 active. Your connection is protected by GX Secure-Net.
                </p>
              </div>
              
              <div className="prose prose-invert prose-sm">
                <h4 className="text-[#fa1e4e] font-orbitron uppercase">1. Data Collection</h4>
                <p className="text-gray-400 leading-relaxed">
                  We collect telemetry data including hardware specs, browser performance, and peripheral interactions to optimize your shopping experience. We do not sell your soul to mega-corps.
                </p>
                
                <h4 className="text-[#fa1e4e] font-orbitron uppercase">2. Security Protocols</h4>
                <p className="text-gray-400 leading-relaxed">
                  All transactions are processed through an isolated vault. Credit details are never stored on local terminals. 
                </p>

                <h4 className="text-[#fa1e4e] font-orbitron uppercase">3. Cookies</h4>
                <p className="text-gray-400 leading-relaxed">
                  We use essential cookies to keep your mission log active and maintain your wishlist targets.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="max-w-3xl space-y-8 animate-in fade-in duration-500">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#fa1e4e] to-[#ff4e7e] blur opacity-25" />
                <div className="relative bg-[#0b0b0d] p-8 border border-gray-800">
                  <h3 className="text-2xl font-orbitron font-black text-white mb-4">GX COMMERCE v2.5.0</h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    GX Commerce is a high-performance shopping hub designed for the modern hardware enthusiast. Born from the need for speed and aggressive aesthetics, we provide the ultimate platform for acquiring elite gaming components.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-[#fa1e4e] font-orbitron font-bold text-xl mb-1">99.9%</div>
                      <div className="text-gray-600 text-[10px] uppercase font-orbitron">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#fa1e4e] font-orbitron font-bold text-xl mb-1">10ms</div>
                      <div className="text-gray-600 text-[10px] uppercase font-orbitron">Latency</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#fa1e4e] font-orbitron font-bold text-xl mb-1">1M+</div>
                      <div className="text-gray-600 text-[10px] uppercase font-orbitron">Users</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#1a1a1c] border border-gray-800 flex items-center gap-4">
                  <Globe className="text-[#fa1e4e]" />
                  <div>
                    <div className="text-white text-xs font-orbitron font-bold uppercase">Headquarters</div>
                    <div className="text-gray-500 text-[10px]">Cyber-Hub, Nairobi</div>
                  </div>
                </div>
                <div className="p-4 bg-[#1a1a1c] border border-gray-800 flex items-center gap-4">
                  <Cpu className="text-[#fa1e4e]" />
                  <div>
                    <div className="text-white text-xs font-orbitron font-bold uppercase">Engine</div>
                    <div className="text-gray-500 text-[10px]">GX-Nexus Core</div>
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
