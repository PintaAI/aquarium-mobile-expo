import React from 'react';
import { TextInput, View } from 'react-native';
import { useGameStore } from '../store';

export const GameInput = () => {
  const { input, running, gameOver } = useGameStore((state) => ({
    input: state.input,
    running: state.running,
    gameOver: state.gameOver,
  }));

  const setInput = useGameStore((state) => state.setInput);

  // Input changes will be checked in real-time by game systems
  const handleInputChange = (text: string) => {
    if (!running || gameOver) return;
    setInput(text.toLowerCase());
  };

  return (
    <View className="w-full px-2 py-2">
      <TextInput
        className="w-full h-12 px-4 text-center rounded-lg bg-muted text-primary"
        value={input}
        onChangeText={handleInputChange}
        placeholder="Type the meaning..."
        placeholderTextColor="#666"
        autoCapitalize="none"
        autoCorrect={false}
       
      />
    </View>
  );
};
