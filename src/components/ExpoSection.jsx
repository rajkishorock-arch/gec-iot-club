import React from 'react';
import { Check } from 'lucide-react';

export const ExpoSection = () => {
  const checkItems = [
    "IoT Innovation & Ideathon",
    "Smart Hardware & Embedded Challenges",
    "Hands-on Learning",
    "Career & Industry Exposure"
  ];

  const expoPhotos = [
    {
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      caption: "GEC Khagaria Auditorium Assembly"
    },
    {
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      caption: "Hardware Prototype Showcase to Faculty Mentors"
    },
    {
      url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
      caption: "Hands-on Sensor Soldering Demonstration"
    },
    {
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      caption: "SIH Finalists Project Discussion & Award Stage"
    }
  ];

  return (
    <section className="max-w-[1320px] mx-auto px-5 sm:px-8 py-16 sm:py-24 font-['General_Sans',sans-serif]">
      
      {/* Top Banner Row: Left Glowing Title + Right Description & Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
        
        {/* Left: Glowing Ring & Big Title */}
        <div className="lg:col-span-4 flex items-center gap-4">
          {/* Glowing Orange Ring with Center Dot */}
          <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
            <div className="w-12 h-12 rounded-full border-2 border-[#FF8918]/60 shadow-[0_0_20px_#FF8918] animate-pulse" />
            <div className="absolute w-4 h-4 rounded-full bg-[#FF8918] shadow-[0_0_12px_#FF8918]" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            IOTXPO'26
          </h2>
        </div>

        {/* Right: Description & Checklist */}
        <div className="lg:col-span-8 space-y-4">
          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
            In 2026, we successfully organized <strong>IOTXPO'26</strong>, bringing together students, innovators, and technology enthusiasts from across Government Engineering College, Khagaria.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {checkItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-white/90">
                <div className="w-4 h-4 rounded bg-[#00ed64]/20 border border-[#00ed64]/40 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-[#00ed64] stroke-[3]" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 2x2 College Event Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {expoPhotos.map((photo, i) => (
          <div 
            key={i} 
            className="group relative rounded-2xl overflow-hidden border border-white/10 h-64 sm:h-72 bg-black shadow-lg"
          >
            <img 
              src={photo.url} 
              alt={photo.caption} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <span className="text-xs font-medium text-white/90 drop-shadow-md">
                {photo.caption}
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
