
import React from 'react';
import { User, Shield, Zap, Package, Award, Settings, LogOut } from 'lucide-react';

const Profile: React.FC = () => {
  const mockOrders = [
    { id: 'GX-9281', date: '2024-05-12', total: 410000, status: 'Delivered' },
    { id: 'GX-8822', date: '2024-04-28', total: 15800, status: 'Processing' },
  ];

  return (
    <section className="container mx-auto px-8 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: User Summary */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-[#161618] border border-gray-800 p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Shield size={120} className="text-[#fa1e4e]" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full border-4 border-[#fa1e4e] p-1 mb-6 shadow-[0_0_20px_rgba(250,30,78,0.3)]">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=GXGamer" 
                  alt="Avatar" 
                  className="w-full h-full rounded-full bg-[#0b0b0d]"
                />
              </div>
              <h2 className="text-2xl font-orbitron font-black text-white mb-1">VANGUARD_01</h2>
              <span className="text-[#fa1e4e] font-orbitron text-[10px] tracking-widest uppercase mb-6">Elite Tech Specialist</span>
              
              <div className="w-full bg-[#0b0b0d] h-2 rounded-full mb-2 overflow-hidden">
                <div className="bg-[#fa1e4e] h-full w-[75%] shadow-[0_0_10px_#fa1e4e]" />
              </div>
              <div className="flex justify-between w-full text-[10px] font-orbitron text-gray-500 uppercase">
                <span>Level 42</span>
                <span>Next Rank: Commander</span>
              </div>
            </div>
          </div>

          <div className="bg-[#161618] border border-gray-800 p-6">
            <h3 className="text-white font-orbitron font-bold text-sm mb-6 flex items-center gap-2">
              <Award size={18} className="text-[#fa1e4e]" />
              GX REWARDS
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-[#0b0b0d] p-4 rounded-sm border border-gray-800">
                <span className="text-gray-400 text-xs font-orbitron">TOTAL CREDITS</span>
                <span className="text-white font-orbitron font-bold">12,450 XP</span>
              </div>
              <button className="w-full py-3 bg-[#252528] hover:bg-[#fa1e4e] text-white text-xs font-orbitron font-bold transition-all rounded-sm">
                REDEEM GEAR
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Activity */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#161618] border border-gray-800 p-8">
            <h3 className="text-xl font-orbitron font-black text-white mb-8 flex items-center gap-3">
              <Package size={24} className="text-[#fa1e4e]" />
              MISSION LOG <span className="text-gray-600">/ ORDERS</span>
            </h3>
            
            <div className="space-y-4">
              {mockOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between p-6 bg-[#0b0b0d] border border-gray-800 hover:border-[#fa1e4e]/50 transition-colors group">
                  <div className="flex gap-6 items-center">
                    <div className="w-12 h-12 bg-[#1a1a1c] flex items-center justify-center border border-gray-800 group-hover:border-[#fa1e4e] transition-colors">
                      <Zap size={20} className="text-gray-500 group-hover:text-[#fa1e4e]" />
                    </div>
                    <div>
                      <p className="text-white font-orbitron font-bold text-sm">{order.id}</p>
                      <p className="text-gray-500 text-[10px] uppercase font-orbitron">{order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-orbitron font-bold">KSh {order.total.toLocaleString()}</p>
                    <span className={`text-[10px] uppercase font-orbitron px-2 py-1 rounded-sm ${
                      order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#161618] border border-gray-800 p-8 hover:border-[#fa1e4e] transition-all cursor-pointer group">
              <div className="flex items-center gap-4 mb-4">
                <Settings className="text-[#fa1e4e] group-hover:rotate-45 transition-transform" />
                <h4 className="text-white font-orbitron font-bold">GRID SETTINGS</h4>
              </div>
              <p className="text-gray-500 text-xs">Configure your hardware interface and security protocols.</p>
            </div>
            <div className="bg-[#161618] border border-gray-800 p-8 hover:border-red-500 transition-all cursor-pointer group">
              <div className="flex items-center gap-4 mb-4">
                <LogOut className="text-red-500 group-hover:-translate-x-1 transition-transform" />
                <h4 className="text-white font-orbitron font-bold">TERMINATE SESSION</h4>
              </div>
              <p className="text-gray-500 text-xs">Safely logout and clear local cache buffers.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Profile;
