import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2, ChevronDown, ChevronUp, BookOpen, Clock, Award, Star, User } from 'lucide-react';

export default function CourseDetailModal() {
  const { isCourseModalOpen, setIsCourseModalOpen, selectedCourse, enrolledCourses, initiatePayment } = useApp();
  const [expandedSubject, setExpandedSubject] = useState(0);

  if (!isCourseModalOpen || !selectedCourse) return null;

  const isEnrolled = enrolledCourses.includes(selectedCourse.id);

  const handleEnrollClick = () => {
    setIsCourseModalOpen(false);
    initiatePayment({
      id: selectedCourse.id,
      title: selectedCourse.title,
      price: selectedCourse.price,
      type: 'course'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel rounded-2xl shadow-2xl border border-slate-700 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Course Header Banner */}
        <div className="relative h-48 sm:h-56 overflow-hidden shrink-0">
          <img 
            src={selectedCourse.image} 
            alt={selectedCourse.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
          
          <button
            onClick={() => setIsCourseModalOpen(false)}
            className="absolute top-4 right-4 bg-slate-950/60 text-slate-300 hover:text-white p-2 rounded-full border border-slate-700 backdrop-blur-sm"
          >
            <X size={18} />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {selectedCourse.examType}
              </span>
              <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                {selectedCourse.format}
              </span>
              {selectedCourse.cbtIncluded && (
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                  CBT Simulator Included
                </span>
              )}
            </div>
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white leading-tight">
              {selectedCourse.title}
            </h3>
          </div>
        </div>

        {/* Course Content Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Overview grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs">
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-mono">Duration</p>
              <p className="font-bold text-white mt-0.5">{selectedCourse.duration}</p>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-mono">Tutor</p>
              <p className="font-bold text-amber-300 mt-0.5 truncate">{selectedCourse.tutor}</p>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-mono">Enrolled</p>
              <p className="font-bold text-white mt-0.5">{selectedCourse.enrolledCount}+ Students</p>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-mono">Rating</p>
              <p className="font-bold text-amber-400 mt-0.5 flex items-center gap-1">
                <Star size={12} className="fill-amber-400" /> {selectedCourse.rating} / 5.0
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm text-white mb-2">About This Program</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedCourse.description}</p>
          </div>

          {/* Features */}
          {selectedCourse.features && (
            <div>
              <h4 className="font-heading font-bold text-sm text-white mb-2.5">Key Learning Resources Included</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {selectedCourse.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <CheckCircle2 size={15} className="text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Expandable Syllabus */}
          {selectedCourse.syllabus && (
            <div>
              <h4 className="font-heading font-bold text-sm text-white mb-3">Course Curriculum Breakdown</h4>
              <div className="space-y-2">
                {selectedCourse.syllabus.map((item, idx) => {
                  const isOpen = expandedSubject === idx;
                  return (
                    <div key={idx} className="bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden">
                      <button
                        onClick={() => setExpandedSubject(isOpen ? -1 : idx)}
                        className="w-full px-4 py-3 text-xs font-bold text-white flex items-center justify-between hover:bg-slate-800/60 transition"
                      >
                        <span className="text-amber-300">{item.subject}</span>
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 space-y-3 border-t border-slate-800/80">
                          {item.modules.map((mod, mIdx) => (
                            <div key={mIdx} className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-xs">
                              <p className="font-semibold text-slate-200 mb-1.5">{mod.title}</p>
                              <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-0.5 pl-1">
                                {mod.lessons.map((les, lIdx) => (
                                  <li key={lIdx}>{les}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer CTA */}
        <div className="p-4 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div>
            <p className="text-[10px] text-slate-400 font-mono">TUITION FEE</p>
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-xl text-amber-400">{selectedCourse.price}</span>
              {selectedCourse.originalPrice && (
                <span className="text-xs text-slate-500 line-through font-mono">{selectedCourse.originalPrice}</span>
              )}
            </div>
          </div>

          {isEnrolled ? (
            <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-4 py-2.5 rounded-xl text-xs font-bold">
              <CheckCircle2 size={16} /> Already Enrolled
            </div>
          ) : (
            <button
              onClick={handleEnrollClick}
              className="px-6 py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg transition"
            >
              Enroll & Start Learning
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
