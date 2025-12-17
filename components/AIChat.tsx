
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User } from 'lucide-react';
import { ChatMessage, Product } from '../types';
import { getShoppingAdvice } from '../services/geminiService';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  availableProducts: Product[];
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose, availableProducts }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to GX Commerce, traveler. I am the GX-Specialist. Need recommendations for your build?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const aiResponse = await getShoppingAdvice(userMsg, availableProducts);
    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-full sm:w-[400px] h-screen bg-[#0b0b0d] border-l border-gray-800 z-[60] flex flex-col shadow-2xl">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#1a1a1c]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#fa1e4e] rounded-full flex items-center justify-center animate-pulse">
            <Bot size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-white font-orbitron font-bold text-sm">GX SPECIALIST</h2>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-[10px] text-gray-400 uppercase">System Online</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
              m.role === 'user' 
                ? 'bg-[#fa1e4e] text-white rounded-br-none' 
                : 'bg-[#252528] text-gray-200 border border-gray-700 rounded-bl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#252528] p-3 rounded-lg flex gap-1">
              <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-800 bg-[#1a1a1c]">
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask for recommendations..."
            className="w-full bg-[#0b0b0d] border border-gray-700 focus:border-[#fa1e4e] outline-none text-white text-sm rounded-md py-3 pl-4 pr-12 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#fa1e4e] hover:text-white transition-colors disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
