import React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { useGameStore } from '../store/gameStore';

export interface WordProps {
  id: string;
  word: string;
  meaning: string;
  position: { x: number; y: number };
}

export const WordRenderer: React.FC<WordProps> = ({ id, word, meaning, position }) => {
  const { targetedWordId, targetedMatchLength } = useGameStore();
  const isTargeted = id === targetedWordId;
  
  const getMatchedText = () => {
    if (!isTargeted || targetedMatchLength === 0) return meaning;
    
    const matched = meaning.slice(0, targetedMatchLength);
    const remaining = meaning.slice(targetedMatchLength);
    
    return (
      <>
        <Text className="text-primary">{matched}</Text>
        <Text className="text-muted-foreground">{remaining}</Text>
      </>
    );
  };

  return (
    <View 
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
      }}
      className={`p-2 rounded-lg ${isTargeted ? 'bg-primary/10' : ''}`}
    >
      <Text className="text-xl text-center text-foreground">{word}</Text>
      <Text className="text-sm text-center">
        {getMatchedText()}
      </Text>
    </View>
  );
};
