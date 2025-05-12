import * as React from 'react';
import { View, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '~/components/ui/text';
import { GameInput } from './components/GameInput';
import { createWord } from './entities/word';
import { createPlayer } from './entities/player';

export default function ZTypeGame() {
  const { width, height } = useWindowDimensions();
  
  const entities = {
    player: createPlayer(width - 20, height - 100), // Accounting for margins and safe areas
    word1: createWord(Math.random() * (width - 100), 0), // Random x position at top
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top','bottom']}>
      <KeyboardAvoidingView 
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 1 : 20}
      >
      <View className="flex-1 border-2 border-foreground/20 m-2 rounded-lg">
        <GameEngine
          systems={[]} // Will implement systems later
          entities={entities}
        >
          <View className="absolute inset-0 items-center justify-center">
            {/*put log here for debugging*/}
            <Text className="text-lg text-muted-foreground bg-destructive/10 px-2 py-1 rounded-lg">
              Development Mode
            </Text>
          </View>
        </GameEngine>
      </View>
      <GameInput />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
