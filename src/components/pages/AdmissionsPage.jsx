import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import SubjectSelector from '../common/SubjectSelector';
import LeadReservationForm from '../common/LeadReservationForm';
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
} from 'lucide-react';

export default function AdmissionsPage() {
  const { openServiceModal, initiatePayment } = useApp();
  const { user } = useAuth();

  const [selectedInst, setSelectedInst] = useState('UNILAG');
  const [sandboxSubjects, setSandboxSubjects] = useState(['eng', 'math', 'phy', 'chem']);
  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    phone: user ? user.phone : '',
    jambScore: user ? user.targetJambScore || 280 : 280,
    targetInstitution: 'UNILAG',
    targetCourse: 'Computer Science',
    olevelStatus: 'Complete (1 Sitting)'
  });
  const [evaluated, setEvaluated] = useState(false);

  const INSTITUTIONS = [
    {
      id: 'UNILAG',
      name: 'University of Lagos (UNILAG)',
      screeningType: 'Post-UTME CBT Exam (30 Marks)',
      minJamb: '200+ UTME Cut-off',
      campaignBadge: 'UNILAG Target 25/30 Prep Active',
      datesText: 'July 27th – 31st, 2026',
      description: 'UNILAG calculates aggregate score as JAMB (50%) + Post-UTME (30%) + O\'Level (20%). Scoring 25+ in Post-UTME is essential for Medicine, Law, Engineering, and Mass Communication.'
    },
    {
      id: 'LASU',
      name: 'Lagos State University (LASU)',
      screeningType: 'Online Point Grading System',
      minJamb: '195+ UTME Cut-off',
      campaignBadge: 'O\'Level Grading Support',
      datesText: 'Session 2026/2027',
      description: 'LASU uses pure point grading based on O\'Level subject distinctions and UTME score. Proper subject mapping is crucial.'
    },
    {
      id: 'UI',
      name: 'University of Ibadan (UI)',
      screeningType: 'Post-UTME CBT Screening',
      minJamb: '200+ UTME Cut-off',
      campaignBadge: 'UI CBT Special Drills',
      datesText: 'Session 2026/2027',
      description: 'Strict adherence to subject combinations and high UTME score targets required for competitive courses.'
    },
    {
      id: 'OAU',
      name: 'Obafemi Awolowo University (OAU)',
      screeningType: 'Post-UTME Screening Exam',
      minJamb: '200+ UTME Cut-off',
      campaignBadge: 'OAU Cut-off Advisory',
      datesText: 'Session 2026/2027',
      description: 'Aggressive cut-off marks across Health Sciences and Technology faculties.'
    }
  ];

  const handleEvaluateProfile = (e) => {
    e.preventDefault();
    setEvaluated(true);
  };

  const activeInstObj = INSTITUTIONS.find(i => i.id === selectedInst) || INSTITUTIONS[0];

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
            { step: '01', title: '1-on-1 Consultation', desc: 'Evaluate academic performance and career ambitions.' },
            { step: '02', title: 'Profile & Cut-off Review', desc: 'Analyze target institution departmental cut-offs and quotas.' },
            { step: '03', title: 'Post-UTME Preparation', desc: 'Intensive speed CBT coaching targeting top marks.' },
            { step: '04', title: 'CAPS & Document Verification', desc: 'Ensure O\'Level results and personal details match.' },
            { step: '05', title: 'Change of Course / Varsity', desc: 'Execute timely portal adjustments if score requires realignment.' },
            { step: '06', title: 'Screening Clearance', desc: 'Physical and online document submission tracking.' },
            { step: '07', title: 'Admission Acceptance', desc: 'Accept offer on JAMB CAPS and generate official matriculation slip.' }
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/20">
                Step {item.step}
              </span>
              <h3 className="font-heading font-bold text-base text-white">{item.title}</h3>
              <p className="text-xs text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* INTERACTIVE SUBJECT COMBINATION & ELIGIBILITY SANDBOX */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
            <BookOpen size={13} className="text-blue-400" />
            <span>Interactive UTME Combination Validator</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Subject Combination & Course Mapping
          </h2>
          <p className="text-xs text-slate-400">
            A single mismatched subject can invalidate an admission bid. Use our selector below to test combinations against Nigerian university departmental requirements.
          </p>
        </div>

        <SubjectSelector
          maxSelection={4}
          selectedSubjectIds={sandboxSubjects}
          onChange={(newIds) => setSandboxSubjects(newIds)}
          title="UTME 4-Subject Eligibility Sandbox"
          subtitle="Select 4 subjects and see recommended target university courses below."
        />
      </div>

      {/* POST-UTME INSTITUTION HUB (UNILAG spotlight) */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-400/30 gold-glow space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
              Specialized Varsity Hub
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1">
              Institution Post-UTME Preparation
            </h2>
          </div>

          {/* Institution Switcher Pills */}
          <div className="flex flex-wrap gap-2">
            {INSTITUTIONS.map((inst) => (
              <button
                key={inst.id}
                onClick={() => setSelectedInst(inst.id)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl border transition ${
                  selectedInst === inst.id
                    ? 'bg-amber-400 text-slate-950 border-amber-400 shadow'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {inst.id}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Institution Banner */}
        <div className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase">
              {activeInstObj.campaignBadge}
            </span>
            
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
                <input
                  type="text"
                  required
                  placeholder="e.g. UNILAG"
                  value={formData.targetInstitution}
                  onChange={(e) => setFormData({ ...formData, targetInstitution: e.target.value })}
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
              <p className="text-emerald-400 font-bold">✓ High Admission Eligibility (78.5% Probability)</p>
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
