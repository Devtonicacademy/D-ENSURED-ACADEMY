import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import SubjectSelector from '../common/SubjectSelector';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  GraduationCap, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Calendar,
  Building,
  Users
} from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, authModalMode, setActiveTab } = useApp();
  const { login, register, loginWithGoogle } = useAuth();

  const [mode, setMode] = useState(authModalMode || 'login'); // 'login' | 'register'
  const [role, setRole] = useState('student'); // 'student' | 'admin'
  const [currentStep, setCurrentStep] = useState(1); // 1: Personal, 2: Contact/Guardian, 3: Track & Subjects, 4: Security

  // Form states
  const [formData, setFormData] = useState({
    // Step 1: Personal
    name: '',
    dob: '',
    gender: 'Male',
    stateOfOrigin: 'Lagos',

    // Step 2: Contact & Guardian
    email: '',
    phone: '',
    guardianName: '',
    guardianPhone: '',

    // Step 3: Exam Track & Subjects
    examTrack: 'JAMB UTME 2026',
    targetInstitution: 'University of Lagos (UNILAG)',
    targetCourse: 'Computer Science',
    selectedSubjectIds: ['eng', 'math', 'phy', 'chem'],

    // Step 4: Security
    password: '',
    confirmPassword: '',
    agreeTerms: true
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  // Social Login handler with Supabase OAuth
  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    setErrorMsg('');
    try {
      const res = await loginWithGoogle();
      if (res?.success) {
        setIsAuthModalOpen(false);
        setActiveTab(res.user?.role === 'admin' ? 'ADMIN' : 'DASHBOARD');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Google sign-in error.');
    } finally {
      setGoogleLoading(false);
    }
  };

  // Step Validation
  const validateStep = (step) => {
    setErrorMsg('');
    if (step === 1) {
      if (!formData.name.trim()) {
        setErrorMsg('Please enter your full legal name.');
        return false;
      }
      return true;
    }
    if (step === 2) {
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setErrorMsg('Please enter a valid email address.');
        return false;
      }
      if (!formData.phone.trim()) {
        setErrorMsg('Please enter your WhatsApp/phone number.');
        return false;
      }
      return true;
    }
    if (step === 3) {
      if (formData.selectedSubjectIds.length < 4) {
        setErrorMsg('Please select at least 4 examination subjects.');
        return false;
      }
      return true;
    }
    if (step === 4) {
      if (!formData.password || formData.password.length < 6) {
        setErrorMsg('Password must be at least 6 characters.');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return false;
      }
      if (!formData.agreeTerms) {
        setErrorMsg('Please agree to the student code of conduct.');
        return false;
      }
      return true;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    setCurrentStep(prev => prev - 1);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    if (!formData.email || !formData.password) {
      setErrorMsg('Please provide your email address and password.');
      setSubmitting(false);
      return;
    }

    try {
      const res = await login(formData.email, formData.password, role);
      if (res.success) {
        setIsAuthModalOpen(false);
        setActiveTab(res.user?.role === 'admin' ? 'ADMIN' : 'DASHBOARD');
      } else {
        setErrorMsg(res.error || 'Invalid login credentials.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;
    setSubmitting(true);

    try {
      const res = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        guardianName: formData.guardianName,
        guardianPhone: formData.guardianPhone,
        targetInstitution: formData.targetInstitution,
        targetCourse: formData.targetCourse,
        examTrack: formData.examTrack,
        selectedSubjects: formData.selectedSubjectIds,
        role: 'student'
      });

      if (res.success) {
        setIsAuthModalOpen(false);
        setActiveTab(res.user?.role === 'admin' ? 'ADMIN' : 'DASHBOARD');
      } else {
        setErrorMsg(res.error || 'Registration could not be completed.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className={`relative w-full ${mode === 'register' ? 'max-w-2xl' : 'max-w-md'} my-8 glass-panel rounded-3xl shadow-2xl border border-slate-700/80 overflow-hidden transition-all duration-300`}>
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-navy-950 via-brandBlue-900 to-navy-950 p-6 border-b border-slate-800 relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-3">
            <img 
              src="/assets/d_ensured_logo.jpg" 
              alt="D Ensured Logo" 
              className="w-11 h-11 rounded-full border-2 border-amber-400 shadow-md"
            />
            <div>
              <h3 className="font-heading font-extrabold text-lg text-white">
                {mode === 'login' ? 'Candidate & Staff Portal' : 'Student Academy Registration'}
              </h3>
              <p className="text-xs text-amber-400 font-mono">D Ensured Consult Academy • RC: 8723808</p>
            </div>
          </div>

          {/* Registration Multi-Step Progress Tracker */}
          {mode === 'register' && (
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono font-bold">
                {[
                  { step: 1, label: '1. Personal' },
                  { step: 2, label: '2. Contacts' },
                  { step: 3, label: '3. Subjects' },
                  { step: 4, label: '4. Security' }
                ].map((s) => (
                  <div key={s.step} className="space-y-1">
                    <div className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentStep >= s.step ? 'bg-amber-400' : 'bg-slate-800'
                    }`} />
                    <span className={currentStep === s.step ? 'text-amber-300' : 'text-slate-500'}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-5">
          
          {errorMsg && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs p-3 rounded-xl flex items-center gap-2 animate-shake">
              <ShieldAlert size={16} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick Social Authentication (Google) */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={googleLoading}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400/50 rounded-xl text-xs font-bold text-slate-200 transition flex items-center justify-center gap-2.5 shadow-sm"
            >
              {/* Google Colored Icon SVG */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{googleLoading ? 'Connecting Google Account...' : 'Continue with Google'}</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-[10px] font-mono text-slate-500 uppercase">Or Continue with Form</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>
          </div>

          {/* ===================== MODE: LOGIN ===================== */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Role selector */}
              <div className="flex gap-2 p-1 bg-slate-900/90 rounded-xl border border-slate-800">
                {['student', 'admin'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg capitalize transition ${
                      role === r 
                        ? 'bg-amber-400 text-slate-950 shadow' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {r === 'student' ? 'Student Candidate' : 'Staff / Admin'}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder={role === 'admin' ? 'admin@densuredconsult.com' : 'student@example.com'}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg transition"
              >
                Sign In to {role === 'admin' ? 'Admin Portal' : 'Student Portal'}
              </button>

              <div className="text-center pt-3 border-t border-slate-800">
                <p className="text-xs text-slate-400">
                  New student?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('register');
                      setCurrentStep(1);
                    }}
                    className="text-amber-400 font-bold hover:underline"
                  >
                    Start Multi-Step Enrollment
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* ===================== MODE: MULTI-STEP REGISTER ===================== */}
          {mode === 'register' && (
            <div className="space-y-5">
              
              {/* STEP 1: Personal Details */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                      Section 1 of 4: Personal Details
                    </span>
                    <p className="text-xs text-slate-400">Provide legal candidate details matching your JAMB / NIN profile.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Legal Name *</label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-3 text-slate-500" />
                      <input
                        type="text"
                        required
                        placeholder="Surname Firstname Middlename"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className="w-full px-3 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Gender</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full px-3 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                      >
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">State of Origin</label>
                      <input
                        type="text"
                        placeholder="e.g. Lagos, Ogun, Ondo"
                        value={formData.stateOfOrigin}
                        onChange={(e) => setFormData({ ...formData, stateOfOrigin: e.target.value })}
                        className="w-full px-3 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Contact & Guardian Info */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                      Section 2 of 4: Contact & Guardian Information
                    </span>
                    <p className="text-xs text-slate-400">Used for admission alerts, CBT portal access, and parent progress updates.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3 top-3 text-slate-500" />
                        <input
                          type="email"
                          required
                          placeholder="candidate@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-9 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Student WhatsApp Number *</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3 top-3 text-slate-500" />
                        <input
                          type="tel"
                          required
                          placeholder="08147896930"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-9 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Parent / Guardian Name</label>
                      <div className="relative">
                        <Users size={16} className="absolute left-3 top-3 text-slate-500" />
                        <input
                          type="text"
                          placeholder="Parent or Sponsor Full Name"
                          value={formData.guardianName}
                          onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                          className="w-full pl-9 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Guardian Phone Number</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3 top-3 text-slate-500" />
                        <input
                          type="tel"
                          placeholder="080XXXXXXXX"
                          value={formData.guardianPhone}
                          onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                          className="w-full pl-9 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Examination Track & Interactive Subject Combination Selector */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                      Section 3 of 4: Examination Track & Subject Choices
                    </span>
                    <p className="text-xs text-slate-400">Configure your examination path and subject combinations.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Exam Track</label>
                      <select
                        value={formData.examTrack}
                        onChange={(e) => setFormData({ ...formData, examTrack: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                      >
                        <option>JAMB UTME 2026</option>
                        <option>UNILAG Post-UTME 2026</option>
                        <option>WAEC / SSCE May/June</option>
                        <option>NECO SSCE</option>
                        <option>GCE Private Candidate</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Target Institution</label>
                      <input
                        type="text"
                        placeholder="e.g. UNILAG, LASU, UI"
                        value={formData.targetInstitution}
                        onChange={(e) => setFormData({ ...formData, targetInstitution: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Intended Course</label>
                      <input
                        type="text"
                        placeholder="e.g. Computer Science"
                        value={formData.targetCourse}
                        onChange={(e) => setFormData({ ...formData, targetCourse: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Integrated Interactive Subject Selector Cards */}
                  <div className="pt-2">
                    <SubjectSelector
                      maxSelection={4}
                      selectedSubjectIds={formData.selectedSubjectIds}
                      onChange={(newIds) => setFormData({ ...formData, selectedSubjectIds: newIds })}
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Security & Account Details */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                      Section 4 of 4: Security & Confirmation
                    </span>
                    <p className="text-xs text-slate-400">Create your private portal password to access CBT exams & class schedules.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Portal Password *</label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3 top-3 text-slate-500" />
                        <input
                          type="password"
                          required
                          placeholder="Minimum 6 characters"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="w-full pl-9 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm Password *</label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3 top-3 text-slate-500" />
                        <input
                          type="password"
                          required
                          placeholder="Re-enter password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="w-full pl-9 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary Review Card */}
                  <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs space-y-2">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">Registration Summary:</span>
                    <div className="grid grid-cols-2 gap-2 text-slate-300">
                      <div><strong className="text-white">Candidate:</strong> {formData.name || 'Not provided'}</div>
                      <div><strong className="text-white">Track:</strong> {formData.examTrack}</div>
                      <div><strong className="text-white">Institution:</strong> {formData.targetInstitution}</div>
                      <div><strong className="text-white">Course:</strong> {formData.targetCourse}</div>
                    </div>
                  </div>

                  <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer pt-2">
                    <input
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                      className="mt-0.5 rounded border-slate-700 text-amber-400 focus:ring-0"
                    />
                    <span>
                      I agree to the D Ensured Consult Academy code of conduct, academic guidelines, and admission terms.
                    </span>
                  </label>
                </div>
              )}

              {/* Navigation Controls: Back / Next / Submit */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-800">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="py-2.5 px-4 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition flex items-center gap-1.5"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Already have an account? Sign in
                  </button>
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="py-2.5 px-5 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-md transition flex items-center gap-1.5 ml-auto"
                  >
                    Next Section <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleRegisterSubmit}
                    className="py-3 px-6 text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-xl transition flex items-center gap-2 ml-auto"
                  >
                    <ShieldCheck size={16} /> Complete Registration & Enter Portal
                  </button>
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
