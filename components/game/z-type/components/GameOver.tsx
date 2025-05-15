import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useGameStore } from '../store';

interface GameOverProps {
  onRestart?: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ onRestart }) => {
  const score = useGameStore((state) => state.score);
  const level = useGameStore((state) => state.level);
  const resetGame = useGameStore((state) => state.resetGame);
  const setGameOver = useGameStore((state) => state.setGameOver);
  const setRunning = useGameStore((state) => state.setRunning);

  const handleRestart = () => {
    resetGame();
    setGameOver(false);
    setRunning(true);
    onRestart?.();
  };

  return (
    <View className="absolute inset-0 bg-background/80 items-center justify-center">
      <View className="bg-card p-6 shadow-black shadow-lg rounded-lg w-4/5 max-w-sm items-center">
        <Text className="text-2xl font-bold text-foreground mb-4">Game Over!</Text>
        <Text className="text-xl text-foreground mb-2">Score: {score}</Text>
        <Text className="text-lg text-foreground mb-6">Level: {level}</Text>
        <TouchableOpacity
          className="bg-primary px-8 py-3 rounded-lg"
          onPress={handleRestart}
        >
          <Text className="text-primary-foreground font-semibold text-lg">Play Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
