import React from 'react';
import { useApp } from '../../context/AppContext';
import FacultyShowcase from '../common/FacultyShowcase';
import TransitGuide from '../common/TransitGuide';
import MetricCounterGrid from '../common/MetricCounterGrid';
import { 
  ShieldCheck, 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  Target, 
  Eye, 
  Compass, 
  HeartHandshake, 
  MapPin, 
  Phone,
  Sparkles
} from 'lucide-react';

export default function AboutPage() {
  const { setActiveTab } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fadeIn">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider font-mono">
          <Sparkles size={13} className="text-amber-400" />
          <span>About D Ensured Consult Academy</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
          “We Set The Pace, <span className="gold-gradient-text">Others Follow.”</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Incorporated under Corporate Affairs Commission (RC: 8723808), D Ensured Consult Academy is Nigeria's premier educational consultancy and examination preparation institute.
        </p>
      </div>

      {/* Proof Metrics Counter Grid */}
      <MetricCounterGrid />

      {/* CEO & Leadership Spotlight */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-400/30 gold-glow grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-sm rounded-2xl overflow-hidden border-2 border-amber-400 shadow-2xl">
            <img 
              src="/assets/ceo_akinjo_rotimi.jpg" 
              alt="CEO Akinjo Rotimi" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-navy-950/90 p-4 text-center border-t border-amber-400/40">
              <h3 className="font-heading font-extrabold text-base text-white">AKINJO ROTIMI</h3>
              <p className="text-xs text-amber-400 font-mono">The Visionary Leader & CEO</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-5 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            <Award size={14} /> An Apt & Elite Admission Guide
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Leadership Dedicated to Academic Excellence
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Akinjo Rotimi is a skilled tutor and demystificator of English Language & Literature Studies, a psychologist, intellectual evaluator, and educationist with diverse certifications. He ensures the highest quality in delivery and has produced hundreds of graduates across noble tertiary institutions in Nigeria.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              'Educationist & Academic Mentor',
              'English Language & Literature Demystificator',
              'Psychologist & Intellectual Evaluator',
              'Actor / Thespian & Vast Lecturer',
              'Proven Track Record with 300+ UTME Scorers',
              'Dedicated University Admission Advisory Board'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-200">
                <CheckCircle2 size={15} className="text-amber-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 text-xs font-mono text-amber-400 font-bold italic">
            “The best of him is yet to be unveiled.”
          </div>
        </div>
      </div>

      {/* Leadership & Faculty Deck */}
      <FacultyShowcase />

      {/* Mission, Vision & Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-card p-8 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-12 h-12 bg-amber-400/10 text-amber-400 border border-amber-400/30 rounded-xl flex items-center justify-center">
            <Target size={24} />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">Our Mission</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            To empower Nigerian students with rigorous academic preparation, CBT confidence, and transparent admission guidance required to gain admission into top tertiary institutions on first sitting.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-12 h-12 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-xl flex items-center justify-center">
            <Eye size={24} />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">Our Vision</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            To remain the gold standard in educational consultancy, recognized nationwide for academic excellence, ethical guidance, and unmatched student pass rates.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-xl flex items-center justify-center">
            <HeartHandshake size={24} />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">Core Values</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Academic Integrity • Student-Centered Mentorship • Precision Guidance • Transparency • Continuous Innovation.
          </p>
        </div>

      </div>

      {/* Turn-by-Turn Transit Guides & Location Guidance */}
      <TransitGuide />

    </div>
  );
}
