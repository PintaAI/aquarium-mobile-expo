import React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';

export interface WordProps {
  word: string;
  meaning: string;
  position: { x: number; y: number };
}

export const WordRenderer: React.FC<WordProps> = ({ word, meaning, position }) => {
  return (
    <View style={{
      position: 'absolute',
      left: position.x,
      top: position.y,
    }}>
        <Text className="text-xl text-center text-foreground">{word}</Text>
        <Text className="text-sm text-center text-muted-foreground">{meaning}</Text>
    </View>
  );
};
