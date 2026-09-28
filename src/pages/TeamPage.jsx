import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Award, 
  Mail, 
  ExternalLink,
  Cpu,
  GraduationCap
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import { teamMembers } from '../data/mockData';

const TeamPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <Users className="w-4 h-4 text-cyan-400" />
          <span>People Behind the Hardware Innovation</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Leadership & Core Team
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Meet the visionary faculty coordinators and energetic student engineers driving the Internet of Things ecosystem at GEC Khagaria.
        </p>
      </div>

      {/* 1. PATRON & PRINCIPAL */}
      <section className="space-y-6">
        <div className="text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
            Patron & Head of Institution
          </span>
        </div>

        <div className="max-w-2xl mx-auto">
          {teamMembers.patron.map((member, idx) => (
            <div 
              key={idx}
              className="glass-panel rounded-3xl p-8 border border-amber-500/30 text-center space-y-4 relative overflow-hidden bg-gradient-to-b from-amber-500/5 to-transparent"
            >
              <div className="relative w-28 h-28 mx-auto">
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="w-full h-full rounded-2xl border-2 border-amber-400/50 bg-slate-900 object-cover p-1 shadow-xl"
                />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                <p className="text-xs font-mono text-amber-400 font-semibold">{member.role}</p>
                <p className="text-xs text-slate-400 mt-1">{member.department}</p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto italic">
                "{member.bio}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. FACULTY COORDINATORS */}
      <section className="space-y-6">
        <div className="text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            Faculty Coordinators & Mentors
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.facultyCoordinators.map((mentor, idx) => (
            <div 
              key={idx}
              className="glass-panel rounded-2xl p-6 border border-cyan-500/20 flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left group hover:border-cyan-500/40 transition-colors"
            >
              <img 
                src={mentor.avatar} 
                alt={mentor.name} 
                className="w-20 h-20 rounded-xl border border-cyan-500/30 bg-slate-900 object-cover shrink-0"
              />
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {mentor.name}
                </h4>
                <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  {mentor.role}
                </div>
                <p className="text-xs text-slate-400">{mentor.department}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{mentor.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. STUDENT LEADS */}
      <section className="space-y-6">
        <div className="text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
            Student Technical & Operational Leads
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.studentLeads.map((lead, idx) => (
            <div 
              key={idx}
              className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4 text-center">
                <div className="w-20 h-20 mx-auto relative">
                  <img 
                    src={lead.avatar} 
                    alt={lead.name} 
                    className="w-full h-full rounded-2xl border border-emerald-500/30 bg-slate-900 p-0.5 object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-900" />
                </div>

                <div>
                  <h4 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">
                    {lead.name}
                  </h4>
                  <p className="text-[11px] font-mono text-emerald-400 font-semibold mt-0.5">
                    {lead.role}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {lead.branch}
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-slate-900/80 border border-white/5 text-[11px] text-slate-300 font-mono">
                  {lead.specialization}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-center gap-4 text-slate-400">
                <a href={lead.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a href={lead.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CORE VOLUNTEERS */}
      <section className="space-y-6">
        <div className="text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
            Core Team & Lab Contributors
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {teamMembers.coreMembers.map((member, idx) => (
            <div 
              key={idx}
              className="glass-card rounded-xl p-4 text-center space-y-2 border border-white/5"
            >
              <img 
                src={member.avatar} 
                alt={member.name} 
                className="w-12 h-12 rounded-xl bg-slate-900 mx-auto"
              />
              <div className="font-semibold text-xs text-white">{member.name}</div>
              <div className="text-[11px] text-cyan-400 font-mono">{member.role}</div>
              <div className="text-[10px] text-slate-500 font-mono">{member.branch}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default TeamPage;
