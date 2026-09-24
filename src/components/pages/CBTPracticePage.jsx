import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { 
  CBT_SUBJECTS, 
  CBT_QUESTIONS, 
  VARSITY_EXAM_PROFILES, 
  resolveVarsityKey, 
  getCustomVarsityProfile 
} from '../../data/cbtData';
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
  BarChart2,
  GraduationCap,
  Building2,
  Sparkles,
  ShieldCheck,
  Sliders
} from '../icons/FontAwesomeIcons';

export default function CBTPracticePage() {
  const { addCbtAttempt, setActiveTab } = useApp();
  const { user } = useAuth();

  // Resolve candidate's registered varsity of choice
  const userVarsityName = user?.targetInstitution || 'University of Lagos (UNILAG)';
  const defaultVarsityKey = resolveVarsityKey(userVarsityName);

  // Selected Varsity for Post-UTME Simulation (defaults to candidate's school of choice)
  const [selectedVarsityKey, setSelectedVarsityKey] = useState(defaultVarsityKey);

  // Synchronize when candidate signs in or changes profile
  useEffect(() => {
    if (user?.targetInstitution) {
      setSelectedVarsityKey(resolveVarsityKey(user.targetInstitution));
    }
  }, [user?.targetInstitution]);

  const activeVarsity = useMemo(() => {
    if (VARSITY_EXAM_PROFILES[selectedVarsityKey]) {
      return VARSITY_EXAM_PROFILES[selectedVarsityKey];
    }
    return getCustomVarsityProfile(user?.targetInstitution || selectedVarsityKey);
  }, [selectedVarsityKey, user?.targetInstitution]);

  // Test Config State
  const [selectedExamType, setSelectedExamType] = useState('POST_UTME'); // 'POST_UTME' | 'JAMB_UTME' | 'WAEC'
  const [selectedSubject, setSelectedSubject] = useState(CBT_SUBJECTS[0]);
  const [questionCountChoice, setQuestionCountChoice] = useState(10); // User-selected question count
  const [testDurationMinutes, setTestDurationMinutes] = useState(20);
  
  // Test Running State
  const [isTestActive, setIsTestActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionId: optionIndex }
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [activeTestQuestions, setActiveTestQuestions] = useState([]);
  
  // Timer State
  const [secondsRemaining, setSecondsRemaining] = useState(20 * 60);
  const timerRef = useRef(null);

  // Submit Modal & Result State
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [testResults, setTestResults] = useState(null);

  // Build the raw question pool based on exam type and school of choice
  const rawQuestionPool = useMemo(() => {
    if (selectedExamType === 'POST_UTME') {
      const vKey = selectedVarsityKey.toLowerCase();
      const specificKey = `postutme_${vKey}`;
      const varsityQuestions = CBT_QUESTIONS[specificKey] || CBT_QUESTIONS.postutme_unilag || [];
      
      // Combine with relevant subject questions to form a comprehensive varsity screening battery
      let complementary = [];
      if (vKey === 'futa') {
        complementary = [...(CBT_QUESTIONS.maths || []), ...(CBT_QUESTIONS.physics || [])];
      } else if (vKey === 'lasu' || vKey === 'unilorin') {
        complementary = [...(CBT_QUESTIONS.english || []), ...(CBT_QUESTIONS.government || [])];
      } else {
        complementary = [...(CBT_QUESTIONS.english || []), ...(CBT_QUESTIONS.maths || [])];
      }
      
      return [...varsityQuestions, ...complementary];
    }
    
    // Regular JAMB / WAEC subject pool
    return CBT_QUESTIONS[selectedSubject.id] || CBT_QUESTIONS.english;
  }, [selectedExamType, selectedVarsityKey, selectedSubject.id]);

  // Adjust duration preset when exam type or varsity changes
  useEffect(() => {
    if (selectedExamType === 'POST_UTME') {
      setTestDurationMinutes(activeVarsity.defaultDuration || 30);
    }
  }, [selectedExamType, activeVarsity]);

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

  // Start Test with the User's Chosen Question Count
  const startTest = () => {
    // Slice questions according to user's question count choice
    let chosenPool = [...rawQuestionPool];
    
    if (questionCountChoice !== 'All') {
      const countNum = parseInt(questionCountChoice, 10);
      if (!isNaN(countNum) && countNum > 0) {
        // If question pool is smaller than chosen count, cycle/pad to satisfy user choice
        if (chosenPool.length < countNum && chosenPool.length > 0) {
          while (chosenPool.length < countNum) {
            const nextIdx = chosenPool.length;
            const sourceQ = rawQuestionPool[nextIdx % rawQuestionPool.length];
            chosenPool.push({
              ...sourceQ,
              id: `${sourceQ.id}_cycle_${nextIdx}`
            });
          }
        }
        chosenPool = chosenPool.slice(0, countNum);
      }
    }

    setActiveTestQuestions(chosenPool);
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

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    activeTestQuestions.forEach((q) => {
      const selected = userAnswers[q.id];
      if (selected === undefined) {
        unansweredCount++;
      } else if (selected === q.answer) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const totalQ = activeTestQuestions.length;
    const scorePct = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
    const timeUsedSec = (testDurationMinutes * 60) - secondsRemaining;
    const timeUsedMin = Math.ceil(timeUsedSec / 60);

    let grade = 'Fair';
    if (scorePct >= 80) grade = 'Distinction (Top Score)';
    else if (scorePct >= 65) grade = 'Qualified (Target Met)';
    else if (scorePct >= 50) grade = 'Pass';

    const testSubjectLabel = selectedExamType === 'POST_UTME' 
      ? `${activeVarsity.shortName} Post-UTME (${activeVarsity.name})`
      : selectedSubject.name;

    const resultObj = {
      subjectId: selectedExamType === 'POST_UTME' ? `postutme_${selectedVarsityKey}` : selectedSubject.id,
      subjectName: testSubjectLabel,
      examType: selectedExamType === 'POST_UTME' ? `${activeVarsity.shortName} Post-UTME` : selectedExamType,
      score: correctCount,
      totalQuestions: totalQ,
      percentage: scorePct,
      correctCount,
      incorrectCount,
      unansweredCount,
      timeSpent: `${timeUsedMin} mins`,
      grade,
      date: new Date().toLocaleDateString('en-GB')
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

  const isUserCandidateChoice = user?.targetInstitution && (
    activeVarsity.id.toLowerCase() === defaultVarsityKey.toLowerCase() ||
    user.targetInstitution.toLowerCase().includes(activeVarsity.id.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* VIEW 1: CBT SETUP / LANDING */}
      {!isTestActive && !testResults && (
        <div className="space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="bg-amber-400/10 text-amber-300 border border-amber-400/30 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider font-mono">
              CBT Practice & Post-UTME Engine
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
              Computer-Based Test Simulator
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Mimic the actual computer-based examinations of your university of choice or practice standard UTME & SSCE subjects with customizable question counts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Exam & Subject Selection */}
            <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8">
              
              {/* Step 1: Select Exam Mode */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-sm sm:text-base text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center">1</span>
                    Select Examination Target
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Option A: School of Choice Post-UTME Simulator */}
                  <button
                    type="button"
                    onClick={() => setSelectedExamType('POST_UTME')}
                    className={`p-4 rounded-2xl border text-left transition relative ${
                      selectedExamType === 'POST_UTME'
                        ? 'bg-gradient-to-br from-amber-400/20 via-brandBlue-900 to-navy-950 border-amber-400 text-white shadow-lg ring-1 ring-amber-400/40'
                        : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase text-amber-400 flex items-center gap-1">
                        <Building2 size={12} /> Post-UTME Simulator
                      </span>
                      {selectedExamType === 'POST_UTME' && <CheckCircle2 size={16} className="text-amber-400" />}
                    </div>
                    <h4 className="font-bold text-sm text-white">{activeVarsity.shortName} Screening</h4>
                    <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                      {isUserCandidateChoice ? 'Mimics your registered university of choice.' : `Mimics ${activeVarsity.name}.`}
                    </p>
                    {isUserCandidateChoice && (
                      <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[9px] font-mono font-black uppercase shadow">
                        ★ Your Choice
                      </span>
                    )}
                  </button>

                  {/* Option B: JAMB UTME Simulator */}
                  <button
                    type="button"
                    onClick={() => setSelectedExamType('JAMB_UTME')}
                    className={`p-4 rounded-2xl border text-left transition ${
                      selectedExamType === 'JAMB_UTME'
                        ? 'bg-gradient-to-br from-amber-400/20 via-brandBlue-900 to-navy-950 border-amber-400 text-white shadow-lg ring-1 ring-amber-400/40'
                        : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase text-amber-400 flex items-center gap-1">
                        <GraduationCap size={12} /> JAMB UTME 2026
                      </span>
                      {selectedExamType === 'JAMB_UTME' && <CheckCircle2 size={16} className="text-amber-400" />}
                    </div>
                    <h4 className="font-bold text-sm text-white">JAMB UTME CBT</h4>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Standard 4-option JAMB mock tests across syllabus topics.
                    </p>
                  </button>

                  {/* Option C: WAEC / SSCE */}
                  <button
                    type="button"
                    onClick={() => setSelectedExamType('WAEC')}
                    className={`p-4 rounded-2xl border text-left transition ${
                      selectedExamType === 'WAEC'
                        ? 'bg-gradient-to-br from-amber-400/20 via-brandBlue-900 to-navy-950 border-amber-400 text-white shadow-lg ring-1 ring-amber-400/40'
                        : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase text-amber-400 flex items-center gap-1">
                        <Award size={12} /> Senior SSCE
                      </span>
                      {selectedExamType === 'WAEC' && <CheckCircle2 size={16} className="text-amber-400" />}
                    </div>
                    <h4 className="font-bold text-sm text-white">WAEC / NECO Mock</h4>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Curriculum objective mock tests for secondary finalists.
                    </p>
                  </button>
                </div>
              </div>

              {/* Step 2A: POST-UTME VARSITY SELECTOR & FORMAT BANNER (when Post-UTME is selected) */}
              {selectedExamType === 'POST_UTME' ? (
                <div className="space-y-4 pt-2 border-t border-slate-800/80 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="font-heading font-bold text-sm sm:text-base text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center">2</span>
                      Institution Post-UTME Exam Simulator
                    </h3>
                    {user?.targetInstitution && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-mono font-bold self-start">
                        School of Choice: {user.targetInstitution}
                      </span>
                    )}
                  </div>

                  {/* University Switcher Pills */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {Object.keys(VARSITY_EXAM_PROFILES).map((key) => {
                      const v = VARSITY_EXAM_PROFILES[key];
                      const isSelected = selectedVarsityKey === key;
                      const isRegisteredChoice = defaultVarsityKey === key;

                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setSelectedVarsityKey(key)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-amber-400 text-slate-950 border-amber-400 shadow font-black'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                          }`}
                        >
                          <span>{v.shortName}</span>
                          {isRegisteredChoice && (
                            <span 
                              title="Your registered varsity" 
                              className={`w-2 h-2 rounded-full ${isSelected ? 'bg-slate-950' : 'bg-amber-400 animate-pulse'}`} 
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Varsity Exam Architecture Spotlight */}
                  <div className="p-5 sm:p-6 bg-slate-900/90 rounded-2xl border border-amber-400/30 space-y-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono font-bold uppercase">
                          {activeVarsity.campaignBadge}
                        </span>
                        {isUserCandidateChoice && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-mono font-black shadow">
                            <CheckCircle2 size={11} /> Registered Choice ({user?.targetCourse || 'Target Course'})
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        Default Time: <strong className="text-white">{activeVarsity.defaultDuration} Mins</strong>
                      </span>
                    </div>

                    <div>
                      <h4 className="font-heading font-extrabold text-lg text-white">
                        {activeVarsity.examName}
                      </h4>
                      <p className="text-xs text-amber-300/90 font-mono mt-0.5">
                        {activeVarsity.formatTitle}
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeVarsity.instructions}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono pt-2 border-t border-slate-800 text-slate-300">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Screening Weight:</span>
                        <span className="text-white font-semibold">{activeVarsity.scoringWeight}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Exam Question Breakdown:</span>
                        <span className="text-amber-300 font-semibold">{activeVarsity.breakdown}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Step 2B: SUBJECT SELECTOR (when JAMB / WAEC is selected) */
                <div className="space-y-4 pt-2 border-t border-slate-800/80 animate-fadeIn">
                  <h3 className="font-heading font-bold text-sm sm:text-base text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center">2</span>
                    Select Subject
                  </h3>

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
                              {CBT_QUESTIONS[sub.id]?.length || 10} Questions in Database
                            </p>
                          </div>
                          {isSelected && <CheckCircle2 size={18} className="text-amber-400" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: QUESTION COUNT & TIMER CONTROLS CARD */}
            <div className="lg:col-span-4 glass-card p-6 rounded-3xl border border-amber-400/30 shadow-2xl space-y-6">
              
              <div className="text-center pb-4 border-b border-slate-800">
                <span className="text-[10px] font-mono uppercase text-amber-400">Simulation Settings</span>
                <h3 className="font-heading font-extrabold text-xl text-white mt-1">Ready to Test</h3>
              </div>

              {/* Summary of Configuration */}
              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Format:</span>
                  <span className="font-bold text-white text-right truncate max-w-[180px]">
                    {selectedExamType === 'POST_UTME' ? `${activeVarsity.shortName} Post-UTME` : selectedExamType}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Subject/Battery:</span>
                  <span className="font-bold text-amber-300 text-right truncate max-w-[180px]">
                    {selectedExamType === 'POST_UTME' ? 'Varsity Screening Battery' : selectedSubject.name}
                  </span>
                </div>
              </div>

              {/* QUESTION COUNT SELECTOR (Requirement: Choose number of questions) */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Sliders size={13} className="text-amber-400" /> Choose Question Count:
                  </span>
                  <span className="text-xs font-mono font-extrabold text-amber-400">
                    {questionCountChoice} Items
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[5, 10, 15, 20].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setQuestionCountChoice(count)}
                      className={`py-2 text-xs font-bold rounded-xl border transition ${
                        questionCountChoice === count
                          ? 'bg-amber-400 text-slate-950 border-amber-400 shadow font-black'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {count} Qs
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setQuestionCountChoice(30)}
                    className={`py-2 text-xs font-bold rounded-xl border transition ${
                      questionCountChoice === 30
                        ? 'bg-amber-400 text-slate-950 border-amber-400 shadow font-black'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    30 Qs (Full Mock)
                  </button>

                  <button
                    type="button"
                    onClick={() => setQuestionCountChoice('All')}
                    className={`py-2 text-xs font-bold rounded-xl border transition ${
                      questionCountChoice === 'All'
                        ? 'bg-amber-400 text-slate-950 border-amber-400 shadow font-black'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    All Available
                  </button>
                </div>
              </div>

              {/* TIMER DURATION SELECTOR */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Clock size={13} className="text-amber-400" /> Exam Duration:
                  </span>
                  <span className="text-xs font-mono font-extrabold text-amber-400">
                    {testDurationMinutes} Minutes
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[10, 15, 20, 30].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setTestDurationMinutes(mins)}
                      className={`py-2 text-xs font-bold rounded-xl border transition ${
                        testDurationMinutes === mins
                          ? 'bg-amber-400 text-slate-950 border-amber-400 shadow font-black'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Launch Action */}
              <button
                type="button"
                onClick={startTest}
                className="w-full py-4 text-xs sm:text-sm font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-xl transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Play size={16} /> 
                <span>
                  Start {selectedExamType === 'POST_UTME' ? `${activeVarsity.shortName} Post-UTME` : 'CBT'} ({questionCountChoice} Qs)
                </span>
              </button>

            </div>

          </div>

        </div>
      )}

      {/* VIEW 2: RUNNING TEST SIMULATOR INTERFACE */}
      {isTestActive && activeTestQuestions.length > 0 && (
        <div className="space-y-6">
          
          {/* Top Bar: Subject, Timer & Submit */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 sticky top-20 z-40 shadow-xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                  {selectedExamType === 'POST_UTME' ? `${activeVarsity.shortName} POST-UTME SIMULATOR` : selectedExamType}
                </span>
                {selectedExamType === 'POST_UTME' && isUserCandidateChoice && (
                  <span className="px-2 py-0.5 bg-amber-400/20 text-amber-300 rounded text-[9px] font-mono font-bold">
                    Target Varsity
                  </span>
                )}
              </div>
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-white">
                {selectedExamType === 'POST_UTME' ? activeVarsity.name : selectedSubject.name}
              </h3>
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
              type="button"
              onClick={() => setShowSubmitConfirm(true)}
              className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition shadow flex items-center gap-1.5"
            >
              <CheckCircle2 size={14} /> Submit Examination
            </button>
          </div>

          {/* Test Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Active Question Box */}
            <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              
              {/* Question Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400">
                  Question <strong className="text-amber-400 text-sm">{currentQuestionIndex + 1}</strong> of {activeTestQuestions.length}
                </span>

                <button
                  type="button"
                  onClick={() => toggleFlag(activeTestQuestions[currentQuestionIndex].id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                    flaggedQuestions.has(activeTestQuestions[currentQuestionIndex].id)
                      ? 'bg-amber-400/20 text-amber-300 border-amber-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <Flag size={13} />
                  {flaggedQuestions.has(activeTestQuestions[currentQuestionIndex].id) ? 'Flagged for Review' : 'Flag Question'}
                </button>
              </div>

              {/* Question Text */}
              <div className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                <span dangerouslySetInnerHTML={{ __html: activeTestQuestions[currentQuestionIndex].question }} />
              </div>

              {/* Answer Options */}
              <div className="space-y-3 pt-2">
                {activeTestQuestions[currentQuestionIndex].options.map((optionText, optIdx) => {
                  const qId = activeTestQuestions[currentQuestionIndex].id;
                  const isSelected = userAnswers[qId] === optIdx;
                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(qId, optIdx)}
                      className={`p-4 rounded-xl border cursor-pointer transition text-xs sm:text-sm font-medium ${
                        isSelected
                          ? 'bg-amber-400/15 border-amber-400 text-amber-300 font-bold shadow-md ring-1 ring-amber-400/40'
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
                  type="button"
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <ArrowLeft size={14} /> Previous
                </button>

                {currentQuestionIndex < activeTestQuestions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                    className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition flex items-center gap-1.5 shadow"
                  >
                    Next Question <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowSubmitConfirm(true)}
                    className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition shadow flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={14} /> Finish & Submit
                  </button>
                )}
              </div>

            </div>

            {/* Question Palette Drawer */}
            <div className="lg:col-span-4 glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-xs text-white uppercase tracking-wider">
                  Question Palette ({activeTestQuestions.length})
                </h4>
                <span className="text-[10px] font-mono text-amber-400 font-bold">
                  {Object.keys(userAnswers).length}/{activeTestQuestions.length} Done
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2 max-h-[300px] overflow-y-auto p-1">
                {activeTestQuestions.map((q, idx) => {
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isFlagged = flaggedQuestions.has(q.id);
                  const isCurrent = currentQuestionIndex === idx;

                  let colorClass = 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white';
                  if (isCurrent) colorClass = 'bg-blue-600 text-white font-extrabold border-blue-400 ring-2 ring-blue-400/50';
                  else if (isFlagged) colorClass = 'bg-amber-400/20 text-amber-300 border-amber-400 font-bold';
                  else if (isAnswered) colorClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold';

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`h-9 text-xs rounded-lg border transition flex items-center justify-center relative ${colorClass}`}
                    >
                      {idx + 1}
                      {isFlagged && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-400 rounded-full" />}
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
                  <span>Unanswered ({activeTestQuestions.length - Object.keys(userAnswers).length})</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* CONFIRM SUBMISSION MODAL */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-sm w-full border border-slate-700 text-center space-y-4 shadow-2xl">
            <AlertCircle size={40} className="mx-auto text-amber-400" />
            <h3 className="font-heading font-bold text-lg text-white">Submit Examination?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              You have answered <strong className="text-amber-300">{Object.keys(userAnswers).length}</strong> out of <strong className="text-white">{activeTestQuestions.length}</strong> questions chosen for this simulation.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 py-2.5 text-xs font-semibold text-slate-300 bg-slate-800 rounded-xl hover:bg-slate-700 transition"
              >
                Return to Test
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="flex-1 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition shadow"
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
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-amber-400/40 text-center space-y-5 shadow-2xl">
            <span className="bg-amber-400/10 text-amber-300 border border-amber-400/30 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider font-mono">
              Examination Report Card
            </span>

            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
              {testResults.subjectName}
            </h2>

            <div className="flex justify-center items-baseline gap-2 py-2">
              <span className="font-heading font-extrabold text-5xl sm:text-6xl text-amber-400">
                {testResults.percentage}%
              </span>
              <span className="text-sm font-mono text-slate-400">
                ({testResults.score} / {testResults.totalQuestions} Questions Correct)
              </span>
            </div>

            <p className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 rounded-full w-fit mx-auto">
              Status: {testResults.grade}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto pt-4 text-xs font-mono">
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Correct</span>
                <span className="text-emerald-400 font-bold text-base">{testResults.correctCount}</span>
              </div>
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Incorrect</span>
                <span className="text-rose-400 font-bold text-base">{testResults.incorrectCount}</span>
              </div>
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Unanswered</span>
                <span className="text-amber-400 font-bold text-base">{testResults.unansweredCount}</span>
              </div>
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Time Used</span>
                <span className="text-white font-bold text-base">{testResults.timeSpent}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <button
                type="button"
                onClick={startTest}
                className="px-6 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition flex items-center justify-center gap-2 shadow"
              >
                <RotateCcw size={14} /> Retake Simulator
              </button>
              <button
                type="button"
                onClick={() => {
                  setTestResults(null);
                  setIsTestActive(false);
                }}
                className="px-6 py-3 text-xs font-bold text-slate-300 hover:text-white border border-slate-700 bg-slate-900 rounded-xl transition"
              >
                Configure New Test
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('DASHBOARD')}
                className="px-6 py-3 text-xs font-bold text-amber-300 border border-amber-400/40 bg-amber-400/10 rounded-xl transition"
              >
                View Score in Dashboard
              </button>
            </div>
          </div>

          {/* Detailed Question Explanations */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-xl text-white">Answer Key & Solution Explanations</h3>
            <div className="space-y-4">
              {activeTestQuestions.map((q, idx) => {
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
