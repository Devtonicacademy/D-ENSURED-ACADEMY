import React, { useState, useEffect } from 'react';
import { 
  SUBJECT_CATEGORIES, 
  AVAILABLE_SUBJECTS, 
  POPULAR_COMBINATIONS 
} from '../../data/subjectsData';
import { 
  Check, 
  RotateCcw, 
  BookOpen, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function SubjectSelector({
  maxSelection = 4,
  selectedSubjectIds = ['eng'],
  onChange,
  showPresets = true,
  title = "Select Your Subject Combination",
  subtitle = "Choose 4 subjects matching your intended course of study."
}) {
  const [selectedIds, setSelectedIds] = useState(selectedSubjectIds);
  const [activeCategory, setActiveCategory] = useState('ALL');

  useEffect(() => {
    if (selectedSubjectIds && selectedSubjectIds.length > 0) {
      setSelectedIds(selectedSubjectIds);
    }
  }, [selectedSubjectIds]);

  const toggleSubject = (subject) => {
    // English is usually compulsory in Nigerian UTME/SSCE
    if (subject.compulsory) {
      return;
    }

    let updated;
    if (selectedIds.includes(subject.id)) {
      updated = selectedIds.filter(id => id !== subject.id);
    } else {
      if (selectedIds.length >= maxSelection) {
        return; // Max reached
      }
      updated = [...selectedIds, subject.id];
    }

    setSelectedIds(updated);
    if (onChange) {
      onChange(updated);
    }
  };

  const handleReset = () => {
    // Keep compulsory subjects, reset rest
    const compulsoryOnly = AVAILABLE_SUBJECTS.filter(s => s.compulsory).map(s => s.id);
    setSelectedIds(compulsoryOnly);
    if (onChange) {
      onChange(compulsoryOnly);
    }
  };

  const applyPreset = (preset) => {
    setSelectedIds(preset.subjectIds);
    if (onChange) {
      onChange(preset.subjectIds);
    }
  };

  const filteredSubjects = AVAILABLE_SUBJECTS.filter(subject => {
    if (activeCategory === 'ALL') return true;
    return subject.category === activeCategory;
  });

  const isFull = selectedIds.length >= maxSelection;

  return (
    <div className="w-full space-y-5">
      {/* Header with counter badge & reset */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-amber-400" />
            <h4 className="font-heading font-bold text-sm text-white">{title}</h4>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Real-time Status Badge */}
          <div className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 ${
            isFull 
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' 
              : 'bg-amber-400/15 text-amber-300 border-amber-400/30'
          }`}>
            {isFull ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Sparkles size={14} className="text-amber-400" />}
            <span>{selectedIds.length} of {maxSelection} Subjects Selected</span>
          </div>

          {/* Reset button */}
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition flex items-center gap-1"
            title="Reset selections"
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline text-[11px]">Reset</span>
          </button>
        </div>
      </div>

      {/* Preset Quick Combinations */}
      {showPresets && (
        <div className="space-y-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles size={12} className="text-amber-400" /> Quick-Apply Recommended Combos:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_COMBINATIONS.map((preset, idx) => {
              const isMatch = preset.subjectIds.every(id => selectedIds.includes(id)) && selectedIds.length === preset.subjectIds.length;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className={`text-[11px] px-3 py-1 rounded-lg border transition ${
                    isMatch
                      ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-sm'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-amber-400/40 hover:text-white'
                  }`}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-800 pb-2">
        {SUBJECT_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              activeCategory === cat.id
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-80 overflow-y-auto pr-1">
        {filteredSubjects.map(subject => {
          const isSelected = selectedIds.includes(subject.id);
          const isDisabled = !isSelected && isFull;

          return (
            <div
              key={subject.id}
              onClick={() => !isDisabled && toggleSubject(subject)}
              className={`relative p-3 rounded-xl border text-left transition select-none cursor-pointer ${
                subject.compulsory
                  ? 'bg-brandBlue-950/40 border-brandBlue-500/50 shadow-inner ring-1 ring-brandBlue-500/40'
                  : isSelected
                    ? 'bg-amber-400/15 border-amber-400/80 shadow-md ring-1 ring-amber-400/50'
                    : isDisabled
                      ? 'bg-slate-950/40 border-slate-900 opacity-40 cursor-not-allowed'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-white">
                      {subject.name}
                    </span>
                    {subject.compulsory && (
                      <span className="text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.2 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded">
                        Compulsory
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-1">{subject.description}</p>
                </div>

                <div className="shrink-0 mt-0.5">
                  {subject.compulsory ? (
                    <div className="w-5 h-5 rounded-md bg-blue-500/20 border border-blue-400 text-blue-300 flex items-center justify-center">
                      <Lock size={12} />
                    </div>
                  ) : isSelected ? (
                    <div className="w-5 h-5 rounded-md bg-amber-400 text-slate-950 flex items-center justify-center shadow-sm">
                      <Check size={13} strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-md border border-slate-700 bg-slate-950/60" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Bar */}
      <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-mono text-[11px]">Selected:</span>
          <div className="flex flex-wrap gap-1">
            {selectedIds.map(id => {
              const match = AVAILABLE_SUBJECTS.find(s => s.id === id);
              return (
                <span key={id} className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-semibold px-2 py-0.5 rounded font-mono">
                  {match ? match.name : id}
                </span>
              );
            })}
          </div>
        </div>

        {!isFull ? (
          <span className="text-amber-400/90 text-[11px] font-mono flex items-center gap-1">
            <AlertCircle size={12} /> Select {maxSelection - selectedIds.length} more subject{maxSelection - selectedIds.length > 1 ? 's' : ''}
          </span>
        ) : (
          <span className="text-emerald-400 text-[11px] font-mono font-bold flex items-center gap-1">
            <CheckCircle2 size={13} /> Complete combination verified
          </span>
        )}
      </div>
    </div>
  );
}
