import { create } from 'zustand';
import { createWord, WordEntity } from '../entities/word';

interface GameState {
  isGameOver: boolean;
  gameKey: number;
  words: Record<string, WordEntity>;
  setGameOver: (value: boolean) => void;
  resetGame: () => void;
  addWord: (x: number, y: number) => void;
  removeWord: (id: string) => void;
  getWords: () => WordEntity[];
  initializeWords: (width: number, height: number, numWords?: number) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  isGameOver: false,
  gameKey: 0,
  words: {},

  setGameOver: (value) => set({ isGameOver: value }),

  resetGame: () => set((state) => ({ 
    gameKey: state.gameKey + 1, 
    isGameOver: false,
    words: {}
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
    console.log('Store - Before removal:', state.words);
    console.log('Store - Removing word with id:', id);
    const newWords = { ...state.words };
    delete newWords[id];
    console.log('Store - After removal:', newWords);
    return { words: newWords };
  }),

  getWords: () => {
    const words = Object.values(get().words);
    console.log('Store - Current words:', words);
    return words;
  },

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
}));
