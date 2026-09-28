import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  Download, 
  CheckCircle, 
  QrCode, 
  ShieldCheck, 
  AlertCircle,
  FileCheck,
  Cpu
} from 'lucide-react';
import { clubInfo } from '../data/mockData';
import { useClub } from '../context/ClubContext';

const CertificatesPage = () => {
  const { certificates } = useClub();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCert, setActiveCert] = useState(() => (certificates && certificates.length > 0 ? certificates[0] : null));
  const [searchError, setSearchError] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const list = certificates || [];
    const found = list.find(
      c => (c.id && c.id.toLowerCase() === query) || 
           (c.regNo && c.regNo.toLowerCase() === query) ||
           (c.studentName && c.studentName.toLowerCase().includes(query))
    );

    if (found) {
      setActiveCert(found);
      setSearchError(false);
    } else {
      setSearchError(true);
    }
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      window.print();
    }, 700);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <Award className="w-4 h-4 text-cyan-400" />
          <span>Institutional Credential Verification</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Verify & Download Certificate
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Search by your unique <strong>Certificate ID</strong> or <strong>College Registration Number</strong> to view and download your authenticated certificate.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto pt-2 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="e.g. GEC-IOT-2026-001 or 22105128014"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchError(false);
              }}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 rounded-xl font-semibold text-xs bg-cyan-400 text-black hover:bg-cyan-300 transition-colors shrink-0"
          >
            Verify
          </button>
        </form>

        {searchError && (
          <div className="flex items-center justify-center gap-2 text-xs text-rose-400 font-mono">
            <AlertCircle className="w-4 h-4" />
            <span>No certificate found for this query. Try "GEC-IOT-2026-001" or "GEC-IOT-2026-002"</span>
          </div>
        )}
      </div>

      {/* CERTIFICATE CANVAS PREVIEW */}
      {activeCert && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4 px-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Status: {activeCert.verificationStatus}</span>
            </div>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:opacity-90 shadow-lg shadow-cyan-500/20"
            >
              <Download className="w-4 h-4" />
              <span>{downloadSuccess ? 'Preparing Print...' : 'Download Certificate (PDF/Print)'}</span>
            </button>
          </div>

          {/* Certificate Container */}
          <div className="relative p-8 sm:p-14 rounded-3xl bg-slate-950 border-4 border-cyan-500/30 shadow-[0_0_50px_rgba(0,242,254,0.15)] text-center space-y-8 overflow-hidden print:border-none print:shadow-none print:m-0 print:p-8">
            
            {/* Corner Decorative Borders */}
            <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
            <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

            {/* Subtle Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <Cpu className="w-96 h-96 text-cyan-400" />
            </div>

            {/* Header Institution */}
            <div className="space-y-1 relative z-10">
              <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-mono font-semibold">
                <span>{clubInfo.department}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {clubInfo.college}
              </h2>
              <p className="text-sm font-semibold text-emerald-400 tracking-wider uppercase font-mono">
                Official IoT & Embedded Systems Chapter
              </p>
            </div>

            {/* Certificate Title */}
            <div className="py-2 relative z-10">
              <span className="text-xs uppercase tracking-[0.25em] text-slate-400 font-mono block mb-2">
                This Certificate of Achievement is Proudly Awarded to
              </span>
              <h3 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300 py-1">
                {activeCert.studentName}
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-2">
                Registration No: <span className="text-white font-bold">{activeCert.regNo}</span> | Branch: <span className="text-white font-bold">{activeCert.branch}</span>
              </p>
            </div>

            {/* Event & Description */}
            <div className="max-w-2xl mx-auto space-y-3 relative z-10">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                For exemplary technical participation and successful demonstration in the flagship initiative:
              </p>
              <div className="text-lg sm:text-2xl font-bold text-white bg-white/5 py-2.5 px-4 rounded-xl border border-white/10">
                "{activeCert.eventTitle}"
              </div>
              <p className="text-xs font-mono text-emerald-400 font-bold">
                {activeCert.grade}
              </p>
            </div>

            {/* Signatures & QR Section */}
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end border-t border-white/10 relative z-10">
              {/* Coordinator Sign */}
              <div className="space-y-1 text-center">
                <div className="font-serif italic text-cyan-400 text-lg sm:text-xl border-b border-white/20 pb-1">
                  Prof. Manoj Sharma
                </div>
                <div className="text-[11px] font-bold text-slate-200">Faculty Coordinator</div>
                <div className="text-[10px] text-slate-400">GEC Khagaria IoT Club</div>
              </div>

              {/* QR Verification Seal */}
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="w-16 h-16 rounded-xl bg-slate-900 border border-cyan-500/40 p-2 flex items-center justify-center text-cyan-400 shadow-inner">
                  <QrCode className="w-12 h-12" />
                </div>
                <span className="text-[9px] font-mono text-slate-400">
                  ID: {activeCert.id}
                </span>
                <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-wider">
                  Digitally Authenticated
                </span>
              </div>

              {/* Principal Sign */}
              <div className="space-y-1 text-center">
                <div className="font-serif italic text-cyan-400 text-lg sm:text-xl border-b border-white/20 pb-1">
                  Dr. Arvind Kumar
                </div>
                <div className="text-[11px] font-bold text-slate-200">Patron & Principal</div>
                <div className="text-[10px] text-slate-400">GEC Khagaria</div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Sample verifiable credentials table */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
          Recently Issued Verified Certificates
        </h4>
        <div className="divide-y divide-white/5 text-xs">
          {verifiedCertificates.map((cert) => (
            <div 
              key={cert.id}
              onClick={() => setActiveCert(cert)}
              className="py-3 flex items-center justify-between flex-wrap gap-2 cursor-pointer hover:bg-white/5 px-2 rounded-lg transition-colors"
            >
              <div>
                <div className="font-semibold text-white">{cert.studentName}</div>
                <div className="text-[11px] text-slate-400">{cert.eventTitle}</div>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  {cert.id}
                </span>
                <div className="text-[10px] text-slate-400 mt-0.5">{cert.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default CertificatesPage;
