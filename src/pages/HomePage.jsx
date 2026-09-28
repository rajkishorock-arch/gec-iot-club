import React from 'react';
import { useClub } from '../context/ClubContext';
import { GECHero } from '../components/GECHero';
import { InnovationsSection } from '../components/InnovationsSection';
import { JourneyMilestonesSection } from '../components/JourneyMilestonesSection';
import { ThreeStepsSection } from '../components/ThreeStepsSection';
import { ClubEventsSection } from '../components/ClubEventsSection';
import { ExpoSection } from '../components/ExpoSection';
import { LeadershipSection } from '../components/LeadershipSection';
import { ReviewsMarqueeSection } from '../components/ReviewsMarqueeSection';
import { ContactSection } from '../components/ContactSection';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HomePage = ({ setActiveTab, setSelectedEvent, currentUser }) => {
  const { cmsContent } = useClub();
  const visibility = cmsContent?.sectionsVisibility || {};
  const customSections = cmsContent?.customSections || [];

  return (
    <div className="bg-black text-white selection:bg-[#00BFFB] selection:text-black font-['General_Sans',sans-serif] space-y-16 sm:space-y-24">
      
      {/* 1. HERO SECTION */}
      {visibility.hero !== false && (
        <GECHero setActiveTab={setActiveTab} currentUser={currentUser} />
      )}

      {/* 2. IOT & EMBEDDED INNOVATIONS */}
      {visibility.innovations !== false && (
        <div id="innovations">
          <InnovationsSection />
        </div>
      )}

      {/* 3. IOT CLUB JOURNEY & MILESTONES */}
      {visibility.milestones !== false && (
        <div id="milestones">
          <JourneyMilestonesSection />
        </div>
      )}

      {/* 4. THREE STEPS TO PARTICIPATE */}
      {visibility.steps !== false && (
        <ThreeStepsSection />
      )}

      {/* 5. CLUB EVENTS & HACKATHONS */}
      {visibility.events !== false && (
        <div id="events">
          <ClubEventsSection setActiveTab={setActiveTab} setSelectedEvent={setSelectedEvent} />
        </div>
      )}

      {/* 6. IOTXPO'26 SHOWCASE */}
      {visibility.expo !== false && (
        <ExpoSection />
      )}

      {/* 7. MEET OUR LEADERSHIP TEAM */}
      {visibility.team !== false && (
        <div id="team">
          <LeadershipSection />
        </div>
      )}

      {/* 8. VERIFIED EVENT ATTENDEE REVIEWS */}
      {visibility.reviews !== false && (
        <ReviewsMarqueeSection />
      )}

      {/* DYNAMIC CUSTOM SECTIONS (Added by Admin in CMS) */}
      {customSections.map((cs) => (
        <section key={cs.id} className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="rounded-3xl p-8 sm:p-12 bg-[#040812] border border-white/15 relative overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#FF8918]/15 text-[#FF8918] border border-[#FF8918]/30 inline-block">
                {cs.badge}
              </span>
              <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                {cs.title}
              </h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
                {cs.subtitle}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setActiveTab(cs.buttonLink || 'events');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FF8918] to-[#DA4E24] text-black font-bold text-xs sm:text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <span>{cs.buttonText || 'Learn More'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {cs.image && (
              <div className="md:col-span-5 rounded-2xl overflow-hidden border border-white/20 shadow-xl aspect-video">
                <img src={cs.image} alt={cs.title} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </section>
      ))}

      {/* 9. GET IN TOUCH & SEND US A MESSAGE */}
      {visibility.contact !== false && (
        <ContactSection />
      )}

    </div>
  );
};

export default HomePage;
