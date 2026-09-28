import React from 'react';
import { 
  Building2, 
  Compass, 
  Target, 
  Lightbulb, 
  CheckCircle2, 
  Award, 
  ExternalLink,
  MapPin,
  Calendar,
  GraduationCap
} from 'lucide-react';
import { clubInfo, teamMembers } from '../data/mockData';

const AboutCollegePage = ({ setActiveTab }) => {
  const patron = teamMembers.patron[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* College Overview Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <GraduationCap className="w-4 h-4 text-cyan-400" />
          <span>Institutional Legacy & Engineering Excellence</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Government Engineering College, Khagaria
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Established by the Government of Bihar under the Department of Science, Technology and Technical Education, 
          GEC Khagaria is a premier technological institute dedicated to nurturing technical talent and indigenous innovations.
        </p>
      </section>

      {/* College Info Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Campus & Governance</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Sprawling permanent campus at Banni, Khagaria, equipped with advanced engineering laboratories, smart classrooms, and high-speed campus-wide fiber network.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Academic Affiliation</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Approved by AICTE, New Delhi and affiliated to Bihar Engineering University (BEU), Patna. Offering B.Tech in CSE, ECE, EE, ME, and Civil Engineering.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">National Recognition</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Active participant and winners in national competitions including Smart India Hackathon (SIH), DST Bihar innovation challenges, and IEEE conferences.
          </p>
        </div>
      </section>

      {/* Principal's Note */}
      <section className="glass-panel rounded-3xl p-8 sm:p-12 border border-cyan-500/20 relative overflow-hidden bg-gradient-to-r from-slate-900 via-[#0a1324] to-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex flex-col items-center text-center space-y-3">
            <img 
              src={patron.avatar} 
              alt={patron.name} 
              className="w-32 h-32 rounded-2xl border-2 border-cyan-400/40 bg-slate-950 p-1 shadow-2xl"
            />
            <div>
              <h4 className="font-bold text-white text-lg">{patron.name}</h4>
              <p className="text-xs text-cyan-400 font-mono">{patron.role}</p>
              <p className="text-[11px] text-slate-400">{patron.department}</p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
              Patron's Vision
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              "Empowering Engineers with Indigenous Hardware Innovation"
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              "The Internet of Things and cyber-physical systems represent the cornerstone of Industry 4.0. 
              At Government Engineering College Khagaria, our IoT Club bridges the gap between classroom theory and real-world industrial hardware. 
              We encourage students to design localized solutions for agriculture, river flood monitoring, and clean energy using low-power smart sensors."
            </p>
            <div className="pt-2">
              <a 
                href={clubInfo.collegeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>Visit Official GEC Khagaria Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission of IoT Club */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel rounded-3xl p-8 border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white">Our Vision</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            To establish GEC Khagaria as an acclaimed center of excellence in Internet of Things, embedded firmware, and autonomous robotics in Eastern India, enabling students to publish research, secure patents, and build hardware startups.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-8 border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white">Our Mission</h3>
          <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Provide uninterrupted access to microcontrollers, sensors, and PCB fabrication kits.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Organize regular workshops on Embedded C, FreeRTOS, MQTT, and Edge AI.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Mentor competitive teams for Smart India Hackathon (SIH) and technical symposiums.</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutCollegePage;
