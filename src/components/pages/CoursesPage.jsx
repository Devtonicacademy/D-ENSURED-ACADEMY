import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COURSES_LIST } from '../../data/coursesData';
import ProgramCard from '../common/ProgramCard';
import LeadReservationForm from '../common/LeadReservationForm';
import { Search, BookOpen, Sparkles, Filter } from 'lucide-react';

export default function CoursesPage() {
  const { openCourseModal, openAuthModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExamType, setSelectedExamType] = useState('ALL');

  const examTypes = ['ALL', 'JAMB', 'Post-UTME', 'WAEC', 'NECO', 'GCE'];

  const filteredCourses = COURSES_LIST.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedExamType === 'ALL' || course.examType === selectedExamType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider font-mono">
          <Sparkles size={13} className="text-amber-400" />
          <span>Academic Curriculum & Programs</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
          Examination Preparation Courses
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Structured morning & evening coaching classes equipped with laboratory practicals, CBT drills, and past question mastery for JAMB, Post-UTME, WAEC, NECO & GCE.
        </p>
      </div>

      {/* Search & Filters Bar */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search by subject, track, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {examTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedExamType(type)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                selectedExamType === type
                  ? 'bg-amber-400 text-slate-950 font-extrabold shadow'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

      </div>

      {/* Course Cards Grid using modular ProgramCard */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <ProgramCard
              key={course.id}
              course={course}
              onViewCurriculum={(c) => openCourseModal(c)}
              onEnroll={(c) => openCourseModal(c)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 glass-panel rounded-3xl border border-slate-800 space-y-3">
          <BookOpen size={40} className="mx-auto text-slate-600" />
          <h3 className="font-heading font-bold text-lg text-slate-300">No matching programs found</h3>
          <p className="text-xs text-slate-500">Try adjusting your search keywords or switching filters to "ALL".</p>
        </div>
      )}

      {/* Inline Slot Reservation / Advisory Form Block */}
      <div className="pt-6">
        <LeadReservationForm
          title="Not Sure Which Exam Track Matches Your Goal?"
          subtitle="Submit your details for a personalized academic study plan and course combination review with Lead English Demystificator Akinjo Rotimi."
        />
      </div>

    </div>
  );
}
