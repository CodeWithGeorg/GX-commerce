
import React, { useState } from 'react';
import { X, Shield, Lock, User, Mail, ChevronRight, Zap, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'register') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username }
          }
        });
        if (signUpError) throw signUpError;
        alert("Check your email for confirmation!");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-md theme-bg-secondary border theme-border p-8 shadow-accent">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Shield size={24} className="text-accent" />
            <h2 className="theme-text-primary font-orbitron font-black text-xl uppercase tracking-tighter">
              {mode === 'login' ? 'ACCESS_TERMINAL' : 'CREATE_VANGUARD'}
            </h2>
          </div>
          <button onClick={onClose} className="theme-text-secondary"><X size={24} /></button>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-[10px] font-orbitron uppercase">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'register' && (
            <div className="space-y-2">
              <label className="theme-text-secondary font-orbitron text-[10px] uppercase">Username</label>
              <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="VANGUARD_01" className="w-full theme-bg-primary border theme-border py-3 px-4 theme-text-primary font-orbitron text-sm outline-none focus:border-accent" />
            </div>
          )}
          <div className="space-y-2">
            <label className="theme-text-secondary font-orbitron text-[10px] uppercase">Email Uplink</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="commander@gx.net" className="w-full theme-bg-primary border theme-border py-3 px-4 theme-text-primary font-orbitron text-sm outline-none focus:border-accent" />
          </div>
          <div className="space-y-2">
            <label className="theme-text-secondary font-orbitron text-[10px] uppercase">Access Key</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full theme-bg-primary border theme-border py-3 px-4 theme-text-primary font-orbitron text-sm outline-none focus:border-accent" />
          </div>

          <button disabled={loading} type="submit" className="w-full bg-accent hover:opacity-90 text-white font-orbitron font-bold py-4 flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : mode === 'login' ? 'INITIALIZE_SESSION' : 'REGISTER_HARDWARE'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t theme-border text-center">
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="theme-text-secondary text-[10px] font-orbitron uppercase tracking-widest">
            {mode === 'login' ? "New Operator? Create Account" : "Registered? Login to Uplink"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
