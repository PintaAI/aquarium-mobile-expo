import React, { useMemo, useState, useRef } from 'react';
import { View, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { useKeyboardHeight } from './hooks/useKeyboardHeight';
import KeyboardSystem from './systems/keyboard';
import MovementSystem from './systems/movement';
import { GameEngine } from 'react-native-game-engine';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '~/components/ui/text';
import { GameInput } from './components/GameInput';
import { createWord } from './entities/word';
import { createPlayer } from './entities/player';

export default function ZTypeGame() {
  const [isGameOver, setIsGameOver] = useState(false);
  const gameEngineRef = useRef<GameEngine>(null);
  const { width, height } = useWindowDimensions();
  const keyboardHeight = useKeyboardHeight();
  const adjustedHeight = height - keyboardHeight;
  
  // Create word only once
  const word1 = useMemo(() => createWord(Math.random() * (width - 100), 0), [width]);

  const entities = useMemo(() => ({
    player: {
      ...createPlayer(width - 20, adjustedHeight - 215),
      gameHeight: height, // Store initial height for reference
      keyboardHeight: keyboardHeight // Store current keyboard height
    },
    word1
  }), [keyboardHeight, width, height, adjustedHeight, word1]);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top','bottom']}>
      <KeyboardAvoidingView 
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 1 : 20}
      >
      <View className="flex-1 border-2 border-foreground/20 m-2 rounded-lg">
          <GameEngine
            key={keyboardHeight}
            systems={[KeyboardSystem, MovementSystem]}
            running={!isGameOver}
            entities={entities}
            onEvent={(event: { type: string }) => {
              if (event.type === 'game-over') {
                setIsGameOver(true);
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
                  onPress={() => {
                    setIsGameOver(false);
                  }}
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
