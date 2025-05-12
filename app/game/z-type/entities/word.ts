import { KOREAN_WORDS } from '../utils/constants';
import { WordRenderer } from '../components/WordRenderer';

export interface WordEntity {
  id: string;
  word: string;
  meaning: string;
  position: { x: number; y: number };
  speed: number;
  renderer: typeof WordRenderer;
}

export const createWord = (x: number, y: number): WordEntity => {
  const randomWord = KOREAN_WORDS[Math.floor(Math.random() * KOREAN_WORDS.length)];
  
  return {
    id: Math.random().toString(),
    word: randomWord.word,
    meaning: randomWord.meaning,
    position: { x, y },
    speed: 0, // Speed will be set by MovementSystem
    renderer: WordRenderer
  };
};
