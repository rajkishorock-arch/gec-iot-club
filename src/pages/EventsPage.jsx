import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Trophy, 
  Users, 
  Clock, 
  ShieldAlert, 
  CheckCircle, 
  X, 
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { eventsData } from '../data/mockData';

const EventsPage = ({ selectedEvent, setSelectedEvent }) => {
  const [filter, setFilter] = useState('All');
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  // Registration form state
  const [regFormData, setRegFormData] = useState({
    teamName: '',
    leaderName: '',
    regNo: '',
    branch: 'Electronics & Communication Engineering',
    semester: '5th Semester',
    email: '',
    phone: '',
    subEvent: '',
    membersCount: '3'
  });

  const filteredEvents = eventsData.filter(event => {
    if (filter === 'All') return true;
    return event.type.toLowerCase() === filter.toLowerCase();
  });

  const handleOpenRegister = (event) => {
    setSelectedEvent(event);
    setRegFormData(prev => ({
      ...prev,
      subEvent: event.subEvents?.[0]?.title || ''
    }));
    setRegisterModalOpen(true);
    setRegistrationSuccess(false);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegistrationSuccess(true);
    
    // Trigger confetti animation
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Competitions, Hackathons & Hands-On Bootcamps</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Events & SIH Hackathons
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Test your firmware coding and hardware design skills. Compete in 36-hour hackathons, participate in specialized bootcamps, and represent GEC Khagaria on national stages.
        </p>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {['All', 'Hackathon', 'Bootcamp', 'SIH'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === tab 
                  ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                  : 'bg-slate-900/80 text-slate-300 border border-white/10 hover:border-slate-600'
              }`}
            >
              {tab === 'All' ? 'All Events' : `${tab}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => {
          const isUpcoming = event.status === 'Upcoming';

          return (
            <div 
              key={event.id}
              className="glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col group"
            >
              {/* Event Image Banner */}
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={event.banner} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase bg-slate-950/80 text-cyan-300 border border-cyan-500/30">
                    {event.type}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {event.badge}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold ${
                    isUpcoming ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>

              {/* Event Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {event.summary}
                  </p>

                  <div className="space-y-2 pt-2 text-xs font-mono text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{event.mode}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-emerald-400 font-bold">{event.prizePool}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-white/5 flex gap-2">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 transition-colors text-center"
                  >
                    View Details
                  </button>

                  {isUpcoming && (
                    <button
                      onClick={() => handleOpenRegister(event)}
                      className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-400 to-emerald-400 text-black hover:opacity-90 transition-opacity text-center flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Register</span>
                    </button>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* EVENT DETAILS MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 p-6 sm:p-8 space-y-6 relative bg-[#0c1424]">
            
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  {selectedEvent.type}
                </span>
                <span className="text-xs font-mono text-amber-400">
                  {selectedEvent.badge}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedEvent.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedEvent.summary}
              </p>
            </div>

            {/* Sub-events */}
            {selectedEvent.subEvents && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  Tracks & Sub-Events
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedEvent.subEvents.map((sub) => (
                    <div key={sub.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                      <div className="font-semibold text-xs text-white">{sub.title}</div>
                      <div className="text-[11px] text-emerald-400 font-mono">{sub.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Schedule Timeline */}
            {selectedEvent.timeline && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  Event Timeline & Schedule
                </h4>
                <div className="space-y-2">
                  {selectedEvent.timeline.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs p-2.5 rounded-lg bg-white/[0.02]">
                      <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="font-mono text-cyan-300 w-36 shrink-0">{item.time}</span>
                      <span className="text-slate-300">{item.task}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rules */}
            {selectedEvent.rules && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                  Guidelines & Rules
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                  {selectedEvent.rules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action inside modal */}
            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-white/5"
              >
                Close
              </button>
              {selectedEvent.status === 'Upcoming' && (
                <button
                  onClick={() => {
                    handleOpenRegister(selectedEvent);
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-400 to-emerald-400 text-black hover:opacity-90"
                >
                  Register Team
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* REGISTRATION MODAL */}
      {registerModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-500/30 p-6 sm:p-8 space-y-6 relative bg-[#090f1d]">
            
            <button
              onClick={() => setRegisterModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!registrationSuccess ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-5">
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
                    Official Registration Portal
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Government Engineering College, Khagaria IoT Club Event
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Team Name / Project Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. AeroSensors / AgroSmart"
                      value={regFormData.teamName}
                      onChange={(e) => setRegFormData({...regFormData, teamName: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">Team Leader Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Full Name"
                        value={regFormData.leaderName}
                        onChange={(e) => setRegFormData({...regFormData, leaderName: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">Registration / Roll No</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. 22105128001"
                        value={regFormData.regNo}
                        onChange={(e) => setRegFormData({...regFormData, regNo: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">Branch</label>
                      <select
                        value={regFormData.branch}
                        onChange={(e) => setRegFormData({...regFormData, branch: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option>Electronics & Communication Engineering</option>
                        <option>Computer Science & Engineering</option>
                        <option>Electrical Engineering</option>
                        <option>Mechanical Engineering</option>
                        <option>Civil Engineering</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">Semester</label>
                      <select
                        value={regFormData.semester}
                        onChange={(e) => setRegFormData({...regFormData, semester: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option>1st Semester</option>
                        <option>3rd Semester</option>
                        <option>5th Semester</option>
                        <option>7th Semester</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">Contact Email</label>
                      <input 
                        type="email" 
                        required
                        placeholder="student@geckhagaria.org"
                        value={regFormData.email}
                        onChange={(e) => setRegFormData({...regFormData, email: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">WhatsApp / Phone</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+91 XXXXXXXXXX"
                        value={regFormData.phone}
                        onChange={(e) => setRegFormData({...regFormData, phone: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 to-emerald-400 text-black shadow-lg hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirm & Submit Registration</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">
                  Registration Successful!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Team <strong className="text-cyan-400">{regFormData.teamName}</strong> has been registered for <strong>{selectedEvent.title}</strong>. A confirmation slip and kit allotment details have been dispatched to your email.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setRegisterModalOpen(false);
                      setSelectedEvent(null);
                    }}
                    className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20"
                  >
                    Done & Return to Events
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default EventsPage;
