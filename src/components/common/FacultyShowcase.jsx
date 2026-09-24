import React from 'react';
import { FACULTY_MEMBERS } from '../../data/facultyData';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  GraduationCap, 
  Sparkles,
  UserCheck,
  TrendingUp
} from 'lucide-react';

export default function FacultyShowcase({
  title = "Founder, Leadership & Expert Faculty",
  subtitle = "Learn from demystifiers, licensed educationists, and subject-matter evaluators with a proven record of 300+ UTME scores."
}) {
  return (
    <div className="w-full space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
          <Award size={13} className="text-amber-400" />
          <span>Academic Leadership & Mentors</span>
        </div>

        <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-300">
          {subtitle}
        </p>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FACULTY_MEMBERS.map((faculty) => (
          <div
            key={faculty.id}
            className="glass-panel rounded-3xl border border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-amber-400/40 hover:shadow-2xl transition duration-300"
          >
            <div>
              {/* Faculty Image Header */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={faculty.image}
                  alt={faculty.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                
                {/* Role Pill */}
                <span className="absolute top-3 left-3 bg-amber-400 text-slate-950 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono shadow">
                  {faculty.role}
                </span>

                {/* Tags on bottom image */}
                <div className="absolute bottom-2 left-3 right-3 flex flex-wrap gap-1">
                  {faculty.tags.map((tag, i) => (
                    <span key={i} className="text-[9px] font-mono bg-slate-950/80 text-amber-300 border border-slate-700 px-2 py-0.5 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-5 space-y-3">
                <div>
                  <h4 className="font-heading font-extrabold text-base text-white group-hover:text-amber-300 transition-colors">
                    {faculty.name}
                  </h4>
                  <p className="text-xs text-amber-400 font-mono mt-0.5">{faculty.title}</p>
                </div>

                {/* Credentials */}
                <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                    <GraduationCap size={13} className="text-blue-400 shrink-0" />
                    <span className="truncate">{faculty.credentials}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono">
                    <Award size={12} className="text-amber-400 shrink-0" />
                    <span>{faculty.experience}</span>
                  </div>
                </div>

                {/* Bio text */}
                <p className="text-xs text-slate-300/90 leading-relaxed line-clamp-3">
                  {faculty.bio}
                </p>

                {/* Specialization highlights */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    Core Specialization:
                  </span>
                  <p className="text-[11px] text-slate-300 font-medium leading-snug">
                    {faculty.specialization}
                  </p>
                </div>
              </div>
            </div>

            {/* Verified Student Stat Footer */}
            <div className="p-4 pt-3 border-t border-slate-800/80 bg-slate-950/40">
              <div className="flex items-start gap-1.5 text-[11px] text-emerald-400 font-mono">
                <TrendingUp size={13} className="shrink-0 mt-0.5" />
                <span className="leading-tight">{faculty.stats}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
