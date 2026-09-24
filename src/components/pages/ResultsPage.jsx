import React, { useState } from 'react';
import MetricCounterGrid from '../common/MetricCounterGrid';
import TopScholarsCarousel from '../common/TopScholarsCarousel';
import { Award, Star, CheckCircle2, Trophy, Quote, Send, Sparkles } from 'lucide-react';

export default function ResultsPage() {
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [newStory, setNewStory] = useState({ name: '', exam: 'JAMB UTME', score: '', institution: '', text: '' });

  const VERIFIED_SCORES = [
    { name: 'Olamide Adebayo', exam: 'JAMB UTME 2026', score: 325, institution: 'University of Lagos (Medicine)', testimonial: 'D Ensured Academy English novel sessions gave me an 88/100 in Use of English alone! The CBT simulator felt identical to the actual exam hall.' },
    { name: 'Chinedu Okonkwo', exam: 'JAMB UTME 2026', score: 310, institution: 'UNILAG (Computer Science)', testimonial: 'I scored 310 in JAMB and 27/30 in UNILAG Post-UTME through Akinjo Rotimi guidance.' },
    { name: 'Blessing Chukwuma', exam: 'JAMB UTME 2026', score: 300, institution: 'University of Ibadan (Law)', testimonial: 'The weekly practicals and morning drill classes eliminated all exam anxiety.' },
    { name: 'Emmanuel Folorunsho', exam: 'JAMB UTME 2026', score: 299, institution: 'LASU (Engineering)', testimonial: 'Their CAPS change of course and data correction service saved my admission status.' },
    { name: 'Fatima Abubakar', exam: 'JAMB UTME 2026', score: 290, institution: 'FUTA (Software Engineering)', testimonial: 'Clear explanations, dedicated tutors, and endless past question practice.' }
  ];

  const handleSubmitStory = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider font-mono">
          <Trophy size={13} className="text-amber-400" />
          <span>Hall of Fame & Student Achievements</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
          Glorious Scores & Success Stories
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Proof of excellence. See how D Ensured Consult Academy students consistently achieve 300+ in UTME and distinction grades in O'Level examinations.
        </p>
      </div>

      {/* Proof Metrics Counter Grid */}
      <MetricCounterGrid />

      {/* Top Scholars / Success Carousel */}
      <TopScholarsCarousel />

      {/* Verified Score Badges Showcase */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-amber-400/30 gold-glow space-y-6 text-center">
        <div className="space-y-1">
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">Featured UTME Score Records</h3>
          <p className="text-xs text-slate-400">Verified official results achieved by candidates coached at D Ensured Consult.</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { score: 325, name: 'Olamide A.', course: 'Medicine (UNILAG)' },
            { score: 310, name: 'Chinedu O.', course: 'Comp Sci (UNILAG)' },
            { score: 300, name: 'Blessing C.', course: 'Law (UI)' },
            { score: 299, name: 'Emmanuel F.', course: 'Engr (LASU)' },
            { score: 290, name: 'Fatima A.', course: 'Software (FUTA)' }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-900/90 p-4 rounded-2xl border border-amber-400/30 text-center space-y-1 hover:border-amber-400 transition">
              <span className="font-heading font-black text-3xl text-amber-400 block">{item.score}</span>
              <span className="text-xs font-bold text-slate-200 block truncate">{item.name}</span>
              <span className="text-[10px] text-amber-300 font-mono block truncate">{item.course}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Student Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VERIFIED_SCORES.map((story, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-amber-400/20 text-amber-300 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  {story.exam}
                </span>
                <span className="font-heading font-extrabold text-base text-amber-400">{story.score} Marks</span>
              </div>

              <Quote size={24} className="text-amber-400/40" />
              
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{story.testimonial}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <h4 className="font-heading font-bold text-sm text-white">{story.name}</h4>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">{story.institution}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial Submission Drawer / Section */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 text-center max-w-xl mx-auto space-y-4">
        <Trophy size={40} className="mx-auto text-amber-400" />
        <h3 className="font-heading font-bold text-xl text-white">Are You a D Ensured Student Success Story?</h3>
        <p className="text-xs text-slate-300">Share your exam score and admission victory with incoming students.</p>

        {!showTestimonialForm ? (
          <button
            onClick={() => setShowTestimonialForm(true)}
            className="px-7 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition"
          >
            Submit Your Testimonial & Score
          </button>
        ) : !formSubmitted ? (
          <form onSubmit={handleSubmitStory} className="space-y-3 text-left pt-2">
            <input
              type="text"
              required
              placeholder="Your Full Name"
              value={newStory.name}
              onChange={(e) => setNewStory({ ...newStory, name: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                required
                placeholder="UTME / Exam Score"
                value={newStory.score}
                onChange={(e) => setNewStory({ ...newStory, score: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              />
              <input
                type="text"
                required
                placeholder="Admitted University"
                value={newStory.institution}
                onChange={(e) => setNewStory({ ...newStory, institution: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
            <textarea
              required
              rows={3}
              placeholder="Write your brief testimonial..."
              value={newStory.text}
              onChange={(e) => setNewStory({ ...newStory, text: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
            />
            <button
              type="submit"
              className="w-full py-3 text-xs font-bold text-slate-950 bg-amber-400 rounded-xl shadow transition"
            >
              Submit Story for Verification
            </button>
          </form>
        ) : (
          <div className="p-4 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
            <span>Thank you! Your story has been submitted for admin verification.</span>
          </div>
        )}
      </div>

    </div>
  );
}
