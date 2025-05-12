export const GAME_CONSTANTS = {
  // Speed settings for different levels
  SPEED: {
    BASE: 0.2,  // Reduced base speed
    VARIATION: 0.1,  // Smaller variation for more consistent movement
    LEVEL_MULTIPLIER: 0.2  // How much to increase speed per level
  },
  // Word spawning settings
  SPAWN: {
    INITIAL_INTERVAL: 5000, // ms between spawns at level 1
    MIN_INTERVAL: 1000,     // Minimum ms between spawns at high levels
    INTERVAL_DECREMENT_PER_LEVEL: 250 // How much interval decreases per level
  },
  // Level progression settings
  LEVEL: {
    WORDS_PER_LEVEL: 10 // Number of words to clear to advance level
  },
  // Scoring settings
  SCORE: {
    POINTS_PER_WORD: 10 // Base points for clearing a word
    // Add bonus point constants later if needed
  }
};

export const KOREAN_WORDS = [
  {
    word: '안녕하세요',
    meaning: 'Halo'
  },
  {
    word: '감사합니다',
    meaning: 'Terimakasih'
  },
  {
    word: '사랑해요',
    meaning: 'Cinta'
  },
  {
    word: '잘 가요',
    meaning: 'Selamat'
  },
  {
    word: '맛있어요',
    meaning: 'Enak'
  },
  {
    word: '미안해요',
    meaning: 'Maaf'
  },
  {
    word: '화이팅',
    meaning: 'Semangat'
  },
  {
    word: '재미있어요',
    meaning: 'Seru'
  },
  {
    word: '축하해요',
    meaning: 'Selamat'
  },
  {
    word: '괜찮아요',
    meaning: 'Oke'
  },
  {
    word: '배고파요',
    meaning: 'Lapar'
  },
  {
    word: '좋아요',
    meaning: 'Suka'
  },
  {
    word: '어서오세요',
    meaning: 'Selamat'
  },
  {
    word: '주세요',
    meaning: 'Tolong'
  },
  {
    word: '행복해요',
    meaning: 'Bahagia'
  }
] as const;

// Add default export for routing purposes
export default {};
