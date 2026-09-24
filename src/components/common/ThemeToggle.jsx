import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Monitor, Check } from 'lucide-react';

export default function ThemeToggle({ compact = false }) {
  const { theme, resolvedTheme, systemTheme, setTheme, cycleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeOptions = [
    {
      id: 'system',
      label: 'System Theme',
      description: `Follows your browser (${systemTheme})`,
      icon: Monitor
    },
    {
      id: 'dark',
      label: 'Dark Mode',
      description: 'Deep navy & gold glow',
      icon: Moon
    },
    {
      id: 'light',
      label: 'Light Mode',
      description: 'Clean crisp daylight',
      icon: Sun
    }
  ];

  const getActiveIcon = () => {
    if (theme === 'system') return Monitor;
    if (theme === 'light') return Sun;
    return Moon;
  };

  const ActiveIcon = getActiveIcon();

  return (
    <div className="relative inline-block text-left select-none" ref={containerRef}>
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-1.5 p-2 rounded-xl border border-slate-700/80 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition shadow-sm focus:outline-none focus:border-amber-400/60"
        title={`Theme: ${theme === 'system' ? `System (${resolvedTheme})` : theme}. Click to change.`}
        aria-label="Toggle color theme"
      >
        <ActiveIcon size={16} className={theme === 'light' ? 'text-amber-500' : 'text-amber-400'} />
        
        {!compact && (
          <span className="hidden sm:inline-block text-[11px] font-mono font-bold capitalize">
            {theme === 'system' ? `Auto (${systemTheme})` : theme}
          </span>
        )}

        {/* Small active system indicator dot */}
        {theme === 'system' && (
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Syncing with browser settings" />
        )}
      </button>

      {/* Theme Selection Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl shadow-2xl border border-slate-700/90 py-2 z-50 animate-fadeIn">
          <div className="px-3.5 py-1.5 border-b border-slate-800 text-[10px] font-mono uppercase tracking-wider text-slate-400">
            Appearance Setting
          </div>

          <div className="p-1 space-y-1">
            {themeOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = theme === opt.id;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setTheme(opt.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition ${
                    isSelected
                      ? 'bg-amber-400/15 border border-amber-400/40 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg ${
                      isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <Icon size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">{opt.label}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{opt.description}</p>
                    </div>
                  </div>

                  {isSelected && (
                    <Check size={14} className="text-amber-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Browser setting status notice */}
          <div className="px-3 pt-2 pb-1 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
            Browser prefers: <strong className="text-amber-300 capitalize">{systemTheme} Mode</strong>
          </div>
        </div>
      )}
    </div>
  );
}
