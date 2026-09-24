// Image database with high quality imagery and offline SVG fallbacks

const createFallbackSVG = (text, bgColor = '#1e1b4b', textColor = '#818cf8') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="${bgColor}"/>
    <circle cx="400" cy="300" r="180" fill="none" stroke="${textColor}" stroke-width="4" stroke-dasharray="12 12"/>
    <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="#f8fafc" font-family="sans-serif" font-size="42" font-weight="bold">${text}</text>
    <text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="20">Can you guess this image?</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export const categoriesList = [
  'All Categories',
  'Landmarks',
  'Animals',
  'Art & Masterpieces',
  'Space & Science',
  'Food & Dishes',
  'Nature & Wonders'
];

export const IMAGES_DATABASE = [
  {
    id: 'eiffel-tower',
    name: 'Eiffel Tower',
    aliases: ['tour eiffel', 'the eiffel tower', 'eiffel tower paris', 'eiffel'],
    category: 'Landmarks',
    difficulty: 'easy',
    hintCategory: 'Architectural landmark in Europe',
    hintFunFact: 'Built in 1889 for the World\'s Fair in Paris, France.',
    imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1000&q=80',
    fallbackSvg: createFallbackSVG('Eiffel Tower', '#1e1b4b', '#a78bfa')
  },
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    aliases: ['the taj mahal', 'taj mahal india', 'tajmahal'],
    category: 'Landmarks',
    difficulty: 'easy',
    hintCategory: 'Famous white marble mausoleum',
    hintFunFact: 'Located on the bank of the Yamuna river in Agra, India.',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80',
    fallbackSvg: createFallbackSVG('Taj Mahal', '#064e3b', '#34d399')
  },
  {
    id: 'statue-of-liberty',
    name: 'Statue of Liberty',
    aliases: ['lady liberty', 'liberty statue', 'the statue of liberty', 'statue liberty'],
    category: 'Landmarks',
    difficulty: 'easy',
    hintCategory: 'Colossal neoclassical sculpture in New York Harbor',
    hintFunFact: 'A gift of friendship from the people of France to the United States.',
    imageUrl: 'https://images.unsplash.com/photo-1605130284535-11dd9ede6523?auto=format&fit=crop&w=1000&q=80',
    fallbackSvg: createFallbackSVG('Statue of Liberty', '#0f766e', '#2dd4bf')
  },
  {
    id: 'mona-lisa',
    name: 'Mona Lisa',
    aliases: ['la gioconda', 'monalisa', 'the mona lisa', 'da vinci mona lisa'],
    category: 'Art & Masterpieces',
    difficulty: 'easy',
    hintCategory: 'Famous 16th century portrait painting',
    hintFunFact: 'Painted by Italian artist Leonardo da Vinci.',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
    fallbackSvg: createFallbackSVG('Mona Lisa', '#451a03', '#fbbf24')
  },
  {
    id: 'giant-panda',
    name: 'Panda',
    aliases: ['giant panda', 'panda bear', 'bamboo panda'],
    category: 'Animals',
    difficulty: 'easy',
    hintCategory: 'Black and white bear native to south central China',
    hintFunFact: '99% of its diet consists of fresh bamboo leaves and shoots.',
    imageUrl: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef9?auto=format&fit=crop&w=1000&q=80',
    fallbackSvg: createFallbackSVG('Giant Panda', '#18181b', '#a1a1aa')
  },
  {
    id: 'colosseum',
    name: 'Colosseum',
    aliases: ['the colosseum', 'flavian amphitheatre', 'colosseum rome', 'rome colosseum'],
    category: 'Landmarks',
    difficulty: 'easy',
    hintCategory: 'Ancient amphitheatre located in the center of Rome',
    hintFunFact: 'Could hold an estimated 50,000 to 80,000 spectators for gladiatorial contests.',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1000&q=80',
    fallbackSvg: createFallbackSVG('Colosseum', '#78350f', '#f59e0b')
  },
  {
    id: 'lion',
    name: 'Lion',
    aliases: ['African lion', 'king of the jungle', 'male lion'],
    category: 'Animals',
    difficulty: 'easy',
    hintCategory: 'Apex predator big cat with a prominent mane',
    hintFunFact: 'A lion\'s roar can be heard from up to 5 miles (8 kilometers) away.',
    imageUrl: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?auto=format&fit=crop&w=1000&q=80',
    fallbackSvg: createFallbackSVG('Lion', '#713f12', '#fde047')
  },
  {
    id: 'saturn',
    name: 'Saturn',
    aliases: ['planet saturn', 'ringed planet', 'saturn planet'],
    category: 'Space & Science',
    difficulty: 'medium',
    hintCategory: 'Sixth planet from the Sun with spectacular ring system',
    hintFunFact: 'The rings are mostly composed of ice particles with a small amount of rocky debris.',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1000&q=80',
    fallbackSvg: createFallbackSVG('Saturn', '#312e81', '#a5b4fc')
  },
  {
    id: 'starry-night',
    name: 'The Starry Night',
    aliases: ['starry night', 'van gogh starry night', 'vincent van gogh starry night'],
    category: 'Art & Masterpieces',
    difficulty: 'medium',
    hintCategory: 'Oil-on-canvas painting showing a swirling night sky',
    hintFunFact: 'Painted by Vincent van Gogh in June 1889 depicting the view from his asylum room.',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80',
    fallbackSvg: createFallbackSVG('The Starry Night', '#1e3a8a', '#60a5fa')
  },
  {
    id: 'pizza',
    name: 'Pizza',
    aliases: ['pepperoni pizza', 'italian pizza', 'margherita pizza'],
    category: 'Food & Dishes',
    difficulty: 'easy',
    hintCategory: 'Savory dish of Italian origin consisting of a flattened dough base',
    hintFunFact: 'Modern pizza evolved from similar flatbread dishes in Naples, Italy in the 18th century.',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80',
    fallbackSvg: createFallbackSVG('Pizza', '#991b1b', '#fca5a5')
  },
  {
    id: 'great-wall-china',
    name: 'Great Wall of China',
    aliases: ['the great wall of china', 'great wall', 'china wall'],
    category: 'Landmarks',
    difficulty: 'medium',
    hintCategory: 'Ancient series of fortifications across northern China',
    hintFunFact: 'The total length of all sections built over centuries exceeds 21,000 kilometers.',
    imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1000&q=80',
    fallbackSvg: createFallbackSVG('Great Wall of China', '#3f6212', '#a3e635')
  },
  {
    id: 'aurora-borealis',
    name: 'Northern Lights',
    aliases: ['aurora borealis', 'aurora', 'northern light', 'polar lights'],
    category: 'Nature & Wonders',
    difficulty: 'medium',
    hintCategory: 'Natural light display in Earth\'s sky at high-latitude regions',
    hintFunFact: 'Caused by disturbances in the magnetosphere caused by solar wind.',
    imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1000&q=80',
    fallbackSvg: createFallbackSVG('Northern Lights', '#065f46', '#34d399')
  },
  {
    id: 'mount-fuji',
    name: 'Mount Fuji',
    aliases: ['mt fuji', 'fuji-san', 'fujisan', 'mount fuji japan'],
    category: 'Nature & Wonders',
    difficulty: 'medium',
    hintCategory: 'Snow-capped active stratovolcano in Japan',
    hintFunFact: 'Japan\'s tallest mountain at 3,776 meters (12,389 ft).',
    imageUrl: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1000&q=80',
    fallbackSvg: createFallbackSVG('Mount Fuji', '#1e293b', '#94a3b8')
  },
  {
    id: 'sushi',
    name: 'Sushi',
    aliases: ['sushi roll', 'nigiri', 'japanese sushi', 'sashimi'],
    category: 'Food & Dishes',
    difficulty: 'easy',
    hintCategory: 'Traditional Japanese dish of seasoned vinegared rice and seafood',
    hintFunFact: 'Originally developed as a method of preserving fish in fermented rice.',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=80',
    fallbackSvg: createFallbackSVG('Sushi', '#831843', '#f472b6')
  },
  {
    id: 'chichen-itza',
    name: 'Chichen Itza',
    aliases: ['el castillo', 'mayan pyramid', 'chichen itza mexico'],
    category: 'Landmarks',
    difficulty: 'hard',
    hintCategory: 'Pre-Columbian Mayan pyramid city in Yucatan, Mexico',
    hintFunFact: 'The Temple of Kukulcan has 365 steps, matching the number of days in the Mayan solar year.',
    imageUrl: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1000&q=80',
    fallbackSvg: createFallbackSVG('Chichen Itza', '#854d0e', '#facc15')
  },
  {
    id: 'hubble-nebula',
    name: 'Nebula',
    aliases: ['carina nebula', 'space nebula', 'cosmic nebula', 'orion nebula'],
    category: 'Space & Science',
    difficulty: 'medium',
    hintCategory: 'Interstellar cloud of dust, hydrogen, helium and other ionized gases',
    hintFunFact: 'Often called stellar nurseries because stars are born within them.',
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1000&q=80',
    fallbackSvg: createFallbackSVG('Nebula', '#4c1d95', '#c084fc')
  }
];
