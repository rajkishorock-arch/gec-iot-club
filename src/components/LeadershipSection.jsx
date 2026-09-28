import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import { Cpu, Sparkles, Award } from 'lucide-react';
import { teamMembers } from '../data/mockData';

export const LeadershipSection = () => {
  const [filter, setFilter] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Leadership' },
    { id: 'patron', label: 'Patron' },
    { id: 'faculty', label: 'Faculty Coordinators' },
    { id: 'leads', label: 'Student Leads' },
    { id: 'core', label: 'Core Members' }
  ];

  // Core members matching Screenshot 1
  const coreMembers = [
    {
      id: 'cm-1',
      name: 'Vedansh Kumar',
      role: 'Club Member',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      quote: 'Designs and maintains the IoT learning roadmap to guide club members in their journey.'
    },
    {
      id: 'cm-2',
      name: 'Rajiv Nayan',
      role: 'Club Member',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      quote: 'Plans, designs, and organizes IoT-related events to guide club members in their learning journey.'
    },
    {
      id: 'cm-3',
      name: 'Lovely Kumari',
      role: 'Club Member',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      quote: 'Designs and maintains the IoT Learning Roadmap to guide club members in their skill-building journey.'
    },
    {
      id: 'cm-4',
      name: 'Harsh Raj',
      role: 'Club Member',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      quote: 'Designs and maintains the IoT Learning Roadmap to guide club members in their skill-building journey.'
    },
    {
      id: 'cm-5',
      name: 'Priyanshu Verma',
      role: 'Club Member',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
      quote: 'Writes, edits, and maintains IoT-related blog content to support club members in their learning journey.'
    },
    {
      id: 'cm-6',
      name: 'Sneha Patel',
      role: 'Club Member',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      quote: 'Writes, edits, and maintains IoT-related blog content to support club members in their learning journey.'
    }
  ];

  return (
    <section id="team" className="max-w-[1320px] mx-auto px-5 sm:px-8 py-16 sm:py-24 font-['General_Sans',sans-serif]">
      
      {/* Title with Signature Beam Animation */}
      <SectionTitle 
        title="Meet Our Leadership Team"
        subtitle="Distinguished faculty advisors, student researchers, and coordinators driving the club forward."
      />

      {/* Filter Tabs Bar (Matching Screenshot Pill Tabs) */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 pb-12 pt-4">
        {tabs.map((tab) => {
          const isActive = filter === tab.id;

          return isActive ? (
            /* Active pill with glowing gradient border */
            <div 
              key={tab.id}
              className="p-[1.5px] rounded-full"
              style={{
                background: "linear-gradient(163deg, #FF8918 28%, #DA4E24 54%, #00BFFB 100%)",
                boxShadow: "0 0 14px rgba(255, 137, 24, 0.3)"
              }}
            >
              <button
                onClick={() => setFilter(tab.id)}
                className="px-5 py-2 rounded-full bg-black text-white text-xs sm:text-sm font-semibold tracking-wide"
              >
                {tab.label}
              </button>
            </div>
          ) : (
            /* Inactive pill */
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 text-xs sm:text-sm font-medium tracking-wide transition-all"
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 1. Patron & Faculty Section */}
      {(filter === 'all' || filter === 'patron' || filter === 'faculty') && (
        <div className="space-y-6 mb-16">
          <h4 className="text-center text-xs font-bold uppercase tracking-widest text-[#FF8918] font-mono">
            Institutional Patrons & Advisors
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {([...(teamMembers.patron || []), ...(teamMembers.facultyCoordinators || [])]).slice(0, 2).map((member, mIdx) => (
              <div
                key={member.name || mIdx}
                className="relative rounded-3xl bg-[#030712] border border-white/15 p-6 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-white/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-white/20 flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform bg-white/5">
                    <img src={member.avatar || member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FF8918]/15 text-[#FF8918] border border-[#FF8918]/30">
                      {member.department || "GEC Khagaria"}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-xs text-white/60 font-medium">
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10">
                  <p className="text-xs sm:text-sm text-white/70 italic leading-relaxed">
                    "{member.bio}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. CORE MEMBERS Grid (Screenshot 1 Exact Implementation) */}
      {(filter === 'all' || filter === 'core') && (
        <div className="space-y-6 pt-4">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-white/70 font-mono">
              CORE MEMBERS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {coreMembers.map((cm) => (
              <div 
                key={cm.id}
                className="rounded-3xl bg-[#060b18]/90 border border-white/10 hover:border-white/25 p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 group hover:shadow-[0_10px_30px_rgba(0,191,251,0.12)]"
              >
                {/* Top: Sparkles Icon + IoT Club & Club Member Pill */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/90">
                    <Sparkles className="w-4 h-4 text-[#00BFFB]" />
                    <span className="text-xs font-bold tracking-tight">IoT Club</span>
                  </div>

                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium text-[#FF8918] bg-[#FF8918]/10 border border-[#FF8918]/30">
                    {cm.role}
                  </span>
                </div>

                {/* Middle: Member Quote */}
                <p className="text-xs sm:text-[13.5px] text-white/85 font-medium leading-relaxed">
                  “{cm.quote}”
                </p>

                {/* Bottom: Avatar + Name + Subtitle */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/20 flex-shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                    <img src={cm.avatar} alt={cm.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-[#00BFFB] transition-colors">
                      {cm.name}
                    </h4>
                    <p className="text-[11px] text-white/50 font-mono">
                      {cm.role}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
};

export default LeadershipSection;
