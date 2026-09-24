import React from 'react';
import { ACADEMY_METRICS } from '../../data/facultyData';
import { 
  Trophy, 
  Users, 
  CheckCircle2, 
  TrendingUp,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

const METRIC_ICONS = [
  ShieldCheck,
  TrendingUp,
  Trophy,
  Users
];

export default function MetricCounterGrid() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {ACADEMY_METRICS.map((metric, idx) => {
          const Icon = METRIC_ICONS[idx] || Sparkles;
          return (
            <div
              key={idx}
              className="glass-card p-5 sm:p-6 rounded-3xl border border-slate-800 hover:border-amber-400/40 hover:shadow-xl transition duration-300 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded-xl group-hover:bg-amber-400 group-hover:text-slate-950 transition">
                  <Icon size={20} />
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Verified Metric
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="font-heading font-black text-2xl sm:text-4xl text-white group-hover:text-amber-300 transition-colors tracking-tight">
                  {metric.value}
                </h4>
                <p className="text-xs sm:text-sm font-bold text-slate-200">
                  {metric.label}
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  {metric.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
