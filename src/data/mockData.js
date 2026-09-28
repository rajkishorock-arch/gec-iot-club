export const clubInfo = {
  name: "GEC Khagaria IoT Club",
  shortName: "GEC IoT Club",
  tagline: "Innovate. Connect. Automate.",
  college: "Government Engineering College, Khagaria",
  department: "Department of Science, Technology and Technical Education, Govt. of Bihar",
  email: "iotclubgeckhagaria@gmail.com",
  phone: "+91 6244 295 001",
  address: "Government Engineering College, Banni, Khagaria, Bihar - 851214",
  discord: "https://discord.com/invite/gec-iot-club",
  github: "https://github.com/geckhagaria-iot",
  collegeUrl: "https://geckhagaria.org.in",
  stats: {
    members: "190+",
    projects: "28+",
    workshops: "12+",
    sihFinalists: "4 Teams"
  }
};

export const domains = [
  {
    id: "embedded",
    title: "Embedded Systems & Microcontrollers",
    icon: "Cpu",
    badge: "Hardware Core",
    description: "Designing circuits, mastering ESP32, STM32, Arduino, and writing firmware in Embedded C and MicroPython.",
    skills: ["ESP32", "STM32", "Arduino", "Embedded C", "FreeRTOS", "PCB Design"]
  },
  {
    id: "robotics",
    title: "Robotics & Smart Automation",
    icon: "Bot",
    badge: "Cyber-Physical",
    description: "Autonomous rovers, drone telemetry, industrial robotic arms, and sensor fusion for automation.",
    skills: ["ROS 2", "Motor Drivers", "PID Control", "Kinematics", "Servo & Steppers"]
  },
  {
    id: "wireless",
    title: "Wireless Sensor Networks & LoRa",
    icon: "Radio",
    badge: "Networking",
    description: "Long-range low-power telemetry, mesh networking, BLE, Zigbee, and decentralized sensor grids.",
    skills: ["LoRaWAN", "Zigbee", "BLE 5.0", "Wi-Fi Mesh", "Cellular IoT"]
  },
  {
    id: "cloud-iot",
    title: "Cloud IoT & Edge AI",
    icon: "CloudLightning",
    badge: "Intelligence",
    description: "Streaming telemetry to AWS IoT, ThingsBoard, and running TinyML computer vision models on edge microchips.",
    skills: ["MQTT", "ThingsBoard", "TinyML", "AWS IoT Core", "Node-RED", "Edge Impulse"]
  }
];

