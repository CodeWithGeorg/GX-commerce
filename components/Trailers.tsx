
import React, { useState, useEffect } from 'react';
import { Play, X, Info, Zap, Calendar, Box, Database, Cpu, Activity, ArrowLeft } from 'lucide-react';

interface Trailer {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  date: string;
  category: string;
  description: string;
  technicalSpecs: string[];
}

const TRAILERS: Trailer[] = [
  {
    id: 't1',
    title: 'Titan-X Unleashed: OLED Revolution',
    thumbnail: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-high-tech-digital-data-processing-screen-34989-large.mp4',
    duration: '2:15',
    date: 'May 2025',
    category: 'Hardware',
    description: 'Experience the world\'s fastest gaming laptop. 240Hz OLED meets liquid metal cooling.',
    technicalSpecs: ['CPU: i9-13980HX', 'GPU: RTX 4090 Mobile', 'Panel: 240Hz OLED', 'RAM: 64GB DDR5']
  },
  {
    id: 't2',
    title: 'GX-9000 Phantom Architecture',
    thumbnail: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-details-and-components-close-up-34988-large.mp4',
    duration: '1:45',
    date: 'April 2025',
    category: 'GPU',
    description: 'A deep dive into the 24GB GDDR6X beast that powers the next generation of immersion.',
    technicalSpecs: ['Cores: 16384 CUDA', 'VRAM: 24GB GDDR6X', 'TDP: 450W', 'Bus: 384-bit']
  },
  {
    id: 't3',
    title: 'Zero-G: The Speed of Light',
    thumbnail: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-technological-glowing-particles-in-motion-34987-large.mp4',
    duration: '1:10',
    date: 'March 2025',
    category: 'Peripherals',
    description: '49 grams. 32K DPI. Wireless latency that feels like a wired connection.',
    technicalSpecs: ['Weight: 49g', 'Sensor: GX-Optical 3.0', 'Polling: 8000Hz', 'Battery: 100h']
  },
  {
    id: 't4',
    title: 'NeonPulse Soundscapes',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-electronic-circuit-board-34985-large.mp4',
    duration: '3:20',
    date: 'February 2025',
    category: 'Audio',
    description: 'Planar magnetic drivers meet spatial audio. Hear every footstep before it happens.',
    technicalSpecs: ['Drivers: 100mm Planar', 'Spatial: THX 7.1', 'Frequency: 5Hz - 50kHz', 'Weight: 320g']
  }
];

