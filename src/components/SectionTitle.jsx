import React from 'react';

export const SectionTitle = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`w-full bg-transparent flex flex-col items-center justify-center overflow-hidden py-4 sm:py-6 ${className}`}>
      
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-center text-white tracking-tight relative z-20 mb-2 sm:mb-3 font-['General_Sans',sans-serif]">
        {title}
      </h2>

      {/* Signature Cool Light Beam Animation */}
      <div className="w-full max-w-2xl h-10 sm:h-12 relative flex items-center justify-center pointer-events-none select-none">
        
        {/* Outer Indigo Glow Beams */}
        <div className="absolute inset-x-8 sm:inset-x-16 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm mx-auto shadow-[0_0_16px_rgba(99,102,241,0.8)]" />
        <div className="absolute inset-x-8 sm:inset-x-16 top-0 bg-gradient-to-r from-transparent via-indigo-400 to-transparent h-px w-3/4 mx-auto opacity-80" />

        {/* Center Sky-Blue Sharp Beams */}
        <div className="absolute inset-x-24 sm:inset-x-44 top-0 bg-gradient-to-r from-transparent via-[#00BFFB] to-transparent h-[3px] w-1/3 blur-[2px] mx-auto shadow-[0_0_18px_rgba(0,191,251,0.9)]" />
        <div className="absolute inset-x-24 sm:inset-x-44 top-0 bg-gradient-to-r from-transparent via-[#00BFFB] to-transparent h-[1.5px] w-1/3 mx-auto" />

        {/* Floating Sparkles & Radial Ambient Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-80 h-10 bg-[#00BFFB]/15 blur-xl rounded-full" />
        
        {/* Animated Sparkle Particles */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden [mask-image:radial-gradient(180px_40px_at_top,white,transparent)]">
          <div className="absolute w-1.5 h-1.5 rounded-full bg-white animate-ping opacity-75" style={{ left: '35%', top: '20%' }} />
          <div className="absolute w-1 h-1 rounded-full bg-[#00BFFB] animate-pulse opacity-90" style={{ left: '50%', top: '15%' }} />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-indigo-300 animate-ping opacity-60" style={{ left: '65%', top: '25%', animationDelay: '1s' }} />
          <div className="absolute w-1 h-1 rounded-full bg-white animate-pulse opacity-80" style={{ left: '42%', top: '35%', animationDelay: '0.5s' }} />
          <div className="absolute w-1 h-1 rounded-full bg-cyan-200 animate-pulse opacity-80" style={{ left: '58%', top: '30%', animationDelay: '1.2s' }} />
        </div>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-white/70 max-w-2xl sm:max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-center font-normal px-4 -mt-2 leading-relaxed font-['General_Sans',sans-serif]">
          {subtitle}
        </p>
      )}

    </div>
  );
};

export default SectionTitle;
