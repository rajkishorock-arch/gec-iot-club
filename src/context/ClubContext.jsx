import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  eventsData as initialEvents, 
  verifiedCertificates as initialCerts, 
  teamMembers as initialTeam,
  galleryItems as initialGallery
} from '../data/mockData';

const ClubContext = createContext();

export const ClubProvider = ({ children }) => {
  // 1. Events State
  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem('gec_iot_events');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= initialEvents.length) return parsed;
      }
    } catch (e) {}
    return initialEvents;
  });

  // 2. Certificates State (5 items: 2 verified, 3 pending matching media_1790600541180.png)
  const [certificates, setCertificates] = useState(() => {
    try {
      const saved = localStorage.getItem('gec_iot_certificates');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 5) return parsed;
      }
    } catch (e) {}
    return initialCerts;
  });

  // 3. Registered Students & Applicants State
  const [applicants, setApplicants] = useState(() => {
    const saved = localStorage.getItem('gec_iot_applicants');
    return saved ? JSON.parse(saved) : [
      {
        id: "GEC-APP-10291",
        name: "Aditya Prakash",
        regNo: "22105128014",
        branch: "ECE",
        semester: "5th Sem",
        email: "aditya.prakash@geckhagaria.org",
        phone: "+91 98765 43210",
        domain: "ESP32 & Embedded C",
        status: "Approved",
        date: "Sep 20, 2026"
      },
      {
        id: "GEC-APP-10344",
        name: "Riya Sen",
        regNo: "22105128032",
        branch: "CSE",
        semester: "5th Sem",
        email: "riya.sen@geckhagaria.org",
        phone: "+91 98765 43211",
        domain: "Cloud IoT & MQTT",
        status: "Approved",
        date: "Sep 22, 2026"
      },
      {
        id: "GEC-APP-10492",
        name: "Saurav Jha",
        regNo: "23105128019",
        branch: "EE",
        semester: "3rd Sem",
        email: "saurav.jha@geckhagaria.org",
        phone: "+91 98765 43212",
        domain: "PCB Designing & Robotics",
        status: "Pending",
        date: "Sep 27, 2026"
      }
    ];
  });

  // 4. Join Form Status Toggle
  const [isJoinFormOpen, setIsJoinFormOpen] = useState(() => {
    const saved = localStorage.getItem('gec_iot_form_open');
    return saved ? JSON.parse(saved) : true;
  });

  // 5. Gallery & Expo Photos
  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('gec_iot_gallery');
    return saved ? JSON.parse(saved) : initialGallery;
  });

  // 6. Journey & Milestones State
  const [milestones, setMilestones] = useState(() => {
    const saved = localStorage.getItem('gec_iot_milestones');
    return saved ? JSON.parse(saved) : [
      {
        id: "m-2026-sih",
        year: "2026",
        title: "National SIH Hardware Finale & IoTXPO",
        subtitle: "Podium Finish & Patent Filing",
        badge: "National Victory",
        date: "August 2026",
        description: "Secured 1st Runner Up at the Smart India Hackathon (SIH 2026) Hardware Edition for autonomous river flood telemetry and industrial pipeline leak prediction. Hosted Bihar's largest collegiate IoTXPO with 500+ attendees.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        tags: ["SIH Hardware Edition", "LoRaWAN 15km", "₹75,000 Cash Prize", "500+ Attendees"],
        stats: [
          { label: "Hardware Nodes", value: "48+" },
          { label: "Telemetry Range", value: "15.4 km" },
          { label: "Innovation Grant", value: "₹75,000" }
        ]
      },
      {
        id: "m-2025-lab",
        year: "2025",
        title: "Dedicated Advanced IoT & Embedded Lab Established",
        subtitle: "Department of Science & Technology, Bihar",
        badge: "Infrastructure",
        date: "April 2025",
        description: "Inaugurated the State-of-the-Art IoT Embedded Systems Laboratory equipped with DSO oscilloscopes, high-precision SMD rework stations, ESP32-S3 boards, LoRaWAN gateways, and robotics kits.",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        tags: ["State IoT Lab", "SMD Soldering Benches", "FreeRTOS Bootcamps", "DST Bihar Grant"],
        stats: [
          { label: "Lab Workstations", value: "30+" },
          { label: "Kits Available", value: "120+" },
          { label: "Faculty Mentors", value: "6" }
        ]
      },
      {
        id: "m-2024-foundation",
        year: "2024",
        title: "Inaugural Chapter Foundation & Smart Campus Deploy",
        subtitle: "First Campus Telemetry Grid",
        badge: "Foundation",
        date: "September 2024",
        description: "Official founding of the GEC Khagaria IoT Club by Dr. Arvind Kumar and student core leads. Deployed the college campus first automated water tank level monitoring and smart power telemetry grid.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
        tags: ["Club Foundation", "Smart Campus Telemetry", "100+ First Members"],
        stats: [
          { label: "Founding Cohort", value: "100+" },
          { label: "Live Nodes", value: "12" },
          { label: "Uptime", value: "99.8%" }
        ]
      }
    ];
  });

  // 7. Contact Messages
  const [contactMessages, setContactMessages] = useState(() => {
    const saved = localStorage.getItem('gec_iot_contact_messages');
    return saved ? JSON.parse(saved) : [
      {
        id: "msg-101",
        name: "Rohan Verma",
        email: "rohan.ece@geckhagaria.org",
        subject: "Hardware Kit Allotment Query",
        message: "Respected Team, I would like to request an ESP32-S3 development board for our agriculture sensor project.",
        date: "Sep 28, 2026",
        status: "Unread"
      },
      {
        id: "msg-102",
        name: "Anjali Kumari",
        email: "anjali.cse@geckhagaria.org",
        subject: "FreeRTOS Bootcamp Registration",
        message: "Can 3rd semester CSE students join the FreeRTOS multi-threading track directly?",
        date: "Sep 27, 2026",
        status: "Replied"
      }
    ];
  });

  // 8. Declared Results (for Faculty & Admin)
  const [declaredResults, setDeclaredResults] = useState(() => {
    const saved = localStorage.getItem('gec_iot_declared_results');
    return saved ? JSON.parse(saved) : [
      {
        id: "res-1",
        eventTitle: "Khagaria IoT Make-a-thon 2026",
        winnerTeam: "Team AgroSmart",
        winnerLeader: "Aditya Prakash",
        winnerBranch: "ECE",
        runnerUpTeam: "Team HydroSensors",
        runnerUpLeader: "Neha Kumari",
        innovationPrize: "Autonomous Drone Pipeline Inspector",
        declaredBy: "Prof. Manoj Sharma (Coordinator)",
        date: "Sep 26, 2026",
        status: "Published"
      }
    ];
  });

  // 9. Complaints & Issues State (as seen in geckhaiml.live/dashboard/write-complaint)
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('gec_iot_complaints');
    return saved ? JSON.parse(saved) : [];
  });

  // 10. Reviews State (as seen in geckhaiml.live/dashboard/submit-review)
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('gec_iot_reviews');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('gec_iot_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('gec_iot_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('gec_iot_applicants', JSON.stringify(applicants));
  }, [applicants]);

  useEffect(() => {
    localStorage.setItem('gec_iot_form_open', JSON.stringify(isJoinFormOpen));
  }, [isJoinFormOpen]);

  useEffect(() => {
    localStorage.setItem('gec_iot_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('gec_iot_milestones', JSON.stringify(milestones));
  }, [milestones]);

  useEffect(() => {
    localStorage.setItem('gec_iot_contact_messages', JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem('gec_iot_declared_results', JSON.stringify(declaredResults));
  }, [declaredResults]);

  useEffect(() => {
    localStorage.setItem('gec_iot_complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('gec_iot_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Admin Actions
  const addEvent = (newEvent) => {
    setEvents([newEvent, ...events]);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const issueCertificate = (newCert) => {
    setCertificates([newCert, ...certificates]);
  };

  const updateApplicantStatus = (id, newStatus) => {
    setApplicants(applicants.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };

  const addGalleryImage = (newImage) => {
    setGallery([newImage, ...gallery]);
  };

  const deleteGalleryImage = (id) => {
    setGallery(gallery.filter(g => g.id !== id));
  };

  const togglePinGalleryImage = (id) => {
    setGallery(gallery.map(g => g.id === id ? { ...g, pinned: !g.pinned } : g));
  };

  const addMilestone = (newMilestone) => {
    setMilestones([newMilestone, ...milestones]);
  };

  const deleteMilestone = (id) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  const addContactMessage = (newMsg) => {
    setContactMessages(prev => [{ ...newMsg, id: `msg-${Date.now()}`, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), status: 'Unread' }, ...prev]);
  };

  const replyContactMessage = (id, replyText) => {
    setContactMessages(prev => prev.map(m => m.id === id ? { ...m, reply: replyText, status: 'Responded' } : m));
  };

  const deleteContactMessage = (id) => {
    setContactMessages(prev => prev.filter(m => m.id !== id));
  };

  const declareNewResult = (res) => {
    setDeclaredResults(prev => [res, ...prev]);
  };

  const addComplaint = (newComplaint) => {
    const complaint = {
      id: `CMP-${Date.now()}`,
      status: 'open',
      responses: 0,
      responseMessages: [],
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      ...newComplaint
    };
    setComplaints(prev => [complaint, ...prev]);
    return complaint;
  };

  const updateComplaintStatus = (id, newStatus) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const addComplaintResponse = (id, message, responder = 'admin') => {
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        const responseList = c.responseMessages || [];
        return {
          ...c,
          responses: responseList.length + 1,
          responseMessages: [
            ...responseList,
            {
              _id: `resp-${Date.now()}`,
              responder,
              message,
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            }
          ]
        };
      }
      return c;
    }));
  };

  const addReview = (newReview) => {
    const review = {
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      ...newReview
    };
    setReviews(prev => [review, ...prev]);
    return review;
  };

  // 11. Website CMS & Section Customizer State
  const [cmsContent, setCmsContent] = useState(() => {
    const saved = localStorage.getItem('gec_iot_cms_content');
    return saved ? JSON.parse(saved) : {
      heroTitle: "Empowering IoT & Embedded Innovation at GEC Khagaria",
      heroSubtitle: "Welcome to the official Internet of Things & Embedded Systems Club of Government Engineering College, Khagaria. Developing connected hardware, edge intelligence, and smart agriculture telemetry.",
      heroBadge: "OFFICIAL WEBSITE • GEC KHAGARIA ↗",
      heroPrompt: "Generate an autonomous soil telemetry and water pump controller with ESP32 FreeRTOS",
      sectionTitles: {
        innovations: "IoT & Embedded Innovations",
        milestones: "IoT Club Journey & Milestones",
        steps: "Three Steps to Participate",
        events: "Club Events & Hackathons",
        expo: "IOTXPO'26 Premier Hardware Showcase",
        team: "Meet Our Leadership Team",
        reviews: "Verified Event Attendees / Student Reviews",
        contact: "Get in Touch"
      },
      sectionsVisibility: {
        hero: true,
        innovations: true,
        milestones: true,
        steps: true,
        events: true,
        expo: true,
        team: true,
        reviews: true,
        contact: true
      },
      customSections: [
        {
          id: "cs-1",
          title: "Hardware Component Lending Library",
          badge: "LAB INVENTORY",
          subtitle: "Free component kits, sensors, DSO oscilloscopes, and soldering stations available for all verified club members.",
          buttonText: "Request Components",
          buttonLink: "contact",
          image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
        }
      ]
    };
  });

  // 10. Authorized Admin Delegates (Only designated individuals can manage)
  const [authorizedAdmins, setAuthorizedAdmins] = useState(() => {
    const saved = localStorage.getItem('gec_iot_authorized_admins');
    return saved ? JSON.parse(saved) : [
      {
        email: "admin@geckhagaria.org",
        name: "Dr. Arvind Kumar",
        role: "Master Super Admin (Principal)",
        grantedDate: "Permanent"
      },
      {
        email: "manoj.sharma@geckhagaria.org",
        name: "Prof. Manoj Sharma",
        role: "Faculty Coordinator (Delegated Admin)",
        grantedDate: "Sep 2026"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('gec_iot_cms_content', JSON.stringify(cmsContent));
  }, [cmsContent]);

  useEffect(() => {
    localStorage.setItem('gec_iot_authorized_admins', JSON.stringify(authorizedAdmins));
  }, [authorizedAdmins]);

  // Admin CMS & Website Customizer Actions
  const updateCmsContent = (updates) => {
    setCmsContent(prev => ({ ...prev, ...updates }));
  };

  const toggleSectionVisibility = (key) => {
    setCmsContent(prev => ({
      ...prev,
      sectionsVisibility: {
        ...prev.sectionsVisibility,
        [key]: !prev.sectionsVisibility[key]
      }
    }));
  };

  const addCustomSection = (section) => {
    setCmsContent(prev => ({
      ...prev,
      customSections: [
        { ...section, id: `cs-${Date.now()}` },
        ...(prev.customSections || [])
      ]
    }));
  };

  const deleteCustomSection = (id) => {
    setCmsContent(prev => ({
      ...prev,
      customSections: (prev.customSections || []).filter(cs => cs.id !== id)
    }));
  };

  const grantAdminAccess = (newAdmin) => {
    setAuthorizedAdmins([newAdmin, ...authorizedAdmins]);
  };

  const revokeAdminAccess = (email) => {
    if (email === "admin@geckhagaria.org") {
      alert("Master Super Admin cannot be removed.");
      return;
    }
    setAuthorizedAdmins(authorizedAdmins.filter(a => a.email !== email));
  };

  // 11. Portal Settings
  const [portalSettings, setPortalSettings] = useState(() => {
    const saved = localStorage.getItem('gec_iot_portal_settings');
    return saved ? JSON.parse(saved) : {
      portalName: 'GEC Khagaria IoT & Robotics Club',
      academicSession: '2026-2027',
      primaryContactEmail: 'iotclub@geckhagaria.org',
      campusAddress: 'Government Engineering College Khagaria, Bihar 851214',
      principalAuthority: 'Dr. Arvind Kumar (Principal & Patron)',
      coordinatorAuthority: 'Prof. Manoj Sharma (Faculty Coordinator)',
      maxKitsPerTeam: '2 Units',
      hardwareLabHours: '09:00 AM - 07:00 PM (Mon-Sat)',
      allowPublicCertLookup: true,
      allowDirectJoinApplications: true
    };
  });

  useEffect(() => {
    localStorage.setItem('gec_iot_portal_settings', JSON.stringify(portalSettings));
  }, [portalSettings]);

  const updatePortalSettings = (newSettings) => {
    setPortalSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <ClubContext.Provider value={{
      events,
      addEvent,
      deleteEvent,
      certificates,
      issueCertificate,
      applicants,
      updateApplicantStatus,
      isJoinFormOpen,
      setIsJoinFormOpen,
      gallery,
      addGalleryImage,
      deleteGalleryImage,
      togglePinGalleryImage,
      milestones,
      addMilestone,
      deleteMilestone,
      contactMessages,
      addContactMessage,
      replyContactMessage,
      deleteContactMessage,
      declaredResults,
      declareNewResult,
      complaints,
      addComplaint,
      updateComplaintStatus,
      addComplaintResponse,
      reviews,
      addReview,
      cmsContent,
      updateCmsContent,
      toggleSectionVisibility,
      addCustomSection,
      deleteCustomSection,
      authorizedAdmins,
      grantAdminAccess,
      revokeAdminAccess,
      portalSettings,
      updatePortalSettings
    }}>
      {children}
    </ClubContext.Provider>
  );
};

export const useClub = () => useContext(ClubContext);
