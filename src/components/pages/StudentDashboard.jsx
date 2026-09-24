import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { COURSES_LIST } from '../../data/coursesData';
import { 
  BookOpen, 
  Award, 
  Clock, 
  TrendingUp, 
  Flame, 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  FileCheck, 
  User, 
  ShieldCheck, 
  Bell, 
  Download, 
  Building2 
} from '../icons/FontAwesomeIcons';

export default function StudentDashboard() {
  const { setActiveTab, enrolledCourses, cbtAttempts, serviceRequests, openServiceModal } = useApp();
  const { user, updateProfile } = useAuth();

  const isTutor = user?.role === 'tutor';
  const isAdmin = user?.role === 'admin';

  const subtabs = [
    ...(isTutor ? [{ id: 'TUTOR_STUDENTS', label: 'Tutor Class Roster & Grading' }] : []),
    { id: 'COURSES', label: isTutor ? 'Assigned Prep Classes' : 'My Enrolled Courses' },
    { id: 'CBT_HISTORY', label: isTutor ? 'CBT Mock Proctoring' : 'CBT Test History' },
    { id: 'SERVICES_TRACK', label: 'Service Applications' },
    { id: 'PROFILE', label: 'Profile & Credentials' }
  ];

  const [activeSubTab, setActiveSubTab] = useState(isTutor ? 'TUTOR_STUDENTS' : 'COURSES');
  const [profileData, setProfileData] = useState({
    name: user ? user.name : '',
    targetInstitution: user ? user.targetInstitution || 'University of Lagos (UNILAG)' : 'UNILAG',
    targetCourse: user ? user.targetCourse || 'Computer Science' : 'Computer Science',
    targetJambScore: user ? user.targetJambScore || 320 : 320,
    phone: user ? user.phone : '08123456789'
  });

  // Keep profile state in sync when user signs in or switches
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        targetInstitution: user.targetInstitution || 'University of Lagos (UNILAG)',
        targetCourse: user.targetCourse || 'Computer Science',
        targetJambScore: user.targetJambScore || 320,
        phone: user.phone || '08123456789'
      });
    }
  }, [user]);

  const enrolledCourseObjs = COURSES_LIST.filter(c => enrolledCourses.includes(c.id));

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profileData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Admin Mode Quick Access Alert */}
      {isAdmin && (
        <div className="p-4 bg-amber-400/10 border border-amber-400/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-300">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-amber-400">👑</span>
            <span><strong>Administrator Preview Mode:</strong> You are viewing the candidate learning environment. Switch to Executive Admin Panel anytime.</span>
          </div>
          <button
            onClick={() => setActiveTab('ADMIN')}
            className="px-4 py-1.5 font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow text-xs whitespace-nowrap transition"
          >
            Open Executive Control Panel
          </button>
        </div>
      )}

      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-400/30 gold-glow flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <img 
            src={user ? user.avatar : '/assets/d_ensured_logo.jpg'} 
            alt="Profile" 
            className="w-16 h-16 rounded-full border-2 border-amber-400 object-cover shadow-lg" 
          />
          <div>
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase mb-1 ${
              isAdmin
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                : isTutor
                ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
                : 'bg-blue-400/20 text-blue-300 border border-blue-400/30'
            }`}>
              <ShieldCheck size={12} /> {isAdmin ? 'Administrator Access' : isTutor ? 'Tutor & Faculty Hub' : 'Student Learning Portal'}
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Welcome Back, {user ? user.name.split(' ')[0] : 'Scholar'}!
            </h1>
            <div className="text-xs text-slate-300 mt-0.5 flex flex-wrap items-center gap-1.5">
              {isTutor ? (
                <span>Assigned Specialty: <strong className="text-emerald-400 font-bold">Physics & Mathematics Coaching</strong> • 68 Students in Cohort</span>
              ) : (
                <>
                  <span>Target: <strong className="text-amber-400 font-bold">{user ? user.targetCourse : 'Course'}</strong> at <strong className="text-amber-400 font-bold">{user ? user.targetInstitution : 'Varsity'}</strong> (Goal UTME: {user ? user.targetJambScore : 320})</span>
                  {user?.targetInstitution && (
                    <button
                      onClick={() => setActiveTab('ADMISSIONS')}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/30 text-[10px] font-mono font-bold transition ml-1"
                      title="Explore Post-UTME screening requirements for your varsity in the Specialized Varsity Hub"
                    >
                      <Building2 size={10} /> View Varsity Hub &rarr;
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Quick Streak & Stats */}
        <div className="flex items-center gap-4 bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 font-mono text-xs text-slate-200">
          <div className="flex items-center gap-2 pr-4 border-r border-slate-800">
            <Flame className="text-amber-400" size={20} />
            <div>
              <span className="block font-extrabold text-amber-400 text-sm">14 Days</span>
              <span className="text-[10px] text-slate-400">Study Streak</span>
            </div>
          </div>
          <div className="flex items-center gap-2 pl-2">
            <Award className="text-emerald-400" size={20} />
            <div>
              <span className="block font-extrabold text-emerald-400 text-sm">{cbtAttempts.length} Tests</span>
              <span className="text-[10px] text-slate-400">Completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Enrolled Prep Courses</span>
          <p className="font-heading font-extrabold text-2xl text-amber-400 mt-1">{enrolledCourses.length}</p>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">CBT Tests Attempted</span>
          <p className="font-heading font-extrabold text-2xl text-blue-400 mt-1">{cbtAttempts.length}</p>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Active Service Requests</span>
          <p className="font-heading font-extrabold text-2xl text-emerald-400 mt-1">{serviceRequests.length}</p>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Certificates Issued</span>
          <p className="font-heading font-extrabold text-2xl text-purple-400 mt-1">1 Official</p>
        </div>
      </div>

      {/* Subtab Switcher Bar */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {subtabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
              activeSubTab === tab.id
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SUBTAB: TUTOR CLASS ROSTER & GRADING (Tutor Role only) */}
      {activeSubTab === 'TUTOR_STUDENTS' && isTutor && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-bold text-lg text-white">Assigned Student Cohort & Mock Grading</h3>
              <p className="text-xs text-slate-400">Review student performance, evaluate mock submissions, and input academic feedback.</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full font-mono text-xs font-bold self-start">
              68 Candidates Assigned
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Class Average Mock Score</span>
              <p className="font-heading font-extrabold text-2xl text-emerald-400 mt-1">278.4 / 400</p>
              <span className="text-[10px] text-emerald-400 font-mono">+18 pts this month</span>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Pending Review Submissions</span>
              <p className="font-heading font-extrabold text-2xl text-amber-400 mt-1">12 Scripts</p>
              <span className="text-[10px] text-amber-300 font-mono">Use of English & Physics</span>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Next Live Drill Class</span>
              <p className="font-heading font-extrabold text-xl text-white mt-1">Today, 3:00 PM</p>
              <span className="text-[10px] text-blue-400 font-mono">Physics Optics & Waves Drill</span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 font-heading font-bold text-sm text-white">
              Recent Candidate Mock Examinations
            </div>
            <div className="divide-y divide-slate-800/80 text-xs">
              {[
                { name: 'Olamide Adebayo', exam: 'JAMB Mock #4', score: '325/400 (81%)', status: 'Graded', date: 'Yesterday' },
                { name: 'Chinedu Okonkwo', exam: 'UNILAG Mock #2', score: '27/30 (90%)', status: 'Graded', date: '2 Days ago' },
                { name: 'Blessing Chukwuma', exam: 'JAMB Mock #4', score: '302/400 (75%)', status: 'Graded', date: '3 Days ago' },
                { name: 'Emmanuel Folorunsho', exam: 'Physics Practice #8', score: 'Awaiting Grading', status: 'Review Needed', date: '4 Hours ago' }
              ].map((row, idx) => (
                <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-900/60 transition">
                  <div>
                    <h5 className="font-bold text-white text-sm">{row.name}</h5>
                    <p className="text-slate-400 text-xs font-mono">{row.exam} • Submitted {row.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-amber-300 text-xs">{row.score}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      row.status === 'Graded' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300 animate-pulse'
                    }`}>
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 1: ENROLLED COURSES */}
      {activeSubTab === 'COURSES' && (
        <div className="space-y-6">
          <h3 className="font-heading font-bold text-lg text-white">Active Curriculum Programs</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourseObjs.map((course) => (
              <div key={course.id} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">{course.examType}</span>
                    <h4 className="font-heading font-bold text-base text-white mt-0.5">{course.title}</h4>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    Enrolled
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>Syllabus Completion</span>
                    <span className="text-amber-400 font-bold">68%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full w-[68%]" />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">{course.format}</span>
                  <button
                    onClick={() => setActiveTab('CBT')}
                    className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition flex items-center gap-1.5"
                  >
                    <Play size={14} /> Continue Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 2: CBT TEST HISTORY */}
      {activeSubTab === 'CBT_HISTORY' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-white">Your CBT Attempt History</h3>
            <button
              onClick={() => setActiveTab('CBT')}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 rounded-xl"
            >
              Take New Test
            </button>
          </div>

          <div className="space-y-3">
            {cbtAttempts.map((attempt) => (
              <div key={attempt.id} className="glass-card p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">{attempt.date}</span>
                  <h4 className="font-heading font-bold text-sm text-white mt-0.5">{attempt.subjectName}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Time Spent: {attempt.timeSpent}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-heading font-extrabold text-lg text-amber-400 block">{attempt.percentage}%</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">{attempt.grade}</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('CBT')}
                    className="p-2 bg-slate-900 text-slate-300 hover:text-white rounded-lg border border-slate-700"
                    title="Retake Test"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: SERVICES APPLICATION TRACKER */}
      {activeSubTab === 'SERVICES_TRACK' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-white">Submitted Admission & Documentation Requests</h3>
            <button
              onClick={() => setActiveTab('SERVICES')}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-900 border border-slate-700 rounded-xl hover:bg-slate-800"
            >
              Request New Service
            </button>
          </div>

          <div className="space-y-3">
            {serviceRequests.map((req) => (
              <div key={req.id} className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-mono font-bold">{req.id}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{req.date}</span>
                  </div>
                  <h4 className="font-heading font-bold text-base text-white mt-1">{req.serviceTitle}</h4>
                  <p className="text-slate-400 mt-0.5">Candidate: {req.studentName} ({req.phone})</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full font-mono text-xs font-bold border ${
                    req.status === 'Processing'
                      ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                      : req.status === 'Completed'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}>
                    Status: {req.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: PROFILE SETTINGS */}
      {activeSubTab === 'PROFILE' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 max-w-xl mx-auto">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-white">Target Academic Profile</h3>
            {profileData.targetInstitution && (
              <button
                type="button"
                onClick={() => setActiveTab('ADMISSIONS')}
                className="text-xs text-amber-400 font-bold hover:underline inline-flex items-center gap-1"
              >
                <Building2 size={12} /> Open in Varsity Hub
              </button>
            )}
          </div>
          
          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target University</label>
                <input
                  type="text"
                  value={profileData.targetInstitution}
                  onChange={(e) => setProfileData({ ...profileData, targetInstitution: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Course</label>
                <input
                  type="text"
                  value={profileData.targetCourse}
                  onChange={(e) => setProfileData({ ...profileData, targetCourse: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target UTME Score</label>
                <input
                  type="number"
                  value={profileData.targetJambScore}
                  onChange={(e) => setProfileData({ ...profileData, targetJambScore: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">WhatsApp Phone</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 font-bold text-slate-950 bg-amber-400 rounded-xl hover:bg-amber-300 transition"
            >
              Save Profile Settings
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
