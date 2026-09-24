import React from 'react';
import { Trophy, Flame, ArrowRight, RotateCcw, CheckCircle, Clock, Sparkles, Award } from 'lucide-react';

export default function GameOverModal({
  isOpen,
  isWin,
  targetItem,
  roundScore,
  streak,
  totalScore,
  onNextRound,
  timeTaken,
  tilesRevealed,
  totalTiles
}) {
  if (!isOpen || !targetItem) return null;

  const hiddenTiles = Math.max(0, totalTiles - tilesRevealed);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
      <div className="w-full max-w-lg glass-panel rounded-3xl p-6 border border-indigo-500/30 shadow-2xl relative overflow-hidden flex flex-col gap-5">
        
        {/* Glow background accent */}
        <div className={`absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-30 ${
          isWin ? 'bg-emerald-500' : 'bg-rose-500'
        }`} />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-30 bg-indigo-500" />

        {/* Title Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl ring-4 ${
            isWin 
              ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white ring-emerald-500/30 shadow-emerald-900/40' 
              : 'bg-gradient-to-tr from-rose-600 to-amber-600 text-white ring-rose-500/30 shadow-rose-900/40'
          }`}>
            {isWin ? <Trophy className="w-8 h-8 animate-bounce" /> : <Clock className="w-8 h-8" />}
          </div>

          <h2 className="text-2xl font-extrabold text-white mt-1">
            {isWin ? 'Correct Guess!' : 'Time\'s Up!'}
          </h2>
          
          <p className="text-sm font-semibold text-indigo-300">
            {isWin ? 'You unmasked the image!' : 'Better luck on the next one!'}
          </p>
        </div>

        {/* Image Preview & Details Card */}
        <div className="glass-card rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center border border-indigo-500/20">
          <img
            src={targetItem.imageUrl}
            alt={targetItem.name}
            onError={(e) => { e.target.src = targetItem.fallbackSvg; }}
            className="w-28 h-28 object-cover rounded-xl shadow-lg border border-white/10 shrink-0"
          />
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="text-xs uppercase tracking-wider font-bold text-indigo-400">
              {targetItem.category}
            </span>
            <h3 className="text-xl font-extrabold text-white">
              {targetItem.name}
            </h3>
            {targetItem.hintFunFact && (
              <p className="text-xs text-slate-300 mt-1 italic line-clamp-3">
                "{targetItem.hintFunFact}"
              </p>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 block">Round Score</span>
            <span className="text-lg font-extrabold text-amber-400">+{roundScore}</span>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 block">Tiles Hidden</span>
            <span className="text-lg font-extrabold text-indigo-400">{hiddenTiles}/{totalTiles}</span>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 block">Current Streak</span>
            <div className="flex items-center justify-center gap-1 text-amber-500 font-extrabold text-lg">
              <Flame className="w-4 h-4 fill-amber-500" />
              <span>{streak}</span>
            </div>
          </div>
        </div>

        {/* Next Round Button */}
        <button
          onClick={onNextRound}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-base shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <span>Next Challenge</span>
          <ArrowRight className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
}
