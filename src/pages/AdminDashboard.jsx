import React, { useState } from 'react';
import { useClub } from '../context/ClubContext';
import { 
  Home, 
  LayoutDashboard, 
  Calendar, 
  Award, 
  Users, 
  PlusCircle, 
  Trash2, 
  CheckCircle, 
  CheckCircle2,
  XCircle, 
  Image, 
  Sliders, 
  ExternalLink,
  Sparkles,
  Search,
  Bell,
  Clock,
  Trophy,
  Star,
  Download,
  AlertCircle,
  HelpCircle,
  Plus,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  MessageSquare,
  Milestone,
  Settings,
  Mail,
  Send,
  LogOut,
  Radio,
  Cpu,
  ShieldCheck,
  LayoutGrid
} from 'lucide-react';
import ImageUploader from '../components/ImageUploader';

export const AdminDashboard = ({ setActiveTab }) => {
  const { 
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
    complaints = [],
    updateComplaintStatus,
    addComplaintResponse,
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
  } = useClub();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('overview'); 
  const [adminReplyText, setAdminReplyText] = useState({});
  const [messageReplyText, setMessageReplyText] = useState({});
  const [settingsSavedAlert, setSettingsSavedAlert] = useState(false);
  const [settingsFormData, setSettingsFormData] = useState({
    portalName: portalSettings?.portalName || 'GEC Khagaria IoT & Robotics Club',
    academicSession: portalSettings?.academicSession || '2026-2027',
    primaryContactEmail: portalSettings?.primaryContactEmail || 'iotclub@geckhagaria.org',
    campusAddress: portalSettings?.campusAddress || 'Government Engineering College Khagaria, Bihar 851214',
    principalAuthority: portalSettings?.principalAuthority || 'Dr. Arvind Kumar (Principal & Patron)',
    coordinatorAuthority: portalSettings?.coordinatorAuthority || 'Prof. Manoj Sharma (Faculty Coordinator)',
    maxKitsPerTeam: portalSettings?.maxKitsPerTeam || '2 Units',
    hardwareLabHours: portalSettings?.hardwareLabHours || '09:00 AM - 07:00 PM (Mon-Sat)',
    allowPublicCertLookup: portalSettings?.allowPublicCertLookup ?? true,
    allowDirectJoinApplications: portalSettings?.allowDirectJoinApplications ?? true
  });

  // New Event Form State
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'Hackathon',
    status: 'Upcoming',
    date: '',
    mode: 'GEC Khagaria IoT Lab (Offline)',
    prizePool: '₹25,000',
    banner: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    summary: '',
    subEvents: [{ id: 'sub-1', title: 'Open Hardware Sprint', type: 'Team' }]
  });

  // New Certificate Form State
  const [newCert, setNewCert] = useState({
    id: `GEC-IOT-2026-00${certificates.length + 1}`,
    studentName: '',
    regNo: '',
    branch: 'Electronics & Communication Engineering',
    eventTitle: 'Khagaria IoT Make-a-thon 2026',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    grade: 'Certificate of Excellence',
    verificationStatus: 'Verified & Authenticated by GEC IoT Club',
    issuer: 'Dr. Arvind Kumar (Principal) & Prof. Manoj Sharma (Coordinator)'
  });

  // New Milestone Form State
  const [newMilestone, setNewMilestone] = useState({
    year: '2026',
    title: '',
    subtitle: '',
    badge: 'Hardware Triumph',
    date: 'October 2026',
    description: '',
    image: '',
    images: [],
    tags: ['IoT Club GECK', 'Hardware Innovation']
  });

  // Declare Result Form State
  const [newResult, setNewResult] = useState({
    eventTitle: 'Khagaria IoT Make-a-thon 2026',
    winnerTeam: '',
    winnerLeader: '',
    winnerBranch: 'ECE',
    runnerUpTeam: '',
    runnerUpLeader: '',
    innovationPrize: '',
    declaredBy: 'Prof. Manoj Sharma (Coordinator)',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    status: 'Published'
  });

  // New Photo State
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    category: 'Lab Sessions',
    image: '',
    images: [],
    date: 'October 2026',
    pinned: false
  });

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title) return;
    addEvent({ ...newEvent, id: `iot-${Date.now()}` });
    alert(`Event "${newEvent.title}" has been successfully published!`);
    setNewEvent({
      title: '',
      type: 'Hackathon',
      status: 'Upcoming',
      date: '',
      mode: 'GEC Khagaria IoT Lab (Offline)',
      prizePool: '₹25,000',
      banner: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      summary: '',
      subEvents: [{ id: 'sub-1', title: 'Open Hardware Sprint', type: 'Team' }]
    });
  };

  const handleIssueCertificate = (e) => {
    e.preventDefault();
    if (!newCert.studentName || !newCert.regNo) return;
    issueCertificate(newCert);
    alert(`Certificate ${newCert.id} successfully issued to ${newCert.studentName}!`);
    setNewCert({
      id: `GEC-IOT-2026-00${certificates.length + 2}`,
      studentName: '',
      regNo: '',
      branch: 'Electronics & Communication Engineering',
      eventTitle: 'Khagaria IoT Make-a-thon 2026',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      grade: 'Certificate of Excellence',
      verificationStatus: 'Verified & Authenticated by GEC IoT Club',
      issuer: 'Dr. Arvind Kumar (Principal) & Prof. Manoj Sharma (Coordinator)'
    });
  };

  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (!newMilestone.title) return;
    const allImgs = (newMilestone.images && newMilestone.images.length > 0) 
      ? newMilestone.images 
      : (newMilestone.image ? [newMilestone.image] : []);

    addMilestone({
      ...newMilestone,
      image: allImgs[0] || '',
      images: allImgs,
      id: `m-${Date.now()}`,
      stats: [
        { label: "Hardware Nodes", value: "32+" },
        { label: "Student Participants", value: "180+" }
      ]
    });
    alert(`Milestone "${newMilestone.title}" with ${allImgs.length} visual(s) added to IoT Journey timeline!`);
    setNewMilestone({
      year: '2026',
      title: '',
      subtitle: '',
      badge: 'Hardware Triumph',
      date: 'October 2026',
      description: '',
      image: '',
      images: [],
      tags: ['IoT Club GECK', 'Hardware Innovation']
    });
  };

  const handleDeclareResult = (e) => {
    e.preventDefault();
    if (!newResult.winnerTeam) return;
    declareNewResult({ ...newResult, id: `res-${Date.now()}` });
    alert(`Official Results published for "${newResult.eventTitle}"!`);
  };

  // Custom Section Form State
  const [newCustomSec, setNewCustomSec] = useState({
    title: '',
    badge: 'NEW HARDWARE INITIATIVE',
    subtitle: '',
    buttonText: 'Explore Program',
    buttonLink: 'events',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
  });

  // Admin Delegation Form State
  const [newDelegate, setNewDelegate] = useState({
    email: '',
    name: '',
    role: 'Faculty Coordinator (Delegated Admin)'
  });

  const handleCreateCustomSection = (e) => {
    e.preventDefault();
    if (!newCustomSec.title) return;
    addCustomSection(newCustomSec);
    alert(`Custom section "${newCustomSec.title}" successfully added to the Homepage!`);
    setNewCustomSec({
      title: '',
      badge: 'NEW HARDWARE INITIATIVE',
      subtitle: '',
      buttonText: 'Explore Program',
      buttonLink: 'events',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    });
  };

  const handleGrantDelegate = (e) => {
    e.preventDefault();
    if (!newDelegate.email) return;
    grantAdminAccess({
      ...newDelegate,
      grantedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    });
    alert(`Admin Authority granted to ${newDelegate.name || newDelegate.email}!`);
    setNewDelegate({ email: '', name: '', role: 'Faculty Coordinator (Delegated Admin)' });
  };

  const handleAddPhoto = (e) => {
    e.preventDefault();
    const allImgs = (newPhoto.images && newPhoto.images.length > 0) 
      ? newPhoto.images 
      : (newPhoto.image ? [newPhoto.image] : []);

    if (allImgs.length === 0 || !newPhoto.title) {
      alert("Please provide an image title and at least one image file or URL.");
      return;
    }

    allImgs.forEach((img, idx) => {
      addGalleryImage({
        title: allImgs.length > 1 ? `${newPhoto.title} (Photo ${idx + 1})` : newPhoto.title,
        category: newPhoto.category,
        image: img,
        date: newPhoto.date,
        pinned: newPhoto.pinned,
        id: `gal-${Date.now()}-${idx}`
      });
    });

    alert(`Successfully added ${allImgs.length} photo(s) to Gallery & Campus Expo!`);
    setNewPhoto({
      title: '',
      category: 'Lab Sessions',
      image: '',
      images: [],
      date: 'October 2026',
      pinned: false
    });
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    if (updatePortalSettings) {
      updatePortalSettings(settingsFormData);
    }
    setSettingsSavedAlert(true);
    setTimeout(() => setSettingsSavedAlert(false), 3000);
  };

  const handleReplyMessage = (msgId) => {
    const reply = messageReplyText[msgId];
    if (!reply || !reply.trim()) return;
    if (replyContactMessage) {
      replyContactMessage(msgId, reply.trim());
    }
    setMessageReplyText(prev => ({ ...prev, [msgId]: '' }));
    alert("Official reply recorded and dispatched to applicant!");
  };


  // Nav Items matching Student Dashboard structure
  const navItems = [
    { id: 'overview', label: 'Admin Overview', icon: LayoutDashboard, color: 'text-purple-600' },
    { id: 'cms', label: 'Website CMS & Sections', icon: Sliders, color: 'text-rose-600' },
    { id: 'access', label: 'Admin Access & Delegates', icon: ShieldCheck, color: 'text-amber-500' },
    { id: 'complaints', label: 'Student Complaints', icon: MessageSquare, color: 'text-rose-600' },
    { id: 'events', label: 'Manage Events', icon: Calendar, color: 'text-amber-600' },
    { id: 'students', label: 'Student Applicants', icon: Users, color: 'text-blue-600' },
    { id: 'certificates', label: 'Issue Certificates', icon: Award, color: 'text-emerald-600' },
    { id: 'results', label: 'Declare Results', icon: Trophy, color: 'text-yellow-600' },
    { id: 'milestones', label: 'Timeline Milestones', icon: Milestone, color: 'text-indigo-600' },
    { id: 'gallery', label: 'Gallery & Expo', icon: Image, color: 'text-pink-600' },
    { id: 'messages', label: 'Contact Inquiries', icon: Mail, color: 'text-teal-600' },
    { id: 'settings', label: 'Portal Settings', icon: Settings, color: 'text-slate-600' }
  ];

  // 4 Top Metric Cards (matching Student Dashboard SVG aesthetic)
  const stats = [
    {
      title: "Active Events",
      subtitle: "Published hackathons & workshops",
      value: String(events.length),
      badge: "Live",
      badgeColor: "bg-[#eafaf1] text-[#00684a]",
      valueColor: "text-[#001e2b]",
      iconBg: "bg-[#001e2b]",
      iconColor: "text-[#00ed64]",
      type: "events"
    },
    {
      title: "Student Applicants",
      subtitle: "Pending & approved registrations",
      value: String(applicants.length),
      badge: "Growing",
      badgeColor: "bg-[#eafaf1] text-[#00684a]",
      valueColor: "text-[#001e2b]",
      iconBg: "bg-[#00684a]",
      iconColor: "text-white",
      growth: "+14%",
      type: "students"
    },
    {
      title: "Issued Certificates",
      subtitle: "Verifiable student credentials",
      value: String(certificates.length),
      badge: "Verifiable",
      badgeColor: "bg-[#fff2e8] text-[#fa6e39]",
      valueColor: "text-[#fa6e39]",
      iconBg: "bg-[#fff2e8]",
      iconColor: "text-[#fa6e39]",
      type: "certificates"
    },
    {
      title: "Contact Messages",
      subtitle: "Campus queries & proposals",
      value: String(contactMessages.length),
      badge: "Inquiries",
      badgeColor: "bg-[#eafaf1] text-[#00684a]",
      valueColor: "text-[#001e2b]",
      iconBg: "bg-[#e3fcef]",
      iconColor: "text-[#00684a]",
      type: "messages"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f9fbfa] text-[#001e2b] flex font-['General_Sans',sans-serif] selection:bg-[#00ed64] selection:text-black">
      
      {/* Mobile Backdrop Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ================= 1. DESKTOP & MOBILE SIDEBAR ================= */}
      <aside 
        className={`fixed inset-y-0 left-0 h-full max-h-[100dvh] bg-white transition-all duration-300 z-50 border-r border-[#e1e5e8] shadow-sm flex flex-col justify-between overflow-hidden md:overflow-visible ${
          sidebarCollapsed ? 'md:w-20' : 'md:w-64'
        } ${
          mobileSidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 md:h-20 px-4 border-b border-[#e1e5e8] flex-shrink-0 relative">
            <div 
              onClick={() => { setActiveTab('home'); window.history.pushState({}, '', '/'); }}
              className={`flex items-center min-w-0 cursor-pointer ${sidebarCollapsed ? 'md:justify-center md:w-full' : ''}`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-[#001e2b] flex items-center justify-center border border-[#e1e5e8] shadow-xs">
                  <Cpu className="w-5 h-5 text-[#00ed64]" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#00ed64] rounded-full ring-2 ring-white" />
              </div>

              {(!sidebarCollapsed || mobileSidebarOpen) && (
                <div className="ml-3 min-w-0">
                  <span className="font-bold text-base text-[#001e2b] block truncate leading-tight">
                    Admin Console
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

          {/* Sidebar Navigation Items */}
          <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = activeAdminTab === item.id;
              const Icon = item.icon;

              return isActive ? (
                <div 
                  key={item.id}
                  className="p-[2px] rounded-full"
                  style={{
                    background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)",
                    boxShadow: "0 0 12px rgba(255, 137, 24, 0.28), 0 0 16px rgba(0, 152, 243, 0.22)"
                  }}
                >
                  <button
                    onClick={() => { setActiveAdminTab(item.id); setMobileSidebarOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#001e2b] text-white font-semibold transition-all relative text-left cursor-pointer"
                  >
                    <Icon className="w-5 h-5 flex-shrink-0 text-[#00ed64]" />
                    {(!sidebarCollapsed || mobileSidebarOpen) && (
                      <span className="text-[13px] font-semibold text-white truncate">{item.label}</span>
                    )}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-5 bg-[#00ed64] rounded-r-full" />
                  </button>
                </div>
              ) : (
                <button
                  key={item.id}
                  onClick={() => { setActiveAdminTab(item.id); setMobileSidebarOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-[#3d4f5b] font-medium hover:bg-[#f4f7f6] hover:text-[#001e2b] transition-all text-left group cursor-pointer"
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${item.color} group-hover:scale-105 transition-transform`} />
                  {(!sidebarCollapsed || mobileSidebarOpen) && (
                    <span className="text-[13px] truncate">{item.label}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Bottom Profile Pill matching Screenshot */}
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
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              {(!sidebarCollapsed || mobileSidebarOpen) && (
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-xs text-white block truncate leading-tight">
                    Super Administrator
                  </span>
                  <p className="text-[11px] text-[#00ed64] font-medium truncate mt-0.5">
                    Dr. Arvind Kumar
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => { setActiveTab('auth'); window.history.pushState({}, '', '/login'); }}
            className="w-full mt-2 flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-500" />
            {(!sidebarCollapsed || mobileSidebarOpen) && (
              <span>Logout Admin</span>
            )}
          </button>
        </div>

      </aside>

      {/* ================= 2. MAIN ADMIN CONTENT WORKSPACE ================= */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
      }`}>
        
        {/* Top Navbar Header */}
        <header className="h-16 md:h-20 bg-white border-b border-[#e1e5e8] px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-[#5c6c7a] hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:block">
              <span className="text-xs text-[#5c6c7a] font-medium">Administration / </span>
              <span className="text-xs font-bold text-[#001e2b] capitalize">
                {navItems.find(t => t.id === activeAdminTab)?.label || 'Console'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <button 
              onClick={() => { setActiveTab('home'); window.history.pushState({}, '', '/'); }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#f4f7f6] text-[#001e2b] border border-[#e1e5e8] hover:bg-white transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </button>

            <div className="text-right">
              <p className="font-bold text-[#001e2b] text-sm leading-tight">
                Dr. Arvind Kumar
              </p>
              <div className="flex items-center gap-1.5 justify-end mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#00ed64] animate-pulse" />
                <span className="text-xs font-semibold text-[#00ed64]">
                  Super Admin
                </span>
              </div>
            </div>

            <div className="w-10 h-10 rounded-full ring-2 ring-[#00ed64] p-0.5 bg-[#001e2b] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              AK
            </div>
          </div>
        </header>

        {/* Workspace Body */}
        <main className="p-4 sm:p-7 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          
          {/* ================= FUNCTION-SPECIFIC RICH TOP BANNERS ================= */}
          {(() => {
            switch (activeAdminTab) {
              case 'overview':
                return (
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 bg-white p-6 sm:p-8 rounded-[24px] border border-[#e1e5e8] shadow-xs relative overflow-hidden">
                    <div className="max-w-2xl space-y-3 z-10">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8faf0] border border-[#00ed64]/30 text-[#00684a] text-xs font-bold font-mono">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Super Administrator Console • GEC Khagaria</span>
                      </div>
                      <h1 className="text-2xl sm:text-4xl font-black text-[#001e2b] tracking-tight leading-tight">
                        Welcome back, <span className="text-[#00684a]">Dr. Arvind Kumar</span> 👋
                      </h1>
                      <p className="text-xs sm:text-sm text-[#5c6c7a] leading-relaxed max-w-xl">
                        Principal & Patron. Overseeing collegiate technical sprints, IoT embedded laboratories, verified student credentials, and SIH hardware hackathon preparation.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-shrink-0 z-10">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${isJoinFormOpen ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                          Join Form: {isJoinFormOpen ? 'OPEN' : 'PAUSED'}
                        </span>
                        <button
                          onClick={() => setIsJoinFormOpen(!isJoinFormOpen)}
                          className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#001e2b] text-white hover:bg-[#0a3548] transition-colors cursor-pointer"
                        >
                          Toggle
                        </button>
                      </div>

                      <button
                        onClick={() => { setActiveTab('home'); window.history.pushState({}, '', '/'); }}
                        className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#00ed64] text-[#001e2b] hover:opacity-90 transition-opacity flex items-center gap-1 cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Site</span>
                      </button>
                    </div>
                  </div>
                );

              case 'events':
                return (
                  <div className="bg-white border border-[#e1e5e8] rounded-[24px] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative shadow-xs overflow-hidden">
                    <div className="max-w-2xl space-y-2 z-10">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Event Organizing & Hackathon Console</span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001e2b] tracking-tight">
                        Manage Events & <span className="text-[#00684a]">Hardware Sprints</span>
                      </h1>
                      <p className="text-xs sm:text-sm text-[#5c6c7a] leading-relaxed max-w-xl">
                        Schedule upcoming technical sprints, configure hardware kit allotments, specify eligibility rules, and manage live student enrollments.
                      </p>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0 z-10">
                      <div className="rounded-[20px] bg-white border border-[#e1e5e8] p-4 min-w-[130px] text-center shadow-xs flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl bg-[#eafaf1] text-[#00684a] flex items-center justify-center mb-1">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-[#001e2b]">{events.length}</span>
                        <span className="text-[10px] font-bold text-[#5c6c7a] uppercase tracking-wider font-mono">ACTIVE SESSIONS</span>
                      </div>

                      <div className="rounded-[20px] bg-white border border-[#e1e5e8] p-4 min-w-[130px] text-center shadow-xs flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl bg-[#fff2e8] text-[#fa6e39] flex items-center justify-center mb-1">
                          <Trophy className="w-5 h-5" />
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-[#001e2b]">2</span>
                        <span className="text-[10px] font-bold text-[#5c6c7a] uppercase tracking-wider font-mono">COMPLETED</span>
                      </div>
                    </div>
                  </div>
                );

              case 'cms':
                return (
                  <div className="bg-white border border-[#e1e5e8] rounded-[24px] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative shadow-xs overflow-hidden">
                    <div className="max-w-2xl space-y-2 z-10">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold font-mono">
                        <Sliders className="w-3.5 h-3.5" />
                        <span>Live CMS & Section Customizer</span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001e2b] tracking-tight">
                        Website CMS & <span className="text-[#00684a]">Dynamic Sections</span>
                      </h1>
                      <p className="text-xs sm:text-sm text-[#5c6c7a] leading-relaxed max-w-xl">
                        Live control over homepage headlines, section visibility toggles, and collegiate announcements directly reflected on the public portal.
                      </p>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0 z-10">
                      <div className="rounded-[20px] bg-white border border-[#e1e5e8] p-4 min-w-[130px] text-center shadow-xs flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl bg-[#eafaf1] text-[#00684a] flex items-center justify-center mb-1">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-[#001e2b]">8/8</span>
                        <span className="text-[10px] font-bold text-[#5c6c7a] uppercase tracking-wider font-mono">ACTIVE SECTIONS</span>
                      </div>

                      <div className="rounded-[20px] bg-white border border-[#e1e5e8] p-4 min-w-[130px] text-center shadow-xs flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl bg-[#fff2e8] text-[#fa6e39] flex items-center justify-center mb-1">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-[#001e2b]">{cmsContent?.customSections?.length || 1}</span>
                        <span className="text-[10px] font-bold text-[#5c6c7a] uppercase tracking-wider font-mono">CUSTOM BANNERS</span>
                      </div>
                    </div>
                  </div>
                );

              case 'access':
                return (
                  <div className="bg-white border border-[#e1e5e8] rounded-[24px] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative shadow-xs overflow-hidden">
                    <div className="max-w-2xl space-y-2 z-10">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold font-mono">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Security Matrix & Governance</span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001e2b] tracking-tight">
                        Admin Access & <span className="text-[#00684a]">Faculty Delegates</span>
                      </h1>
                      <p className="text-xs sm:text-sm text-[#5c6c7a] leading-relaxed max-w-xl">
                        Assign administrative privileges to verified department coordinators, HODs, and student leads. Master Super Admin authority cannot be revoked.
                      </p>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0 z-10">
                      <div className="rounded-[20px] bg-white border border-[#e1e5e8] p-4 min-w-[130px] text-center shadow-xs flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl bg-[#eafaf1] text-[#00684a] flex items-center justify-center mb-1">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-[#001e2b]">{authorizedAdmins?.length || 2}</span>
                        <span className="text-[10px] font-bold text-[#5c6c7a] uppercase tracking-wider font-mono">TOTAL ADMINS</span>
                      </div>
                    </div>
                  </div>
                );

              case 'complaints':
                return (
                  <div className="bg-white border border-[#e1e5e8] rounded-[24px] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative shadow-xs overflow-hidden">
                    <div className="max-w-2xl space-y-2 z-10">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold font-mono">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Student Support & Grievance Desk</span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001e2b] tracking-tight">
                        Student Complaints & <span className="text-[#00684a]">Issue Triage</span>
                      </h1>
                      <p className="text-xs sm:text-sm text-[#5c6c7a] leading-relaxed max-w-xl">
                        Review grievances regarding hardware kits, event registrations, and lab facilities. Post official administrative replies and update resolution status.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0 z-10 flex-wrap">
                      <div className="rounded-[18px] bg-white border border-[#e1e5e8] p-3.5 min-w-[95px] text-center shadow-xs flex flex-col items-center">
                        <span className="text-xl sm:text-2xl font-black text-[#001e2b]">{complaints.length}</span>
                        <span className="text-[9px] font-bold text-[#5c6c7a] uppercase tracking-wider font-mono">TOTAL</span>
                      </div>
                      <div className="rounded-[18px] bg-white border border-[#e1e5e8] p-3.5 min-w-[95px] text-center shadow-xs flex flex-col items-center">
                        <span className="text-xl sm:text-2xl font-black text-[#fa6e39]">{complaints.filter(c => c.status === 'open').length}</span>
                        <span className="text-[9px] font-bold text-[#5c6c7a] uppercase tracking-wider font-mono">OPEN</span>
                      </div>
                      <div className="rounded-[18px] bg-white border border-[#e1e5e8] p-3.5 min-w-[95px] text-center shadow-xs flex flex-col items-center">
                        <span className="text-xl sm:text-2xl font-black text-[#0098f3]">{complaints.filter(c => c.status === 'in-progress').length}</span>
                        <span className="text-[9px] font-bold text-[#5c6c7a] uppercase tracking-wider font-mono">PROGRESS</span>
                      </div>
                      <div className="rounded-[18px] bg-white border border-[#e1e5e8] p-3.5 min-w-[95px] text-center shadow-xs flex flex-col items-center">
                        <span className="text-xl sm:text-2xl font-black text-[#00684a]">{complaints.filter(c => c.status === 'resolved').length}</span>
                        <span className="text-[9px] font-bold text-[#5c6c7a] uppercase tracking-wider font-mono">RESOLVED</span>
                      </div>
                    </div>
                  </div>
                );

              case 'students':
                return (
                  <div className="bg-white border border-[#e1e5e8] rounded-[24px] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative shadow-xs overflow-hidden">
                    <div className="max-w-2xl space-y-2 z-10">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold font-mono">
                        <Users className="w-3.5 h-3.5" />
                        <span>Student Roster & Verification</span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001e2b] tracking-tight">
                        Membership Applicants & <span className="text-[#00684a]">Enrolled Students</span>
                      </h1>
                      <p className="text-xs sm:text-sm text-[#5c6c7a] leading-relaxed max-w-xl">
                        Review technical domain choices, verify registration numbers, and grant official laboratory admission to prospective club candidates.
                      </p>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0 z-10">
                      <div className="rounded-[20px] bg-white border border-[#e1e5e8] p-4 min-w-[130px] text-center shadow-xs flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl bg-[#eaf4ff] text-[#0098f3] flex items-center justify-center mb-1">
                          <Users className="w-5 h-5" />
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-[#001e2b]">{applicants.length}</span>
                        <span className="text-[10px] font-bold text-[#5c6c7a] uppercase tracking-wider font-mono">APPLICANTS</span>
                      </div>
                      <div className="rounded-[20px] bg-white border border-[#e1e5e8] p-4 min-w-[130px] text-center shadow-xs flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl bg-[#eafaf1] text-[#00684a] flex items-center justify-center mb-1">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-[#00684a]">{applicants.filter(a => a.status === 'Approved').length}</span>
                        <span className="text-[10px] font-bold text-[#5c6c7a] uppercase tracking-wider font-mono">APPROVED</span>
                      </div>
                    </div>
                  </div>
                );

              case 'certificates':
                return (
                  <div className="bg-white border border-[#e1e5e8] rounded-[24px] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative shadow-xs overflow-hidden">
                    <div className="max-w-2xl space-y-2 z-10">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-mono">
                        <Award className="w-3.5 h-3.5" />
                        <span>Certification Registry & Verification Desk</span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001e2b] tracking-tight">
                        Issue Verified <span className="text-[#00684a]">Digital Certificates</span>
                      </h1>
                      <p className="text-xs sm:text-sm text-[#5c6c7a] leading-relaxed max-w-xl">
                        Generate authenticated e-certificates with unique cryptographic verification IDs, digital signatures, and public verification records.
                      </p>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0 z-10">
                      <div className="rounded-[20px] bg-white border border-[#e1e5e8] p-4 min-w-[130px] text-center shadow-xs flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl bg-[#eafaf1] text-[#00684a] flex items-center justify-center mb-1">
                          <Award className="w-5 h-5" />
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-[#001e2b]">{certificates.length}</span>
                        <span className="text-[10px] font-bold text-[#5c6c7a] uppercase tracking-wider font-mono">TOTAL ISSUED</span>
                      </div>
                      <div className="rounded-[20px] bg-white border border-[#e1e5e8] p-4 min-w-[130px] text-center shadow-xs flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl bg-[#fff2e8] text-[#fa6e39] flex items-center justify-center mb-1">
                          <Trophy className="w-5 h-5" />
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-[#fa6e39]">{certificates.filter(c => c.status === 'verified').length || 2}</span>
                        <span className="text-[10px] font-bold text-[#5c6c7a] uppercase tracking-wider font-mono">VERIFIED MERIT</span>
                      </div>
                    </div>
                  </div>
                );

              case 'results':
                return (
                  <div className="bg-white border border-[#e1e5e8] rounded-[24px] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative shadow-xs overflow-hidden">
                    <div className="max-w-2xl space-y-2 z-10">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs font-bold font-mono">
                        <Trophy className="w-3.5 h-3.5 text-yellow-600" />
                        <span>Winner Accolades & Podium Publication</span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001e2b] tracking-tight">
                        Declare Event Results & <span className="text-[#00684a]">Podium Honors</span>
                      </h1>
                      <p className="text-xs sm:text-sm text-[#5c6c7a] leading-relaxed max-w-xl">
                        Publish competition winners, runner-ups, cash prize distributions, and innovation recognitions across college display channels.
                      </p>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0 z-10">
                      <div className="rounded-[20px] bg-white border border-[#e1e5e8] p-4 min-w-[130px] text-center shadow-xs flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl bg-[#fff8e1] text-[#f59e0b] flex items-center justify-center mb-1">
                          <Trophy className="w-5 h-5" />
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-[#001e2b]">{declaredResults.length}</span>
                        <span className="text-[10px] font-bold text-[#5c6c7a] uppercase tracking-wider font-mono">DECLARED RESULTS</span>
                      </div>
                    </div>
                  </div>
                );

              case 'milestones':
                return (
                  <div className="bg-white border border-[#e1e5e8] rounded-[24px] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative shadow-xs overflow-hidden">
                    <div className="max-w-2xl space-y-2 z-10">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold font-mono">
                        <Milestone className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Heritage & SIH Accomplishments</span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001e2b] tracking-tight">
                        Club Journey & <span className="text-[#00684a]">Timeline Milestones</span>
                      </h1>
                      <p className="text-xs sm:text-sm text-[#5c6c7a] leading-relaxed max-w-xl">
                        Maintain the institutional chronicle of national Smart India Hackathon podiums, research patent grants, and laboratory expansions.
                      </p>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0 z-10">
                      <div className="rounded-[20px] bg-white border border-[#e1e5e8] p-4 min-w-[130px] text-center shadow-xs flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl bg-[#eef2ff] text-[#4f46e5] flex items-center justify-center mb-1">
                          <Milestone className="w-5 h-5" />
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-[#001e2b]">{milestones.length}</span>
                        <span className="text-[10px] font-bold text-[#5c6c7a] uppercase tracking-wider font-mono">MILESTONES</span>
                      </div>
                    </div>
                  </div>
                );

              case 'gallery':
                return (
                  <div className="bg-white border border-[#e1e5e8] rounded-[24px] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative shadow-xs overflow-hidden">
                    <div className="max-w-2xl space-y-2 z-10">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pink-50 border border-pink-200 text-pink-800 text-xs font-bold font-mono">
                        <Image className="w-3.5 h-3.5 text-pink-600" />
                        <span>Media Vault & Expo Curation</span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001e2b] tracking-tight">
                        Campus Expo & <span className="text-[#00684a]">Hardware Gallery</span>
                      </h1>
                      <p className="text-xs sm:text-sm text-[#5c6c7a] leading-relaxed max-w-xl">
                        Curate high-resolution imagery of student soldering benches, autonomous drone field trials, and collegiate project exhibitions.
                      </p>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0 z-10">
                      <div className="rounded-[20px] bg-white border border-[#e1e5e8] p-4 min-w-[130px] text-center shadow-xs flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl bg-[#fdf2f8] text-[#db2777] flex items-center justify-center mb-1">
                          <Image className="w-5 h-5" />
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-[#001e2b]">{gallery.length}</span>
                        <span className="text-[10px] font-bold text-[#5c6c7a] uppercase tracking-wider font-mono">MEDIA ASSETS</span>
                      </div>
                    </div>
                  </div>
                );

              case 'messages':
                return (
                  <div className="bg-white border border-[#e1e5e8] rounded-[24px] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative shadow-xs overflow-hidden">
                    <div className="max-w-2xl space-y-2 z-10">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold font-mono">
                        <Mail className="w-3.5 h-3.5 text-teal-600" />
                        <span>Contact Inquiries & Correspondence</span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001e2b] tracking-tight">
                        Campus Inquiries & <span className="text-[#00684a]">Direct Messages</span>
                      </h1>
                      <p className="text-xs sm:text-sm text-[#5c6c7a] leading-relaxed max-w-xl">
                        Review and respond to messages submitted by campus students, external mentors, and hardware equipment suppliers.
                      </p>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0 z-10">
                      <div className="rounded-[20px] bg-white border border-[#e1e5e8] p-4 min-w-[130px] text-center shadow-xs flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl bg-[#f0fdfa] text-[#0d9488] flex items-center justify-center mb-1">
                          <Mail className="w-5 h-5" />
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-[#001e2b]">{contactMessages.length}</span>
                        <span className="text-[10px] font-bold text-[#5c6c7a] uppercase tracking-wider font-mono">MESSAGES</span>
                      </div>
                    </div>
                  </div>
                );

              case 'settings':
                return (
                  <div className="bg-white border border-[#e1e5e8] rounded-[24px] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative shadow-xs overflow-hidden">
                    <div className="max-w-2xl space-y-2 z-10">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold font-mono">
                        <Settings className="w-3.5 h-3.5 text-slate-600" />
                        <span>System Parameters & General Preferences</span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001e2b] tracking-tight">
                        Portal Settings & <span className="text-[#00684a]">System Config</span>
                      </h1>
                      <p className="text-xs sm:text-sm text-[#5c6c7a] leading-relaxed max-w-xl">
                        Configure collegiate operational metadata, hardware allocation quotas, public certificate query gates, and direct registration policies.
                      </p>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0 z-10">
                      <div className="rounded-[20px] bg-white border border-[#e1e5e8] p-4 min-w-[130px] text-center shadow-xs flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl bg-[#f4f7f6] text-[#001e2b] flex items-center justify-center mb-1">
                          <Settings className="w-5 h-5" />
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-[#00684a]">Active</span>
                        <span className="text-[10px] font-bold text-[#5c6c7a] uppercase tracking-wider font-mono">SYSTEM STATUS</span>
                      </div>
                    </div>
                  </div>
                );

              default:
                return (
                  <div className="bg-white border border-[#e1e5e8] rounded-[24px] p-6 sm:p-8 flex items-center justify-between shadow-xs">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001e2b] tracking-tight">
                        {navItems.find(t => t.id === activeAdminTab)?.label || 'Admin Console'}
                      </h1>
                      <p className="text-xs sm:text-sm text-[#5c6c7a] mt-0.5">
                        Centralized real-time administration panel for GEC Khagaria IoT Club.
                      </p>
                    </div>
                  </div>
                );
            }
          })()}

          {/* ================= VIEW: OVERVIEW ================= */}
          {activeAdminTab === 'overview' && (
            <div className="space-y-8">
              
              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {stats.map((card, idx) => (
                  <div 
                    key={idx}
                    className="bg-white rounded-2xl border border-[#e1e5e8] p-5 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between h-36"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#738290] uppercase tracking-wider">{card.title}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${card.badgeColor}`}>
                          {card.badge}
                        </span>
                      </div>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className={`text-3xl sm:text-4xl font-black tracking-tight ${card.valueColor}`}>
                          {card.value}
                        </span>
                        {card.growth && (
                          <span className="text-xs font-bold text-emerald-600 font-mono">{card.growth}</span>
                        )}
                      </div>
                    </div>
                    <p className="text-[11px] text-[#738290] leading-snug">{card.subtitle}</p>
                  </div>
                ))}
              </div>

              {/* Quick Actions & Recent Applicants Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left: Quick Form Controls */}
                <div className="lg:col-span-6 bg-white rounded-2xl border border-[#e1e5e8] p-6 space-y-4">
                  <h3 className="text-base font-bold text-[#001e2b] flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#00ed64]" />
                    <span>Quick Administration Actions</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <button
                      onClick={() => setActiveAdminTab('events')}
                      className="p-3.5 rounded-xl border border-[#e1e5e8] bg-[#f9fbfa] hover:bg-emerald-50 hover:border-emerald-200 text-left transition-all space-y-1"
                    >
                      <p className="font-bold text-[#001e2b]">Add New Event</p>
                      <p className="text-[11px] text-[#738290]">Create hackathon or bootcamp</p>
                    </button>

                    <button
                      onClick={() => setActiveAdminTab('certificates')}
                      className="p-3.5 rounded-xl border border-[#e1e5e8] bg-[#f9fbfa] hover:bg-emerald-50 hover:border-emerald-200 text-left transition-all space-y-1"
                    >
                      <p className="font-bold text-[#001e2b]">Issue Certificate</p>
                      <p className="text-[11px] text-[#738290]">Generate verifiable PDF record</p>
                    </button>

                    <button
                      onClick={() => setActiveAdminTab('results')}
                      className="p-3.5 rounded-xl border border-[#e1e5e8] bg-[#f9fbfa] hover:bg-emerald-50 hover:border-emerald-200 text-left transition-all space-y-1"
                    >
                      <p className="font-bold text-[#001e2b]">Declare Result</p>
                      <p className="text-[11px] text-[#738290]">Post winners for competitions</p>
                    </button>

                    <button
                      onClick={() => setActiveAdminTab('milestones')}
                      className="p-3.5 rounded-xl border border-[#e1e5e8] bg-[#f9fbfa] hover:bg-emerald-50 hover:border-emerald-200 text-left transition-all space-y-1"
                    >
                      <p className="font-bold text-[#001e2b]">Update Journey</p>
                      <p className="text-[11px] text-[#738290]">Add milestone to homepage</p>
                    </button>
                  </div>
                </div>

                {/* Right: Recent Applicants */}
                <div className="lg:col-span-6 bg-white rounded-2xl border border-[#e1e5e8] p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#001e2b] flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>Pending Student Approvals</span>
                    </h3>
                    <button
                      onClick={() => setActiveAdminTab('students')}
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      View All ({applicants.length})
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {applicants.slice(0, 3).map((app) => (
                      <div key={app.id} className="p-3 rounded-xl border border-[#e1e5e8] flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-[#001e2b]">{app.name} ({app.branch} - {app.semester})</p>
                          <p className="text-[11px] text-[#738290] font-mono">Domain: {app.domain}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${app.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ================= VIEW: MANAGE EVENTS ================= */}
          {activeAdminTab === 'events' && (
            <div className="space-y-8">
              
              {/* Event Creation Form */}
              <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 sm:p-8 space-y-6">
                <h3 className="text-lg font-bold text-[#001e2b] flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-[#00ed64]" />
                  <span>Publish New Event / Hackathon</span>
                </h3>

                <form onSubmit={handleCreateEvent} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Event Title *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Bihar IoT & Robotics Make-a-thon 2026"
                      value={newEvent.title}
                      onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b] focus:border-[#00ed64]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Event Type</label>
                    <select 
                      value={newEvent.type}
                      onChange={e => setNewEvent({ ...newEvent, type: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    >
                      <option>Hackathon</option>
                      <option>Bootcamp</option>
                      <option>Workshop</option>
                      <option>Hardware Expo</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Date & Time *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. November 20-21, 2026"
                      value={newEvent.date}
                      onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Prize Pool / Grant</label>
                    <input 
                      type="text" 
                      placeholder="e.g. ₹50,000 Cash Prize"
                      value={newEvent.prizePool}
                      onChange={e => setNewEvent({ ...newEvent, prizePool: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <ImageUploader 
                      value={newEvent.banner}
                      onChange={(img) => setNewEvent({ ...newEvent, banner: img })}
                      label="Event Banner Photo (Upload from System / Paste / URL)"
                      helpText="Choose a banner photo from your computer or paste from clipboard (Ctrl+V)"
                    />
                  </div>

                  <div className="md:col-span-2 pt-2">
                    <button 
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#00ed64] text-[#001e2b] hover:opacity-90 transition-opacity"
                    >
                      Publish Event to Portal
                    </button>
                  </div>
                </form>
              </div>

              {/* Existing Events Listing */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#001e2b]">Active Published Events ({events.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {events.map((ev) => (
                    <div key={ev.id} className="p-4 rounded-xl bg-white border border-[#e1e5e8] flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700">{ev.type}</span>
                        <h4 className="text-sm font-bold text-[#001e2b] mt-1">{ev.title}</h4>
                        <p className="text-xs text-[#738290] font-mono">{ev.date}</p>
                      </div>
                      <button
                        onClick={() => deleteEvent(ev.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================= VIEW: MANAGE STUDENTS ================= */}
          {activeAdminTab === 'students' && (
            <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#001e2b]">Registered Club Applicants ({applicants.length})</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#f9fbfa] text-[#738290] border-b border-[#e1e5e8] font-mono uppercase">
                    <tr>
                      <th className="p-3">Student Name</th>
                      <th className="p-3">Reg No</th>
                      <th className="p-3">Branch & Sem</th>
                      <th className="p-3">Domain</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e1e5e8]">
                    {applicants.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/50">
                        <td className="p-3 font-bold text-[#001e2b]">{app.name}</td>
                        <td className="p-3 font-mono text-[#738290]">{app.regNo}</td>
                        <td className="p-3">{app.branch} ({app.semester})</td>
                        <td className="p-3 font-mono">{app.domain}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${app.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          {app.status !== 'Approved' && (
                            <button
                              onClick={() => updateApplicantStatus(app.id, 'Approved')}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                              Approve
                            </button>
                          )}
                          {app.status === 'Approved' && (
                            <button
                              onClick={() => updateApplicantStatus(app.id, 'Pending')}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-amber-500 text-white hover:bg-amber-600"
                            >
                              Revoke
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= VIEW: ISSUE CERTIFICATES ================= */}
          {activeAdminTab === 'certificates' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 sm:p-8 space-y-6">
                <h3 className="text-lg font-bold text-[#001e2b] flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <span>Issue Verifiable Institutional Certificate</span>
                </h3>

                <form onSubmit={handleIssueCertificate} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Certificate Serial ID *</label>
                    <input 
                      type="text" 
                      required
                      value={newCert.id}
                      onChange={e => setNewCert({ ...newCert, id: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b] font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Student Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Aditya Prakash"
                      value={newCert.studentName}
                      onChange={e => setNewCert({ ...newCert, studentName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Registration Number *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 22105128014"
                      value={newCert.regNo}
                      onChange={e => setNewCert({ ...newCert, regNo: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b] font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Award / Grade Designation</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 1st Place Champion / Certificate of Excellence"
                      value={newCert.grade}
                      onChange={e => setNewCert({ ...newCert, grade: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="md:col-span-2 pt-2">
                    <button 
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#001e2b] text-white hover:bg-[#0a3548] transition-colors"
                    >
                      Authenticate & Issue Certificate
                    </button>
                  </div>
                </form>
              </div>

              {/* List of Issued Certificates */}
              <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 space-y-4">
                <h3 className="text-base font-bold text-[#001e2b]">Recently Issued Certificates ({certificates.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="p-4 rounded-xl border border-[#e1e5e8] bg-[#f9fbfa] space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-emerald-700">{cert.id}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Verified</span>
                      </div>
                      <p className="font-bold text-[#001e2b] text-sm">{cert.studentName} ({cert.regNo})</p>
                      <p className="text-[#738290]">{cert.eventTitle}</p>
                      <p className="text-[#fa6e39] font-mono font-semibold">{cert.grade}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================= VIEW: DECLARE RESULTS ================= */}
          {activeAdminTab === 'results' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 sm:p-8 space-y-6">
                <h3 className="text-lg font-bold text-[#001e2b] flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <span>Declare Event Competition Winners & Runners Up</span>
                </h3>

                <form onSubmit={handleDeclareResult} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Select Event</label>
                    <select 
                      value={newResult.eventTitle}
                      onChange={e => setNewResult({ ...newResult, eventTitle: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    >
                      {events.map((ev) => (
                        <option key={ev.id} value={ev.title}>{ev.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Winning Team Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Team AgroSmart"
                      value={newResult.winnerTeam}
                      onChange={e => setNewResult({ ...newResult, winnerTeam: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Winner Team Leader</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Aditya Prakash"
                      value={newResult.winnerLeader}
                      onChange={e => setNewResult({ ...newResult, winnerLeader: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">1st Runner Up Team</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Team HydroSensors"
                      value={newResult.runnerUpTeam}
                      onChange={e => setNewResult({ ...newResult, runnerUpTeam: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="md:col-span-2 pt-2">
                    <button 
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#00ed64] text-[#001e2b] hover:opacity-90 transition-opacity"
                    >
                      Publish Official Results
                    </button>
                  </div>
                </form>
              </div>

              {/* Declared Results Feed */}
              <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 space-y-4">
                <h3 className="text-base font-bold text-[#001e2b]">Published Competition Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {declaredResults.map((res) => (
                    <div key={res.id} className="p-4 rounded-xl border border-[#e1e5e8] bg-[#f9fbfa] space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-700">{res.eventTitle}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">Winner Declared</span>
                      </div>
                      <p className="font-bold text-[#001e2b]">🏆 1st Place: {res.winnerTeam} ({res.winnerLeader})</p>
                      <p className="text-[#5c6c7a]">🥈 Runner Up: {res.runnerUpTeam} ({res.runnerUpLeader})</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================= VIEW: TIMELINE MILESTONES ================= */}
          {activeAdminTab === 'milestones' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 sm:p-8 space-y-6">
                <h3 className="text-lg font-bold text-[#001e2b] flex items-center gap-2">
                  <Milestone className="w-5 h-5 text-indigo-600" />
                  <span>Add New Milestone to IoT Journey & Milestones</span>
                </h3>

                <form onSubmit={handleAddMilestone} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Milestone Year *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 2026"
                      value={newMilestone.year}
                      onChange={e => setNewMilestone({ ...newMilestone, year: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Milestone Title *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Deployment of Smart River Flood Telemetry"
                      value={newMilestone.title}
                      onChange={e => setNewMilestone({ ...newMilestone, title: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="font-bold text-[#001e2b]">Detailed Description</label>
                    <textarea 
                      rows="3"
                      placeholder="Explain the technical breakthrough and achievements..."
                      value={newMilestone.description}
                      onChange={e => setNewMilestone({ ...newMilestone, description: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <ImageUploader 
                      multiple={true}
                      value={newMilestone.images}
                      onChange={(imgs) => setNewMilestone({ ...newMilestone, images: imgs, image: imgs[0] || '' })}
                      label="Milestone Visuals / Hardware Gallery (Upload Multiple Photos from Device or Paste)"
                      helpText="Select 1, 2, 5, 10 or more photos from your computer, drag & drop, or paste (Ctrl+V). They will be automatically arranged on the public homepage!"
                    />
                  </div>

                  <div className="md:col-span-2 pt-2">
                    <button 
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#00ed64] text-[#001e2b] hover:opacity-90 transition-opacity"
                    >
                      Publish Milestone to Timeline
                    </button>
                  </div>
                </form>
              </div>

              {/* Existing Milestones */}
              <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 space-y-4">
                <h3 className="text-base font-bold text-[#001e2b]">Current Journey Milestones ({milestones.length})</h3>
                <div className="space-y-3">
                  {milestones.map((m) => (
                    <div key={m.id} className="p-4 rounded-xl border border-[#e1e5e8] flex items-center justify-between">
                      <div>
                        <span className="font-bold font-mono text-[#00ed64] bg-[#001e2b] px-2 py-0.5 rounded text-[10px]">{m.year}</span>
                        <h4 className="text-sm font-bold text-[#001e2b] mt-1">{m.title}</h4>
                      </div>
                      <button
                        onClick={() => deleteMilestone(m.id)}
                        className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================= VIEW: WEBSITE CMS & SECTIONS ================= */}
          {activeAdminTab === 'cms' && (
            <div className="space-y-8">
              
              {/* 1. Hero Content Live Editor */}
              <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 sm:p-8 space-y-5">
                <h3 className="text-base font-bold text-[#001e2b] flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-rose-600" />
                  <span>Edit Homepage Hero Section Content</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="font-bold text-[#001e2b]">Hero Main Headline</label>
                    <input 
                      type="text" 
                      value={cmsContent.heroTitle}
                      onChange={e => updateCmsContent({ heroTitle: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="font-bold text-[#001e2b]">Hero Subtitle / Description</label>
                    <textarea 
                      rows="2"
                      value={cmsContent.heroSubtitle}
                      onChange={e => updateCmsContent({ heroSubtitle: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Hero Official Badge Pill</label>
                    <input 
                      type="text" 
                      value={cmsContent.heroBadge}
                      onChange={e => updateCmsContent({ heroBadge: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Rotating Conic Prompt Box Text</label>
                    <input 
                      type="text" 
                      value={cmsContent.heroPrompt}
                      onChange={e => updateCmsContent({ heroPrompt: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Homepage Sections Visibility Toggles */}
              <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 sm:p-8 space-y-4">
                <h3 className="text-base font-bold text-[#001e2b] flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>Homepage Section Visibility Controls</span>
                </h3>
                <p className="text-xs text-[#738290]">
                  Turn sections ON or OFF on the public home page with one click.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                  {Object.entries(cmsContent.sectionsVisibility || {}).map(([secKey, isVisible]) => (
                    <div 
                      key={secKey}
                      onClick={() => toggleSectionVisibility(secKey)}
                      className={`p-3 rounded-xl border cursor-pointer select-none transition-all flex items-center justify-between ${
                        isVisible 
                          ? 'bg-emerald-50/70 border-emerald-300 text-emerald-800' 
                          : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                      }`}
                    >
                      <span className="font-bold uppercase tracking-wider text-[11px] font-mono">{secKey}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isVisible ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'}`}>
                        {isVisible ? 'ON' : 'OFF'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Add New Custom Section Form */}
              <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 sm:p-8 space-y-5">
                <h3 className="text-base font-bold text-[#001e2b] flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-[#00ed64]" />
                  <span>Add New Custom Section to Homepage</span>
                </h3>

                <form onSubmit={handleCreateCustomSection} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Section Title *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. PCB Prototyping & SMD Soldering Station"
                      value={newCustomSec.title}
                      onChange={e => setNewCustomSec({ ...newCustomSec, title: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Badge Label</label>
                    <input 
                      type="text" 
                      placeholder="e.g. HARDWARE ACCELERATOR"
                      value={newCustomSec.badge}
                      onChange={e => setNewCustomSec({ ...newCustomSec, badge: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="font-bold text-[#001e2b]">Detailed Description</label>
                    <textarea 
                      rows="2"
                      placeholder="Explain what this new initiative or facility offers students..."
                      value={newCustomSec.subtitle}
                      onChange={e => setNewCustomSec({ ...newCustomSec, subtitle: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Button Label</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Apply for Lab Bench Access"
                      value={newCustomSec.buttonText}
                      onChange={e => setNewCustomSec({ ...newCustomSec, buttonText: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <ImageUploader 
                      value={newCustomSec.image}
                      onChange={(img) => setNewCustomSec({ ...newCustomSec, image: img })}
                      label="Section Artwork / Background (Upload from Device / Paste / URL)"
                      helpText="Select an image file from your computer or paste from clipboard"
                    />
                  </div>

                  <div className="md:col-span-2 pt-2">
                    <button 
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#001e2b] text-white hover:bg-[#0a3548] transition-colors"
                    >
                      Publish Custom Section to Live Homepage
                    </button>
                  </div>
                </form>
              </div>

              {/* 4. Active Custom Sections List */}
              <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 space-y-4">
                <h3 className="text-base font-bold text-[#001e2b]">Active Custom Sections ({cmsContent.customSections?.length || 0})</h3>
                <div className="space-y-3">
                  {(cmsContent.customSections || []).map((cs) => (
                    <div key={cs.id} className="p-4 rounded-xl border border-[#e1e5e8] bg-[#f9fbfa] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800">{cs.badge}</span>
                        <h4 className="text-sm font-bold text-[#001e2b] mt-1">{cs.title}</h4>
                        <p className="text-xs text-[#738290]">{cs.subtitle}</p>
                      </div>
                      <button
                        onClick={() => deleteCustomSection(cs.id)}
                        className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================= VIEW: ADMIN ACCESS & DELEGATES ================= */}
          {activeAdminTab === 'access' && (
            <div className="space-y-8">
              
              {/* Security Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Strict Single-Authority Access Control</span>
                </div>
                <p className="text-xs text-[#5c6c7a] leading-relaxed">
                  Self-registration for Admin accounts is strictly disabled across the entire portal. Only the <strong>Master Super Admin (Dr. Arvind Kumar)</strong> or authorized delegates explicitly added below can access this management console.
                </p>
              </div>

              {/* Delegate Grant Form */}
              <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 sm:p-8 space-y-5">
                <h3 className="text-base font-bold text-[#001e2b] flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>Grant Admin Access to Authorized Faculty / Student</span>
                </h3>

                <form onSubmit={handleGrantDelegate} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Authorized Email Address *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. sharma.ece@geckhagaria.org"
                      value={newDelegate.email}
                      onChange={e => setNewDelegate({ ...newDelegate, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Prof. Manoj Sharma"
                      value={newDelegate.name}
                      onChange={e => setNewDelegate({ ...newDelegate, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#001e2b]">Assigned Delegation Role</label>
                    <select 
                      value={newDelegate.role}
                      onChange={e => setNewDelegate({ ...newDelegate, role: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b]"
                    >
                      <option>Faculty Coordinator (Delegated Admin)</option>
                      <option>Student Head Lead (Admin Delegate)</option>
                      <option>Department Laboratory Administrator</option>
                    </select>
                  </div>

                  <div className="md:col-span-3 pt-2">
                    <button 
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#00ed64] text-[#001e2b] hover:opacity-90 transition-opacity"
                    >
                      Authorize & Grant Admin Authority
                    </button>
                  </div>
                </form>
              </div>

              {/* Authorized Admins List */}
              <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 space-y-4">
                <h3 className="text-base font-bold text-[#001e2b]">Currently Authorized Administrators ({authorizedAdmins.length})</h3>
                <div className="space-y-3">
                  {authorizedAdmins.map((adm) => (
                    <div key={adm.email} className="p-4 rounded-xl border border-[#e1e5e8] bg-[#f9fbfa] flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#001e2b]">{adm.name}</span>
                          <span className="font-mono text-[#738290]">({adm.email})</span>
                        </div>
                        <p className="text-amber-700 font-semibold">{adm.role}</p>
                      </div>

                      {adm.email !== 'admin@geckhagaria.org' ? (
                        <button
                          onClick={() => revokeAdminAccess(adm.email)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors"
                        >
                          Revoke Access
                        </button>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
                          Master Root Authority
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
          {activeAdminTab === 'complaints' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#001e2b]">Student Complaints & Support Tickets ({complaints.length})</h2>
                <p className="text-xs sm:text-sm text-[#5c6c7a]">Review, investigate, and resolve student hardware issues and grievances</p>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-[#e1e5e8] shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#001e2b] flex items-center justify-center text-[#00ed64]">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#5c6c7a] uppercase tracking-wider block">Total</span>
                    <span className="text-xl font-bold text-[#001e2b]">{complaints.length}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#e1e5e8] shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#fff2e8] flex items-center justify-center text-[#fa6e39]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#5c6c7a] uppercase tracking-wider block">Open</span>
                    <span className="text-xl font-bold text-[#fa6e39]">{complaints.filter(c => c.status === 'open').length}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#e1e5e8] shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#eaf4ff] flex items-center justify-center text-[#0098f3]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#5c6c7a] uppercase tracking-wider block">In Progress</span>
                    <span className="text-xl font-bold text-[#0098f3]">{complaints.filter(c => c.status === 'in-progress').length}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#e1e5e8] shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#eafaf1] flex items-center justify-center text-[#00684a]">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#5c6c7a] uppercase tracking-wider block">Resolved</span>
                    <span className="text-xl font-bold text-[#00684a]">{complaints.filter(c => c.status === 'resolved').length}</span>
                  </div>
                </div>
              </div>

              {/* Complaints List */}
              <div className="space-y-4">
                {complaints.length === 0 ? (
                  <div className="p-12 text-center bg-white rounded-2xl border border-[#e1e5e8] text-[#5c6c7a] text-xs">
                    No active student complaints filed. All systems running smooth!
                  </div>
                ) : (
                  complaints.map((comp) => (
                    <div key={comp.id} className="bg-white rounded-2xl border border-[#e1e5e8] p-5 sm:p-6 space-y-4 shadow-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs font-bold text-[#5c6c7a]">{comp.id}</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              comp.status === 'resolved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              comp.status === 'in-progress' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                              'bg-orange-50 text-orange-700 border border-orange-200'
                            }`}>
                              {comp.status}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700 border border-slate-200">
                              {comp.category}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700">
                              {comp.priority} priority
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-[#001e2b] mt-1.5">{comp.title}</h3>
                          <p className="text-xs text-[#5c6c7a]">Submitted by: <strong>{comp.studentName}</strong> ({comp.studentEmail}) on {comp.date}</p>
                        </div>

                        {/* Status Change Buttons */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            onClick={() => updateComplaintStatus(comp.id, 'open')}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold border cursor-pointer ${
                              comp.status === 'open' ? 'bg-orange-600 text-white border-orange-600' : 'bg-white text-orange-600 border-orange-200 hover:bg-orange-50'
                            }`}
                          >
                            Open
                          </button>
                          <button
                            onClick={() => updateComplaintStatus(comp.id, 'in-progress')}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold border cursor-pointer ${
                              comp.status === 'in-progress' ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-sky-600 border-sky-200 hover:bg-sky-50'
                            }`}
                          >
                            In Progress
                          </button>
                          <button
                            onClick={() => updateComplaintStatus(comp.id, 'resolved')}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold border cursor-pointer ${
                              comp.status === 'resolved' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50'
                            }`}
                          >
                            Resolved
                          </button>
                        </div>
                      </div>

                      <div className="p-3.5 bg-[#f9fbfa] border border-[#e1e5e8] rounded-xl text-xs sm:text-sm text-[#3d4f5b] leading-relaxed">
                        {comp.description}
                      </div>

                      {/* Discussion & Responses */}
                      <div className="pt-2 border-t border-[#e1e5e8] space-y-3">
                        <span className="text-xs font-bold text-[#001e2b] block">Response Thread ({comp.responseMessages?.length || 0})</span>
                        {comp.responseMessages && comp.responseMessages.length > 0 && (
                          <div className="space-y-2">
                            {comp.responseMessages.map((msg, i) => (
                              <div key={i} className="p-2.5 rounded-xl bg-[#f4f7f6] border border-[#e1e5e8] text-xs">
                                <div className="flex justify-between font-bold text-[#001e2b]">
                                  <span>{msg.responder === 'admin' ? '🛡️ Administrator' : msg.responder}</span>
                                  <span className="text-[10px] text-[#5c6c7a] font-normal">{msg.date}</span>
                                </div>
                                <p className="text-[#3d4f5b] mt-0.5">{msg.message}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Admin reply box */}
                        <div className="flex gap-2">
                          <input 
                            type="text"
                            value={adminReplyText[comp.id] || ''}
                            onChange={(e) => setAdminReplyText({ ...adminReplyText, [comp.id]: e.target.value })}
                            placeholder="Type official admin reply to student..."
                            className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#e1e5e8] bg-white text-[#001e2b] focus:outline-none focus:border-[#00ed64]"
                          />
                          <button
                            onClick={() => {
                              const t = adminReplyText[comp.id];
                              if (!t || !t.trim()) return;
                              addComplaintResponse(comp.id, t.trim(), 'admin');
                              setAdminReplyText(prev => ({ ...prev, [comp.id]: '' }));
                            }}
                            className="px-4 py-2 bg-[#001e2b] text-[#00ed64] rounded-xl text-xs font-bold hover:bg-[#002b3d] cursor-pointer"
                          >
                            Send Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ================= VIEW: GALLERY & EXPO ================= */}
          {activeAdminTab === 'gallery' && (
            <div className="space-y-8">
              {/* Media Upload Form */}
              <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 sm:p-8 space-y-6">
                <h3 className="text-lg font-bold text-[#001e2b] flex items-center gap-2">
                  <Image className="w-5 h-5 text-pink-600" />
                  <span>Curate & Add Campus Photo / Media</span>
                </h3>

                <form onSubmit={handleAddPhoto} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#001e2b] font-semibold mb-1">Image / Event Title *</label>
                      <input
                        type="text"
                        placeholder="e.g. Smart India Hackathon Finalist Presentation"
                        value={newPhoto.title}
                        onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e1e5e8] focus:border-[#00684a] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#001e2b] font-semibold mb-1">Category *</label>
                      <select
                        value={newPhoto.category}
                        onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e1e5e8] focus:border-[#00684a] outline-none"
                      >
                        <option value="Lab Sessions">Lab Sessions</option>
                        <option value="Hackathons">Hackathons</option>
                        <option value="Projects">Projects</option>
                        <option value="Competitions">Competitions</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <ImageUploader 
                        multiple={true}
                        value={newPhoto.images}
                        onChange={(imgs) => setNewPhoto({ ...newPhoto, images: imgs, image: imgs[0] || '' })}
                        label="Media Photos (Upload Multiple from System / Drag-and-Drop / Paste)"
                        helpText="Select single or multiple photos from your computer or paste from clipboard (Ctrl+V)"
                      />
                    </div>

                    <div>
                      <label className="block text-[#001e2b] font-semibold mb-1">Date / Month</label>
                      <input
                        type="text"
                        placeholder="e.g. October 2026"
                        value={newPhoto.date}
                        onChange={(e) => setNewPhoto({ ...newPhoto, date: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e1e5e8] focus:border-[#00684a] outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-6">
                      <input
                        type="checkbox"
                        id="pinPhoto"
                        checked={newPhoto.pinned}
                        onChange={(e) => setNewPhoto({ ...newPhoto, pinned: e.target.checked })}
                        className="w-4 h-4 text-[#00684a] rounded cursor-pointer"
                      />
                      <label htmlFor="pinPhoto" className="text-xs font-semibold text-[#001e2b] cursor-pointer">
                        Pin to Top of Public Gallery
                      </label>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#00ed64] text-[#001e2b] hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Public Gallery</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Gallery Media Grid */}
              <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#001e2b]">Curated Gallery Media Assets ({gallery.length})</h3>
                  <span className="text-xs font-mono text-[#738290]">Live in Public Gallery Page</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {gallery.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-[#e1e5e8] overflow-hidden bg-[#f9fbfa] flex flex-col justify-between group hover:shadow-md transition-shadow">
                      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-black/75 text-white backdrop-blur-xs">
                            {item.category}
                          </span>
                          {item.pinned && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-amber-500 text-black flex items-center gap-1">
                              <Star className="w-2.5 h-2.5 fill-current" />
                              PINNED
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <h4 className="text-sm font-bold text-[#001e2b] line-clamp-1">{item.title}</h4>
                        <div className="flex items-center justify-between text-xs text-[#738290]">
                          <span>{item.date || 'Recent'}</span>
                          <div className="flex items-center gap-2">
                            {togglePinGalleryImage && (
                              <button
                                onClick={() => togglePinGalleryImage(item.id)}
                                className="p-1.5 rounded-lg border border-[#e1e5e8] hover:bg-amber-50 hover:text-amber-600 transition-colors cursor-pointer"
                                title={item.pinned ? "Unpin image" : "Pin image to top"}
                              >
                                <Star className={`w-3.5 h-3.5 ${item.pinned ? 'fill-amber-500 text-amber-500' : ''}`} />
                              </button>
                            )}
                            {deleteGalleryImage && (
                              <button
                                onClick={() => {
                                  if (confirm(`Remove "${item.title}" from gallery?`)) {
                                    deleteGalleryImage(item.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                title="Delete media asset"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW: CONTACT MESSAGES ================= */}
          {activeAdminTab === 'messages' && (
            <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#001e2b]">Campus & Student Inquiries ({contactMessages.length})</h3>
                  <p className="text-xs text-[#5c6c7a] mt-0.5">Direct messages submitted through the public website contact portal.</p>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#f0fdfa] text-[#0d9488] border border-[#0d9488]/20">
                  {contactMessages.filter(m => m.status === 'Responded').length} Responded
                </span>
              </div>

              {contactMessages.length === 0 ? (
                <div className="p-12 text-center text-[#738290] text-xs">
                  No inquiries received yet. Messages submitted via the contact form will appear here.
                </div>
              ) : (
                <div className="space-y-4">
                  {contactMessages.map((msg) => (
                    <div key={msg.id} className="p-5 rounded-2xl border border-[#e1e5e8] bg-[#f9fbfa] space-y-4 text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e1e5e8] pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#001e2b] text-white flex items-center justify-center font-bold text-xs">
                            {msg.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <span className="font-bold text-[#001e2b] text-sm block">{msg.name}</span>
                            <span className="text-[11px] text-[#738290] font-mono">{msg.email}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${msg.status === 'Responded' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                            {msg.status || 'Unread'}
                          </span>
                          <span className="text-[11px] font-mono text-[#738290]">{msg.date}</span>
                          {deleteContactMessage && (
                            <button
                              onClick={() => {
                                if (confirm("Delete this inquiry?")) {
                                  deleteContactMessage(msg.id);
                                }
                              }}
                              className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 ml-2 cursor-pointer"
                              title="Delete message"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="font-bold text-[#001e2b] mb-1">Subject: {msg.subject}</p>
                        <p className="text-[#5c6c7a] leading-relaxed bg-white p-3 rounded-xl border border-[#e1e5e8]">
                          {msg.message}
                        </p>
                      </div>

                      {msg.reply && (
                        <div className="p-3.5 rounded-xl bg-[#eafaf1] border border-[#00ed64]/30 space-y-1">
                          <span className="text-[11px] font-bold text-[#00684a] flex items-center gap-1.5 font-mono">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Official Administrative Response Dispatched:
                          </span>
                          <p className="text-[#001e2b] font-medium text-xs leading-relaxed">{msg.reply}</p>
                        </div>
                      )}

                      {!msg.reply && (
                        <div className="pt-2 flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            placeholder="Type official response to student / sender..."
                            value={messageReplyText[msg.id] || ''}
                            onChange={(e) => setMessageReplyText({ ...messageReplyText, [msg.id]: e.target.value })}
                            className="flex-1 px-3.5 py-2 rounded-xl border border-[#e1e5e8] bg-white focus:border-[#00684a] outline-none text-xs"
                          />
                          <button
                            onClick={() => handleReplyMessage(msg.id)}
                            className="px-4 py-2 rounded-xl bg-[#001e2b] text-white font-semibold hover:bg-[#00684a] transition-colors flex items-center justify-center gap-1.5 text-xs whitespace-nowrap cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5 text-[#00ed64]" />
                            <span>Reply Officially</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= VIEW: PORTAL SETTINGS ================= */}
          {activeAdminTab === 'settings' && (
            <div className="space-y-8">
              {settingsSavedAlert && (
                <div className="p-4 rounded-2xl bg-[#eafaf1] border border-[#00ed64]/40 flex items-center gap-3 text-xs font-bold text-[#00684a] shadow-xs">
                  <CheckCircle className="w-4 h-4 text-[#00ed64]" />
                  <span>System configuration and portal parameters updated successfully! Changes are persisted across the entire club platform.</span>
                </div>
              )}

              <div className="bg-white rounded-2xl border border-[#e1e5e8] p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-[#e1e5e8] pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#001e2b] flex items-center gap-2">
                      <Settings className="w-5 h-5 text-slate-700" />
                      <span>General System & Portal Parameters</span>
                    </h3>
                    <p className="text-xs text-[#5c6c7a] mt-0.5">Control institutional labels, authority signatures, and portal security gates.</p>
                  </div>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[#001e2b] font-semibold mb-1">Club / Organization Name</label>
                      <input
                        type="text"
                        value={settingsFormData.portalName}
                        onChange={(e) => setSettingsFormData({ ...settingsFormData, portalName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e1e5e8] focus:border-[#00684a] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#001e2b] font-semibold mb-1">Academic Session</label>
                      <input
                        type="text"
                        value={settingsFormData.academicSession}
                        onChange={(e) => setSettingsFormData({ ...settingsFormData, academicSession: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e1e5e8] focus:border-[#00684a] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#001e2b] font-semibold mb-1">Primary Patron / Principal Authority</label>
                      <input
                        type="text"
                        value={settingsFormData.principalAuthority}
                        onChange={(e) => setSettingsFormData({ ...settingsFormData, principalAuthority: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e1e5e8] focus:border-[#00684a] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#001e2b] font-semibold mb-1">Faculty Coordinator Authority</label>
                      <input
                        type="text"
                        value={settingsFormData.coordinatorAuthority}
                        onChange={(e) => setSettingsFormData({ ...settingsFormData, coordinatorAuthority: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e1e5e8] focus:border-[#00684a] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#001e2b] font-semibold mb-1">Primary Official Contact Email</label>
                      <input
                        type="email"
                        value={settingsFormData.primaryContactEmail}
                        onChange={(e) => setSettingsFormData({ ...settingsFormData, primaryContactEmail: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e1e5e8] focus:border-[#00684a] outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[#001e2b] font-semibold mb-1">Hardware Lab Operating Hours</label>
                      <input
                        type="text"
                        value={settingsFormData.hardwareLabHours}
                        onChange={(e) => setSettingsFormData({ ...settingsFormData, hardwareLabHours: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e1e5e8] focus:border-[#00684a] outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <ImageUploader 
                        value={settingsFormData.logoUrl}
                        onChange={(img) => setSettingsFormData({ ...settingsFormData, logoUrl: img })}
                        label="Official Club Emblem / Logo (Upload from System / Paste / URL)"
                        helpText="Upload collegiate club emblem from your computer or paste from clipboard"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[#001e2b] font-semibold mb-1">Collegiate Campus Address</label>
                      <input
                        type="text"
                        value={settingsFormData.campusAddress}
                        onChange={(e) => setSettingsFormData({ ...settingsFormData, campusAddress: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e1e5e8] focus:border-[#00684a] outline-none"
                      />
                    </div>
                  </div>

                  <div className="border-t border-[#e1e5e8] pt-4 space-y-3">
                    <h4 className="font-bold text-[#001e2b] text-sm">Security & Access Policies</h4>
                    
                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#e1e5e8] bg-[#f9fbfa]">
                      <div>
                        <p className="font-bold text-[#001e2b]">Direct Student Join Applications</p>
                        <p className="text-[11px] text-[#5c6c7a]">Allow students to register for club membership via the public portal</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settingsFormData.allowDirectJoinApplications}
                        onChange={(e) => setSettingsFormData({ ...settingsFormData, allowDirectJoinApplications: e.target.checked })}
                        className="w-4 h-4 text-[#00684a] rounded cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#e1e5e8] bg-[#f9fbfa]">
                      <div>
                        <p className="font-bold text-[#001e2b]">Public Certificate Verification Lookup</p>
                        <p className="text-[11px] text-[#5c6c7a]">Allow external recruiters & companies to verify student certificates by ID</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settingsFormData.allowPublicCertLookup}
                        onChange={(e) => setSettingsFormData({ ...settingsFormData, allowPublicCertLookup: e.target.checked })}
                        className="w-4 h-4 text-[#00684a] rounded cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#00ed64] text-[#001e2b] hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Save System Configuration</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};

export default AdminDashboard;
