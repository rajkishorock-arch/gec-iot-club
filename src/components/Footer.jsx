import React from 'react';
import { Cpu, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from './SocialIcons';

export const Footer = ({ setActiveTab }) => {
  const handleNav = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-black text-white font-['General_Sans',sans-serif] relative overflow-hidden">
      
      {/* ================= 1. TOP CTA BANNER (Screenshot 5 Exact Recreation) ================= */}
      <section className="relative w-full py-20 sm:py-28 overflow-hidden flex flex-col items-center justify-center text-center px-4 sm:px-6">
        
        {/* Massive Glowing Cyan / Blue Aura Beam in Background */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1100px] h-[400px] sm:h-[500px] rounded-full blur-[160px] opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #00BFFB 0%, #0055ff 50%, transparent 80%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto space-y-4 sm:space-y-6">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Empowering IoT <br className="hidden sm:inline" />
            Innovation at GEC Khagaria
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-white/70 max-w-xl mx-auto font-normal leading-relaxed">
            Explore IoT, embedded systems, and hardware innovation with the IoT Club at Government Engineering College, Khagaria.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            
            {/* Create Account Button with Glowing Gradient Border */}
            <div 
              className="p-[1.5px] rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #FF8918 0%, #DA4E24 50%, #00BFFB 100%)",
                boxShadow: "0 0 25px rgba(255, 137, 24, 0.35)"
              }}
            >
              <button
                onClick={() => handleNav('signup')}
                className="px-6 py-3 rounded-2xl bg-black text-white text-xs sm:text-sm font-bold tracking-wide hover:bg-white/10 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* View Events Button */}
            <button
              onClick={() => handleNav('events')}
              className="px-6 py-3 rounded-2xl bg-white/5 border border-white/15 text-white text-xs sm:text-sm font-semibold tracking-wide hover:bg-white/10 hover:border-white/30 transition-all"
            >
              View Events
            </button>

          </div>
        </div>

      </section>

      {/* ================= 2. MODERN CARD FOOTER (Screenshot 5 Exact Recreation) ================= */}
      <footer className="container mx-auto px-4 sm:px-6 pb-12 relative z-10 max-w-6xl">
        <div className="rounded-3xl bg-[#030712] border border-white/10 p-8 sm:p-12 shadow-2xl space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            
            {/* Left Brand Column */}
            <div className="md:col-span-4 space-y-4">
              <div 
                onClick={() => handleNav('home')}
                className="flex items-center gap-3 cursor-pointer group select-none"
              >
                <div className="w-10 h-10 rounded-full bg-black border border-white/20 p-1 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                  <Cpu className="w-5 h-5 text-[#00BFFB]" />
                </div>
                <span className="font-bold text-lg tracking-tight text-white">
                  IoT Club
                </span>
              </div>

              <p className="text-xs sm:text-[13px] text-white/60 leading-relaxed max-w-sm">
                Official artificial intelligence & machine learning and Internet of Things chapter of Government Engineering College Khagaria under Department of Science & Technology, Bihar.
              </p>
            </div>

            {/* Column 1: Main Page */}
            <div className="md:col-span-2 md:col-start-6 space-y-3.5">
              <h4 className="text-xs font-bold text-white tracking-wider font-mono">
                Main Page
              </h4>
              <ul className="space-y-2 text-xs text-white/60">
                <li>
                  <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                    About College
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('about-club')} className="hover:text-white transition-colors">
                    About Club
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const el = document.getElementById('innovations');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                      else handleNav('home');
                    }} 
                    className="hover:text-white transition-colors"
                  >
                    Innovations
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('events')} className="hover:text-white transition-colors">
                    Events
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('team')} className="hover:text-white transition-colors">
                    Team
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Quick Links (with Admin Login & Faculty Portal) */}
            <div className="md:col-span-3 space-y-3.5">
              <h4 className="text-xs font-bold text-white tracking-wider font-mono">
                Quick Links
              </h4>
              <ul className="space-y-2 text-xs text-white/60">
                <li>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    GitHub Repo
                  </a>
                </li>
                <li>
                  <button onClick={() => handleNav('docs')} className="hover:text-white transition-colors">
                    Documentation
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('docs')} className="hover:text-white transition-colors">
                    Research Papers
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                    FAQ
                  </button>
                </li>
                {/* ADMIN LOGIN */}
                <li className="pt-1">
                  <button 
                    onClick={() => handleNav('admin')} 
                    className="text-amber-400 font-semibold hover:text-amber-300 transition-colors flex items-center gap-1"
                  >
                    <span>Admin Login</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 border border-amber-500/40">Console</span>
                  </button>
                </li>
                {/* FACULTY PORTAL */}
                <li>
                  <button 
                    onClick={() => handleNav('faculty-dashboard')} 
                    className="text-[#00BFFB] font-semibold hover:text-cyan-300 transition-colors flex items-center gap-1"
                  >
                    <span>Faculty Portal</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 border border-cyan-500/40">Advisors</span>
                  </button>
                </li>
                {/* STUDENT PORTAL */}
                <li>
                  <button 
                    onClick={() => handleNav('student-dashboard')} 
                    className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors flex items-center gap-1"
                  >
                    <span>Student Portal</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 border border-emerald-500/40">Dashboard</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Others */}
            <div className="md:col-span-2 space-y-3.5">
              <h4 className="text-xs font-bold text-white tracking-wider font-mono">
                Others
              </h4>
              <ul className="space-y-2 text-xs text-white/60">
                <li>
                  <button onClick={() => alert("Privacy Policy: All student data is stored securely per DST Bihar guidelines.")} className="hover:text-white transition-colors">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => alert("Terms & Condition: Institutional hardware access strictly for GEC Khagaria members.")} className="hover:text-white transition-colors">
                    Terms & Condition
                  </button>
                </li>
                <li>
                  <button onClick={() => alert("Code of Conduct: Academic integrity and respectful collaboration are mandatory.")} className="hover:text-white transition-colors">
                    Code of Conduct
                  </button>
                </li>
                <li>
                  <a href="https://geckhagaria.org" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    Official Portal
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Row: Copyright + Social Icons */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <p>
              © 2026 IoT Club, GEC Khagaria. All Rights Reserved.
            </p>

            <div className="flex items-center gap-4 text-white/60">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default Footer;
