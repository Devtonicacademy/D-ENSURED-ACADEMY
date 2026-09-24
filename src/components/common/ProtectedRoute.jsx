import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ShieldAlert, Lock, ArrowRight, UserCheck } from '../icons/FontAwesomeIcons';

export default function ProtectedRoute({ 
  children, 
  allowedRoles = ['student', 'tutor', 'admin'],
  title = "Protected Portal",
  description = "Authentication is required to view this section."
}) {
  const { user, role, switchRole } = useAuth();
  const { openAuthModal, setActiveTab } = useApp();

  // 1. Not Authenticated Screen
  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center animate-fadeIn space-y-6">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-amber-400/30 shadow-2xl space-y-5">
          <div className="w-16 h-16 bg-amber-400/20 text-amber-400 border border-amber-400/40 rounded-full flex items-center justify-center mx-auto">
            <Lock size={30} />
          </div>

          <div className="space-y-2">
            <h2 className="font-heading font-extrabold text-2xl text-white">
              Authentication Required
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => openAuthModal('login')}
              className="px-6 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow transition flex items-center justify-center gap-2"
            >
              Sign In to Your Account <ArrowRight size={14} />
            </button>
            <button
              onClick={() => setActiveTab('HOME')}
              className="px-6 py-3 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Role Not Authorized Screen
  if (allowedRoles && !allowedRoles.includes(role)) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center animate-fadeIn space-y-6">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-rose-500/40 shadow-2xl space-y-5">
          <div className="w-16 h-16 bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert size={32} />
          </div>

          <div className="space-y-2">
            <h2 className="font-heading font-extrabold text-2xl text-white">
              Access Restricted
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Your account currently holds the <span className="text-amber-400 font-mono font-bold capitalize">{role}</span> role. This section requires <span className="text-white font-mono font-bold uppercase">{allowedRoles.join(' or ')}</span> authorization.
            </p>
          </div>

          {/* Quick RBAC Role Testing Switcher */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-left text-xs space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
              Role-Based Access Control Preview:
            </span>
            <div className="flex flex-wrap gap-2">
              {['student', 'tutor', 'admin'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => switchRole(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold capitalize transition ${
                    role === r 
                      ? 'bg-amber-400 text-slate-950 shadow' 
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  Test as {r}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => openAuthModal('login')}
              className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow transition"
            >
              Log In as Authorized User
            </button>
            <button
              onClick={() => setActiveTab(role === 'student' ? 'DASHBOARD' : 'HOME')}
              className="px-6 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition"
            >
              Go to My Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authorized — Render Child Components
  return children;
}
