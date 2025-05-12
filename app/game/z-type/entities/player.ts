import { PlayerRenderer } from '../components/PlayerRenderer';

export interface PlayerEntity {
  id: string;
  position: { x: number; y: number };
  renderer: typeof PlayerRenderer;
}

export const createPlayer = (gameWidth: number, gameHeight: number): PlayerEntity => {
  return {
    id: 'player',
    position: {
      x: gameWidth / 2, // Center horizontally
      y: gameHeight - 50 // Fixed position from bottom
    },
    renderer: PlayerRenderer
  };
};
