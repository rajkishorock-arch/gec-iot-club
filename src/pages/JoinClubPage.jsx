import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  CheckCircle, 
  Cpu, 
  ShieldCheck, 
  AlertCircle,
  HelpCircle,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { clubInfo } from '../data/mockData';

const JoinClubPage = ({ isFormOpen = true }) => {
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    regNo: '',
    branch: 'Electronics & Communication Engineering',
    semester: '3rd Semester',
    email: '',
    phone: '',
    domains: [],
    experienceLevel: 'Beginner (Eager to learn)',
    projectIdea: '',
    github: ''
  });

  const availableDomains = [
    "ESP32 & Embedded C",
    "Autonomous Robotics & ROS",
    "LoRaWAN & Wireless Mesh",
    "Cloud IoT & MQTT Dashboards",
    "PCB Designing & Soldering",
    "TinyML & Computer Vision on Edge"
  ];

  const handleDomainToggle = (dom) => {
    setFormData(prev => {
      const exists = prev.domains.includes(dom);
      if (exists) {
        return { ...prev, domains: prev.domains.filter(d => d !== dom) };
      } else {
        return { ...prev, domains: [...prev.domains, dom] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.domains.length === 0) {
      alert("Please select at least one IoT domain of interest!");
      return;
    }

    const generatedId = `GEC-APP-${Math.floor(100000 + Math.random() * 900000)}`;
    setAppId(generatedId);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Membership Drive {new Date().getFullYear()}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Join GEC Khagaria IoT Club
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Open to all students of Government Engineering College, Khagaria across all branches. Get access to hardware toolkits, lab sessions, and national hackathons.
        </p>

        {/* Status banner */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Application Window: Active & Accepting Registrations</span>
        </div>
      </div>

      {!submitted ? (
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden bg-slate-950/90">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Section 1: Basic Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-cyan-400 border-b border-white/5 pb-2">
                1. Student Profile
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">College Roll / Registration No *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 23105128005"
                    value={formData.regNo}
                    onChange={(e) => setFormData({...formData, regNo: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Engineering Branch *</label>
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({...formData, branch: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option>Electronics & Communication Engineering (ECE)</option>
                    <option>Computer Science & Engineering (CSE)</option>
                    <option>Electrical Engineering (EE)</option>
                    <option>Mechanical Engineering (ME)</option>
                    <option>Civil Engineering (CE)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Current Semester *</label>
                  <select
                    value={formData.semester}
                    onChange={(e) => setFormData({...formData, semester: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option>1st Semester (1st Year)</option>
                    <option>2nd Semester (1st Year)</option>
                    <option>3rd Semester (2nd Year)</option>
                    <option>4th Semester (2nd Year)</option>
                    <option>5th Semester (3rd Year)</option>
                    <option>6th Semester (3rd Year)</option>
                    <option>7th Semester (Final Year)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">College / Personal Email *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">WhatsApp / Mobile Number *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Technical Domain Interests */}
            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-emerald-400 border-b border-white/5 pb-2">
                2. Domains You Want to Learn & Build In
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableDomains.map((dom, i) => {
                  const isChecked = formData.domains.includes(dom);
                  return (
                    <div 
                      key={i}
                      onClick={() => handleDomainToggle(dom)}
                      className={`p-3.5 rounded-xl border cursor-pointer text-xs transition-all flex items-center justify-between ${
                        isChecked 
                          ? 'bg-cyan-950/70 border-cyan-400 text-white' 
                          : 'bg-slate-900/60 border-white/10 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>{dom}</span>
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                        isChecked ? 'bg-cyan-400 border-cyan-400 text-black' : 'border-slate-600'
                      }`}>
                        {isChecked && <CheckCircle className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Motivation & Links */}
            <div className="space-y-4 pt-4 text-xs">
              <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-amber-400 border-b border-white/5 pb-2">
                3. Hardware Experience & Project Aspirations
              </h3>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Current Hardware/Coding Skill Level</label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) => setFormData({...formData, experienceLevel: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option>Beginner (Eager to learn from ground up)</option>
                  <option>Intermediate (Have worked on Arduino / ESP32 basics)</option>
                  <option>Advanced (Have built full IoT prototypes, PCB, or SIH participant)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Why do you want to join GEC IoT Club? (Optional project ideas)</label>
                <textarea 
                  rows="3"
                  placeholder="Tell us what excites you about Internet of Things or any smart hardware project you want to build..."
                  value={formData.projectIdea}
                  onChange={(e) => setFormData({...formData, projectIdea: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">GitHub / LinkedIn Profile URL (Optional)</label>
                <input 
                  type="url" 
                  placeholder="https://github.com/your-username"
                  value={formData.github}
                  onChange={(e) => setFormData({...formData, github: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 text-black shadow-xl hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Membership Application</span>
              </button>
              <p className="text-[11px] text-slate-500 text-center mt-2">
                By submitting, you agree to adhere to GEC Khagaria Student Code of Conduct and Lab Safety Guidelines.
              </p>
            </div>

          </form>
        </div>
      ) : (
        /* Submission Success Confirmation */
        <div className="glass-panel rounded-3xl p-10 sm:p-14 border border-cyan-500/40 text-center space-y-6 max-w-xl mx-auto bg-slate-950">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
              Application Dispatched
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome to GEC IoT Club!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Congratulations <strong className="text-cyan-400">{formData.fullName}</strong>. 
              Your application has been logged under Tracking ID:
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 font-mono text-cyan-300 text-base font-bold">
            {appId}
          </div>

          <p className="text-xs text-slate-400">
            You will be added to the official GEC IoT Club WhatsApp & Discord channels shortly. The orientation session details will be sent to <strong>{formData.email}</strong>.
          </p>

          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            Submit Another Application
          </button>
        </div>
      )}

    </div>
  );
};

export default JoinClubPage;
