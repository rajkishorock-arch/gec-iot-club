import React, { useState } from 'react';
import { User, Phone, Camera, Check, Sparkles, BookOpen, Hash, Calendar, CheckCircle2 } from 'lucide-react';

export const CreateStudentProfilePage = ({ onProfileComplete, setActiveTab, currentUser }) => {
  const [step, setStep] = useState(1); // 1 = Basic Info, 2 = Academic

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    profileImage: null,
    branch: 'Electronics & Communication Engineering',
    batch: '2023-2027',
    regNumber: currentUser?.regNo || '22105128014',
    semester: '5th Semester'
  });

  const [previewImage, setPreviewImage] = useState(
    currentUser?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=StudentNew&eyebrows=default'
  );
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const branches = [
    'Electronics & Communication Engineering',
    'Computer Science & Engineering',
    'Electrical Engineering',
    'Civil Engineering',
    'Mechanical Engineering'
  ];

  const batches = [
    '2021-2025',
    '2022-2026',
    '2023-2027',
    '2024-2028',
    '2025-2029'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      if (file.size > 5242880) {
        alert('File size should be less than 5MB.');
        return;
      }
      setFormData(prev => ({ ...prev, profileImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = 'Enter a valid 10-digit mobile number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.branch) newErrors.branch = 'Please select your branch';
    if (!formData.batch) newErrors.batch = 'Please select your batch';
    if (!formData.regNumber.trim()) newErrors.regNumber = 'Registration number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      const updatedUser = {
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: currentUser?.email || `${formData.firstName.toLowerCase()}@geckhagaria.org`,
        regNo: formData.regNumber.trim(),
        phone: formData.mobileNumber.trim(),
        branch: formData.branch,
        batch: formData.batch,
        semester: formData.semester,
        role: 'student',
        avatar: previewImage,
        profileCompleted: true
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));

      setTimeout(() => {
        if (onProfileComplete) {
          onProfileComplete(updatedUser);
        } else {
          setActiveTab('student-dashboard');
        }
      }, 1200);
    }, 700);
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-6 sm:py-10 px-3 sm:px-6 md:px-8 bg-[#001e2b] font-['General_Sans',sans-serif] selection:bg-[#00ed64] selection:text-black flex flex-col justify-center items-center">
      
      {/* Decorative Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-between text-white text-[25vw] font-mono select-none px-6">
        <span>&#123;</span>
        <span>&#125;</span>
      </div>

      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00ed64]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#00684a]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-2xl mx-auto relative z-10 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1.5">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Complete Your Profile
          </h2>
          <p className="text-xs sm:text-sm text-[#c1ccd6]">
            Tell us more about yourself to get started with IoT Club
          </p>
        </div>

        {/* Step Indicator matching RX component from bundle */}
        <div className="flex items-center justify-center space-x-3 sm:space-x-4 py-2">
          {/* Step 1: Basic Info */}
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
              step >= 1 ? 'border-[#00ed64] bg-[#00ed64] text-[#001e2b]' : 'border-gray-500 bg-[#001e2b] text-gray-400'
            }`}>
              {step > 1 ? <Check className="w-4 h-4 stroke-[3]" /> : '1'}
            </div>
            <span className={`text-xs font-semibold ${step >= 1 ? 'text-white' : 'text-gray-400'}`}>
              Basic Info
            </span>
          </div>

          {/* Line separator */}
          <div className={`w-12 sm:w-16 h-0.5 transition-colors ${step >= 2 ? 'bg-[#00ed64]' : 'bg-gray-700'}`} />

          {/* Step 2: Academic */}
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
              step >= 2 ? 'border-[#00ed64] bg-[#00ed64] text-[#001e2b]' : 'border-gray-600 bg-[#001e2b] text-gray-400'
            }`}>
              2
            </div>
            <span className={`text-xs font-semibold ${step >= 2 ? 'text-white' : 'text-gray-400'}`}>
              Academic
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,30,43,0.6)] border border-[#e1e5e8] overflow-hidden w-full p-6 sm:p-10">
          
          {/* ================= STEP 1: BASIC INFO ================= */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              
              {/* Profile Avatar Upload with Green Glow Ring */}
              <div className="flex flex-col items-center space-y-3">
                <div 
                  onClick={() => document.getElementById('studentProfileImage').click()}
                  className="relative cursor-pointer group"
                >
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-[#00ed64] p-1 group-hover:opacity-90 transition-opacity shadow-lg">
                    <img 
                      src={previewImage} 
                      alt="Student Profile Preview" 
                      className="w-full h-full rounded-full object-cover bg-slate-100" 
                    />
                  </div>

                  <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-9 sm:h-9 bg-[#00ed64] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform border-2 border-white text-[#001e2b]">
                    <Camera className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">Click on the image to upload</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Max 5MB (JPG, PNG)</p>
                </div>

                <input 
                  type="file" 
                  id="studentProfileImage" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="hidden" 
                />
              </div>

              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      name="firstName" 
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter First Name"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00ed64] transition-all ${
                        errors.firstName ? 'border-red-500 bg-red-50/20' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      name="lastName" 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter Last Name"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00ed64] transition-all ${
                        errors.lastName ? 'border-red-500 bg-red-50/20' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="tel" 
                    name="mobileNumber" 
                    maxLength="10"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Mobile Number"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00ed64] transition-all ${
                      errors.mobileNumber ? 'border-red-500 bg-red-50/20' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
              </div>

              {/* Next Step Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#00ed64] text-[#001e2b] hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Continue to Academic Info &rarr;</span>
                </button>
              </div>

            </form>
          )}

          {/* ================= STEP 2: ACADEMIC INFO ================= */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Branch Selection */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Engineering Branch</label>
                <div className="relative">
                  <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00ed64] transition-all bg-white"
                  >
                    {branches.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Batch & Semester */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Graduating Batch</label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      name="batch"
                      value={formData.batch}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00ed64] transition-all bg-white"
                    >
                      {batches.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Current Semester</label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00ed64] transition-all bg-white"
                  >
                    <option>1st Semester</option>
                    <option>2nd Semester</option>
                    <option>3rd Semester</option>
                    <option>4th Semester</option>
                    <option>5th Semester</option>
                    <option>6th Semester</option>
                    <option>7th Semester</option>
                    <option>8th Semester</option>
                  </select>
                </div>
              </div>

              {/* Registration Number */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">AKU / BEU Registration Number</label>
                <div className="relative">
                  <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    name="regNumber" 
                    value={formData.regNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. 22105128014"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#00ed64] transition-all ${
                      errors.regNumber ? 'border-red-500 bg-red-50/20' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.regNumber && <p className="text-red-500 text-xs mt-1">{errors.regNumber}</p>}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3.5 rounded-xl font-semibold text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  &larr; Back
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3.5 rounded-xl font-bold text-sm bg-[#00ed64] text-[#001e2b] hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-[#001e2b] border-t-transparent animate-spin" />
                      <span>Completing Profile...</span>
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Profile Setup Complete!</span>
                    </>
                  ) : (
                    <span>Complete Profile & Go to Dashboard &rarr;</span>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Footer Note */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-[#00141e]/80 text-[#c1ccd6] border border-white/10 backdrop-blur-md shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Official student registry for verified GEC Khagaria members</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CreateStudentProfilePage;
