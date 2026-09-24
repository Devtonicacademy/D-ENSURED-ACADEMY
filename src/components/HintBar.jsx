import React, { useState } from 'react';
import { Lightbulb, Tag, FileText, Grid } from 'lucide-react';

export default function HintBar({
  targetItem,
  onRevealExtraTiles,
  isGameOver,
  score,
  onDeductPoints
}) {
  const [showCategoryHint, setShowCategoryHint] = useState(false);
  const [showLetterHint, setShowLetterHint] = useState(false);

  // Reset local state when target item changes
  React.useEffect(() => {
    setShowCategoryHint(false);
    setShowLetterHint(false);
  }, [targetItem?.id]);

  if (!targetItem || isGameOver) return null;

  // Generate letter hint: replace middle letters of words with underscores
  const getLetterMask = (str) => {
    return str.split('').map((ch) => {
      if (ch === ' ') return '   ';
      if (/[a-zA-Z0-9]/.test(ch)) {
        return Math.random() > 0.5 ? ch : '_';
      }
      return ch;
    }).join(' ');
  };

  const letterMask = getLetterMask(targetItem.name);

  const handleCategoryClick = () => {
    if (!showCategoryHint) {
      setShowCategoryHint(true);
      onDeductPoints(50);
    }
  };

  const handleLetterClick = () => {
    if (!showLetterHint) {
      setShowLetterHint(true);
      onDeductPoints(100);
    }
  };

  const handleTilesClick = () => {
    onRevealExtraTiles(3);
    onDeductPoints(75);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-3">
      
      {/* Hint Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/60 p-2 rounded-2xl border border-indigo-500/10">
        
        <button
          onClick={handleCategoryClick}
          disabled={showCategoryHint || isGameOver}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
            showCategoryHint 
              ? 'bg-indigo-900/50 text-indigo-300 border border-indigo-500/30 cursor-default'
              : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60 hover:text-white'
          }`}
        >
          <Tag className="w-3.5 h-3.5 text-indigo-400" />
          <span>{showCategoryHint ? 'Category Revealed' : 'Category Clue (-50 pts)'}</span>
        </button>

        <button
          onClick={handleLetterClick}
          disabled={showLetterHint || isGameOver}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
            showLetterHint 
              ? 'bg-indigo-900/50 text-indigo-300 border border-indigo-500/30 cursor-default'
              : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60 hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-purple-400" />
          <span>{showLetterHint ? 'Letters Revealed' : 'Letter Hint (-100 pts)'}</span>
        </button>

        <button
          onClick={handleTilesClick}
          disabled={isGameOver}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60 hover:text-white transition-all"
        >
          <Grid className="w-3.5 h-3.5 text-amber-400" />
          <span>Flash 3 Tiles (-75 pts)</span>
        </button>

      </div>

      {/* Active Hint Content Displays */}
      {(showCategoryHint || showLetterHint) && (
        <div className="flex flex-col gap-2 p-3 bg-indigo-950/40 rounded-2xl border border-indigo-500/20 text-xs">
          {showCategoryHint && (
            <div className="flex items-start gap-2 text-indigo-200">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-indigo-300">Category & Clue: </span>
                <span>[{targetItem.category}] {targetItem.hintCategory}</span>
              </div>
            </div>
          )}

          {showLetterHint && (
            <div className="flex items-start gap-2 text-purple-200">
              <FileText className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-purple-300">Pattern: </span>
                <span className="font-mono text-sm tracking-widest text-amber-300 bg-slate-900/80 px-2.5 py-1 rounded-lg inline-block border border-slate-800 mt-1">
                  {letterMask}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
