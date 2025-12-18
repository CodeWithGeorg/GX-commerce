
import React from 'react';
import { User, Shield, Zap, Package, Award, Settings, LogOut, Lock, LogIn } from 'lucide-react';

interface ProfileProps {
  user: { name: string } | null;
  onLogout: () => void;
  onLoginClick: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout, onLoginClick }) => {
  const mockOrders = [
    { id: 'GX-9281', date: '2025-05-12', total: 410000, status: 'Delivered' },
    { id: 'GX-8822', date: '2025-04-28', total: 15800, status: 'Processing' },
  ];

  if (!user) {
    return (
      <section className="container mx-auto px-8 py-24 md:py-32 flex items-center justify-center min-h-[70vh] animate-in fade-in duration-500">
        <div className="max-w-md w-full theme-bg-secondary border theme-border p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#fa1e4e]/20" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#fa1e4e]/20" />
          
          <div className="w-20 h-20 bg-[#fa1e4e]/10 border border-[#fa1e4e]/30 rounded-full flex items-center justify-center mx-auto mb-8">
            <Lock size={32} className="text-[#fa1e4e]" />
          </div>
          
          <h2 className="text-3xl font-orbitron font-black theme-text-primary mb-4">ACCESS_DENIED</h2>
          <p className="theme-text-secondary text-sm font-orbitron uppercase tracking-widest leading-relaxed mb-10">
            Profile encryption is active. Please initialize session access to view mission logs and tech rewards.
          </p>
          
          <button 
            onClick={onLoginClick}
            className="w-full bg-[#fa1e4e] hover:bg-[#ff4e7e] text-white font-orbitron font-bold py-4 rounded-sm transition-all flex items-center justify-center gap-3 shadow-lg"
          >
            <LogIn size={20} /> INITIALIZE_UPLINK
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-8 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: User Summary */}
        <div className="lg:col-span-1 space-y-8">
          <div className="theme-bg-secondary border theme-border p-8 relative overflow-hidden group shadow-lg">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Shield size={120} className="text-[#fa1e4e]" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full border-4 border-[#fa1e4e] p-1 mb-6 shadow-[0_0_20px_rgba(250,30,78,0.3)] overflow-hidden">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                  alt="Avatar" 
                  className="w-full h-full rounded-full theme-bg-primary"
                />
              </div>
              <h2 className="text-2xl font-orbitron font-black theme-text-primary mb-1 uppercase">{user.name}</h2>
              <span className="text-[#fa1e4e] font-orbitron text-[10px] tracking-widest uppercase mb-6">Elite Tech Specialist</span>
              
              <div className="w-full theme-bg-primary h-2 rounded-full mb-2 overflow-hidden border theme-border">
                <div className="bg-[#fa1e4e] h-full w-[75%] shadow-[0_0_10px_#fa1e4e]" />
              </div>
              <div className="flex justify-between w-full text-[10px] font-orbitron theme-text-secondary uppercase">
                <span>Level 42</span>
                <span>Next Rank: Commander</span>
              </div>
            </div>
          </div>

          <div className="theme-bg-secondary border theme-border p-6 shadow-md">
            <h3 className="theme-text-primary font-orbitron font-bold text-sm mb-6 flex items-center gap-2">
              <Award size={18} className="text-[#fa1e4e]" />
              GX REWARDS
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center theme-bg-primary p-4 rounded-sm border theme-border">
                <span className="theme-text-secondary text-xs font-orbitron">TOTAL CREDITS</span>
                <span className="theme-text-primary font-orbitron font-bold">12,450 XP</span>
              </div>
              <button className="w-full py-3 theme-bg-tertiary hover:bg-[#fa1e4e] hover:text-white theme-text-primary text-xs font-orbitron font-bold transition-all rounded-sm border theme-border">
                REDEEM GEAR
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Activity */}
        <div className="lg:col-span-2 space-y-8">
          <div className="theme-bg-secondary border theme-border p-8 shadow-lg">
            <h3 className="text-xl font-orbitron font-black theme-text-primary mb-8 flex items-center gap-3">
              <Package size={24} className="text-[#fa1e4e]" />
              MISSION LOG <span className="theme-text-secondary">/ ORDERS</span>
            </h3>
            
            <div className="space-y-4">
              {mockOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between p-6 theme-bg-primary border theme-border hover:border-[#fa1e4e]/50 transition-colors group">
                  <div className="flex gap-6 items-center">
                    <div className="w-12 h-12 theme-bg-tertiary flex items-center justify-center border theme-border group-hover:border-[#fa1e4e] transition-colors">
                      <Zap size={20} className="theme-text-secondary group-hover:text-[#fa1e4e]" />
                    </div>
                    <div>
                      <p className="theme-text-primary font-orbitron font-bold text-sm">{order.id}</p>
                      <p className="theme-text-secondary text-[10px] uppercase font-orbitron">{order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="theme-text-primary font-orbitron font-bold">KSh {order.total.toLocaleString()}</p>
                    <span className={`text-[10px] uppercase font-orbitron px-2 py-1 rounded-sm ${
                      order.status === 'Delivered' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="theme-bg-secondary border theme-border p-8 hover:border-[#fa1e4e] transition-all cursor-pointer group shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <Settings className="text-[#fa1e4e] group-hover:rotate-45 transition-transform" />
                <h4 className="theme-text-primary font-orbitron font-bold uppercase text-sm">GRID SETTINGS</h4>
              </div>
              <p className="theme-text-secondary text-xs">Configure your hardware interface and security protocols.</p>
            </div>
            <div 
              onClick={onLogout}
              className="theme-bg-secondary border theme-border p-8 hover:border-red-500 transition-all cursor-pointer group shadow-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <LogOut className="text-red-500 group-hover:-translate-x-1 transition-transform" />
                <h4 className="theme-text-primary font-orbitron font-bold uppercase text-sm">TERMINATE SESSION</h4>
              </div>
              <p className="theme-text-secondary text-xs">Safely logout and clear local cache buffers.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Profile;
