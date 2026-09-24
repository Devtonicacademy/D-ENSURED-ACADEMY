export const COURSES_LIST = [
  {
    id: 'jamb-mastery-2026',
    title: 'JAMB UTME Complete Target 300+ Mastery',
    examType: 'JAMB',
    category: 'Comprehensive Prep',
    duration: '12 Weeks',
    format: 'Morning & Evening Classes',
    price: '₦25,000',
    originalPrice: '₦35,000',
    rating: 4.9,
    enrolledCount: 1420,
    cbtIncluded: true,
    weeklyPracticals: true,
    featured: true,
    highlightBadge: 'Most Popular',
    categoryTag: 'UTME Target 300+',
    corePillars: [
      'Comprehensive syllabus coverage across 4 chosen UTME subjects',
      'Daily 8-key CBT simulator timed practice with speed heuristics',
      'Intensive Use of English novel breakdown & past question analysis',
      'Weekly full-length Saturday mock examinations with instant aggregate rank'
    ],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    tutor: 'Akinjo Rotimi & STEM Leads',
    tutorTitle: 'CEO & Lead English Demystificator',
    description: 'Our flagship JAMB preparation program engineered to consistently deliver 300+ UTME scores. Features intensive syllabus coverage across Use of English, Mathematics, Physics, Chemistry, Biology, Economics, and Government.',
    subjects: ['Use of English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Government'],
    syllabus: [
      {
        subject: 'Use of English',
        modules: [
          { title: 'Comprehension & Summary Skills', lessons: ['Passage Structure Analysis', 'Contextual Meaning Extraction', 'Summary Techniques'] },
          { title: 'Lexis & Structure', lessons: ['Synonyms & Antonyms', 'Idiomatic Expressions', 'Clauses & Sentence Types'] },
          { title: 'Oral Forms / Phonetics', lessons: ['Vowels & Consonant Sounds', 'Stress Patterns & Intonation', 'Rhymes & Pitch Accent'] }
        ]
      },
      {
        subject: 'Mathematics',
        modules: [
          { title: 'Algebra & Number Base System', lessons: ['Indices & Logarithms', 'Modular Arithmetic', 'Surds & Variations'] },
          { title: 'Geometry & Trigonometry', lessons: ['Circle Theorems', 'Trigonometric Ratios & Graphs', 'Bearing & Distances'] },
          { title: 'Calculus & Statistics', lessons: ['Differentiation Basics', 'Integration Applications', 'Probability & Permutations'] }
        ]
      },
      {
        subject: 'Physics & Chemistry',
        modules: [
          { title: 'Mechanics & Heat Physics', lessons: ['Motion Equations & Projectiles', 'Thermal Expansion & Gas Laws', 'Waves & Optics'] },
          { title: 'Chemical Combination & Organic Chemistry', lessons: ['Stoichiometry & Mole Concept', 'Hydrocarbons & Isomerism', 'Electrochemistry & Redox'] }
        ]
      }
    ],
    features: [
      'Daily Live Morning & Evening Physical & Virtual Classes',
      'Unlimited Access to 2026 CBT Practice Simulator',
      'Weekly Mock Examinations with Instant Analytics',
      'Targeted English Novel Demystification Sessions',
      'Official JAMB Novel Summary & Q&A Booklet'
    ]
  },
  {
    id: 'unilag-post-utme-2026',
    title: 'UNILAG Post-UTME Target 25/30 Mastery',
    examType: 'Post-UTME',
    category: 'University Special',
    duration: '4 Weeks Intensive',
    format: 'Hybrid (Physical + Online)',
    price: '₦20,000',
    originalPrice: '₦28,000',
    rating: 5.0,
    enrolledCount: 890,
    cbtIncluded: true,
    weeklyPracticals: true,
    featured: true,
    highlightBadge: 'Final Hurdle',
    categoryTag: 'UNILAG Screening',
    corePillars: [
      'Dedicated 30-minute timed drills (40 questions in 30 minutes)',
      'High-yield UNILAG General Knowledge, Current Affairs & Math heuristics',
      'Aggregate score forecasting (JAMB 50% + Post-UTME 30% + O\'Level 20%)',
      'Departmental cutoff strategy sessions for Medicine, Law & Engineering'
    ],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    tutor: 'D Ensured Post-UTME Board',
    tutorTitle: 'UNILAG Admission Specialists',
    description: 'Specialized preparation program targeting 25/30 minimum score in UNILAG screening test to guarantee departmental cut-off qualification.',
    subjects: ['Mathematics', 'English Language', 'General Knowledge / Current Affairs'],
    syllabus: [
      {
        subject: 'UNILAG General Studies & Speed Drills',
        modules: [
          { title: 'Speed Mathematics', lessons: ['Quick Mental Math Shortcuts', 'Speed Algebra & Equations', 'Data Interpretation'] },
          { title: 'Advanced Grammar & Sentence Correction', lessons: ['Spotting Errors under Time Pressure', 'Vocabulary Precision'] },
          { title: 'UNILAG History & Current Affairs', lessons: ['Key Historical Milestones', 'Current Nigerian Affairs & UNILAG Facts'] }
        ]
      }
    ],
    features: [
      'Timed UNILAG CBT Mock Exams matching exact question formats',
      'Proven strategies for solving 40 questions in 30 minutes',
      'Screening Aggregate Score Calculator',
      'Departmental Cut-Off Mark Guidance'
    ]
  },
  {
    id: 'waec-ssce-distinction-prep',
    title: 'WAEC / SSCE Distinction Masterclass',
    examType: 'WAEC',
    category: 'Secondary School Exam',
    duration: '16 Weeks',
    format: 'Morning & Evening Classes',
    price: '₦30,000',
    originalPrice: '₦40,000',
    rating: 4.8,
    enrolledCount: 1100,
    cbtIncluded: false,
    weeklyPracticals: true,
    featured: false,
    highlightBadge: 'Foundation & Mastery',
    categoryTag: 'SSCE 9 Credits',
    corePillars: [
      'Step-by-step WAEC essay marking scheme alignment (Bonus marks capture)',
      'Hands-on laboratory practicals for Physics, Chemistry & Biology',
      'Thorough analysis of WAEC literature texts, drama & poetry selections',
      'Weekly timed theory write-ups evaluated with individual examiner feedback'
    ],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    tutor: 'Senior WAEC Examiners',
    tutorTitle: 'Subject Specialists',
    description: 'Comprehensive WAEC prep for Science, Commercial, and Art streams. Designed to secure 9 Distinction credits including English & Mathematics in 1 sitting.',
    subjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Financial Accounting', 'Government', 'Literature in English'],
    syllabus: [
      {
        subject: 'Theory & Essay Writing Mastery',
        modules: [
          { title: 'WAEC Essay & Letter Writing', lessons: ['Formal & Informal Letter Guidelines', 'Argumentative & Narrative Essays', 'Article Writing for Publication'] },
          { title: 'Practical Science Examinations', lessons: ['Physics Alternative to Practical', 'Chemistry Titration & Qualitative Analysis', 'Biology Specimen Identifications'] }
        ]
      }
    ],
    features: [
      'Weekly Hands-on Practical Sessions in Equipped Labs',
      'Past WAEC Question Answering Techniques',
      'Essay Presentation and Marking Scheme Alignment'
    ]
  },
  {
    id: 'neco-senior-prep',
    title: 'NECO Senior Secondary Certificate Prep',
    examType: 'NECO',
    category: 'Secondary School Exam',
    duration: '14 Weeks',
    format: 'Physical & Online Classes',
    price: '₦25,000',
    originalPrice: '₦32,000',
    rating: 4.8,
    enrolledCount: 760,
    cbtIncluded: false,
    weeklyPracticals: true,
    featured: false,
    highlightBadge: 'Foundation & Mastery',
    categoryTag: 'NECO SSCE',
    corePillars: [
      'Full syllabus past question coverage from 2012 to 2025',
      'Comprehensive science practical lab preparations & specimen masterclasses',
      'Specialized sessions on English summary, comprehension & phonetic sounds',
      'Bi-weekly performance review reports shared with parents/guardians'
    ],
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    tutor: 'NECO Certified Tutors',
    tutorTitle: 'Education Evaluation Experts',
    description: 'Full syllabus breakdown and past question drills for NECO SSCE candidates aiming for top grades in 1 sitting.',
    subjects: ['Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Commerce'],
    syllabus: [
      {
        subject: 'Core NECO Subjects',
        modules: [
          { title: 'Objective & Essay Drill', lessons: ['Speed Objectives Practice', 'Structured Essay Format', 'Diagrammatic Accuracy'] }
        ]
      }
    ],
    features: [
      'NECO Past Questions Mastery (2010 - 2025)',
      'Practical Lab Simulations',
      'Continuous Progress Assessments'
    ]
  },
  {
    id: 'gce-private-candidate',
    title: 'GCE Private Candidate Fast-Track Prep',
    examType: 'GCE',
    category: 'Private Candidate',
    duration: '10 Weeks Intensive',
    format: 'Evening & Weekend Classes',
    price: '₦22,000',
    originalPrice: '₦30,000',
    rating: 4.9,
    enrolledCount: 620,
    cbtIncluded: true,
    weeklyPracticals: true,
    featured: false,
    highlightBadge: 'Fast-Track Remedial',
    categoryTag: 'GCE November/December',
    corePillars: [
      'Targeted remedying of deficient O\'Level subjects for working students',
      'Flexible weekend (Saturday/Sunday) and evening study hours',
      'Exam psychology workshops to dissolve re-sit anxiety and build confidence',
      'Assistance with biometric registration and exam center selection'
    ],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    tutor: 'GCE Specialist Panel',
    tutorTitle: 'Adult & Private Candidate Mentors',
    description: 'Tailored for candidates re-sitting O\'Level subjects or private candidates needing distinction credits within short preparation timeline.',
    subjects: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'Government'],
    syllabus: [
      {
        subject: 'GCE Accelerated Review',
        modules: [
          { title: 'High-Yield Topic Coverage', lessons: ['Core Exam Questions Breakdown', 'Eliminating Common Exam Traps'] }
        ]
      }
    ],
    features: [
      'Flexible Evening & Weekend Timetables',
      'One-on-One Weakness Diagnosis',
      'Registration Support & Exam Center Assignment Guidance'
    ]
  }
];