export const eventsData = [
  {
    id: "iot-makeathon-2026",
    title: "Khagaria IoT Make-a-thon 2026",
    type: "Hackathon",
    badge: "Flagship Event",
    status: "Upcoming",
    date: "November 14-15, 2026",
    mode: "Offline (GEC Campus IoT Lab)",
    prizePool: "₹35,000",
    teamsCount: "48 Teams Registered",
    banner: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    summary: "36-hour non-stop hardware hackathon to build intelligent IoT solutions for Smart Agriculture, Flood Monitoring & Renewable Energy.",
    subEvents: [
      { id: "sub-1", title: "Smart Agriculture & Irrigation Track", type: "Team (3-4 Members)" },
      { id: "sub-2", title: "Disaster & River Level Monitoring Track", type: "Team (3-4 Members)" },
      { id: "sub-3", title: "Open Hardware Innovation Track", type: "Solo / Duo" }
    ],
    timeline: [
      { time: "Day 1 - 09:00 AM", task: "Opening Ceremony & Problem Statement Release" },
      { time: "Day 1 - 01:00 PM", task: "Hardware Kit Distribution & Mentoring Round 1" },
      { time: "Day 1 - 09:00 PM", task: "Midway Prototype Evaluation" },
      { time: "Day 2 - 10:00 AM", task: "Final Pitch & Live Working Demonstrations" },
      { time: "Day 2 - 03:00 PM", task: "Prize Distribution & Winner Announcement" }
    ],
    rules: [
      "Hardware prototypes must be built live in the lab during the hackathon.",
      "Basic development kits (ESP32, sensors, breadboards) will be provided by GEC IoT Club.",
      "Teams can bring specialized sensors or components with prior approval.",
      "Live demonstration in front of faculty judges is mandatory."
    ]
  },
  {
    id: "esp32-freertos-bootcamp",
    title: "ESP32 & Real-Time Operating Systems (FreeRTOS)",
    type: "Bootcamp",
    badge: "Skill Builder",
    status: "Upcoming",
    date: "October 20, 2026",
    mode: "Hybrid (Seminar Hall + Live Stream)",
    prizePool: "Certificates + Hardware Kit",
    teamsCount: "120 Seats",
    banner: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    summary: "Deep dive into dual-core ESP32 programming, multi-tasking with FreeRTOS queues, semaphores, and deep sleep battery optimization.",
    subEvents: [
      { id: "sub-boot-1", title: "Multithreading & FreeRTOS Architecture", type: "Hands-on Lab" },
      { id: "sub-boot-2", title: "Wi-Fi & Bluetooth Dual-Stack Protocols", type: "Coding Sprint" }
    ],
    timeline: [
      { time: "10:00 AM", task: "FreeRTOS Kernel Basics & Architecture" },
      { time: "12:00 PM", task: "Hands-on: Task Scheduler & Semaphore implementation" },
      { time: "02:30 PM", task: "Battery-Operated Low-Power Remote Node Project" }
    ],
    rules: [
      "Open to all branches (CSE, ECE, EE, ME, Civil).",
      "Laptop with VS Code + PlatformIO or Arduino IDE pre-installed is recommended.",
      "E-Certificate issued to all participants."
    ]
  },
  {
    id: "science-expo-2026",
    title: "Science Exhibition & AI Expo",
    type: "Group Event",
    badge: "Exhibition",
    status: "Completed",
    date: "Mar 16, 2026",
    mode: "GEC Campus Main Exhibition Hall (Offline)",
    prizePool: "₹50,000 & Trophy",
    teamsCount: "64 Projects Showcased",
    banner: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    summary: "Annual Science Exhibition & Artificial Intelligence Expo featuring interactive student exhibits, robotics demonstrations, and smart IoT devices.",
    subEvents: [
      { id: "expo-1", title: "AI/ML Innovations & Neural Network Prototypes", type: "Team (Group)" },
      { id: "expo-2", title: "Smart City & Agriculture Hardware Exhibits", type: "Team (Group)" }
    ],
    timeline: [
      { time: "09:30 AM", task: "Dignitary Inauguration & Exhibition Walkthrough" },
      { time: "01:30 PM", task: "Faculty & Expert Jury Evaluation" },
      { time: "04:30 PM", task: "Awards & Verified Merit Certificate Distribution" }
    ],
    rules: [
      "Open to all engineering students.",
      "Working prototype presentation is mandatory.",
      "Certified certificates granted to all verified participants."
    ]
  },
  {
    id: "ai-website-building-2026",
    title: "AI Website Building Competition",
    type: "Group Event",
    badge: "Web Challenge",
    status: "Completed",
    date: "Sep 26, 2026",
    mode: "GEC Khagaria Computer Lab 1 & 2",
    prizePool: "₹30,000",
    teamsCount: "42 Teams",
    banner: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    summary: "High-intensity hackathon sprint focused on building modern AI-assisted web applications, responsive interactive dashboards, and cloud integrations.",
    subEvents: [
      { id: "web-1", title: "Fullstack AI Interactive Application Sprint", type: "Team (Group)" }
    ],
    timeline: [
      { time: "10:00 AM", task: "Architecture & UI/UX Design Sprint" },
      { time: "02:00 PM", task: "API Integrations & Deployment Demo" }
    ],
    rules: [
      "Use modern web tech stacks (React, Vite, Tailwind CSS).",
      "Original designs and live URL deployment required."
    ]
  },
  {
    id: "sih-hardware-2025-showcase",
    title: "Smart India Hackathon (Hardware Edition) - Winners Showcase",
    type: "SIH",
    badge: "Achievement",
    status: "Completed",
    date: "August 2025",
    mode: "National Nodal Center",
    prizePool: "₹1,00,000 (National Winner)",
    teamsCount: "Team AeroSensors (GEC Khagaria)",
    banner: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    summary: "Team from GEC Khagaria IoT Club won 1st Prize at National SIH Hardware Edition for developing an AI-driven LoRa water pipeline leak detection system.",
    subEvents: [
      { id: "sih-1", title: "Acoustic Sensor Pipeline Diagnostics", type: "Patent Track" }
    ],
    timeline: [
      { time: "Grand Finale", task: "1st Position Nationwide at SIH 2025 Hardware Edition" }
    ],
    rules: ["National SIH guidelines followed."]
  }
];

