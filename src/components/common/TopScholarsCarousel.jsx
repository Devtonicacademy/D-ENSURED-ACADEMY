import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Quote, 
  CheckCircle2, 
  Award,
  Sparkles,
  GraduationCap
} from 'lucide-react';

export const TOP_SCHOLARS = [
  {
    id: 1,
    name: 'Olamide Adebayo',
    exam: 'JAMB UTME 2026',
    score: 325,
    highlight: '88 in Use of English',
    institution: 'University of Lagos (UNILAG)',
    course: 'Medicine & Surgery',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    quote: 'D Ensured Consult demystified the JAMB novel and speed English drills. The CBT simulator felt 100% identical to the actual exam hall experience.'
  },
  {
    id: 2,
    name: 'Chinedu Okonkwo',
    exam: 'JAMB UTME & UNILAG Post-UTME',
    score: 310,
    highlight: '27/30 Post-UTME Screening',
    institution: 'University of Lagos (UNILAG)',
    course: 'Computer Science',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    quote: 'I scored 310 in JAMB and smashed the UNILAG screening test with 27 out of 30. CEO Akinjo Rotimi\'s direct mentorship gave me the winning aggregate.'
  },
  {
    id: 3,
    name: 'Blessing Chukwuma',
    exam: 'JAMB UTME 2026',
    score: 300,
    highlight: '9 Distinctions in WAEC',
    institution: 'University of Ibadan (UI)',
    course: 'Faculty of Law',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    quote: 'The Saturday mock marathons and English literature breakdown eliminated every trace of exam panic. I gained admission into UI on my very first sitting!'
  },
  {
    id: 4,
    name: 'Emmanuel Folorunsho',
    exam: 'JAMB UTME 2026',
    score: 299,
    highlight: 'CAPS Verification Support',
    institution: 'Lagos State University (LASU)',
    course: 'Mechanical Engineering',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    quote: 'Beyond the high scores, their admission consultancy guided me through CAPS course change and O\'Level verification without any bottlenecks.'
  },
  {
    id: 5,
    name: 'Fatima Abubakar',
    exam: 'JAMB UTME 2026',
    score: 290,
    highlight: 'STEM Heuristics Master',
    institution: 'Federal University of Tech, Akure (FUTA)',
    course: 'Software Engineering',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    quote: 'Physics and Chemistry calculations became second nature with the STEM tutors. Highly recommended for any serious science candidate in Lagos.'
  }
];

export default function TopScholarsCarousel({
  title = "Top Scholars & Hall of Fame",
  subtitle = "Real results from real students. See how our candidates consistently break the 300+ score ceiling in UTME."
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TOP_SCHOLARS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const prevSlide = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + TOP_SCHOLARS.length) % TOP_SCHOLARS.length);
  };

  const nextSlide = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % TOP_SCHOLARS.length);
  };

  const current = TOP_SCHOLARS[currentIndex];

  return (
    <div className="w-full space-y-6">
      
      {/* Section Header with Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Trophy size={13} className="text-amber-400" />
            <span>Verified Student Achievements</span>
          </div>
          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {subtitle}
          </p>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous scholar"
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400 text-slate-300 hover:text-white flex items-center justify-center transition"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next scholar"
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400 text-slate-300 hover:text-white flex items-center justify-center transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Main Spotlight Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-amber-400/30 gold-glow relative overflow-hidden transition-all duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Scholar Portrait & Verified Score Tag */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-amber-400/80 shadow-2xl ring-4 ring-amber-400/20">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Score pill */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-heading font-black text-lg sm:text-xl px-4 py-1 rounded-full shadow-xl border-2 border-slate-950 whitespace-nowrap">
                {current.score} <span className="text-xs font-sans font-bold">MARKS</span>
              </div>
            </div>

            <h4 className="font-heading font-extrabold text-lg text-white mt-6">
              {current.name}
            </h4>
            <p className="text-xs font-mono text-amber-400 font-semibold mt-0.5">
              {current.highlight}
            </p>
            <span className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <CheckCircle2 size={12} className="text-emerald-400" /> Verified 2026 Candidate
            </span>
          </div>

          {/* Right: Details, Admitted Program & Testimonial */}
          <div className="lg:col-span-8 space-y-4 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-slate-900 border border-slate-800 text-blue-300 font-mono text-xs px-3 py-1 rounded-lg flex items-center gap-1.5">
                <GraduationCap size={14} className="text-blue-400" /> {current.course}
              </span>
              <span className="bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs px-3 py-1 rounded-lg">
                {current.institution}
              </span>
            </div>

            <div className="relative pt-2">
              <Quote size={32} className="text-amber-400/30 mb-2" />
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic">
                "{current.quote}"
              </p>
            </div>

            {/* Score Grid Comparison */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
                <span className="text-slate-400 ml-1 font-mono text-[11px]">Academic Rating</span>
              </div>

              <span className="text-slate-400 font-mono text-[11px]">
                Examination Track: <strong className="text-amber-300">{current.exam}</strong>
              </span>
            </div>
          </div>

        </div>

        {/* Dots Pagination */}
        <div className="flex items-center justify-center gap-1.5 pt-6 mt-6 border-t border-slate-800/60">
          {TOP_SCHOLARS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setIsAutoPlay(false);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-8 bg-amber-400'
                  : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
