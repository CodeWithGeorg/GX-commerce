
import React, { useState, useEffect } from 'react';
import { User, Shield, Zap, Package, Award, Settings, LogOut, Lock, LogIn, X, Gift, Sparkles, Cpu, Clock, Target, FileText, Globe, Users, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface ProfileProps {
  user: any | null;
  onLogout: () => void;
  onLoginClick: () => void;
  onNavigateToSettings: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout, onLoginClick, onNavigateToSettings }) => {
  const [profileData, setProfileData] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInitializing, setIsInitializing] = useState(false);

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
      
      if (!error) fetchProfile();
    }
  };

  if (!user) {
    return (
      <section className="container mx-auto px-8 py-32 flex items-center justify-center min-h-[70vh]">
        <div className="max-w-md w-full theme-bg-secondary border theme-border p-12 text-center relative shadow-2xl">
          <div className="w-20 h-20 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center mx-auto mb-8">
            <Lock size={32} className="text-accent" />
          </div>
          <h2 className="text-3xl font-orbitron font-black mb-4">ACCESS_DENIED</h2>
          <p className="theme-text-secondary text-sm font-orbitron uppercase tracking-widest mb-10">Initialize session access to view mission logs.</p>
          <button onClick={onLoginClick} className="w-full bg-accent py-4 font-orbitron font-bold">INITIALIZE_UPLINK</button>
        </div>
      </section>
    );
  }

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-accent" size={48} /></div>;

  return (
    <section className="container mx-auto px-8 py-12 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div className="theme-bg-secondary border theme-border p-8 relative overflow-hidden text-center shadow-lg">
            <div className="w-32 h-32 rounded-full border-4 border-accent p-1 mb-6 mx-auto overflow-hidden">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData?.username || user.id}`} alt="Avatar" className="w-full h-full rounded-full" />
            </div>
            <h2 className="text-2xl font-orbitron font-black uppercase mb-1">{profileData?.username || 'Operator'}</h2>
            <span className="text-accent font-orbitron text-[10px] tracking-widest uppercase mb-6 block">{profileData?.rank || 'New Recruit'}</span>
            <div className="w-full theme-bg-primary h-2 rounded-full border theme-border">
              <div className="bg-accent h-full shadow-accent" style={{ width: `${Math.min(100, (profileData?.xp_balance / 10000) * 100)}%` }} />
            </div>
          </div>

          <div className="theme-bg-secondary border theme-border p-6 shadow-md">
            <h3 className="font-orbitron font-bold text-sm mb-6 flex items-center gap-2"><Award size={18} className="text-accent" />GX CREDITS</h3>
            <div className="theme-bg-primary p-4 mb-4 border theme-border flex justify-between">
              <span className="theme-text-secondary text-[10px] font-orbitron uppercase">Available XP</span>
              <span className="theme-text-primary font-orbitron font-bold">{profileData?.xp_balance?.toLocaleString() || 0}</span>
            </div>
            {profileData?.xp_balance === 0 && (
              <button onClick={claimBonus} className="w-full bg-white text-black py-4 font-orbitron font-black text-[10px] uppercase">CLAIM_STARTER_XP</button>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="theme-bg-secondary border theme-border p-8 min-h-[400px]">
            <h3 className="text-xl font-orbitron font-black mb-8 flex items-center gap-3"><Package size={24} className="text-accent" />MISSION LOG</h3>
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="py-20 text-center opacity-30 border-2 border-dashed theme-border">
                  <Clock size={48} className="mx-auto mb-4" />
                  <p className="font-orbitron text-xs uppercase tracking-widest">No deployments detected.</p>
                </div>
              ) : (
                orders.map(order => (
                  <div key={order.id} className="flex justify-between p-6 theme-bg-primary border theme-border">
                    <div>
                      <p className="font-orbitron font-bold text-sm">{order.id.slice(0, 8)}</p>
                      <p className="theme-text-secondary text-[10px] uppercase">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-orbitron font-bold">KSh {order.total_price.toLocaleString()}</p>
                      <span className="text-[10px] uppercase bg-green-500/20 text-green-500 px-2 py-1">{order.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
