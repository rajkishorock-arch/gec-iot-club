import React, { useState } from 'react';
import { GECNavbar } from './components/GECNavbar';
import { GECTicker } from './components/GECTicker';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutCollegePage from './pages/AboutCollegePage';
import EventsPage from './pages/EventsPage';
import TeamPage from './pages/TeamPage';
import CertificatesPage from './pages/CertificatesPage';
import ProjectsDocsPage from './pages/ProjectsDocsPage';
import GalleryPage from './pages/GalleryPage';
import JoinClubPage from './pages/JoinClubPage';
import ComplaintPage from './pages/ComplaintPage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import CreateFacultyProfilePage from './pages/CreateFacultyProfilePage';
import CreateStudentProfilePage from './pages/CreateStudentProfilePage';
import AdminAuthGate from './pages/AdminAuthGate';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Portal Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center p-6 text-center font-['General_Sans',sans-serif]">
          <div className="bg-[#0b1329] p-8 rounded-3xl border border-white/10 shadow-2xl max-w-md w-full space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto font-bold text-2xl">
              !
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Portal Interface Recovered</h2>
            <p className="text-xs text-white/60 leading-relaxed">
              {this.state.error?.message || "An unexpected view error was encountered and safely isolated."}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                if (this.props.onReset) this.props.onReset();
              }}
              className="px-6 py-3 rounded-xl text-xs font-bold bg-[#00ed64] text-[#001e2b] hover:opacity-90 transition-opacity w-full"
            >
              Return to Live Homepage
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const getInitialTab = () => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.toLowerCase();
    if (path === '/signup') return 'signup';
    if (path === '/login') return 'auth';
    if (path === '/create-profile-faculty') return 'create-profile-faculty';
    if (path === '/create-profile') return 'create-profile';
    if (path === '/dashboard/logout') return 'auth';
    if (path === '/dashboard/faculty') return 'faculty-dashboard';
    if (path.startsWith('/dashboard/') || path === '/settings') return 'student-dashboard';
    if (path === '/admin/dashboard' || path === '/admin') return 'admin';
    return 'home';
  };

  const [activeTab, setActiveTabState] = useState(getInitialTab);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(true);

  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      let targetPath = '/';
      if (tab === 'signup') targetPath = '/signup';
      else if (tab === 'auth') targetPath = '/login';
      else if (tab === 'create-profile-faculty') targetPath = '/create-profile-faculty';
      else if (tab === 'create-profile') targetPath = '/create-profile';
      else if (tab === 'student-dashboard') targetPath = '/dashboard/student';
      else if (tab === 'faculty-dashboard') targetPath = '/dashboard/faculty';
      else if (tab === 'admin') targetPath = '/admin/dashboard';

      if (window.location.pathname !== targetPath) {
        window.history.pushState({ tab }, '', targetPath);
      }
    }
  };

  React.useEffect(() => {
    const handlePopState = () => {
      setActiveTabState(getInitialTab());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Admin authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('gec_admin_auth') === 'true';
    } catch (e) {
      return false;
    }
  });

  // Authenticated user state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      name: "Rajkishor Kumar",
      firstName: "Rajkishor",
      regNo: "22105128014",
      email: "rajkishor.kumar@geckhagaria.org",
      branch: "Electronics & Communication Engineering",
      semester: "5th Semester",
      role: "student",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RajkishorKumar&eyebrows=default"
    };
  });

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    if (userData.role === 'admin') {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem('gec_admin_auth', 'true');
        sessionStorage.setItem('gec_admin_email', userData.email || 'admin@geckhagaria.org');
      } catch (e) {}
      setActiveTab('admin');
    } else if (userData.role === 'faculty') {
      setActiveTab('faculty-dashboard');
    } else {
      setActiveTab('student-dashboard');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('gec_admin_auth');
      sessionStorage.removeItem('gec_admin_email');
    } catch (e) {}
    setActiveTab('auth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('gec_admin_auth');
      sessionStorage.removeItem('gec_admin_email');
    } catch (e) {}
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. ISOLATED STUDENT DASHBOARD
  if (activeTab === 'student-dashboard') {
    return (
      <ErrorBoundary onReset={() => setActiveTab('home')}>
        <StudentDashboard 
          currentUser={currentUser}
          onLogout={handleLogout}
          setActiveTab={setActiveTab}
        />
      </ErrorBoundary>
    );
  }

  // 2. ISOLATED FACULTY DASHBOARD
  if (activeTab === 'faculty-dashboard') {
    return (
      <ErrorBoundary onReset={() => setActiveTab('home')}>
        <FacultyDashboard 
          currentUser={currentUser}
          onLogout={handleLogout}
          setActiveTab={setActiveTab}
        />
      </ErrorBoundary>
    );
  }

  // 3. ISOLATED ADMIN CONTROL CONSOLE (Guarded by AdminAuthGate Security Verification)
  if (activeTab === 'admin') {
    if (!isAdminAuthenticated) {
      return (
        <ErrorBoundary onReset={() => setActiveTab('home')}>
          <AdminAuthGate 
            onAuthenticated={() => setIsAdminAuthenticated(true)}
            onCancel={() => setActiveTab('home')}
          />
        </ErrorBoundary>
      );
    }

    return (
      <ErrorBoundary onReset={() => setActiveTab('home')}>
        <AdminDashboard 
          setActiveTab={setActiveTab}
          onLogout={handleAdminLogout}
        />
      </ErrorBoundary>
    );
  }

  // 4. ISOLATED 1:1 SIGNUP PAGE (geckhaiml.live/signup)
  if (activeTab === 'signup') {
    return (
      <ErrorBoundary onReset={() => setActiveTab('home')}>
        <AuthPage 
          onLoginSuccess={handleLoginSuccess}
          setActiveTab={setActiveTab}
          initialMode="signup"
        />
      </ErrorBoundary>
    );
  }

  // 5. ISOLATED 1:1 LOGIN PAGE (geckhaiml.live/login)
  if (activeTab === 'auth') {
    return (
      <ErrorBoundary onReset={() => setActiveTab('home')}>
        <AuthPage 
          onLoginSuccess={handleLoginSuccess}
          setActiveTab={setActiveTab}
          initialMode="login"
        />
      </ErrorBoundary>
    );
  }

  // 6. ISOLATED FACULTY PROFILE SETUP PAGE (geckhaiml.live/create-profile-faculty)
  if (activeTab === 'create-profile-faculty') {
    return (
      <ErrorBoundary onReset={() => setActiveTab('home')}>
        <CreateFacultyProfilePage 
          onProfileComplete={handleLoginSuccess}
          setActiveTab={setActiveTab}
          currentUser={currentUser}
        />
      </ErrorBoundary>
    );
  }

  // 7. ISOLATED STUDENT PROFILE SETUP PAGE (geckhaiml.live/create-profile)
  if (activeTab === 'create-profile') {
    return (
      <ErrorBoundary onReset={() => setActiveTab('home')}>
        <CreateStudentProfilePage 
          onProfileComplete={handleLoginSuccess}
          setActiveTab={setActiveTab}
          currentUser={currentUser}
        />
      </ErrorBoundary>
    );
  }

  // PUBLIC WEBSITE (Exact aesthetic & floating navbar from geckhaiml.live)
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-['General_Sans',sans-serif] selection:bg-[#00BFFB] selection:text-black">
      
      {/* 1. Top Running Marquee Ticker */}
      <GECTicker />

      {/* 2. Floating Capsule Navbar */}
      <GECNavbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        currentUser={currentUser}
      />

      {/* 3. Main Content Views */}
      <ErrorBoundary onReset={() => setActiveTab('home')}>
        <main className="flex-1">
          {activeTab === 'home' && (
            <HomePage 
              setActiveTab={setActiveTab} 
              setSelectedEvent={setSelectedEvent}
              currentUser={currentUser}
            />
          )}

          {activeTab === 'about' && (
            <div className="pt-24 sm:pt-32">
              <AboutCollegePage setActiveTab={setActiveTab} />
            </div>
          )}

          {activeTab === 'about-club' && (
            <div className="pt-24 sm:pt-32">
              <AboutCollegePage setActiveTab={setActiveTab} />
            </div>
          )}

          {activeTab === 'events' && (
            <div className="pt-24 sm:pt-32">
              <EventsPage selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
            </div>
          )}

          {activeTab === 'team' && (
            <div className="pt-24 sm:pt-32">
              <TeamPage />
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="pt-24 sm:pt-32">
              <CertificatesPage />
            </div>
          )}

          {activeTab === 'docs' && (
            <div className="pt-24 sm:pt-32">
              <ProjectsDocsPage />
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="pt-24 sm:pt-32">
              <GalleryPage />
            </div>
          )}

          {activeTab === 'join' && (
            <div className="pt-24 sm:pt-32">
              <JoinClubPage isFormOpen={isFormOpen} />
            </div>
          )}

          {activeTab === 'complaint' && (
            <div className="pt-24 sm:pt-32">
              <ComplaintPage />
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="pt-24 sm:pt-32">
              <ComplaintPage />
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="pt-24 sm:pt-32">
              <DashboardPage 
                setActiveTab={setActiveTab} 
                isFormOpen={isFormOpen} 
                setIsFormOpen={setIsFormOpen} 
              />
            </div>
          )}
        </main>
      </ErrorBoundary>

      {/* 4. Public Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}

export default App;
