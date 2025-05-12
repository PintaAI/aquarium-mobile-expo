import React, { useEffect, useMemo } from 'react';
import { View, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { useKeyboardHeight } from './hooks/useKeyboardHeight';
import KeyboardSystem from './systems/keyboard';
import MovementSystem from './systems/movement';
import { GameEngine } from 'react-native-game-engine';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '~/components/ui/text';
import { GameInput } from './components/GameInput';
import { createPlayer } from './entities/player';
import { useGameStore } from './store/gameStore';

export default function ZTypeGame() {
  const { width, height } = useWindowDimensions();
  const keyboardHeight = useKeyboardHeight();
  const adjustedHeight = height - keyboardHeight;
  
  const { isGameOver, gameKey, words, setGameOver, resetGame, initializeWords } = useGameStore();

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
            systems={[KeyboardSystem, MovementSystem]}
            running={!isGameOver}
            entities={entities}
            onEvent={(event: { type: string }) => {
              if (event.type === 'game-over') {
                setGameOver(true);
              }
            }}
          >
          <View className="absolute inset-0 items-center justify-center">
            {isGameOver ? (
              <View className="absolute inset-0 items-center justify-center bg-background/80">
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
              <Text className="text-lg text-muted-foreground bg-destructive/10 px-2 py-1 rounded-lg">
                Development Mode {`(w: ${width}, h: ${height}, kh: ${keyboardHeight}, ah: ${adjustedHeight})`}
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
