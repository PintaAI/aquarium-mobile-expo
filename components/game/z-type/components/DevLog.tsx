import React from 'react';
import { View, Text } from 'react-native';
import { useGameStore } from '../store';
import { GameEntities, WordEntity } from '../types';

interface DevLogProps {
  entities?: GameEntities;
}

export const DevLog: React.FC<DevLogProps> = ({ entities }) => {
  const rotation = useGameStore((state) => state.playerRotation);
  
  const input = useGameStore((state) => state.input);

  // Calculate word stats from current entities
  const wordStats = React.useMemo(() => {
    if (!entities) return { count: 0, speeds: [] as number[] };

    const wordEntities = Object.entries(entities).filter(([key, entity]) => 
      entity.type === 'word'
    ) as [string, WordEntity][];

    return {
      count: wordEntities.length,
      speeds: wordEntities.map(([_, entity]) => entity.speed)
    };
  }, [entities]);

  return (
    <View className="absolute top-[70px] left-[10px] bg-primary/10 p-1.5 rounded z-[1000]">
      <Text className="text-muted-foreground text-[10px]">
        Rotation: {rotation.toFixed(2)}°{'\n'}
        Words: {wordStats.count}{'\n'}
        Input: {input}
      </Text>
    </View>
  );
};
