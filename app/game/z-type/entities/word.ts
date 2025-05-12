import { KOREAN_WORDS, GAME_CONSTANTS } from '../utils/constants'; // Import GAME_CONSTANTS
import { WordRenderer } from '../components/WordRenderer';

export interface WordEntity {
  id: string;
  word: string;
  meaning: string;
  position: { x: number; y: number };
  speedVariation: number; // Store individual speed variation
  renderer: typeof WordRenderer;
  renderProps?: {
    id: string;
  };
}

export const createWord = (x: number, y: number): WordEntity => {
  const randomWord = KOREAN_WORDS[Math.floor(Math.random() * KOREAN_WORDS.length)];
  const id = Math.random().toString();
  
  // Calculate a random speed variation for this word
  const speedVariation = Math.random() * GAME_CONSTANTS.SPEED.VARIATION;

  return {
    id,
    word: randomWord.word,
    meaning: randomWord.meaning,
    position: { x, y },
    speedVariation: speedVariation, // Initialize variation
    renderer: WordRenderer,
    renderProps: {
      id
    }
  };
};
