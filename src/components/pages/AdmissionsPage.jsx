import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import SubjectSelector from '../common/SubjectSelector';
import LeadReservationForm from '../common/LeadReservationForm';
import UniversitySelect from '../common/UniversitySelect';
import { 
  GraduationCap, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle, 
  Calendar, 
  Search, 
  BookOpen 
} from '../icons/FontAwesomeIcons';

const BASE_INSTITUTIONS = [
  {
    id: 'UNILAG',
    name: 'University of Lagos (UNILAG)',
    screeningType: 'Post-UTME CBT Exam (30 Marks)',
    minJamb: '200+ UTME Cut-off',
    campaignBadge: 'UNILAG Target 25/30 Prep Active',
    datesText: 'July 27th – 31st, 2026',
    description: "UNILAG calculates aggregate score as JAMB (50%) + Post-UTME (30%) + O'Level (20%). Scoring 25+ in Post-UTME is essential for Medicine, Law, Engineering, and Mass Communication."
  },
  {
    id: 'LASU',
    name: 'Lagos State University (LASU)',
    screeningType: 'Online Point Grading System',
    minJamb: '195+ UTME Cut-off',
    campaignBadge: "O'Level Grading Support",
    datesText: 'Session 2026/2027',
    description: "LASU uses pure point grading based on O'Level subject distinctions and UTME score. Proper subject mapping is crucial for top departments."
  },
  {
    id: 'UI',
    name: 'University of Ibadan (UI)',
    screeningType: 'Post-UTME CBT Screening',
    minJamb: '200+ UTME Cut-off',
    campaignBadge: 'UI CBT Special Drills',
    datesText: 'Session 2026/2027',
    description: 'Strict adherence to subject combinations and high UTME score targets required for competitive courses at Nigeria’s premier university.'
  },
  {
    id: 'OAU',
    name: 'Obafemi Awolowo University (OAU)',
    screeningType: 'Post-UTME Screening Exam',
    minJamb: '200+ UTME Cut-off',
    campaignBadge: 'OAU Cut-off Advisory',
    datesText: 'Session 2026/2027',
    description: 'Aggressive cut-off marks across Health Sciences and Technology faculties. High speed and accuracy essential.'
  },
  {
    id: 'FUTA',
    name: 'Federal University of Technology, Akure (FUTA)',
    screeningType: 'Computer-Based Screening Test (CBST)',
    minJamb: '180+ UTME Cut-off',
    campaignBadge: 'FUTA Science & Tech Drills',
    datesText: 'Session 2026/2027',
    description: 'Premier technology varsity screening focusing on Science, Engineering, and Mathematical aptitude.'
  },
  {
    id: 'UNIBEN',
    name: 'University of Benin (UNIBEN)',
    screeningType: 'Post-UTME Computer-Based Test',
    minJamb: '200+ UTME Cut-off',
    campaignBadge: 'UNIBEN Mock Drills Active',
    datesText: 'Session 2026/2027',
    description: 'Comprehensive computer-based assessment testing speed and accuracy across standard 4-subject combinations.'
  },
  {
    id: 'UNILORIN',
    name: 'University of Ilorin (UNILORIN)',
    screeningType: 'Post-UTME CBT Assessment',
    minJamb: '180+ UTME Cut-off',
    campaignBadge: 'UNILORIN Speedy Track',
    datesText: 'Session 2026/2027',
    description: 'Consistently one of the most applied-to varsities in Nigeria. High competitiveness necessitates 250+ UTME aggregate.'
  },
  {
    id: 'UNN',
    name: 'University of Nigeria, Nsukka (UNN)',
    screeningType: 'Post-UTME CBT Screening',
    minJamb: '160–200+ UTME Cut-off',
    campaignBadge: 'Lions Portal Coaching',
    datesText: 'Session 2026/2027',
    description: 'Rigorous CBT screening across registered JAMB subjects with departmental cut-off weighing.'
  }
];

function findMatchId(target, list) {
  if (!target) return list[0]?.id || 'UNILAG';
  const clean = target.trim().toLowerCase();
  
  // Exact id or name match
  const found = list.find(inst => 
    inst.id.toLowerCase() === clean ||
    clean.includes(inst.id.toLowerCase()) ||
    inst.name.toLowerCase().includes(clean) ||
    clean.includes(inst.name.toLowerCase())
  );
  return found ? found.id : null;
}

function buildInstitutionsList(registeredTarget) {
  if (!registeredTarget) return BASE_INSTITUTIONS;

  const matchId = findMatchId(registeredTarget, BASE_INSTITUTIONS);
  if (matchId) {
    return BASE_INSTITUTIONS;
  }

  // Generate dynamic varsity entry for user's custom registered institution
  const clean = registeredTarget.trim();
  const acronymMatch = clean.match(/\(([^)]+)\)/);
  const acronym = acronymMatch ? acronymMatch[1] : (clean.split(' ')[0].toUpperCase() || 'VARSITY');

  const customEntry = {
    id: acronym,
    name: clean,
    screeningType: 'Post-UTME Screening & Verification',
    minJamb: '180–200+ UTME Benchmark',
    campaignBadge: `${acronym} Registered Choice Hub`,
    datesText: 'Session 2026/2027',
    description: `Specialized admission preparation, cut-off evaluation, and department screening consultation for ${clean}, configured directly from your academy registration profile.`
  };

  return [customEntry, ...BASE_INSTITUTIONS];
}

