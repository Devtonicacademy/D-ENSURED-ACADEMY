import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { 
  PhoneCall, 
  LogOut, 
  Menu, 
  X, 
  LayoutDashboard,
  ChevronDown,
  Sparkles,
  ArrowRight,
  GraduationCap,
  BellRing
} from '../icons/FontAwesomeIcons';

export default function Navbar() {
  const { activeTab, setActiveTab, openAuthModal } = useApp();
  const { user, logout, switchRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  const ANNOUNCEMENTS = [
    { tag: 'UNILAG 2026 PREP', text: 'Post-UTME Target 25/30 Mastery Classes Live! Reserve slot today.' },
    { tag: 'JAMB CAPS VERIFICATION', text: 'O\'Level Upload & Change of Course advisory desk active at Doyin Plaza.' },
    { tag: 'NEW SESSION ENROLLMENT', text: 'Morning (9am-1pm) & Evening (3pm-6:30pm) coaching batches now admitting.' }
  ];

  // Rotate announcement ticker every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [ANNOUNCEMENTS.length]);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      const insideDesktop = desktopDropdownRef.current && desktopDropdownRef.current.contains(e.target);
      const insideMobile = mobileDropdownRef.current && mobileDropdownRef.current.contains(e.target);
      if (!insideDesktop && !insideMobile) {
        setUserDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setUserDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    if (userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [userDropdownOpen]);

  // Close mobile menu on screen resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: 'HOME', label: 'HOME' },
    { id: 'ABOUT', label: 'ABOUT' },
    { id: 'COURSES', label: 'COURSES' },
    { id: 'SERVICES', label: 'SERVICES' },
    { id: 'CBT', label: 'CBT' },
    { id: 'ADMISSIONS', label: 'ADMISSIONS' },
    { id: 'RESULTS', label: 'RESULTS' },
    { id: 'BLOG', label: 'RESOURCES' },
    { id: 'CONTACT', label: 'CONTACT' },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full max-w-full glass-panel border-b border-slate-800/80 shadow-2xl">
      {/* Top Banner Notice / Announcement Ticker */}
      <div className="bg-gradient-to-r from-navy-950 via-brandBlue-950 to-navy-950 text-xs py-1.5 px-3 sm:px-6 text-slate-300 border-b border-slate-800/60 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-4 text-[11px] sm:text-xs">
          
          {/* Dynamic Announcement Ticker */}
          <div className="flex items-center gap-2 truncate max-w-full cursor-pointer" onClick={() => handleNavClick('ADMISSIONS')}>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 font-black px-2 py-0.5 rounded text-[9px] sm:text-[10px] uppercase shrink-0 font-mono flex items-center gap-1">
              <BellRing size={10} className="text-amber-400 animate-pulse" />
              {ANNOUNCEMENTS[tickerIndex].tag}
            </span>
            <span className="truncate text-slate-200 transition-opacity duration-300">
              {ANNOUNCEMENTS[tickerIndex].text}
            </span>
          </div>

          {/* Contact & Registration Number */}
          <div className="flex items-center gap-3 font-semibold text-slate-200 shrink-0">
            <a href="tel:08147896930" className="hover:text-amber-400 transition flex items-center gap-1 text-amber-300">
              <PhoneCall size={11} className="text-amber-400" /> 08147896930
            </a>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400 font-mono text-[10px] sm:text-[11px]">RC: 8723808</span>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-16 sm:h-20 flex items-center justify-between gap-1 sm:gap-2">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('HOME')}
          className="flex items-center gap-2 cursor-pointer group select-none shrink-0"
        >
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full p-0.5 bg-gradient-to-br from-amber-400 via-brandBlue-500 to-amber-500 shadow-md group-hover:scale-105 transition-transform shrink-0">
            <img 
              src="/assets/d_ensured_logo.jpg" 
              alt="D Ensured Consult Logo" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-sm sm:text-base lg:text-lg tracking-tight text-white group-hover:text-amber-300 transition-colors leading-tight whitespace-nowrap">
              D ENSURED <span className="text-amber-400">CONSULT</span>
            </span>
            <span className="text-[9px] xl:text-[10px] font-semibold tracking-wider text-blue-300/90 uppercase font-mono hidden xl:inline-block truncate">
              “We set the pace, others follow.”
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links (Visible >= 1024px) */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 shrink-0">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-1.5 xl:px-2.5 py-1.5 text-[11px] xl:text-xs font-bold tracking-normal xl:tracking-wider rounded-lg transition-all duration-200 whitespace-nowrap ${
                  isActive 
                    ? 'text-amber-400 bg-amber-400/10 border border-amber-400/30 shadow-inner' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop CTAs & Auth (Visible >= 1024px) */}
        <div className="hidden lg:flex items-center gap-1.5 shrink-0 ml-1">
          <button
            onClick={() => openAuthModal('register')}
            className="px-2.5 xl:px-3 py-1.5 text-[10px] xl:text-[11px] font-black text-slate-950 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-md transition transform hover:-translate-y-0.5 whitespace-nowrap flex items-center gap-1"
          >
            <Sparkles size={12} /> ENROLL NOW
          </button>

          {user ? (
            <div className="relative" ref={desktopDropdownRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setUserDropdownOpen((prev) => !prev);
                }}
                className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full glass-card border border-amber-500/30 hover:border-amber-400/60 transition cursor-pointer select-none"
                aria-expanded={userDropdownOpen}
                aria-label="User account menu"
              >
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-6 h-6 rounded-full object-cover border border-amber-400"
                />
                <span className="text-[10px] xl:text-[11px] font-semibold text-amber-300 truncate max-w-[70px]">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown 
                  size={12} 
                  className={`text-slate-400 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180 text-amber-400' : ''}`} 
                />
              </button>

              {userDropdownOpen && (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 top-full mt-2 w-64 bg-slate-900/98 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-700/80 py-2.5 z-[60] animate-fadeIn"
                >
                  <div className="px-3.5 py-2 border-b border-slate-800">
                    <p className="text-xs font-bold text-white truncate">{user.name}</p>
                    {user.email && <p className="text-[10px] text-slate-400 truncate">{user.email}</p>}
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                        user.role === 'admin'
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                          : user.role === 'tutor'
                          ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
                          : 'bg-blue-400/20 text-blue-300 border border-blue-400/30'
                      }`}>
                        {user.role === 'admin' ? 'Administrator' : user.role === 'tutor' ? 'Tutor / Faculty' : 'Student'}
                      </span>
                      {user.targetInstitution && (
                        <span className="text-[9px] text-slate-400 truncate font-mono">
                          • {user.targetInstitution}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="py-1">
                    {/* Primary Role Destination */}
                    {user.role === 'admin' && (
                      <button
                        onClick={() => {
                          setActiveTab('ADMIN');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs font-semibold text-amber-300 hover:bg-slate-800 flex items-center gap-2 transition"
                      >
                        <LayoutDashboard size={14} className="text-amber-400" />
                        Executive Control Panel
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setActiveTab('DASHBOARD');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 flex items-center gap-2 transition"
                    >
                      <LayoutDashboard size={14} className="text-amber-400" />
                      {user.role === 'admin' ? 'Candidate Dashboard View' : user.role === 'tutor' ? 'Tutor Hub & Class Roster' : 'Student Learning Dashboard'}
                    </button>
                  </div>

                  {/* Quick Role Switcher for live testing */}
                  <div className="px-3.5 py-2 border-t border-slate-800/80 bg-slate-900/50">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                      Switch Role (RBAC Demo):
                    </span>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { id: 'student', label: 'Student' },
                        { id: 'tutor', label: 'Tutor' },
                        { id: 'admin', label: 'Admin' }
                      ].map((r) => (
                        <button
                          key={r.id}
                          onClick={() => {
                            switchRole(r.id);
                            if (r.id === 'admin') setActiveTab('ADMIN');
                            else setActiveTab('DASHBOARD');
                            setUserDropdownOpen(false);
                          }}
                          className={`py-1 text-[10px] font-bold rounded-lg transition text-center ${
                            user.role === r.id
                              ? 'bg-amber-400 text-slate-950 font-black shadow'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-1 border-t border-slate-800/80">
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition"
                    >
                      <LogOut size={14} /> Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="px-2.5 py-1.5 text-[10px] xl:text-[11px] font-bold text-amber-400 hover:text-amber-300 bg-amber-400/10 border border-amber-400/30 rounded-lg hover:bg-amber-400/20 transition whitespace-nowrap flex items-center gap-1"
            >
              <GraduationCap size={13} /> STUDENT PORTAL LOGIN
            </button>
          )}
        </div>

        {/* Mobile / Tablet Header Right Controls (< 1024px) */}
        <div className="flex lg:hidden items-center gap-1.5 shrink-0">
          <button
            onClick={() => openAuthModal('register')}
            className="px-2 py-1.5 text-[11px] font-black text-slate-950 bg-amber-400 rounded-lg flex items-center gap-1 shadow"
          >
            <span>Enroll</span>
          </button>

          {user ? (
            <div className="relative" ref={mobileDropdownRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setUserDropdownOpen((prev) => !prev);
                }}
                className="flex items-center gap-1 px-2 py-1 rounded-full glass-card border border-amber-500/30 hover:border-amber-400/60 transition cursor-pointer"
                aria-expanded={userDropdownOpen}
                aria-label="User account menu"
              >
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-5 h-5 rounded-full object-cover border border-amber-400"
                />
                <span className="text-[10px] font-semibold text-amber-300 truncate max-w-[50px] sm:max-w-[70px]">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown 
                  size={11} 
                  className={`text-slate-400 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180 text-amber-400' : ''}`} 
                />
              </button>

              {userDropdownOpen && (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 top-full mt-2 w-64 bg-slate-900/98 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-700/80 py-2.5 z-[60] animate-fadeIn"
                >
                  <div className="px-3.5 py-2 border-b border-slate-800">
                    <p className="text-xs font-bold text-white truncate">{user.name}</p>
                    {user.email && <p className="text-[10px] text-slate-400 truncate">{user.email}</p>}
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                        user.role === 'admin'
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                          : user.role === 'tutor'
                          ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
                          : 'bg-blue-400/20 text-blue-300 border border-blue-400/30'
                      }`}>
                        {user.role === 'admin' ? 'Administrator' : user.role === 'tutor' ? 'Tutor / Faculty' : 'Student'}
                      </span>
                      {user.targetInstitution && (
                        <span className="text-[9px] text-slate-400 truncate font-mono">
                          • {user.targetInstitution}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="py-1">
                    {user.role === 'admin' && (
                      <button
                        onClick={() => {
                          setActiveTab('ADMIN');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs font-semibold text-amber-300 hover:bg-slate-800 flex items-center gap-2"
                      >
                        <LayoutDashboard size={14} className="text-amber-400" />
                        Executive Control Panel
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setActiveTab('DASHBOARD');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <LayoutDashboard size={14} className="text-amber-400" />
                      {user.role === 'admin' ? 'Candidate Dashboard View' : user.role === 'tutor' ? 'Tutor Hub & Class Roster' : 'Student Learning Dashboard'}
                    </button>
                  </div>

                  <div className="px-3.5 py-2 border-t border-slate-800/80 bg-slate-900/50">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                      Switch Role (RBAC Demo):
                    </span>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { id: 'student', label: 'Student' },
                        { id: 'tutor', label: 'Tutor' },
                        { id: 'admin', label: 'Admin' }
                      ].map((r) => (
                        <button
                          key={r.id}
                          onClick={() => {
                            switchRole(r.id);
                            if (r.id === 'admin') setActiveTab('ADMIN');
                            else setActiveTab('DASHBOARD');
                            setUserDropdownOpen(false);
                          }}
                          className={`py-1 text-[10px] font-bold rounded-lg transition text-center ${
                            user.role === r.id
                              ? 'bg-amber-400 text-slate-950 font-black shadow'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-1 border-t border-slate-800/80">
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 flex items-center gap-2"
                    >
                      <LogOut size={14} /> Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="px-2 py-1.5 text-[11px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-lg"
            >
              Login
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu (< 1024px) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-navy-950/98 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {user && (
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2.5">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-amber-400 object-cover" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{user.name}</p>
                  <span className="text-[10px] text-amber-300 font-mono capitalize">
                    {user.role === 'admin' ? 'Administrator' : user.role === 'tutor' ? 'Faculty / Tutor' : 'Student Portal'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 pt-1 border-t border-slate-800">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveTab(user.role === 'admin' ? 'ADMIN' : 'DASHBOARD');
                  }}
                  className="flex-1 py-1.5 text-[11px] font-bold rounded-lg bg-amber-400 text-slate-950 text-center"
                >
                  Go to Portal
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="px-3 py-1.5 text-[11px] font-bold rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/30"
                >
                  Log Out
                </button>
              </div>
            </div>
          )}

          <nav className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-left text-xs font-bold rounded-lg transition ${
                    isActive
                      ? 'text-amber-400 bg-amber-400/10 border border-amber-400/30'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAuthModal('register');
              }}
              className="w-full py-2.5 text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl shadow text-center"
            >
              ENROLL IN PREP CLASSES NOW
            </button>

            {!user && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full py-2.5 text-xs font-bold text-amber-300 border border-amber-400/30 bg-amber-400/10 rounded-xl text-center"
              >
                STUDENT PORTAL LOGIN
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
