import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight,
  GraduationCap,
  Sparkles,
  Lock,
  ExternalLink
} from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';

export default function Footer() {
  const { setActiveTab, openAuthModal } = useApp();

  return (
    <footer className="w-full bg-navy-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative Top Line Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-brandBlue-600/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand Info & Accreditation */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/d_ensured_logo.jpg" 
                alt="D Ensured Logo" 
                className="w-12 h-12 rounded-full border-2 border-amber-400 shadow-md"
              />
              <div>
                <h3 className="font-heading font-extrabold text-lg text-white">D ENSURED CONSULT</h3>
                <p className="text-xs text-amber-400 font-mono">ACADEMY & ADMISSION GUIDE</p>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              “We set the pace, others follow.” Premier Nigerian educational consultancy, CBT practice center, and academic prep academy dedicated to consistent 300+ UTME scores and varsity admission placements.
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <ShieldCheck size={16} /> CAC RC: 8723808
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                Founded by Akinjo Rotimi
              </span>
            </div>
          </div>

          {/* Col 2: Main Pages */}
          <div>
            <h4 className="font-heading font-bold text-xs text-amber-300 uppercase tracking-wider mb-4">
              Main Pages
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { id: 'HOME', label: 'Home Overview' },
                { id: 'ABOUT', label: 'About Academy' },
                { id: 'COURSES', label: 'Course Offerings' },
                { id: 'SERVICES', label: 'Admission Services' },
                { id: 'RESULTS', label: 'Success Stories' },
                { id: 'BLOG', label: 'Exam Resources' },
                { id: 'CONTACT', label: 'Contact & Location' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-400 transition flex items-center gap-1.5 text-slate-400 hover:translate-x-1 transform duration-150"
                  >
                    <ArrowUpRight size={12} className="text-amber-400/60" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Portal Links */}
          <div>
            <h4 className="font-heading font-bold text-xs text-amber-300 uppercase tracking-wider mb-4">
              Student Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => {
                    openAuthModal('login');
                  }}
                  className="hover:text-white transition flex items-center gap-1.5 text-amber-400 font-semibold"
                >
                  <Lock size={12} /> Student Portal Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    openAuthModal('register');
                  }}
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <Sparkles size={12} className="text-amber-400" /> New Student Enrollment
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('CBT');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <GraduationCap size={12} className="text-blue-400" /> CBT Practice Simulator
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('ADMISSIONS');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <CheckCircle2 size={12} className="text-emerald-400" /> UNILAG Post-UTME Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    openAuthModal('login');
                  }}
                  className="hover:text-white transition text-slate-500 hover:text-slate-400 text-[11px] block pt-2"
                >
                  Staff & Admin Gateway →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Location & WhatsApp Desk */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-bold text-xs text-amber-300 uppercase tracking-wider mb-1">
              Campus Location
            </h4>
            
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <span>Doyin Plaza, Igboelerin Busstop, Beside Primemart, Okomaiko, Lagos State.</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Phone size={15} className="text-amber-400 shrink-0" />
              <span className="font-mono text-amber-300 font-bold">08147896930</span>
            </div>

            <div className="text-[11px] text-slate-400 font-mono">
              Mon – Sat: 8:00 AM – 6:00 PM
            </div>

            {/* Direct WhatsApp Action Button */}
            <a
              href="https://wa.me/2348147896930?text=Hello%20D%20Ensured%20Consult%20Academy,%20I%20want%20to%20make%20an%20enquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition"
            >
              <MessageCircle size={15} /> Chat on WhatsApp
            </a>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright with Theme Switcher */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center gap-3">
            <p>
              &copy; {new Date().getFullYear()} D ENSURED CONSULT ACADEMY. All rights reserved. Incorporated under RC: 8723808.
            </p>
            <div className="flex items-center gap-1.5 border-l border-slate-800 pl-3">
              <span className="text-[10px] font-mono text-slate-400">Theme:</span>
              <ThemeToggle compact={true} />
            </div>
          </div>

          <p className="text-slate-400 text-center md:text-right max-w-xl">
            <strong className="text-amber-400/90 font-semibold">Important Notice:</strong> D Ensured Consult Academy is an independent educational consultancy & academic prep institution.
          </p>
        </div>
      </div>
    </footer>
  );
}
