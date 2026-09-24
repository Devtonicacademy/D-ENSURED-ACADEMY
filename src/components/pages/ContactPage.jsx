import React, { useState } from 'react';
import TransitGuide from '../common/TransitGuide';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck,
  Building2,
  Sparkles
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    email: '', 
    subject: 'JAMB & Admission Enquiry', 
    message: '' 
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider font-mono">
          <Sparkles size={13} className="text-amber-400" />
          <span>Official Campus Office & Inquiries</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
          Visit or Contact D Ensured Academy
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Reach out for admission guidance, CBT registration, course enrollments, or visit our Lagos campus office at Doyin Plaza.
        </p>
      </div>

      {/* Contact Grid: Details Cards + Direct Message Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5">
            <h3 className="font-heading font-bold text-lg text-white">Official Academy Desk</h3>

            <div className="flex items-start gap-3.5 text-xs text-slate-300">
              <div className="p-3 bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded-2xl shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <strong className="text-white block text-sm mb-0.5">Physical Campus Address</strong>
                <span>Doyin Plaza, Igboelerin Busstop, Beside Primemart, Okomaiko, Lagos State, Nigeria.</span>
                <span className="text-amber-400 text-[11px] font-mono block mt-1">Official RC: 8723808</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5 text-xs text-slate-300">
              <div className="p-3 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-2xl shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <strong className="text-white block text-sm mb-0.5">Admissions Hotlines</strong>
                <a href="tel:08147896930" className="font-mono text-amber-300 font-bold hover:underline block text-sm">
                  08147896930
                </a>
                <a href="tel:09024024910" className="text-slate-400 font-mono hover:text-white block text-xs">
                  09024024910
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5 text-xs text-slate-300">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl shrink-0">
                <Clock size={22} />
              </div>
              <div>
                <strong className="text-white block text-sm mb-0.5">Operational Hours</strong>
                <span>Monday – Saturday: 8:00 AM – 6:00 PM</span>
                <span className="text-slate-400 block text-[11px] mt-0.5">Morning & Evening Session Batches</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <a
                href="https://wa.me/2348147896930?text=Hello%20D%20Ensured%20Consult%20Academy,%20I%20want%20to%20make%20an%20enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} /> Chat Direct with Admissions Desk on WhatsApp
              </a>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white flex items-center gap-2">
              <ShieldCheck size={16} className="text-amber-400" /> Authorized Academic Institution
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              D Ensured Consult is fully incorporated with the Corporate Affairs Commission (RC: 8723808). We operate dedicated science laboratories, computer-based CBT simulation suites, and air-conditioned lecture halls.
            </p>
          </div>

        </div>

        {/* Contact Submission Form */}
        <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
              Send an In-Depth Enquiry
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Have specific questions about course cutoffs, Post-UTME screening aggregates, or CBT packages? Fill out the message below.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chinedu Okonkwo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="08147896930"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Enquiry Category</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option>JAMB UTME 2026 Preparation</option>
                  <option>Post-UTME Preparation</option>
                  <option>WAEC / NECO Class Registration</option>
                  <option>Correction of Data / Change of Institution</option>
                  <option>O'Level Result Upload on CAPS</option>
                  <option>General Varsity Admission Counseling</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message Details *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain your academic questions, current UTME score, or desired university program..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send size={15} /> Send Message to Admissions Team
              </button>

            </form>
          ) : (
            <div className="text-center py-12 space-y-4 bg-slate-900/60 p-6 rounded-2xl border border-emerald-500/40 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="font-heading font-extrabold text-xl text-white">Message Dispatched!</h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Thank you <strong className="text-amber-400">{formData.name}</strong>. An admissions advisor will reply to <span className="text-amber-400 font-mono">{formData.phone}</span> shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 text-xs font-bold text-slate-300 bg-slate-800 rounded-xl hover:bg-slate-700 transition"
              >
                Send Another Message
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Turn-by-Turn Transit Guides & Interactive Map Component */}
      <div className="pt-4">
        <TransitGuide />
      </div>

    </div>
  );
}
