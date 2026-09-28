import React, { useState } from 'react';

export const ReviewsMarqueeSection = () => {
  const [activeReviewId, setActiveReviewId] = useState(3); // 3 = Stuti Kumari in screenshot

  const attendeesRow1 = [
    {
      id: 1,
      name: "Aditya Raj",
      attendeeTag: "Smart India Hackathon (SIH) - Internal Hackathon 2026 Attendee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdityaRaj&eyebrows=default"
    },
    {
      id: 2,
      name: "Amrit Raj",
      attendeeTag: "IoT Hardware Building Competition Attendee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AmritRaj&eyebrows=default"
    },
    {
      id: 3,
      name: "Stuti Kumari",
      attendeeTag: "Smart India Hackathon (SIH) - Internal Hackathon 2026 Attendee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=StutiKumari&hair=long01"
    },
    {
      id: 4,
      name: "Sonam Kumari",
      attendeeTag: "Smart India Hackathon (SIH) - Internal Hackathon 2026 Attendee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SonamKumari&hair=long02"
    }
  ];

  const attendeesRow2 = [
    {
      id: 5,
      name: "Raman Kumar",
      attendeeTag: "Smart India Hackathon (SIH) - Internal Hackathon 2026 Attendee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RamanKumar&eyebrows=default"
    },
    {
      id: 6,
      name: "Afsar Ali",
      attendeeTag: "Smart India Hackathon (SIH) - Internal Hackathon 2026 Attendee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AfsarAli&eyebrows=default"
    },
    {
      id: 7,
      name: "Vinit Tripathi",
      attendeeTag: "Smart India Hackathon (SIH) - Internal Hackathon 2026 Attendee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=VinitTripathi&eyebrows=default"
    }
  ];

  const attendeesRow3 = [
    {
      id: 8,
      name: "Abhay Kumar",
      attendeeTag: "IoT Hardware Building Competition Attendee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AbhayKumar&eyebrows=default"
    },
    {
      id: 9,
      name: "Abhay Raj",
      attendeeTag: "Smart India Hackathon (SIH) - Internal Hackathon 2026 Attendee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AbhayRaj&eyebrows=default"
    },
    {
      id: 10,
      name: "Harsh Sandilya",
      attendeeTag: "Smart India Hackathon (SIH) - Internal Hackathon 2026 Attendee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=HarshSandilya&eyebrows=default"
    }
  ];

  const renderPill = (person) => {
    const isSelected = activeReviewId === person.id;

    return (
      <div
        key={person.id}
        onClick={() => setActiveReviewId(person.id)}
        className={`flex items-center gap-3 px-4 py-2 rounded-full cursor-pointer select-none transition-all duration-300 flex-shrink-0 ${
          isSelected 
            ? 'bg-black border-2 border-dotted border-[#FF8918] shadow-[0_0_20px_rgba(255,137,24,0.35)]'
            : 'bg-[#060b18] hover:bg-[#0a1226] border border-white/10'
        }`}
      >
        <img 
          src={person.avatar} 
          alt={person.name} 
          className="w-8 h-8 rounded-full bg-slate-900 border border-white/20 flex-shrink-0"
        />

        <div className="min-w-0 pr-2">
          <div className={`text-xs font-bold truncate ${isSelected ? 'text-[#FF8918]' : 'text-white'}`}>
            {person.name}
          </div>
          <div className="text-[10.5px] text-white/50 truncate font-mono">
            {person.attendeeTag}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="max-w-[1340px] mx-auto px-5 sm:px-8 py-16 sm:py-24 font-['General_Sans',sans-serif] overflow-hidden">
      
      {/* Subheading from Screenshot */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
        {/* Cyan Glowing Horizontal Accent Line */}
        <div className="w-24 h-[2.5px] mx-auto bg-[#00BFFB] rounded-full shadow-[0_0_12px_#00BFFB]" />

        <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
          Real impressions and ratings shared by verified event participants, showcasing their learning journey and club experiences.
        </p>
      </div>

      {/* Staggered Rows of Attendee Pills */}
      <div className="space-y-4">
        {/* Row 1 */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {attendeesRow1.map(renderPill)}
        </div>

        {/* Row 2 */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {attendeesRow2.map(renderPill)}
        </div>

        {/* Row 3 */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {attendeesRow3.map(renderPill)}
        </div>
      </div>

    </section>
  );
};
