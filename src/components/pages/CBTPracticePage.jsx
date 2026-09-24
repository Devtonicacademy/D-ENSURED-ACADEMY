import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { CBT_SUBJECTS, CBT_QUESTIONS } from '../../data/cbtData';
import { 
  Clock, 
  Flag, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Award,
  Play,
  HelpCircle,
  BarChart2
} from 'lucide-react';

export default function CBTPracticePage() {
  const { addCbtAttempt, setActiveTab } = useApp();

  // Test Config State
  const [selectedSubject, setSelectedSubject] = useState(CBT_SUBJECTS[0]);
  const [selectedExamType, setSelectedExamType] = useState('JAMB UTME');
  const [testDurationMinutes, setTestDurationMinutes] = useState(20);
  
  // Test Running State
  const [isTestActive, setIsTestActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionId: optionIndex }
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  
  // Timer State
  const [secondsRemaining, setSecondsRemaining] = useState(20 * 60);
  const timerRef = useRef(null);

  // Submit Modal & Result State
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [testResults, setTestResults] = useState(null);

  const questionsList = CBT_QUESTIONS[selectedSubject.id] || CBT_QUESTIONS.english;

  // Timer Effect
  useEffect(() => {
    if (!isTestActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTestActive]);

  const startTest = () => {
    setUserAnswers({});
    setFlaggedQuestions(new Set());
    setCurrentQuestionIndex(0);
    setSecondsRemaining(testDurationMinutes * 60);
    setTestResults(null);
    setIsTestActive(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (qId, optionIdx) => {
    setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const toggleFlag = (qId) => {
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  const handleFinalSubmit = () => {
    setShowSubmitConfirm(false);
    setIsTestActive(false);

    // Calculate score
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    questionsList.forEach((q) => {
      const selected = userAnswers[q.id];
      if (selected === undefined) {
        unansweredCount++;
      } else if (selected === q.answer) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const totalQ = questionsList.length;
    const scorePct = Math.round((correctCount / totalQ) * 100);
    const timeUsedSec = (testDurationMinutes * 60) - secondsRemaining;
    const timeUsedMin = Math.ceil(timeUsedSec / 60);

    let grade = 'Fair';
    if (scorePct >= 80) grade = 'Distinction (Top Score)';
    else if (scorePct >= 65) grade = 'Qualified (Target Met)';
    else if (scorePct >= 50) grade = 'Pass';

    const resultObj = {
      subjectId: selectedSubject.id,
      subjectName: selectedSubject.name,
      examType: selectedExamType,
      score: correctCount,
      totalQuestions: totalQ,
      percentage: scorePct,
      correctCount,
      incorrectCount,
      unansweredCount,
      timeSpent: `${timeUsedMin} mins`,
      grade
    };

    setTestResults(resultObj);
    addCbtAttempt(resultObj);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* VIEW 1: CBT SETUP / LANDING */}
      {!isTestActive && !testResults && (
        <div className="space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="bg-amber-400/10 text-amber-300 border border-amber-400/30 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider font-mono">
              CBT Practice Engine
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
              Computer-Based Test Simulator
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Select your examination target and subject to launch a timed CBT practice session with instant score analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Subject Selector List */}
            <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
              
              <div>
                <h3 className="font-heading font-bold text-base text-white mb-3">1. Select Target Examination</h3>
                <div className="grid grid-cols-3 gap-3">
                  {['JAMB UTME', 'UNILAG Post-UTME', 'WAEC / SSCE'].map((exam) => (
                    <button
                      key={exam}
                      onClick={() => setSelectedExamType(exam)}
                      className={`p-3 text-xs font-bold rounded-xl border transition ${
                        selectedExamType === exam
                          ? 'bg-amber-400/15 border-amber-400 text-amber-300 shadow'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {exam}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-heading font-bold text-base text-white mb-3">2. Select Subject</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CBT_SUBJECTS.map((sub) => {
                    const isSelected = selectedSubject.id === sub.id;
                    return (
                      <div
                        key={sub.id}
                        onClick={() => setSelectedSubject(sub)}
                        className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                          isSelected
                            ? 'bg-gradient-to-r from-navy-900 to-brandBlue-900 border-amber-400 shadow-lg'
                            : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <p className={`font-bold text-sm ${isSelected ? 'text-amber-300' : 'text-white'}`}>
                            {sub.name}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                            {questionsList.length} Questions Available
                          </p>
                        </div>
                        {isSelected && <CheckCircle2 size={18} className="text-amber-400" />}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Config & Launch Card */}
            <div className="lg:col-span-4 glass-card p-6 rounded-3xl border border-amber-400/30 shadow-2xl space-y-6">
              
              <div className="text-center pb-4 border-b border-slate-800">
                <span className="text-[10px] font-mono uppercase text-amber-400">Configuration</span>
                <h3 className="font-heading font-extrabold text-xl text-white mt-1">Ready to Test</h3>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">Target Exam:</span>
                  <span className="font-bold text-white">{selectedExamType}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">Subject:</span>
                  <span className="font-bold text-amber-300">{selectedSubject.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">Total Questions:</span>
                  <span className="font-bold text-white">{questionsList.length} Items</span>
                </div>

                <div>
                  <span className="text-slate-400 block mb-2">Timer Duration:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[15, 20, 30].map((mins) => (
                      <button
                        key={mins}
                        onClick={() => setTestDurationMinutes(mins)}
                        className={`py-2 text-xs font-bold rounded-lg border ${
                          testDurationMinutes === mins
                            ? 'bg-amber-400 text-slate-950 border-amber-400'
                            : 'bg-slate-900 border-slate-800 text-slate-300'
                        }`}
                      >
                        {mins} Mins
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={startTest}
                className="w-full py-4 text-sm font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-xl transition flex items-center justify-center gap-2"
              >
                <Play size={18} fill="currentColor" /> Start CBT Examination
              </button>

            </div>

          </div>

        </div>
      )}

      {/* VIEW 2: RUNNING TEST SIMULATOR INTERFACE */}
      {isTestActive && (
        <div className="space-y-6">
          
          {/* Top Bar: Subject, Timer & Submit */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 sticky top-24 z-40">
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">{selectedExamType}</span>
              <h3 className="font-heading font-extrabold text-lg text-white">{selectedSubject.name}</h3>
            </div>

            {/* Countdown Timer */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-extrabold text-sm ${
              secondsRemaining < 300 
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse' 
                : 'bg-slate-900 text-amber-300 border-slate-700'
            }`}>
              <Clock size={16} />
              <span>TIME REMAINING: {formatTimer(secondsRemaining)}</span>
            </div>

            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition shadow"
            >
              Submit Examination
            </button>
          </div>

          {/* Test Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Active Question Box */}
            <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              
              {/* Question Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400">
                  Question <strong className="text-amber-400 text-sm">{currentQuestionIndex + 1}</strong> of {questionsList.length}
                </span>

                <button
                  onClick={() => toggleFlag(questionsList[currentQuestionIndex].id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                    flaggedQuestions.has(questionsList[currentQuestionIndex].id)
                      ? 'bg-amber-400/20 text-amber-300 border-amber-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <Flag size={14} />
                  {flaggedQuestions.has(questionsList[currentQuestionIndex].id) ? 'Flagged for Review' : 'Flag Question'}
                </button>
              </div>

              {/* Question Text */}
              <div className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                <span dangerouslySetInnerHTML={{ __html: questionsList[currentQuestionIndex].question }} />
              </div>

              {/* Answer Options */}
              <div className="space-y-3 pt-2">
                {questionsList[currentQuestionIndex].options.map((optionText, optIdx) => {
                  const qId = questionsList[currentQuestionIndex].id;
                  const isSelected = userAnswers[qId] === optIdx;
                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(qId, optIdx)}
                      className={`p-4 rounded-xl border cursor-pointer transition text-xs sm:text-sm font-medium ${
                        isSelected
                          ? 'bg-amber-400/15 border-amber-400 text-amber-300 font-bold shadow-md'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                      }`}
                    >
                      {optionText}
                    </div>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                  className="px-4 py-2 text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <ArrowLeft size={14} /> Previous
                </button>

                {currentQuestionIndex < questionsList.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                    className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition flex items-center gap-1.5 shadow"
                  >
                    Next Question <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowSubmitConfirm(true)}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition shadow"
                  >
                    Finish & Review
                  </button>
                )}
              </div>

            </div>

            {/* Question Palette Drawer */}
            <div className="lg:col-span-4 glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
              <h4 className="font-heading font-bold text-xs text-white uppercase tracking-wider">
                Question Palette Navigation
              </h4>

              <div className="grid grid-cols-5 gap-2">
                {questionsList.map((q, idx) => {
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isFlagged = flaggedQuestions.has(q.id);
                  const isCurrent = currentQuestionIndex === idx;

                  let colorClass = 'bg-slate-900 border-slate-800 text-slate-400';
                  if (isCurrent) colorClass = 'bg-blue-600 text-white font-extrabold border-blue-400 ring-2 ring-blue-400/50';
                  else if (isFlagged) colorClass = 'bg-amber-400/20 text-amber-300 border-amber-400 font-bold';
                  else if (isAnswered) colorClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold';

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`h-9 text-xs rounded-lg border transition flex items-center justify-center relative ${colorClass}`}
                    >
                      {idx + 1}
                      {isFlagged && <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-amber-400 rounded-full" />}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2 text-[11px] text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-emerald-500/20 border border-emerald-500 rounded" />
                  <span>Answered ({Object.keys(userAnswers).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-amber-400/20 border border-amber-400 rounded" />
                  <span>Flagged ({flaggedQuestions.size})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-slate-900 border border-slate-800 rounded" />
                  <span>Unanswered ({questionsList.length - Object.keys(userAnswers).length})</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* CONFIRM SUBMISSION MODAL */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel p-6 rounded-2xl max-w-sm w-full border border-slate-700 text-center space-y-4">
            <AlertCircle size={40} className="mx-auto text-amber-400" />
            <h3 className="font-heading font-bold text-lg text-white">Submit Examination?</h3>
            <p className="text-xs text-slate-300">
              You have answered <strong className="text-amber-300">{Object.keys(userAnswers).length}</strong> out of <strong className="text-white">{questionsList.length}</strong> questions.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 py-2.5 text-xs font-semibold text-slate-300 bg-slate-800 rounded-xl hover:bg-slate-700 transition"
              >
                Return to Test
              </button>
              <button
                onClick={handleFinalSubmit}
                className="flex-1 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: DETAILED TEST RESULTS & PERFORMANCE ANALYTICS */}
      {testResults && (
        <div className="space-y-10 animate-fadeIn">
          
          {/* Result Card Header */}
          <div className="glass-panel p-8 rounded-3xl border border-amber-400/40 text-center space-y-4 shadow-2xl">
            <span className="bg-amber-400/10 text-amber-300 border border-amber-400/30 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider font-mono">
              Examination Report Card
            </span>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
              {testResults.subjectName} — {testResults.examType}
            </h2>

            <div className="flex justify-center items-baseline gap-2 py-2">
              <span className="font-heading font-extrabold text-5xl sm:text-6xl text-amber-400">
                {testResults.percentage}%
              </span>
              <span className="text-sm font-mono text-slate-400">
                ({testResults.score} / {testResults.totalQuestions} Correct)
              </span>
            </div>

            <p className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 rounded-full w-fit mx-auto">
              Status: {testResults.grade}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto pt-4 text-xs font-mono">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Correct</span>
                <span className="text-emerald-400 font-bold text-base">{testResults.correctCount}</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Incorrect</span>
                <span className="text-rose-400 font-bold text-base">{testResults.incorrectCount}</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Unanswered</span>
                <span className="text-amber-400 font-bold text-base">{testResults.unansweredCount}</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Time Used</span>
                <span className="text-white font-bold text-base">{testResults.timeSpent}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={startTest}
                className="px-6 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition flex items-center justify-center gap-2"
              >
                <RotateCcw size={15} /> Retake Test
              </button>
              <button
                onClick={() => setActiveTab('DASHBOARD')}
                className="px-6 py-3 text-xs font-bold text-white border border-slate-700 bg-slate-900 rounded-xl transition"
              >
                View Score History in Dashboard
              </button>
            </div>
          </div>

          {/* Detailed Question Explanations */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-xl text-white">Answer Key & Solution Breakdown</h3>
            <div className="space-y-4">
              {questionsList.map((q, idx) => {
                const userAns = userAnswers[q.id];
                const isCorrect = userAns === q.answer;
                const isUnanswered = userAns === undefined;

                return (
                  <div
                    key={q.id}
                    className={`glass-card p-6 rounded-2xl border ${
                      isCorrect 
                        ? 'border-emerald-500/40 bg-emerald-500/5' 
                        : isUnanswered 
                        ? 'border-amber-400/30 bg-amber-400/5' 
                        : 'border-rose-500/40 bg-rose-500/5'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <span className="font-mono text-xs font-bold text-slate-400">Question {idx + 1}</span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        isCorrect ? 'bg-emerald-500/20 text-emerald-300' : isUnanswered ? 'bg-amber-400/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {isCorrect ? 'Correct (+1)' : isUnanswered ? 'Skipped (0)' : 'Incorrect (0)'}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-white font-semibold mb-3">
                      <span dangerouslySetInnerHTML={{ __html: q.question }} />
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                      {q.options.map((opt, oIdx) => {
                        let optStyle = 'bg-slate-900/60 border-slate-800 text-slate-400';
                        if (oIdx === q.answer) optStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                        else if (oIdx === userAns && !isCorrect) optStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold';

                        return (
                          <div key={oIdx} className={`p-2.5 rounded-lg border ${optStyle}`}>
                            {opt}
                          </div>
                        );
                      })}
                    </div>

                    {q.explanation && (
                      <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                        <strong className="text-amber-300">Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
