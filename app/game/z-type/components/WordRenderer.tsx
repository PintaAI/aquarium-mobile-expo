import React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';

export interface WordProps {
  word: string;
  meaning: string;
  position: { x: number; y: number };
}

export const WordRenderer: React.FC<WordProps> = ({ word, position }) => {
  return (
    <View style={{
      position: 'absolute',
      left: position.x,
      top: position.y,
    }}>
      <Text className="text-xl text-foreground">{word}</Text>
    </View>
  );
};
