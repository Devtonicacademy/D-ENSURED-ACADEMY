import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SERVICES_LIST } from '../../data/servicesData';
import { COURSES_LIST } from '../../data/coursesData';
import { BLOG_POSTS } from '../../data/blogData';
import ScrollFadeIn from '../../components/animations/ScrollFadeIn';
import MetricCounterGrid from '../common/MetricCounterGrid';
import TopScholarsCarousel from '../common/TopScholarsCarousel';
import FacultyShowcase from '../common/FacultyShowcase';
import ProgramCard from '../common/ProgramCard';
import LeadReservationForm from '../common/LeadReservationForm';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Star, 
  Sparkles, 
  Clock, 
  Users, 
  Building2, 
  BookOpenCheck, 
  UserCheck, 
  FileCheck, 
  CreditCard, 
  Key, 
  UploadCloud, 
  MailCheck, 
  Compass, 
  Play
} from 'lucide-react';

const ICON_MAP = {
  Building2,
  BookOpenCheck,
  UserCheck,
  GraduationCap,
  FileCheck,
  CreditCard,
  Award,
  Key,
  UploadCloud,
  MailCheck,
  Compass
};

export default function HomePage() {
  const { setActiveTab, openServiceModal, openCourseModal, campaigns } = useApp();

  const carouselImages = [
    '/assets/hero1.jpg',
    '/assets/hero2.jpg',
    '/assets/hero3.jpg',
    '/assets/hero4.jpg',
    '/assets/hero5.jpg',
    '/assets/hero6.jpg',
  ];
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((i) => (i + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeCampaign = campaigns.find(c => c.active) || campaigns[0];

  return (
    <div className="w-full space-y-20 pb-20">
      
      {/* HERO SECTION */}
      <ScrollFadeIn>
        <section className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          
          {/* Background Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brandBlue-600/15 rounded-full filter blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full filter blur-[100px] pointer-events-none" />
          <img src={carouselImages[slide]} alt="Hero slide" className="absolute inset-0 w-full h-full object-cover -z-10" />

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Pill Tagline */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold font-mono tracking-wider shadow-inner">
                <Sparkles size={14} className="text-amber-400" />
                <span>D ENSURED CONSULT ACADEMY • RC: 8723808</span>
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
                Your Success Starts Here. <br />
                <span className="gold-gradient-text">We Set The Pace, Others Follow.</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Nigeria’s elite academic preparation and university admission consultancy platform. Master JAMB, WAEC, NECO, GCE & Post-UTME with timed CBT practice, morning & evening classes, and 1-on-1 admission guidance.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('CBT')}
                  className="w-full sm:w-auto px-7 py-3.5 text-sm font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-xl gold-glow transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Start CBT Practice <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => setActiveTab('ADMISSIONS')}
                  className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-white border border-slate-700 hover:border-amber-400/50 bg-slate-900/80 hover:bg-slate-800 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  Book Admission Consultation
                </button>
              </div>

              {/* Quick Stats bar */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <p className="font-heading font-extrabold text-xl text-amber-400">300+</p>
                  <p className="text-[11px] text-slate-400 font-mono">UTME Target Scores</p>
                </div>
                <div>
                  <p className="font-heading font-extrabold text-xl text-blue-400">25/30</p>
                  <p className="text-[11px] text-slate-400 font-mono">UNILAG Post-UTME Target</p>
                </div>
                <div>
                  <p className="font-heading font-extrabold text-xl text-emerald-400">100%</p>
                  <p className="text-[11px] text-slate-400 font-mono">CAPS Verification Support</p>
                </div>
              </div>

            </div>

            {/* Right Hero Graphic Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none glass-panel p-6 rounded-3xl border border-slate-700/80 shadow-2xl blue-glow">
                
                {/* Campaign Highlight Box */}
                {activeCampaign && (
                  <div className="mb-4 bg-gradient-to-r from-navy-900 to-brandBlue-900 p-4 rounded-2xl border border-amber-400/30 relative overflow-hidden">
                    <span className="absolute top-2 right-2 bg-amber-400 text-slate-950 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Active Campaign
                    </span>
                    <p className="text-xs font-bold text-amber-300">{activeCampaign.title}</p>
                    <p className="text-[11px] text-slate-300 mt-1">{activeCampaign.badgeText}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-1 flex items-center gap-1">
                      <Clock size={11} className="text-amber-400" /> {activeCampaign.campaignDatesText}
                    </p>
                  </div>
                )}

                {/* Logo Showcase */}
                <div className="flex items-center gap-4 p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
                  <img 
                    src="/assets/d_ensured_logo.jpg" 
                    alt="D Ensured Consult Logo" 
                    className="w-16 h-16 rounded-full border-2 border-amber-400 shadow-xl"
                  />
                  <div>
                    <h4 className="font-heading font-extrabold text-white text-base">D ENSURED CONSULT</h4>
                    <p className="text-xs text-amber-400 font-semibold font-mono">ADMISSION GUIDE & ACADEMY</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Morning & Evening Classes Available</p>
                  </div>
                </div>

                {/* High Score Badges */}
                <div className="mt-4 p-4 bg-slate-950/70 rounded-2xl border border-slate-800 text-xs">
                  <p className="text-slate-400 font-semibold text-[11px] mb-2 text-center uppercase tracking-wider">
                    Verified High Student Scores
                  </p>
                  <div className="grid grid-cols-5 gap-1.5 text-center font-mono font-extrabold">
                    {[325, 310, 300, 299, 290].map((sc, i) => (
                      <div key={i} className="bg-amber-400/10 text-amber-300 border border-amber-400/30 py-1.5 rounded-lg text-xs">
                        {sc}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-300 px-2">
                  <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                    <CheckCircle2 size={16} /> Weekly Practicals Included
                  </span>
                  <button 
                    onClick={() => setActiveTab('COURSES')} 
                    className="text-amber-400 font-bold hover:underline flex items-center gap-1"
                  >
                    Explore Prep Courses <ArrowRight size={12} />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </section>
      </ScrollFadeIn>

      {/* QUICK METRIC COUNTER GRID */}
      <section className="px-4 sm:px-6 lg:px-8">
        <MetricCounterGrid />
      </section>

      {/* TRUST / CREDENTIALS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="flex items-start gap-3">
            <div className="p-3 bg-amber-400/10 text-amber-400 border border-amber-400/30 rounded-2xl">
              <Award size={24} />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">Registered Consultancy</h4>
              <p className="text-xs text-slate-400 mt-0.5">Corporate Affairs Commission RC: 8723808 verified institution.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-3 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-2xl">
              <BookOpen size={24} />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">Expert Demystifiers</h4>
              <p className="text-xs text-slate-400 mt-0.5">Led by CEO Akinjo Rotimi, English & Literature exam specialist.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-2xl">
              <TrendingUp size={24} />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">Interactive CBT Engine</h4>
              <p className="text-xs text-slate-400 mt-0.5">Simulate real JAMB & UNILAG Post-UTME timed exam conditions.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-3 bg-purple-500/10 text-purple-400 border border-purple-500/30 rounded-2xl">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">CAPS & Document Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">Change of institution, data corrections & O'Level result uploads.</p>
            </div>
          </div>

        </div>
      </section>

      {/* CORE SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            Comprehensive Admission & Academic Support
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
            Our Consultancy & Documentation Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Professional processing for JAMB CAPS portal modifications, result verifications, and academic consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.slice(0, 9).map((service) => {
            const IconComponent = ICON_MAP[service.iconName] || GraduationCap;
            return (
              <div 
                key={service.id}
                className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-amber-400/40 transition duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 bg-navy-900 border border-amber-400/30 text-amber-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-400 group-hover:text-slate-950 transition">
                    <IconComponent size={22} />
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider">
                    {service.category}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-white mt-1 group-hover:text-amber-300 transition">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400">{service.fee}</span>
                  <button
                    onClick={() => openServiceModal(service)}
                    className="text-xs font-bold text-slate-200 group-hover:text-white flex items-center gap-1 hover:underline"
                  >
                    Learn More & Apply <ArrowRight size={13} className="text-amber-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => setActiveTab('SERVICES')}
            className="px-6 py-3 text-xs font-bold text-white border border-slate-700 hover:border-amber-400 bg-slate-900 rounded-xl transition"
          >
            View All 11+ Consultancy Services →
          </button>
        </div>
      </section>

      {/* EXAM PREPARATION SECTION WITH ENHANCED PROGRAM CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold font-mono text-blue-400 uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Curriculum Programs
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
            Targeted Examination Preparation Courses
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Structured morning and evening classes designed for JAMB, WAEC, NECO, GCE, and Post-UTME.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES_LIST.slice(0, 3).map((course) => (
            <ProgramCard
              key={course.id}
              course={course}
              onViewCurriculum={(c) => openCourseModal(c)}
              onEnroll={(c) => openCourseModal(c)}
            />
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => setActiveTab('COURSES')}
            className="px-7 py-3 text-xs font-bold text-white border border-slate-700 hover:border-amber-400 bg-slate-900 rounded-xl transition"
          >
            Explore Complete Course Catalogue →
          </button>
        </div>
      </section>

      {/* CBT ENGINE PROMOTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative glass-panel rounded-3xl p-8 sm:p-12 border border-amber-400/30 overflow-hidden gold-glow">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                Interactive Practice Engine
              </span>

              <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
                Master Speed & Accuracy with CBT Simulator
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Real JAMB & Post-UTME exams are timed down to the second. Practice using our exact replica computer-based testing interface featuring question flagging, subject breakdown, and instant performance analysis.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-left">
                  <p className="font-bold text-white text-xs">Timed Tests</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Real-time countdown timer</p>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-left">
                  <p className="font-bold text-white text-xs">Question Review</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Flag & revisit questions</p>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-left col-span-2 sm:col-span-1">
                  <p className="font-bold text-amber-400 text-xs">Instant Score</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Detailed answer keys</p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setActiveTab('CBT')}
                  className="px-8 py-3.5 text-sm font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-xl transition inline-flex items-center gap-2"
                >
                  <Play size={16} fill="currentColor" /> Take a Free Practice Test Now
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm glass-card p-5 rounded-2xl border border-slate-700/80 text-left space-y-3 font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                  <span className="text-amber-400 font-bold">JAMB UTME CBT SIMULATOR</span>
                  <span className="bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded text-[10px]">TIME: 18:45</span>
                </div>
                <p className="text-xs text-slate-200">Q12. What is the value of x if log₁₀(x) + log₁₀(5) = 2?</p>
                <div className="space-y-1.5 text-xs">
                  {['A. 10', 'B. 20 [SELECTED]', 'C. 50', 'D. 100'].map((opt, i) => (
                    <div key={i} className={`p-2 rounded border ${i === 1 ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                      {opt}
                    </div>
                  ))}
                </div>
                <div className="pt-2 text-right">
                  <span className="text-[10px] text-emerald-400">✓ Score Saved to Dashboard</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TOP SCHOLARS SUCCESS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TopScholarsCarousel />
      </section>

      {/* LEADERSHIP & FACULTY SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FacultyShowcase />
      </section>

      {/* INLINE LEAD GENERATION / SLOT RESERVATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LeadReservationForm />
      </section>

      {/* LATEST BLOG / RESOURCES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Educational Resource Hub
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white mt-2">
              Latest Admission News & Exam Guides
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('BLOG')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 self-start md:self-auto"
          >
            Explore All Resources <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <div 
              key={post.id}
              onClick={() => setActiveTab('BLOG')}
              className="glass-card rounded-2xl border border-slate-800 overflow-hidden cursor-pointer group hover:border-amber-400/40 transition"
            >
              <div className="h-40 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="text-amber-400 font-bold uppercase">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-heading font-bold text-base text-white group-hover:text-amber-300 transition line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">{post.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
