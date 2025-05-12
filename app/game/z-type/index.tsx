import React, { useEffect, useMemo } from 'react';
import { View, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { useKeyboardHeight } from './hooks/useKeyboardHeight';
import KeyboardSystem from './systems/keyboard';
import MovementSystem from './systems/movement';
import GameLogicSystem from './systems/gameLogic'; // Import the new system
import { GameEngine } from 'react-native-game-engine';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '~/components/ui/text';
import { GameInput } from './components/GameInput';
import { createPlayer } from './entities/player';
import { useGameStore } from './store/gameStore';
import { GAME_CONSTANTS } from './utils/constants'; // Import constants for level calculation

export default function ZTypeGame() {
  const { width, height } = useWindowDimensions();
  const keyboardHeight = useKeyboardHeight();
  const adjustedHeight = height - keyboardHeight;
  
  // Destructure new state variables
  const { 
    isGameOver, 
    gameKey, 
    words, 
    setGameOver, 
    resetGame, 
    initializeWords,
    score,
    highScore,
    currentLevel,
    wordsCleared 
  } = useGameStore();

  useEffect(() => {
    initializeWords(width, height);
  }, [width, height, gameKey]);

  const makeEntities = () => ({
    player: {
      ...createPlayer(width - 20, adjustedHeight - 215),
      gameHeight: height,
      keyboardHeight: keyboardHeight
    },
    ...Object.entries(words).reduce((acc, [id, word]) => ({
      ...acc,
      [`word${id}`]: word
    }), {})
  });

  const entities = useMemo(() => makeEntities(), [words, width, height, adjustedHeight, keyboardHeight]);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top','bottom']}>
      <KeyboardAvoidingView 
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 1 : 20}
      >
      <View className="flex-1 border-2 border-foreground/20 m-2 rounded-lg">
          <GameEngine
            key={`${keyboardHeight}-${gameKey}-${Object.keys(words).length}`}
            // Add GameLogicSystem to the systems array
            systems={[KeyboardSystem, MovementSystem, GameLogicSystem]} 
            running={!isGameOver}
            entities={entities}
            onEvent={(event: { type: string }) => {
              if (event.type === 'game-over') {
                setGameOver(true);
              }
            }}
          >
          {/* Status Display */}
          {!isGameOver && (
            <View className="absolute top-2 left-2 p-2 bg-background/70 rounded-lg z-10">
              <Text className="text-foreground font-semibold">Score: {score}</Text>
              <Text className="text-muted-foreground text-xs">High Score: {highScore}</Text>
              <Text className="text-foreground font-semibold mt-1">Level: {currentLevel}</Text>
              <Text className="text-muted-foreground text-xs">
                Progress: {wordsCleared % GAME_CONSTANTS.LEVEL.WORDS_PER_LEVEL} / {GAME_CONSTANTS.LEVEL.WORDS_PER_LEVEL}
              </Text>
            </View>
          )}
          {/* Game Over / Dev Mode Overlay */}
          <View className="absolute inset-0 items-center justify-center">
            {isGameOver ? (
              <View className="absolute inset-0 items-center justify-center bg-background/80 z-20">
                <Text className="text-4xl text-destructive font-bold mb-4">Game Over!</Text>
                <Text className="text-lg text-muted-foreground mb-8">Better luck next time!</Text>
                <Text 
                  className="text-primary bg-primary/20 px-4 py-2 rounded-lg active:opacity-70" 
                  onPress={resetGame}
                >
                  Try Again
                </Text>
              </View>
            ) : (
              // Keep Dev Mode text if needed, or remove/comment out for cleaner look
              <Text className="text-xs text-muted-foreground bg-destructive/10 px-1 py-0.5 rounded absolute bottom-2 right-2">
                Dev {`(w:${Math.round(width)},h:${Math.round(height)},kh:${Math.round(keyboardHeight)},ah:${Math.round(adjustedHeight)})`} Lvl:{currentLevel} WC:{wordsCleared} SI:{useGameStore.getState().spawnInterval}
              </Text>
            )}
          </View>
        </GameEngine>
      </View>
      <GameInput />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
