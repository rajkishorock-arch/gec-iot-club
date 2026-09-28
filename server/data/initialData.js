import { eventsData, verifiedCertificates, teamMembers, galleryItems } from '../../src/data/mockData.js';

export const getInitialDatabase = () => ({
  users: [
    {
      id: "usr-admin-1",
      email: "admin@geckhagaria.org",
      password: "admin@gec2026",
      name: "Dr. Arvind Kumar",
      role: "admin",
      department: "Principal & Patron",
      phone: "+91 6244 295 001",
      status: "Active",
      createdAt: "2026-08-01"
    },
    {
      id: "usr-faculty-1",
      email: "faculty@geckhagaria.org",
      password: "faculty@gec2026",
      name: "Prof. Manoj Sharma",
      role: "faculty",
      department: "ECE - Faculty Coordinator",
      phone: "+91 98765 43210",
      status: "Active",
      createdAt: "2026-08-15"
    },
    {
      id: "usr-student-1",
      email: "student@geckhagaria.org",
      password: "student@gec2026",
      name: "Rajkishor Kumar",
      firstName: "Rajkishor",
      regNo: "24155154009",
      role: "student",
      branch: "Computer Science Engineering",
      batch: "2024 2028",
      semester: "5th Sem",
      phone: "7488307713",
      location: "College Campus",
      memberSince: "September 24, 2026",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      position: "AIML Enthusiast",
      status: "Active",
      createdAt: "2026-09-01"
    }
  ],
  otps: {},
  events: eventsData,
  certificates: verifiedCertificates,
  applicants: [
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
      status: "Pending",
      date: "Sep 22, 2026"
    }
  ],
  complaints: [
    {
      id: "CMP-171001",
      studentName: "Aditya Prakash",
      regNo: "22105128014",
      title: "LoRa SX1278 SPI Communication Timeout on Lab Bench 4",
      category: "hardware",
      status: "in-progress",
      priority: "high",
      date: "Sep 24, 2026",
      description: "During our Smart Agriculture project testing, the LoRa RFM95W module fails to initialize on Bench 4. Logic analyzer shows no response on MISO pin.",
      responses: 2,
      responseMessages: [
        {
          responder: "Dr. Arvind Kumar (Principal)",
          date: "Sep 24, 2026",
          message: "Bench 4 oscilloscope and jumper kit have been flagged for replacement. Prof. Manoj will provide the spare Semtech transceiver kit."
        }
      ]
    },
    {
      id: "CMP-171002",
      studentName: "Rajkishor Kumar",
      regNo: "24155154009",
      title: "Certificate Verification QR Link Resolution",
      category: "certificate",
      status: "resolved",
      priority: "medium",
      date: "Sep 22, 2026",
      description: "My Hackathon Winner certificate ID GEC-IOT-2026-V01 verified link opens directly on the dashboard portal without error.",
      responses: 1,
      responseMessages: [
        {
          responder: "Admin Desk",
          date: "Sep 22, 2026",
          message: "Verification record UID updated on the public verification portal."
        }
      ]
    }
  ],
  reviews: [
    {
      id: "rev-1",
      studentName: "Rajkishor Kumar",
      regNo: "24155154009",
      eventTitle: "AI Website Building Competition",
      eventDate: "March 2026",
      rating: 5,
      feeling: "Great",
      emoji: "😄",
      contentRating: 5,
      handsOnRating: 5,
      organizationRating: 5,
      mentorshipRating: 5,
      feedback: "The competition gave us high-speed hardware tools, mentors were always ready to debug our code, and the judging standards were truly national level!",
      recommend: true,
      verifiedAttendee: true,
      date: "March 15, 2026"
    },
    {
      id: "rev-2",
      studentName: "Aditya Prakash",
      regNo: "22105128014",
      eventTitle: "Khagaria IoT Make-a-thon 2026",
      eventDate: "Nov 2026",
      rating: 5,
      feeling: "Awesome",
      emoji: "🚀",
      contentRating: 5,
      handsOnRating: 5,
      organizationRating: 5,
      mentorshipRating: 5,
      feedback: "Best hardware sprint experience at GEC Khagaria. Received original ESP32-S3 boards and immediate lab mentoring.",
      recommend: true,
      verifiedAttendee: true,
      date: "Sep 20, 2026"
    }
  ],
  milestones: [
    {
      id: "m-2026-sih",
      year: "2026",
      badge: "National Podium",
      title: "Smart India Hackathon (Hardware Edition) - 1st Runner Up",
      subtitle: "Ministry of Jal Shakti • Flood Telemetry & Sensor Mesh",
      date: "February 2026",
      description: "GEC Khagaria Team AeroSensors designed and deployed an autonomous LoRa sensor node along the Kosi-Ganga river belt. Equipped with ultrasonic water level transceivers and solar harvesting MPPT controllers.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
      ],
      stats: [
        { label: "Transmission Range", value: "14.2 km" },
        { label: "Nodes Deployed", value: "18 Units" },
        { label: "Cash Grant", value: "₹75,000" }
      ],
      tags: ["SIH2026", "HardwareEdition", "LoRaWAN", "RiverTelemetry"]
    },
    {
      id: "m-2025-lab",
      year: "2025",
      badge: "Infrastructure",
      title: "Inauguration of Advanced IoT Embedded Systems Laboratory",
      subtitle: "State-of-the-art Oscilloscopes, SMT Soldering & Microcontroller Benches",
      date: "September 2025",
      description: "Establishment of dedicated hardware prototyping workbenches funded by the Department of Science, Technology and Technical Education, Govt. of Bihar.",
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1200&q=80"
      ],
      stats: [
        { label: "Workbenches", value: "24 Stations" },
        { label: "Dev Kits", value: "120+ Boards" }
      ],
      tags: ["LabInauguration", "GovtOfBihar", "TechnicalEducation"]
    }
  ],
  gallery: galleryItems,
  contactMessages: [
    {
      id: "msg-101",
      name: "Rohit Anand",
      email: "rohit.anand@geckhagaria.org",
      subject: "Inquiry about Hardware Kit Allotment for 3rd Sem",
      message: "Respected Coordinators, our team wants to start working on an autonomous obstacle avoidance rover. Can we be allotted Arduino and ultrasonic sensors this Saturday?",
      date: "Sep 26, 2026",
      status: "Responded",
      reply: "Yes Rohit, please visit Lab Workbench 6 this Saturday at 10 AM. Prof. Manoj Sharma has approved your team allotment."
    },
    {
      id: "msg-102",
      name: "Sneha Kumari",
      email: "sneha.k@gmail.com",
      subject: "Certificate Verification ID GEC-IOT-2026-V01",
      message: "I needed to verify the AI Website Building Competition Certificate for my internship application. Thank you for the quick online record!",
      date: "Sep 27, 2026",
      status: "Unread"
    }
  ],
  cmsContent: {
    heroHeadlinePrefix: "Innovate. Connect.",
    heroHeadlineHighlight: "Automate with IoT.",
    heroSubtitle: "Welcome to the official Government Engineering College Khagaria IoT & Robotics Club. Building national hackathon champions, embedded firmware architects, and connected cyber-physical systems.",
    heroBadge: "DSTTE GOVT. OF BIHAR APPROVED CLUB",
    sectionsVisibility: {
      hero: true,
      ticker: true,
      about: true,
      threeSteps: true,
      innovations: true,
      milestones: true,
      expo: true,
      reviews: true,
      contact: true
    },
    customSections: [
      {
        id: "cs-sih-accelerator",
        title: "Smart India Hackathon Hardware Accelerator 2026-27",
        badge: "HARDWARE INCUBATION",
        subtitle: "Specialized 6-week intensive bootcamp with 24x7 lab access, PCB printing assistance, and faculty mentorship for SIH shortlist candidates.",
        buttonText: "Join SIH Accelerator Batch",
        buttonLink: "events",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  },
  portalSettings: {
    portalName: "GEC Khagaria IoT & Robotics Club",
    academicSession: "2026-2027",
    primaryContactEmail: "iotclub@geckhagaria.org",
    campusAddress: "Government Engineering College Khagaria, Bihar 851214",
    principalAuthority: "Dr. Arvind Kumar (Principal & Patron)",
    coordinatorAuthority: "Prof. Manoj Sharma (Faculty Coordinator)",
    maxKitsPerTeam: "2 Units",
    hardwareLabHours: "09:00 AM - 07:00 PM (Mon-Sat)",
    allowPublicCertLookup: true,
    allowDirectJoinApplications: true,
    logoUrl: ""
  },
  authorizedAdmins: [
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
  ]
});
