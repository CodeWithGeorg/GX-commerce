
import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Smartphone, CreditCard, Cpu, ChevronRight, CheckCircle2, Loader2, AlertCircle, Zap } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  onSuccess: () => void;
}

type PaymentMethod = 'mpesa' | 'card' | 'crypto';
type CheckoutStep = 'selection' | 'processing' | 'success';

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cart, total, onSuccess }) => {
  const [step, setStep] = useState<CheckoutStep>('selection');
  const [method, setMethod] = useState<PaymentMethod>('mpesa');
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setStep('selection');
      setIsProcessing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setStep('processing');
    
    // Simulate payment network latency
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 4000);
  };

  const handleFinish = () => {
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl theme-bg-secondary border theme-border shadow-accent overflow-hidden animate-in zoom-in-95 duration-300">
        {/* HUD Elements */}
        <div className="absolute top-0 left-0 w-20 h-1 bg-accent animate-pulse" />
        <div className="absolute bottom-0 right-0 w-20 h-1 bg-accent animate-pulse" />

        <div className="p-6 md:p-10">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 theme-bg-primary border border-accent/30 flex items-center justify-center rounded-sm">
                <ShieldCheck size={24} className="text-accent" />
              </div>
              <div>
                <h2 className="theme-text-primary font-orbitron font-black text-2xl tracking-tighter uppercase">
                  {step === 'success' ? 'TRANSACTION_SECURED' : 'CHECKOUT_TERMINAL'}
                </h2>
                <p className="text-accent font-orbitron text-[9px] uppercase tracking-[0.3em] animate-pulse">
                  {isProcessing ? 'Authorizing Uplink...' : 'Secure Protocol v4.2'}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="theme-text-secondary hover:theme-text-primary transition-colors">
              <X size={28} />
            </button>
          </div>

          {step === 'selection' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              {/* Left Side: Summary */}
              <div className="md:col-span-5 space-y-6">
                <div className="theme-bg-primary border theme-border p-6 rounded-sm">
                  <h3 className="theme-text-secondary font-orbitron text-[10px] uppercase tracking-widest mb-4">Inventory Grid</h3>
                  <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 no-scrollbar">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between text-[11px] font-orbitron">
                        <span className="theme-text-primary truncate max-w-[120px]">{item.name} x{item.quantity}</span>
                        <span className="theme-text-secondary">KSh {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t theme-border flex justify-between items-center">
                    <span className="theme-text-secondary font-orbitron text-xs">TOTAL_DUE</span>
                    <span className="text-xl font-orbitron font-black text-accent">KSh {total.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-accent/5 border border-accent/20">
                  <AlertCircle size={16} className="text-accent shrink-0" />
                  <p className="text-[9px] theme-text-secondary font-orbitron uppercase leading-tight">
                    Transactions are encrypted via GX-Tunnel. All hardware is insured during transit.
                  </p>
                </div>
              </div>

              {/* Right Side: Methods */}
              <div className="md:col-span-7 space-y-6">
                <h3 className="theme-text-primary font-orbitron font-bold text-xs uppercase tracking-widest">Select Access Method</h3>
                
                <div className="grid grid-cols-1 gap-3">
                  <button 
                    onClick={() => setMethod('mpesa')}
                    className={`flex items-center justify-between p-4 border transition-all ${method === 'mpesa' ? 'border-accent theme-bg-tertiary shadow-[0_0_15px_rgba(250,30,78,0.1)]' : 'theme-border theme-bg-primary opacity-60 hover:opacity-100'}`}
                  >
                    <div className="flex items-center gap-4">
                      <Smartphone size={20} className={method === 'mpesa' ? 'text-accent' : 'theme-text-secondary'} />
                      <div className="text-left">
                        <p className="theme-text-primary font-orbitron text-xs font-bold">M-PESA</p>
                        <p className="theme-text-secondary text-[9px] uppercase">Direct STK Push</p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${method === 'mpesa' ? 'border-accent' : 'border-gray-600'}`}>
                      {method === 'mpesa' && <div className="w-2 h-2 bg-accent rounded-full" />}
                    </div>
                  </button>

                  <button 
                    onClick={() => setMethod('card')}
                    className={`flex items-center justify-between p-4 border transition-all ${method === 'card' ? 'border-accent theme-bg-tertiary shadow-[0_0_15px_rgba(250,30,78,0.1)]' : 'theme-border theme-bg-primary opacity-60 hover:opacity-100'}`}
                  >
                    <div className="flex items-center gap-4">
                      <CreditCard size={20} className={method === 'card' ? 'text-accent' : 'theme-text-secondary'} />
                      <div className="text-left">
                        <p className="theme-text-primary font-orbitron text-xs font-bold">STRIPE / CARD</p>
                        <p className="theme-text-secondary text-[9px] uppercase">Credit or Debit</p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${method === 'card' ? 'border-accent' : 'border-gray-600'}`}>
                      {method === 'card' && <div className="w-2 h-2 bg-accent rounded-full" />}
                    </div>
                  </button>
                </div>

                {/* Conditional Inputs */}
                <div className="animate-in fade-in duration-300">
                  {method === 'mpesa' ? (
                    <div className="space-y-4">
                      <label className="theme-text-secondary font-orbitron text-[10px] uppercase tracking-widest">Subscriber Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="07XX XXX XXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full theme-bg-primary border theme-border focus:border-accent outline-none py-4 px-4 theme-text-primary font-orbitron text-sm rounded-sm"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <label className="theme-text-secondary font-orbitron text-[10px] uppercase tracking-widest">Card Details</label>
                      <input 
                        type="text" 
                        placeholder="4444 4444 4444 4444"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full theme-bg-primary border theme-border focus:border-accent outline-none py-4 px-4 theme-text-primary font-orbitron text-sm rounded-sm mb-2"
                      />
                      <div className="grid grid-cols-2 gap-4">
                         <input type="text" placeholder="MM/YY" className="w-full theme-bg-primary border theme-border focus:border-accent outline-none py-4 px-4 theme-text-primary font-orbitron text-sm rounded-sm" />
                         <input type="text" placeholder="CVC" className="w-full theme-bg-primary border theme-border focus:border-accent outline-none py-4 px-4 theme-text-primary font-orbitron text-sm rounded-sm" />
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  onClick={handleProcessPayment}
                  disabled={method === 'mpesa' ? !phone : !cardNumber}
                  className="w-full bg-accent hover:opacity-90 disabled:opacity-30 text-white font-orbitron font-black py-5 rounded-sm transition-all shadow-accent flex items-center justify-center gap-3 group"
                >
                  INITIALIZE PAYMENT <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-700">
               <div className="relative mb-10">
                  <div className="absolute inset-0 bg-accent/20 blur-3xl animate-pulse" />
                  <Loader2 size={80} className="text-accent animate-spin relative z-10" />
                  <Cpu size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent animate-pulse" />
               </div>
               <h3 className="theme-text-primary font-orbitron font-black text-2xl mb-4 tracking-tight">STK_PUSH_PENDING</h3>
               <p className="theme-text-secondary font-orbitron text-sm uppercase tracking-widest text-center max-w-sm">
                 Connecting to {method === 'mpesa' ? 'Safaricom' : 'Stripe'} secure vault. Please approve on your device.
               </p>
               
               <div className="mt-12 w-full max-w-md h-1 bg-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-accent animate-[shimmer_2s_infinite] w-1/3" />
               </div>
               <div className="mt-4 flex gap-8">
                  <div className="text-center">
                    <span className="block text-accent font-orbitron font-bold text-xs">ENCRYPTION</span>
                    <span className="text-white/40 text-[9px] uppercase font-orbitron">Active (AES-256)</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-accent font-orbitron font-bold text-xs">LATENCY</span>
                    <span className="text-white/40 text-[9px] uppercase font-orbitron">12ms Response</span>
                  </div>
               </div>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center py-10 animate-in fade-in zoom-in-95 duration-1000">
               <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 size={48} className="text-green-500" />
               </div>
               <h3 className="theme-text-primary font-orbitron font-black text-3xl mb-2 tracking-tighter">ORDER_CONFIRMED</h3>
               <p className="text-green-500 font-orbitron text-[10px] uppercase tracking-[0.4em] mb-10">Uplink Stable // Hardware Reserved</p>
               
               <div className="w-full theme-bg-primary border theme-border p-8 rounded-sm grid grid-cols-2 gap-8 mb-10">
                  <div>
                    <span className="block text-white/40 font-orbitron text-[9px] uppercase mb-1">Grid ID</span>
                    <span className="theme-text-primary font-orbitron font-bold text-sm">GX-{Math.random().toString(36).substring(7).toUpperCase()}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-white/40 font-orbitron text-[9px] uppercase mb-1">Transit Estimated</span>
                    <span className="theme-text-primary font-orbitron font-bold text-sm">24-48 HOURS</span>
                  </div>
                  <div className="col-span-2 pt-4 border-t theme-border flex justify-between items-center">
                     <span className="theme-text-secondary font-orbitron text-xs">A confirmation blueprint has been sent to your uplink mail.</span>
                  </div>
               </div>

               <button 
                onClick={handleFinish}
                className="w-full md:w-auto bg-white text-black hover:bg-white/90 font-orbitron font-black py-4 px-16 rounded-sm transition-all shadow-xl flex items-center justify-center gap-3"
               >
                 RETURN TO MARKET
               </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default CheckoutModal;