export const teamMembers = {
  patron: [
    {
      name: "Dr. Arvind Kumar",
      role: "Patron & Principal",
      department: "Government Engineering College, Khagaria",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PrincipalGEC&eyebrows=default&hair=short02",
      bio: "Guiding the institution towards research excellence, national hackathon accomplishments, and cutting-edge laboratory infrastructure."
    }
  ],
  facultyCoordinators: [
    {
      name: "Prof. Manoj Sharma",
      role: "Head Faculty Coordinator",
      department: "Department of Electronics & Communication Engineering",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProfManoj&eyebrows=defaultNatural",
      bio: "12+ years experience in VLSI, Embedded Systems, and Wireless Communication Networks."
    },
    {
      name: "Prof. Shweta Kumari",
      role: "Faculty Mentor (IoT & Cloud)",
      department: "Department of Computer Science & Engineering",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProfShweta&hair=long01",
      bio: "Mentoring students in Cloud IoT gateways, edge analytics, and cybersecurity for IoT."
    }
  ],
  studentLeads: [
    {
      name: "Rajesh Kumar Singh",
      role: "Club Lead & Embedded Systems Architect",
      branch: "ECE, Final Year",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RajeshKumar&eyebrows=raisedExcited",
      specialization: "ESP32, LoRaWAN, SIH Winner",
      github: "https://github.com",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Aman Verma",
      role: "Technical Co-Lead (Firmware & Cloud)",
      branch: "CSE, 3rd Year",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AmanVerma",
      specialization: "MQTT, Node-RED, Edge AI",
      github: "https://github.com",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Pooja Patel",
      role: "Robotics & Hardware Design Lead",
      branch: "EE, 3rd Year",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PoojaPatel",
      specialization: "PCB Fabrication, Motor Controllers, ROS",
      github: "https://github.com",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Vikash Ranjan",
      role: "Operations & Lab Inventory Lead",
      branch: "ME, 3rd Year",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=VikashRanjan",
      specialization: "3D Printing, Rapid Enclosures, Sensor Logistics",
      github: "https://github.com",
      linkedin: "https://linkedin.com"
    }
  ],
  coreMembers: [
    { name: "Ananya Sinha", role: "Sensor Fusion Member", branch: "ECE", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnanyaS" },
    { name: "Deepak Choudhary", role: "MicroPython Developer", branch: "CSE", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DeepakC" },
    { name: "Sneha Roy", role: "UI/UX & Web Telemetry", branch: "CSE", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SnehaR" },
    { name: "Gaurav Mishra", role: "Circuit Prototyping", branch: "EE", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GauravM" }
  ]
};

export const verifiedCertificates = [
  {
    id: "GEC-IOT-2026-V01",
    studentName: "Rajkishor Kumar",
    regNo: "22105128014",
    branch: "Electronics & Communication Engineering",
    eventTitle: "AI Website Building Competition",
    title: "AI Website Building Competition",
    organizer: "AIML Club",
    date: "September 26, 2026",
    status: "verified",
    grade: "Grade: Excellence (Top 5%)",
    verificationStatus: "Verified & Authenticated by GEC IoT Club",
    issuer: "Dr. Arvind Kumar (Principal) & Prof. Manoj Sharma (Coordinator)"
  },
  {
    id: "GEC-IOT-2026-V02",
    studentName: "Rajkishor Kumar",
    regNo: "22105128014",
    branch: "Electronics & Communication Engineering",
    eventTitle: "Science Exhibition & AI Expo",
    title: "Science Exhibition & AI Expo",
    organizer: "AIML Club",
    date: "March 16, 2026",
    status: "verified",
    grade: "First Prize & Innovation Award",
    verificationStatus: "Verified & Authenticated by GEC IoT Club",
    issuer: "Dr. Arvind Kumar (Principal) & Prof. Manoj Sharma (Coordinator)"
  },
  {
    id: "GEC-IOT-2026-P01",
    studentName: "Rajkishor Kumar",
    regNo: "22105128014",
    branch: "Electronics & Communication Engineering",
    eventTitle: "Prompt Engineering & AI Tool Challenge",
    title: "Prompt Engineering & AI Tool Challenge",
    organizer: "AIML Club",
    date: "March 18, 2026",
    status: "pending",
    grade: "Pending Verification",
    verificationStatus: "Attendance Verified • Certificate Generation In Progress",
    issuer: "GEC IoT Club Faculty Board"
  },
  {
    id: "GEC-IOT-2026-P02",
    studentName: "Rajkishor Kumar",
    regNo: "22105128014",
    branch: "Electronics & Communication Engineering",
    eventTitle: "AI Brainstorming Challenge",
    title: "AI Brainstorming Challenge",
    organizer: "AIML Club",
    date: "March 18, 2026",
    status: "pending",
    grade: "Pending Verification",
    verificationStatus: "Attendance Verified • Certificate Generation In Progress",
    issuer: "GEC IoT Club Faculty Board"
  },
  {
    id: "GEC-IOT-2026-P03",
    studentName: "Rajkishor Kumar",
    regNo: "22105128014",
    branch: "Electronics & Communication Engineering",
    eventTitle: "Edge AI & Embedded IoT Sprint",
    title: "Edge AI & Embedded IoT Sprint",
    organizer: "AIML Club",
    date: "March 20, 2026",
    status: "pending",
    grade: "Pending Verification",
    verificationStatus: "Attendance Verified • Certificate Generation In Progress",
    issuer: "GEC IoT Club Faculty Board"
  }
];

export const projectDocs = [
  {
    id: "doc-1",
    title: "ESP32 Pinout & Hardware Architecture Reference",
    category: "Microcontrollers",
    badge: "Official Guide",
    description: "Complete guide on ESP32 GPIO pinouts, ADC limitations, strapping pins, capacitive touch sensors, and DAC channels.",
    link: "#",
    tags: ["ESP32", "Hardware", "Pinout", "Datasheet"]
  },
  {
    id: "doc-2",
    title: "Setting Up Mosquitto MQTT Broker on Raspberry Pi",
    category: "Protocols",
    badge: "Network",
    description: "Step-by-step tutorial to configure a secure, password-authenticated MQTT broker for IoT telemetry inside GEC Campus LAN.",
    link: "#",
    tags: ["MQTT", "Raspberry Pi", "Networking", "Telemetry"]
  },
  {
    id: "doc-3",
    title: "LoRa SX1278 Long Range Wireless Telemetry Guide",
    category: "Wireless",
    badge: "Field Tested",
    description: "Configuring 433MHz / 868MHz LoRa modules with Arduino & ESP32 for 5km line-of-sight river and farmland telemetry.",
    link: "#",
    tags: ["LoRa", "SPI", "Long Range", "Telemetry"]
  },
  {
    id: "doc-4",
    title: "TinyML: Deploying Wake-Word Engine on Cortex-M4",
    category: "Edge AI",
    badge: "AI on Chip",
    description: "Training quantized TensorFlow Lite models and running inference under 32KB RAM on microcontroller devices.",
    link: "#",
    tags: ["TinyML", "Edge AI", "TensorFlow Lite", "Sensors"]
  }
];

export const galleryItems = [
  {
    id: 1,
    title: "SIH Hardware Edition National Finals Celebration",
    category: "Hackathons",
    pinned: true,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    date: "August 2025"
  },
  {
    id: 2,
    title: "Soldering & PCB Prototyping Workshop in GEC IoT Lab",
    category: "Lab Sessions",
    pinned: true,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    date: "July 2025"
  },
  {
    id: 3,
    title: "ESP32 Autonomous Drone Telemetry Testing",
    category: "Projects",
    pinned: false,
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80",
    date: "May 2025"
  },
  {
    id: 4,
    title: "Robotics Obstacle Avoider Challenge at Tech Fest",
    category: "Competitions",
    pinned: true,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    date: "April 2025"
  },
  {
    id: 5,
    title: "Component Unboxing & Sensor Calibration Drill",
    category: "Lab Sessions",
    pinned: false,
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    date: "February 2025"
  },
  {
    id: 6,
    title: "Smart Irrigation & Soil Moisture Telemetry Field Test",
    category: "Projects",
    pinned: false,
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80",
    date: "January 2025"
  }
];

export const faqs = [
  {
    q: "Who can join the GEC Khagaria IoT Club?",
    a: "Any regular student from any engineering branch (ECE, CSE, EE, ME, Civil) of Government Engineering College, Khagaria is eligible to join. No prior hardware experience is required—we conduct beginner workshops from day one!"
  },
  {
    q: "Do I need to purchase my own microcontrollers or hardware kits?",
    a: "No. The GEC IoT Club maintains an extensive inventory of development boards (ESP32, Arduino, Raspberry Pi), sensors, actuators, soldering stations, and multimeters in the college lab available for member project development."
  },
  {
    q: "How can I participate in Smart India Hackathon (SIH Hardware)?",
    a: "The club organizes internal college hackathons and screening rounds. Selected teams receive institutional mentoring, lab access, and financial/hardware support from college authorities."
  },
  {
    q: "How do I verify and download my event certificates?",
    a: "Go to the 'Certificates' tab in the top navigation, enter your Certificate ID or Registration Number, and instantly download your authenticated certificate."
  }
];
