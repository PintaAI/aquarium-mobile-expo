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
  
  // Generate random speed between 0.5 and 2
  const speed = 0.5 + Math.random() * 1.5;

  return {
    id: Math.random().toString(),
    word: randomWord.word,
    meaning: randomWord.meaning,
    position: { x, y },
    speed,
    renderer: WordRenderer
  };
};
