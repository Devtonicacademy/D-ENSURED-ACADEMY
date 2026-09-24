export const SUBJECT_CATEGORIES = [
  { id: 'ALL', label: 'All Subjects' },
  { id: 'SCIENCES', label: 'Sciences' },
  { id: 'COMMERCIAL', label: 'Commercial' },
  { id: 'ARTS', label: 'Arts & Humanities' },
  { id: 'LANGUAGES', label: 'Languages' },
];

export const AVAILABLE_SUBJECTS = [
  // Sciences
  { id: 'eng', name: 'Use of English', category: 'LANGUAGES', compulsory: true, description: 'Compulsory for all UTME & SSCE candidates' },
  { id: 'math', name: 'General Mathematics', category: 'SCIENCES', compulsory: false, description: 'Core for STEM, Business & Social Sciences' },
  { id: 'phy', name: 'Physics', category: 'SCIENCES', compulsory: false, description: 'Essential for Engineering, Physical Sciences & Tech' },
  { id: 'chem', name: 'Chemistry', category: 'SCIENCES', compulsory: false, description: 'Essential for Medicine, Pharmacy & Pure Sciences' },
  { id: 'bio', name: 'Biology', category: 'SCIENCES', compulsory: false, description: 'Prerequisite for Health, Life & Biological Sciences' },
  { id: 'agric', name: 'Agricultural Science', category: 'SCIENCES', compulsory: false, description: 'Applied Agricultural, Food & Environmental Sciences' },
  { id: 'fmath', name: 'Further Mathematics', category: 'SCIENCES', compulsory: false, description: 'Advanced calculus, vectors & discrete mathematics' },

  // Commercial
  { id: 'econ', name: 'Economics', category: 'COMMERCIAL', compulsory: false, description: 'Micro & Macroeconomics, Statistics & Development' },
  { id: 'acc', name: 'Financial Accounting', category: 'COMMERCIAL', compulsory: false, description: 'Bookkeeping, Ledger, Final Accounts & Auditing' },
  { id: 'comm', name: 'Commerce', category: 'COMMERCIAL', compulsory: false, description: 'Trade, Banking, Insurance & Transport Logistics' },
  { id: 'gov_c', name: 'Government', category: 'COMMERCIAL', compulsory: false, description: 'Political systems, Constitution & Public Administration' },

  // Arts & Humanities
  { id: 'lit', name: 'Literature in English', category: 'ARTS', compulsory: false, description: 'Drama, Poetry, Prose & African/Non-African Literature' },
  { id: 'gov_a', name: 'Government', category: 'ARTS', compulsory: false, description: 'Political thoughts, International Relations & Governance' },
  { id: 'crs', name: 'Christian Religious Studies (CRS)', category: 'ARTS', compulsory: false, description: 'Biblical history, teachings & moral foundations' },
  { id: 'irs', name: 'Islamic Religious Studies (IRS)', category: 'ARTS', compulsory: false, description: 'Quranic studies, Hadith & Islamic Jurisprudence' },
  { id: 'hist', name: 'History', category: 'ARTS', compulsory: false, description: 'Nigerian, African & World Historiography' },

  // Languages
  { id: 'yor', name: 'Yorùbá Language', category: 'LANGUAGES', compulsory: false, description: 'Grammar, Culture, Proverbs & Literature' },
  { id: 'igbo', name: 'Igbo Language', category: 'LANGUAGES', compulsory: false, description: 'Igbo Grammar, Culture & Literary Traditions' },
  { id: 'hausa', name: 'Hausa Language', category: 'LANGUAGES', compulsory: false, description: 'Hausa Linguistics, Literature & Cultural Heritage' },
  { id: 'fre', name: 'French Language', category: 'LANGUAGES', compulsory: false, description: 'Grammar, Oral Communication & French Literature' },
];

export const POPULAR_COMBINATIONS = [
  {
    name: 'Medicine & Surgery / Health Sciences',
    target: 'Sciences',
    subjectIds: ['eng', 'bio', 'chem', 'phy'],
  },
  {
    name: 'Engineering & Technology',
    target: 'Sciences',
    subjectIds: ['eng', 'math', 'phy', 'chem'],
  },
  {
    name: 'Law & International Studies',
    target: 'Arts',
    subjectIds: ['eng', 'lit', 'gov_a', 'crs'],
  },
  {
    name: 'Accounting & Banking / Finance',
    target: 'Commercial',
    subjectIds: ['eng', 'math', 'econ', 'acc'],
  },
  {
    name: 'Computer Science & Software Eng.',
    target: 'Sciences',
    subjectIds: ['eng', 'math', 'phy', 'chem'],
  },
  {
    name: 'Economics & Business Admin',
    target: 'Commercial',
    subjectIds: ['eng', 'math', 'econ', 'comm'],
  },
];
