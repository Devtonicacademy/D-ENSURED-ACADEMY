// D ENSURED ACADEMY CBT SIMULATOR QUESTION REPOSITORY & VARSITY EXAM ARCHITECTURE

export const CBT_SUBJECTS = [
  { id: 'english', name: 'Use of English', questionCount: 40, icon: 'BookOpen' },
  { id: 'maths', name: 'Mathematics', questionCount: 40, icon: 'Calculator' },
  { id: 'physics', name: 'Physics', questionCount: 40, icon: 'Zap' },
  { id: 'chemistry', name: 'Chemistry', questionCount: 40, icon: 'FlaskConical' },
  { id: 'biology', name: 'Biology', questionCount: 40, icon: 'Dna' },
  { id: 'economics', name: 'Economics', questionCount: 40, icon: 'TrendingUp' },
  { id: 'government', name: 'Government', questionCount: 40, icon: 'Landmark' }
];

export const VARSITY_EXAM_PROFILES = {
  UNILAG: {
    id: 'UNILAG',
    shortName: 'UNILAG',
    name: 'University of Lagos (UNILAG)',
    examName: 'UNILAG Post-UTME CBT Screening',
    formatTitle: '30-Mark Screening Format (Speed & Accuracy)',
    defaultDuration: 30, // 30 minutes
    defaultQuestionCount: 30,
    scoringWeight: 'Contributes 30% of Total Aggregate (JAMB 50% + P-UTME 30% + O\'Level 20%)',
    breakdown: 'Mathematics (10–15 items), Use of English (10 items), General Knowledge & UNILAG Trivia (5–10 items)',
    campaignBadge: 'UNILAG Target 25/30 Drill',
    instructions: 'UNILAG tests rapid numerical computation, English vocabulary, and general campus knowledge. No physical calculators allowed; speed is essential (average 45-60 seconds per question).'
  },
  LASU: {
    id: 'LASU',
    shortName: 'LASU',
    name: 'Lagos State University (LASU)',
    examName: 'LASU Online Screening & Point Aptitude Exam',
    formatTitle: 'Online Screening & Point Grading System',
    defaultDuration: 25,
    defaultQuestionCount: 25,
    scoringWeight: 'Evaluated alongside O\'Level Distinction Points for Merit Cut-off Placement',
    breakdown: 'English Language, Quantitative Analysis, Current Affairs & Lagos State History',
    campaignBadge: 'LASU Merit Point Booster',
    instructions: 'Focuses heavily on Use of English, critical reasoning, and broad knowledge of Nigerian and Lagos State historical context.'
  },
  UI: {
    id: 'UI',
    shortName: 'UI',
    name: 'University of Ibadan (UI)',
    examName: 'UI Post-UTME Computer-Based Screening',
    formatTitle: 'Premier University Analytical Assessment',
    defaultDuration: 40,
    defaultQuestionCount: 30,
    scoringWeight: 'Equal Weight Formula: (JAMB / 8) + (UI Post-UTME / 2) = 100 Marks',
    breakdown: 'Advanced English Comprehension, Deductive Logic & Critical Thinking, Subject Specialty',
    campaignBadge: 'UI 70%+ Distinction Prep',
    instructions: 'UI is known for demanding reading passages and rigorous logical deduction. Precision and careful reading are rewarded over rushing.'
  },
  OAU: {
    id: 'OAU',
    shortName: 'OAU',
    name: 'Obafemi Awolowo University (OAU)',
    examName: 'OAU Computer-Based Screening Exam',
    formatTitle: 'Great Ife Speed & Precision Assessment',
    defaultDuration: 30,
    defaultQuestionCount: 30,
    scoringWeight: 'JAMB (50%) + OAU Screening (40%) + O\'Level (10%)',
    breakdown: '4 Core UTME Combination Subjects + General Varsity Aptitude',
    campaignBadge: 'Great Ife Speed Drill',
    instructions: 'OAU screening requires high speed and deep subject mastery. Departmental cut-offs for Health Sciences and Law are exceptionally competitive.'
  },
  FUTA: {
    id: 'FUTA',
    shortName: 'FUTA',
    name: 'Federal University of Technology, Akure (FUTA)',
    examName: 'FUTA Computer-Based Screening Test (CBST)',
    formatTitle: 'Science, Technology & Quantitative CBST Format',
    defaultDuration: 30,
    defaultQuestionCount: 25,
    scoringWeight: 'JAMB (50%) + FUTA CBST (50%) Aggregate Formula',
    breakdown: 'Mathematics (10 items), General Science & Tech Concepts (10 items), English (5 items)',
    campaignBadge: 'FUTA Tech Aptitude Master',
    instructions: 'Heavily emphasizes physical sciences, mathematical formulas, and logical reasoning suited for engineering and computing applicants.'
  },
  UNIBEN: {
    id: 'UNIBEN',
    shortName: 'UNIBEN',
    name: 'University of Benin (UNIBEN)',
    examName: 'UNIBEN Post-UTME Screening Exam',
    formatTitle: '4-Subject Speed Screening Examination',
    defaultDuration: 30,
    defaultQuestionCount: 30,
    scoringWeight: 'JAMB (50%) + UNIBEN Post-UTME (50%)',
    breakdown: 'Core JAMB Subjects (10 items per subject) + General Knowledge',
    campaignBadge: 'UNIBEN Golden Prep',
    instructions: 'Mimics the exact format of the University of Benin screening with rapid-fire questions across the candidate\'s combination.'
  },
  UNILORIN: {
    id: 'UNILORIN',
    shortName: 'UNILORIN',
    name: 'University of Ilorin (UNILORIN)',
    examName: 'UNILORIN Pre-Admission Screening Test',
    formatTitle: 'General Studies & Speed Aptitude Test',
    defaultDuration: 25,
    defaultQuestionCount: 30,
    scoringWeight: 'Integrated JAMB + Screening Composite Formula',
    breakdown: 'English Language, Basic Mathematics, Current Affairs, General Studies',
    campaignBadge: 'UNILORIN Better By Far Track',
    instructions: 'Massive applicant pool requires high percentile scores. Focus on speed, Nigerian civic knowledge, and verbal reasoning.'
  },
  UNN: {
    id: 'UNN',
    shortName: 'UNN',
    name: 'University of Nigeria, Nsukka (UNN)',
    examName: 'UNN Lions Post-UTME Screening',
    formatTitle: 'Comprehensive 4-Subject Screening Examination',
    defaultDuration: 40,
    defaultQuestionCount: 30,
    scoringWeight: 'Average of JAMB Score + UNN Screening Score',
    breakdown: 'English Language and 3 relevant secondary school departmental subjects',
    campaignBadge: 'UNN Lions Academic Drill',
    instructions: 'Comprehensive testing on official Senior Secondary curriculum and JAMB syllabus with departmental cut-off weighing.'
  }
};

