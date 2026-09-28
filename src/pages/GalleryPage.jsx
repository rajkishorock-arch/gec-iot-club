import React, { useState } from 'react';
import { Image as ImageIcon, Pin, X, Calendar, Filter } from 'lucide-react';
import { galleryItems } from '../data/mockData';

const GalleryPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activePhoto, setActivePhoto] = useState(null);

  const categories = ['All', 'Hackathons', 'Lab Sessions', 'Projects', 'Competitions'];

  const filteredPhotos = galleryItems.filter(item => {
    if (selectedFilter === 'All') return true;
    return item.category === selectedFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <ImageIcon className="w-4 h-4 text-cyan-400" />
          <span>Moments & Memories</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          IoT Club Gallery
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Glimpses into our soldering bootcamps, midnight hackathon marathons, national award ceremonies, and lab prototyping sessions.
        </p>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                selectedFilter === cat
                  ? 'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                  : 'bg-slate-900 text-slate-400 border border-white/5 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((item) => (
          <div 
            key={item.id}
            onClick={() => setActivePhoto(item)}
            className="group relative rounded-2xl overflow-hidden cursor-pointer glass-panel border border-white/10 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="h-64 w-full overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Pinned Badge */}
            {item.pinned && (
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold">
                <Pin className="w-3 h-3 fill-amber-300" />
                <span>Pinned</span>
              </div>
            )}

            {/* Bottom Caption */}
            <div className="absolute bottom-4 left-4 right-4 space-y-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                {item.category}
              </span>
              <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                <Calendar className="w-3 h-3 text-cyan-400" />
                <span>{item.date}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-4xl w-full glass-panel rounded-3xl overflow-hidden border border-white/20 p-2 bg-slate-950">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <img 
              src={activePhoto.image} 
              alt={activePhoto.title} 
              className="w-full max-h-[75vh] object-contain rounded-2xl"
            />

            <div className="p-4 sm:p-6 space-y-1 text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  {activePhoto.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {activePhoto.date}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {activePhoto.title}
              </h3>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default GalleryPage;
