import React, { useState, useEffect } from 'react';
import { 
  Home, 
  LayoutDashboard, 
  Calendar, 
  Award, 
  MessageSquare, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Bell, 
  Clock, 
  Trophy, 
  CheckCircle, 
  ExternalLink,
  Users,
  Menu,
  X,
  Star,
  Download,
  AlertCircle,
  HelpCircle,
  Plus,
  Send,
  Cpu,
  Layers,
  Sparkles,
  LogOut,
  LayoutGrid,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ThumbsUp,
  Share2,
  Sliders,
  Copy,
  Check,
  BookOpen,
  Lightbulb,
  MapPin,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Filter,
  Camera,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Settings
} from 'lucide-react';
import { verifiedCertificates, eventsData } from '../data/mockData';
import { useClub } from '../context/ClubContext';
import { processImageFile } from '../components/ImageUploader';

const StudentDashboard = ({ currentUser, onLogout, setActiveTab }) => {
  const { 
    certificates, 
    events, 
    complaints = [], 
    addComplaint, 
    addComplaintResponse,
    reviews = [],
    addReview
  } = useClub();

  // Determine initial active tab based on browser pathname
  const getInitialSubTab = () => {
    if (typeof window === 'undefined') return 'dashboard';
    const path = window.location.pathname.toLowerCase();
    if (path.includes('write-complaint') || path.includes('complaint')) return 'complaints';
    if (path.includes('submit-review') || path.includes('review')) return 'reviews';
    if (path.includes('certificate')) return 'certificates';
    if (path.includes('event')) return 'events';
    if (path.includes('settings')) return 'settings';
    return 'dashboard';
  };

  const [activeTab, setActiveDashboardTab] = useState(getInitialSubTab);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [eventViewFilter, setEventViewFilter] = useState('upcoming'); // 'today' | 'upcoming'
  const [complaintFilter, setComplaintFilter] = useState('all'); // 'all' | 'open' | 'in-progress' | 'resolved'
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [certFilter, setCertFilter] = useState('all'); // 'all' | 'verified' | 'pending'
  const [eventBadgeFilter, setEventBadgeFilter] = useState('all'); // 'all' | 'competition'
  const [eventSearchQuery, setEventSearchQuery] = useState('');
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [replyText, setReplyText] = useState({});

  // Student Settings & Profile State (matching media_1790603214352.png & media_1790603269594.png)
  const [studentProfile, setStudentProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('gec_iot_student_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      name: currentUser?.name || "Rajkishor Kumar",
      firstName: currentUser?.firstName || "Rajkishor",
      regNo: currentUser?.regNo || "24155154009",
      email: currentUser?.email || "rajkishorock@gmail.com",
      phone: "7488307713",
      location: "College Campus",
      branch: "Computer Science Engineering",
      batch: "2024 2028",
      memberSince: "September 24, 2026",
      avatar: currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      position: "AIML Enthusiast"
    };
  });

  const [settingsActiveTab, setSettingsActiveTab] = useState('profile'); // 'profile' | 'security' | 'preferences'
  const [settingsSavedAlert, setSettingsSavedAlert] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [securityPasswords, setSecurityPasswords] = useState({
    current: '',
    newPass: '',
    confirmPass: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    newPass: false,
    confirmPass: false
  });
  const [studentPreferences, setStudentPreferences] = useState({
    emailAlerts: true,
    eventReminders: true,
    labHoursUpdates: true,
    peerMessages: false
  });

  useEffect(() => {
    localStorage.setItem('gec_iot_student_profile', JSON.stringify(studentProfile));
  }, [studentProfile]);

  const student = studentProfile;
  const studentFirstName = student.firstName || (student.name ? student.name.split(' ')[0] : 'Student');

  const handleProfilePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await processImageFile(file, 400, 400, 0.9);
      setStudentProfile(prev => ({ ...prev, avatar: dataUrl }));
      setSettingsSavedAlert(true);
      setTimeout(() => setSettingsSavedAlert(false), 3000);
    } catch (err) {
      console.error("Profile photo upload failed:", err);
    }
  };

  const handleSaveStudentProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('gec_iot_student_profile', JSON.stringify(studentProfile));
    setSettingsSavedAlert(true);
    setTimeout(() => setSettingsSavedAlert(false), 3000);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!securityPasswords.newPass || securityPasswords.newPass.length < 8) {
      alert("New password must be at least 8 characters long.");
      return;
    }
    if (securityPasswords.newPass !== securityPasswords.confirmPass) {
      alert("Passwords do not match.");
      return;
    }
    alert("Password updated successfully!");
    setSecurityPasswords({ current: '', newPass: '', confirmPass: '' });
  };

  // Handle URL sync on tab change
  const navigateToTab = (tabId, path) => {
    setActiveDashboardTab(tabId);
    setMobileSidebarOpen(false);
    if (typeof window !== 'undefined' && path) {
      window.history.pushState({ subTab: tabId }, '', path);
    }
  };

  useEffect(() => {
    const handlePop = () => {
      setActiveDashboardTab(getInitialSubTab());
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  // New Complaint Form State
  const [newComplaintData, setNewComplaintData] = useState({
    title: '',
    category: 'technical',
    priority: 'medium',
    description: ''
  });
  const [isSubmittingComplaint, setIsSubmittingComplaint] = useState(false);

  // 5 Certificates strictly matching media_1790600541180.png
  const allCertificatesList = [
    {
      id: "GEC-IOT-2026-V01",
      title: "AI Website Building Competition",
      organizer: "AIML Club",
      date: "September 26, 2026",
      status: "verified",
      badge: "Verified",
      category: "Website Building",
      grade: "Grade: Excellence (Top 5%)",
      verificationStatus: "Verified & Authenticated by GEC IoT Club",
      issuer: "Dr. Arvind Kumar (Principal) & Prof. Manoj Sharma (Head Coordinator)"
    },
    {
      id: "GEC-IOT-2026-V02",
      title: "Science Exhibition & AI Expo",
      organizer: "AIML Club",
      date: "March 16, 2026",
      status: "verified",
      badge: "Verified",
      category: "Exhibition & Expo",
      grade: "1st Prize & Hardware Winner",
      verificationStatus: "Verified & Authenticated by GEC IoT Club",
      issuer: "Dr. Arvind Kumar (Principal) & Prof. Manoj Sharma (Head Coordinator)"
    },
    {
      id: "GEC-IOT-2026-P01",
      title: "Prompt Engineering & AI Tool Challenge",
      organizer: "AIML Club",
      date: "March 18, 2026",
      status: "pending",
      badge: "Pending",
      category: "Prompt Engineering",
      pendingNotice: "Your certificate is currently pending verification. The certificate will be generated after your attendance and participation in the competition have been successfully verified."
    },
    {
      id: "GEC-IOT-2026-P02",
      title: "AI Brainstorming Challenge",
      organizer: "AIML Club",
      date: "March 18, 2026",
      status: "pending",
      badge: "Pending",
      category: "Brainstorming Challenge",
      pendingNotice: "Your certificate is currently pending verification. The certificate will be generated after your attendance and participation in the competition have been successfully verified."
    },
    {
      id: "GEC-IOT-2026-P03",
      title: "Edge AI & IoT Hardware Challenge",
      organizer: "AIML Club",
      date: "March 20, 2026",
      status: "pending",
      badge: "Pending",
      category: "Hardware Sprint",
      pendingNotice: "Your certificate is currently pending verification. The certificate will be generated after your attendance and participation in the competition have been successfully verified."
    }
  ];

  // Eligible Certified Events for Review matching media_1790600561291.png
  const eligibleEvents = [
    {
      id: "science-expo-2026",
      title: "Science Exhibition & AI Expo",
      type: "Group Event",
      badge: "GROUP",
      date: "Mar 16, 2026",
      certificateId: "GEC-IOT-2026-V02",
      organizer: "AIML Club"
    },
    {
      id: "ai-website-building-2026",
      title: "AI Website Building Competition",
      type: "Group Event",
      badge: "GROUP",
      date: "Sep 26, 2026",
      certificateId: "GEC-IOT-2026-V01",
      organizer: "AIML Club"
    }
  ];

  const [reviewViewMode, setReviewViewMode] = useState('submit'); // 'submit' | 'my-reviews'
  const [selectedReviewEvent, setSelectedReviewEvent] = useState(eligibleEvents[0]);
  const [selectedCertModal, setSelectedCertModal] = useState(null);
  const [shareModalCert, setShareModalCert] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // New Review Form State matching media_1790600561291.png
  const [newReviewData, setNewReviewData] = useState({
    rating: 5,
    feeling: 'Great',
    emoji: '😄',
    contentRating: 5,
    handsOnRating: 5,
    organizationRating: 5,
    mentorshipRating: 5,
    feedback: '',
    recommend: true
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSubmitSuccess, setReviewSubmitSuccess] = useState(false);

  // Filter student certificates
  const studentCerts = allCertificatesList;
  const displayCerts = allCertificatesList;

  // Student registered and upcoming events
  const studentEvents = [
    {
      id: "iot-makeathon-2026",
      title: "Khagaria IoT Make-a-thon 2026",
      type: "Hackathon",
      categoryColor: "bg-purple-50 text-purple-700 border-purple-200",
      date: "November 14-15, 2026",
      time: "09:00 AM - 09:00 PM (36 Hrs)",
      location: "GEC Khagaria IoT Lab (Offline)",
      status: "Upcoming",
      isRegistered: true,
      isLeader: true,
      teamName: "Team AgroSmart",
      membersCount: 4,
      banner: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      subEvent: "Smart Agriculture & Irrigation Track",
      allotment: "ESP32-S3 DevKit + LoRa SX1278 + Soil Sensor Hub (Bench 12)"
    },
    {
      id: "esp32-freertos-bootcamp",
      title: "ESP32 & Real-Time Operating Systems (FreeRTOS)",
      type: "Bootcamp",
      categoryColor: "bg-blue-50 text-blue-700 border-blue-200",
      date: "October 20, 2026",
      time: "10:00 AM - 04:00 PM",
      location: "Seminar Hall 2 + Lab Workbench B",
      status: "Upcoming",
      isRegistered: true,
      isLeader: false,
      teamName: "Solo Participant",
      membersCount: 1,
      banner: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      subEvent: "Multithreading & FreeRTOS Architecture",
      allotment: "FreeRTOS Kernel Workbook + USB Logic Analyzer Allotted"
    }
  ];

  // Winning events showcase
  const winningEvents = [
    {
      id: "sih-hardware-win",
      title: "Smart India Hackathon (Hardware Edition) - 1st Runner Up",
      teamName: "Team AeroSensors (GEC Khagaria)",
      award: "1st Runner Up & Innovation Grant",
      prize: "₹75,000",
      project: "LoRa-based Autonomous River Flood Telemetry & Pipeline Diagnostics",
      date: "National Finale",
      members: ["Rajkishor Kumar", "Aditya Prakash", "Pooja Patel", "Aman Verma"]
    }
  ];

  // Dashboard Stats matching the 4 analytics cards
  const stats = [
    {
      title: "Total Events",
      subtitle: "All events organized by the club",
      value: String((events && events.length) || 14),
      badge: "All Time",
      badgeColor: "bg-[#eafaf1] text-[#00684a]",
      valueColor: "text-[#001e2b]",
      iconBg: "bg-[#001e2b]",
      iconColor: "text-[#00ed64]",
      type: "total"
    },
    {
      title: "Your Participations",
      subtitle: "Events you have participated in",
      value: "2",
      badge: "This Year",
      badgeColor: "bg-[#eafaf1] text-[#00684a]",
      valueColor: "text-[#001e2b]",
      iconBg: "bg-[#00684a]",
      iconColor: "text-white",
      growth: "+20%",
      type: "participations"
    },
    {
      title: "Winning Events",
      subtitle: "Events you have won",
      value: "1",
      badge: "Champion",
      badgeColor: "bg-[#fff2e8] text-[#fa6e39]",
      valueColor: "text-[#fa6e39]",
      iconBg: "bg-[#fff2e8]",
      iconColor: "text-[#fa6e39]",
      type: "winning"
    },
    {
      title: "Certificates",
      subtitle: "Earned from club events",
      value: String(displayCerts.length),
      badge: "Earned",
      badgeColor: "bg-[#eafaf1] text-[#00684a]",
      valueColor: "text-[#001e2b]",
      iconBg: "bg-[#e3fcef]",
      iconColor: "text-[#00684a]",
      type: "certificates"
    }
  ];

  // Sidebar Nav Items strictly matching media_1790598565834.png
  const navItems = [
    { id: 'home', label: 'Home', href: '/', icon: Home, color: 'text-blue-600', isHome: true },
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard/student', icon: LayoutDashboard, color: 'text-purple-600' },
    { id: 'events', label: 'Club Events', href: '/dashboard/events', icon: Calendar, color: 'text-amber-600' },
    { id: 'certificates', label: 'My Certificate', href: '/dashboard/certificate', icon: Award, color: 'text-emerald-600' },
    { id: 'reviews', label: 'Submit Review', href: '/dashboard/submit-review', icon: Star, color: 'text-[#00ed64]' },
    { id: 'complaints', label: 'Write Complaint', href: '/dashboard/write-complaint', icon: MessageSquare, color: 'text-rose-600' }
  ];

  // Complaint submission
  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    if (!newComplaintData.title.trim() || !newComplaintData.description.trim()) return;

    setIsSubmittingComplaint(true);
    setTimeout(() => {
      addComplaint({
        title: newComplaintData.title.trim(),
        category: newComplaintData.category,
        priority: newComplaintData.priority,
        description: newComplaintData.description.trim(),
        studentName: student.name,
        studentEmail: student.email,
        regNo: student.regNo
      });
      setNewComplaintData({
        title: '',
        category: 'technical',
        priority: 'medium',
        description: ''
      });
      setShowComplaintForm(false);
      setIsSubmittingComplaint(false);
    }, 400);
  };

  // Complaint reply handler
  const handleSendReply = (complaintId) => {
    const text = replyText[complaintId];
    if (!text || !text.trim()) return;
    addComplaintResponse(complaintId, text.trim(), student.name);
    setReplyText(prev => ({ ...prev, [complaintId]: '' }));
  };

  // Filter complaints
  const filteredComplaints = complaints.filter(comp => {
    if (complaintFilter === 'open') return comp.status === 'open';
    if (complaintFilter === 'in-progress') return comp.status === 'in-progress';
    if (complaintFilter === 'resolved') return comp.status === 'resolved';
    return true;
  });

  // Complaint stat numbers
  const totalComplaintsCount = complaints.length;
  const openComplaintsCount = complaints.filter(c => c.status === 'open').length;
  const inProgressComplaintsCount = complaints.filter(c => c.status === 'in-progress').length;
  const resolvedComplaintsCount = complaints.filter(c => c.status === 'resolved').length;

  // Review submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewData.feedback.trim()) return;
    setIsSubmittingReview(true);
    setTimeout(() => {
      addReview({
        eventId: selectedReviewEvent.id,
        eventTitle: selectedReviewEvent.title,
        rating: newReviewData.rating,
        feeling: newReviewData.feeling,
        emoji: newReviewData.emoji,
        contentRating: newReviewData.contentRating,
        handsOnRating: newReviewData.handsOnRating,
        organizationRating: newReviewData.organizationRating,
        mentorshipRating: newReviewData.mentorshipRating,
        feedback: newReviewData.feedback.trim(),
        recommend: newReviewData.recommend,
        studentName: student.name,
        studentEmail: student.email,
        regNo: student.regNo
      });
      setIsSubmittingReview(false);
      setReviewSubmitSuccess(true);
      setTimeout(() => setReviewSubmitSuccess(false), 4000);
      setNewReviewData(prev => ({ ...prev, feedback: '' }));
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#f9fbfa] text-[#17171c] font-sans flex antialiased selection:bg-[#00ed64] selection:text-black">
      
      {/* Mobile Backdrop Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ================= LEFT SIDEBAR (1:1 with media_1790598565834.png) ================= */}
      <aside className={`fixed inset-y-0 left-0 h-full max-h-[100dvh] bg-white transition-all duration-300 z-50 border-r border-[#e1e5e8] shadow-sm flex flex-col justify-between overflow-hidden md:overflow-visible ${
        sidebarCollapsed ? 'md:w-20' : 'md:w-64'
      } ${
        mobileSidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full md:translate-x-0'
      }`}>
        
        {/* Top Branding & Toggle */}
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center justify-between h-16 md:h-20 px-4 border-b border-[#e1e5e8] flex-shrink-0 relative">
            
            {/* Logo Emblem */}
            <div className={`flex items-center min-w-0 ${sidebarCollapsed ? 'md:justify-center md:w-full' : ''}`}>
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-[#001e2b] flex items-center justify-center border border-[#e1e5e8] shadow-xs">
                  <span className="font-mono font-bold text-xs text-[#00ed64]">AI/ML</span>
                </div>
                {/* Online Pulse Indicator Ring */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#00ed64] rounded-full ring-2 ring-white" />
              </div>

              {(!sidebarCollapsed || mobileSidebarOpen) && (
                <div className="ml-3 min-w-0">
                  <span className="font-bold text-base text-[#001e2b] block truncate leading-tight">
                    AI/ML Club
                  </span>
                  <span className="text-[10px] text-[#5c6c7a] font-medium block">
                    GEC Khagaria
                  </span>
                </div>
              )}
            </div>

            {/* Collapse Toggle Chevron Button with Signature Gradient Border */}
            <div 
              className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 p-[1.5px] rounded-md z-50 transition-transform duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)",
                boxShadow: "0 0 8px rgba(255, 137, 24, 0.25), 0 0 10px rgba(0, 152, 243, 0.18)"
              }}
            >
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="w-7 h-7 bg-white hover:bg-[#f4f7f6] rounded-md transition-colors flex items-center justify-center cursor-pointer text-[#5c6c7a] hover:text-[#001e2b]"
                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="w-4 h-4 text-orange-500" />
                ) : (
                  <ChevronLeft className="w-4 h-4 text-orange-500" />
                )}
              </button>
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden p-1.5 hover:bg-[#f4f7f6] rounded-lg text-[#5c6c7a]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links List */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return isActive ? (
                /* Active item with signature gradient border and pitch-black inner background */
                <div 
                  key={item.id}
                  className="p-[2px] rounded-full"
                  style={{
                    background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)",
                    boxShadow: "0 0 12px rgba(255, 137, 24, 0.28), 0 0 16px rgba(0, 152, 243, 0.22)"
                  }}
                >
                  <button
                    onClick={() => {
                      if (item.isHome) {
                        setActiveTab('home');
                        window.history.pushState({}, '', '/');
                      } else {
                        navigateToTab(item.id, item.href);
                      }
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#001e2b] text-white font-semibold transition-all relative text-left cursor-pointer"
                  >
                    <Icon className="w-5 h-5 flex-shrink-0 text-[#00ed64]" />
                    {(!sidebarCollapsed || mobileSidebarOpen) && (
                      <span className="text-[13.5px] font-semibold text-white truncate">{item.label}</span>
                    )}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-5 bg-[#00ed64] rounded-r-full" />
                  </button>
                </div>
              ) : (
                /* Inactive item */
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.isHome) {
                      setActiveTab('home');
                      window.history.pushState({}, '', '/');
                    } else {
                      navigateToTab(item.id, item.href);
                    }
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-[#3d4f5b] font-medium hover:bg-[#f4f7f6] hover:text-[#001e2b] transition-all text-left group cursor-pointer"
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${item.color} group-hover:scale-105 transition-transform`} />
                  {(!sidebarCollapsed || mobileSidebarOpen) && (
                    <span className="text-[13.5px] truncate">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Profile Pill (1:1 with media_1790598565834.png) */}
        <div className="p-3 border-t border-[#e1e5e8] bg-white">
          <div 
            className="p-[2px] rounded-[16px]"
            style={{
              background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)",
              boxShadow: "0 0 12px rgba(255, 137, 24, 0.28), 0 0 16px rgba(0, 152, 243, 0.22)"
            }}
          >
            <div className={`flex items-center gap-3 px-3 py-2.5 rounded-[14px] bg-[#001e2b] text-white ${
              sidebarCollapsed && !mobileSidebarOpen ? 'justify-center' : ''
            }`}>
              <div 
                className="p-[1.5px] rounded-lg flex-shrink-0"
                style={{
                  background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)"
                }}
              >
                <div className="w-7 h-7 rounded-[6px] bg-[#003d4f] flex items-center justify-center text-[#00ed64]">
                  <Cpu className="w-4 h-4" />
                </div>
              </div>

              {(!sidebarCollapsed || mobileSidebarOpen) && (
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-xs text-white block truncate leading-tight">
                    {student.position || "IoT Enthusiast"}
                  </span>
                  <p className="text-[11px] text-[#00ed64] font-medium truncate mt-0.5">
                    {student.name}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Logout Link */}
          <button
            onClick={onLogout}
            className="w-full mt-2 flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-500" />
            {(!sidebarCollapsed || mobileSidebarOpen) && (
              <span>Logout</span>
            )}
          </button>
        </div>

      </aside>

      {/* ================= MAIN DASHBOARD BODY ================= */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
      }`}>
        
        {/* Top Header Bar (1:1 with media_1790598565834.png) */}
        <header className="h-16 md:h-20 bg-white border-b border-[#e1e5e8] px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-lg text-[#5c6c7a] hover:bg-[#f4f7f6] md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb / Title indication */}
            <div className="hidden sm:block">
              <span className="text-xs text-[#5c6c7a] font-medium">Student Portal / </span>
              <span className="text-xs font-bold text-[#001e2b] capitalize">
                {activeTab === 'complaints' ? 'Complaints & Issues' : 
                 activeTab === 'reviews' ? 'Submit Review' :
                 activeTab === 'certificates' ? 'My Certificates' :
                 activeTab === 'events' ? 'Club Events' :
                 activeTab === 'settings' ? 'Student Settings' : 'Dashboard'}
              </span>
            </div>
          </div>

          {/* Right Profile Capsule with Dropdown matching media_1790603191482.png */}
          <div className="relative">
            <button 
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-3.5 hover:opacity-90 transition-opacity cursor-pointer p-1.5 rounded-xl hover:bg-slate-100"
            >
              <div className="text-right">
                <p className="font-bold text-[#001e2b] text-sm leading-tight">
                  {studentProfile.name}
                </p>
                <div className="flex items-center gap-1.5 justify-end mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#00ed64] animate-pulse" />
                  <span className="text-xs font-semibold text-[#00ed64]">
                    Student
                  </span>
                </div>
              </div>

              <div className="relative">
                <img 
                  src={studentProfile.avatar} 
                  alt={studentProfile.name} 
                  className="w-10 h-10 rounded-full ring-2 ring-[#00ed64] p-0.5 object-cover bg-white shadow-xs"
                />
              </div>

              <ChevronDown className={`w-4 h-4 text-[#5c6c7a] transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu 1:1 matching media_1790603191482.png */}
            {userDropdownOpen && (
              <div 
                className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-[#001e2b] text-white p-4 shadow-2xl z-50 border border-white/10 space-y-3"
                style={{
                  boxShadow: "0 10px 30px rgba(0, 30, 43, 0.4), 0 0 1px rgba(255, 255, 255, 0.2)"
                }}
              >
                <div className="border-b border-white/10 pb-3">
                  <p className="font-bold text-sm text-white truncate">{studentProfile.name}</p>
                  <p className="text-xs text-white/60 font-mono truncate">{studentProfile.email}</p>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      navigateToTab('settings', '/settings');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-white/90 hover:bg-white/10 hover:text-[#00ed64] transition-colors text-left cursor-pointer"
                  >
                    <Settings className="w-4 h-4 text-[#00ed64]" />
                    <span>Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      if (onLogout) onLogout();
                      else if (setActiveTab) setActiveTab('auth');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-white/10 hover:text-rose-300 transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-400" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* ================= MAIN CONTENT VIEWS ================= */}
        <main className="p-4 sm:p-7 md:p-8 flex-1 max-w-7xl w-full mx-auto space-y-6 md:space-y-8">
          
          {/* ================= 1. WRITE COMPLAINT / COMPLAINTS & ISSUES VIEW ================= */}
          {activeTab === 'complaints' && (
            <div className="w-full space-y-6 md:space-y-8">
              
              {/* Header Row: Title & "+ Write Complaint" Button */}
              <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-[#001e2b] tracking-tight mb-1">
                    Complaints & Issues
                  </h1>
                  <p className="text-sm sm:text-base text-[#5c6c7a]">
                    Report problems and track their resolution
                  </p>
                </div>

                {/* "+ Write Complaint" Button with signature glowing gradient border */}
                <div 
                  className="p-[2px] rounded-full inline-flex w-full sm:w-auto flex-shrink-0"
                  style={{
                    background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)",
                    boxShadow: "0 0 12px rgba(255, 137, 24, 0.28), 0 0 16px rgba(0, 152, 243, 0.22)"
                  }}
                >
                  <button
                    onClick={() => setShowComplaintForm(!showComplaintForm)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#001e2b] hover:bg-[#002b3d] text-[#00ed64] rounded-full font-bold transition-all text-xs sm:text-sm w-full sm:w-auto cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-[#00ed64]" />
                    <span>Write Complaint</span>
                  </button>
                </div>
              </div>

              {/* Submit Complaint Drawer / Modal Box */}
              {showComplaintForm && (
                <div className="w-full border border-[#e1e5e8] rounded-[20px] p-6 sm:p-8 bg-white shadow-xs space-y-5 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center pb-4 border-b border-[#e1e5e8]">
                    <div>
                      <h3 className="text-xl font-bold text-[#001e2b]">Submit a New Complaint</h3>
                      <p className="text-xs text-[#5c6c7a] mt-0.5">Faculty coordinator and admin core will review and update this ticket.</p>
                    </div>
                    <button
                      onClick={() => setShowComplaintForm(false)}
                      className="p-1.5 hover:bg-[#f4f7f6] rounded-xl text-[#5c6c7a] cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmitComplaint} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#001e2b] mb-1.5">
                        Title <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="text"
                        value={newComplaintData.title}
                        onChange={(e) => setNewComplaintData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Brief title of your complaint"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b] placeholder-gray-400 focus:outline-none focus:border-[#00ed64]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#001e2b] mb-1.5">
                          Category
                        </label>
                        <select
                          value={newComplaintData.category}
                          onChange={(e) => setNewComplaintData(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b] focus:outline-none focus:border-[#00ed64]"
                        >
                          <option value="technical">Technical Issue</option>
                          <option value="content">Content/Materials</option>
                          <option value="schedule">Schedule Conflict</option>
                          <option value="event">Event Related</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#001e2b] mb-1.5">
                          Priority
                        </label>
                        <select
                          value={newComplaintData.priority}
                          onChange={(e) => setNewComplaintData(prev => ({ ...prev, priority: e.target.value }))}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b] focus:outline-none focus:border-[#00ed64]"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#001e2b] mb-1.5">
                        Description <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        value={newComplaintData.description}
                        onChange={(e) => setNewComplaintData(prev => ({ ...prev, description: e.target.value }))}
                        rows={4}
                        placeholder="Describe your complaint or hardware issue in detail..."
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b] placeholder-gray-400 focus:outline-none focus:border-[#00ed64] resize-none"
                        required
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#e1e5e8]">
                      <div 
                        className="w-full sm:flex-1 p-[2px] rounded-full flex items-stretch"
                        style={{
                          background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)",
                          boxShadow: "0 0 12px rgba(255, 137, 24, 0.28), 0 0 16px rgba(0, 152, 243, 0.22)"
                        }}
                      >
                        <button
                          type="submit"
                          disabled={isSubmittingComplaint}
                          className="w-full px-4 py-2.5 bg-[#001e2b] hover:bg-[#002b3d] text-[#00ed64] rounded-full font-bold transition-all text-xs sm:text-sm cursor-pointer disabled:opacity-50"
                        >
                          {isSubmittingComplaint ? 'Submitting...' : 'Submit Complaint'}
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowComplaintForm(false)}
                        className="w-full sm:flex-1 px-4 py-2.5 bg-[#f4f7f6] hover:bg-[#e1e5e8] text-[#001e2b] rounded-full font-bold transition-all text-xs sm:text-sm border border-[#e1e5e8] cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Filter Tabs matching media_1790598565834.png: All | Open | In Progress | Resolved */}
              <div className="w-full border-b border-[#e1e5e8]">
                <div className="flex items-center gap-6 overflow-x-auto">
                  {[
                    { key: 'all', label: 'All' },
                    { key: 'open', label: 'Open' },
                    { key: 'in-progress', label: 'In Progress' },
                    { key: 'resolved', label: 'Resolved' }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setComplaintFilter(tab.key)}
                      className={`py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer relative ${
                        complaintFilter === tab.key
                          ? 'border-[#00ed64] text-[#001e2b]'
                          : 'border-transparent text-[#5c6c7a] hover:text-[#001e2b]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content Area: Empty State OR Complaints List */}
              <div className="w-full space-y-4">
                {filteredComplaints.length === 0 ? (
                  /* 1:1 Empty State Card from media_1790598565834.png */
                  <div className="w-full border border-[#e1e5e8] rounded-[20px] p-12 sm:p-20 text-center bg-white shadow-xs flex flex-col items-center justify-center min-h-[220px]">
                    {/* Outline Speech Bubble Icon matching screenshot */}
                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-slate-400 mb-3">
                      <MessageSquare className="w-10 h-10 stroke-[1.5]" />
                    </div>
                    <p className="text-sm sm:text-base text-[#5c6c7a] font-medium">
                      No complaints in this category
                    </p>
                  </div>
                ) : (
                  /* List of Submitted Complaints with Real-time Response Threads */
                  filteredComplaints.map((comp) => (
                    <div 
                      key={comp.id}
                      className="w-full border border-[#e1e5e8] rounded-[18px] p-5 sm:p-6 bg-white shadow-xs hover:border-[#00ed64] transition-all space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs font-bold text-[#5c6c7a]">
                              {comp.id}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              comp.status === 'resolved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              comp.status === 'in-progress' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                              'bg-orange-50 text-orange-700 border border-orange-200'
                            }`}>
                              {comp.status === 'resolved' ? 'Resolved' : comp.status === 'in-progress' ? 'In Progress' : 'Open'}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#f4f7f6] text-[#3d4f5b] border border-[#e1e5e8]">
                              {comp.category}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              comp.priority === 'high' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {comp.priority} priority
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg font-bold text-[#001e2b]">
                            {comp.title}
                          </h3>
                        </div>

                        <div className="text-left sm:text-right text-xs text-[#5c6c7a]">
                          <span>{comp.date}</span>
                          <div className="text-emerald-600 font-semibold mt-1 flex items-center gap-1 sm:justify-end">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>{comp.responses || (comp.responseMessages ? comp.responseMessages.length : 0)} responses</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#f9fbfa] border border-[#e1e5e8] rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm text-[#3d4f5b] leading-relaxed">
                        {comp.description}
                      </div>

                      {/* Expandable Responses */}
                      <button
                        onClick={() => setSelectedComplaintId(selectedComplaintId === comp.id ? null : comp.id)}
                        className="text-xs font-bold text-[#00684a] hover:text-[#001e2b] transition-colors cursor-pointer flex items-center gap-1"
                      >
                        {selectedComplaintId === comp.id ? 'Hide Discussion Thread' : 'View Discussion & Replies'}
                      </button>

                      {selectedComplaintId === comp.id && (
                        <div className="pt-3 border-t border-[#e1e5e8] space-y-3">
                          {comp.responseMessages && comp.responseMessages.length > 0 ? (
                            <div className="space-y-2">
                              {comp.responseMessages.map((msg, i) => (
                                <div key={i} className="p-3 rounded-xl bg-[#f4f7f6] border border-[#e1e5e8] text-xs">
                                  <div className="flex items-center justify-between font-bold text-[#001e2b] mb-1">
                                    <span>{msg.responder === 'admin' ? '🛡️ Admin Support' : msg.responder}</span>
                                    <span className="text-[10px] text-[#5c6c7a] font-normal">{msg.date}</span>
                                  </div>
                                  <p className="text-[#3d4f5b]">{msg.message}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-[#5c6c7a] italic">No replies yet. Your issue has been logged for review.</p>
                          )}

                          {/* Reply Input Box */}
                          <div className="flex gap-2 pt-2">
                            <input
                              type="text"
                              value={replyText[comp.id] || ''}
                              onChange={(e) => setReplyText({ ...replyText, [comp.id]: e.target.value })}
                              placeholder="Write a follow-up reply..."
                              className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#e1e5e8] bg-white focus:outline-none focus:border-[#00ed64]"
                            />
                            <button
                              onClick={() => handleSendReply(comp.id)}
                              className="px-4 py-2 bg-[#001e2b] text-[#00ed64] rounded-xl text-xs font-bold hover:bg-[#002b3d] cursor-pointer"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* ================= 4 BOTTOM STAT CARDS (1:1 with media_1790598565834.png) ================= */}
              <div className="relative w-full p-4 sm:p-6 rounded-[20px] bg-white border border-[#e1e5e8] shadow-xs overflow-hidden">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  
                  {/* Card 1: TOTAL */}
                  <div className="flex flex-col items-center justify-center p-3 text-center">
                    <div className="w-10 h-10 rounded-xl bg-[#001e2b] flex items-center justify-center text-[#00ed64] shadow-xs">
                      <LayoutGrid className="w-5 h-5" />
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-[#001e2b] mt-3 leading-none">
                      {totalComplaintsCount}
                    </span>
                    <span className="text-[11px] font-bold text-[#5c6c7a] tracking-wider uppercase mt-1.5">
                      TOTAL
                    </span>
                  </div>

                  {/* Card 2: OPEN */}
                  <div className="flex flex-col items-center justify-center p-3 text-center">
                    <div className="w-10 h-10 rounded-full bg-[#fff2e8] flex items-center justify-center text-[#fa6e39]">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-[#fa6e39] mt-3 leading-none">
                      {openComplaintsCount}
                    </span>
                    <span className="text-[11px] font-bold text-[#5c6c7a] tracking-wider uppercase mt-1.5">
                      OPEN
                    </span>
                  </div>

                  {/* Card 3: IN PROGRESS */}
                  <div className="flex flex-col items-center justify-center p-3 text-center">
                    <div className="w-10 h-10 rounded-full bg-[#eaf4ff] flex items-center justify-center text-[#0098f3]">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-[#0098f3] mt-3 leading-none">
                      {inProgressComplaintsCount}
                    </span>
                    <span className="text-[11px] font-bold text-[#5c6c7a] tracking-wider uppercase mt-1.5">
                      IN PROGRESS
                    </span>
                  </div>

                  {/* Card 4: RESOLVED */}
                  <div className="flex flex-col items-center justify-center p-3 text-center">
                    <div className="w-10 h-10 rounded-full bg-[#eafaf1] flex items-center justify-center text-[#00684a]">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-[#00684a] mt-3 leading-none">
                      {resolvedComplaintsCount}
                    </span>
                    <span className="text-[11px] font-bold text-[#5c6c7a] tracking-wider uppercase mt-1.5">
                      RESOLVED
                    </span>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* ================= 2. MAIN STUDENT DASHBOARD VIEW (/dashboard/student) ================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              
              {/* Welcome Banner matching original geckhaiml.live */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 bg-white p-6 sm:p-8 rounded-[24px] border border-[#e1e5e8] shadow-xs relative overflow-hidden">
                <div className="max-w-2xl space-y-3 z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8faf0] border border-[#00ed64]/30 text-[#00684a] text-xs font-bold">
                    <span>Hello, {studentFirstName}!</span>
                    <span>👋</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black text-[#001e2b] tracking-tight leading-tight">
                    Let's learn, build and lead the future with <span className="text-[#00684a]">IoT & AI/ML</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-[#5c6c7a] leading-relaxed">
                    Explore events, enhance skills, request lab components, and achieve more together.
                  </p>
                </div>

                <div className="flex items-center gap-3 z-10 flex-wrap">
                  <button
                    onClick={() => navigateToTab('events', '/dashboard/events')}
                    className="px-5 py-2.5 bg-[#001e2b] text-[#00ed64] hover:bg-[#002b3d] rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    Explore Events
                  </button>
                  <button
                    onClick={() => navigateToTab('certificates', '/dashboard/certificate')}
                    className="px-5 py-2.5 bg-white border border-[#e1e5e8] text-[#001e2b] hover:bg-[#f4f7f6] rounded-full text-xs font-bold transition-all cursor-pointer"
                  >
                    View Certificates
                  </button>
                </div>

                {/* Ambient glow decoration */}
                <div className="absolute right-0 top-0 w-64 h-64 bg-[#00ed64]/10 rounded-full blur-3xl pointer-events-none" />
              </div>

              {/* 4 Analytics Stat Cards */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 md:gap-6">
                {stats.map((card, idx) => (
                  <div 
                    key={idx}
                    className="group relative overflow-hidden rounded-[16px] bg-white border border-[#eef2f0] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-start h-full cursor-pointer select-none"
                  >
                    <div className="flex items-center justify-between relative z-10 h-10 mb-2">
                      <div className="p-[2px] rounded-full" style={{
                        background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)"
                      }}>
                        <div className={`w-9 h-9 ${card.iconBg} rounded-full flex items-center justify-center`}>
                          <span className={`text-sm font-bold ${card.iconColor}`}>
                            {card.type === 'total' && '14'}
                            {card.type === 'participations' && '★'}
                            {card.type === 'winning' && '🏆'}
                            {card.type === 'certificates' && '📜'}
                          </span>
                        </div>
                      </div>

                      <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${card.badgeColor}`}>
                        {card.badge}
                      </span>
                    </div>

                    <div className="relative z-10 flex flex-col">
                      <p className={`text-2xl sm:text-3xl font-black tracking-tight leading-none ${card.valueColor}`}>
                        {card.value}
                      </p>
                      <h4 className="text-xs sm:text-sm font-bold text-[#001e2b] mt-1">
                        {card.title}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-[#738290] font-normal mt-0.5">
                        {card.subtitle}
                      </p>

                      {card.growth && (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#eafaf1] text-[#00684a] text-[10px] font-bold">
                            {card.growth}
                          </span>
                          <span className="text-[10px] text-[#738290]">from last semester</span>
                        </div>
                      )}
                    </div>

                    {/* Micro-chart Graphic in Background */}
                    {card.type === 'total' && (
                      <div className="absolute bottom-0 right-0 pointer-events-none select-none opacity-40">
                        <svg className="w-24 h-16" viewBox="0 0 130 95" fill="none">
                          <rect x="18" y="70" width="11" height="25" rx="3" fill="#a7f3d0" />
                          <rect x="36" y="56" width="11" height="39" rx="3" fill="#a7f3d0" />
                          <rect x="54" y="44" width="11" height="51" rx="3" fill="#a7f3d0" />
                          <rect x="72" y="30" width="11" height="65" rx="3" fill="#6ee7b7" />
                          <rect x="90" y="15" width="11" height="80" rx="3" fill="#34d399" />
                          <path d="M8 72 C 30 70, 52 58, 72 38 C 88 22, 100 12, 114 6" stroke="#10b981" strokeWidth="2.5" fill="none" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Event Tabs Switcher: Near Upcoming Events vs Today's Events */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#e1e5e8] pb-3">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setEventViewFilter('upcoming')}
                      className={`text-sm font-bold pb-1 transition-colors relative cursor-pointer ${
                        eventViewFilter === 'upcoming'
                          ? 'text-[#001e2b] border-b-2 border-[#00ed64]'
                          : 'text-[#738290] hover:text-[#001e2b]'
                      }`}
                    >
                      Near Upcoming Events ({studentEvents.length})
                    </button>
                    <button
                      onClick={() => setEventViewFilter('today')}
                      className={`text-sm font-bold pb-1 transition-colors relative cursor-pointer ${
                        eventViewFilter === 'today'
                          ? 'text-[#001e2b] border-b-2 border-[#00ed64]'
                          : 'text-[#738290] hover:text-[#001e2b]'
                      }`}
                    >
                      Today's Events (0)
                    </button>
                  </div>

                  <span className="text-xs text-[#738290] font-mono hidden sm:inline">
                    {eventViewFilter === 'today' ? '0 sessions scheduled today' : `${studentEvents.length} events scheduled`}
                  </span>
                </div>

                {eventViewFilter === 'upcoming' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {studentEvents.map((event) => (
                      <div 
                        key={event.id}
                        className="bg-white rounded-2xl border border-[#e1e5e8] p-5 shadow-xs hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${event.categoryColor}`}>
                              {event.type}
                            </span>
                            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                              Registered
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-[#001e2b] leading-snug">
                            {event.title}
                          </h3>

                          <p className="text-xs text-[#5c6c7a]">
                            Track: <strong>{event.subEvent}</strong>
                          </p>

                          <div className="space-y-1.5 text-xs text-[#5c6c7a] font-mono">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5 text-[#001e2b]" />
                              <span>{event.date} • {event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-3.5 h-3.5 text-[#001e2b]" />
                              <span>{event.teamName} {event.isLeader && "(Team Leader)"}</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-[#f4f7f6] flex items-center justify-between">
                          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Entry Pass & Kit Allotted</span>
                          </span>

                          <button 
                            onClick={() => alert(`Allotment for ${event.title}:\n\n${event.allotment}\nVenue: ${event.location}`)}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#001e2b] text-white hover:bg-[#0a3548] transition-colors cursor-pointer"
                          >
                            View Kit Pass
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-white rounded-2xl border border-[#e1e5e8] text-[#738290] text-xs">
                    No active sessions scheduled for today. Check upcoming events above!
                  </div>
                )}
              </div>

              {/* Winning Events & Accolades Podium */}
              <div id="winning-events" className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-[#fa6e39]" />
                    <h2 className="text-lg font-bold text-[#001e2b]">Winning Events & Accolades</h2>
                  </div>
                  <span className="text-xs font-semibold text-[#fa6e39] bg-[#fff2e8] px-3 py-1 rounded-full border border-[#fed7aa]">
                    1 National Recognition
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {winningEvents.map((win) => (
                    <div 
                      key={win.id}
                      className="bg-white rounded-2xl border-2 border-[#fed7aa] p-6 shadow-sm space-y-4 relative overflow-hidden bg-gradient-to-r from-white via-orange-50/20 to-white"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <span className="text-[11px] font-bold text-[#fa6e39] uppercase tracking-wider font-mono">
                            {win.award}
                          </span>
                          <h3 className="text-xl font-bold text-[#001e2b] mt-0.5">
                            {win.title}
                          </h3>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-black text-emerald-600 font-mono">
                            {win.prize}
                          </span>
                          <div className="text-[10px] text-[#738290]">{win.date}</div>
                        </div>
                      </div>

                      <p className="text-xs text-[#3d4f5b] leading-relaxed">
                        Project: <strong>{win.project}</strong>
                      </p>

                      <div className="p-3 rounded-xl bg-[#f9fbfa] border border-[#e1e5e8] text-xs">
                        <strong className="text-[#001e2b] font-mono">Winning Team Roster: </strong>
                        <span className="text-[#5c6c7a]">{win.members.join(" • ")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================= 3. CLUB EVENTS VIEW (/dashboard/events - 1:1 with media_1790602045810.png) ================= */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              
              {/* TOP HERO BANNER (1:1 with media_1790602045810.png) */}
              <div className="bg-white border border-[#e1e5e8] rounded-[24px] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative shadow-xs overflow-hidden">
                
                {/* Left Text & Highlight Tags */}
                <div className="max-w-2xl space-y-2 relative z-10">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001e2b] tracking-tight">
                    Events for Registration
                  </h1>
                  
                  <p className="text-xs sm:text-sm text-[#5c6c7a] leading-relaxed max-w-xl">
                    Discover, learn, and grow with our community through hands-on workshops, expert lectures, and exciting hackathons
                  </p>

                  {/* Highlights Line with Icons */}
                  <div className="flex items-center gap-3 sm:gap-4 text-xs font-semibold text-[#3d4f5b] flex-wrap pt-3 font-sans">
                    <span className="flex items-center gap-1.5 text-emerald-700">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Learn Together</span>
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="flex items-center gap-1.5 text-sky-700">
                      <Users className="w-3.5 h-3.5 text-sky-600" />
                      <span>Build Skills</span>
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="flex items-center gap-1.5 text-amber-700">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                      <span>Create Impact</span>
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="flex items-center gap-1.5 text-rose-700">
                      <Trophy className="w-3.5 h-3.5 text-rose-600" />
                      <span>Join Events</span>
                    </span>
                  </div>
                </div>

                {/* Center 3D Stylized Calendar & Ringing Bell Graphic matching screenshot */}
                <div className="hidden min-[1100px]:flex items-center justify-center flex-shrink-0 relative w-44 h-28">
                  <div className="relative">
                    <div className="w-28 h-24 rounded-2xl bg-gradient-to-tr from-slate-50 to-white border-2 border-[#e1e5e8] shadow-md p-3 flex flex-col justify-between transform -rotate-3 hover:rotate-0 transition-transform">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-1.5">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 rounded-full bg-rose-400" />
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        </div>
                        <span className="text-[10px] font-bold font-mono text-[#00684a]">SEP 2026</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-[9px] text-center font-bold text-slate-400">
                        <span>24</span>
                        <span className="text-[#00ed64] bg-[#001e2b] rounded">26</span>
                        <span>28</span>
                        <span>30</span>
                      </div>
                    </div>
                    {/* Ringing Bell Badge */}
                    <div className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-[#001e2b] text-[#00ed64] flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                      <Bell className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Right 2 Stat Cards (1:1 with media_1790602045810.png) */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  {/* Card 1: TOTAL EVENTS */}
                  <div className="rounded-[20px] bg-white border border-[#e1e5e8] p-4 min-w-[125px] sm:min-w-[135px] text-center shadow-xs flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-xl bg-[#eafaf1] text-[#00684a] flex items-center justify-center mb-1.5">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-[#001e2b] leading-none">
                      1
                    </span>
                    <span className="text-[10px] font-bold text-[#5c6c7a] tracking-wider uppercase font-mono mt-1">
                      TOTAL EVENTS
                    </span>
                  </div>

                  {/* Card 2: REGISTERED */}
                  <div className="rounded-[20px] bg-white border border-[#e1e5e8] p-4 min-w-[125px] sm:min-w-[135px] text-center shadow-xs flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-xl bg-[#fff2e8] text-[#fa6e39] flex items-center justify-center mb-1.5">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-[#001e2b] leading-none">
                      1
                    </span>
                    <span className="text-[10px] font-bold text-[#5c6c7a] tracking-wider uppercase font-mono mt-1">
                      REGISTERED
                    </span>
                  </div>
                </div>

              </div>

              {/* FILTER BY BADGE & SEARCH ROW (1:1 with media_1790602045810.png) */}
              <div className="bg-white border border-[#e1e5e8] rounded-2xl p-3 sm:p-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-xs">
                
                {/* Left: Filter by Badge + Pills */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#001e2b] pr-2">
                    <Filter className="w-4 h-4 text-[#00684a]" />
                    <span>Filter by Badge</span>
                  </div>

                  <button
                    onClick={() => setEventBadgeFilter('all')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      eventBadgeFilter === 'all'
                        ? 'bg-[#001e2b] text-white shadow-xs'
                        : 'border border-transparent text-[#5c6c7a] hover:bg-slate-100'
                    }`}
                  >
                    All
                  </button>

                  <button
                    onClick={() => setEventBadgeFilter('competition')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      eventBadgeFilter === 'competition'
                        ? 'bg-[#001e2b] text-white shadow-xs'
                        : 'border border-[#e1e5e8] text-[#5c6c7a] hover:bg-slate-50'
                    }`}
                  >
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    <span>Competition</span>
                  </button>
                </div>

                {/* Right: Search Box */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={eventSearchQuery}
                    onChange={(e) => setEventSearchQuery(e.target.value)}
                    placeholder="Search events..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#f4f7f6] text-xs text-[#001e2b] placeholder-slate-400 border border-transparent focus:border-[#00ed64] focus:outline-none transition-all"
                  />
                </div>

              </div>

              {/* EVENT CARD: AI WEBSITE BUILDING COMPETITION (1:1 with media_1790602045810.png) */}
              <div className="space-y-4">
                
                {/* Main Featured Event Card matching screenshot */}
                <div className="bg-white border border-[#e1e5e8] rounded-[24px] p-6 shadow-xs flex flex-col lg:flex-row gap-6 items-start hover:border-[#00ed64] transition-all relative">
                  
                  {/* Left Column: Event Poster matching visual */}
                  <div className="w-full lg:w-[380px] h-[220px] rounded-2xl overflow-hidden border border-[#e1e5e8] flex-shrink-0 relative shadow-inner bg-[#00141e] group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#001e2b] via-[#002738] to-[#040812] p-5 flex flex-col justify-between text-white">
                      
                      {/* Poster Header */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-[#00ed64]">
                            AI
                          </div>
                          <div>
                            <span className="text-[9px] block text-white/60 font-mono">GOVERNMENT ENGINEERING COLLEGE, KHAGARIA</span>
                            <span className="text-[10px] font-bold text-white tracking-wide">AI & ML CLUB ORGANIZES</span>
                          </div>
                        </div>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#00ed64]/20 text-[#00ed64] border border-[#00ed64]/30 font-bold font-mono">
                          2026
                        </span>
                      </div>

                      {/* Poster Title & Graphic */}
                      <div className="my-auto py-2">
                        <span className="text-[10px] text-[#fa6e39] font-bold tracking-widest uppercase font-mono block">
                          BUILD • CREATE • INNOVATE • SHOWCASE
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight mt-0.5">
                          AI WEBSITE <br />
                          <span className="text-[#00ed64]">BUILDING</span> COMPETITION
                        </h3>
                        <p className="text-[11px] text-white/70 mt-1 line-clamp-1">
                          From Static to Interactive Reality
                        </p>
                      </div>

                      {/* Poster Footer Metadata */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-[9px] text-white/80 font-mono">
                        <div>
                          <span className="text-white/40 block">DATE:</span>
                          <span className="font-bold text-white">SATURDAY, 26 SEP</span>
                        </div>
                        <div>
                          <span className="text-white/40 block">VENUE:</span>
                          <span className="font-bold text-white">LAB ROOM 310</span>
                        </div>
                        <div className="text-right">
                          <span className="text-white/40 block">TEAM:</span>
                          <span className="font-bold text-[#00ed64]">2-4 MEMBERS</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Right Column: Details & Registration Controls */}
                  <div className="flex-1 w-full space-y-4">
                    
                    {/* Title & Expand Chevron */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-[#001e2b] leading-tight">
                          AI Website Building Competition
                        </h2>
                      </div>

                      <button
                        type="button"
                        onClick={() => setExpandedEventId(expandedEventId === 'ai-web' ? null : 'ai-web')}
                        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer flex-shrink-0"
                        title={expandedEventId === 'ai-web' ? "Collapse details" : "Expand details"}
                      >
                        {expandedEventId === 'ai-web' ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Badges Row (1:1 with media_1790602045810.png) */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Completed */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f4f7f6] text-[#5c6c7a] border border-[#e1e5e8]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>

                      {/* Competition */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f4f7f6] text-[#5c6c7a] border border-[#e1e5e8]">
                        <Trophy className="w-3.5 h-3.5 text-amber-500" />
                        <span>Competition</span>
                      </span>

                      {/* Group */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                        <span>Group</span>
                      </span>

                      {/* 2-4 members */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                        <Users className="w-3.5 h-3.5" />
                        <span>2-4 members</span>
                      </span>

                      {/* Date */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#eafaf1] text-[#00684a] border border-[#00ed64]/30">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Date: Sep 26, 2026</span>
                      </span>

                      {/* Time */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Time: 2:00 PM - 5:00 PM</span>
                      </span>
                    </div>

                    {/* Registered Pill Badge */}
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#eafaf1] text-[#00684a] border border-[#00ed64]/30">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Registered</span>
                      </span>
                    </div>

                    {/* Bottom Metadata Boxes & Action (1:1 with screenshot) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 items-center">
                      
                      {/* Box 1: LAST DATE TO REGISTER */}
                      <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-200/80 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600 flex-shrink-0">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider font-mono block">
                            LAST DATE TO REGISTER
                          </span>
                          <span className="text-xs font-bold text-[#001e2b]">
                            Sep 25, 2026
                          </span>
                        </div>
                      </div>

                      {/* Box 2: LOCATION */}
                      <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-200/80 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-[#fa6e39] flex-shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-orange-800 uppercase tracking-wider font-mono block">
                            LOCATION
                          </span>
                          <span className="text-xs font-bold text-[#001e2b]">
                            Computer Lab(Room No.310)
                          </span>
                        </div>
                      </div>

                      {/* Action Button: Registered */}
                      <div className="sm:col-span-2 lg:col-span-1 flex lg:justify-end">
                        <button
                          type="button"
                          onClick={() => alert("Registration Confirmed! Your student credentials and lab bench assignment for Room 310 have been verified.")}
                          className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#eafaf1] text-[#00684a] border border-[#00ed64]/40 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#d8f8e8] transition-colors cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Registered</span>
                        </button>
                      </div>

                    </div>

                    {/* Expandable Section Details */}
                    {expandedEventId === 'ai-web' && (
                      <div className="mt-4 pt-4 border-t border-[#e1e5e8] space-y-3 animate-fadeIn text-xs text-[#3d4f5b] leading-relaxed">
                        <div className="p-4 rounded-xl bg-[#f9fbfa] border border-[#e1e5e8] space-y-2">
                          <h4 className="font-bold text-[#001e2b]">Event Overview & Evaluation Guidelines:</h4>
                          <p>
                            Teams are tasked with architecting a modern, interactive web application incorporating AI-assisted elements, real-time responsive styling, and fast client-side performance. All projects are deployed live on campus intranet servers for jury testing.
                          </p>
                          <div className="flex gap-4 pt-1 font-mono text-[11px] text-[#5c6c7a]">
                            <span>• Team Leader: <strong>{student.name}</strong></span>
                            <span>• Allotted Workstation: <strong>PC-18 (Lab 310)</strong></span>
                            <span>• Verification Status: <strong>Verified</strong></span>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ================= 4. MY CERTIFICATES VIEW (/dashboard/certificate - 1:1 with media_1790600541180.png) ================= */}
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#001e2b] tracking-tight mb-1">
                  My Certificates
                </h1>
                <p className="text-sm sm:text-base text-[#5c6c7a]">
                  Manage and showcase your achievements
                </p>
              </div>

              {/* Tabs: All (5) | Verified (2) | Pending (3) */}
              <div className="w-full border-b border-[#e1e5e8]">
                <div className="flex items-center gap-6 sm:gap-8">
                  <button
                    onClick={() => setCertFilter('all')}
                    className={`py-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                      certFilter === 'all'
                        ? 'border-[#00ed64] text-[#001e2b]'
                        : 'border-transparent text-[#5c6c7a] hover:text-[#001e2b]'
                    }`}
                  >
                    <Award className={`w-4 h-4 ${certFilter === 'all' ? 'text-[#00ed64]' : 'text-[#5c6c7a]'}`} />
                    <span>All ({allCertificatesList.length})</span>
                  </button>

                  <button
                    onClick={() => setCertFilter('verified')}
                    className={`py-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                      certFilter === 'verified'
                        ? 'border-[#00ed64] text-[#001e2b]'
                        : 'border-transparent text-[#5c6c7a] hover:text-[#001e2b]'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${certFilter === 'verified' ? 'text-emerald-500' : 'text-[#5c6c7a]'}`} />
                    <span>Verified ({allCertificatesList.filter(c => c.status === 'verified').length})</span>
                  </button>

                  <button
                    onClick={() => setCertFilter('pending')}
                    className={`py-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                      certFilter === 'pending'
                        ? 'border-[#00ed64] text-[#001e2b]'
                        : 'border-transparent text-[#5c6c7a] hover:text-[#001e2b]'
                    }`}
                  >
                    <Clock className={`w-4 h-4 ${certFilter === 'pending' ? 'text-amber-500' : 'text-[#5c6c7a]'}`} />
                    <span>Pending ({allCertificatesList.filter(c => c.status === 'pending').length})</span>
                  </button>
                </div>
              </div>

              {/* Horizontal Certificate Cards matching Screenshot 1 */}
              <div className="space-y-4">
                {allCertificatesList
                  .filter(c => {
                    if (certFilter === 'verified') return c.status === 'verified';
                    if (certFilter === 'pending') return c.status === 'pending';
                    return true;
                  })
                  .map((cert) => (
                    <div 
                      key={cert.id}
                      className="w-full border border-[#e1e5e8] rounded-[18px] p-5 sm:p-6 bg-white shadow-xs hover:border-[#00ed64] transition-all space-y-4"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Left: Medal badge + Title & Metadata */}
                        <div className="flex items-start sm:items-center gap-4 flex-1">
                          {/* Dark rounded-xl square badge with gradient border */}
                          <div 
                            className="p-[1.5px] rounded-[14px] flex-shrink-0"
                            style={{
                              background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)",
                              boxShadow: "0 0 10px rgba(255, 137, 24, 0.25)"
                            }}
                          >
                            <div className="w-12 h-12 rounded-[12px] bg-[#001e2b] flex items-center justify-center text-[#00ed64]">
                              <Award className="w-6 h-6 stroke-[1.8]" />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <h3 className="text-base sm:text-lg font-bold text-[#001e2b] flex items-center gap-1.5 flex-wrap">
                              <span>{cert.title}</span>
                              {cert.status === 'verified' && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100 flex-shrink-0" />
                              )}
                            </h3>

                            <div className="flex items-center gap-4 text-xs text-[#5c6c7a] flex-wrap font-sans">
                              <div className="flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5 text-slate-400" />
                                <span>{cert.organizer || "AIML Club"}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                <span>{cert.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Center Banner: ONLY IF PENDING (Exact yellow notice box from screenshot) */}
                        {cert.status === 'pending' && (
                          <div className="flex-1 max-w-2xl bg-[#fffbeb] border border-amber-200/80 rounded-xl px-4 py-2.5 text-xs text-[#b45309] font-normal leading-relaxed">
                            Your certificate is currently pending verification. The certificate will be generated after your attendance and participation in the competition have been successfully verified.
                          </div>
                        )}

                        {/* Right: Badge + Actions */}
                        <div className="flex items-center gap-3 sm:gap-4 justify-between sm:justify-end">
                          {cert.status === 'verified' ? (
                            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#e8faf0] text-[#00684a] border border-[#00ed64]/30">
                              Verified
                            </span>
                          ) : (
                            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#fffbeb] text-[#d97706] border border-amber-200">
                              Pending
                            </span>
                          )}

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedCertModal(cert)}
                              title="View Certificate"
                              className="p-2 rounded-lg text-[#5c6c7a] hover:text-[#001e2b] hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => setShareModalCert(cert)}
                              title="Share Certificate"
                              className="p-2 rounded-lg text-[#5c6c7a] hover:text-[#001e2b] hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Row (Share Footnote for Verified matching screenshot) */}
                      {cert.status === 'verified' && (
                        <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-[#5c6c7a]">
                          <Share2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          <span>You can share this certificate on LinkedIn, Facebook, WhatsApp, Email and other platforms</span>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ================= 5. SUBMIT REVIEW VIEW (/dashboard/submit-review - 1:1 with media_1790600561291.png) ================= */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              
              {/* Dark Hero Banner matching Screenshot 2 */}
              <div className="rounded-[24px] bg-[#001e2b] text-white p-6 sm:p-8 relative overflow-hidden border border-[#0d3345] shadow-xl space-y-6">
                
                {/* Ambient glow in corner */}
                <div 
                  className="absolute -right-20 -top-20 w-[400px] h-[300px] rounded-full blur-[100px] opacity-20 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, #00ed64 0%, #00BFFB 100%)' }}
                />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                  <div className="max-w-2xl space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#002b3d] border border-[#00ed64]/30 text-[#00ed64] text-[11px] font-bold uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>VERIFIED CERTIFICATE FEEDBACK PORTAL</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                      Submit Event Review & <span className="text-[#00ed64]">Student Feedback</span>
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                      In accordance with AI/ML Club quality standards, only certified attendees who have had their certificate of merit or participation generated can submit official event feedback.
                    </p>
                  </div>

                  {/* Top-Right Stat Widgets (1:1 with Screenshot 2) */}
                  <div className="flex sm:flex-col gap-3 flex-shrink-0">
                    {/* Widget 1: ELIGIBLE EVENTS */}
                    <div 
                      className="p-[1.5px] rounded-[16px] min-w-[170px]"
                      style={{
                        background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)",
                        boxShadow: "0 0 10px rgba(0, 237, 100, 0.15)"
                      }}
                    >
                      <div className="px-5 py-3 rounded-[14px] bg-[#001e2b] flex flex-col justify-center">
                        <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                          ELIGIBLE EVENTS
                        </span>
                        <span className="text-2xl sm:text-3xl font-black text-[#00ed64] mt-0.5 font-mono">
                          {eligibleEvents.length}
                        </span>
                      </div>
                    </div>

                    {/* Widget 2: REVIEWS SUBMITTED */}
                    <div 
                      className="p-[1.5px] rounded-[16px] min-w-[170px]"
                      style={{
                        background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)",
                        boxShadow: "0 0 10px rgba(255, 137, 24, 0.15)"
                      }}
                    >
                      <div className="px-5 py-3 rounded-[14px] bg-[#001e2b] flex flex-col justify-center">
                        <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                          REVIEWS SUBMITTED
                        </span>
                        <span className="text-2xl sm:text-3xl font-black text-white mt-0.5 font-mono">
                          {reviews.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Switcher Pills */}
                <div className="flex items-center gap-3 pt-2 relative z-10 flex-wrap">
                  <button
                    onClick={() => setReviewViewMode('submit')}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      reviewViewMode === 'submit'
                        ? 'bg-[#00ed64] text-[#001e2b] shadow-sm'
                        : 'bg-[#002b3d] text-white/80 border border-[#0d3345] hover:text-white'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Submit / Edit Review</span>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      reviewViewMode === 'submit' ? 'bg-[#001e2b] text-[#00ed64]' : 'bg-white/10 text-white'
                    }`}>
                      {eligibleEvents.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setReviewViewMode('my-reviews')}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      reviewViewMode === 'my-reviews'
                        ? 'bg-[#00ed64] text-[#001e2b] shadow-sm'
                        : 'bg-[#002b3d] text-white/80 border border-[#0d3345] hover:text-white'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>My Submitted Reviews</span>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      reviewViewMode === 'my-reviews' ? 'bg-[#001e2b] text-[#00ed64]' : 'bg-white/10 text-white'
                    }`}>
                      {reviews.length}
                    </span>
                  </button>
                </div>

              </div>

              {/* Toast Notification on Submit */}
              {reviewSubmitSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>Your verified feedback has been officially recorded and published to the club review repository!</span>
                </div>
              )}

              {/* MODE 1: SUBMIT REVIEW FORM (1:1 with Screenshot 2) */}
              {reviewViewMode === 'submit' ? (
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  
                  {/* Left Column: Certified Events list */}
                  <div className="w-full lg:w-[380px] flex-shrink-0 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-[#001e2b]">Certified Events</h2>
                        <p className="text-xs text-[#5c6c7a]">Select an event to submit or update your review.</p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#e8faf0] text-[#00684a] border border-[#00ed64]/30">
                        {eligibleEvents.length} Available
                      </span>
                    </div>

                    <div className="space-y-3">
                      {eligibleEvents.map((ev) => {
                        const isSelected = selectedReviewEvent?.id === ev.id;
                        return (
                          <div
                            key={ev.id}
                            onClick={() => setSelectedReviewEvent(ev)}
                            className={`rounded-2xl p-5 transition-all cursor-pointer space-y-3 relative ${
                              isSelected 
                                ? 'border-2 border-[#00ed64] bg-white shadow-sm' 
                                : 'border border-[#e1e5e8] bg-white hover:border-[#00ed64]/60'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-700 tracking-wider font-mono">
                                  {ev.badge || "GROUP"}
                                </span>
                                <span className="text-xs text-[#5c6c7a]">Group Event</span>
                              </div>
                            </div>

                            <h3 className="text-base font-bold text-[#001e2b] leading-snug">
                              {ev.title}
                            </h3>

                            <div className="flex items-center justify-between text-xs text-[#5c6c7a] pt-1">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                <span>{ev.date}</span>
                              </div>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const certMatch = allCertificatesList.find(c => c.title === ev.title) || allCertificatesList[0];
                                  setSelectedCertModal(certMatch);
                                }}
                                className="flex items-center gap-1 text-[#00684a] font-bold hover:underline cursor-pointer"
                              >
                                <Award className="w-3.5 h-3.5" />
                                <span>Certificate</span>
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Review Form matching Screenshot 2 */}
                  <div className="flex-1 w-full bg-white rounded-2xl border border-[#e1e5e8] p-6 sm:p-8 space-y-6 shadow-xs">
                    
                    {/* Header */}
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#e8faf0] border border-[#00ed64]/30 text-[#00684a] text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified Event Review</span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold text-[#001e2b]">
                        {selectedReviewEvent?.title || 'Science Exhibition & AI Expo'}
                      </h2>

                      <p className="text-xs text-[#5c6c7a]">
                        Your honest review helps mentors and organizers continuously improve future events.
                      </p>
                    </div>

                    <form onSubmit={handleReviewSubmit} className="space-y-6">
                      
                      {/* OVERALL EVENT RATING */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-[#001e2b] uppercase tracking-wider font-mono">
                          OVERALL EVENT RATING <span className="text-rose-500">*</span>
                        </label>
                        
                        <div className="flex items-center gap-4 flex-wrap">
                          <div className="flex gap-1.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                type="button"
                                key={star}
                                onClick={() => setNewReviewData(prev => ({ ...prev, rating: star }))}
                                className="p-1 hover:scale-110 transition-transform cursor-pointer"
                              >
                                <Star 
                                  className={`w-7 h-7 sm:w-8 sm:h-8 ${
                                    star <= newReviewData.rating 
                                      ? 'fill-[#fa6e39] text-[#fa6e39]' 
                                      : 'text-slate-200'
                                  }`} 
                                />
                              </button>
                            ))}
                          </div>

                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#e8faf0] text-[#00684a] border border-[#00ed64]/30">
                            {newReviewData.rating === 5 ? 'Exceptional (5/5)' :
                             newReviewData.rating === 4 ? 'Great (4/5)' :
                             newReviewData.rating === 3 ? 'Good (3/5)' :
                             newReviewData.rating === 2 ? 'Mediocre (2/5)' : 'Disappointed (1/5)'}
                          </span>
                        </div>
                      </div>

                      {/* HOW DID YOU FEEL ABOUT THIS EVENT? (6 Reaction Cards matching screenshot) */}
                      <div className="space-y-2.5">
                        <label className="block text-xs font-bold text-[#001e2b] uppercase tracking-wider font-mono">
                          HOW DID YOU FEEL ABOUT THIS EVENT?
                        </label>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                          {[
                            { label: 'Disappointed', emoji: '😞' },
                            { label: 'Mediocre', emoji: '😐' },
                            { label: 'Average', emoji: '😐' },
                            { label: 'Good', emoji: '🙂' },
                            { label: 'Great', emoji: '😄' },
                            { label: 'Exceptional', emoji: '🤩' }
                          ].map((feel) => {
                            const isSelected = newReviewData.feeling === feel.label;
                            return (
                              <button
                                type="button"
                                key={feel.label}
                                onClick={() => setNewReviewData(prev => ({ ...prev, feeling: feel.label, emoji: feel.emoji }))}
                                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                                  isSelected 
                                    ? 'border-2 border-[#00ed64] bg-emerald-50/40 shadow-xs' 
                                    : 'border-[#e1e5e8] bg-white hover:border-[#00ed64]/40'
                                }`}
                              >
                                <span className="text-2xl sm:text-3xl leading-none">{feel.emoji}</span>
                                <span className="text-[11px] font-semibold text-[#001e2b] truncate w-full">{feel.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* DETAILED EVENT CRITERIA (2x2 grid with green progress bars matching screenshot) */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2">
                          <Sliders className="w-4 h-4 text-[#00684a]" />
                          <label className="text-xs font-bold text-[#001e2b] uppercase tracking-wider font-mono">
                            DETAILED EVENT CRITERIA
                          </label>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 rounded-2xl bg-[#f9fbfa] border border-[#e1e5e8]">
                          {[
                            { key: 'contentRating', label: 'Technical Content' },
                            { key: 'handsOnRating', label: 'Hands-on / Practical' },
                            { key: 'organizationRating', label: 'Organization & Timing' },
                            { key: 'mentorshipRating', label: 'Mentor & Speaker Support' }
                          ].map((crit) => (
                            <div key={crit.key} className="space-y-1.5">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-[#001e2b]">{crit.label}</span>
                                <span className="font-mono font-bold text-[#00684a]">{newReviewData[crit.key]}/5</span>
                              </div>
                              
                              {/* Bright Green Progress Bar matching screenshot */}
                              <div className="relative h-2.5 bg-slate-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-[#00ed64] transition-all rounded-full"
                                  style={{ width: `${(newReviewData[crit.key] / 5) * 100}%` }}
                                />
                              </div>

                              <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-0.5">
                                {[1, 2, 3, 4, 5].map(val => (
                                  <button
                                    type="button"
                                    key={val}
                                    onClick={() => setNewReviewData(prev => ({ ...prev, [crit.key]: val }))}
                                    className={`hover:text-[#001e2b] cursor-pointer px-1 ${
                                      newReviewData[crit.key] === val ? 'font-bold text-[#00684a]' : ''
                                    }`}
                                  >
                                    {val}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* WRITTEN FEEDBACK */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-[#001e2b] uppercase tracking-wider font-mono">
                          Written Feedback & Suggestions <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={newReviewData.feedback}
                          onChange={(e) => setNewReviewData(prev => ({ ...prev, feedback: e.target.value }))}
                          placeholder="Share your experience, project outcomes, hardware kit impressions, and what you enjoyed most about this session..."
                          className="w-full p-3.5 rounded-xl border border-[#e1e5e8] bg-white text-xs sm:text-sm text-[#001e2b] placeholder-slate-400 focus:outline-none focus:border-[#00ed64] focus:ring-1 focus:ring-[#00ed64]"
                        />
                      </div>

                      {/* RECOMMEND TOGGLE */}
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          id="recommend"
                          checked={newReviewData.recommend}
                          onChange={(e) => setNewReviewData(prev => ({ ...prev, recommend: e.target.checked }))}
                          className="w-4 h-4 text-[#00ed64] accent-[#00ed64] rounded cursor-pointer"
                        />
                        <label htmlFor="recommend" className="text-xs font-semibold text-[#001e2b] cursor-pointer">
                          I recommend this technical event to fellow college students
                        </label>
                      </div>

                      {/* SUBMIT BUTTON WITH SIGNATURE GRADIENT BORDER */}
                      <div 
                        className="p-[2px] rounded-full inline-flex w-full"
                        style={{
                          background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)",
                          boxShadow: "0 0 14px rgba(255, 137, 24, 0.28), 0 0 18px rgba(0, 152, 243, 0.22)"
                        }}
                      >
                        <button
                          type="submit"
                          disabled={isSubmittingReview}
                          className="w-full py-3 rounded-full text-xs sm:text-sm font-bold bg-[#001e2b] text-[#00ed64] hover:bg-[#002b3d] cursor-pointer transition-colors flex items-center justify-center gap-2"
                        >
                          {isSubmittingReview ? (
                            <span>Recording Verified Review...</span>
                          ) : (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Submit Verified Review</span>
                            </>
                          )}
                        </button>
                      </div>

                    </form>
                  </div>

                </div>
              ) : (
                /* MODE 2: MY SUBMITTED REVIEWS LIST */
                <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 sm:p-8 space-y-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-[#001e2b]">Your Submitted Event Reviews</h2>
                      <p className="text-xs text-[#5c6c7a]">All verified feedback you have provided for completed club events.</p>
                    </div>
                    <button
                      onClick={() => setReviewViewMode('submit')}
                      className="px-4 py-2 bg-[#001e2b] text-[#00ed64] rounded-full text-xs font-bold hover:bg-[#002b3d] cursor-pointer"
                    >
                      + Write New Review
                    </button>
                  </div>

                  {reviews.length === 0 ? (
                    <div className="p-12 text-center border border-dashed border-[#e1e5e8] rounded-xl text-slate-400 space-y-2">
                      <Star className="w-10 h-10 mx-auto text-slate-300" />
                      <p className="text-sm font-medium">No reviews submitted yet.</p>
                      <p className="text-xs">Select one of your certified events from the left column to write your first review!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {reviews.map((rev) => (
                        <div key={rev.id} className="p-5 rounded-2xl bg-[#f9fbfa] border border-[#e1e5e8] space-y-3">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#00684a] font-mono">
                                Verified Event Feedback
                              </span>
                              <h3 className="text-base font-bold text-[#001e2b]">{rev.eventTitle}</h3>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{rev.emoji || '😄'}</span>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <Star key={s} className={`w-4 h-4 ${s <= rev.rating ? 'fill-[#fa6e39] text-[#fa6e39]' : 'text-slate-200'}`} />
                                ))}
                              </div>
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-[#3d4f5b] leading-relaxed">
                            "{rev.feedback}"
                          </p>

                          <div className="flex items-center justify-between text-[11px] text-[#5c6c7a] pt-2 border-t border-slate-200">
                            <span>Submitted on {rev.date}</span>
                            {rev.recommend && (
                              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Recommended to Students
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* ================= CERTIFICATE PREVIEW MODAL ================= */}
          {selectedCertModal && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative">
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCertModal(null)}
                  className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Certificate Frame */}
                <div className="border-4 border-double border-amber-600/60 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#fffefc] via-white to-[#fffefc] text-center space-y-4 shadow-inner relative overflow-hidden">
                  
                  {/* Watermark Logo */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                    <Award className="w-80 h-80 text-amber-700" />
                  </div>

                  <div className="space-y-1 relative z-10">
                    <p className="text-[11px] font-bold text-amber-900 uppercase tracking-widest font-mono">
                      Department of Science, Technology and Technical Education, Govt. of Bihar
                    </p>
                    <h2 className="text-lg sm:text-2xl font-black text-[#001e2b] tracking-tight uppercase">
                      Government Engineering College, Khagaria
                    </h2>
                    <p className="text-xs font-semibold text-emerald-700 font-mono">
                      Official AI/ML & IoT Innovation Chapter
                    </p>
                  </div>

                  <div className="py-2 relative z-10">
                    <span className="inline-block px-4 py-1 rounded-full text-xs font-bold bg-amber-100/70 text-amber-900 border border-amber-300 tracking-wider uppercase font-mono">
                      {selectedCertModal.status === 'verified' ? 'Certificate of Verified Merit' : 'Certificate of Participation'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 relative z-10">
                    This is to proudly certify that
                  </p>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#001e2b] border-b border-amber-200 pb-2 max-w-md mx-auto relative z-10">
                    {student.name}
                  </h3>

                  <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed relative z-10">
                    bearing Registration No. <strong className="font-mono text-[#001e2b]">{student.regNo}</strong> of the <strong className="text-[#001e2b]">{student.branch}</strong> department has successfully demonstrated outstanding performance and participated in the
                  </p>

                  <h4 className="text-lg sm:text-xl font-bold text-[#001e2b] text-emerald-800 relative z-10">
                    {selectedCertModal.title}
                  </h4>

                  <p className="text-xs text-slate-500 relative z-10">
                    Conducted on {selectedCertModal.date} by {selectedCertModal.organizer || "AIML Club, GEC Khagaria"}.
                  </p>

                  {/* Signatures & Seal */}
                  <div className="pt-6 grid grid-cols-2 gap-6 border-t border-slate-200 text-left relative z-10">
                    <div>
                      <div className="font-serif italic text-sm text-[#001e2b]">Dr. Arvind Kumar</div>
                      <p className="text-[10px] text-slate-500 font-sans">Principal & Patron, GEC Khagaria</p>
                    </div>
                    <div className="text-right">
                      <div className="font-serif italic text-sm text-[#001e2b]">Prof. Manoj Sharma</div>
                      <p className="text-[10px] text-slate-500 font-sans">Head Faculty Coordinator</p>
                    </div>
                  </div>

                  <div className="pt-2 text-[10px] text-slate-400 font-mono text-center relative z-10">
                    Certificate UID: {selectedCertModal.id} • Authenticated Digital Credential
                  </div>
                </div>

                {/* Modal Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => alert(`Downloading high-resolution certificate for ${selectedCertModal.title}...`)}
                      className="px-4 py-2.5 bg-[#001e2b] text-white rounded-xl text-xs font-bold hover:bg-[#002b3d] flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setSelectedCertModal(null);
                        setShareModalCert(selectedCertModal);
                      }}
                      className="px-4 py-2.5 bg-slate-100 text-[#001e2b] rounded-xl text-xs font-bold hover:bg-slate-200 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedCertModal(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    Close Preview
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ================= CERTIFICATE SHARE MODAL ================= */}
          {shareModalCert && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200 relative">
                
                {/* Close Button */}
                <button
                  onClick={() => { setShareModalCert(null); setCopiedLink(false); }}
                  className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#001e2b]">Share Your Achievement</h3>
                  <p className="text-xs text-[#5c6c7a]">
                    Showcase "{shareModalCert.title}" to your professional network and peers.
                  </p>
                </div>

                {/* Share Options List */}
                <div className="space-y-2.5">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + '/dashboard/certificate')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full p-3 rounded-xl bg-[#0077b5]/10 text-[#0077b5] font-bold text-xs flex items-center justify-between hover:bg-[#0077b5]/20 transition-colors"
                  >
                    <span>Share on LinkedIn</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`I have received a verified certificate for "${shareModalCert.title}" from GEC Khagaria AI/ML & IoT Club! Verification ID: ${shareModalCert.id}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full p-3 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-between hover:bg-emerald-100 transition-colors"
                  >
                    <span>Share on WhatsApp</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Proud to earn my verified certificate for "${shareModalCert.title}" at GEC Khagaria! @geckhagaria`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full p-3 rounded-xl bg-sky-50 text-sky-600 font-bold text-xs flex items-center justify-between hover:bg-sky-100 transition-colors"
                  >
                    <span>Share on Twitter / X</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Copy Link Input */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                    Direct Verification Link
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={`${window.location.origin}/dashboard/certificate?uid=${shareModalCert.id}`}
                      className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-600 select-all font-mono"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(`${window.location.origin}/dashboard/certificate?uid=${shareModalCert.id}`);
                        setCopiedLink(true);
                        setTimeout(() => setCopiedLink(false), 2500);
                      }}
                      className="px-3.5 py-2 bg-[#001e2b] text-[#00ed64] rounded-xl text-xs font-bold hover:bg-[#002b3d] cursor-pointer flex items-center gap-1"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================= 6. STUDENT SETTINGS VIEW (1:1 with media_1790603214352.png & media_1790603269594.png) ================= */}
          {activeTab === 'settings' && (
            <div className="w-full space-y-6 md:space-y-8 animate-fadeIn">
              
              {/* Settings Header with Back Arrow Button */}
              <div className="flex items-start gap-4">
                <button
                  onClick={() => navigateToTab('dashboard', '/dashboard/student')}
                  className="w-10 h-10 rounded-2xl border border-[#e1e5e8] bg-white hover:bg-slate-50 flex items-center justify-center text-[#001e2b] transition-colors cursor-pointer shadow-xs mt-1"
                  title="Back to Dashboard"
                >
                  <ChevronLeft className="w-5 h-5 text-orange-500" />
                </button>
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001e2b] tracking-tight">
                    Student Settings
                  </h1>
                  <p className="text-xs sm:text-sm text-[#5c6c7a]">
                    Manage your profile, academic credentials, and security preferences
                  </p>
                </div>
              </div>

              {/* 3 Tab Switcher Navigation */}
              <div className="flex items-center gap-8 border-b border-[#e1e5e8] text-sm font-semibold">
                <button
                  onClick={() => setSettingsActiveTab('profile')}
                  className={`pb-3 flex items-center gap-2 transition-all cursor-pointer ${
                    settingsActiveTab === 'profile'
                      ? 'text-[#00684a] border-b-2 border-[#00ed64] font-bold'
                      : 'text-[#5c6c7a] hover:text-[#001e2b]'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Profile</span>
                </button>

                <button
                  onClick={() => setSettingsActiveTab('security')}
                  className={`pb-3 flex items-center gap-2 transition-all cursor-pointer ${
                    settingsActiveTab === 'security'
                      ? 'text-[#00684a] border-b-2 border-[#00ed64] font-bold'
                      : 'text-[#5c6c7a] hover:text-[#001e2b]'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Security</span>
                </button>

                <button
                  onClick={() => setSettingsActiveTab('preferences')}
                  className={`pb-3 flex items-center gap-2 transition-all cursor-pointer ${
                    settingsActiveTab === 'preferences'
                      ? 'text-[#00684a] border-b-2 border-[#00ed64] font-bold'
                      : 'text-[#5c6c7a] hover:text-[#001e2b]'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Preferences</span>
                </button>
              </div>

              {/* Success Alert */}
              {settingsSavedAlert && (
                <div className="p-4 rounded-2xl bg-[#eafaf1] border border-[#00ed64]/40 flex items-center gap-3 text-xs font-bold text-[#00684a] shadow-xs">
                  <CheckCircle className="w-4 h-4 text-[#00ed64]" />
                  <span>Student profile successfully updated and saved!</span>
                </div>
              )}

              {/* TAB 1: PROFILE (media_1790603214352.png) */}
              {settingsActiveTab === 'profile' && (
                <div className="bg-white rounded-3xl border border-[#e1e5e8] p-6 sm:p-8 space-y-8 shadow-xs">
                  
                  {/* Avatar Banner Row */}
                  <div className="flex items-center gap-5">
                    <div className="relative group">
                      <img 
                        src={studentProfile.avatar} 
                        alt={studentProfile.name} 
                        className="w-20 h-20 rounded-full object-cover ring-2 ring-[#e1e5e8] shadow-sm bg-slate-100"
                      />
                      <label 
                        className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#00684a] text-white flex items-center justify-center cursor-pointer hover:bg-[#001e2b] shadow-md transition-colors"
                        title="Upload photo from computer"
                      >
                        <Camera className="w-3.5 h-3.5 text-white" />
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleProfilePhotoUpload} 
                          className="hidden" 
                        />
                      </label>
                    </div>

                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#001e2b]">
                        {studentProfile.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#5c6c7a] mt-0.5 font-medium">
                        {studentProfile.branch} • {studentProfile.batch}
                      </p>
                    </div>
                  </div>

                  {/* 2-Column Form: Basic Information vs Academic Information */}
                  <form onSubmit={handleSaveStudentProfile} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                      
                      {/* Left: Basic Information */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-[#e1e5e8] pb-2 text-[#001e2b] font-bold text-sm">
                          <Users className="w-4 h-4 text-[#00684a]" />
                          <span>Basic Information</span>
                        </div>

                        <div className="space-y-1.5 text-xs">
                          <label className="font-semibold text-[#5c6c7a]">Full Name</label>
                          <input 
                            type="text"
                            value={studentProfile.name}
                            onChange={(e) => setStudentProfile({ ...studentProfile, name: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#e1e5e8] text-[#001e2b] focus:border-[#00684a] outline-none"
                          />
                        </div>

                        <div className="space-y-1.5 text-xs">
                          <label className="font-semibold text-[#5c6c7a]">Email Address</label>
                          <input 
                            type="email"
                            value={studentProfile.email}
                            onChange={(e) => setStudentProfile({ ...studentProfile, email: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#e1e5e8] text-[#001e2b] focus:border-[#00684a] outline-none font-mono"
                          />
                        </div>

                        <div className="space-y-1.5 text-xs">
                          <label className="font-semibold text-[#5c6c7a]">Phone Number</label>
                          <input 
                            type="tel"
                            value={studentProfile.phone}
                            onChange={(e) => setStudentProfile({ ...studentProfile, phone: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#e1e5e8] text-[#001e2b] focus:border-[#00684a] outline-none font-mono"
                          />
                        </div>

                        <div className="space-y-1.5 text-xs">
                          <label className="font-semibold text-[#5c6c7a]">Location</label>
                          <input 
                            type="text"
                            value={studentProfile.location}
                            onChange={(e) => setStudentProfile({ ...studentProfile, location: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#e1e5e8] text-[#001e2b] focus:border-[#00684a] outline-none"
                          />
                        </div>
                      </div>

                      {/* Right: Academic Information */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-[#e1e5e8] pb-2 text-[#001e2b] font-bold text-sm">
                          <BookOpen className="w-4 h-4 text-[#00684a]" />
                          <span>Academic Information</span>
                        </div>

                        <div className="space-y-1.5 text-xs">
                          <label className="font-semibold text-[#5c6c7a]">Branch</label>
                          <input 
                            type="text"
                            value={studentProfile.branch}
                            onChange={(e) => setStudentProfile({ ...studentProfile, branch: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#e1e5e8] text-[#001e2b] focus:border-[#00684a] outline-none"
                          />
                        </div>

                        <div className="space-y-1.5 text-xs">
                          <label className="font-semibold text-[#5c6c7a]">Batch / Year</label>
                          <input 
                            type="text"
                            value={studentProfile.batch}
                            onChange={(e) => setStudentProfile({ ...studentProfile, batch: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#e1e5e8] text-[#001e2b] focus:border-[#00684a] outline-none font-mono"
                          />
                        </div>

                        <div className="space-y-1.5 text-xs">
                          <label className="font-semibold text-[#5c6c7a]">Registration Number</label>
                          <input 
                            type="text"
                            value={studentProfile.regNo}
                            onChange={(e) => setStudentProfile({ ...studentProfile, regNo: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#e1e5e8] text-[#001e2b] focus:border-[#00684a] outline-none font-mono"
                          />
                        </div>

                        <div className="space-y-1.5 text-xs">
                          <label className="font-semibold text-[#5c6c7a]">Member Since</label>
                          <div className="relative">
                            <input 
                              type="text"
                              value={studentProfile.memberSince}
                              onChange={(e) => setStudentProfile({ ...studentProfile, memberSince: e.target.value })}
                              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#e1e5e8] text-[#001e2b] focus:border-[#00684a] outline-none"
                            />
                            <Calendar className="w-4 h-4 text-[#738290] absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Save Changes Button */}
                    <div className="flex justify-end pt-4 border-t border-[#e1e5e8]">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#001e2b] text-[#00ed64] hover:bg-[#002e42] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </form>

                </div>
              )}

              {/* TAB 2: SECURITY (media_1790603269594.png) */}
              {settingsActiveTab === 'security' && (
                <div className="space-y-6">
                  {/* Change Password Card */}
                  <div className="bg-white rounded-3xl border border-[#e1e5e8] p-6 sm:p-8 space-y-6 shadow-xs">
                    <div className="flex items-center gap-2 text-[#001e2b] font-bold text-base">
                      <Lock className="w-5 h-5 text-emerald-600" />
                      <span>Change Password</span>
                    </div>

                    <form onSubmit={handleUpdatePassword} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-[#5c6c7a]">Current Password</label>
                          <div className="relative">
                            <input 
                              type={showPassword.current ? "text" : "password"}
                              value={securityPasswords.current}
                              onChange={(e) => setSecurityPasswords({ ...securityPasswords, current: e.target.value })}
                              className="w-full pr-10 pl-3.5 py-2.5 rounded-xl border border-[#e1e5e8] text-[#001e2b] focus:border-[#00684a] outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#738290] hover:text-[#001e2b] cursor-pointer"
                            >
                              {showPassword.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-semibold text-[#5c6c7a]">New Password</label>
                          <div className="relative">
                            <input 
                              type={showPassword.newPass ? "text" : "password"}
                              value={securityPasswords.newPass}
                              onChange={(e) => setSecurityPasswords({ ...securityPasswords, newPass: e.target.value })}
                              className="w-full pr-10 pl-3.5 py-2.5 rounded-xl border border-[#e1e5e8] text-[#001e2b] focus:border-[#00684a] outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword({ ...showPassword, newPass: !showPassword.newPass })}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#738290] hover:text-[#001e2b] cursor-pointer"
                            >
                              {showPassword.newPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                          <span className="text-[11px] text-[#738290] block">Minimum 8 characters</span>
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-semibold text-[#5c6c7a]">Confirm New Password</label>
                          <div className="relative">
                            <input 
                              type={showPassword.confirmPass ? "text" : "password"}
                              value={securityPasswords.confirmPass}
                              onChange={(e) => setSecurityPasswords({ ...securityPasswords, confirmPass: e.target.value })}
                              className="w-full pr-10 pl-3.5 py-2.5 rounded-xl border border-[#e1e5e8] text-[#001e2b] focus:border-[#00684a] outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword({ ...showPassword, confirmPass: !showPassword.confirmPass })}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#738290] hover:text-[#001e2b] cursor-pointer"
                            >
                              {showPassword.confirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#001e2b] text-[#00ed64] hover:bg-[#002e42] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                        >
                          <Check className="w-4 h-4" />
                          <span>Update Password</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Delete Account Card (media_1790603269594.png) */}
                  <div className="rounded-3xl border border-rose-200 bg-rose-50/20 p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-2 text-rose-600 font-bold text-base">
                      <Trash2 className="w-5 h-5" />
                      <span>Delete Account</span>
                    </div>
                    <p className="text-xs text-[#5c6c7a] leading-relaxed">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to permanently delete your student account?")) {
                          localStorage.removeItem('gec_iot_student_profile');
                          alert("Your account credentials have been removed.");
                          if (onLogout) onLogout();
                          else if (setActiveTab) setActiveTab('home');
                        }
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 border border-rose-300 bg-white hover:bg-rose-50 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Account</span>
                    </button>
                  </div>

                </div>
              )}

              {/* TAB 3: PREFERENCES */}
              {settingsActiveTab === 'preferences' && (
                <div className="bg-white rounded-3xl border border-[#e1e5e8] p-6 sm:p-8 space-y-5 shadow-xs">
                  <h3 className="text-base font-bold text-[#001e2b]">Notification & Platform Preferences</h3>
                  
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#e1e5e8] bg-[#f9fbfa]">
                      <div>
                        <p className="font-bold text-[#001e2b]">Hackathon & Workshop Email Alerts</p>
                        <p className="text-[11px] text-[#5c6c7a]">Receive automatic email reminders 24 hours before club events</p>
                      </div>
                      <input 
                        type="checkbox"
                        checked={studentPreferences.emailAlerts}
                        onChange={(e) => setStudentPreferences({ ...studentPreferences, emailAlerts: e.target.checked })}
                        className="w-4 h-4 text-[#00684a] rounded cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#e1e5e8] bg-[#f9fbfa]">
                      <div>
                        <p className="font-bold text-[#001e2b]">Hardware Kit Allotment Notifications</p>
                        <p className="text-[11px] text-[#5c6c7a]">Get notified when ESP32/sensor benches are approved</p>
                      </div>
                      <input 
                        type="checkbox"
                        checked={studentPreferences.labHoursUpdates}
                        onChange={(e) => setStudentPreferences({ ...studentPreferences, labHoursUpdates: e.target.checked })}
                        className="w-4 h-4 text-[#00684a] rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </main>
      </div>

    </div>
  );
};

export default StudentDashboard;
