import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon, Sparkles, PlusCircle } from 'lucide-react';

export default function CustomUploadModal({ isOpen, onClose, onAddCustomItem }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [name, setName] = useState('');
  const [aliases, setAliases] = useState('');
  const [category, setCategory] = useState('Custom');
  const [hintCategory, setHintCategory] = useState('');
  const [hintFunFact, setHintFunFact] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!previewUrl || !name.trim()) return;

    const parsedAliases = aliases
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const newItem = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      aliases: parsedAliases,
      category: category.trim() || 'Custom',
      difficulty: 'custom',
      hintCategory: hintCategory.trim() || 'Custom user image challenge',
      hintFunFact: hintFunFact.trim() || 'Created by user in custom upload mode.',
      imageUrl: previewUrl,
      fallbackSvg: previewUrl
    };

    onAddCustomItem(newItem);
    
    // Reset form
    setFile(null);
    setPreviewUrl('');
    setName('');
    setAliases('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
      <div className="w-full max-w-lg glass-panel rounded-3xl p-6 border border-indigo-500/30 shadow-2xl relative flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-900/60 text-purple-300 border border-purple-500/30">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">Upload Custom Image</h2>
              <p className="text-xs text-slate-400">Create your own tile guess challenge!</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* File Dropzone */}
          <div className="relative border-2 border-dashed border-indigo-500/30 rounded-2xl p-4 text-center hover:border-indigo-400 transition-colors bg-slate-900/50">
            {previewUrl ? (
              <div className="relative group w-full aspect-video rounded-xl overflow-hidden">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => { setFile(null); setPreviewUrl(''); }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/80 text-rose-400 hover:bg-rose-950 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center gap-2 cursor-pointer py-4">
                <ImageIcon className="w-10 h-10 text-indigo-400 animate-pulse" />
                <span className="text-sm font-semibold text-slate-200">
                  Click or drag image file here
                </span>
                <span className="text-xs text-slate-500">Supports PNG, JPG, WEBP, GIF</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Correct Answer */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-300">
              Target Answer <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Golden Gate Bridge"
              className="bg-slate-900/90 text-slate-100 text-sm font-semibold px-4 py-2.5 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Aliases */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-300">
              Alternative Accepted Aliases (Comma separated)
            </label>
            <input
              type="text"
              value={aliases}
              onChange={(e) => setAliases(e.target.value)}
              placeholder="e.g. golden gate, SF bridge, san francisco bridge"
              className="bg-slate-900/90 text-slate-100 text-sm font-semibold px-4 py-2.5 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Category & Hint */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-300">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Landmarks"
                className="bg-slate-900/90 text-slate-100 text-sm font-semibold px-4 py-2.5 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-300">Hint Clue</label>
              <input
                type="text"
                value={hintCategory}
                onChange={(e) => setHintCategory(e.target.value)}
                placeholder="e.g. Red suspension bridge in California"
                className="bg-slate-900/90 text-slate-100 text-sm font-semibold px-4 py-2.5 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!previewUrl || !name.trim()}
            className="w-full py-3.5 mt-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Play Custom Challenge</span>
          </button>

        </form>

      </div>
    </div>
  );
}
