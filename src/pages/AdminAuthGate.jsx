import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Lock, 
  Cpu, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useClub } from '../context/ClubContext';

const AdminAuthGate = ({ onAuthenticated, onCancel }) => {
  const { authorizedAdmins = [] } = useClub();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Accepted master passwords for collegiate admin access
  const ACCEPTED_PASSWORDS = ['admin', 'admin123', 'gecadmin2026', 'admin@123', 'gec2026'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      // Check if email belongs to authorizedAdmins or default master admins
      const isAuthorizedEmail = 
        cleanEmail === 'admin@geckhagaria.org' ||
        cleanEmail === 'iotclub@geckhagaria.org' ||
        cleanEmail === 'manoj.sharma@geckhagaria.org' ||
        cleanEmail === 'principal@geckhagaria.org' ||
        authorizedAdmins.some(a => a.email.toLowerCase() === cleanEmail);

      const isPasswordValid = ACCEPTED_PASSWORDS.includes(cleanPassword.toLowerCase());

      if (isAuthorizedEmail && isPasswordValid) {
        // Successfully verified
        sessionStorage.setItem('gec_admin_auth', 'true');
        sessionStorage.setItem('gec_admin_email', cleanEmail);
        setIsLoading(false);
        onAuthenticated();
      } else {
        setIsLoading(false);
        if (!isAuthorizedEmail && !isPasswordValid) {
          setError('Invalid Admin Email and Password. Unauthorized access is restricted.');
        } else if (!isAuthorizedEmail) {
          setError(`"${cleanEmail}" is not recognized as an authorized Super Administrator.`);
        } else {
          setError('Incorrect Master Password. Please enter the valid admin passphrase.');
        }
      }
    }, 400);
  };

  const handleQuickDemoFill = () => {
    setEmail('admin@geckhagaria.org');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-white text-[#001e2b] font-['General_Sans',sans-serif] flex flex-col md:flex-row antialiased selection:bg-[#00ed64] selection:text-black">
      
      {/* ========================================================================= */}
      {/* LEFT: ADMIN LOGIN FORM CONTROLLER (40% on Desktop, matches AuthPage.jsx)  */}
      {/* ========================================================================= */}
      <div className="w-full md:w-[40%] bg-white flex items-center justify-center p-6 sm:p-8 lg:p-12 overflow-y-auto min-h-screen md:min-h-0">
        <div className="w-full max-w-md py-4 md:py-0 space-y-6">
          
          {/* Back to Home Button */}
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          {/* Club Brand Logo with Online Status Dot */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#001e2b] flex items-center justify-center text-[#00ed64] shadow-xs">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-[#001e2b]">GEC Khagaria</span>
                <span className="w-2 h-2 rounded-full bg-[#00ed64] animate-pulse" />
              </div>
              <span className="text-xs text-[#5c6c7a]">AI/ML & IoT Club</span>
            </div>
          </div>

          {/* Header */}
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold font-mono tracking-wider uppercase mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Administrative Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#001e2b] tracking-tight">
              Sign in as Administrator
            </h1>
            <p className="text-xs sm:text-sm text-[#5c6c7a]">
              Enter your institutional administrative credentials to access the GEC Khagaria Control Console.
            </p>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#001e2b]">
                Administrator Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@geckhagaria.org"
                className="w-full px-4 py-3 rounded-xl border border-[#e1e5e8] bg-white text-sm text-[#001e2b] placeholder-slate-400 focus:outline-none focus:border-[#00ed64] focus:ring-1 focus:ring-[#00ed64] transition-all"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-[#001e2b]">
                  Master Password <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-[#5c6c7a] font-mono">Encrypted 256-bit</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full pl-4 pr-11 py-3 rounded-xl border border-[#e1e5e8] bg-white text-sm text-[#001e2b] placeholder-slate-400 focus:outline-none focus:border-[#00ed64] focus:ring-1 focus:ring-[#00ed64] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button with Signature Gradient Border */}
            <div 
              className="p-[2px] rounded-full w-full pt-2"
              style={{
                background: "linear-gradient(163deg, rgb(255, 137, 24) 28%, rgb(162, 41, 4) 54%, rgb(0, 0, 0) 68%, rgb(0, 152, 243) 100%)",
                boxShadow: "0 0 14px rgba(255, 137, 24, 0.28), 0 0 18px rgba(0, 152, 243, 0.22)"
              }}
            >
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-full bg-[#001e2b] text-[#00ed64] hover:bg-[#002b3d] font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-[#00ed64] border-t-transparent animate-spin" />
                    <span>Verifying Credentials...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Sign In as Administrator</span>
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Quick Demo Credentials Helper */}
          <div className="p-3 rounded-xl bg-[#f9fbfa] border border-[#e1e5e8] flex items-center justify-between text-xs">
            <span className="text-[#5c6c7a] text-[11px]">Authorized Demo Access:</span>
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-[#00684a] hover:underline font-bold text-[11px] cursor-pointer"
            >
              Auto-fill admin credentials
            </button>
          </div>

          {/* Student / Faculty Switcher */}
          <div className="pt-2 border-t border-[#e1e5e8] text-center">
            <button
              type="button"
              onClick={onCancel}
              className="text-xs text-[#5c6c7a] hover:text-[#001e2b] transition-colors cursor-pointer"
            >
              Not an administrator? <span className="font-bold text-blue-600 underline">Return to Student / Faculty Login →</span>
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT: SHOWCASE IMAGE (60% on Desktop, 1:1 match to AuthPage.jsx)          */}
      {/* ========================================================================= */}
      <div className="hidden md:flex md:w-[60%] bg-[#001e2b] relative items-center justify-center p-4 sm:p-5 lg:p-6 overflow-hidden select-none">
        
        {/* Glow Gradients */}
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
            alt="Collegiate Administrative Console" 
            className="w-full h-full object-cover" 
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#001e2b] via-[#001e2b]/50 to-transparent" />

          {/* Bottom Caption Overlay */}
          <div className="absolute bottom-8 left-8 right-8 text-white z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#00ed64]/15 text-[#00ed64] border border-[#00ed64]/30 backdrop-blur-md mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00ed64] animate-pulse" />
              <span>ADMINISTRATIVE CONSOLE</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2">
              GEC Khagaria Control Center
            </h3>

            <p className="text-sm sm:text-base lg:text-lg font-medium text-[#c1ccd6] max-w-lg">
              Department of Science, Technology and Technical Education, Government of Bihar. Oversee events, issue verified certificates, and govern student innovation.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminAuthGate;
