import React from 'react';
import { 
  Star, 
  Clock, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  BookOpen,
  Laptop
} from 'lucide-react';

export default function ProgramCard({
  course,
  onEnroll,
  onViewCurriculum,
  compact = false
}) {
  const {
    title,
    examType,
    category,
    duration,
    format,
    price,
    originalPrice,
    rating,
    enrolledCount,
    cbtIncluded,
    weeklyPracticals,
    highlightBadge,
    categoryTag,
    corePillars = [],
    image,
    tutor,
    description,
    subjects = []
  } = course;

  // Determine badge styling
  const getBadgeStyle = (badge) => {
    switch (badge) {
      case 'Most Popular':
        return 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/20';
      case 'Final Hurdle':
        return 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/20';
      case 'Foundation & Mastery':
        return 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-lg shadow-emerald-500/20';
      default:
        return 'bg-amber-400 text-slate-950 font-bold';
    }
  };

  return (
    <div className="glass-panel rounded-3xl border border-slate-800/90 overflow-hidden flex flex-col justify-between group hover:border-amber-400/50 hover:shadow-2xl hover:shadow-brandBlue-900/30 transition-all duration-300">
      <div>
        {/* Course Banner Image & Badges */}
        <div className="relative h-52 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
          
          {/* Top Left Exam Badge */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
            <span className="bg-slate-900/90 text-amber-400 border border-amber-400/30 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
              {examType}
            </span>
            {categoryTag && (
              <span className="bg-slate-900/80 text-blue-300 border border-slate-700 font-mono text-[9px] px-2 py-0.5 rounded-full hidden sm:inline-block">
                {categoryTag}
              </span>
            )}
          </div>

          {/* Top Right Highlight Badge */}
          {highlightBadge && (
            <span className={`absolute top-3 right-3 text-[10px] px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 ${getBadgeStyle(highlightBadge)}`}>
              <Sparkles size={11} /> {highlightBadge}
            </span>
          )}

          {/* Bottom Banner Indicators */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300 font-mono">
            <span className="flex items-center gap-1 bg-slate-950/80 px-2 py-0.5 rounded-md border border-slate-800">
              <Clock size={11} className="text-amber-400" /> {duration}
            </span>
            <span className="flex items-center gap-1 bg-slate-950/80 px-2 py-0.5 rounded-md border border-slate-800">
              <Users size={11} className="text-blue-400" /> {enrolledCount}+ Students
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {/* Tutor & Rating Header */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="text-amber-400/90 font-semibold">{tutor}</span>
            <span className="flex items-center gap-1 font-bold text-slate-200">
              <Star size={13} className="fill-amber-400 text-amber-400" /> {rating}
            </span>
          </div>

          {/* Course Title */}
          <h3 className="font-heading font-extrabold text-lg text-white group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
            {title}
          </h3>

          <p className="text-xs text-slate-300/90 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Core Curriculum Pillars List */}
          {corePillars.length > 0 && (
            <div className="pt-2 space-y-2 border-t border-slate-800/80">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                Core Curriculum Pillars:
              </span>
              <ul className="space-y-1.5">
                {corePillars.slice(0, 3).map((pillar, i) => (
                  <li key={i} className="text-[11px] text-slate-300 flex items-start gap-2 leading-tight">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pillar}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Subject Tags */}
          <div className="pt-1">
            <div className="flex flex-wrap gap-1">
              {subjects.slice(0, 4).map((sub, i) => (
                <span key={i} className="text-[10px] font-mono text-slate-300 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                  {sub}
                </span>
              ))}
              {subjects.length > 4 && (
                <span className="text-[10px] font-mono text-amber-400 bg-slate-900 px-1.5 py-0.5 rounded">
                  +{subjects.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Pricing & Dual CTAs */}
      <div className="p-6 pt-4 border-t border-slate-800/90 bg-slate-950/40 space-y-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[10px] text-slate-500 font-mono uppercase block">Tuition Investment</span>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-xl text-amber-400">{price}</span>
              {originalPrice && (
                <span className="text-xs text-slate-500 line-through font-mono">{originalPrice}</span>
              )}
            </div>
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {format}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => onViewCurriculum && onViewCurriculum(course)}
            className="py-2.5 px-3 text-xs font-bold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition text-center"
          >
            View Details
          </button>
          <button
            type="button"
            onClick={() => onEnroll && onEnroll(course)}
            className="py-2.5 px-3 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
          >
            Enroll Now <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