const Trailers: React.FC = () => {
  const [activeTrailer, setActiveTrailer] = useState<Trailer | null>(null);
  const [viewMode, setViewMode] = useState<'video' | 'specs'>('video');

  const handleOpenTrailer = (trailer: Trailer) => {
    setActiveTrailer(trailer);
    setViewMode('video');
  };

  return (
    <section className="container mx-auto px-8 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12">
        <h2 className="text-4xl font-orbitron font-black mb-2 flex items-center gap-4 theme-text-primary">
          <Play size={32} className="text-[#fa1e4e]" />
          MISSION <span className="text-[#fa1e4e]">BRIEFINGS</span>
        </h2>
        <p className="theme-text-secondary font-orbitron text-xs tracking-widest uppercase">Cinematic hardware showcases & development logs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {TRAILERS.map(trailer => (
          <div 
            key={trailer.id}
            onClick={() => handleOpenTrailer(trailer)}
            className="group relative theme-bg-secondary border theme-border hover:border-[#fa1e4e] transition-all duration-500 overflow-hidden cursor-pointer shadow-lg"
          >
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={trailer.thumbnail} 
                alt={trailer.title} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-80" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-[#fa1e4e] flex items-center justify-center shadow-[0_0_20px_#fa1e4e]">
                  <Play size={30} fill="white" className="ml-1 text-white" />
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-orbitron text-[#fa1e4e] uppercase tracking-widest mb-1 block">
                    {trailer.category}
                  </span>
                  <h3 className="theme-text-primary font-orbitron font-bold text-lg leading-tight group-hover:text-[#fa1e4e] transition-colors">
                    {trailer.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3 theme-text-secondary text-xs font-orbitron">
                  <span className="theme-bg-primary/80 px-2 py-1 rounded-sm border theme-border">{trailer.duration}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t theme-border theme-bg-secondary">
              <div className="flex items-center gap-4 theme-text-secondary text-[10px] font-orbitron uppercase tracking-widest mb-4">
                <div className="flex items-center gap-1">
                  <Calendar size={12} /> {trailer.date}
                </div>
                <div className="flex items-center gap-1">
                  <Zap size={12} /> 4K ULTIMATE
                </div>
              </div>
              <p className="theme-text-secondary text-sm line-clamp-2">
                {trailer.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modern Modal Interface */}
      {activeTrailer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12">
          <div 
            className="absolute inset-0 bg-black/98 backdrop-blur-xl"
            onClick={() => setActiveTrailer(null)}
          />
          
          <div className="relative w-full max-w-6xl aspect-video theme-bg-primary border theme-border shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col animate-in zoom-in-95 duration-300 overflow-hidden">
            
            {/* Modal HUD Elements */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#fa1e4e]/30 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#fa1e4e]/30 pointer-events-none" />
            
            {/* Header Controls */}
            <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
               {viewMode === 'specs' && (
                 <button 
                  onClick={() => setViewMode('video')}
                  className="theme-text-primary hover:text-[#fa1e4e] transition-colors flex items-center gap-2 font-orbitron text-[10px] tracking-widest uppercase bg-black/40 px-4 py-2 rounded-sm border theme-border"
                 >
                   <ArrowLeft size={14} /> Back to Briefing
                 </button>
               )}
               <button 
                onClick={() => setActiveTrailer(null)}
                className="theme-text-primary hover:text-[#fa1e4e] transition-colors flex items-center gap-2 font-orbitron text-[10px] tracking-widest uppercase bg-black/40 px-4 py-2 rounded-sm border theme-border"
               >
                <X size={16} /> Disconnect
               </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative bg-black overflow-hidden">
              
              {viewMode === 'video' ? (
                /* ACTUAL VIDEO PLAYER */
                <div className="w-full h-full relative">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover"
                    key={activeTrailer.videoUrl}
                  >
                    <source src={activeTrailer.videoUrl} type="video/mp4" />
                  </video>
                  
                  {/* Digital HUD Overlay */}
                  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-12">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[#fa1e4e] font-orbitron text-xs font-bold animate-pulse">
                          <Activity size={14} /> LIVE_FEED_01
                        </div>
                        <div className="text-white/40 font-mono text-[10px]">LOC: 34.0522° N, 118.2437° W</div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-white/40 font-mono text-[10px]">REC_TIME: {activeTrailer.duration}</div>
                        <div className="text-[#fa1e4e] font-orbitron text-[10px] tracking-widest">SIGNAL_STRENGTH: 100%</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* 3D SPEC VIEWER MODE */
                <div className="w-full h-full flex flex-col md:flex-row items-center justify-center p-8 md:p-16 gap-12 relative">
                  {/* 3D Scanning Background */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none" 
                       style={{ backgroundImage: 'radial-gradient(circle, #fa1e4e 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                  
                  {/* Simulated 3D Model Container */}
                  <div className="relative w-full md:w-1/2 aspect-square flex items-center justify-center perspective-[1000px]">
                    <div className="absolute inset-0 flex items-center justify-center animate-pulse opacity-20">
                      <div className="w-full h-full rounded-full border border-dashed border-[#fa1e4e] animate-[spin_20s_linear_infinite]" />
                    </div>
                    
                    {/* The "3D" Hardware Image */}
                    <div className="relative z-10 w-4/5 h-4/5 transition-all duration-700 hover:scale-110"
                         style={{ 
                            transformStyle: 'preserve-3d', 
                            animation: 'orbit 10s linear infinite'
                         }}>
                      <img 
                        src={activeTrailer.thumbnail} 
                        className="w-full h-full object-contain drop-shadow-[0_0_30px_#fa1e4e]" 
                        alt="3D Scan"
                      />
                      {/* Wireframe Glow Effect */}
                      <div className="absolute inset-0 border-2 border-[#fa1e4e] opacity-20 mix-blend-screen scale-105" />
                    </div>
                  </div>

                  {/* Technical Data Side Panel */}
                  <div className="w-full md:w-1/2 space-y-8 relative z-20">
                    <div>
                      <h2 className="text-3xl font-orbitron font-black text-[#fa1e4e] mb-2">{activeTrailer.title}</h2>
                      <p className="theme-text-secondary font-orbitron text-xs uppercase tracking-[0.3em]">Hardware Analysis v2.5</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {activeTrailer.technicalSpecs.map((spec, i) => (
                        <div key={i} className="theme-bg-tertiary border-l-4 border-[#fa1e4e] p-4 flex items-center justify-between group hover:bg-[#fa1e4e]/10 transition-all duration-300">
                           <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-[#fa1e4e]/10 flex items-center justify-center">
                               <Cpu size={14} className="text-[#fa1e4e]" />
                             </div>
                             <span className="theme-text-primary font-orbitron text-xs tracking-wider">{spec}</span>
                           </div>
                           <Database size={14} className="text-gray-600 group-hover:text-[#fa1e4e] transition-colors" />
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t theme-border flex gap-6">
                      <div className="flex flex-col">
                        <span className="text-gray-500 font-orbitron text-[10px] uppercase">Analysis</span>
                        <span className="text-green-500 font-orbitron font-bold text-sm">OPTIMAL</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 font-orbitron text-[10px] uppercase">Power Draw</span>
                        <span className="text-[#fa1e4e] font-orbitron font-bold text-sm">MAXIMUM</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Bar */}
            <div className="theme-bg-secondary p-6 border-t theme-border flex flex-col sm:flex-row justify-between items-center gap-4 z-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#fa1e4e]/10 flex items-center justify-center border border-[#fa1e4e]/30">
                  <Box size={20} className="text-[#fa1e4e]" />
                </div>
                <div>
                  <h4 className="text-white font-orbitron font-bold text-base uppercase tracking-wider">{activeTrailer.title}</h4>
                  <p className="text-gray-500 text-[10px] font-orbitron uppercase tracking-tighter">
                    {viewMode === 'video' ? 'Now Playing: Broadcast Stream' : 'Tactical Display: Component Breakdown'}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => setViewMode(viewMode === 'video' ? 'specs' : 'video')}
                className="bg-[#fa1e4e] hover:bg-[#ff4e7e] text-white font-orbitron font-bold py-3 px-10 rounded-sm transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(250,30,78,0.4)] group"
              >
                {viewMode === 'video' ? (
                  <>
                    <Info size={18} className="group-hover:rotate-12 transition-transform" /> VIEW GEAR SPECS
                  </>
                ) : (
                  <>
                    <Play size={18} fill="white" className="group-hover:scale-110 transition-transform" /> WATCH TRAILER
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes orbit {
          0% { transform: rotateY(0deg) translateY(0); }
          50% { transform: rotateY(180deg) translateY(-20px); }
          100% { transform: rotateY(360deg) translateY(0); }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default Trailers;
