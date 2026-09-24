import React from 'react';
import { X, Settings, Sliders, ShieldAlert, Sparkles, Layers } from 'lucide-react';

export default function SettingsModal({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
      <div className="w-full max-w-md glass-panel rounded-3xl p-6 border border-indigo-500/30 shadow-2xl relative flex flex-col gap-5">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-900/60 text-indigo-400 border border-indigo-500/30">
              <Settings className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Game Settings</h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Options */}
        <div className="flex flex-col gap-4">
          
          {/* Grid Size */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-400" />
                Grid Resolution
              </span>
              <span className="text-indigo-400 font-extrabold">{settings.gridSize}x{settings.gridSize} Tiles</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {[3, 4, 5, 6, 8].map((size) => (
                <button
                  key={size}
                  onClick={() => onUpdateSettings({ gridSize: size })}
                  className={`py-2 rounded-xl text-xs font-extrabold border transition-all ${
                    settings.gridSize === size 
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-md' 
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {size}x{size}
                </button>
              ))}
            </div>
          </div>

          {/* Reveal Interval Speed */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-purple-400" />
                Auto-Reveal Speed
              </span>
              <span className="text-purple-400 font-extrabold">{settings.revealInterval}s / tile</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[1.5, 2.5, 3.5, 5.0].map((sec) => (
                <button
                  key={sec}
                  onClick={() => onUpdateSettings({ revealInterval: sec })}
                  className={`py-2 rounded-xl text-xs font-extrabold border transition-all ${
                    settings.revealInterval === sec 
                      ? 'bg-purple-600 border-purple-400 text-white shadow-md' 
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
          </div>

          {/* Penalty Tiles */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                Wrong Guess Penalty Tiles
              </span>
              <span className="text-rose-400 font-extrabold">+{settings.penaltyTiles} tiles</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[1, 2, 3, 4].map((count) => (
                <button
                  key={count}
                  onClick={() => onUpdateSettings({ penaltyTiles: count })}
                  className={`py-2 rounded-xl text-xs font-extrabold border transition-all ${
                    settings.penaltyTiles === count 
                      ? 'bg-rose-600 border-rose-400 text-white shadow-md' 
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  +{count} Tiles
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-colors cursor-pointer"
        >
          Save & Close
        </button>

      </div>
    </div>
  );
}
