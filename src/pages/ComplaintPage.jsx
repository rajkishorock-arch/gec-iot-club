import React, { useState } from 'react';
import { 
  LifeBuoy, 
  Send, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  HelpCircle,
  Cpu,
  FileQuestion
} from 'lucide-react';

const ComplaintPage = () => {
  const [complaintsList, setComplaintsList] = useState([
    {
      id: 'TKT-9201',
      studentName: 'Vivek Sharma',
      regNo: '22105128019',
      category: 'Hardware Component Request',
      subject: 'Need 2x ESP32-CAM and LoRa SX1278 for SIH Prototype',
      status: 'Resolved',
      date: 'September 24, 2026',
      response: 'Components issued from Lab Inventory rack B-4 by Prof. Manoj.'
    },
    {
      id: 'TKT-9204',
      studentName: 'Kavita Singh',
      regNo: '23105128042',
      category: 'Lab Workbench Access',
      subject: 'Permission for late evening lab access for soldering chassis',
      status: 'Approved',
      date: 'September 26, 2026',
      response: 'Lab gate pass approved for 7:00 PM - 10:00 PM.'
    }
  ]);

  const [form, setForm] = useState({
    name: '',
    regNo: '',
    email: '',
    category: 'Hardware Component Request',
    subject: '',
    description: ''
  });

  const [submittedTkt, setSubmittedTkt] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTkt = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: form.name,
      regNo: form.regNo,
      category: form.category,
      subject: form.subject,
      status: 'Pending Review',
      date: 'Just now',
      response: 'Your ticket is queued for Faculty Coordinator review.'
    };

    setComplaintsList([newTkt, ...complaintsList]);
    setSubmittedTkt(newTkt);
    setForm({
      name: '',
      regNo: '',
      email: '',
      category: 'Hardware Component Request',
      subject: '',
      description: ''
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <LifeBuoy className="w-4 h-4 text-cyan-400" />
          <span>Student Redressal & Lab Helpdesk</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Grievance & Lab Requests
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Request hardware components, report lab equipment faults, or submit student queries directly to GEC Khagaria IoT Club faculty coordinators.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Form */}
        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5 bg-slate-950">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileQuestion className="w-5 h-5 text-cyan-400" />
            <span>Submit New Ticket / Request</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Your Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Registration / Roll No *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Roll No"
                  value={form.regNo}
                  onChange={(e) => setForm({...form, regNo: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-medium">Category *</label>
              <select
                value={form.category}
                onChange={(e) => setForm({...form, category: e.target.value})}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
              >
                <option>Hardware Component Request</option>
                <option>Lab Workbench Access</option>
                <option>Broken Equipment / Soldering Iron Issue</option>
                <option>Hackathon Mentorship Doubt</option>
                <option>Certificate Discrepancy</option>
                <option>Other Feedback</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-medium">Subject *</label>
              <input 
                type="text" 
                required
                placeholder="Brief summary of request"
                value={form.subject}
                onChange={(e) => setForm({...form, subject: e.target.value})}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-medium">Details / Specifications *</label>
              <textarea 
                rows="4" 
                required
                placeholder="Provide details (e.g. required sensors, pinout requirement, date of lab access needed)..."
                value={form.description}
                onChange={(e) => setForm({...form, description: e.target.value})}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-400 to-emerald-400 text-black hover:opacity-90 transition-opacity"
            >
              Submit Ticket to Coordinator
            </button>
          </form>
        </div>

        {/* Right: Ticket Tracking List */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Recent Ticket Status</h3>
            <span className="text-xs font-mono text-cyan-400">{complaintsList.length} Tickets Logged</span>
          </div>

          <div className="space-y-3">
            {complaintsList.map((tkt) => {
              const isResolved = tkt.status === 'Resolved' || tkt.status === 'Approved';
              return (
                <div 
                  key={tkt.id}
                  className="glass-panel rounded-2xl p-5 border border-white/10 space-y-2.5 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-mono font-bold text-xs text-cyan-300">
                      {tkt.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                      isResolved 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {tkt.status}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-semibold text-white">
                    {tkt.subject}
                  </h4>

                  <div className="text-[11px] text-slate-400 flex items-center justify-between font-mono">
                    <span>{tkt.category}</span>
                    <span>{tkt.date}</span>
                  </div>

                  {tkt.response && (
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5 text-[11px] text-slate-300">
                      <strong className="text-emerald-400 font-mono">Coordinator Response: </strong> 
                      {tkt.response}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};

export default ComplaintPage;
