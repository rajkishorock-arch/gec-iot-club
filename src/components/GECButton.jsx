import React from 'react';
import { ArrowRight } from 'lucide-react';

export const GECButton = ({ 
  children, 
  onClick, 
  className = "", 
  size = "default",
  showArrow = true,
  variant = "gradient" // 'gradient' | 'glass'
}) => {
  const isHero = size === "hero";
  const isFull = className?.includes("w-full");

  if (variant === "glass") {
    return (
      <div 
        onClick={onClick}
        className={`relative group cursor-pointer inline-flex items-center flex-shrink-0 select-none ${isFull ? 'w-full' : ''}`}
      >
        <div className={`relative ${isHero ? 'h-[50px]' : 'h-[44px]'} px-7 sm:px-8 rounded-[12px] bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.16] hover:border-white/40 shadow-[0_4px_24px_rgba(0,0,0,0.6)] backdrop-blur-xl text-white text-[14.5px] sm:text-[15px] font-medium transition-all duration-200 flex items-center justify-center cursor-pointer overflow-hidden select-none ${isFull ? 'w-full' : ''} ${className}`}>
          <div className="relative overflow-hidden h-[20px] flex items-center justify-center">
            <span className="inline-block transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[140%]">
              {children}
            </span>
            <span aria-hidden="true" className="absolute inline-block transform translate-y-[140%] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 text-white">
              {children}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Signature GEC Gradient Button with text-roll hover effect
  return (
    <div 
      onClick={onClick}
      className={`relative group cursor-pointer inline-flex items-center flex-shrink-0 select-none ${isFull ? 'w-full' : ''}`}
    >
      {/* Blurred glowing backdrop */}
      {isHero ? (
        <div 
          className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3/4 h-5 rounded-full bg-[#DA4E24] opacity-50 blur-md pointer-events-none group-hover:opacity-85 transition-opacity duration-300"
          aria-hidden="true" 
        />
      ) : (
        <div 
          className="absolute -top-1.5 -right-1.5 w-12 h-6 rounded-full bg-[#DA4E24] opacity-60 blur-md pointer-events-none group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true" 
        />
      )}

      {/* Gradient Outer Border */}
      <div 
        className={`relative p-[1.5px] transition-all duration-200 active:scale-[0.98] flex items-center ${isHero ? 'h-[50px] rounded-[12px]' : 'h-[38px] rounded-[9px]'} ${isFull ? 'w-full' : ''}`}
        style={{
          background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)",
          boxShadow: isHero ? "0 0 14px rgba(255, 137, 24, 0.25), 0 2px 8px rgba(0,0,0,0.5)" : "0 0 12px rgba(255, 137, 24, 0.22)"
        }}
      >
        {/* Inner Black Capsule */}
        <div className={`relative bg-black text-white font-medium tracking-tight overflow-hidden flex items-center justify-center whitespace-nowrap ${isHero ? 'h-[47px] px-8 rounded-[11px] text-[15px]' : 'h-[35px] px-5 rounded-[8px] text-[13.5px]'} ${isFull ? 'w-full' : ''} ${className}`}>
          
          {/* Dual rolling text wrapper */}
          <div className="relative overflow-hidden h-[20px] flex items-center justify-center">
            
            {/* Primary line (slides UP on hover) */}
            <span className="inline-flex items-center gap-1.5 transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[140%]">
              <span>{children}</span>
              {showArrow && (
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              )}
            </span>

            {/* Secondary line (slides IN from bottom on hover) */}
            <span aria-hidden="true" className="absolute inline-flex items-center gap-1.5 transform translate-y-[140%] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 text-white">
              <span>{children}</span>
              {showArrow && (
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              )}
            </span>

          </div>

        </div>
      </div>
    </div>
  );
};
