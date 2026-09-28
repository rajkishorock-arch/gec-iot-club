import React, { useState, useEffect } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useClub } from '../context/ClubContext';

export const AuthPage = ({ onLoginSuccess, setActiveTab, initialMode = 'login' }) => {
  const { authorizedAdmins } = useClub();
  
  // 'login' | 'signup' | 'forgot'
  const [mode, setMode] = useState(initialMode);
  // 'student' | 'faculty' (used for signup)
  const [role, setRole] = useState('student');
  
  // Signup State
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);

  // Login State
  const [loginForm, setLoginForm] = useState({
    identifier: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');

  // UI Feedback
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Keep mode in sync if initialMode prop changes
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // OTP Countdown Timer
  useEffect(() => {
    let timer;
    if (otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [otpTimer]);

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // ================= 1. LOGIN SUBMIT =================
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginForm.identifier || !loginForm.password) {
      showToast('Please fill all fields', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const inputId = loginForm.identifier.trim().toLowerCase();

      // Check for Master Super Admin or Authorized Delegates
      const isMasterAdmin = inputId === 'admin@geckhagaria.org' || inputId === 'admin';
      const isDelegateAdmin = authorizedAdmins && authorizedAdmins.some((a) => a.email.toLowerCase() === inputId);

      if (isMasterAdmin || isDelegateAdmin) {
        const adminUser = {
          name: isMasterAdmin ? 'Dr. Arvind Kumar' : (authorizedAdmins.find(a => a.email.toLowerCase() === inputId)?.name || 'Authorized Admin'),
          email: isMasterAdmin ? 'admin@geckhagaria.org' : inputId,
          role: 'admin',
          regNo: 'GEC-ADMIN-01',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdminArvind&eyebrows=default'
        };
        localStorage.setItem('user', JSON.stringify(adminUser));
        localStorage.setItem('token', `gec_iot_admin_token_${Date.now()}`);
        showToast('Login Successful! Welcome Administrator', 'success');
        setTimeout(() => {
          onLoginSuccess(adminUser);
        }, 600);
        return;
      }

      // Check if faculty
      const isFaculty = inputId.includes('faculty') || inputId.includes('prof') || inputId.includes('sharma');
      const standardUser = {
        name: loginForm.identifier.includes('@') ? loginForm.identifier.split('@')[0] : 'Aditya Prakash',
        regNo: loginForm.identifier.includes('@') ? '22105128014' : loginForm.identifier,
        email: loginForm.identifier.includes('@') ? loginForm.identifier : 'aditya.prakash@geckhagaria.org',
        branch: 'Electronics & Communication Engineering',
        semester: isFaculty ? 'Faculty Member' : '5th Semester',
        role: isFaculty ? 'faculty' : 'student',
        avatar: isFaculty ? 'https://api.dicebear.com/7.x/avataaars/svg?seed=FacultyManoj&eyebrows=default' : 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdityaStudent&eyebrows=default'
      };

      localStorage.setItem('user', JSON.stringify(standardUser));
      localStorage.setItem('token', `gec_iot_user_token_${Date.now()}`);
      showToast('Login Successful', 'success');
      setTimeout(() => {
        onLoginSuccess(standardUser);
      }, 600);
    }, 500);
  };

  // ================= 2. SIGNUP STEP 1: SEND OTP =================
  const handleSendOtp = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!signupForm.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!signupForm.password || signupForm.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsOtpSent(true);
      setOtpTimer(300);
      setCanResend(false);
      showToast(`6-Digit OTP sent successfully to ${signupForm.email}`, 'success');
      setTimeout(() => {
        const el = document.getElementById('otp-0');
        if (el) el.focus();
      }, 100);
    }, 500);
  };

  // ================= 3. SIGNUP STEP 2: VERIFY OTP =================
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      const nextEl = document.getElementById(`otp-${index + 1}`);
      if (nextEl) nextEl.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      const prevEl = document.getElementById(`otp-${index - 1}`);
      if (prevEl) prevEl.focus();
    }
  };

  const handleVerifyOtpAndSignup = (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== 6) {
      showToast('Please enter complete 6-digit OTP', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Registration successful! Redirecting to dashboard...', 'success');

      const newUser = {
        name: signupForm.email.split('@')[0],
        email: signupForm.email,
        regNo: `2210512${Math.floor(1000 + Math.random() * 9000)}`,
        branch: 'Electronics & Communication Engineering',
        semester: role === 'student' ? '5th Semester' : 'Faculty Member',
        role: role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${signupForm.email}&eyebrows=default`
      };

      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', `gec_iot_mock_token_${Date.now()}`);

      setTimeout(() => {
        if (role === 'faculty') {
          setActiveTab('create-profile-faculty');
        } else {
          setActiveTab('create-profile');
        }
      }, 1000);
    }, 600);
  };

  // ================= 4. GOOGLE OAUTH =================
  const handleGoogleAuth = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const googleUser = {
        name: 'GEC Member',
        email: 'member@geckhagaria.org',
        regNo: '22105128099',
        branch: 'Electronics & Communication Engineering',
        semester: role === 'student' ? '5th Semester' : 'Faculty Member',
        role: role,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GoogleUser&eyebrows=default'
      };
      localStorage.setItem('user', JSON.stringify(googleUser));
      showToast('Authenticated with Google!', 'success');
      setTimeout(() => {
        onLoginSuccess(googleUser);
      }, 600);
    }, 700);
  };

  return (
    <div className="min-h-screen w-full bg-white font-['General_Sans',sans-serif] selection:bg-[#00ed64] selection:text-black">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div 
          className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full text-xs font-semibold shadow-2xl transition-all flex items-center gap-2 ${
            toastMessage.type === 'error' 
              ? 'bg-rose-600 text-white' 
              : 'bg-[#001e2b] text-[#00ed64] border border-[#00ed64]/40'
          }`}
        >
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CASE A: LOGIN PAGE (1:1 Exact Recreation of media_1790597128945.png)      */}
      {/* Form on the LEFT (35% width), Showcase Image on the RIGHT (65% width)    */}
      {/* ========================================================================= */}
      {mode === 'login' && (
        <div className="flex flex-col lg:flex-row h-screen w-full">
          
          {/* LEFT: FORM CONTAINER (35% on Desktop) */}
          <div className="w-full lg:w-[35%] xl:w-[30%] bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto min-h-screen lg:min-h-0">
            <div className="w-full max-w-md">
              
              {/* Back to Home Button */}
              <button
                type="button"
                onClick={() => setActiveTab('home')}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 mb-3 sm:mb-4 group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                <span>Back to Home</span>
              </button>

              {/* Title: AIML Club / IoT Club */}
              <div className="mb-4 sm:mb-6 lg:mb-12">
                <h1 className="text-3xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 tracking-tight">
                  IoT Club
                </h1>
              </div>

              {/* Subheading */}
              <div className="mb-4 sm:mb-6 lg:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-1 sm:mb-2">
                  Log in to your account
                </h2>
                <p className="text-sm sm:text-sm lg:text-base text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => { setActiveTab('signup'); setMode('signup'); setIsOtpSent(false); }}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 cursor-pointer"
                  >
                    Sign Up
                  </button>
                </p>
              </div>

              {/* Login with Google Button */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="w-full bg-white border border-gray-300 text-gray-700 py-3 sm:py-2.5 lg:py-3 px-4 sm:px-4 rounded-none hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6 text-sm sm:text-sm lg:text-base cursor-pointer"
              >
                <svg className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Login with Google</span>
              </button>

              {/* Divider: Or email or phone number */}
              <div className="relative mb-3 sm:mb-4 lg:mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="px-2 bg-white text-gray-500">Or email or phone number</span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-3 sm:space-y-4 lg:space-y-6">
                <div>
                  <input
                    type="text"
                    id="identifier"
                    name="identifier"
                    value={loginForm.identifier}
                    onChange={handleLoginInputChange}
                    className="w-full text-gray-700 px-4 sm:px-3.5 lg:px-4 py-3 sm:py-2.5 lg:py-3 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#00ed64]/30 focus:border-[#00ed64] transition-all duration-200 text-sm sm:text-sm lg:text-base"
                    placeholder="Email or phone"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginInputChange}
                    className="w-full text-gray-900 px-4 sm:px-3.5 lg:px-4 py-3 sm:py-2.5 lg:py-3 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#00ed64]/30 focus:border-[#00ed64] transition-all duration-200 pr-10 sm:pr-9 lg:pr-10 text-sm sm:text-sm lg:text-base"
                    placeholder="Password"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 sm:right-2.5 lg:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                    )}
                  </button>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    disabled={loading}
                    className="text-sm sm:text-sm lg:text-base text-blue-600 hover:text-blue-800 transition-colors duration-200 disabled:opacity-50 cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Sign In Button with Ambient Orange Halo Glow */}
                <div className="relative group w-full">
                  <div 
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3/4 h-5 rounded-full bg-[#DA4E24] opacity-50 blur-md pointer-events-none group-hover:opacity-75 transition-opacity duration-300"
                    aria-hidden="true" 
                  />
                  <div 
                    className="relative p-[1.5px] rounded-none h-[48px] sm:h-[50px] flex items-center transition-all duration-200 active:scale-[0.98] w-full"
                    style={{
                      background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)",
                      boxShadow: "0 0 12px rgba(255, 137, 24, 0.2), 0 2px 8px rgba(0,0,0,0.5)"
                    }}
                  >
                    <button
                      type="submit"
                      disabled={loading}
                      className="relative w-full h-full px-4 rounded-none bg-black text-white font-medium tracking-tight overflow-hidden flex items-center justify-center whitespace-nowrap text-sm sm:text-sm lg:text-base disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>Signing In...</span>
                        </div>
                      ) : (
                        'Sign In'
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {/* Master Admin Root Gate Link */}
              <div className="mt-8 pt-4 border-t border-gray-200 text-center">
                <button 
                  type="button"
                  onClick={() => setActiveTab('admin')}
                  className="text-xs text-gray-500 hover:text-amber-600 transition-colors cursor-pointer"
                >
                  Institutional Administrator? <span className="font-semibold underline">Access Master Console →</span>
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT: SHOWCASE IMAGE (65% on Desktop) — Exact Match to media_1790597128945.png */}
          <div className="hidden lg:flex lg:w-[65%] xl:w-[70%] bg-[#001e2b] relative items-center justify-center p-4 sm:p-5 lg:p-6 overflow-hidden select-none">
            
            <div className="absolute inset-0 bg-gradient-to-br from-[#001e2b] via-[#003d4f]/60 to-[#00141e]" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00ed64]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#00684a]/25 rounded-full blur-3xl pointer-events-none" />
            <div 
              className="absolute inset-0 pointer-events-none" 
              style={{ background: 'radial-gradient(circle at center, rgba(0,237,100,0.12) 0%, transparent 70%)' }} 
            />

            {/* Framed Workshop Photo Container */}
            <div className="relative w-full h-full max-h-[94vh] rounded-2xl overflow-hidden border border-[#1c2d38] shadow-[0_25px_60px_rgba(0,14,20,0.9),0_0_40px_rgba(0,237,100,0.12)] flex items-center justify-center bg-[#00141e]/80">
              
              <img 
                src="https://images.pexels.com/photos/9242834/pexels-photo-9242834.jpeg" 
                alt="IoT Hardware Workshop" 
                className="w-full h-full object-cover" 
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#001e2b] via-[#001e2b]/50 to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 text-white z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#00ed64]/15 text-[#00ed64] border border-[#00ed64]/30 backdrop-blur-md mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#00ed64] animate-pulse" />
                  <span>AI/ML CLUB</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2">
                  Welcome to AIML Club
                </h3>

                <p className="text-sm sm:text-base lg:text-lg font-medium text-[#c1ccd6] max-w-lg">
                  Empowering the future with Artificial Intelligence & Machine Learning.
                </p>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* CASE B: SIGNUP PAGE (1:1 Exact Match to geckhaiml.live/signup)            */}
      {/* Image on the LEFT (60% width), Form on the RIGHT (40% width)             */}
      {/* ========================================================================= */}
      {mode === 'signup' && (
        <div className="flex flex-col md:flex-row h-screen w-full">
          
          {/* LEFT: SHOWCASE IMAGE (60% on Desktop) */}
          <div className="hidden md:flex md:w-[60%] bg-[#001e2b] relative items-center justify-center p-4 sm:p-5 lg:p-6 overflow-hidden select-none">
            <div className="absolute inset-0 bg-gradient-to-br from-[#001e2b] via-[#003d4f]/60 to-[#00141e]" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00ed64]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#00684a]/25 rounded-full blur-3xl pointer-events-none" />
            <div 
              className="absolute inset-0 pointer-events-none" 
              style={{ background: 'radial-gradient(circle at center, rgba(0,237,100,0.12) 0%, transparent 70%)' }} 
            />

            <div className="relative w-full h-full max-h-[94vh] rounded-2xl overflow-hidden border border-[#1c2d38] shadow-[0_25px_60px_rgba(0,14,20,0.9),0_0_40px_rgba(0,237,100,0.12)] flex items-center justify-center bg-[#00141e]/80">
              <img 
                src="https://images.pexels.com/photos/8438951/pexels-photo-8438951.jpeg" 
                alt="IoT Hardware & Embedded Systems" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001e2b] via-[#001e2b]/50 to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 text-white z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#00ed64]/15 text-[#00ed64] border border-[#00ed64]/30 backdrop-blur-md mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#00ed64] animate-pulse" />
                  <span>IOT CLUB</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2">
                  Welcome to IoT Club
                </h3>
                <p className="text-sm sm:text-base lg:text-lg font-medium text-[#c1ccd6] max-w-lg">
                  Empowering the future with Connected Hardware, Sensors & Edge Intelligence.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: SIGNUP FORM CONTROLLER (40% on Desktop) */}
          <div className="w-full md:w-[40%] bg-white flex items-center justify-center p-4 md:p-8 overflow-y-auto min-h-screen md:min-h-0">
            <div className="w-full max-w-md py-4 md:py-0">
              
              <button
                type="button"
                onClick={() => setActiveTab('home')}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 mb-3 sm:mb-4 group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                <span>Back to Home</span>
              </button>

              <div className="mb-4 md:mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                  IoT Club
                </h1>
              </div>

              <div className="mb-4 md:mb-6">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-1 md:mb-2">
                  Create an Account
                </h2>
                <p className="text-sm md:text-base text-gray-600">
                  Have an account?{' '}
                  <button
                    onClick={() => { setActiveTab('auth'); setMode('login'); setIsOtpSent(false); setErrors({}); }}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 cursor-pointer"
                  >
                    Log in now
                  </button>
                </p>
              </div>

              {/* Role Toggle Capsule: Student | Faculty */}
              <div 
                style={{ boxShadow: 'inset 0px -1px 0px rgba(0, 0, 0, 0.1)' }}
                className={`flex bg-gray-100 p-1 gap-x-1 mb-4 md:mb-6 rounded-full w-full ${isOtpSent ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {[
                  { type: 'student', tabName: 'Student' },
                  { type: 'faculty', tabName: 'Faculty' }
                ].map((item) => (
                  <button
                    key={item.type}
                    type="button"
                    disabled={isOtpSent}
                    onClick={() => !isOtpSent && setRole(item.type)}
                    className={`${
                      role === item.type 
                        ? 'bg-[#00ed64] text-[#001e2b] font-semibold' 
                        : 'bg-transparent text-gray-600 hover:text-gray-900 font-medium'
                    } flex-1 py-2.5 md:py-3 px-2 md:px-4 rounded-full transition-all duration-200 text-sm md:text-base cursor-pointer`}
                  >
                    {item.tabName}
                  </button>
                ))}
              </div>

              {!isOtpSent && (
                <>
                  {/* Sign up with Google */}
                  <button
                    type="button"
                    onClick={handleGoogleAuth}
                    className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-none hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4 text-sm md:text-base cursor-pointer"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span>Sign up with Google</span>
                  </button>

                  {/* Divider */}
                  <div className="relative mb-3 md:mb-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-xs md:text-sm">
                      <span className="px-2 bg-white text-gray-500">Or with email and password</span>
                    </div>
                  </div>

                  {/* Input Form */}
                  <form onSubmit={handleSendOtp} className="space-y-3 md:space-y-4">
                    <div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={signupForm.email}
                        onChange={handleSignupInputChange}
                        className={`w-full text-gray-700 px-4 py-3 border rounded-none focus:outline-none focus:ring-2 focus:ring-[#00ed64]/30 focus:border-[#00ed64] transition-all text-sm md:text-base ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Email"
                        required
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={signupForm.password}
                        onChange={handleSignupInputChange}
                        className={`w-full text-gray-900 px-4 py-3 border rounded-none focus:outline-none focus:ring-2 focus:ring-[#00ed64]/30 focus:border-[#00ed64] transition-all text-sm md:text-base ${
                          errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Password"
                        required
                      />
                      {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <div>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={signupForm.confirmPassword}
                        onChange={handleSignupInputChange}
                        className={`w-full text-gray-900 px-4 py-3 border rounded-none focus:outline-none focus:ring-2 focus:ring-[#00ed64]/30 focus:border-[#00ed64] transition-all text-sm md:text-base ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Confirm Password"
                        required
                      />
                      {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>

                    {/* Next Button */}
                    <div className="relative group w-full mt-2">
                      <div 
                        className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3/4 h-5 rounded-full bg-[#DA4E24] opacity-50 blur-md pointer-events-none group-hover:opacity-75 transition-opacity duration-300" 
                        aria-hidden="true" 
                      />
                      <div 
                        className="relative p-[1.5px] rounded-none h-[48px] sm:h-[50px] flex items-center transition-all duration-200 active:scale-[0.98] w-full"
                        style={{
                          background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)",
                          boxShadow: "0 0 12px rgba(255, 137, 24, 0.2), 0 2px 8px rgba(0,0,0,0.5)"
                        }}
                      >
                        <button
                          type="submit"
                          disabled={loading}
                          className="relative w-full h-full px-4 rounded-none bg-black text-white font-medium tracking-tight overflow-hidden flex items-center justify-center whitespace-nowrap text-sm md:text-base disabled:opacity-70 cursor-pointer"
                        >
                          {loading ? 'Sending OTP...' : 'Next'}
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              )}

              {/* 6-Digit OTP Screen */}
              {isOtpSent && (
                <div className="space-y-4 md:space-y-6">
                  <form onSubmit={handleVerifyOtpAndSignup} className="space-y-4 md:space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3 md:mb-4">
                        Enter 6-digit OTP sent to <span className="font-semibold text-gray-900">{signupForm.email}</span>
                      </label>
                      <div className="flex items-center justify-center gap-2 md:gap-3">
                        {otp.map((digit, idx) => (
                          <div key={idx} className="flex items-center">
                            <input
                              id={`otp-${idx}`}
                              type="text"
                              maxLength="1"
                              value={digit}
                              onChange={(e) => handleOtpChange(idx, e.target.value)}
                              onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                              className="w-10 h-10 md:w-12 md:h-12 text-center text-black text-lg md:text-xl font-semibold border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#00ed64]/40 focus:border-[#00ed64]"
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-center">
                      {otpTimer > 0 ? (
                        <p className="text-gray-600 text-sm">
                          Resend OTP in {Math.floor(otpTimer / 60)}:{(otpTimer % 60).toString().padStart(2, '0')}
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            if (canResend) {
                              setOtpTimer(300);
                              setCanResend(false);
                              setOtp(['', '', '', '', '', '']);
                              showToast('New 6-digit OTP has been sent to your email.', 'success');
                            }
                          }}
                          disabled={!canResend || loading}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:opacity-50 cursor-pointer"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>

                    <div className="relative group w-full">
                      <div 
                        className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3/4 h-5 rounded-full bg-[#DA4E24] opacity-50 blur-md pointer-events-none group-hover:opacity-75 transition-opacity duration-300" 
                        aria-hidden="true" 
                      />
                      <div 
                        className="relative p-[1.5px] rounded-none h-[48px] sm:h-[50px] flex items-center transition-all duration-200 active:scale-[0.98] w-full"
                        style={{
                          background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)",
                          boxShadow: "0 0 12px rgba(255, 137, 24, 0.2), 0 2px 8px rgba(0,0,0,0.5)"
                        }}
                      >
                        <button
                          type="submit"
                          disabled={loading}
                          className="relative w-full h-full px-4 rounded-none bg-black text-white font-medium tracking-tight overflow-hidden flex items-center justify-center whitespace-nowrap text-sm md:text-base disabled:opacity-70 cursor-pointer"
                        >
                          {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                      </div>
                    </div>
                  </form>

                  <button
                    type="button"
                    onClick={() => {
                      setIsOtpSent(false);
                      setOtpTimer(0);
                      setCanResend(true);
                      setOtp(['', '', '', '', '', '']);
                    }}
                    className="w-full text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm md:text-base cursor-pointer text-center block"
                  >
                    ← Back to email
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* CASE C: FORGOT PASSWORD PAGE                                              */}
      {/* ========================================================================= */}
      {mode === 'forgot' && (
        <div className="flex flex-col lg:flex-row h-screen w-full">
          <div className="w-full lg:w-[35%] xl:w-[30%] bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto min-h-screen lg:min-h-0">
            <div className="w-full max-w-md">
              <button
                type="button"
                onClick={() => setActiveTab('home')}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors mb-3 group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5 transition-transform group-hover:-translate-x-0.5" />
                <span>Back to Home</span>
              </button>

              <div className="mb-4 sm:mb-6 lg:mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">IoT Club</h1>
                <h2 className="text-2xl font-semibold text-gray-900 mt-4 mb-2">Reset Password</h2>
                <p className="text-sm text-gray-600">
                  Enter your registered college email to receive a password reset token.
                </p>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  showToast('Password reset link sent to your email.', 'success');
                  setTimeout(() => setMode('login'), 1200);
                }}
                className="space-y-4"
              >
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Registered college email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full text-gray-700 px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#00ed64]/30 focus:border-[#00ed64] transition-all text-sm md:text-base"
                  />
                </div>

                <div className="relative group w-full">
                  <div 
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3/4 h-5 rounded-full bg-[#DA4E24] opacity-50 blur-md pointer-events-none group-hover:opacity-75 transition-opacity duration-300" 
                    aria-hidden="true" 
                  />
                  <div 
                    className="relative p-[1.5px] rounded-none h-[48px] sm:h-[50px] flex items-center transition-all duration-200 active:scale-[0.98] w-full"
                    style={{
                      background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)",
                      boxShadow: "0 0 12px rgba(255, 137, 24, 0.2), 0 2px 8px rgba(0,0,0,0.5)"
                    }}
                  >
                    <button
                      type="submit"
                      className="relative w-full h-full px-4 rounded-none bg-black text-white font-medium tracking-tight overflow-hidden flex items-center justify-center whitespace-nowrap text-sm md:text-base cursor-pointer"
                    >
                      Send Reset Link
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="w-full text-center text-sm text-blue-600 hover:text-blue-800 transition-colors pt-2 cursor-pointer block"
                >
                  ← Back to Login
                </button>
              </form>
            </div>
          </div>

          <div className="hidden lg:flex lg:w-[65%] xl:w-[70%] bg-[#001e2b] relative items-center justify-center p-4 sm:p-5 lg:p-6 overflow-hidden select-none">
            <div className="relative w-full h-full max-h-[94vh] rounded-2xl overflow-hidden border border-[#1c2d38] shadow-2xl flex items-center justify-center bg-[#00141e]/80">
              <img 
                src="https://images.pexels.com/photos/9242834/pexels-photo-9242834.jpeg" 
                alt="IoT Lab Workshop" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AuthPage;