export function resolveVarsityKey(institutionName) {
  if (!institutionName) return 'UNILAG';
  const clean = institutionName.toUpperCase();
  if (clean.includes('UNILAG') || clean.includes('LAGOS')) return 'UNILAG';
  if (clean.includes('LASU')) return 'LASU';
  if (clean.includes('UI') || clean.includes('IBADAN')) return 'UI';
  if (clean.includes('OAU') || clean.includes('AWOLOWO') || clean.includes('IFE')) return 'OAU';
  if (clean.includes('FUTA') || clean.includes('AKURE')) return 'FUTA';
  if (clean.includes('UNIBEN') || clean.includes('BENIN')) return 'UNIBEN';
  if (clean.includes('UNILORIN') || clean.includes('ILORIN')) return 'UNILORIN';
  if (clean.includes('UNN') || clean.includes('NSUKKA')) return 'UNN';
  return 'UNILAG';
}

export function getCustomVarsityProfile(institutionName) {
  const clean = institutionName?.trim() || 'University of Choice';
  const acronymMatch = clean.match(/\(([^)]+)\)/);
  const acronym = acronymMatch ? acronymMatch[1] : (clean.split(' ')[0].toUpperCase() || 'VARSITY');

  return {
    id: acronym,
    shortName: acronym,
    name: clean,
    examName: `${clean} Post-UTME Simulator`,
    formatTitle: 'Institutional Post-UTME Screening Simulator',
    defaultDuration: 30,
    defaultQuestionCount: 25,
    scoringWeight: 'Standard Nigerian University Post-UTME Composite Weight',
    breakdown: 'General Academic Aptitude, Use of English, Quantitative Analysis & Current Affairs',
    campaignBadge: `${acronym} Targeted Candidate Mock`,
    instructions: `Configured to reflect the screening standard and general academic requirements for admission into ${clean}.`
  };
}

