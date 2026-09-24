import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  BookOpen, 
  Award, 
  FileCheck, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Megaphone, 
  ShieldCheck, 
  BarChart3, 
  Settings,
  Edit
} from 'lucide-react';

export default function AdminDashboard() {
  const { serviceRequests, adminUpdateServiceStatus, campaigns, adminToggleCampaign, setActiveTab: setAppTab, openAuthModal } = useApp();
  const { user, isAdmin, switchRole } = useAuth();
  const [activeTab, setActiveTab] = useState('REQUESTS'); // 'REQUESTS' | 'CAMPAIGNS' | 'COURSES_ADMIN'

  // RBAC Access Guard: If not admin, render restricted access notice
  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 animate-fadeIn text-center space-y-6">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-rose-500/30 shadow-2xl space-y-5">
          <div className="w-16 h-16 bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck size={32} />
          </div>

          <h2 className="font-heading font-extrabold text-2xl text-white">
            Restricted Admin Area
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            You are currently signed in as a <span className="text-amber-400 font-mono font-bold capitalize">{user?.role || 'Guest'}</span>. This administrative control panel is restricted to authorized staff and management.
          </p>

          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs text-slate-400 text-left space-y-1">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block font-bold">Admin Demo Credentials:</span>
            <p>Email: <code className="text-white">admin@densuredconsult.com</code></p>
            <p>Password: <code className="text-white">admin123</code></p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => openAuthModal('login')}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow transition"
            >
              Log In as Administrator
            </button>
            <button
              onClick={() => setAppTab('DASHBOARD')}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-xl transition"
            >
              Return to Student Portal
            </button>
            <button
              onClick={() => switchRole('admin')}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-mono font-bold text-amber-300 border border-amber-400/30 bg-amber-400/10 rounded-xl hover:bg-amber-400/20 transition"
              title="Test role switcher"
            >
              Switch Role to Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Admin Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-400/30 gold-glow flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <img 
            src="/assets/ceo_akinjo_rotimi.jpg" 
            alt="Admin CEO" 
            className="w-16 h-16 rounded-full border-2 border-amber-400 object-cover shadow-lg"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase mb-1">
              <ShieldCheck size={12} /> Executive Control Panel
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              {user ? user.name : 'Akinjo Rotimi (CEO)'} — Admin Dashboard
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              D Ensured Consult Academy Management Portal • RC: 8723808
            </p>
          </div>
        </div>

        <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 text-xs font-mono text-slate-300">
          <span className="text-emerald-400 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
            <span>System Online</span>
          </span>
          <span>Role: Master Executive Admin</span>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Total Candidates</span>
          <p className="font-heading font-extrabold text-2xl text-amber-400 mt-1">1,420</p>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Service Requests</span>
          <p className="font-heading font-extrabold text-2xl text-blue-400 mt-1">{serviceRequests.length}</p>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Active Campaigns</span>
          <p className="font-heading font-extrabold text-2xl text-emerald-400 mt-1">
            {campaigns.filter(c => c.active).length} Active
          </p>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">CBT Questions Bank</span>
          <p className="font-heading font-extrabold text-2xl text-purple-400 mt-1">320 Items</p>
        </div>
      </div>

      {/* Admin Subtabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'REQUESTS', label: 'Service & Admission Requests' },
          { id: 'CAMPAIGNS', label: 'Promotional Campaign Manager' },
          { id: 'COURSES_ADMIN', label: 'Course & Question Bank' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
              activeTab === tab.id
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: SERVICE REQUESTS MANAGEMENT */}
      {activeTab === 'REQUESTS' && (
        <div className="space-y-4">
          <h3 className="font-heading font-bold text-lg text-white">Student Service & Consultancy Submissions</h3>
          
          <div className="space-y-3">
            {serviceRequests.map((req) => (
              <div key={req.id} className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400">{req.id}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{req.date}</span>
                  </div>
                  <h4 className="font-heading font-bold text-base text-white">{req.serviceTitle}</h4>
                  <p className="text-slate-300">
                    Student: <strong>{req.studentName}</strong> (Phone: {req.phone})
                  </p>
                  {(req.targetInstitution || req.targetCourse) && (
                    <p className="text-slate-400 font-mono text-[11px]">
                      Target: {req.targetInstitution} — {req.targetCourse}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400">Update Status:</span>
                  {['Pending', 'Processing', 'Completed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => adminUpdateServiceStatus(req.id, st)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition ${
                        req.status === st
                          ? 'bg-amber-400 text-slate-950 border-amber-400 shadow'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CAMPAIGN MANAGER */}
      {activeTab === 'CAMPAIGNS' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-white">Active Promotional Banners</h3>
          </div>

          <div className="space-y-4">
            {campaigns.map((camp) => (
              <div key={camp.id} className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      camp.active ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {camp.active ? 'Active on Homepage' : 'Paused'}
                    </span>
                    <span className="text-slate-400 font-mono">{camp.campaignDatesText}</span>
                  </div>
                  <h4 className="font-heading font-bold text-base text-white">{camp.title}</h4>
                  <p className="text-slate-300">{camp.badgeText}</p>
                </div>

                <button
                  onClick={() => adminToggleCampaign(camp.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition shadow ${
                    camp.active
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
                      : 'bg-emerald-600 text-white hover:bg-emerald-500'
                  }`}
                >
                  {camp.active ? 'Pause Campaign' : 'Publish Banner'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: COURSES & CBT QUESTION BANK */}
      {activeTab === 'COURSES_ADMIN' && (
        <div className="space-y-4">
          <h3 className="font-heading font-bold text-lg text-white">Course & CBT Question Bank Management</h3>
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-3">
            <p className="font-semibold text-amber-300">Question Bank Status:</p>
            <p>8 CBT Subjects Loaded with over 320 multiple-choice questions, detailed answer keys, and topic tags.</p>
            <div className="pt-2 flex gap-3">
              <button className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-xl">
                + Add New Question
              </button>
              <button className="px-4 py-2 bg-slate-900 border border-slate-700 text-white font-bold rounded-xl">
                Manage Course Syllabus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
