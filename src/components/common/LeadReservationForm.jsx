import React, { useState } from 'react';
import { 
  Send, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  PhoneCall, 
  User, 
  GraduationCap, 
  Calendar 
} from 'lucide-react';

export default function LeadReservationForm({
  title = "Reserve Your Study Slot or Request Consultation",
  subtitle = "Direct priority academic counseling with CEO Akinjo Rotimi & faculty coordinators.",
  compact = false
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    targetExam: 'JAMB UTME 2026',
    preferredSchedule: 'Morning Intensive (9am - 1pm)',
    dreamCourse: 'Medicine & Surgery',
    targetUniversity: 'UNILAG'
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="w-full glass-panel rounded-3xl p-6 sm:p-10 border border-amber-400/30 gold-glow relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        
        {/* Header Block */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles size={13} className="text-amber-400" />
            <span>Fast-Track Admission Intake</span>
          </div>

          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            {subtitle}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Candidate Full Name *
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Adekunle"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  WhatsApp / Phone Number *
                </label>
                <div className="relative">
                  <PhoneCall size={15} className="absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="tel"
                    required
                    placeholder="08147896930"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Target Exam Track */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Target Exam Track
                </label>
                <select
                  value={formData.targetExam}
                  onChange={(e) => setFormData({ ...formData, targetExam: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option>JAMB UTME 2026 (Target 300+)</option>
                  <option>UNILAG Post-UTME (Target 25/30)</option>
                  <option>WAEC / SSCE Distinction Masterclass</option>
                  <option>NECO SSCE Prep</option>
                  <option>GCE Private Candidate Fast-Track</option>
                  <option>General Varsity Admission Consultancy</option>
                </select>
              </div>

              {/* Preferred Study Schedule */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Preferred Study Schedule
                </label>
                <div className="relative">
                  <Calendar size={15} className="absolute left-3.5 top-3 text-slate-500" />
                  <select
                    value={formData.preferredSchedule}
                    onChange={(e) => setFormData({ ...formData, preferredSchedule: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option>Morning Intensive (9:00 AM – 1:00 PM)</option>
                    <option>Evening Professional (3:00 PM – 6:30 PM)</option>
                    <option>Weekend Bootcamp (Sat & Sun)</option>
                    <option>Hybrid / Online Virtual CBT</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Goal / Dream Course */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Target Course / Department
                </label>
                <div className="relative">
                  <GraduationCap size={15} className="absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="text"
                    placeholder="e.g. Medicine, Law, Computer Science"
                    value={formData.dreamCourse}
                    onChange={(e) => setFormData({ ...formData, dreamCourse: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Target Institution */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Target University / Polytechnic
                </label>
                <input
                  type="text"
                  placeholder="e.g. UNILAG, LASU, UI, OAU, FUTA"
                  value={formData.targetUniversity}
                  onChange={(e) => setFormData({ ...formData, targetUniversity: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Response Time Reassurance Notice */}
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
              <Clock size={16} className="text-amber-400 shrink-0" />
              <span>
                <strong className="text-amber-300">Guaranteed Response:</strong> Our admissions desk guarantees callback or WhatsApp outreach within <span className="text-emerald-400 font-bold font-mono">15 minutes</span> during academic working hours (Mon–Sat, 8am–6pm).
              </span>
            </div>

            {/* High-Visibility Full-Width Submit CTA Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 text-sm font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-2xl shadow-xl hover:shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span>Confirming reservation...</span>
              ) : (
                <>
                  <Send size={16} /> Reserve Seat & Request Immediate Callback
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-slate-400">
              Direct physical office desk: <span className="text-white font-semibold">Doyin Plaza, Igboelerin Busstop, Okomaiko, Lagos</span>.
            </p>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4 bg-slate-900/80 p-6 rounded-2xl border border-emerald-500/40 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>

            <h4 className="font-heading font-extrabold text-xl text-white">
              Slot Reserved Successfully!
            </h4>

            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Thank you, <strong className="text-amber-400">{formData.fullName}</strong>. Your reservation for <strong className="text-white">{formData.targetExam}</strong> ({formData.preferredSchedule}) has been logged. An academic counselor is contacting <span className="text-amber-400 font-mono font-bold">{formData.phone}</span> within 15 minutes.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/2348147896930?text=Hello%20D%20Ensured%20Consult%20Academy,%20my%20name%20is%20${encodeURIComponent(formData.fullName)},%20I%20just%20reserved%20a%20seat%20for%20${encodeURIComponent(formData.targetExam)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition flex items-center gap-1.5"
              >
                Instant WhatsApp Follow-up (08147896930)
              </a>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-xl"
              >
                Submit Another Reservation
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
