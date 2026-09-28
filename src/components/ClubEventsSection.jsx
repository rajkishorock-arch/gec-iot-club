import React, { useState } from 'react';
import { useClub } from '../context/ClubContext';
import SectionTitle from './SectionTitle';
import ParticleWave from './ParticleWave';
import { GECButton } from './GECButton';
import { Calendar, Clock, MapPin, GraduationCap, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

export const ClubEventsSection = ({ setActiveTab, setSelectedEvent }) => {
  const { events } = useClub();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section id="events" className="relative w-full py-16 sm:py-24 bg-black text-white font-['General_Sans',sans-serif] overflow-hidden">
      
      {/* ================= 1. 3D PARTICLE WAVE BACKGROUND (Screenshot Exact Recreation) ================= */}
      <ParticleWave className="opacity-70" />

      {/* Ambient center cyan glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[160px] opacity-15 pointer-events-none"
        style={{ background: '#00BFFB' }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl space-y-10 sm:space-y-14">
        
        {/* Section Header with Signature Beam Animation */}
        <SectionTitle 
          title="Club Events & Hackathons"
          subtitle="Participate in high-stakes hackathons, national coding symposiums, and hands-on developer workshops."
        />

        {/* Featured Event Card matching Screenshot media_1790595135167.png */}
        <div className="space-y-8">
          {events.slice(0, 2).map((ev) => {
            const isCompleted = ev.status === 'Completed' || ev.status === 'completed';

            return (
              <div 
                key={ev.id}
                className="rounded-3xl p-6 sm:p-9 bg-[#040812]/95 border border-orange-500/40 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(255,137,24,0.15)] space-y-6 backdrop-blur-xl"
              >
                {/* Header: Competition Badge + Status Pill */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF8918]">
                    {ev.type || "COMPETITION"}
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#00ed64]/10 text-[#00ed64] border border-[#00ed64]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ed64] animate-pulse" />
                    <span>{isCompleted ? 'Completed' : 'Upcoming & Live'}</span>
                  </span>
                </div>

                {/* Event Main Title */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {ev.title}
                </h3>

                {/* Dual Showcase Grid: Left Poster + Right Video Player Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  
                  {/* Left: Event Poster Box */}
                  <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black group h-64 sm:h-76 shadow-2xl">
                    <img 
                      src={ev.banner || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"} 
                      alt={ev.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                      <div className="text-[11px] text-white/80">
                        <span className="text-[#00BFFB] font-bold block">GEC Khagaria Official</span>
                        <span>Hardware Competition</span>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-[#00BFFB] text-black font-bold text-[11px]">
                        REGISTER NOW &gt;
                      </span>
                    </div>
                  </div>

                  {/* Right: Live Video Player Preview with Progress Bar & Controls */}
                  <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black h-64 sm:h-76 shadow-2xl flex items-center justify-center group">
                    <video 
                      src="https://www.geckhaiml.live/static/media/hero-light-rays.336f4a014d904497efe2.mp4" 
                      autoPlay 
                      loop 
                      muted={isMuted}
                      playsInline
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 flex flex-col justify-between p-4">
                      
                      {/* Top Header */}
                      <div className="flex justify-between items-center text-xs font-mono text-white/80">
                        <span>Event Showcase Preview</span>
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-[#00ed64] border border-[#00ed64]/30">HD 1080p</span>
                      </div>

                      {/* Center Play Button */}
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mx-auto flex items-center justify-center text-white cursor-pointer group-hover:scale-110 transition-transform"
                      >
                        {isPlaying ? <Play className="w-5 h-5 fill-white ml-0.5" /> : <Pause className="w-5 h-5" />}
                      </button>

                      {/* Video Player Controls Bar matching Screenshot */}
                      <div className="space-y-1.5 pt-2">
                        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                          <div className="w-3/5 h-full bg-[#00BFFB]" />
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-mono text-white/70">
                          <div className="flex items-center gap-2">
                            <span>0:00 / 0:10</span>
                            <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white">
                              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                          <div className="flex items-center gap-1 hover:text-white cursor-pointer">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Bottom Info Strip matching Screenshot media_1790595135167.png */}
                <div className="p-4 rounded-2xl bg-black/60 border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                  
                  {/* Date */}
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#FF8918] flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-white/40 uppercase block">DATE</span>
                      <span className="text-white font-semibold">{ev.date || "Sep 26, 2026"}</span>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#00BFFB] flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-white/40 uppercase block">TIME</span>
                      <span className="text-white font-semibold">{ev.time || "2:00 PM - 5:00 PM"}</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-white/40 uppercase block">LOCATION</span>
                      <span className="text-white font-semibold truncate block max-w-[140px]">{ev.mode || "IoT Lab (Room 313)"}</span>
                    </div>
                  </div>

                  {/* Level */}
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-white/40 uppercase block">LEVEL</span>
                      <span className="text-white font-semibold">Beginner / Open</span>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ClubEventsSection;
