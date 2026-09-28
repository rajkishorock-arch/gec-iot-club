import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import { useClub } from '../context/ClubContext';
import { 
  Mail, 
  MessageCircle, 
  Send, 
  MapPin, 
  Clock, 
  ExternalLink, 
  Users, 
  CheckCircle, 
  Globe, 
  Calendar, 
  ShieldCheck,
  Code
} from 'lucide-react';
import { LinkedinIcon, InstagramIcon } from './SocialIcons';

export const ContactSection = () => {
  const { addContactMessage } = useClub();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    addContactMessage(formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="relative w-full py-16 sm:py-24 bg-black text-white font-['General_Sans',sans-serif] overflow-hidden">
      
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[200px] opacity-10 pointer-events-none"
        style={{ background: '#00BFFB' }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl space-y-12 sm:space-y-16">
        
        {/* Title with Signature Beam Animation */}
        <SectionTitle 
          title="Get in Touch"
          subtitle="Ready to join our IoT community? Have questions about our programs? We'd love to hear from you! Connect with us through any of the methods below."
        />

        {/* 1. Four Contact Channel Cards (Screenshot 3 Exact Recreation) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Email Us */}
          <div className="rounded-3xl bg-[#030712] border border-orange-500/20 hover:border-orange-500/50 p-6 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-[#FF8918] group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white tracking-tight">Email Us</h3>
                <p className="text-xs text-white/50 font-medium">Get in touch with us</p>
                <p className="text-xs font-mono text-white/80 pt-1 break-all">geckhagaria2019@gmail.com</p>
              </div>
            </div>
            <a 
              href="mailto:geckhagaria2019@gmail.com"
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/15 border border-white/10 text-white text-center transition-all block"
            >
              Send Email
            </a>
          </div>

          {/* Card 2: Linkedin */}
          <div className="rounded-3xl bg-[#030712] border border-cyan-500/20 hover:border-cyan-500/50 p-6 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#00BFFB] group-hover:scale-110 transition-transform">
                <LinkedinIcon className="w-5 h-5 text-[#00BFFB]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white tracking-tight">Linkedin</h3>
                <p className="text-xs text-white/50 font-medium">Get in touch with us</p>
                <p className="text-xs font-mono text-white/80 pt-1">GECK IoT Club</p>
              </div>
            </div>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/15 border border-white/10 text-white text-center transition-all block"
            >
              Connect
            </a>
          </div>

          {/* Card 3: Whatsapp */}
          <div className="rounded-3xl bg-[#030712] border border-emerald-500/20 hover:border-emerald-500/50 p-6 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white tracking-tight">Whatsapp</h3>
                <p className="text-xs text-white/50 font-medium">Get in touch with us</p>
                <p className="text-xs font-mono text-emerald-400 pt-1">Available 24/7</p>
              </div>
            </div>
            <a 
              href="https://whatsapp.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/15 border border-white/10 text-white text-center transition-all block"
            >
              Chat WhatsApp
            </a>
          </div>

          {/* Card 4: Instagram */}
          <div className="rounded-3xl bg-[#030712] border border-pink-500/20 hover:border-pink-500/50 p-6 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                <InstagramIcon className="w-5 h-5 text-pink-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white tracking-tight">Instagram</h3>
                <p className="text-xs text-white/50 font-medium">Get in touch with us</p>
                <p className="text-xs font-mono text-white/80 pt-1">Follow on Instagram</p>
              </div>
            </div>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/15 border border-white/10 text-white text-center transition-all block"
            >
              Follow
            </a>
          </div>

        </div>

        {/* 2. Message Form + Visit Campus & Community Stats (Screenshot 4 Exact Recreation) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Send us a Message Card */}
          <div className="lg:col-span-7 rounded-3xl bg-[#030712] border border-orange-500/30 p-6 sm:p-9 shadow-2xl relative">
            
            {/* Header with TLS badge */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Send className="w-5 h-5 text-[#FF8918]" />
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Send us a Message
                </h3>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-[11px] font-mono text-[#FF8918]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Encrypted TLS Protocol</span>
              </div>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-white">Message Transmitted!</h4>
                <p className="text-xs text-white/70 max-w-sm mx-auto font-mono">
                  Your inquiry has been stored securely in the Admin Control Console. Club coordinators will get in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 pt-6 text-xs sm:text-sm">
                
                {/* Full Name & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-white/70 font-mono text-[11px] uppercase tracking-wider font-semibold">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter your full name" 
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FF8918] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-white/70 font-mono text-[11px] uppercase tracking-wider font-semibold">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="Enter your email address" 
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FF8918] transition-colors"
                    />
                  </div>
                </div>

                {/* Subject Dropdown */}
                <div className="space-y-2">
                  <label className="block text-white/70 font-mono text-[11px] uppercase tracking-wider font-semibold">
                    Subject *
                  </label>
                  <select 
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#090f1d] border border-white/10 text-white focus:outline-none focus:border-[#FF8918] transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="Club Membership & Registration">Club Membership & Registration</option>
                    <option value="Hardware Kit & Lab Allotment">Hardware Kit & Lab Allotment</option>
                    <option value="Workshop & Hackathon Queries">Workshop & Hackathon Queries</option>
                    <option value="Sponsorship & Industry Mentorship">Sponsorship & Industry Mentorship</option>
                    <option value="Technical Project Proposal">Technical Project Proposal</option>
                  </select>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="block text-white/70 font-mono text-[11px] uppercase tracking-wider font-semibold">
                    Message *
                  </label>
                  <textarea 
                    rows="4"
                    required
                    placeholder="Tell us about your interest in IoT, questions you have, or how you'd like to get involved..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FF8918] transition-colors resize-none"
                  />
                </div>

                {/* Submit Button with Orange Border */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-black border-2 border-[#FF8918] text-[#FF8918] hover:bg-[#FF8918] hover:text-black font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(255,137,24,0.25)] flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* Right Column: Visit Our Campus & Our Community Stats */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Top Card: Visit Our Campus */}
            <div className="rounded-3xl bg-[#030712] border border-cyan-500/20 p-6 sm:p-7 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#00BFFB]" />
                <h3 className="text-lg font-bold text-white tracking-tight">Visit Our Campus</h3>
              </div>

              <div className="space-y-1 text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                <p className="font-bold text-white">Government Engineering College Khagaria</p>
                <p className="text-white/60">Academic Building, Room 313 College Campus, Khagaria 848203</p>
                <p className="text-white/60">Khagaria, Bihar - 851214</p>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-white/70">
                <Clock className="w-4 h-4 text-[#00BFFB]" />
                <span>Mon - Sat: 10:00 AM - 5:00 PM</span>
              </div>

              <div className="pt-2 border-t border-white/10">
                <a 
                  href="https://geckhagaria.org" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00BFFB] hover:text-white transition-colors"
                >
                  <span>Official College Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Bottom Card: Our Community 2x2 Stats Grid */}
            <div className="rounded-3xl bg-[#030712] border border-white/10 p-6 sm:p-7 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white tracking-tight">Our Community</h3>

              <div className="grid grid-cols-2 gap-4">
                
                {/* Stat 1 */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <Users className="w-5 h-5 text-[#FF8918] mb-2" />
                  <p className="text-xl sm:text-2xl font-black text-white font-mono">550+</p>
                  <p className="text-[11px] text-white/60 font-medium">Active Members</p>
                </div>

                {/* Stat 2 */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <Code className="w-5 h-5 text-[#00BFFB] mb-2" />
                  <p className="text-xl sm:text-2xl font-black text-white font-mono">25+</p>
                  <p className="text-[11px] text-white/60 font-medium">Projects Completed</p>
                </div>

                {/* Stat 3 */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <Globe className="w-5 h-5 text-emerald-400 mb-2" />
                  <p className="text-xl sm:text-2xl font-black text-white font-mono">5+</p>
                  <p className="text-[11px] text-white/60 font-medium">Workshops & Seminars</p>
                </div>

                {/* Stat 4 */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <Calendar className="w-5 h-5 text-purple-400 mb-2" />
                  <p className="text-xl sm:text-2xl font-black text-white font-mono">5+</p>
                  <p className="text-[11px] text-white/60 font-medium">Events Hosted</p>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
