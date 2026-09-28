import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import { useClub } from '../context/ClubContext';
import { Calendar, Award, ChevronDown, ChevronUp, Cpu, Radio, Sparkles, ExternalLink, ArrowRight, X } from 'lucide-react';

export const JourneyMilestonesSection = () => {
  const { milestones } = useClub();
  // Keep the first milestone open by default, users can toggle any step
  const [expandedIds, setExpandedIds] = useState({ [milestones[0]?.id || 'm-2026-sih']: true });
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const toggleExpand = (id) => {
    setExpandedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="relative w-full py-16 sm:py-24 bg-black text-white font-['General_Sans',sans-serif] overflow-hidden">
      
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/4 right-1/4 w-[600px] h-[400px] rounded-full blur-[180px] opacity-15 pointer-events-none"
        style={{ background: '#FF8918' }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        
        {/* Title with Signature Beam Animation */}
        <SectionTitle 
          title="IoT Club Journey & Milestones"
          subtitle="Chronicle of our major technical breakthroughs, national hackathon podiums, and expanding student research."
        />

        {/* Milestone Timeline Container */}
        <div className="relative w-full mt-12 sm:mt-16 pb-12 sm:pb-20">
          
          {/* Vertical Connecting Line */}
          <div className="absolute left-6 sm:left-8 md:left-10 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#FF8918] via-[#00BFFB] to-white/10 hidden sm:block" />

          {/* Milestone Items List */}
          <div className="space-y-10 sm:space-y-16">
            {milestones.map((item, index) => {
              const isExpanded = !!expandedIds[item.id];
              return (
                <div 
                  key={item.id} 
                  className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8 md:gap-12 relative"
                >
                  
                  {/* Left Column: Sticky Timeline Node Indicator */}
                  <div className="sticky top-28 sm:top-36 self-start flex sm:flex-col items-center gap-3 z-20 flex-shrink-0">
                    
                    {/* Glowing Circular Milestone Node */}
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black border-2 border-[#FF8918]/60 flex items-center justify-center shadow-[0_0_16px_rgba(255,137,24,0.45)] group cursor-pointer transition-transform hover:scale-110">
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#FF8918] animate-pulse" />
                    </div>

                    {/* Year Tag */}
                    <span className="text-xl sm:text-2xl font-black tracking-tight text-white/90 font-mono">
                      {item.year}
                    </span>
                  </div>

                  {/* Right Column: Step-by-Step Interactive Milestone Card */}
                  <div className="w-full flex-1">
                    <div 
                      className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                        isExpanded 
                          ? 'bg-[#060b18] border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(255,137,24,0.15)]'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                    >
                      
                      {/* Milestone Header (Clickable to open/close step-by-step) */}
                      <div 
                        onClick={() => toggleExpand(item.id)}
                        className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none group"
                      >
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FF8918]/15 text-[#FF8918] border border-[#FF8918]/30">
                              {item.badge}
                            </span>
                            <span className="text-xs text-white/50 font-mono flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-white/40" />
                              {item.date}
                            </span>
                          </div>

                          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#FF8918] transition-colors leading-snug">
                            {item.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-white/60 font-medium">
                            {item.subtitle}
                          </p>
                        </div>

                        {/* Interactive Expand Indicator */}
                        <div className="flex items-center gap-3 self-end md:self-center">
                          <span className="text-xs font-semibold text-white/50 group-hover:text-white transition-colors">
                            {isExpanded ? "Collapse Details" : "Expand Step"}
                          </span>
                          <div className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-[#FF8918] group-hover:text-black transition-all">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </div>
                      </div>

                      {/* Step-by-Step Unfolding Body */}
                      {isExpanded && (
                        <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-white/10 space-y-6 animate-fadeIn">
                          
                          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                            {item.description}
                          </p>

                          {/* Photo Preview & Stats Grid */}
                          {(() => {
                            const allImages = Array.isArray(item.images) && item.images.length > 0 
                              ? item.images 
                              : (item.image ? [item.image] : []);

                            return (
                              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                                
                                {/* Photo Preview / Adaptive Gallery */}
                                {allImages.length > 0 && (
                                  <div className="md:col-span-7 space-y-3">
                                    {allImages.length === 1 && (
                                      <div 
                                        onClick={() => setSelectedPhoto(allImages[0])}
                                        className="rounded-2xl overflow-hidden border border-white/15 shadow-xl relative aspect-video group/img cursor-pointer"
                                      >
                                        <img 
                                          src={allImages[0]} 
                                          alt={item.title}
                                          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/80">
                                          <span>GEC Khagaria Archives</span>
                                          <span className="text-[#FF8918]">Verified Achievement</span>
                                        </div>
                                      </div>
                                    )}

                                    {allImages.length === 2 && (
                                      <div className="grid grid-cols-2 gap-3">
                                        {allImages.map((img, i) => (
                                          <div 
                                            key={i}
                                            onClick={() => setSelectedPhoto(img)}
                                            className="rounded-2xl overflow-hidden border border-white/15 shadow-lg relative aspect-video group/img cursor-pointer"
                                          >
                                            <img src={img} alt={`Milestone visual ${i+1}`} className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300" />
                                            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[10px] font-mono text-white/80">Photo {i+1}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {allImages.length >= 3 && (
                                      <div className="grid grid-cols-3 gap-2.5">
                                        {allImages.slice(0, 3).map((img, i) => (
                                          <div 
                                            key={i}
                                            onClick={() => setSelectedPhoto(img)}
                                            className="rounded-xl overflow-hidden border border-white/15 shadow-md relative aspect-square group/img cursor-pointer"
                                          >
                                            <img src={img} alt={`Milestone visual ${i+1}`} className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300" />
                                            {i === 2 && allImages.length > 3 && (
                                              <div className="absolute inset-0 bg-black/70 flex items-center justify-center font-bold text-white text-sm font-mono backdrop-blur-xs">
                                                +{allImages.length - 3} More
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {allImages.length > 1 && (
                                      <p className="text-[11px] font-mono text-white/50 text-right">
                                        📷 {allImages.length} photos documented • Click any photo to expand
                                      </p>
                                    )}
                                  </div>
                                )}

                                {/* Key Performance Stats */}
                                <div className={`space-y-3 ${allImages.length > 0 ? 'md:col-span-5' : 'md:col-span-12'}`}>
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 font-mono">
                                    Milestone Metrics
                                  </h4>
                                  <div className="grid grid-cols-1 gap-2.5">
                                    {item.stats?.map((st, sIdx) => (
                                      <div 
                                        key={sIdx}
                                        className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"
                                      >
                                        <span className="text-xs text-white/70 font-medium">{st.label}</span>
                                        <span className="text-sm font-bold text-[#00BFFB] font-mono">{st.value}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                              </div>
                            );
                          })()}

                          {/* Tags Pills */}
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 pt-2">
                              {item.tags.map((tg, tIdx) => (
                                <span 
                                  key={tIdx}
                                  className="px-3 py-1 rounded-full text-[11px] font-mono bg-white/5 border border-white/10 text-white/70"
                                >
                                  #{tg}
                                </span>
                              ))}
                            </div>
                          )}

                        </div>
                      )}

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={selectedPhoto} 
              alt="Milestone visual expanded" 
              className="max-w-full max-h-[80vh] object-contain rounded-2xl border border-white/20 shadow-2xl" 
            />
            <div className="mt-3 text-xs font-mono text-white/70">
              GEC Khagaria IoT Club Milestone Archive • Click anywhere outside to close
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default JourneyMilestonesSection;
