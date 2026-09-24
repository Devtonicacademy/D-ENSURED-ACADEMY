import React from 'react';
import { X, Trophy, Flame, Target, Clock, Trash2, Award } from 'lucide-react';

export default function StatsModal({ isOpen, onClose, stats, onResetStats }) {
  if (!isOpen) return null;

  const winRate = stats.gamesPlayed > 0 
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
      <div className="w-full max-w-md glass-panel rounded-3xl p-6 border border-indigo-500/30 shadow-2xl relative flex flex-col gap-5">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-900/60 text-indigo-400 border border-indigo-500/30">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Player Statistics</h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          
          <div className="glass-card p-4 rounded-2xl flex flex-col gap-1 border border-indigo-500/10">
            <span className="text-xs font-bold text-slate-400">Played</span>
            <span className="text-2xl font-black text-white">{stats.gamesPlayed}</span>
          </div>

          <div className="glass-card p-4 rounded-2xl flex flex-col gap-1 border border-indigo-500/10">
            <span className="text-xs font-bold text-slate-400">Win Rate</span>
            <span className="text-2xl font-black text-emerald-400">{winRate}%</span>
          </div>

          <div className="glass-card p-4 rounded-2xl flex flex-col gap-1 border border-indigo-500/10">
            <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>High Score</span>
            </div>
            <span className="text-2xl font-black text-amber-300">{stats.highScore}</span>
          </div>

          <div className="glass-card p-4 rounded-2xl flex flex-col gap-1 border border-indigo-500/10">
            <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Best Streak</span>
            </div>
            <span className="text-2xl font-black text-amber-400">{stats.bestStreak}</span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            onClick={onResetStats}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Reset Stats
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
