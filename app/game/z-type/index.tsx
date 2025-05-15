import React, { useEffect, useRef } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Dimensions } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useKeyboard } from '@/components/game/z-type/hooks/useKeyboard';
import { useGameStore } from '@/components/game/z-type/store';
import { GameInput } from '@/components/game/z-type/components/GameInput';
import { WordRenderer } from '@/components/game/z-type/components/Word';
import { PlayerRenderer } from '@/components/game/z-type/components/Player';
import { HUD } from '@/components/game/z-type/components/HUD';
import { GameOver } from '@/components/game/z-type/components/GameOver';
import { getRandomWords, GAME_CONSTANTS } from '@/components/game/z-type/constants';
import { MovementSystem } from '@/components/game/z-type/systems';
import { 
  GameEngine as GameEngineType, 
  GameEntities, 
  Position,
  PlayerEntity,
  WordEntity 
} from '@/components/game/z-type/types';
import { Word } from '@/components/game/z-type/constants';

// Game constants
const SCREEN = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  playerAreaHeight: 60, // Height of player entity + margin
  wordPadding: 100, // Padding for word placement
};

// Entity factory functions
const createPlayerEntity = (playerY: number): PlayerEntity => ({
  type: 'player' as const,
  position: { 
    x: SCREEN.width / 2 - 12, 
    y: playerY 
  },
  renderer: ({ position }: { position: Position }) => (
    <PlayerRenderer position={position} />
  ),
});

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
    }) => (
      <WordRenderer 
        wordData={wordData} 
        position={position} 
        focused={focused} 
      />
    ),
  };
};

const createGameEntities = (words: Word[]): GameEntities => {
  const entities: GameEntities = {
    player: createPlayerEntity(useGameStore.getState().playerY)
  };

  words.forEach((word, index) => {
    entities[`word${index + 1}` as keyof GameEntities] = createWordEntity(word, index);
  });

  return entities;
};

const ZTypeScreen = () => {
  const { keyboardHeight, isKeyboardVisible } = useKeyboard();
  const { setPlayerY, setRunning, gameOver } = useGameStore();
  const gameEngineRef = useRef<GameEngineType>(null);

  // Initialize game
  useEffect(() => {
    setRunning(true);
  }, [setRunning]);

  // Update player position when keyboard changes
  useEffect(() => {
    const newPlayerY = SCREEN.height - keyboardHeight - SCREEN.playerAreaHeight;
    setPlayerY(newPlayerY);
  }, [keyboardHeight, isKeyboardVisible, setPlayerY]);

  // Initialize game entities
  const initialEntities = createGameEntities(getRandomWords(1, 5));

  // Handle game restart
  const handleRestart = () => {
    if (gameEngineRef.current?.swap) {
      const resetEntities = createGameEntities(getRandomWords(1, 5));
      gameEngineRef.current.swap(resetEntities);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {gameOver ? (
          <GameOver onRestart={handleRestart} />
        ) : (
          <>
            <HUD />
            <GameEngine
              ref={gameEngineRef}
              style={styles.gameEngine}
              entities={initialEntities}
              systems={[MovementSystem]}
              running={true}
            />
            <GameInput />
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gameEngine: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    position: 'relative',
  },
});

export default ZTypeScreen;
