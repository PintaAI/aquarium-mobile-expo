import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/components/ui/button';

interface StartScreenProps {
  onStartGame: (level: number) => void;
}

export const StartScreen = ({ onStartGame }: StartScreenProps) => {
  const levels = [1, 2, 3, 4, 5];
  
  return (
    <View className="flex-1 justify-center items-center bg-background p-4">
      <Text className="text-3xl font-bold mb-8 text-foreground">Z-Type</Text>
      <Text className="text-lg mb-6 text-foreground">Pilih level</Text>
      
      <View className="flex-row flex-wrap justify-center gap-4">
        {levels.map((level) => (
          <Button
            key={level}
            onPress={() => onStartGame(level)}
            variant="default"
            className="w-12 h-12 rounded-full"
          >
            <Text className="text-md font-bold text-primary-foreground">
              {level}
            </Text>
          </Button>
        ))}
      </View>
    </View>
  );
};
