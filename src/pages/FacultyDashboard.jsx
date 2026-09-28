import React, { useState } from 'react';
import { useClub } from '../context/ClubContext';
import { 
  Home, 
  LayoutDashboard, 
  Calendar, 
  Award, 
  Users, 
  Trophy, 
  CheckCircle, 
  FileText, 
  MessageSquare, 
  PlusCircle, 
  Search, 
  Bell, 
  Clock, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  Sparkles, 
  GraduationCap,
  ShieldCheck,
  Send,
  Download,
  Cpu,
  LogOut
} from 'lucide-react';

export const FacultyDashboard = ({ currentUser, setActiveTab, onLogout }) => {
  const { 
    events, 
    certificates, 
    applicants, 
    declaredResults, 
    declareNewResult 
  } = useClub();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeFacultyTab, setActiveFacultyTab] = useState('overview'); // 'overview' | 'events' | 'declare-result' | 'certificates' | 'notice'

  const faculty = currentUser || {
    name: "Prof. Manoj Sharma",
    role: "Faculty Coordinator",
    department: "Department of Electronics & Communication Engineering",
    email: "manoj.sharma@geckhagaria.org",
    designation: "Assistant Professor & IoT Club In-charge",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  };

  // Declare Result Form State
  const [resultForm, setResultForm] = useState({
    eventTitle: 'Khagaria IoT Make-a-thon 2026',
    winnerTeam: '',
    winnerLeader: '',
    winnerBranch: 'ECE',
    runnerUpTeam: '',
    runnerUpLeader: '',
    innovationPrize: '',
    declaredBy: `${faculty.name} (${faculty.role})`,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    status: 'Published'
  });

  // Official Department Notice Form
  const [notices, setNotices] = useState([
    {
      id: "not-1",
      title: "Mandatory Safety Protocols for Soldering & High-Current Bench Supplies",
      date: "Sep 25, 2026",
      department: "Dept. of ECE & IoT Club",
      content: "All student teams using the IoT Lab for PCB etching and DSO analysis must wear anti-static wrist straps and secure lab supervisor sign-off before leaving."
    }
  ]);
  const [newNotice, setNewNotice] = useState({ title: '', content: '' });

  const handleDeclare = (e) => {
    e.preventDefault();
    if (!resultForm.winnerTeam) return;
    declareNewResult({ ...resultForm, id: `res-${Date.now()}` });
    alert(`Official Result published by ${faculty.name}!`);
    setResultForm({
      eventTitle: 'Khagaria IoT Make-a-thon 2026',
      winnerTeam: '',
      winnerLeader: '',
      winnerBranch: 'ECE',
      runnerUpTeam: '',
      runnerUpLeader: '',
      innovationPrize: '',
      declaredBy: `${faculty.name} (${faculty.role})`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Published'
    });
  };

  const handlePostNotice = (e) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.content) return;
    setNotices([{ ...newNotice, id: `not-${Date.now()}`, date: "Today", department: faculty.department }, ...notices]);
    alert("Official Department Notice published to student portal!");
    setNewNotice({ title: '', content: '' });
  };

  const navItems = [
    { id: 'overview', label: 'Faculty Overview', icon: LayoutDashboard, color: 'text-purple-600' },
    { id: 'events', label: 'Club Events Oversight', icon: Calendar, color: 'text-amber-600' },
    { id: 'declare-result', label: 'Declare Result', icon: Trophy, color: 'text-yellow-600' },
    { id: 'certificates', label: 'Certificate Sign-offs', icon: Award, color: 'text-emerald-600' },
    { id: 'students', label: 'Student Cohort', icon: Users, color: 'text-blue-600' },
    { id: 'notice', label: 'Department Notice', icon: FileText, color: 'text-rose-600' }
  ];

  const stats = [
    {
      title: "Supervised Events",
      subtitle: "Hackathons & Workshops",
      value: String(events.length),
      badge: "Approved",
      badgeColor: "bg-[#eafaf1] text-[#00684a]",
      valueColor: "text-[#001e2b]"
    },
    {
      title: "Enrolled Students",
      subtitle: "Active department members",
      value: String(applicants.length),
      badge: "Verified",
      badgeColor: "bg-[#eafaf1] text-[#00684a]",
      valueColor: "text-[#001e2b]"
    },
    {
      title: "Results Declared",
      subtitle: "Podiums & awards certified",
      value: String(declaredResults.length),
      badge: "Official",
      badgeColor: "bg-[#fff2e8] text-[#fa6e39]",
      valueColor: "text-[#fa6e39]"
    },
    {
      title: "Signed Certificates",
      subtitle: "Endorsed with faculty seal",
      value: String(certificates.length),
      badge: "Issued",
      badgeColor: "bg-[#e3fcef] text-[#00684a]",
      valueColor: "text-[#001e2b]"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f9fbfa] text-[#001e2b] flex font-['General_Sans',sans-serif] selection:bg-[#00ed64] selection:text-black">
      
      {/* Mobile Backdrop Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ================= 1. DESKTOP & MOBILE SIDEBAR ================= */}
      <aside 
        className={`fixed inset-y-0 left-0 h-full max-h-[100dvh] bg-white transition-all duration-300 z-50 border-r border-[#e1e5e8] shadow-sm flex flex-col justify-between overflow-hidden md:overflow-visible ${
          sidebarCollapsed ? 'md:w-20' : 'md:w-64'
        } ${
          mobileSidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center justify-between h-16 md:h-20 px-4 border-b border-[#e1e5e8] flex-shrink-0 relative">
            <div 
              onClick={() => { setActiveTab('home'); window.history.pushState({}, '', '/'); }}
              className={`flex items-center min-w-0 cursor-pointer ${sidebarCollapsed ? 'md:justify-center md:w-full' : ''}`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-[#001e2b] flex items-center justify-center border border-[#e1e5e8] shadow-xs">
                  <GraduationCap className="w-5 h-5 text-[#00ed64]" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#00ed64] rounded-full ring-2 ring-white" />
              </div>
              {(!sidebarCollapsed || mobileSidebarOpen) && (
                <div className="ml-3 min-w-0">
                  <span className="font-bold text-base text-[#001e2b] block truncate leading-tight">Faculty Portal</span>
                  <span className="text-[10px] text-[#5c6c7a] font-medium block">GEC Khagaria</span>
                </div>
              )}
            </div>

            {/* Collapse Toggle Chevron Button with Signature Gradient Border */}
            <div 
              className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 p-[1.5px] rounded-md z-50 transition-transform duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)",
                boxShadow: "0 0 8px rgba(255, 137, 24, 0.25), 0 0 10px rgba(0, 152, 243, 0.18)"
              }}
            >
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="w-7 h-7 bg-white hover:bg-[#f4f7f6] rounded-md transition-colors flex items-center justify-center cursor-pointer text-[#5c6c7a] hover:text-[#001e2b]"
                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="w-4 h-4 text-orange-500" />
                ) : (
                  <ChevronLeft className="w-4 h-4 text-orange-500" />
                )}
              </button>
            </div>

            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden p-1.5 hover:bg-[#f4f7f6] rounded-lg text-[#5c6c7a]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Nav Items */}
          <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = activeFacultyTab === item.id;
              const Icon = item.icon;

              return isActive ? (
                <div 
                  key={item.id}
                  className="p-[2px] rounded-full"
                  style={{
                    background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)",
                    boxShadow: "0 0 12px rgba(255, 137, 24, 0.28), 0 0 16px rgba(0, 152, 243, 0.22)"
                  }}
                >
                  <button
                    onClick={() => { setActiveFacultyTab(item.id); setMobileSidebarOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#001e2b] text-white font-semibold transition-all relative text-left cursor-pointer"
                  >
                    <Icon className="w-5 h-5 flex-shrink-0 text-[#00ed64]" />
                    {(!sidebarCollapsed || mobileSidebarOpen) && (
                      <span className="text-[13px] font-semibold text-white truncate">{item.label}</span>
                    )}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-5 bg-[#00ed64] rounded-r-full" />
                  </button>
                </div>
              ) : (
                <button
                  key={item.id}
                  onClick={() => { setActiveFacultyTab(item.id); setMobileSidebarOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-[#3d4f5b] font-medium hover:bg-[#f4f7f6] hover:text-[#001e2b] transition-all text-left group cursor-pointer"
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${item.color} group-hover:scale-105 transition-transform`} />
                  {(!sidebarCollapsed || mobileSidebarOpen) && (
                    <span className="text-[13px] truncate">{item.label}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Bottom Profile Pill matching Student & Admin */}
        <div className="p-3 border-t border-[#e1e5e8] bg-white">
          <div 
            className="p-[2px] rounded-[16px]"
            style={{
              background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)",
              boxShadow: "0 0 12px rgba(255, 137, 24, 0.28), 0 0 16px rgba(0, 152, 243, 0.22)"
            }}
          >
            <div className={`flex items-center gap-3 px-3 py-2.5 rounded-[14px] bg-[#001e2b] text-white ${
              sidebarCollapsed && !mobileSidebarOpen ? 'justify-center' : ''
            }`}>
              <div 
                className="p-[1.5px] rounded-lg flex-shrink-0"
                style={{
                  background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)"
                }}
              >
                <div className="w-7 h-7 rounded-[6px] bg-[#003d4f] flex items-center justify-center text-[#00ed64]">
                  <GraduationCap className="w-4 h-4" />
                </div>
              </div>

              {(!sidebarCollapsed || mobileSidebarOpen) && (
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-xs text-white block truncate leading-tight">
                    Faculty Coordinator
                  </span>
                  <p className="text-[11px] text-[#00ed64] font-medium truncate mt-0.5">
                    {faculty.name}
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => { setActiveTab('auth'); window.history.pushState({}, '', '/login'); }}
            className="w-full mt-2 flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-500" />
            {(!sidebarCollapsed || mobileSidebarOpen) && (
              <span>Logout Faculty</span>
            )}
          </button>
        </div>

      </aside>

      {/* ================= 2. FACULTY WORKSPACE ================= */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
      }`}>
        
        {/* Top Header */}
        <header className="h-16 md:h-20 bg-white border-b border-[#e1e5e8] px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-[#5c6c7a] hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:block">
              <span className="text-xs text-[#5c6c7a] font-medium">Faculty Oversight / </span>
              <span className="text-xs font-bold text-[#001e2b] capitalize">
                {navItems.find(t => t.id === activeFacultyTab)?.label || 'Overview'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <button 
              onClick={() => { setActiveTab('home'); window.history.pushState({}, '', '/'); }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#f4f7f6] text-[#001e2b] border border-[#e1e5e8] hover:bg-white transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </button>

            <div className="text-right">
              <p className="font-bold text-[#001e2b] text-sm leading-tight">
                {faculty.name}
              </p>
              <div className="flex items-center gap-1.5 justify-end mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#00ed64] animate-pulse" />
                <span className="text-xs font-semibold text-[#00ed64]">
                  Faculty Coordinator
                </span>
              </div>
            </div>

            <div className="w-10 h-10 rounded-full ring-2 ring-[#00ed64] p-0.5 bg-[#001e2b] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              FC
            </div>
          </div>
        </header>

        {/* Workspace Body */}
        <main className="p-4 sm:p-7 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001e2b] tracking-tight">
                {navItems.find(t => t.id === activeFacultyTab)?.label}
              </h1>
              <p className="text-xs sm:text-sm text-[#738290] mt-0.5">
                Faculty oversight, project evaluation, competition result declarations & certificate verification.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Department Coordinator Access
              </span>
            </div>
          </div>

          {/* ================= VIEW: FACULTY OVERVIEW ================= */}
          {activeFacultyTab === 'overview' && (
            <div className="space-y-8">
              
              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {stats.map((card, idx) => (
                  <div 
                    key={idx}
                    className="bg-white rounded-2xl border border-[#e1e5e8] p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between h-36"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#738290] uppercase tracking-wider">{card.title}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${card.badgeColor}`}>
                          {card.badge}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#001e2b]">
                          {card.value}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#738290] leading-snug">{card.subtitle}</p>
                  </div>
                ))}
              </div>

              {/* Faculty Actions & Lab Status */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Card: Faculty Responsibilities */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-[#e1e5e8] p-6 space-y-4">
                  <h3 className="text-base font-bold text-[#001e2b] flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span>Faculty Coordinator Tasks</span>
                  </h3>
                  
                  <div className="space-y-3 pt-1 text-xs">
                    <div 
                      onClick={() => setActiveFacultyTab('declare-result')}
                      className="p-3.5 rounded-xl border border-[#e1e5e8] bg-[#f9fbfa] hover:bg-emerald-50 hover:border-emerald-200 cursor-pointer transition-all flex items-center justify-between"
                    >
                      <div>
                        <p className="font-bold text-[#001e2b]">Declare Competition Results & Scores</p>
                        <p className="text-[11px] text-[#738290]">Sign off on hackathon winners and cash awards</p>
                      </div>
                      <Trophy className="w-4 h-4 text-amber-500" />
                    </div>

                    <div 
                      onClick={() => setActiveFacultyTab('certificates')}
                      className="p-3.5 rounded-xl border border-[#e1e5e8] bg-[#f9fbfa] hover:bg-emerald-50 hover:border-emerald-200 cursor-pointer transition-all flex items-center justify-between"
                    >
                      <div>
                        <p className="font-bold text-[#001e2b]">Verify Institutional Certificates</p>
                        <p className="text-[11px] text-[#738290]">Endorse student achievements with digital seal</p>
                      </div>
                      <Award className="w-4 h-4 text-emerald-500" />
                    </div>

                    <div 
                      onClick={() => setActiveFacultyTab('notice')}
                      className="p-3.5 rounded-xl border border-[#e1e5e8] bg-[#f9fbfa] hover:bg-emerald-50 hover:border-emerald-200 cursor-pointer transition-all flex items-center justify-between"
                    >
                      <div>
                        <p className="font-bold text-[#001e2b]">Publish Department Safety Notice</p>
                        <p className="text-[11px] text-[#738290]">Broadcast lab hours and component checkouts</p>
                      </div>
                      <FileText className="w-4 h-4 text-rose-500" />
                    </div>
                  </div>
                </div>

                {/* Right Card: Lab Equipment Oversight */}
                <div className="lg:col-span-5 bg-white rounded-2xl border border-[#e1e5e8] p-6 space-y-4">
                  <h3 className="text-base font-bold text-[#001e2b] flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-blue-600" />
                    <span>Hardware Lab Allotment</span>
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl border border-[#e1e5e8] flex items-center justify-between">
                      <span className="font-bold text-[#001e2b]">ESP32-S3 AI Development Kits</span>
                      <span className="font-mono text-emerald-600 font-bold">28 Allotted / 40 Total</span>
                    </div>

                    <div className="p-3 rounded-xl border border-[#e1e5e8] flex items-center justify-between">
                      <span className="font-bold text-[#001e2b]">LoRaWAN 868MHz Gateway Nodes</span>
                      <span className="font-mono text-emerald-600 font-bold">4 Active on Campus</span>
                    </div>

                    <div className="p-3 rounded-xl border border-[#e1e5e8] flex items-center justify-between">
                      <span className="font-bold text-[#001e2b]">SMD Rework & Soldering Stations</span>
                      <span className="font-mono text-emerald-600 font-bold">8 Benches Certified</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ================= VIEW: DECLARE RESULT ================= */}
          {activeFacultyTab === 'declare-result' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 sm:p-8 space-y-6">
                <h3 className="text-lg font-bold text-[#001e2b] flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <span>Faculty Competition Evaluation & Result Declaration</span>
                </h3>

                <form onSubmit={handleDeclare} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Select Competition / Event</label>
                    <select 
                      value={resultForm.eventTitle}
                      onChange={e => setResultForm({ ...resultForm, eventTitle: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    >
                      {events.map((ev) => (
                        <option key={ev.id} value={ev.title}>{ev.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Winner Team Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Team AgroSmart"
                      value={resultForm.winnerTeam}
                      onChange={e => setResultForm({ ...resultForm, winnerTeam: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Team Leader Name & Roll</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Aditya Prakash (22105128014)"
                      value={resultForm.winnerLeader}
                      onChange={e => setResultForm({ ...resultForm, winnerLeader: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">1st Runner Up Team</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Team HydroSensors"
                      value={resultForm.runnerUpTeam}
                      onChange={e => setResultForm({ ...resultForm, runnerUpTeam: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="md:col-span-2 pt-2">
                    <button 
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#00ed64] text-[#001e2b] hover:opacity-90 transition-opacity"
                    >
                      Endorse & Publish Official Results
                    </button>
                  </div>
                </form>
              </div>

              {/* Declared Results Feed */}
              <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 space-y-4">
                <h3 className="text-base font-bold text-[#001e2b]">Officially Declared Results ({declaredResults.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {declaredResults.map((res) => (
                    <div key={res.id} className="p-4 rounded-xl border border-[#e1e5e8] bg-[#f9fbfa] space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-700">{res.eventTitle}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Faculty Certified</span>
                      </div>
                      <p className="font-bold text-[#001e2b]">🏆 1st: {res.winnerTeam} ({res.winnerLeader})</p>
                      <p className="text-[#5c6c7a]">🥈 2nd: {res.runnerUpTeam} ({res.runnerUpLeader})</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================= VIEW: CERTIFICATES ================= */}
          {activeFacultyTab === 'certificates' && (
            <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 space-y-4">
              <h3 className="text-base font-bold text-[#001e2b]">Faculty Endorsed Student Certificates ({certificates.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="p-4 rounded-xl border border-[#e1e5e8] bg-[#f9fbfa] space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-emerald-700">{cert.id}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Faculty Seal</span>
                    </div>
                    <p className="font-bold text-[#001e2b] text-sm">{cert.studentName} ({cert.regNo})</p>
                    <p className="text-[#738290]">{cert.eventTitle}</p>
                    <p className="text-xs text-[#fa6e39] font-mono font-semibold">{cert.grade}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= VIEW: NOTICES ================= */}
          {activeFacultyTab === 'notice' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 sm:p-8 space-y-6">
                <h3 className="text-lg font-bold text-[#001e2b] flex items-center gap-2">
                  <FileText className="w-5 h-5 text-rose-600" />
                  <span>Post Official Departmental / Safety Notice</span>
                </h3>

                <form onSubmit={handlePostNotice} className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Notice Title *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. PCB Etching Chemical Safety Protocol"
                      value={newNotice.title}
                      onChange={e => setNewNotice({ ...newNotice, title: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Notice Instructions *</label>
                    <textarea 
                      rows="4" 
                      required
                      placeholder="Enter detailed guidelines for students and club members..."
                      value={newNotice.content}
                      onChange={e => setNewNotice({ ...newNotice, content: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#001e2b] text-white hover:bg-[#0a3548] transition-colors"
                  >
                    Broadcast Notice to Portal
                  </button>
                </form>
              </div>

              <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 space-y-4">
                <h3 className="text-base font-bold text-[#001e2b]">Published Notices</h3>
                <div className="space-y-3">
                  {notices.map((n) => (
                    <div key={n.id} className="p-4 rounded-xl border border-[#e1e5e8] bg-[#f9fbfa] space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#001e2b] text-sm">{n.title}</span>
                        <span className="text-[10px] font-mono text-[#738290]">{n.date}</span>
                      </div>
                      <p className="text-[#5c6c7a] leading-relaxed">{n.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};

export default FacultyDashboard;