export default function AdmissionsPage() {
  const { openServiceModal } = useApp();
  const { user } = useAuth();

  const registeredVarsity = user?.targetInstitution || '';

  const institutions = useMemo(() => {
    return buildInstitutionsList(registeredVarsity);
  }, [registeredVarsity]);

  const [selectedInst, setSelectedInst] = useState(() => {
    const list = buildInstitutionsList(registeredVarsity);
    const matchId = findMatchId(registeredVarsity, list);
    return matchId || list[0]?.id || 'UNILAG';
  });

  const [sandboxSubjects, setSandboxSubjects] = useState(['eng', 'math', 'phy', 'chem']);
  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    phone: user ? user.phone : '',
    jambScore: user ? user.targetJambScore || 280 : 280,
    targetInstitution: user ? user.targetInstitution || 'University of Lagos (UNILAG)' : 'UNILAG',
    targetCourse: user ? user.targetCourse || 'Computer Science' : 'Computer Science',
    olevelStatus: 'Complete (1 Sitting)'
  });
  const [evaluated, setEvaluated] = useState(false);

  // Synchronize Specialized Varsity Hub automatically whenever user signs in or changes profile
  useEffect(() => {
    if (user?.targetInstitution) {
      const matchId = findMatchId(user.targetInstitution, institutions);
      if (matchId) {
        setSelectedInst(matchId);
      }
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        phone: user.phone || prev.phone,
        jambScore: user.targetJambScore || prev.jambScore,
        targetInstitution: user.targetInstitution || prev.targetInstitution,
        targetCourse: user.targetCourse || prev.targetCourse
      }));
    }
  }, [user, institutions]);

  const handleEvaluateProfile = (e) => {
    e.preventDefault();
    setEvaluated(true);
  };

  const activeInstObj = institutions.find(i => i.id === selectedInst) || institutions[0];

  const isUserRegisteredInst = user?.targetInstitution && (
    activeInstObj.id.toLowerCase() === user.targetInstitution.toLowerCase() ||
    user.targetInstitution.toLowerCase().includes(activeInstObj.id.toLowerCase()) ||
    activeInstObj.name.toLowerCase().includes(user.targetInstitution.toLowerCase()) ||
    user.targetInstitution.toLowerCase().includes(activeInstObj.name.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider font-mono">
          <Sparkles size={13} className="text-amber-400" />
          <span>Admission Consultancy & Post-UTME Center</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
          Secure Your Varsity Admission
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Strategic admission guidance, Post-UTME preparation, and JAMB CAPS tracking led by CEO Akinjo Rotimi & expert consultants.
        </p>
      </div>

      {/* ADMISSION JOURNEY STEPS */}
      <div className="space-y-6">
        <h2 className="font-heading font-bold text-xl text-white text-center">The D Ensured 7-Step Admission Journey</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: '01', title: 'Target University Mapping', desc: 'Identify cut-off scores, catchment areas, and course quota criteria.' },
            { step: '02', title: 'UTME Subject Strategy', desc: 'Ensure exact compliance with official JAMB brochure requirements.' },
            { step: '03', title: 'High-Score Exam Prep', desc: 'Daily intensive drills targeting 300+ in UTME and 25+ in Post-UTME.' },
            { step: '04', title: 'O\'Level Upload & CAPS Verification', desc: 'Prevent admission disqualification due to portal upload errors.' },
            { step: '05', title: 'Change of Course / Varsity', desc: 'Execute timely portal adjustments if score requires realignment.' },
            { step: '06', title: 'Post-UTME Screening Drills', desc: 'Specialized CBT mock rehearsals matching specific varsity formats.' },
            { step: '07', title: 'CAPS Acceptance & Clearance', desc: 'Guide matriculation number generation and final departmental clearance.' }
          ].map((s) => (
            <div key={s.step} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2 hover:border-amber-400/40 transition">
              <span className="font-mono font-extrabold text-amber-400 text-lg sm:text-xl block">{s.step}</span>
              <h3 className="font-heading font-bold text-sm text-white">{s.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SUBJECT COMBINATION SANBOX WIDGET */}
      <div className="space-y-4">
        <SubjectSelector 
          maxSelection={4}
          selectedSubjectIds={sandboxSubjects}
          onChange={(newIds) => setSandboxSubjects(newIds)}
          title="UTME 4-Subject Eligibility Sandbox"
          subtitle="Select 4 subjects and see recommended target university courses below."
        />
      </div>

      {/* POST-UTME INSTITUTION HUB (SPECIALISED VARSITY HUB) */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-400/30 gold-glow space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                Specialized Varsity Hub
              </span>
              {user?.targetInstitution && (
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono">
                  Synchronized with Profile
                </span>
              )}
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1">
              Institution Post-UTME Preparation
            </h2>
          </div>

          {/* Institution Switcher Pills */}
          <div className="flex flex-wrap gap-2">
            {institutions.map((inst) => {
              const isTarget = user?.targetInstitution && (
                inst.id.toLowerCase() === user.targetInstitution.toLowerCase() ||
                user.targetInstitution.toLowerCase().includes(inst.id.toLowerCase()) ||
                inst.name.toLowerCase().includes(user.targetInstitution.toLowerCase()) ||
                user.targetInstitution.toLowerCase().includes(inst.name.toLowerCase())
              );

              return (
                <button
                  key={inst.id}
                  onClick={() => setSelectedInst(inst.id)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl border transition flex items-center gap-1.5 ${
                    selectedInst === inst.id
                      ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md font-black'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{inst.id}</span>
                  {isTarget && (
                    <span 
                      title="Your registered varsity" 
                      className={`w-2 h-2 rounded-full ${selectedInst === inst.id ? 'bg-slate-950' : 'bg-amber-400 animate-pulse'}`} 
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Institution Banner */}
        <div className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase">
                {activeInstObj.campaignBadge}
              </span>
              {isUserRegisteredInst && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-mono font-black shadow animate-fadeIn">
                  <CheckCircle2 size={13} /> Your Registered Choice ({user?.targetCourse || 'Target Course'})
                </span>
              )}
            </div>
            
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
              {activeInstObj.name}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeInstObj.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono pt-2">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Screening Method</span>
                <span className="text-amber-300 font-bold">{activeInstObj.screeningType}</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Minimum Benchmark</span>
                <span className="text-white font-bold">{activeInstObj.minJamb}</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-slate-400 text-[10px] block">Schedule</span>
                <span className="text-emerald-400 font-bold">{activeInstObj.datesText}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center space-y-3">
            <button
              onClick={() => openServiceModal({
                id: 'admission-consultation-special',
                title: `${activeInstObj.id} Admission Guidance`,
                fee: '₦5,000',
                fullDesc: `Personalized admission guidance for ${activeInstObj.name}.`,
                processingTime: '24 Hours'
              })}
              className="w-full py-3.5 text-xs font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition text-center"
            >
              Book {activeInstObj.id} Consultation
            </button>
          </div>
        </div>

      </div>

      {/* ADMISSION ELIGIBILITY EVALUATOR FORM */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6 max-w-3xl mx-auto">
        
        <div className="text-center space-y-2">
          <h3 className="font-heading font-bold text-xl text-white">Free Admission Probability Evaluator</h3>
          <p className="text-xs text-slate-400">Input your details to calculate admission chances and recommended course modifications.</p>
        </div>

        {!evaluated ? (
          <form onSubmit={handleEvaluateProfile} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">UTME Score</label>
                <input
                  type="number"
                  required
                  min={100}
                  max={400}
                  placeholder="e.g. 280"
                  value={formData.jambScore}
                  onChange={(e) => setFormData({ ...formData, jambScore: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Institution</label>
                <UniversitySelect
                  value={formData.targetInstitution}
                  onChange={(newUni) => setFormData({ ...formData, targetInstitution: newUni })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Department/Course</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Computer Science"
                  value={formData.targetCourse}
                  onChange={(e) => setFormData({ ...formData, targetCourse: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg transition cursor-pointer"
            >
              Evaluate My Profile & Calculate Aggregate
            </button>

          </form>
        ) : (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 text-center">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={28} />
            </div>

            <h4 className="font-heading font-bold text-lg text-white">Profile Evaluation Complete</h4>
            <p className="text-xs text-slate-300">
              For candidate <strong className="text-amber-400">{formData.name}</strong> with UTME score <strong className="text-amber-400 font-mono">{formData.jambScore}</strong> applying for <strong className="text-white">{formData.targetCourse}</strong> at <strong className="text-white">{formData.targetInstitution}</strong>:
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left text-xs font-mono space-y-2">
              <p className="text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 size={14} className="shrink-0" />
                <span>High Admission Eligibility (78.5% Probability)</span>
              </p>
              <p className="text-slate-400">Target Post-UTME score required: <strong className="text-amber-400 font-bold">25/30 or higher</strong>.</p>
              <p className="text-slate-400">Next Action: Enroll in D Ensured Post-UTME Masterclass or verify O'Level upload on JAMB CAPS.</p>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setEvaluated(false)}
                className="flex-1 py-2.5 text-xs font-semibold text-slate-300 bg-slate-800 rounded-xl"
              >
                Re-evaluate Another Profile
              </button>
              <button
                onClick={() => openServiceModal({
                  id: 'change-institution',
                  title: 'Change of Institution / Course',
                  fee: '₦3,500',
                  fullDesc: 'Official JAMB CAPS processing.',
                  processingTime: '24 Hours'
                })}
                className="flex-1 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 rounded-xl"
              >
                Proceed with Advisory Service
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Inline Slot Reservation & Consultation Form */}
      <LeadReservationForm
        title="Schedule In-Person or Virtual Admission Advisory"
        subtitle="Meet one-on-one with our senior admissions evaluators to map your JAMB score, institution quotas, and departmental cut-offs."
      />

    </div>
  );
}
