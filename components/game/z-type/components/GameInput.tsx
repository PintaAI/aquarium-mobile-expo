import React, { useRef, useEffect } from 'react';
import { TextInput, View } from 'react-native';
import { useGameStore } from '../store';

export const GameInput = () => {
  const inputRef = useRef<TextInput>(null);
  const { input, running, gameOver, setInput, triggerShot } = useGameStore((state) => ({
    input: state.input,
    running: state.running,
    gameOver: state.gameOver,
    setInput: state.setInput,
    triggerShot: state.triggerShot
  }));

  // Input changes will be checked in real-time by game systems
  const handleInputChange = (text: string) => {
    if (!running || gameOver) return;
    if (text.length > input.length) {
      // Only trigger shot when adding characters (not on backspace)
      triggerShot();
    }
    setInput(text.toLowerCase());
  };

  useEffect(() => {
    if (running && !gameOver && inputRef.current) {
      inputRef.current.focus();
    }
  }, [running, gameOver]);

  return (
    <View className="w-full px-2 py-2">
      <TextInput
        ref={inputRef}
        className="w-full h-12 px-4 text-center rounded-lg bg-muted text-primary"
        value={input}
        onChangeText={handleInputChange}
        placeholder="Type the meaning..."
        placeholderTextColor="#666"
        autoCapitalize="none"
        autoCorrect={false}
        editable={!gameOver}
        showSoftInputOnFocus={running}
        autoFocus={running}
      />
    </View>
  );
};
