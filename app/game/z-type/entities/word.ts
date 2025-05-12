import { KOREAN_WORDS } from '../utils/constants';
import { WordRenderer } from '../components/WordRenderer';

export interface WordEntity {
  id: string;
  word: string;
  meaning: string;
  position: { x: number; y: number };
  speed: number;
  renderer: typeof WordRenderer;
  renderProps?: {
    id: string;
  };
}

export const createWord = (x: number, y: number): WordEntity => {
  const randomWord = KOREAN_WORDS[Math.floor(Math.random() * KOREAN_WORDS.length)];
  const id = Math.random().toString();
  
  return {
    id,
    word: randomWord.word,
    meaning: randomWord.meaning,
    position: { x, y },
    speed: 0, // Speed will be set by MovementSystem
    renderer: WordRenderer,
    renderProps: {
      id
    }
  };
};
