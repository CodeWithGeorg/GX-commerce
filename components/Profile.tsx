
import React, { useState, useEffect } from 'react';
import { User, Shield, Zap, Package, Award, Settings, LogOut, Lock, LogIn, ChevronRight, X, Gift, Sparkles, Cpu, Clock } from 'lucide-react';

interface ProfileProps {
  user: { name: string } | null;
  onLogout: () => void;
  onLoginClick: () => void;
  onNavigateToSettings: () => void;
}

interface Reward {
  id: string;
  name: string;
  cost: number;
  type: 'Digital' | 'Hardware';
  description: string;
  image: string;
}

const REWARDS: Reward[] = [
  {
    id: 'r1',
    name: 'Founder Series Skin',
    cost: 5000,
    type: 'Digital',
    description: 'Exclusive metallic red skin for your GX interface.',
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'r2',
    name: 'GX Neon Keycap Set',
    cost: 12000,
    type: 'Hardware',
    description: 'Custom PBT keycaps with translucent legends for max RGB.',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'r3',
    name: 'Tactical Desk Mat',
    cost: 8000,
    type: 'Hardware',
    description: 'Military-grade cordura surface for pixel-perfect tracking.',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=200'
  }
];

const Profile: React.FC<ProfileProps> = ({ user, onLogout, onLoginClick, onNavigateToSettings }) => {
  // Start new members with 0 XP or a small starter gift
  const [xpBalance, setXpBalance] = useState(0);
  const [orders, setOrders] = useState<any[]>([]);
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);
  const [redeemedIds, setRedeemedIds] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);

  // Initialize profile when user logs in
  useEffect(() => {
    if (user) {
      setIsInitializing(true);
      // Simulate database initialization for the "cool" factor
      const timer = setTimeout(() => setIsInitializing(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleClaimStarterBonus = () => {
    if (xpBalance === 0) {
      setXpBalance(1000);
      setSuccessMsg("STARTER_BONUS: +1000 XP ADDED");
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  const handleRedeem = (reward: Reward) => {
    if (xpBalance >= reward.cost && !redeemedIds.includes(reward.id)) {
      setXpBalance(prev => prev - reward.cost);
      setRedeemedIds(prev => [...prev, reward.id]);
      setSuccessMsg(`REDEEMED: ${reward.name.toUpperCase()}`);
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  if (!user) {
    return (
      <section className="container mx-auto px-8 py-24 md:py-32 flex items-center justify-center min-h-[70vh] animate-in fade-in duration-500">
        <div className="max-w-md w-full theme-bg-secondary border theme-border p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-accent/20" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-accent/20" />
          
          <div className="w-20 h-20 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center mx-auto mb-8">
            <Lock size={32} className="text-accent" />
          </div>
          
          <h2 className="text-3xl font-orbitron font-black theme-text-primary mb-4">ACCESS_DENIED</h2>
          <p className="theme-text-secondary text-sm font-orbitron uppercase tracking-widest leading-relaxed mb-10">
            Profile encryption is active. Please initialize session access to view mission logs and tech rewards.
          </p>
          
          <button 
            onClick={onLoginClick}
            className="w-full bg-accent hover:opacity-90 text-white font-orbitron font-bold py-4 rounded-sm transition-all flex items-center justify-center gap-3 shadow-lg"
          >
            <LogIn size={20} /> INITIALIZE_UPLINK
          </button>
        </div>
      </section>
    );
  }

  if (isInitializing) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Cpu size={48} className="text-accent animate-spin" />
        <h2 className="font-orbitron font-black text-accent text-xl animate-pulse tracking-widest">INITIALIZING_PERSONAL_GRID...</h2>
        <div className="w-64 h-1 bg-white/10 overflow-hidden">
          <div className="h-full bg-accent animate-[shimmer_1.5s_infinite] w-1/3" />
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-8 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: User Summary */}
        <div className="lg:col-span-1 space-y-8">
          <div className="theme-bg-secondary border theme-border p-8 relative overflow-hidden group shadow-lg">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Shield size={120} className="text-accent" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full border-4 border-accent p-1 mb-6 shadow-accent overflow-hidden">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                  alt="Avatar" 
                  className="w-full h-full rounded-full theme-bg-primary"
                />
              </div>
              <h2 className="text-2xl font-orbitron font-black theme-text-primary mb-1 uppercase">{user.name}</h2>
              <span className="text-accent font-orbitron text-[10px] tracking-widest uppercase mb-6">
                {xpBalance > 5000 ? 'Elite Specialist' : 'New Recruit'}
              </span>
              
              <div className="w-full theme-bg-primary h-2 rounded-full mb-2 overflow-hidden border theme-border">
                <div className="bg-accent h-full shadow-accent transition-all duration-1000" style={{ width: `${Math.min(100, (xpBalance / 10000) * 100)}%` }} />
              </div>
              <div className="flex justify-between w-full text-[10px] font-orbitron theme-text-secondary uppercase">
                <span>Rank: {xpBalance > 5000 ? 'Veteran' : 'Private'}</span>
                <span>{10000 - xpBalance} XP to Next Rank</span>
              </div>
            </div>
          </div>

          <div className="theme-bg-secondary border theme-border p-6 shadow-md relative overflow-hidden">
            {successMsg && (
              <div className="absolute inset-0 bg-green-500/90 flex items-center justify-center z-20 animate-in fade-in zoom-in-95 duration-300">
                <div className="text-white font-orbitron font-black text-center p-4">
                  <Sparkles className="mx-auto mb-2" />
                  {successMsg}
                </div>
              </div>
            )}
            <h3 className="theme-text-primary font-orbitron font-bold text-sm mb-6 flex items-center gap-2">
              <Award size={18} className="text-accent" />
              GX CREDITS
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center theme-bg-primary p-4 rounded-sm border theme-border">
                <span className="theme-text-secondary text-[10px] font-orbitron uppercase tracking-widest">Available XP</span>
                <span className="theme-text-primary font-orbitron font-bold text-lg">{xpBalance.toLocaleString()}</span>
              </div>
              
              {xpBalance === 0 ? (
                <button 
                  onClick={handleClaimStarterBonus}
                  className="w-full py-4 bg-white text-black hover:opacity-90 font-orbitron font-black text-[10px] tracking-widest uppercase transition-all rounded-sm shadow-xl flex items-center justify-center gap-2"
                >
                  <Gift size={16} /> CLAIM_STARTER_XP
                </button>
              ) : (
                <button 
                  onClick={() => setIsRewardsOpen(true)}
                  className="w-full py-3 bg-accent hover:opacity-90 text-white text-[10px] font-orbitron font-bold tracking-widest uppercase transition-all rounded-sm shadow-accent flex items-center justify-center gap-2"
                >
                  <Zap size={14} /> REDEEM_GEAR
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Details & Activity */}
        <div className="lg:col-span-2 space-y-8">
          <div className="theme-bg-secondary border theme-border p-8 shadow-lg min-h-[400px]">
            <h3 className="text-xl font-orbitron font-black theme-text-primary mb-8 flex items-center gap-3">
              <Package size={24} className="text-accent" />
              MISSION LOG <span className="theme-text-secondary">/ ORDERS</span>
            </h3>
            
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-center opacity-30 border-2 border-dashed theme-border">
                  <Clock size={48} className="theme-text-secondary mb-4" />
                  <p className="font-orbitron text-xs uppercase tracking-widest">No deployments detected in local grid.</p>
                  <p className="text-[10px] mt-2">Initialize your first purchase to generate mission logs.</p>
                </div>
              ) : (
                orders.map(order => (
                  <div key={order.id} className="flex items-center justify-between p-6 theme-bg-primary border theme-border hover:border-accent/50 transition-colors group">
                    <div className="flex gap-6 items-center">
                      <div className="w-12 h-12 theme-bg-tertiary flex items-center justify-center border theme-border group-hover:border-accent transition-colors">
                        <Zap size={20} className="theme-text-secondary group-hover:text-accent" />
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
                ))
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              onClick={onNavigateToSettings}
              className="theme-bg-secondary border theme-border p-8 hover:border-accent transition-all cursor-pointer group shadow-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <Settings className="text-accent group-hover:rotate-45 transition-transform" />
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

      {/* Rewards Redemption Modal */}
      {isRewardsOpen && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsRewardsOpen(false)} />
          <div className="relative w-full max-w-4xl theme-bg-secondary border theme-border shadow-accent animate-in zoom-in-95 duration-300 overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8 border-b theme-border pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 border border-accent/30 flex items-center justify-center rounded-sm">
                    <Gift size={24} className="text-accent" />
                  </div>
                  <div>
                    <h2 className="theme-text-primary font-orbitron font-black text-2xl tracking-tighter uppercase">REWARD_HUB</h2>
                    <p className="text-accent font-orbitron text-[10px] uppercase tracking-widest">Available Balance: {xpBalance.toLocaleString()} XP</p>
                  </div>
                </div>
                <button onClick={() => setIsRewardsOpen(false)} className="theme-text-secondary hover:theme-text-primary transition-colors">
                  <X size={28} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
                {REWARDS.map(reward => {
                  const isRedeemed = redeemedIds.includes(reward.id);
                  const canAfford = xpBalance >= reward.cost;

                  return (
                    <div 
                      key={reward.id} 
                      className={`theme-bg-primary border theme-border p-4 flex gap-4 group transition-all ${
                        isRedeemed ? 'opacity-50 grayscale' : 'hover:border-accent'
                      }`}
                    >
                      <div className="w-24 h-24 shrink-0 overflow-hidden border theme-border relative">
                        <img src={reward.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={reward.name} />
                        <div className="absolute top-1 left-1 bg-black/60 px-1 text-[8px] font-orbitron text-accent uppercase border border-accent/30">
                          {reward.type}
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="theme-text-primary font-orbitron font-bold text-sm uppercase">{reward.name}</h4>
                          <span className="text-accent font-orbitron font-black text-xs">{reward.cost.toLocaleString()}</span>
                        </div>
                        <p className="theme-text-secondary text-[10px] leading-tight mb-4">{reward.description}</p>
                        <button 
                          disabled={isRedeemed || !canAfford}
                          onClick={() => handleRedeem(reward)}
                          className={`mt-auto w-full py-2 font-orbitron text-[10px] uppercase font-bold transition-all border ${
                            isRedeemed 
                              ? 'border-gray-600 text-gray-500 cursor-not-allowed' 
                              : canAfford 
                                ? 'bg-accent border-accent text-white hover:bg-transparent hover:text-accent shadow-accent' 
                                : 'border-red-500/30 text-red-500/50 cursor-not-allowed'
                          }`}
                        >
                          {isRedeemed ? 'COLLECTED' : canAfford ? 'CLAIM REWARD' : 'INSUFFICIENT XP'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </section>
  );
};

export default Profile;
