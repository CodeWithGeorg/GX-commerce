
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Terminal, Cpu, Shield, Activity, Zap, Radio, Globe } from 'lucide-react';
import { ChatMessage, Product } from '../types';
import { getShoppingAdvice } from '../services/geminiService';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  availableProducts: Product[];
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose, availableProducts }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('ONLINE');
  const scrollRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (isOpen && isBooting) {
      const logs = [
        "INITIALIZING NEURAL_LINK...",
        "DECRYPTING DATABASE [GX_MARKET_V4]...",
        "CONNECTING TO SATELLITE_UPLINK...",
        "SCANNING HARDWARE SIGNATURES...",
        "ARES_v5.0.1 ONLINE.",
        "READY_FOR_COMMANDS."
      ];
      let i = 0;
      const interval = setInterval(() => {
        if (i < logs.length) {
          setBootLogs(prev => [...prev, logs[i]]);
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsBooting(false);
            setMessages([{ role: 'model', text: '[STATUS] Uplink Stable. Specialist, what gear are we deploying today? System is overclocked and ready.' }]);
          }, 500);
        }
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isOpen, isBooting]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, bootLogs, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    setStatus('ANALYZING');

    const aiResponse = await getShoppingAdvice(userMsg, availableProducts);
    
    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setLoading(false);
    setStatus('READY');
  };

 
  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Highlight Tactical Headers
      const formattedLine = line
        .replace(/(\[.*?\])/g, '<span class="text-accent font-black">$1</span>')
        .replace(/(KSh\s?\d{1,3}(,\d{3})*(\.\d+)?)/g, '<span class="text-yellow-400 font-bold">$1</span>')
        .replace(/(MODEL_ID:\s?\w+)/g, '<span class="text-cyan-400">$1</span>');
      
      return <div key={i} className="mb-1" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-full sm:w-[500px] h-screen theme-bg-primary border-l theme-border z-[100] flex flex-col shadow-2xl animate-in slide-in-from-right duration-500 overflow-hidden">
      {/* HUD Header */}
      <div className="p-4 border-b theme-border bg-black/60 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-accent/50 animate-pulse" />
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/10 border border-accent/40 rounded-sm flex items-center justify-center relative overflow-hidden">
               <Terminal size={24} className="text-accent relative z-10 animate-pulse" />
               <div className="absolute inset-0 bg-accent/5 animate-[pulse_1.5s_infinite]" />
            </div>
            <div>
              <h2 className="theme-text-primary font-orbitron font-black text-lg tracking-tighter uppercase glitch-text" data-text="GX_ARES">GX_ARES</h2>
              <div className="flex items-center gap-3">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] theme-text-secondary font-orbitron uppercase tracking-widest">{status}_MODE</span>
                <span className="text-[10px] text-accent/50 font-orbitron">LATENCY: 4ms</span>
              </div>
            </div>
          </div>
          
          <button onClick={onClose} className="theme-text-secondary hover:text-accent transition-all p-2">
            <X size={28} />
          </button>
        </div>
      </div>

      {/* Terminal Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(var(--accent-color) 1px, transparent 1px)', backgroundSize: '25px 25px' }} />

      {/* Chat / Boot Display */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10 no-scrollbar">
        {isBooting ? (
          <div className="font-mono text-[11px] theme-text-secondary space-y-1">
            {bootLogs.map((log, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-accent/40">[{new Date().toLocaleTimeString()}]</span>
                <span className={i === bootLogs.length - 1 ? "text-accent" : ""}>{log}</span>
              </div>
            ))}
            <div className="w-1.5 h-4 bg-accent animate-pulse inline-block align-middle ml-1" />
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className="flex items-center gap-2 mb-2 px-1">
                {m.role === 'model' ? (
                  <>
                    <Zap size={10} className="text-accent" />
                    <span className="text-[9px] font-orbitron text-accent uppercase tracking-widest">ARES_CORE_LOG</span>
                  </>
                ) : (
                  <>
                    <span className="text-[9px] font-orbitron theme-text-secondary uppercase tracking-widest">COMMANDER_UPLINK</span>
                    <Globe size={10} className="theme-text-secondary" />
                  </>
                )}
              </div>
              
              <div className={`max-w-[95%] p-4 rounded-sm font-inter text-[13px] leading-relaxed relative ${
                m.role === 'user' 
                  ? 'theme-bg-tertiary border-r-2 border-accent theme-text-primary' 
                  : 'bg-accent/5 border border-accent/20 theme-text-primary'
              }`}>
                {m.role === 'model' && (
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-accent opacity-40" />
                )}
                {formatText(m.text)}
              </div>
            </div>
          ))
        )}
        
        {loading && (
          <div className="flex flex-col items-start animate-pulse">
            <div className="flex items-center gap-2 mb-2">
               <Shield size={10} className="text-accent animate-spin" />
               <span className="text-[9px] font-orbitron text-accent uppercase tracking-widest">QUERYING_MAINFRAME...</span>
            </div>
            <div className="theme-bg-secondary p-4 border border-accent/10 w-full">
               <div className="h-2 w-full bg-accent/20 rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-1/3 animate-[shimmer_1.5s_infinite]" />
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Console */}
      <div className="p-6 border-t theme-border bg-black/40 backdrop-blur-xl">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-accent opacity-0 group-focus-within:opacity-20 blur-sm transition-all duration-500" />
          <div className="relative flex">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 theme-text-secondary">
              <Radio size={16} />
            </div>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Transmit instruction..."
              disabled={isBooting}
              className="w-full theme-bg-primary border theme-border focus:border-accent outline-none theme-text-primary text-xs font-orbitron py-4 pl-12 pr-14 transition-all uppercase placeholder:opacity-30"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim() || isBooting}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-accent hover:opacity-90 text-white flex items-center justify-center rounded-sm transition-all disabled:opacity-30"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center text-[9px] font-orbitron theme-text-secondary tracking-[0.2em]">
           <span className="opacity-50">CHANNEL: SECURE_ALPHA</span>
           <span className="hover:text-accent cursor-pointer transition-colors flex items-center gap-1" onClick={() => setMessages([])}>
             <Activity size={10} /> REBOOT_CORE
           </span>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .glitch-text {
          position: relative;
        }
        .glitch-text:hover::after {
          content: attr(data-text);
          position: absolute;
          left: 2px;
          text-shadow: -1px 0 #00ffff;
          background: transparent;
          overflow: hidden;
          clip: rect(0, 900px, 0, 0);
          animation: noise-anim 2s infinite linear alternate-reverse;
        }
        @keyframes noise-anim {
          0% { clip: rect(10px, 9999px, 50px, 0); }
          20% { clip: rect(30px, 9999px, 20px, 0); }
          40% { clip: rect(45px, 9999px, 80px, 0); }
          60% { clip: rect(15px, 9999px, 35px, 0); }
          80% { clip: rect(60px, 9999px, 10px, 0); }
          100% { clip: rect(25px, 9999px, 65px, 0); }
        }
      `}</style>
    </div>
  );
};

export default AIChat;
