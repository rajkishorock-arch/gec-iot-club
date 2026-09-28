import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  GraduationCap, 
  PlusCircle, 
  Trophy, 
  CheckCircle, 
  Clock, 
  Download, 
  ToggleLeft, 
  ToggleRight,
  Sparkles,
  Calendar,
  AlertCircle,
  Cpu,
  Layers,
  FileText
} from 'lucide-react';
import { clubInfo, eventsData, verifiedCertificates } from '../data/mockData';

const DashboardPage = ({ setActiveTab, isFormOpen, setIsFormOpen }) => {
  const [role, setRole] = useState('student'); // 'student' | 'faculty' | 'admin'

  // Admin state
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([
    "Hardware kits for 'Khagaria IoT Make-a-thon 2026' arrived at Lab B-102.",
    "Internal screening for SIH Hardware Edition begins next Tuesday."
  ]);

  // Event creation form state
  const [eventCreated, setEventCreated] = useState(false);
  const [adminEventForm, setAdminEventForm] = useState({
    title: '',
    type: 'Hackathon',
    date: '',
    prize: '',
    summary: ''
  });

  const handlePostAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnouncement.trim()) return;
    setAnnouncements([newAnnouncement, ...announcements]);
    setNewAnnouncement('');
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    setEventCreated(true);
    setTimeout(() => {
      setEventCreated(false);
      setAdminEventForm({ title: '', type: 'Hackathon', date: '', prize: '', summary: '' });
      alert("New Event Created and Broadcasted to Club Portal!");
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Role Switcher Navigation */}
      <div className="glass-panel rounded-2xl p-4 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">GEC Khagaria Club Portal</h2>
            <p className="text-xs text-slate-400 font-mono">Role-Based Access Control</p>
          </div>
        </div>

        {/* Tabs for Roles */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-white/5 gap-1">
          <button
            onClick={() => setRole('student')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              role === 'student'
                ? 'bg-cyan-400 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Student Dashboard</span>
          </button>

          <button
            onClick={() => setRole('faculty')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              role === 'faculty'
                ? 'bg-emerald-400 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Faculty View</span>
          </button>

          <button
            onClick={() => setRole('admin')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              role === 'admin'
                ? 'bg-amber-400 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Console</span>
          </button>
        </div>
      </div>

      {/* ================= 1. STUDENT VIEW ================= */}
      {role === 'student' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Student Profile Card */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/20 bg-gradient-to-r from-slate-900 via-slate-950 to-cyan-950/40">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=AdityaStudent&eyebrows=default" 
                alt="Student Profile" 
                className="w-20 h-20 rounded-2xl bg-slate-900 border border-cyan-400/40 p-1"
              />
              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-xl font-bold text-white">Aditya Prakash</h3>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Active Member
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-mono">
                  Reg No: 22105128014 | Branch: ECE (5th Sem)
                </p>
                <p className="text-xs text-slate-400">
                  Government Engineering College, Khagaria
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => { setActiveTab('certificates'); window.scrollTo({top:0, behavior:'smooth'}); }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-400 text-black hover:bg-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>My Certificates</span>
                </button>
              </div>
            </div>
          </div>

          {/* Student's Enrolled Events */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>My Registered Events</span>
              </h4>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white">
                      Khagaria IoT Make-a-thon 2026
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Confirmed
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Track: Smart Agriculture & Irrigation | Team: AgroSmart
                  </div>
                  <div className="text-[11px] text-cyan-400">
                    Hardware kit collection: Nov 14, 09:30 AM (IoT Lab)
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white">
                      ESP32 & Real-Time Operating Systems (FreeRTOS)
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      Bootcamp Seat Reserved
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Venue: Hybrid (Seminar Hall 2) | Oct 20, 2026
                  </div>
                </div>
              </div>
            </div>

            {/* Issued Credentials */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Verified Credentials Ready for Download</span>
              </h4>

              <div className="space-y-3">
                {verifiedCertificates.slice(0, 2).map((cert) => (
                  <div key={cert.id} className="p-4 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-white">{cert.eventTitle}</div>
                      <div className="text-[11px] font-mono text-cyan-400">{cert.id}</div>
                    </div>
                    <button
                      onClick={() => { setActiveTab('certificates'); window.scrollTo({top:0, behavior:'smooth'}); }}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. FACULTY VIEW ================= */}
      {role === 'faculty' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/20 bg-gradient-to-r from-slate-900 via-slate-950 to-emerald-950/40">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=ProfManoj&eyebrows=defaultNatural" 
                alt="Faculty Profile" 
                className="w-20 h-20 rounded-2xl bg-slate-900 border border-emerald-400/40 p-1"
              />
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-xl font-bold text-white">Prof. Manoj Sharma</h3>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Faculty Coordinator
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-mono">
                  ECE Department | Mentor (IoT & Embedded Systems)
                </p>
                <p className="text-xs text-slate-400">
                  Government Engineering College, Khagaria
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-2">
              <span className="text-xs font-mono text-slate-400">Pending Project Approvals</span>
              <div className="text-3xl font-bold font-mono text-emerald-400">7</div>
              <p className="text-[11px] text-slate-400">Smart Agriculture & River level telemetry proposals</p>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-2">
              <span className="text-xs font-mono text-slate-400">Lab Equipment Requisitions</span>
              <div className="text-3xl font-bold font-mono text-cyan-400">3</div>
              <p className="text-[11px] text-slate-400">Soldering iron replacements and flux stock</p>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-2">
              <span className="text-xs font-mono text-slate-400">SIH Teams in Mentorship</span>
              <div className="text-3xl font-bold font-mono text-amber-400">4 Teams</div>
              <p className="text-[11px] text-slate-400">Preparation for Hardware Grand Finale</p>
            </div>
          </div>
        </div>
      )}

      {/* ================= 3. ADMIN VIEW ================= */}
      {role === 'admin' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Quick Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-1">
              <span className="text-xs font-mono text-slate-400">Total Applicants</span>
              <div className="text-2xl font-bold font-mono text-cyan-400">194 Students</div>
            </div>

            <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-1">
              <span className="text-xs font-mono text-slate-400">Join Form Status</span>
              <div className="flex items-center gap-2">
                <span className={`text-base font-bold font-mono ${isFormOpen ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isFormOpen ? 'OPEN (Active)' : 'CLOSED'}
                </span>
                <button
                  onClick={() => setIsFormOpen(!isFormOpen)}
                  className="text-xs underline text-slate-400 hover:text-white"
                >
                  (Toggle)
                </button>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-1">
              <span className="text-xs font-mono text-slate-400">Active Hackathons</span>
              <div className="text-2xl font-bold font-mono text-amber-400">1 Upcoming</div>
            </div>

            <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-1">
              <span className="text-xs font-mono text-slate-400">Certificates Generated</span>
              <div className="text-2xl font-bold font-mono text-emerald-400">128 Issued</div>
            </div>
          </div>

          {/* Admin Announcement Creator */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Broadcast Official Club Announcement</span>
            </h3>

            <form onSubmit={handlePostAnnouncement} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text"
                placeholder="Type new notice for GEC IoT Club members..."
                value={newAnnouncement}
                onChange={(e) => setNewAnnouncement(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-400 text-black hover:bg-amber-300 transition-colors shrink-0"
              >
                Post Notice
              </button>
            </form>

            <div className="space-y-2 pt-2">
              {announcements.map((note, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-slate-300 flex items-center justify-between">
                  <span>📢 {note}</span>
                  <span className="text-[10px] text-slate-500 font-mono">Live</span>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Event Creator */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-cyan-400" />
              <span>Create New Event / Hackathon</span>
            </h3>

            <form onSubmit={handleCreateEvent} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Event Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Smart Sensor Design Contest"
                  value={adminEventForm.title}
                  onChange={(e) => setAdminEventForm({...adminEventForm, title: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Event Type</label>
                <select
                  value={adminEventForm.type}
                  onChange={(e) => setAdminEventForm({...adminEventForm, type: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option>Hackathon</option>
                  <option>Bootcamp</option>
                  <option>Workshop</option>
                  <option>Hardware Contest</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Date & Time</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. December 5, 2026"
                  value={adminEventForm.date}
                  onChange={(e) => setAdminEventForm({...adminEventForm, date: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Prize Pool / Perks</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. ₹20,000 + Goodies"
                  value={adminEventForm.prize}
                  onChange={(e) => setAdminEventForm({...adminEventForm, prize: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 mb-1">Short Summary</label>
                <textarea 
                  rows="3"
                  required
                  placeholder="Overview of the event..."
                  value={adminEventForm.summary}
                  onChange={(e) => setAdminEventForm({...adminEventForm, summary: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-xs bg-cyan-400 text-black hover:bg-cyan-300 transition-colors"
                >
                  Publish Event to Website
                </button>
              </div>
            </form>
          </div>

        </div>
      )}

    </div>
  );
};

export default DashboardPage;
