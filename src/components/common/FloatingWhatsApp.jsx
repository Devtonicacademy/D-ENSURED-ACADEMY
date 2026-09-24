import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "2348147896930";
  const defaultText = "Hello D Ensured Consult Academy, I would like to make an enquiry regarding admission coaching and CBT prep.";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none">
      
      {/* Quick popup chat preview card when expanded */}
      {isOpen && (
        <div className="mb-3 w-80 glass-panel rounded-2xl border border-emerald-500/40 shadow-2xl overflow-hidden animate-fadeIn text-left">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 p-4 text-white relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-white/80 hover:text-white p-1 rounded-lg"
              aria-label="Close WhatsApp chat prompt"
            >
              <X size={16} />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src="/assets/d_ensured_logo.jpg"
                  alt="D Ensured Support"
                  className="w-9 h-9 rounded-full border border-white/60"
                />
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-emerald-700 absolute bottom-0 right-0 animate-pulse" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs">D Ensured Consult Desk</h4>
                <p className="text-[10px] text-emerald-100 font-mono">Typically replies within 15 mins</p>
              </div>
            </div>
          </div>

          {/* Body message preview */}
          <div className="p-4 space-y-3 bg-slate-950/90 text-xs">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl rounded-tl-none text-slate-200">
              <p className="leading-relaxed">
                Welcome to D Ensured Consult Academy! Looking for <strong>JAMB 300+ prep</strong>, <strong>UNILAG Post-UTME 25/30 classes</strong>, or <strong>JAMB CAPS verification</strong>?
              </p>
              <span className="text-[9px] text-slate-500 font-mono block mt-1">Official WhatsApp Desk</span>
            </div>

            <a
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <Send size={13} /> Chat on WhatsApp Now
            </a>
          </div>
        </div>
      )}

      {/* Main floating action toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:shadow-emerald-500/30 transition-all transform hover:scale-105"
        aria-label="Direct WhatsApp Contact"
      >
        {/* Pulsing indicator ring */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-slate-950 animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-slate-950" />

        <MessageCircle size={22} className="fill-white/20" />
        <span className="hidden sm:inline text-xs font-extrabold tracking-wide">
          Chat on WhatsApp
        </span>
      </button>

    </div>
  );
}
