import React from 'react';
import { 
  Trophy, 
  Flame, 
  Volume2, 
  VolumeX, 
  Upload, 
  BarChart2, 
  Settings, 
  Sparkles,
  Zap,
  Clock,
  Coffee
} from 'lucide-react';

export default function Header({
  score,
  streak,
  soundMuted,
  onToggleSound,
  onOpenUpload,
  onOpenStats,
  onOpenSettings,
  gameMode,
  onChangeGameMode,
  selectedCategory,
  onChangeCategory,
  categories
}) {
  return (
    <header className="w-full glass-panel sticky top-0 z-30 px-4 py-3 shadow-2xl border-b border-indigo-500/10 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent tracking-tight">
              PIXEL REVEAL
            </h1>
            <p className="text-xs text-indigo-300/70 font-medium">Image Guessing Game</p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-semibold text-slate-300">
          <button
            onClick={() => onChangeGameMode('classic')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              gameMode === 'classic' 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                : 'hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Classic
          </button>
          <button
            onClick={() => onChangeGameMode('speed')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              gameMode === 'speed' 
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md' 
                : 'hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Speed Run
          </button>
          <button
            onClick={() => onChangeGameMode('zen')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              gameMode === 'zen' 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' 
                : 'hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            Zen Mode
          </button>
        </div>

        {/* Category & Stats Badges */}
        <div className="flex items-center gap-3">
          
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => onChangeCategory(e.target.value)}
            className="bg-slate-900/90 text-xs font-semibold text-indigo-200 border border-indigo-500/20 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-slate-900 text-slate-100">
                {cat}
              </option>
            ))}
          </select>

          {/* Score Badge */}
          <div className="flex items-center gap-1.5 bg-indigo-950/60 border border-indigo-500/30 px-3 py-1.5 rounded-xl shadow-inner">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-slate-300">Score</span>
            <span className="text-sm font-extrabold text-amber-300">{score}</span>
          </div>

          {/* Streak Badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
            streak > 0 
              ? 'bg-amber-950/50 border-amber-500/40 text-amber-400 animate-pulse-glow' 
              : 'bg-slate-900/50 border-slate-800 text-slate-400'
          }`}>
            <Flame className={`w-4 h-4 ${streak > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-500'}`} />
            <span className="text-xs font-bold">Streak</span>
            <span className="text-sm font-extrabold">{streak}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
            <button
              onClick={onToggleSound}
              title={soundMuted ? 'Unmute Audio' : 'Mute Audio'}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              {soundMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            <button
              onClick={onOpenUpload}
              title="Upload Custom Image"
              className="p-2 rounded-xl text-slate-400 hover:text-indigo-300 hover:bg-slate-800/80 transition-colors"
            >
              <Upload className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenStats}
              title="View Player Stats"
              className="p-2 rounded-xl text-slate-400 hover:text-indigo-300 hover:bg-slate-800/80 transition-colors"
            >
              <BarChart2 className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenSettings}
              title="Game Settings"
              className="p-2 rounded-xl text-slate-400 hover:text-indigo-300 hover:bg-slate-800/80 transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}
