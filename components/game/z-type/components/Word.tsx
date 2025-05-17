import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Word } from '../../constants';
import { useGameStore } from '../store';
import Animated, { 
  useAnimatedStyle,  
  withSequence, withTiming, 
  useSharedValue, interpolate, Easing 
} from 'react-native-reanimated';

type WordRendererProps = {
  wordData: Word;
  position: { x: number; y: number };
  focused: boolean;
};

export const WordRenderer: React.FC<WordRendererProps> = ({ wordData, position, focused }) => {
  const scale = useSharedValue(0);
  const glow = useSharedValue(0);
  const input = useGameStore((state) => state.input);
  const meaning = wordData.meaning.toLowerCase();
  const isMatching = meaning.startsWith(input.toLowerCase());
  
  useEffect(() => {
    scale.value = withTiming(1, {
      duration: 200,
      easing: Easing.bezier(0.4, 0, 0.2, 1)
    });
  }, []);

  useEffect(() => {
    if (focused && isMatching) {
      glow.value = withSequence(
        withTiming(1, { duration: 200, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
        withTiming(0, { duration: 400, easing: Easing.bezier(0.4, 0, 0.2, 1) })
      );
    }
  }, [focused, input]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: position.x },
      { translateY: position.y }
    ],
    shadowOpacity: focused ? interpolate(glow.value, [0, 1], [0.5, 1]) : 0,
    borderWidth: focused ? interpolate(glow.value, [0, 1], [1, 2]) : 0,
    borderColor: focused ? `rgba(74, 222, 128, ${interpolate(glow.value, [0, 1], [0.3, 0.8])})` : 'transparent',
  }));

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: 'absolute',
          shadowColor: '#4ade80',
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 15,
          elevation: focused ? 24 : 0,
          backgroundColor: focused ? 'rgba(74, 222, 128, 0.1)' : 'transparent'
        }
      ]}
      className="px-3 py-1.5 bg-transparent rounded-lg"
    >
      <Text className="text-sm text-center text-primary font-bold">
        {wordData.word}
      </Text>
      {focused && (
        <Text className="text-xs text-center text-muted-foreground">
          {meaning.split('').map((char, index) => {
            const isCharMatching = index < input.length && 
              input[index].toLowerCase() === char.toLowerCase() && 
              isMatching;
            
            return (
              <Text
                key={index}
                className={isCharMatching ? 'text-primary font-bold' : ''}
              >
                {char}
              </Text>
            );
          })}
        </Text>
      )}
    </Animated.View>
  );
};
