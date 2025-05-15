import React from 'react';
import { View, Text } from 'react-native';
import { Word } from '../constants';
import { useGameStore } from '../store';

type WordRendererProps = {
  wordData: Word;
  position: { x: number; y: number };
  focused: boolean;
};

export const WordRenderer: React.FC<WordRendererProps> = ({ wordData, position, focused }) => {
  const input = useGameStore((state) => state.input);
  const meaning = wordData.meaning.toLowerCase();
  
  // Split meaning into typed and untyped parts
  const typedPart = meaning.slice(0, input.length);
  const untypedPart = meaning.slice(input.length);
  
  // Check if current input matches the word's meaning so far
  const isMatching = meaning.startsWith(input.toLowerCase());
  
  return (
    <View
      style={[
        {
          position: 'absolute',
          transform: [
            { translateX: position.x },
            { translateY: position.y }
          ],
        }
      ]}
      className={`px-3 py-1 ${focused 
        ? 'bg-primary/20 border border-primary rounded-lg'
        : 'bg-white/10 border border-transparent rounded-lg'}`}
    >
      <Text className="text-sm text-center text-primary font-bold">{wordData.word}</Text>
      <Text className="text-xs text-center">
        {meaning.split('').map((char, index) => {
          const isTyped = index < input.length;
          const charMatches = isTyped && input[index].toLowerCase() === char.toLowerCase();
          
          return (
            <Text
              key={index}
              className={`${
                isTyped && isMatching && charMatches
                  ? 'text-green-500 text-center font-bold'
                  : 'text-muted-foreground text-center'
              }`}
            >
              {char}
            </Text>
          );
        })}
      </Text>
    </View>
  );
};
