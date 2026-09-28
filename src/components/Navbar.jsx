import React, { useState } from 'react';
import { 
  Cpu, 
  Menu, 
  X, 
  Sparkles, 
  Award, 
  Users, 
  Calendar, 
  BookOpen, 
  Image, 
  LifeBuoy, 
  ShieldCheck,
  ChevronRight,
  LogIn,
  LogOut,
  UserCheck
} from 'lucide-react';
import { clubInfo } from '../data/mockData';

const Navbar = ({ activeTab, setActiveTab, currentUser, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About College' },
    { id: 'events', label: 'Events & SIH' },
    { id: 'team', label: 'Leadership' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'docs', label: 'Projects & Docs' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'complaint', label: 'Grievance' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 bg-[#080c14]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#080c14] rounded-[10px] flex items-center justify-center">
                <Cpu className="w-6 h-6 text-cyan-400 group-hover:text-emerald-400 transition-colors" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#080c14] animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#080c14]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  GEC KHAGARIA
                </span>
                <span className="text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                  IoT Club
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide hidden sm:block">
                Dept. of Science & Tech, Govt. of Bihar
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,242,254,0.15)]' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Action CTAs: Dashboard, Auth & Join Club */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <button
                onClick={() => handleNavClick('student-dashboard')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all border ${
                  activeTab === 'student-dashboard'
                    ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-950/40'
                    : 'bg-slate-900 text-slate-200 border-white/10 hover:border-cyan-500/30'
                }`}
              >
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-5 h-5 rounded-full border border-cyan-400/50"
                />
                <span>Student Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('auth')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all border ${
                  activeTab === 'auth'
                    ? 'bg-cyan-950/70 text-cyan-300 border-cyan-500/40'
                    : 'bg-slate-900 text-slate-300 border-white/10 hover:border-slate-500'
                }`}
              >
                <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                <span>Sign In / Login</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('dashboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all border ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
              }`}
              title="Open Role-Based Portal (Student/Faculty/Admin)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Roles</span>
            </button>

            <button
              onClick={() => handleNavClick('join')}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all duration-200 shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_25px_rgba(0,242,254,0.5)] transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join Club</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick(currentUser ? 'student-dashboard' : 'auth')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700 text-slate-300 md:hidden"
            >
              {currentUser ? (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dashboard</span>
                </>
              ) : (
                <>
                  <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Login</span>
                </>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#080c14]/98 border-b border-white/10 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left ${
                  activeTab === item.id 
                    ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-500/30' 
                    : 'text-slate-300 bg-white/[0.02] hover:bg-white/[0.06]'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            {currentUser ? (
              <button
                onClick={() => handleNavClick('student-dashboard')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-400 to-emerald-400 text-black shadow-lg"
              >
                <UserCheck className="w-4 h-4" />
                <span>Open Student Dashboard ({currentUser.name})</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('auth')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm bg-cyan-400 text-black shadow-lg"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In / Register Account</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('join')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-xs uppercase bg-slate-900 border border-slate-700 text-slate-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Apply for Club Membership (Join)</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
