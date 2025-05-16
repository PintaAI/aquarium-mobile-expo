export interface Word {
  id: string;
  word: string;
  meaning: string;
}

export const wordList: Word[] = [
  { id: '1', word: '안녕', meaning: 'halo' },
  { id: '2', word: '감사합니다', meaning: 'terimakasih' },
  { id: '3', word: '사랑해', meaning: 'loveyou' },
  { id: '4', word: '잘 가', meaning: 'dada' },
  { id: '5', word: '밥', meaning: 'nasi' },
  { id: '6', word: '물', meaning: 'air' },
  { id: '7', word: '네', meaning: 'ya' },
  { id: '8', word: '아니', meaning: 'tidak' },
  { id: '9', word: '주세요', meaning: 'tolong berikan' },
  { id: '10', word: '죄송합니다', meaning: 'maaf' },
  { id: '11', word: '친구', meaning: 'teman' },
  { id: '12', word: '하나', meaning: 'satu' },
  { id: '13', word: '둘', meaning: 'dua' },
  { id: '14', word: '셋', meaning: 'tiga' },
  { id: '15', word: '엄마', meaning: 'ibu' },
  { id: '16', word: '아빠', meaning: 'ayah' },
  { id: '17', word: '가자', meaning: 'ayo' },
  { id: '18', word: '빨리', meaning: 'cepat' },
  { id: '19', word: '진짜', meaning: 'serius' },
  { id: '20', word: '고마워', meaning: 'terimakasih' }
];

export function getRandomWords(level: number, count: number): Word[] {
  // Higher levels will use words with more characters
  const filteredWords = wordList.filter(word => {
    if (level <= 2) return word.word.length <= 1; // Easy: 1 character
    if (level <= 4) return word.word.length <= 2; // Medium: 2 characters
    return true; // Hard: any length
  });

  // Ensure we don't try to get more words than available
  const requestedCount = Math.min(count, filteredWords.length);
  
  // Fisher-Yates shuffle algorithm to get random words without duplicates
  const shuffled = [...filteredWords];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Return the first 'count' words
  return shuffled.slice(0, requestedCount);
}

// Game constants
export const GAME_CONSTANTS = {
  INITIAL_SPEED: 0.02, // Base speed for visible movement
  SPEED_MULTIPLIER: 1.2, // Speed increases by 20% each level
  SCORE_PER_WORD: 10,
  STREAK_BONUS: 5, // Additional points per word in streak
  LEVEL_UP_WORDS: 10, // Number of correct words needed to level up
} as const;
