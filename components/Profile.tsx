
import React, { useState, useEffect } from 'react';
import { User, Shield, Zap, Package, Award, Settings, LogOut, Lock, LogIn, X, Gift, Sparkles, Cpu, Clock, Target, FileText, Globe, Users, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface ProfileProps {
  user: any | null;
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
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'r2',
    name: 'GX Neon Keycap Set',
    cost: 12000,
    type: 'Hardware',
    description: 'Custom PBT keycaps with translucent legends for max RGB.',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'r3',
    name: 'Tactical Desk Mat',
    cost: 8000,
    type: 'Hardware',
    description: 'Military-grade cordura surface for pixel-perfect tracking.',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=400'
  }
];

const Profile: React.FC<ProfileProps> = ({ user, onLogout, onLoginClick, onNavigateToSettings }) => {
  const [profileData, setProfileData] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);
  const [redeemingId, setRedeemingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchOrders();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (data) setProfileData(data);
    setLoading(false);
  };

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (data) setOrders(data);
  };

  const claimBonus = async () => {
    if (profileData.xp_balance === 0) {
      const { error } = await supabase
        .from('profiles')
        .update({ xp_balance: 1000, rank: 'Private' })
        .eq('id', user.id);
      
      if (!error) {
        setSuccessMsg("STARTER_BONUS: +1000 XP ADDED");
        setTimeout(() => setSuccessMsg(null), 3000);
        fetchProfile();
      }
    }
  };

  const handleRedeem = async (reward: Reward) => {
    if (profileData.xp_balance < reward.cost) return;
    
    setRedeemingId(reward.id);
    const newBalance = profileData.xp_balance - reward.cost;
    
    const { error } = await supabase
      .from('profiles')
      .update({ xp_balance: newBalance })
      .eq('id', user.id);
    
    if (!error) {
      setSuccessMsg(`REDEEMED: ${reward.name.toUpperCase()}`);
      setTimeout(() => setSuccessMsg(null), 3000);
      fetchProfile();
    }
    setRedeemingId(null);
  };

  if (!user) {
    return (
      <section className="container mx-auto px-8 py-32 flex items-center justify-center min-h-[70vh]">
        <div className="max-w-md w-full theme-bg-secondary border theme-border p-12 text-center relative shadow-2xl">
          <div className="w-20 h-20 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center mx-auto mb-8">
            <Lock size={32} className="text-accent" />
          </div>
          <h2 className="text-3xl font-orbitron font-black mb-4 theme-text-primary">ACCESS_DENIED</h2>
          <p className="theme-text-secondary text-sm font-orbitron uppercase tracking-widest mb-10">Initialize session access to view mission logs.</p>
          <button onClick={onLoginClick} className="w-full bg-accent py-4 font-orbitron font-bold text-white shadow-accent hover:opacity-90 transition-all">INITIALIZE_UPLINK</button>
        </div>
      </section>
    );
  }

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <Loader2 className="animate-spin text-accent" size={48} />
      <span className="font-orbitron text-[10px] tracking-[0.5em] text-accent animate-pulse">SYNCHRONIZING_GRID...</span>
    </div>
  );

  return (
    <section className="container mx-auto px-8 py-12 animate-in fade-in duration-700">
      {successMsg && (
        <div className="fixed top-24 right-8 z-[200] bg-green-500 text-white font-orbitron font-bold px-6 py-4 rounded-sm shadow-2xl animate-in slide-in-from-right duration-300 flex items-center gap-3">
          <Sparkles size={20} />
          {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: User Summary & Earning Rules */}
        <div className="lg:col-span-1 space-y-8">
          <div className="theme-bg-secondary border theme-border p-8 relative overflow-hidden text-center shadow-lg group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Shield size={120} className="text-accent" />
            </div>
            <div className="w-32 h-32 rounded-full border-4 border-accent p-1 mb-6 mx-auto overflow-hidden shadow-accent">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData?.username || user.id}`} alt="Avatar" className="w-full h-full rounded-full" />
            </div>
            <h2 className="text-2xl font-orbitron font-black uppercase mb-1 theme-text-primary">{profileData?.username || 'Operator'}</h2>
            <span className="text-accent font-orbitron text-[10px] tracking-widest uppercase mb-6 block">{profileData?.rank || 'New Recruit'}</span>
            
            <div className="w-full theme-bg-primary h-2 rounded-full border theme-border mb-2 overflow-hidden">
              <div className="bg-accent h-full shadow-accent transition-all duration-1000" style={{ width: `${Math.min(100, (profileData?.xp_balance / 10000) * 100)}%` }} />
            </div>
            <div className="flex justify-between text-[8px] font-orbitron theme-text-secondary uppercase">
              <span>Next Rank: {10000 - (profileData?.xp_balance % 10000)} XP to go</span>
            </div>
          </div>

          <div className="theme-bg-secondary border theme-border p-6 shadow-md">
            <h3 className="font-orbitron font-bold text-sm mb-6 flex items-center gap-2 theme-text-primary"><Award size={18} className="text-accent" />GX CREDITS</h3>
            <div className="theme-bg-primary p-4 mb-4 border theme-border flex justify-between rounded-sm">
              <span className="theme-text-secondary text-[10px] font-orbitron uppercase tracking-widest">Balance</span>
              <span className="text-accent font-orbitron font-black text-lg">{profileData?.xp_balance?.toLocaleString() || 0} XP</span>
            </div>
            
            {profileData?.xp_balance === 0 ? (
              <button onClick={claimBonus} className="w-full bg-white text-black py-4 font-orbitron font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                <Gift size={16} /> CLAIM_STARTER_XP
              </button>
            ) : (
              <button onClick={() => setIsRewardsOpen(true)} className="w-full bg-accent text-white py-4 font-orbitron font-black text-[10px] uppercase tracking-widest hover:opacity-90 shadow-accent transition-all flex items-center justify-center gap-2">
                <Zap size={16} /> REDEEM_REWARDS
              </button>
            )}
          </div>

          {/* Earning Protocols Section */}
          <div className="theme-bg-secondary border theme-border p-6 shadow-md">
            <h3 className="theme-text-primary font-orbitron font-bold text-[10px] mb-6 flex items-center gap-2 uppercase tracking-[0.2em]">
              <Target size={16} className="text-accent" />
              EARNING_PROTOCOLS
            </h3>
            <div className="space-y-4">
               {[
                 { icon: Package, title: "Field Deployment", desc: "Earn 10 XP for every KSh 1,000 spent on hardware." },
                 { icon: FileText, title: "Tech Review", desc: "+500 XP for submitting a gear field report." },
                 { icon: Globe, title: "Daily Uplink", desc: "+50 XP for every 24h grid connection." },
                 { icon: Users, title: "Network Growth", desc: "+2000 XP per recruited operator (Referral)." }
               ].map((mission, i) => (
                 <div key={i} className="flex gap-4 p-3 theme-bg-primary border theme-border rounded-sm hover:border-accent/30 transition-colors group">
                    <div className="w-10 h-10 shrink-0 bg-accent/10 flex items-center justify-center rounded-sm">
                       <mission.icon size={18} className="text-accent group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h4 className="theme-text-primary font-orbitron font-bold text-[10px] uppercase mb-1">{mission.title}</h4>
                      <p className="theme-text-secondary text-[9px] leading-tight opacity-70">{mission.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Right Column: Mission Log & Activity */}
        <div className="lg:col-span-2 space-y-8">
          <div className="theme-bg-secondary border theme-border p-8 min-h-[500px] shadow-lg">
            <h3 className="text-xl font-orbitron font-black mb-8 flex items-center gap-3 theme-text-primary">
              <Package size={24} className="text-accent" />
              MISSION LOG <span className="text-white/20">/ ORDERS</span>
            </h3>
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="py-20 text-center opacity-30 border-2 border-dashed theme-border flex flex-col items-center">
                  <Clock size={48} className="mb-4" />
                  <p className="font-orbitron text-xs uppercase tracking-widest">No deployments detected.</p>
                  <p className="text-[10px] mt-2">Initialize your first loadout to generate logs.</p>
                </div>
              ) : (
                orders.map(order => (
                  <div key={order.id} className="flex justify-between p-6 theme-bg-primary border theme-border hover:border-accent/50 transition-colors group">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 theme-bg-secondary border theme-border flex items-center justify-center group-hover:border-accent transition-colors">
                        <Zap size={20} className="theme-text-secondary group-hover:text-accent" />
                      </div>
                      <div>
                        <p className="theme-text-primary font-orbitron font-bold text-sm tracking-widest">{order.id.slice(0, 8).toUpperCase()}</p>
                        <p className="theme-text-secondary text-[10px] uppercase font-orbitron">{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="theme-text-primary font-orbitron font-bold">KSh {order.total_price.toLocaleString()}</p>
                      <span className="text-[10px] uppercase bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1 rounded-sm">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div onClick={onNavigateToSettings} className="theme-bg-secondary border theme-border p-8 hover:border-accent cursor-pointer group transition-all shadow-md">
               <div className="flex items-center gap-4 mb-4">
                  <Settings className="text-accent group-hover:rotate-90 transition-transform" size={24} />
                  <h4 className="theme-text-primary font-orbitron font-bold text-sm uppercase">GRID SETTINGS</h4>
               </div>
               <p className="theme-text-secondary text-xs">Calibrate interface visuals and security protocols.</p>
            </div>
            <div onClick={onLogout} className="theme-bg-secondary border theme-border p-8 hover:border-red-500 cursor-pointer group transition-all shadow-md">
               <div className="flex items-center gap-4 mb-4">
                  <LogOut className="text-red-500 group-hover:-translate-x-1 transition-transform" size={24} />
                  <h4 className="theme-text-primary font-orbitron font-bold text-sm uppercase">TERMINATE SESSION</h4>
               </div>
               <p className="theme-text-secondary text-xs">Clear local cache and disconnect from the uplink.</p>
            </div>
          </div>
        </div>
      </div>

      {/* REWARD HUB MODAL */}
      {isRewardsOpen && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setIsRewardsOpen(false)} />
          <div className="relative w-full max-w-4xl theme-bg-secondary border theme-border shadow-accent animate-in zoom-in-95 duration-300 overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-center mb-10 border-b theme-border pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-accent/10 border border-accent/30 flex items-center justify-center rounded-sm">
                    <Award size={32} className="text-accent" />
                  </div>
                  <div>
                    <h2 className="theme-text-primary font-orbitron font-black text-2xl tracking-tighter uppercase">REWARD_REDEMPTION_HUB</h2>
                    <p className="text-accent font-orbitron text-[10px] uppercase tracking-widest animate-pulse">Available Balance: {profileData?.xp_balance?.toLocaleString()} XP</p>
                  </div>
                </div>
                <button onClick={() => setIsRewardsOpen(false)} className="theme-text-secondary hover:text-accent transition-colors">
                  <X size={32} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
                {REWARDS.map(reward => {
                  const canAfford = (profileData?.xp_balance || 0) >= reward.cost;
                  const isRedeeming = redeemingId === reward.id;

                  return (
                    <div key={reward.id} className="theme-bg-primary border theme-border p-4 flex gap-4 group hover:border-accent/40 transition-all">
                      <div className="w-28 h-28 shrink-0 overflow-hidden border theme-border relative bg-black/40">
                        <img src={reward.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={reward.name} />
                        <div className="absolute top-1 left-1 bg-accent/80 text-white text-[8px] font-orbitron px-2 py-0.5 uppercase">
                          {reward.type}
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="theme-text-primary font-orbitron font-bold text-xs uppercase tracking-wider">{reward.name}</h4>
                            <span className="text-accent font-orbitron font-black text-xs">{reward.cost.toLocaleString()} XP</span>
                          </div>
                          <p className="theme-text-secondary text-[10px] leading-tight mb-4 opacity-70">{reward.description}</p>
                        </div>
                        <button 
                          disabled={!canAfford || isRedeeming}
                          onClick={() => handleRedeem(reward)}
                          className={`w-full py-2 font-orbitron text-[10px] uppercase font-bold transition-all border ${
                            canAfford 
                              ? 'bg-accent border-accent text-white hover:bg-transparent hover:text-accent shadow-accent' 
                              : 'border-white/10 text-white/20 cursor-not-allowed'
                          } flex items-center justify-center gap-2`}
                        >
                          {isRedeeming ? <Loader2 size={12} className="animate-spin" /> : canAfford ? 'CLAIM REWARD' : 'INSUFFICIENT XP'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Visual HUD Corner */}
            <div className="absolute bottom-0 left-0 w-32 h-1 bg-accent/30" />
            <div className="absolute bottom-0 left-0 w-1 h-32 bg-accent/30" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
