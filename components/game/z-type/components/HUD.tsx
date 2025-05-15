import React from 'react';
import { View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { Trophy, Target, ArrowRight } from 'lucide-react-native';
import { iconWithClassName } from '../../../../lib/icons/iconWithClassName';
import { useGameStore } from '../store';
import { Progress } from '../../../ui/progress'; // Import the Progress component

// Enable styling for icons
iconWithClassName(Trophy);
iconWithClassName(Target);
iconWithClassName(ArrowRight);

export const HUD = () => {
  const score = useGameStore((state) => state.score);
  const level = useGameStore((state) => state.level);

  // Calculate progress towards the next level
  // Level increases every 10 points (assuming 1 point per word)
  const wordsTowardsNextLevel = score % 10;
  return (
    <BlurView intensity={10} className="absolute mx-2 border-2 border-accent rounded-xl top-0 left-0 right-0 overflow-hidden z-10">
      <View className="p-2">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-1">
            <Target className="text-primary" size={16} />
            <Text className="text-primary text-lg font-bold">{level}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <ArrowRight className="text-primary" size={16} />
            <Text className="text-primary text-lg font-bold">{wordsTowardsNextLevel}/10</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Trophy className="text-primary" size={16} />
            <Text className="text-primary text-lg font-bold">{score}</Text>
          </View>
        </View>
        <View className="mx-0">
          <Progress
            value={wordsTowardsNextLevel * 10} // Value should be 0-100
            className="mt-3 h-2.5" // Adjusted height to match previous basic bar
            indicatorClassName="bg-primary/20" // Style for the indicator
          />
        </View>
      </View>
    </BlurView>
  );
};
