import React from 'react';
import { View, Text } from 'react-native';
import { useGameStore } from '../store';
import { GameEntities, WordEntity } from '../types';

interface DevLogProps {
  entities?: GameEntities;
}

export const DevLog: React.FC<DevLogProps> = ({ entities }) => {
  const rotation = useGameStore((state) => state.playerRotation);
  const focusedWordPosition = useGameStore((state) => state.focusedWordPosition);
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
    <View 
      style={{
        position: 'absolute',
        top: 50,
        left: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        borderRadius: 5,
        zIndex: 1000,
      }}
    >
      <Text style={{ color: '#fff', fontSize: 12 }}>
        Rotation: {rotation.toFixed(2)}°{'\n'}
        Word Count: {wordStats.count}{'\n'}
        Word Speeds: {wordStats.speeds.map(s => s.toFixed(1)).join(', ')}{'\n'}
        Current Input: {input}{'\n'}
        Focused Word Position: {'\n'}
        X: {focusedWordPosition?.x.toFixed(2) || 'N/A'}{'\n'}
        Y: {focusedWordPosition?.y.toFixed(2) || 'N/A'}
      </Text>
    </View>
  );
};
