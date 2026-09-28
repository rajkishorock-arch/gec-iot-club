import React from 'react';
import { User, Contact, Check } from 'lucide-react';

export const ThreeStepsSection = () => {
  return (
    <section className="max-w-[1320px] mx-auto px-5 sm:px-8 py-16 sm:py-24 font-['General_Sans',sans-serif]">
      
      {/* Heading with Cyan Glowing Line */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-14 sm:mb-16">
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
          Three Steps to Participate
        </h2>
        
        {/* Cyan Glowing Horizontal Accent Line */}
        <div className="w-24 h-[2.5px] mx-auto bg-[#00BFFB] rounded-full shadow-[0_0_12px_#00BFFB]" />

        <p className="text-sm sm:text-base text-white/70 max-w-lg mx-auto pt-1 leading-relaxed">
          Follow these simple steps to join our upcoming hackathons, tech workshops, and community events.
        </p>
      </div>

      {/* 3 Step Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: 1. Create an account */}
        <div className="rounded-3xl p-6 sm:p-7 bg-[#050914] border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#FF8918]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#00BFFB]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Graphic: 2 connected boxes */}
          <div className="relative z-10 h-48 sm:h-52 rounded-2xl bg-black/60 border border-white/5 flex flex-col items-center justify-center p-4">
            
            {/* Box 1: Create an Account */}
            <div className="w-full max-w-[210px] py-2.5 px-4 rounded-xl bg-black border border-white/15 flex items-center gap-3 shadow-md group-hover:border-[#00BFFB]/40 transition-colors">
              <User className="w-4 h-4 text-white/90" />
              <span className="text-xs font-medium text-white">Create an Account</span>
            </div>

            {/* Connecting Vertical Dotted Line */}
            <div className="w-[1.5px] h-6 border-l-2 border-dashed border-white/20 my-1" />

            {/* Box 2: Create a Profile */}
            <div className="w-full max-w-[210px] py-2.5 px-4 rounded-xl bg-black border border-white/15 flex items-center gap-3 shadow-md group-hover:border-[#FF8918]/40 transition-colors">
              <Contact className="w-4 h-4 text-white/90" />
              <span className="text-xs font-medium text-white">Create a Profile</span>
            </div>

          </div>

          {/* Text Description */}
          <div className="pt-6 relative z-10 space-y-2">
            <h3 className="text-lg font-bold text-white tracking-tight">
              1. Create an account
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Sign up on the IoT Club portal with your college email and set up your student profile in minutes.
            </p>
          </div>
        </div>

        {/* CARD 2: 2. Go to the events section */}
        <div className="rounded-3xl p-6 sm:p-7 bg-[#050914] border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#00BFFB]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#FF8918]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Graphic: Pills Grid */}
          <div className="relative z-10 h-48 sm:h-52 rounded-2xl bg-black/60 border border-white/5 flex flex-col items-center justify-center p-4 gap-2.5">
            {/* Row 1 */}
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-full bg-black border border-white/15 text-[11px] font-medium text-white/90 flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8918]" />
                <span>SIH</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-black border border-white/15 text-[11px] font-medium text-white/90 flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFB]" />
                <span>Workshops</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-black border border-white/15 text-[11px] font-medium text-white/90 flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8918]" />
                <span>Seminars</span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-full bg-black border border-white/15 text-[11px] font-medium text-white/90 flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                <span>Hackathons</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-black border border-white/15 text-[11px] font-medium text-white/90 flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                <span>Hardware</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-black border border-white/15 text-[11px] font-medium text-white/90 flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                <span>Certificates</span>
              </div>
            </div>
          </div>

          {/* Text Description */}
          <div className="pt-6 relative z-10 space-y-2">
            <h3 className="text-lg font-bold text-white tracking-tight">
              2. Go to the events section
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Explore upcoming hackathons, hands-on workshops, and tech seminars to find what excites you.
            </p>
          </div>
        </div>

        {/* CARD 3: 3. Fill your details and register */}
        <div className="rounded-3xl p-6 sm:p-7 bg-[#050914] border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#FF8918]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#00BFFB]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Graphic: Glowing 3D Checkmark Box */}
          <div className="relative z-10 h-48 sm:h-52 rounded-2xl bg-black/60 border border-white/5 flex items-center justify-center p-4">
            <div 
              className="w-20 h-20 rounded-2xl p-[2px] transition-transform duration-300 group-hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #FF8918 0%, #00BFFB 100%)",
                boxShadow: "0 0 25px rgba(0, 191, 251, 0.25), 0 0 25px rgba(255, 137, 24, 0.2)"
              }}
            >
              <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center">
                <Check className="w-9 h-9 text-[#00BFFB] group-hover:text-[#FF8918] transition-colors stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* Text Description */}
          <div className="pt-6 relative z-10 space-y-2">
            <h3 className="text-lg font-bold text-white tracking-tight">
              3. Fill your details and register
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Complete your registration individually or with your team and secure your confirmed spot instantly.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
};
