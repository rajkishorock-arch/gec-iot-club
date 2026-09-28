import React, { useState } from 'react';
import { User, Phone, Camera, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export const CreateFacultyProfilePage = ({ onProfileComplete, setActiveTab, currentUser }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    department: 'Electronics & Communication Engineering',
    designation: 'Assistant Professor & Lab In-Charge',
    profileImage: null
  });

  const [previewImage, setPreviewImage] = useState(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  );
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const handleSubmit = (e) => {
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

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      const updatedUser = {
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: currentUser?.email || `${formData.firstName.toLowerCase()}@geckhagaria.org`,
        phone: formData.mobileNumber.trim(),
        branch: formData.department,
        designation: formData.designation,
        role: 'faculty',
        avatar: previewImage,
        profileCompleted: true
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));

      setTimeout(() => {
        if (onProfileComplete) {
          onProfileComplete(updatedUser);
        } else {
          setActiveTab('faculty-dashboard');
        }
      }, 1200);
    }, 700);
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-6 sm:py-10 px-3 sm:px-6 md:px-8 bg-[#001e2b] font-['General_Sans',sans-serif] selection:bg-[#00ed64] selection:text-black flex flex-col justify-center items-center">
      
      {/* Decorative SVG Code Braces Background Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-between text-white text-[25vw] font-mono select-none px-6">
        <span>&#123;</span>
        <span>&#125;</span>
      </div>

      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00ed64]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#00684a]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Container */}
      <div className="w-full max-w-2xl mx-auto relative z-10 space-y-6">
        
        {/* Header Title & Subtitle matching Screenshot */}
        <div className="text-center space-y-1.5">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Create Faculty Profile
          </h2>
          <p className="text-xs sm:text-sm text-[#c1ccd6]">
            Complete your basic information to get started
          </p>
        </div>

        {/* White Card matching media_1790597951406.png */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,30,43,0.6)] border border-[#e1e5e8] overflow-hidden w-full p-6 sm:p-10">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 1. Avatar with Gradient Border & Camera Badge */}
            <div className="flex flex-col items-center space-y-3">
              <div 
                onClick={() => document.getElementById('facultyProfileImage').click()}
                className="relative cursor-pointer group"
              >
                {/* Gradient ring avatar: #18E299 to #BAFF24 */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gradient-to-r from-[#18E299] to-[#BAFF24] p-1 group-hover:opacity-90 transition-opacity shadow-lg">
                  <img 
                    src={previewImage} 
                    alt="Faculty Profile Preview" 
                    className="w-full h-full rounded-full object-cover" 
                  />
                </div>

                {/* Camera upload badge at bottom-right */}
                <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r from-[#18E299] to-[#BAFF24] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform border-2 border-white text-white">
                  <Camera className="w-4 h-4 text-[#001e2b]" />
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Click on the image to upload</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Max 5MB (JPG, PNG)</p>
              </div>

              <input 
                type="file" 
                id="facultyProfileImage" 
                accept="image/*" 
                onChange={handleImageChange}
                className="hidden" 
              />
            </div>

            {/* 2. Red Warning Box matching Screenshot */}
            <div className="p-4 bg-red-50/90 border border-red-200 rounded-xl text-xs sm:text-[13px] text-red-600 leading-relaxed flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Important:</span> Please upload a clear picture of your face to get your account approved. This helps us verify your identity and prevent fake accounts. Profiles without a clear face image may not be approved.
              </div>
            </div>

            {/* 3. First Name & Last Name (2 columns) */}
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
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#18E299] transition-all ${
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
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#18E299] transition-all ${
                      errors.lastName ? 'border-red-500 bg-red-50/20' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* 4. Mobile Number */}
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
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#18E299] transition-all ${
                    errors.mobileNumber ? 'border-red-500 bg-red-50/20' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
            </div>

            {/* 5. Submit Button matching Screenshot (Vibrant Green) */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#00ed64] text-[#001e2b] hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-[#001e2b] border-t-transparent animate-spin" />
                    <span>Saving Profile...</span>
                  </>
                ) : success ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Profile Created Successfully!</span>
                  </>
                ) : (
                  <span>Create Faculty Profile &rarr;</span>
                )}
              </button>
            </div>

          </form>

        </div>

        {/* Footer Note matching Screenshot */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-[#00141e]/80 text-[#c1ccd6] border border-white/10 backdrop-blur-md shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Your profile helps us verify your identity in the <strong className="text-[#00ed64]">IoT community</strong></span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CreateFacultyProfilePage;
