import React from 'react';
import { View, Text } from 'react-native';
import { Word } from '../../constants';
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
          ...(focused && {
            shadowColor: '#22c55e',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 8,
            elevation: 5
          })
        }
      ]}
      className={`px-3 py-1.5 ${focused 
        ? 'bg-green-500/20 rounded-lg'
        : 'bg-white/5 rounded-lg'}`}
    >
      <Text className="text-sm text-center text-primary font-bold mb-0.5">
        {wordData.word}
      </Text>
      {focused && (
        <Text className="text-xs text-center text-muted-foreground">
          {meaning.split('').map((char, index) => {
            const isTyped = index < input.length;
            const charMatches = isTyped && input[index].toLowerCase() === char.toLowerCase();
            
            return (
              <Text
                key={index}
                className={isTyped && isMatching && charMatches ? 'text-primary font-bold' : ''}
              >
                {char}
              </Text>
            );
          })}
        </Text>
      )}
    </View>
  );
};
