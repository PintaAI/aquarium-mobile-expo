import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Dimensions } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useKeyboard } from '@/components/game/z-type/hooks/useKeyboard';
import { StartScreen } from '@/components/game/StartScreen';
import { games } from '@/lib/game';
import { useGameStore } from '@/components/game/z-type/store';
import { GameInput } from '@/components/game/z-type/components/GameInput';
import { WordRenderer } from '@/components/game/z-type/components/Word';
import { PlayerRenderer } from '@/components/game/z-type/components/Player';
import { LineRenderer } from '@/components/game/z-type/components/Line';
import { HUD } from '@/components/game/z-type/components/HUD';
import { DevLog } from '@/components/game/z-type/components/DevLog';
import { GameOver } from '@/components/game/z-type/components/GameOver';
import { getRandomWords, GAME_CONSTANTS } from '~/components/game/constants';
import { MovementSystem } from '@/components/game/z-type/systems';
import { 
  GameEngine as GameEngineType, 
  GameEntities, 
  Position,
  PlayerEntity,
  WordEntity 
} from '@/components/game/z-type/types';
import { Word } from '~/components/game/constants';

// Game constants
const SCREEN = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  playerAreaHeight: 60, // Height of player entity + margin
  wordPadding: 100, // Padding for word placement
};

const ZTypeScreen = () => {
  const { keyboardHeight, isKeyboardVisible } = useKeyboard();
  const { setPlayerY, setRunning, gameOver, showStartScreen, setLevel, resetGame, playerY, running } = useGameStore();
  const gameEngineRef = useRef<GameEngineType>(null);
  const [entities, setEntities] = React.useState<GameEntities | null>(null);
  // Entity factory functions
  const createPlayerEntity = (): PlayerEntity => ({
    type: 'player' as const,
    position: { 
      x: SCREEN.width / 2 - 12, 
      y: playerY 
    },
    renderer: () => {
      // Always get latest position from store
      const currentY = useGameStore.getState().playerY;
      return (
        <PlayerRenderer 
          position={{ 
            x: SCREEN.width / 2 - 12, 
            y: currentY 
          }} 
        />
      );
    },
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
      player: createPlayerEntity()
    };

    words.forEach((word, index) => {
      entities[`word${index + 1}` as keyof GameEntities] = createWordEntity(word, index);
    });

    return entities;
  };

    // Handle game start
    const handleStartGame = (level: number, words: Word[]) => {
      resetGame();
      setLevel(level);
      setEntities(createGameEntities(words));
      setRunning(true);
    };

    // Handle game restart
    const [restartKey, setRestartKey] = useState(0);
    const handleRestart = () => {
      resetGame();               // clears score, gameOver, etc.
      setRunning(true);          // mark the game as running again
      setRestartKey(k => k + 1); // force-unmount & remount GameEngine
    };

  // Update player position when keyboard changes
  useEffect(() => {
    const newPlayerY = SCREEN.height - keyboardHeight - 80 - SCREEN.playerAreaHeight;
    setPlayerY(newPlayerY);
  }, [keyboardHeight, isKeyboardVisible, setPlayerY]);

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      resetGame();
      setRunning(false);
    };
  }, []);



  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {showStartScreen ? (
          <StartScreen 
            game={games.find(g => g.route === '/game/z-type')!} 
            onStartGame={handleStartGame}
          />
        ) : (
          <>
            <DevLog entities={entities || {}} />
            <HUD />
            <GameEngine
              key={restartKey}
              ref={gameEngineRef}
              style={styles.gameEngine}
              entities={entities || {}}
              systems={[MovementSystem]}
              running={running}
            />
            <LineRenderer player={{ 
              x: SCREEN.width / 2 - 12, 
              y: playerY - 9 
            }} />
            <GameInput />
            {gameOver && <GameOver onRestart={handleRestart} />}
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
