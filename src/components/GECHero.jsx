import React, { useState, useEffect } from 'react';
import { GECButton } from './GECButton';
import { ExternalLink, Sparkles, Send } from 'lucide-react';
import { useClub } from '../context/ClubContext';

export const GECHero = ({ setActiveTab, currentUser }) => {
  const { cmsContent } = useClub();
  // Live typing prompts
  const prompts = [
    "Explore upcoming IoT workshops & Smart India Hackathon (SIH)...",
    "Program microcontrollers with FreeRTOS & dual-core ESP32...",
    "Access student project repositories & circuit schematics...",
    "Connect with club mentors and hardware leads at GEC Khagaria..."
  ];

  const [promptIdx, setPromptIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedTag, setSelectedTag] = useState("Workshops");

  useEffect(() => {
    const current = prompts[promptIdx];
    const timer = setTimeout(() => {
      if (isDeleting) {
        if (typedText.length > 0) {
          setTypedText(current.slice(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setPromptIdx((prev) => (prev + 1) % prompts.length);
        }
      } else {
        if (typedText.length < current.length) {
          setTypedText(current.slice(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2400);
        }
      }
    }, isDeleting ? 30 : 65);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, promptIdx]);

  return (
    <div className="relative w-full min-h-[100dvh] min-[900px]:min-h-0 bg-black text-white overflow-hidden font-['General_Sans',sans-serif]">
      
      {/* Background Video Rays (exact asset from geckhaiml.live) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video 
          src="https://www.geckhaiml.live/static/media/hero-light-rays.336f4a014d904497efe2.mp4"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-85"
        />
        <img 
          src="https://www.geckhaiml.live/static/media/hero-gradient-bg.bce0ea03e62d9f95d1ab.webp"
          alt="Hero Gradient Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
        />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-10 min-[900px]:px-8 pt-36 sm:pt-44 min-[900px]:pt-52 pb-14 min-[900px]:pb-28 flex flex-col justify-center min-[900px]:justify-start min-[900px]:block">
        
        <div className="w-full min-[900px]:max-w-[720px] flex flex-col items-center text-center min-[900px]:items-start min-[900px]:text-left">
          
          {/* 1. Official Website Pill Badge */}
          <a
            href="https://www.geckhagaria.org.in"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center p-[1px] rounded-full mb-6 select-none transition-all cursor-pointer group hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)",
              boxShadow: "0 0 14px rgba(255, 137, 24, 0.22), 0 0 20px rgba(0, 152, 243, 0.18)"
            }}
          >
            <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black/90 backdrop-blur-md">
              <span className="text-[11px] sm:text-[12px] uppercase font-semibold tracking-[0.08em] text-white group-hover:text-white/95">
                {cmsContent?.heroBadge || "Official Website • GEC Khagaria"}
              </span>
              <span className="text-[12px] text-[#FF8918] group-hover:text-[#00BFFB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
                ↗
              </span>
            </div>
          </a>

          {/* 2. Main Title */}
          <h1 className="text-[43px] xs:text-[45px] sm:text-[56px] min-[900px]:text-[72px] font-semibold text-white tracking-[-0.03em] min-[900px]:tracking-[-0.035em] leading-[1.08] min-[900px]:leading-[1.05] w-full min-[900px]:max-w-[650px]">
            {cmsContent?.heroTitle ? (
              cmsContent.heroTitle
            ) : (
              <>
                Innovate Your IoT <br className="hidden sm:inline" />
                Prospects with <br className="hidden sm:inline" />
                IoT Club
              </>
            )}
          </h1>

          {/* 3. Subtitle */}
          <p className="mt-5 sm:mt-6 text-[15.5px] sm:text-[16.5px] text-white/80 max-w-[360px] sm:max-w-[480px] min-[900px]:max-w-[520px] mx-auto min-[900px]:mx-0 font-normal leading-[25px] sm:leading-[27px]">
            {cmsContent?.heroSubtitle || "Connect with campus peers, build smart connected hardware, and watch IoT shape the future - no prerequisites required. Get up and innovate together."}
          </p>

          {/* 4. Action Buttons with 3D Text Roll Hover Animation */}
          <div className="mt-10 sm:mt-11 flex flex-col sm:flex-row items-center gap-4 select-none w-full sm:w-auto relative z-10">
            <GECButton
              size="hero"
              onClick={() => {
                setActiveTab(currentUser ? 'student-dashboard' : 'auth');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {currentUser ? 'Go to Dashboard' : 'Create Account'}
            </GECButton>

            <GECButton
              size="hero"
              variant="glass"
              onClick={() => {
                setActiveTab('join');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Join the Community
            </GECButton>
          </div>

        </div>

        {/* 5. Floating Interactive Studio Box & 3D Tilted Dashboard Preview */}
        <div className="hidden min-[900px]:block relative mt-20 min-[900px]:mt-24 w-full max-w-[1310px] mx-auto select-none pb-8 sm:pb-12">
          
          {/* Ambient Glowing Orbs */}
          <div className="absolute -left-12 top-1/4 w-80 h-80 rounded-full bg-[#DA4E24] opacity-30 blur-[110px] pointer-events-none" aria-hidden="true" />
          <div className="absolute -right-12 top-1/4 w-80 h-80 rounded-full bg-[#00BFFB] opacity-35 blur-[110px] pointer-events-none" aria-hidden="true" />

          {/* Studio Prompt Box with Rotating Conic Gradient */}
          <div className="relative z-30 w-full max-w-[640px] mx-auto -mb-16 sm:-mb-24 px-3">
            <div className="relative p-[1.5px] rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(255,137,24,0.18)]">
              
              {/* Rotating Conic Border */}
              <div 
                className="absolute -inset-[150%] origin-center pointer-events-none animate-spin-slow"
                style={{
                  background: "conic-gradient(from 0deg, transparent 0deg, #FF8918 45deg, #DA4E24 95deg, transparent 155deg, #00BFFB 225deg, #0098F3 275deg, transparent 335deg)"
                }}
              />

              {/* Studio Body */}
              <div className="relative bg-black rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs font-medium text-white/90">
                    <span className="text-xs">✨</span>
                    <span>IoT Studio</span>
                    <span className="text-[10px] text-white/50 ml-0.5">▼</span>
                  </div>
                  <button className="w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors">
                    <span className="text-sm">🌐</span>
                  </button>
                </div>

                {/* Auto typing terminal line */}
                <div className="min-h-[34px] flex items-center px-0.5">
                  <span className="text-white text-[15.5px] sm:text-[16.5px] font-medium tracking-normal">
                    {typedText}
                  </span>
                  <span className="w-[1.5px] h-4.5 bg-white ml-0.5 animate-pulse" />
                </div>

                {/* Tag selection pills & Send trigger */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    {["Workshops", "Projects", "Hackathons"].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-3 py-1 rounded-[6px] text-xs font-medium transition-all ${
                          selectedTag === tag 
                            ? 'bg-white/[0.12] text-white border border-white/20' 
                            : 'bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.08] border border-transparent'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <div 
                    className="p-[1px] rounded-[8px]" 
                    style={{
                      background: "linear-gradient(135deg, #FF8918, #00BFFB)",
                      boxShadow: "0 0 10px rgba(255,137,24,0.25)"
                    }}
                  >
                    <button 
                      onClick={() => setActiveTab('events')}
                      className="px-4 py-1.5 rounded-[7px] bg-black text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer select-none hover:bg-black/80 transition-colors"
                    >
                      <span className="text-[#FF8918] text-xs">▲</span>
                      <span>Explore</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Floating 3D Tilted Dashboard Preview Card */}
          <div className="relative z-10 rounded-xl sm:rounded-2xl p-[1px] bg-gradient-to-b from-white/[0.16] via-white/[0.05] to-transparent shadow-[0_30px_90px_rgba(0,0,0,0.98)] overflow-hidden">
            <div className="relative bg-black rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.08]">
              <img 
                src="https://www.geckhaiml.live/static/media/hero-dashboard-full.88e4feaf95f0e9062903.webp"
                alt="GEC Khagaria IoT Club Dashboard Workspace"
                className="w-full h-auto object-cover opacity-95 rounded-xl sm:rounded-2xl transition-transform duration-700 hover:scale-[1.01]"
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
