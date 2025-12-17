
import React, { useState } from 'react';
import { Play, X, Info, Zap, Calendar } from 'lucide-react';

interface Trailer {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  date: string;
  category: string;
  description: string;
}

const TRAILERS: Trailer[] = [
  {
    id: 't1',
    title: 'Titan-X Unleashed: OLED Revolution',
    thumbnail: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=800',
    duration: '2:15',
    date: 'May 2024',
    category: 'Hardware',
    description: 'Experience the world\'s fastest gaming laptop. 240Hz OLED meets liquid metal cooling.'
  },
  {
    id: 't2',
    title: 'GX-9000 Phantom Architecture',
    thumbnail: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800',
    duration: '1:45',
    date: 'April 2024',
    category: 'GPU',
    description: 'A deep dive into the 24GB GDDR6X beast that powers the next generation of immersion.'
  },
  {
    id: 't3',
    title: 'Zero-G: The Speed of Light',
    thumbnail: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
    duration: '1:10',
    date: 'March 2024',
    category: 'Peripherals',
    description: '49 grams. 32K DPI. Wireless latency that feels like a wired connection.'
  },
  {
    id: 't4',
    title: 'NeonPulse Soundscapes',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    duration: '3:20',
    date: 'February 2024',
    category: 'Audio',
    description: 'Planar magnetic drivers meet spatial audio. Hear every footstep before it happens.'
  }
];

const Trailers: React.FC = () => {
  const [activeTrailer, setActiveTrailer] = useState<Trailer | null>(null);

  return (
    <section className="container mx-auto px-8 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12">
        <h2 className="text-4xl font-orbitron font-black mb-2 flex items-center gap-4">
          <Play size={32} className="text-[#fa1e4e]" />
          MISSION <span className="text-[#fa1e4e]">BRIEFINGS</span>
        </h2>
        <p className="text-gray-500 font-orbitron text-xs tracking-widest uppercase">Cinematic hardware showcases & development logs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {TRAILERS.map(trailer => (
          <div 
            key={trailer.id}
            onClick={() => setActiveTrailer(trailer)}
            className="group relative bg-[#161618] border border-gray-800 hover:border-[#fa1e4e] transition-all duration-500 overflow-hidden cursor-pointer"
          >
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={trailer.thumbnail} 
                alt={trailer.title} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d] via-transparent to-transparent opacity-80" />
              
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
                  <h3 className="text-white font-orbitron font-bold text-lg leading-tight group-hover:text-[#fa1e4e] transition-colors">
                    {trailer.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-xs font-orbitron">
                  <span className="bg-black/50 px-2 py-1 rounded-sm">{trailer.duration}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-800 bg-[#161618]">
              <div className="flex items-center gap-4 text-gray-500 text-[10px] font-orbitron uppercase tracking-widest mb-4">
                <div className="flex items-center gap-1">
                  <Calendar size={12} /> {trailer.date}
                </div>
                <div className="flex items-center gap-1">
                  <Zap size={12} /> HD ULTRA
                </div>
              </div>
              <p className="text-gray-400 text-sm line-clamp-2">
                {trailer.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Trailer Modal (Simulation) */}
      {activeTrailer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12">
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={() => setActiveTrailer(null)}
          />
          <div className="relative w-full max-w-6xl aspect-video bg-black border border-gray-800 shadow-[0_0_50px_rgba(0,0,0,1)] flex flex-col animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setActiveTrailer(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#fa1e4e] transition-colors flex items-center gap-2 font-orbitron text-sm"
            >
              CLOSE TERMINAL <X size={24} />
            </button>
            
            <div className="flex-1 relative flex items-center justify-center bg-gray-900 overflow-hidden">
               {/* Simulating a Video Player UI */}
               <img 
                 src={activeTrailer.thumbnail} 
                 className="w-full h-full object-cover blur-sm opacity-30" 
                 alt="video background" 
               />
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                 <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#fa1e4e] animate-spin-slow absolute" />
                 <Play size={48} className="text-[#fa1e4e] animate-pulse" />
                 <h2 className="mt-8 text-4xl font-orbitron font-black text-white">{activeTrailer.title}</h2>
                 <p className="mt-4 text-gray-400 font-orbitron text-sm max-w-lg">BUFFERING MISSION DATA STREAM...</p>
                 <div className="mt-8 w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="bg-[#fa1e4e] h-full w-[45%] animate-[loading_2s_infinite_linear]" />
                 </div>
               </div>

               <style>{`
                 @keyframes loading {
                   0% { transform: translateX(-100%); }
                   100% { transform: translateX(200%); }
                 }
                 .animate-spin-slow {
                   animation: spin 10s linear infinite;
                 }
               `}</style>
            </div>

            <div className="bg-[#0b0b0d] p-6 border-t border-gray-800 flex justify-between items-center">
              <div>
                <h4 className="text-[#fa1e4e] font-orbitron font-bold text-lg">{activeTrailer.title}</h4>
                <p className="text-gray-500 text-xs font-orbitron">{activeTrailer.description}</p>
              </div>
              <button className="bg-[#fa1e4e] hover:bg-[#ff4e7e] text-white font-orbitron font-bold py-3 px-8 rounded-sm transition-all flex items-center gap-2">
                <Info size={18} /> VIEW GEAR SPECS
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Trailers;
