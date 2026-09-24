import React, { useState } from 'react';
import { Eye, HelpCircle } from 'lucide-react';

export default function ImageGridCanvas({
  imageUrl,
  fallbackSvg,
  gridRows = 5,
  gridCols = 5,
  revealedTiles,
  isGameOver = false,
  isShake = false,
  maxBlur = 24,
  onTileClick,
  gameMode
}) {
  const [imageSrc, setImageSrc] = useState(imageUrl);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Update src when prop changes
  React.useEffect(() => {
    setImageSrc(imageUrl);
    setImageLoaded(false);
  }, [imageUrl]);

  const totalTiles = gridRows * gridCols;
  const revealedCount = revealedTiles.size;
  const percentRevealed = Math.round((revealedCount / totalTiles) * 100);

  // Calculate dynamic backdrop blur based on unrevealed percentage
  const currentBlur = isGameOver 
    ? 0 
    : Math.max(0, Math.round(maxBlur * (1 - revealedCount / totalTiles)));

  return (
    <div className={`relative w-full max-w-xl mx-auto rounded-3xl overflow-hidden glass-panel border border-indigo-500/20 shadow-2xl p-3 transition-transform ${
      isShake ? 'animate-shake ring-2 ring-rose-500/80 shadow-rose-900/50' : ''
    }`}>

      {/* Progress & Blur Overlay Indicator */}
      <div className="absolute top-5 left-5 z-20 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-indigo-500/30 shadow-lg text-xs font-semibold text-indigo-200">
        <Eye className="w-3.5 h-3.5 text-indigo-400" />
        <span>{percentRevealed}% Uncovered</span>
        {currentBlur > 0 && !isGameOver && (
          <span className="text-[10px] bg-indigo-900/60 px-1.5 py-0.5 rounded text-indigo-300">
            Blur: {currentBlur}px
          </span>
        )}
      </div>

      {/* Image Container with Dynamic Blur */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 select-none shadow-inner">
        
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-indigo-400 gap-3 z-0 animate-pulse">
            <HelpCircle className="w-12 h-12 stroke-[1.5]" />
            <span className="text-sm font-medium">Loading target image...</span>
          </div>
        )}

        <img
          src={imageSrc}
          alt="Guess target"
          onError={() => setImageSrc(fallbackSvg)}
          onLoad={() => setImageLoaded(true)}
          style={{
            filter: `blur(${currentBlur}px)`,
            transition: 'filter 0.5s ease-out'
          }}
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-700"
        />

        {/* Tile Grid Overlay */}
        <div 
          className="absolute inset-0 grid gap-1 p-1 z-10"
          style={{
            gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`
          }}
        >
          {Array.from({ length: totalTiles }).map((_, idx) => {
            const isRevealed = isGameOver || revealedTiles.has(idx);

            return (
              <div
                key={idx}
                onClick={() => onTileClick && onTileClick(idx)}
                style={{
                  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease-out',
                  transform: isRevealed ? 'rotateY(90deg) scale(0.5)' : 'rotateY(0deg) scale(1)',
                  opacity: isRevealed ? 0 : 1,
                  pointerEvents: isRevealed || isGameOver ? 'none' : 'auto'
                }}
                className={`relative rounded-lg flex items-center justify-center font-bold text-xs cursor-pointer select-none transition-all ${
                  gameMode === 'zen' 
                    ? 'bg-slate-900/90 hover:bg-indigo-900/90 border border-slate-700/60 hover:border-indigo-400/80 shadow-md text-indigo-300' 
                    : 'bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/20 hover:border-indigo-400/50 text-slate-500 shadow-md hover:scale-[0.98]'
                }`}
              >
                {/* Tile texture / watermark index */}
                <span className="opacity-30 text-[10px] font-mono tracking-tighter">
                  {idx + 1}
                </span>

                {/* Zen mode clickable indicator */}
                {gameMode === 'zen' && !isRevealed && (
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-indigo-600/40 rounded-lg text-white font-medium text-[10px]">
                    Click
                  </span>
                )}
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
