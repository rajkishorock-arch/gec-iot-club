import React, { useState } from 'react';
import { GECButton } from './GECButton';
import { Menu, X, Cpu } from 'lucide-react';

export const GECNavbar = ({ activeTab, setActiveTab, currentUser }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About College' },
    { id: 'about-club', name: 'About Club' },
    { id: 'events', name: 'Events' },
    { id: 'team', name: 'Team' },
    { id: 'gallery', name: 'Gallery' },
    { id: 'contact', name: 'Contact' }
  ];

  const handleLinkClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-11 sm:top-12 left-1/2 -translate-x-1/2 z-40 w-full max-w-[1260px] px-3 sm:px-6 pointer-events-none">
      
      {/* Floating Capsule Bar */}
      <div className="w-full bg-black/75 hover:bg-black/85 backdrop-blur-2xl border border-white/10 rounded-full h-14 sm:h-16 px-4 sm:px-7 flex items-center justify-between shadow-[0_12px_40px_rgba(0,0,0,0.7)] transition-all pointer-events-auto">
        
        {/* Left: Brand Logo & Title */}
        <div 
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black border border-white/20 p-1 flex items-center justify-center transition-transform group-hover:scale-105 shadow-inner">
            <Cpu className="w-5 h-5 text-[#00BFFB] group-hover:text-[#FF8918] transition-colors" />
          </div>

          <span className="font-bold text-base sm:text-lg tracking-tight text-white font-['General_Sans',sans-serif]">
            IoT Club
          </span>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden min-[900px]:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-3 py-1.5 text-xs xl:text-[13.5px] font-medium transition-colors duration-200 select-none ${
                  isActive 
                    ? 'text-white font-semibold' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Right: Auth Action Buttons */}
        <div className="hidden min-[900px]:flex items-center gap-3 xl:gap-4 flex-shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleLinkClick(currentUser.role === 'admin' ? 'admin' : currentUser.role === 'faculty' ? 'faculty-dashboard' : 'student-dashboard')}
                className="px-3 py-1.5 text-xs xl:text-[13.5px] font-medium text-white/80 hover:text-white transition-colors"
              >
                Dashboard
              </button>
              <GECButton 
                size="default" 
                onClick={() => handleLinkClick(currentUser.role === 'admin' ? 'admin' : currentUser.role === 'faculty' ? 'faculty-dashboard' : 'student-dashboard')}
              >
                {currentUser.role === 'admin' ? 'Admin Portal' : currentUser.role === 'faculty' ? 'Faculty Portal' : 'Student Portal'}
              </GECButton>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleLinkClick('auth')}
                className="px-3 py-1.5 text-xs xl:text-[13.5px] font-medium text-white/70 hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer"
              >
                Sign In
              </button>
              <GECButton 
                size="default" 
                onClick={() => handleLinkClick('signup')}
              >
                Get Started
              </GECButton>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="min-[900px]:hidden flex items-center gap-2">
          <GECButton 
            size="default" 
            onClick={() => handleLinkClick(currentUser ? 'student-dashboard' : 'auth')}
            className="!h-8 !px-3 !text-xs"
          >
            {currentUser ? 'Portal' : 'Sign In'}
          </GECButton>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="min-[900px]:hidden mt-2 p-5 rounded-3xl bg-black/95 border border-white/15 backdrop-blur-2xl shadow-2xl pointer-events-auto space-y-3 animate-fadeIn">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left py-2.5 px-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === link.id 
                    ? 'text-white bg-white/10' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <GECButton 
              size="hero" 
              onClick={() => handleLinkClick(currentUser ? 'student-dashboard' : 'auth')} 
              className="w-full"
            >
              {currentUser ? 'Open Student Portal' : 'Get Started'}
            </GECButton>
          </div>
        </div>
      )}

    </header>
  );
};
