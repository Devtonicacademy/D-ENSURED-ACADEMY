export const CBT_SUBJECTS = [
  { id: 'english', name: 'Use of English', questionCount: 40, icon: 'BookOpen' },
  { id: 'maths', name: 'Mathematics', questionCount: 40, icon: 'Calculator' },
  { id: 'physics', name: 'Physics', questionCount: 40, icon: 'Zap' },
  { id: 'chemistry', name: 'Chemistry', questionCount: 40, icon: 'FlaskConical' },
  { id: 'biology', name: 'Biology', questionCount: 40, icon: 'Dna' },
  { id: 'economics', name: 'Economics', questionCount: 40, icon: 'TrendingUp' },
  { id: 'government', name: 'Government', questionCount: 40, icon: 'Landmark' },
  { id: 'postutme_unilag', name: 'UNILAG Post-UTME Mock', questionCount: 40, icon: 'GraduationCap' },
];

export const CBT_QUESTIONS = {
  english: [
    {
      id: 1,
      question: "Choose the word or phrase that is MOST NEARLY OPPOSITE in meaning to the underlined word: The CEO's speech was <ins>meticulous</ins> and well detailed.",
      options: ["A. Careless", "B. Thorough", "C. Precise", "D. Elaborate"],
      answer: 0,
      explanation: "'Meticulous' means showing great attention to detail or very careful. The antonym is 'Careless'."
    },
    {
      id: 2,
      question: "From the options provided, select the option that BEST completes the sentence: Neither the tutor nor the students _______ present in the lecture hall yesterday.",
      options: ["A. is", "B. was", "C. were", "D. are"],
      answer: 2,
      explanation: "When subject elements are joined by 'neither... nor', the verb agrees with the subject closest to it. Here 'the students' is plural, so 'were' is correct."
    },
    {
      id: 3,
      question: "Choose the option nearest in meaning to the underlined word: The candidate gave a <ins>lucid</ins> explanation during the admission interview.",
      options: ["A. Obscure", "B. Clear", "C. Confusing", "D. Lengthy"],
      answer: 1,
      explanation: "'Lucid' means expressed clearly or easy to understand. Synonym is 'Clear'."
    },
    {
      id: 4,
      question: "Select the correctly spelt word:",
      options: ["A. Accomodation", "B. Accommodation", "C. Acommodation", "D. Accomodasion"],
      answer: 1,
      explanation: "'Accommodation' is correctly spelt with double 'c' and double 'm'."
    },
    {
      id: 5,
      question: "In stress patterns, which syllable carries the primary stress in the word **ACADEMIC**?",
      options: ["A. a-CAD-e-mic", "B. ac-a-DEM-ic", "C. AC-a-dem-ic", "D. ac-a-dem-IC"],
      answer: 1,
      explanation: "Words ending in '-ic' usually have primary stress on the penultimate syllable (ac-a-DEM-ic)."
    }
  ],
  maths: [
    {
      id: 1,
      question: "If log₁₀(x) + log₁₀(5) = 2, find the value of x.",
      options: ["A. 10", "B. 20", "C. 50", "D. 100"],
      answer: 1,
      explanation: "log₁₀(5x) = 2 => 5x = 10² = 100 => x = 100 / 5 = 20."
    },
    {
      id: 2,
      question: "A student scored 280 in JAMB UTME. What is the percentage score out of 400?",
      options: ["A. 65%", "B. 70%", "C. 75%", "D. 80%"],
      answer: 1,
      explanation: "(280 / 400) * 100 = 70%."
    },
    {
      id: 3,
      question: "Find the sum of the interior angles of a polygon with 8 sides (octagonal polygon).",
      options: ["A. 900°", "B. 1080°", "C. 1260°", "D. 1440°"],
      answer: 1,
      explanation: "Formula: (n - 2) * 180° = (8 - 2) * 180° = 6 * 180° = 1080°."
    },
    {
      id: 4,
      question: "Differentiate y = 3x³ - 5x² + 4x - 7 with respect to x.",
      options: ["A. dy/dx = 9x² - 10x + 4", "B. dy/dx = 6x² - 5x + 4", "C. dy/dx = 9x³ - 10x²", "D. dy/dx = 3x² - 10x + 4"],
      answer: 0,
      explanation: "Using the power rule d/dx(axⁿ) = n·a·xⁿ⁻¹, we get dy/dx = 3(3x²) - 5(2x) + 4 = 9x² - 10x + 4."
    }
  ],
  physics: [
    {
      id: 1,
      question: "A vehicle accelerates uniformly from rest to a speed of 20 m/s in 5 seconds. Calculate its acceleration.",
      options: ["A. 2 m/s²", "B. 4 m/s²", "C. 5 m/s²", "D. 10 m/s²"],
      answer: 1,
      explanation: "Acceleration a = (v - u) / t = (20 - 0) / 5 = 4 m/s²."
    },
    {
      id: 2,
      question: "Which of the following electromagnetic waves has the highest frequency?",
      options: ["A. Radio waves", "B. Infrared waves", "C. Ultraviolet rays", "D. Gamma rays"],
      answer: 3,
      explanation: "Gamma rays have the shortest wavelength and highest frequency in the electromagnetic spectrum."
    },
    {
      id: 3,
      question: "The unit of electrical resistance is:",
      options: ["A. Ampere", "B. Volt", "C. Ohm", "D. Watt"],
      answer: 2,
      explanation: "Resistance is measured in Ohms (Ω)."
    }
  ],
  chemistry: [
    {
      id: 1,
      question: "What is the oxidation number of sulfur in H₂SO₄?",
      options: ["A. +2", "B. +4", "C. +6", "D. -2"],
      answer: 2,
      explanation: "2(+1) + S + 4(-2) = 0 => 2 + S - 8 = 0 => S = +6."
    },
    {
      id: 2,
      question: "Which gas is liberated when dilute hydrochloric acid reacts with calcium carbonate?",
      options: ["A. Oxygen", "B. Carbon dioxide", "C. Hydrogen", "D. Chlorine"],
      answer: 1,
      explanation: "CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑. Carbon dioxide gas is produced."
    }
  ],
  biology: [
    {
      id: 1,
      question: "Which organelle is known as the powerhouse of the biological cell?",
      options: ["A. Nucleus", "B. Ribosome", "C. Mitochondrion", "D. Endoplasmic Reticulum"],
      answer: 2,
      explanation: "The mitochondrion synthesizes ATP energy for cellular processes."
    },
    {
      id: 2,
      question: "The process by which green plants manufacture food in the presence of sunlight is:",
      options: ["A. Respiration", "B. Photosynthesis", "C. Transpiration", "D. Osmosis"],
      answer: 1,
      explanation: "Photosynthesis converts carbon dioxide and water into glucose and oxygen using light energy."
    }
  ],
  economics: [
    {
      id: 1,
      question: "Opportunity cost is best defined as:",
      options: ["A. Money spent on goods", "B. The next best alternative foregone", "C. Cost of production", "D. Variable expenses"],
      answer: 1,
      explanation: "Opportunity cost measures the value of the foregone alternative when a decision is made."
    }
  ],
  government: [
    {
      id: 1,
      question: "Nigeria operates which system of government under the 1999 Constitution?",
      options: ["A. Parliamentary System", "B. Presidential System", "C. Unitary System", "D. Confederal System"],
      answer: 1,
      explanation: "Nigeria practices a federal presidential system of government with executive powers vested in the President."
    }
  ],
  postutme_unilag: [
    {
      id: 1,
      question: "[UNILAG Speed Drill] In a screening exam of 40 questions in 30 minutes, how many seconds should be allocated per question on average?",
      options: ["A. 30 seconds", "B. 45 seconds", "C. 60 seconds", "D. 75 seconds"],
      answer: 1,
      explanation: "30 minutes = 1800 seconds. 1800 / 40 = 45 seconds per question."
    },
    {
      id: 2,
      question: "Who was the first Vice-Chancellor of the University of Lagos (UNILAG)?",
      options: ["A. Prof. Eni Njoku", "B. Prof. Saburi Biobaku", "C. Prof. J.F. Ade Ajayi", "D. Prof. Oluwatoyin Ogundipe"],
      answer: 0,
      explanation: "Prof. Eni Njoku was appointed the pioneer Vice-Chancellor of UNILAG in 1962."
    },
    {
      id: 3,
      question: "If UNILAG post-UTME total score is 30, and your score is 26, what is your percentage performance in Post-UTME?",
      options: ["A. 82.5%", "B. 86.6%", "C. 88.0%", "D. 90.0%"],
      answer: 1,
      explanation: "(26 / 30) * 100 = 86.67%."
    }
  ]
};
