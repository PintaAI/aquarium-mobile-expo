import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useKeyboard } from '@/components/game/z-type/hooks/useKeyboard';
import { useScreen } from '@/components/game/z-type/hooks/useScreen';
import { useGameEngine } from '@/components/game/z-type/hooks/useGameEngine';
import { StartScreen } from '@/components/game/StartScreen';
import { games } from '@/lib/game';
import { useGameStore } from '@/components/game/z-type/store';
import { GameInput } from '@/components/game/z-type/components/GameInput';
import { LineRenderer } from '@/components/game/z-type/components/Line';
import { HUD } from '@/components/game/z-type/components/HUD';
import { DevLog } from '@/components/game/z-type/components/DevLog';
import { GameOver } from '@/components/game/z-type/components/GameOver';
import { MovementSystem } from '@/components/game/z-type/systems';
import { Word } from '~/components/game/constants';

const ZTypeScreen = () => {
  const { keyboardHeight, isKeyboardVisible } = useKeyboard();
  const SCREEN = useScreen();
  const { gameEngineRef, entities, setEntities, createGameEntities } = useGameEngine();
  const { setPlayerY, setRunning, gameOver, showStartScreen, setLevel, resetGame, playerY, running } = useGameStore();

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
    const newPlayerY = SCREEN.height - keyboardHeight - SCREEN.playerAreaHeight;
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
