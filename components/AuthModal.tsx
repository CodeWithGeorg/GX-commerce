
import React, { useState } from 'react';
import { X, Shield, Lock, User, Mail, ChevronRight, Zap } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-md theme-bg-secondary border theme-border shadow-[0_0_50px_rgba(250,30,78,0.2)] animate-in zoom-in-95 duration-300">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#fa1e4e] opacity-50 pointer-events-none" />
        
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#fa1e4e]/10 border border-[#fa1e4e]/30 flex items-center justify-center rounded-sm">
                <Shield size={20} className="text-[#fa1e4e]" />
              </div>
              <div>
                <h2 className="theme-text-primary font-orbitron font-black text-xl tracking-tighter">
                  {mode === 'login' ? 'ACCESS_TERMINAL' : 'CREATE_VANGUARD'}
                </h2>
                <p className="text-[#fa1e4e] font-orbitron text-[9px] uppercase tracking-widest animate-pulse">Security Protocol Active</p>
              </div>
            </div>
            <button onClick={onClose} className="theme-text-secondary hover:theme-text-primary transition-colors">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'register' && (
              <div className="space-y-2">
                <label className="theme-text-secondary font-orbitron text-[10px] uppercase tracking-widest">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full theme-bg-primary border theme-border focus:border-[#fa1e4e] outline-none py-3 pl-12 pr-4 theme-text-primary text-sm font-orbitron transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="theme-text-secondary font-orbitron text-[10px] uppercase tracking-widest">Username / Alias</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="VANGUARD_01"
                  className="w-full theme-bg-primary border theme-border focus:border-[#fa1e4e] outline-none py-3 pl-12 pr-4 theme-text-primary text-sm font-orbitron transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="theme-text-secondary font-orbitron text-[10px] uppercase tracking-widest">Access Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full theme-bg-primary border theme-border focus:border-[#fa1e4e] outline-none py-3 pl-12 pr-4 theme-text-primary text-sm font-orbitron transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#fa1e4e] hover:bg-[#ff4e7e] text-white font-orbitron font-bold py-4 rounded-sm transition-all shadow-[0_0_20px_rgba(250,30,78,0.3)] flex items-center justify-center gap-2 group"
            >
              {mode === 'login' ? 'INITIALIZE_SESSION' : 'REGISTER_HARDWARE'} 
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t theme-border text-center">
            <button 
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="theme-text-secondary hover:text-[#fa1e4e] font-orbitron text-[10px] uppercase tracking-[0.2em] transition-colors"
            >
              {mode === 'login' ? "Don't have an uplink? Register" : "Already registered? Login"}
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 theme-bg-tertiary flex items-center gap-4 border-t theme-border">
          <Zap size={16} className="text-[#fa1e4e]" />
          <p className="text-[9px] theme-text-secondary font-orbitron leading-tight">
            Required to bypass guest restrictions for Cart and Wishlist protocols.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
