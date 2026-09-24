import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertTriangle, CheckCircle2, XCircle, Sparkles, CornerDownLeft } from 'lucide-react';

export default function GuessInput({
  onGuess,
  isGameOver,
  feedback,
  previousGuesses = []
}) {
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef(null);

  // Auto-focus input field on new round
  useEffect(() => {
    if (!isGameOver && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isGameOver]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim() || isGameOver) return;

    onGuess(inputVal.trim());
    setInputVal('');
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-3">
      
      {/* Feedback Banner */}
      {feedback && (
        <div className={`w-full px-4 py-3 rounded-2xl flex items-center gap-3 border shadow-xl transition-all animate-bounce-short ${
          feedback.type === 'correct' 
            ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' 
            : feedback.type === 'close'
              ? 'bg-amber-950/80 border-amber-500/50 text-amber-200'
              : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
        }`}>
          {feedback.type === 'correct' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
          {feedback.type === 'close' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />}
          {feedback.type === 'wrong' && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
          
          <div className="flex-1 text-sm font-semibold">
            {feedback.message}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative flex items-center w-full">
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          disabled={isGameOver}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={isGameOver ? "Round complete!" : "Type your guess here (e.g. Eiffel Tower)..."}
          className="w-full bg-slate-900/90 text-slate-100 placeholder-slate-500 text-sm md:text-base font-semibold px-5 py-4 rounded-2xl border border-indigo-500/30 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl transition-all pr-14"
        />

        <button
          type="submit"
          disabled={!inputVal.trim() || isGameOver}
          className="absolute right-2 p-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-slate-800 disabled:to-slate-800 text-white font-semibold transition-all shadow-md hover:shadow-indigo-500/25 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Wrong Guesses Log */}
      {previousGuesses.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 px-1 pt-1">
          <span className="text-xs text-slate-500 font-medium mr-1">Previous guesses:</span>
          {previousGuesses.map((guess, idx) => (
            <span
              key={idx}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-rose-950/40 text-rose-300 border border-rose-900/50 line-through opacity-80"
            >
              {guess}
            </span>
          ))}
        </div>
      )}

    </div>
  );
}
