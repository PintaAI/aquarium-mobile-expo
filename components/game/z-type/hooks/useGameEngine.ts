import React from 'react';
import { Word } from '~/components/game/constants';
import { GAME_CONSTANTS } from '~/components/game/constants';
import { useScreen } from './useScreen';
import { useGameStore } from '../store';
import { PlayerRenderer } from '../components/Player';
import { WordRenderer } from '../components/Word';
import type { 
  GameEngine as GameEngineType,
  GameEntities, 
  Position,
  PlayerEntity,
  WordEntity 
} from '../types';

export const useGameEngine = () => {
  const SCREEN = useScreen();
  const gameEngineRef = React.useRef<GameEngineType>(null);
  const [entities, setEntities] = React.useState<GameEntities | null>(null);

  const createPlayerEntity = (): PlayerEntity => {
    const playerY = useGameStore.getState().playerY;
    return {
      type: 'player' as const,
      position: { 
        x: SCREEN.width / 2 - 12, 
        y: playerY 
      },
      renderer: () => {
        // Always get latest position from store
        const currentY = useGameStore.getState().playerY;
        return React.createElement(PlayerRenderer, { 
          position: { 
            x: SCREEN.width / 2 - 12, 
            y: currentY 
          }
        });
      }
    };
  };

  const createWordEntity = (word: Word, index: number): WordEntity => {
    const randomX = Math.random() * (SCREEN.width - SCREEN.wordPadding);
    const randomY = -100 - (Math.random() * 300);
    const randomSpeed = GAME_CONSTANTS.INITIAL_SPEED + 
      (Math.random() * GAME_CONSTANTS.INITIAL_SPEED);

    return {
      type: 'word' as const,
      wordData: word,
      position: { x: randomX, y: randomY },
      speed: randomSpeed,
      focused: false,
      renderer: ({ position, wordData, focused }: { 
        position: Position; 
        wordData: Word; 
        focused: boolean 
      }) => React.createElement(WordRenderer, { 
        wordData,
        position,
        focused
      })
    };
  };

  const createGameEntities = (words: Word[]): GameEntities => {
    const entities: GameEntities = {
      player: createPlayerEntity()
    };

    words.forEach((word, index) => {
      entities[`word${index + 1}` as keyof GameEntities] = createWordEntity(word, index);
    });

    return entities;
  };

  return {
    gameEngineRef,
    entities,
    setEntities,
    createGameEntities,
  };
};