export const CBT_QUESTIONS = {
  // ================= GENERAL SUBJECTS =================
  english: [
    {
      id: 'eng_1',
      question: "Choose the word or phrase that is MOST NEARLY OPPOSITE in meaning to the underlined word: The CEO's presentation was <ins>meticulous</ins> and well detailed.",
      options: ["A. Careless", "B. Thorough", "C. Precise", "D. Elaborate"],
      answer: 0,
      explanation: "'Meticulous' means showing great attention to detail. The antonym is 'Careless'."
    },
    {
      id: 'eng_2',
      question: "From the options provided, select the option that BEST completes the sentence: Neither the tutor nor the students _______ present in the lecture hall yesterday.",
      options: ["A. is", "B. was", "C. were", "D. are"],
      answer: 2,
      explanation: "When subject elements are joined by 'neither... nor', the verb agrees with the closer subject ('the students' is plural, so 'were')."
    },
    {
      id: 'eng_3',
      question: "Choose the option NEAREST in meaning to the underlined word: The candidate gave a <ins>lucid</ins> explanation during the admission interview.",
      options: ["A. Obscure", "B. Clear", "C. Confusing", "D. Lengthy"],
      answer: 1,
      explanation: "'Lucid' means expressed clearly and easy to comprehend. Synonym is 'Clear'."
    },
    {
      id: 'eng_4',
      question: "Select the correctly spelt word:",
      options: ["A. Accomodation", "B. Accommodation", "C. Acommodation", "D. Accomodasion"],
      answer: 1,
      explanation: "'Accommodation' is spelt with double 'c' and double 'm'."
    },
    {
      id: 'eng_5',
      question: "Which syllable carries the primary stress in the word **ACADEMIC**?",
      options: ["A. a-CAD-e-mic", "B. ac-a-DEM-ic", "C. AC-a-dem-ic", "D. ac-a-dem-IC"],
      answer: 1,
      explanation: "Words ending in '-ic' typically take the primary tonic accent on the penultimate syllable: ac-a-DEM-ic."
    },
    {
      id: 'eng_6',
      question: "Choose the option that best interprets the idiom: 'The registrar decided to **cut the Gordian knot** regarding the disputed admission quota.'",
      options: [
        "A. Postpone the decision indefinitely",
        "B. Solve a complex problem by bold and decisive action",
        "C. Refer the issue to a disciplinary committee",
        "D. Accept bribes to alter scores"
      ],
      answer: 1,
      explanation: "'To cut the Gordian knot' means to resolve a complicated dilemma in a swift, decisive manner."
    },
    {
      id: 'eng_7',
      question: "Fill in the blank with the correct preposition: She was disqualified _______ complying with the registration guidelines.",
      options: ["A. from", "B. for not", "C. against", "D. in"],
      answer: 1,
      explanation: "'Disqualified for not complying' correctly provides the cause of the disqualification."
    },
    {
      id: 'eng_8',
      question: "Identify the figure of speech in: 'The pen is mightier than the sword.'",
      options: ["A. Simile", "B. Metaphor", "C. Metonymy", "D. Hyperbole"],
      answer: 2,
      explanation: "Metonymy refers to an object or concept being referred to not by its own name, but by something closely associated with it ('pen' for written words, 'sword' for military force)."
    },
    {
      id: 'eng_9',
      question: "Choose the word with the same vowel sound as in the underlined sound in 'b<u>oo</u>k':",
      options: ["A. Cool", "B. Put", "C. Moon", "D. Pool"],
      answer: 1,
      explanation: "The short /ʊ/ sound in 'book' is identical to that in 'put'."
    },
    {
      id: 'eng_10',
      question: "Select the option that best completes the sentence: By next month, the candidates _______ their UTME examinations.",
      options: ["A. will write", "B. would have written", "C. will have written", "D. have written"],
      answer: 2,
      explanation: "Future Perfect Tense ('will have written') expresses an action completed by a specified future time."
    }
  ],

  maths: [
    {
      id: 'mth_1',
      question: "If log₁₀(x) + log₁₀(5) = 2, find the value of x.",
      options: ["A. 10", "B. 20", "C. 50", "D. 100"],
      answer: 1,
      explanation: "log₁₀(5x) = 2 => 5x = 10² = 100 => x = 100 / 5 = 20."
    },
    {
      id: 'mth_2',
      question: "A student scored 280 in JAMB UTME. What is the percentage score out of 400?",
      options: ["A. 65%", "B. 70%", "C. 75%", "D. 80%"],
      answer: 1,
      explanation: "(280 / 400) * 100 = 70%."
    },
    {
      id: 'mth_3',
      question: "Find the sum of the interior angles of a polygon with 8 sides (octagonal polygon).",
      options: ["A. 900°", "B. 1080°", "C. 1260°", "D. 1440°"],
      answer: 1,
      explanation: "Formula: (n - 2) * 180° = (8 - 2) * 180° = 6 * 180° = 1080°."
    },
    {
      id: 'mth_4',
      question: "Differentiate y = 3x³ - 5x² + 4x - 7 with respect to x.",
      options: ["A. dy/dx = 9x² - 10x + 4", "B. dy/dx = 6x² - 5x + 4", "C. dy/dx = 9x³ - 10x²", "D. dy/dx = 3x² - 10x + 4"],
      answer: 0,
      explanation: "Power rule: dy/dx = 3(3x²) - 5(2x) + 4 = 9x² - 10x + 4."
    },
    {
      id: 'mth_5',
      question: "Evaluate the integral: ∫ (6x² + 4x) dx from x = 0 to x = 2.",
      options: ["A. 16", "B. 20", "C. 24", "D. 28"],
      answer: 2,
      explanation: "[2x³ + 2x²] from 0 to 2 = (2(8) + 2(4)) - 0 = 16 + 8 = 24."
    },
    {
      id: 'mth_6',
      question: "If the 3rd term of an Arithmetic Progression (A.P.) is 11 and the 7th term is 27, find the first term (a) and common difference (d).",
      options: ["A. a = 3, d = 4", "B. a = 2, d = 5", "C. a = 4, d = 3", "D. a = 1, d = 4"],
      answer: 0,
      explanation: "T3: a + 2d = 11; T7: a + 6d = 27. Subtracting: 4d = 16 => d = 4. a + 2(4) = 11 => a = 3."
    },
    {
      id: 'mth_7',
      question: "In how many ways can 4 candidates be seated in a row of 4 chairs?",
      options: ["A. 12", "B. 16", "C. 24", "D. 32"],
      answer: 2,
      explanation: "4! = 4 × 3 × 2 × 1 = 24 ways."
    },
    {
      id: 'mth_8',
      question: "If sin(θ) = 3/5 where θ is an acute angle, find the value of tan(θ).",
      options: ["A. 3/4", "B. 4/3", "C. 4/5", "D. 5/3"],
      answer: 0,
      explanation: "Opposite = 3, Hypotenuse = 5 => Adjacent = √(25 - 9) = 4. tan(θ) = Opp/Adj = 3/4."
    }
  ],

  physics: [
    {
      id: 'phy_1',
      question: "A vehicle accelerates uniformly from rest to a speed of 20 m/s in 5 seconds. Calculate its acceleration.",
      options: ["A. 2 m/s²", "B. 4 m/s²", "C. 5 m/s²", "D. 10 m/s²"],
      answer: 1,
      explanation: "Acceleration a = (v - u) / t = (20 - 0) / 5 = 4 m/s²."
    },
    {
      id: 'phy_2',
      question: "Which of the following electromagnetic waves possesses the highest frequency?",
      options: ["A. Radio waves", "B. Infrared waves", "C. Ultraviolet rays", "D. Gamma rays"],
      answer: 3,
      explanation: "Gamma rays have the shortest wavelength and highest frequency in the electromagnetic spectrum."
    },
    {
      id: 'phy_3',
      question: "The SI unit of electrical capacitance is:",
      options: ["A. Farad", "B. Henry", "C. Ohm", "D. Tesla"],
      answer: 0,
      explanation: "Capacitance is measured in Farads (F)."
    },
    {
      id: 'phy_4',
      question: "An object is placed 15 cm in front of a concave mirror of focal length 10 cm. Find the image distance.",
      options: ["A. 20 cm", "B. 25 cm", "C. 30 cm", "D. 35 cm"],
      answer: 2,
      explanation: "1/f = 1/u + 1/v => 1/10 = 1/15 + 1/v => 1/v = 1/10 - 1/15 = 1/30 => v = 30 cm."
    },
    {
      id: 'phy_5',
      question: "The phenomenon whereby light splits into its component colors through a prism is known as:",
      options: ["A. Reflection", "B. Refraction", "C. Dispersion", "D. Polarization"],
      answer: 2,
      explanation: "Dispersion separates white light into spectral colors due to wavelength-dependent refractive indices."
    }
  ],

  chemistry: [
    {
      id: 'chm_1',
      question: "What is the oxidation number of sulfur in H₂SO₄?",
      options: ["A. +2", "B. +4", "C. +6", "D. -2"],
      answer: 2,
      explanation: "2(+1) + S + 4(-2) = 0 => 2 + S - 8 = 0 => S = +6."
    },
    {
      id: 'chm_2',
      question: "Which gas is liberated when dilute hydrochloric acid reacts with calcium carbonate?",
      options: ["A. Oxygen", "B. Carbon dioxide", "C. Hydrogen", "D. Chlorine"],
      answer: 1,
      explanation: "CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑. Carbon dioxide gas is produced."
    },
    {
      id: 'chm_3',
      question: "Which of the following elements has the highest electronegativity on the Pauling scale?",
      options: ["A. Chlorine", "B. Oxygen", "C. Fluorine", "D. Nitrogen"],
      answer: 2,
      explanation: "Fluorine is the most electronegative element with a value of approximately 3.98."
    },
    {
      id: 'chm_4',
      question: "Hydrocarbons with the general formula CₙH₂ₙ belong to the homologous series of:",
      options: ["A. Alkanes", "B. Alkenes", "C. Alkynes", "D. Alkanols"],
      answer: 1,
      explanation: "Alkenes possess the general formula CₙH₂ₙ and contain at least one carbon-carbon double bond."
    }
  ],

  biology: [
    {
      id: 'bio_1',
      question: "Which organelle is known as the powerhouse of the biological cell?",
      options: ["A. Nucleus", "B. Ribosome", "C. Mitochondrion", "D. Endoplasmic Reticulum"],
      answer: 2,
      explanation: "The mitochondrion generates adenosine triphosphate (ATP) via aerobic cellular respiration."
    },
    {
      id: 'bio_2',
      question: "The process by which green plants manufacture glucose using sunlight and chlorophyll is:",
      options: ["A. Respiration", "B. Photosynthesis", "C. Transpiration", "D. Osmosis"],
      answer: 1,
      explanation: "Photosynthesis converts carbon dioxide and water into glucose and oxygen."
    },
    {
      id: 'bio_3',
      question: "A cross between a homozygous dominant tall pea plant (TT) and a homozygous recessive dwarf plant (tt) produces what phenotypic ratio in the F1 generation?",
      options: ["A. 100% Tall", "B. 50% Tall, 50% Dwarf", "C. 75% Tall, 25% Dwarf", "D. 100% Dwarf"],
      answer: 0,
      explanation: "All F1 offspring inherit the genotype Tt and phenotypically display the dominant tall trait."
    }
  ],

  economics: [
    {
      id: 'eco_1',
      question: "Opportunity cost is best defined as:",
      options: ["A. Total money spent on consumption", "B. The value of the next best alternative foregone", "C. Variable cost of industrial production", "D. Incidental expenses"],
      answer: 1,
      explanation: "Opportunity cost represents the forgone benefit of the second-best choice."
    },
    {
      id: 'eco_2',
      question: "When price elasticity of demand is greater than 1, demand is said to be:",
      options: ["A. Inelastic", "B. Elastic", "C. Unitary elastic", "D. Perfectly inelastic"],
      answer: 1,
      explanation: "Price elasticity |Ed| > 1 signifies elastic demand, meaning percentage quantity change exceeds percentage price change."
    }
  ],

  government: [
    {
      id: 'gov_1',
      question: "Nigeria operates which system of government under the 1999 Constitution as amended?",
      options: ["A. Parliamentary System", "B. Presidential System", "C. Unitary System", "D. Confederal System"],
      answer: 1,
      explanation: "Nigeria practices an executive presidential federal democracy."
    },
    {
      id: 'gov_2',
      question: "Which organ of government is primarily vested with the constitutional duty of interpreting laws?",
      options: ["A. The Executive", "B. The Legislature", "C. The Judiciary", "D. The Civil Service Commission"],
      answer: 2,
      explanation: "The Judiciary interprets and applies the laws to resolve disputes."
    }
  ],

  // ================= SCHOOL-SPECIFIC POST-UTME QUESTION BANKS =================

  // 1. UNILAG (University of Lagos)
  postutme_unilag: [
    {
      id: 'unilag_1',
      question: "[UNILAG Screening Standard] In a 30-minute Post-UTME screening of 40 questions, how many seconds should a candidate allocate per question on average?",
      options: ["A. 30 seconds", "B. 45 seconds", "C. 60 seconds", "D. 75 seconds"],
      answer: 1,
      explanation: "30 minutes = 1,800 seconds. 1,800 / 40 = 45 seconds per question."
    },
    {
      id: 'unilag_2',
      question: "[UNILAG Heritage] Who was appointed the historic pioneer Vice-Chancellor of the University of Lagos in 1962?",
      options: ["A. Prof. Eni Njoku", "B. Prof. Saburi Biobaku", "C. Prof. J.F. Ade Ajayi", "D. Prof. Oluwatoyin Ogundipe"],
      answer: 0,
      explanation: "Prof. Eni Njoku served as the premier Vice-Chancellor of UNILAG from 1962 to 1965."
    },
    {
      id: 'unilag_3',
      question: "[UNILAG Aggregate Computation] If UNILAG Post-UTME total score is 30, and candidate scores 27, calculate their percentage score in the Post-UTME examination:",
      options: ["A. 82.5%", "B. 86.6%", "C. 90.0%", "D. 92.5%"],
      answer: 2,
      explanation: "(27 / 30) * 100 = 90.0%."
    },
    {
      id: 'unilag_4',
      question: "[UNILAG Quantitative Drill] If 3 tutors evaluate 120 scripts in 4 hours, how many hours will 6 tutors require to evaluate 240 scripts at the same rate?",
      options: ["A. 2 hours", "B. 4 hours", "C. 6 hours", "D. 8 hours"],
      answer: 1,
      explanation: "Work rate per tutor = 120 / (3 * 4) = 10 scripts/hour. With 6 tutors: Rate = 60 scripts/hour. Time for 240 scripts = 240 / 60 = 4 hours."
    },
    {
      id: 'unilag_5',
      question: "[UNILAG Motto] What is the Latin and English motto of the University of Lagos?",
      options: [
        "A. Recte Sapere Fons (For Learning and Culture)",
        "B. In Deed and In Truth",
        "C. To Restore the Dignity of Man",
        "D. Technology for Self Reliance"
      ],
      answer: 1,
      explanation: "UNILAG's motto is 'In Deed and In Truth'."
    },
    {
      id: 'unilag_6',
      question: "[UNILAG Verbal Aptitude] Choose the word nearest in meaning to <ins>ubiquitous</ins> as used in university campus ICT infrastructure:",
      options: ["A. Omnipresent", "B. Defective", "C. Obsolete", "D. Intermittent"],
      answer: 0,
      explanation: "'Ubiquitous' means found or existing everywhere; omnipresent."
    }
  ],

  // 2. LASU (Lagos State University)
  postutme_lasu: [
    {
      id: 'lasu_1',
      question: "[LASU Screening Format] Lagos State University was officially established in which year under the administration of Governor Lateef Jakande?",
      options: ["A. 1979", "B. 1983", "C. 1986", "D. 1991"],
      answer: 1,
      explanation: "LASU was established in 1983 by the enabling law of Lagos State under Alhaji Lateef Kayode Jakande."
    },
    {
      id: 'lasu_2',
      question: "[LASU Point Grading] In the LASU O'Level point screening system, what point value is customarily awarded for an A1 grade?",
      options: ["A. 8 Points", "B. 10 Points", "C. 12 Points", "D. 15 Points"],
      answer: 1,
      explanation: "In LASU point conversion, A1 yields 10 points, B2 gives 9, B3 gives 8, C4 gives 7, C5 gives 6, and C6 gives 5 points."
    },
    {
      id: 'lasu_3',
      question: "[Lagos State Civics] Which of the following is the main administrative campus location of Lagos State University?",
      options: ["A. Epe Campus", "B. Ikeja (LASUTH)", "C. Ojo Campus", "D. Badagry"],
      answer: 2,
      explanation: "The main university campus of LASU is situated in Ojo, along the Lagos-Badagry Expressway."
    },
    {
      id: 'lasu_4',
      question: "[LASU Logic & Reasoning] Complete the sequence: 3, 7, 15, 31, 63, ____",
      options: ["A. 95", "B. 127", "C. 129", "D. 144"],
      answer: 1,
      explanation: "Each term is obtained by: (Previous Term × 2) + 1. (63 × 2) + 1 = 126 + 1 = 127."
    }
  ],

  // 3. UI (University of Ibadan)
  postutme_ui: [
    {
      id: 'ui_1',
      question: "[UI Premier History] The University of Ibadan, Nigeria's premier university, began in 1948 as an external college of which British institution?",
      options: ["A. University of Oxford", "B. University of London", "C. University of Cambridge", "D. University of Edinburgh"],
      answer: 1,
      explanation: "UI was founded as University College, Ibadan, an affiliated college of the University of London."
    },
    {
      id: 'ui_2',
      question: "[UI High-Rigor Comprehension] In academic discourse, an <ins>ad hominem</ins> fallacy refers to:",
      options: [
        "A. Attacking the opponent's character rather than addressing the substance of their argument",
        "B. Misrepresenting an opponent's argument to make it easier to attack",
        "C. Assuming the conclusion within the premises",
        "D. Appealing to popular public emotion"
      ],
      answer: 0,
      explanation: "'Ad hominem' attacks the person making the claim instead of evaluating the empirical merits of the argument."
    },
    {
      id: 'ui_3',
      question: "[UI Analytical Math] If x² - y² = 48 and x - y = 4, find the value of (x + y)².",
      options: ["A. 64", "B. 100", "C. 144", "D. 196"],
      answer: 2,
      explanation: "x² - y² = (x - y)(x + y) => 48 = 4(x + y) => x + y = 12. Therefore, (x + y)² = 12² = 144."
    },
    {
      id: 'ui_4',
      question: "[UI Motto] What is the Latin motto of the University of Ibadan?",
      options: ["A. Recte Sapere Fons", "B. Facta Non Verba", "C. Per Ardua Ad Astra", "D. Lux Mentis Lux Orbis"],
      answer: 0,
      explanation: "UI's motto is 'Recte Sapere Fons' (To think straight is the fount of knowledge)."
    }
  ],

  // 4. OAU (Obafemi Awolowo University)
  postutme_oau: [
    {
      id: 'oau_1',
      question: "[OAU Heritage] Obafemi Awolowo University was formerly founded in 1961 as:",
      options: ["A. Western Regional University", "B. University of Ife", "C. Oduduwa University", "D. Yoruba Heritage University"],
      answer: 1,
      explanation: "OAU was established in 1961 as the University of Ife, and was renamed in 1987 in honour of Chief Obafemi Awolowo."
    },
    {
      id: 'oau_2',
      question: "[OAU Speed Drill] If a candidate solves 40 CBT questions in 30 minutes with 90% accuracy, how many questions were answered correctly?",
      options: ["A. 32", "B. 34", "C. 36", "D. 38"],
      answer: 2,
      explanation: "90% of 40 = 0.90 × 40 = 36 questions."
    },
    {
      id: 'oau_3',
      question: "[OAU General Studies] What is the recognized architectural hallmark of OAU Ile-Ife designed by Arieh Sharon?",
      options: [
        "A. Gothic Cathedrals",
        "B. Bauhaus and Brutalist Afro-Modernism",
        "C. Victorian Mansions",
        "D. Byzantine Domes"
      ],
      answer: 1,
      explanation: "OAU is celebrated internationally for its bold Brutalist Afro-modernist concrete architecture designed by Israeli architect Arieh Sharon."
    }
  ],

  // 5. FUTA (Federal University of Technology, Akure)
  postutme_futa: [
    {
      id: 'futa_1',
      question: "[FUTA CBST Science & Tech] What is the binary representation of the decimal number 25?",
      options: ["A. 11001₂", "B. 10101₂", "C. 11100₂", "D. 10011₂"],
      answer: 0,
      explanation: "25 in binary: 16 + 8 + 1 = 11001₂."
    },
    {
      id: 'futa_2',
      question: "[FUTA Motto & Mandate] What is the official university motto of FUTA?",
      options: ["A. Technology for Self Reliance", "B. Innovation for Greatness", "C. Science and Integrity", "D. Knowledge is Power"],
      answer: 0,
      explanation: "FUTA's motto is 'Technology for Self Reliance'."
    },
    {
      id: 'futa_3',
      question: "[FUTA Quantitative Reasoning] A computer processor performs 4 × 10⁹ operations per second. How many seconds will it take to execute 1.2 × 10¹² operations?",
      options: ["A. 150 s", "B. 300 s", "C. 400 s", "D. 480 s"],
      answer: 1,
      explanation: "Time = (1.2 × 10¹²) / (4 × 10⁹) = (1.2 / 4) × 10³ = 0.3 × 1000 = 300 seconds."
    }
  ],

  // 6. UNIBEN (University of Benin)
  postutme_uniben: [
    {
      id: 'uniben_1',
      question: "[UNIBEN Screening Standard] The University of Benin was founded in which year as the Institute of Technology?",
      options: ["A. 1968", "B. 1970", "C. 1975", "D. 1980"],
      answer: 1,
      explanation: "UNIBEN was founded in 1970 as the Institute of Technology and granted full university status in 1971."
    },
    {
      id: 'uniben_2',
      question: "[UNIBEN Motto] What is the Latin and English motto of UNIBEN?",
      options: ["A. Knowledge to Lead", "B. Knowledge for Service", "C. For Truth and Light", "D. Excellence in Learning"],
      answer: 1,
      explanation: "UNIBEN's motto is 'Knowledge for Service'."
    }
  ],

  // 7. UNILORIN (University of Ilorin)
  postutme_unilorin: [
    {
      id: 'unilorin_1',
      question: "[UNILORIN General Screening] What is the popular motto of the University of Ilorin?",
      options: ["A. Better By Far", "B. First in Mind", "C. Light of the Nation", "D. Pride of the North"],
      answer: 0,
      explanation: "UNILORIN is widely nicknamed and formally styled as 'Better By Far' (Probitas Doctrina)."
    },
    {
      id: 'unilorin_2',
      question: "[UNILORIN Civic Knowledge] In which geopolitical zone of Nigeria is the University of Ilorin situated?",
      options: ["A. North-Central (Middle Belt)", "B. South-West", "C. North-West", "D. South-South"],
      answer: 0,
      explanation: "Kwara State, where UNILORIN is located, belongs to the North-Central geopolitical zone."
    }
  ],

  // 8. UNN (University of Nigeria, Nsukka)
  postutme_unn: [
    {
      id: 'unn_1',
      question: "[UNN Heritage] Who was the founding nationalist leader instrumental in establishing the University of Nigeria, Nsukka in 1960?",
      options: ["A. Dr. Nnamdi Azikiwe", "B. Sir Ahmadu Bello", "C. Chief Obafemi Awolowo", "D. Sir Tafawa Balewa"],
      answer: 0,
      explanation: "Dr. Nnamdi Azikiwe played the pivotal founding role in establishing UNN on Nigeria's Independence in 1960."
    },
    {
      id: 'unn_2',
      question: "[UNN Motto] What is the famous motto of the University of Nigeria, Nsukka?",
      options: ["A. To Restore the Dignity of Man", "B. For Learning and Culture", "C. In Truth We Stand", "D. Knowledge is Freedom"],
      answer: 0,
      explanation: "UNN's motto is 'To Restore the Dignity of Man'."
    }
  ]
};
