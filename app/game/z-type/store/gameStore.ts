import { create } from 'zustand';
import { createWord, WordEntity } from '../entities/word';
import { GAME_CONSTANTS } from '../utils/constants'; // Assuming constants are here

interface GameState {
  isGameOver: boolean;
  gameKey: number;
  words: Record<string, WordEntity>;
  targetedWordId: string;
  targetedMatchLength: number;
  // New state variables
  currentLevel: number;
  score: number;
  wordsCleared: number;
  highScore: number; // Consider persisting this later
  spawnInterval: number; // Time in ms

  // Actions
  setGameOver: (value: boolean) => void;
  resetGame: () => void;
  addWord: (x: number, y: number) => void;
  removeWord: (id: string) => void;
  getWords: () => WordEntity[];
  initializeWords: (width: number, height: number, numWords?: number) => void;
  setTargetedWord: (id: string, matchLength: number) => void;
  // New actions
  incrementLevel: () => void;
  incrementScore: (points: number) => void;
  incrementWordsCleared: () => void;
  updateSpawnInterval: () => void;
  resetScore: () => void; // Might be useful if highScore is persisted
}

// Define initial values, potentially from constants
const INITIAL_LEVEL = 1;
const INITIAL_SCORE = 0;
const INITIAL_WORDS_CLEARED = 0;
// TODO: Define GAME_CONSTANTS.SPAWN.INITIAL_INTERVAL in constants.ts
const INITIAL_SPAWN_INTERVAL = GAME_CONSTANTS?.SPAWN?.INITIAL_INTERVAL ?? 5000; // Default fallback

export const useGameStore = create<GameState>((set, get) => ({
  isGameOver: false,
  gameKey: 0,
  words: {},
  targetedWordId: '',
  targetedMatchLength: 0,
  // Initialize new state
  currentLevel: INITIAL_LEVEL,
  score: INITIAL_SCORE,
  wordsCleared: INITIAL_WORDS_CLEARED,
  highScore: 0, // Load from storage later if needed
  spawnInterval: INITIAL_SPAWN_INTERVAL,

  setGameOver: (value) => set({ isGameOver: value }),

  resetGame: () => set((state) => ({
    gameKey: state.gameKey + 1,
    isGameOver: false,
    words: {},
    targetedWordId: '',
    targetedMatchLength: 0,
    // Reset new state
    currentLevel: INITIAL_LEVEL,
    score: INITIAL_SCORE,
    wordsCleared: INITIAL_WORDS_CLEARED,
    // Keep highScore, reset others
    // TODO: Define GAME_CONSTANTS.SPAWN.INITIAL_INTERVAL in constants.ts
    spawnInterval: GAME_CONSTANTS?.SPAWN?.INITIAL_INTERVAL ?? 5000, // Default fallback
  })),

  addWord: (x: number, y: number) => set((state) => {
    const newWord = createWord(x, y);
    return {
      words: {
        ...state.words,
        [newWord.id]: newWord
      }
    };
  }),

  removeWord: (id: string) => set((state) => {
    const newWords = { ...state.words };
    delete newWords[id];

    // Increment words cleared when a word is removed
    const newWordsCleared = state.wordsCleared + 1;

    // Check for level up (logic will be refined later, maybe in a system)
    // TODO: Define GAME_CONSTANTS.LEVEL.WORDS_PER_LEVEL in constants.ts
    // if (newWordsCleared % (GAME_CONSTANTS?.LEVEL?.WORDS_PER_LEVEL ?? 10) === 0) {
    //   // Trigger level up side effects (handled elsewhere)
    // }

    return {
      words: newWords,
      wordsCleared: newWordsCleared,
      // Reset target if the removed word was the target
      targetedWordId: state.targetedWordId === id ? '' : state.targetedWordId,
      targetedMatchLength: state.targetedWordId === id ? 0 : state.targetedMatchLength,
    };
  }),

  getWords: () => {
    const words = Object.values(get().words);
    return words;
  },

  setTargetedWord: (id: string, matchLength: number) => set({ 
    targetedWordId: id, 
    targetedMatchLength: matchLength 
  }),

  initializeWords: (width: number, height: number, numWords = 5) => set(() => {
    console.log('Store - Initializing words');
    const initialWords: Record<string, WordEntity> = {};
    
    for (let i = 0; i < numWords; i++) {
      const x = (width / (numWords + 1)) * (i + 1) + (Math.random() * 50 - 25);
      const y = Math.random() * -100;
      const word = createWord(x, y);
      initialWords[word.id] = word;
    }

    return { words: initialWords };
  }),

  // --- New Actions ---
  incrementLevel: () => set((state) => ({
    currentLevel: state.currentLevel + 1,
  })),

  incrementScore: (points: number) => set((state) => {
    const newScore = state.score + points;
    return {
      score: newScore,
      // Update high score if current score exceeds it
      highScore: Math.max(state.highScore, newScore),
    };
  }),

  incrementWordsCleared: () => set((state) => ({ // Kept separate in case needed elsewhere
    wordsCleared: state.wordsCleared + 1,
  })),

  updateSpawnInterval: () => set((state) => {
    // Decrease spawn interval based on level, ensure minimum interval
    // TODO: Define constants in constants.ts
    const minInterval = GAME_CONSTANTS?.SPAWN?.MIN_INTERVAL ?? 1000;
    const initialInterval = GAME_CONSTANTS?.SPAWN?.INITIAL_INTERVAL ?? 5000;
    const decrement = GAME_CONSTANTS?.SPAWN?.INTERVAL_DECREMENT_PER_LEVEL ?? 200;

    const newInterval = Math.max(
      minInterval,
      initialInterval - (state.currentLevel - 1) * decrement
    );
    return { spawnInterval: newInterval };
  }),

  resetScore: () => set({ score: INITIAL_SCORE }), // Example if needed

}));
