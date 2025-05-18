import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RotateCcw, Home, Trophy, Target } from 'lucide-react-native';
import { useGameStore } from '../store';
import { iconWithClassName } from '@/lib/icons/iconWithClassName';

// Register icons with NativeWind
iconWithClassName(RotateCcw);
iconWithClassName(Home);
iconWithClassName(Trophy);
iconWithClassName(Target);

interface GameOverProps {
  onRestart?: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ onRestart }) => {
  const score = useGameStore((state) => state.score);
  const level = useGameStore((state) => state.level);
  const resetGame = useGameStore((state) => state.resetGame);
  const setGameOver = useGameStore((state) => state.setGameOver);
  const setRunning = useGameStore((state) => state.setRunning);

  const handleBackToMenu = () => {
    resetGame();
  };

  const handleRestart = () => {
    resetGame();
    setGameOver(false);
    setRunning(true);
    onRestart?.();
  };

  return (
    <View className="absolute inset-0 bg-background/80 items-center justify-center">
      <View className="bg-card p-6 shadow-black shadow-lg rounded-lg w-4/5 max-w-sm items-center">
        <Text className="text-3xl font-bold text-foreground mb-6">Game Over!</Text>
        <View className="flex-row items-center mb-4">
          <Trophy className="text-primary mr-2" size={24} />
          <Text className="text-xl text-foreground">Score: {score}</Text>
        </View>
        <View className="flex-row items-center mb-6">
          <Target className="text-primary mr-2" size={24} />
          <Text className="text-lg text-foreground">Level: {level}</Text>
        </View>
        <View className="flex-row">
          <TouchableOpacity
            className="bg-primary w-24 h-12 rounded-full items-center justify-center mr-4"
            onPress={handleRestart}
          >
            <RotateCcw className="text-primary-foreground" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-secondary w-24 h-12 rounded-full items-center justify-center"
            onPress={handleBackToMenu}
          >
            <Home className="text-secondary-foreground" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
