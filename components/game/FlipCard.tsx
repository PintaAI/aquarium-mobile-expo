import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';

interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  isFlipped?: boolean;
  onFlip?: () => void;
  frontStyle?: ViewStyle;
  backStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  flipDuration?: number;
}

export const FlipCard = ({
  frontContent,
  backContent,
  isFlipped = false,
  onFlip,
  frontStyle = {},
  backStyle = {},
  containerStyle = {},
  flipDuration = 500,
}: FlipCardProps) => {
  // Animation progress value
  const flipProgress = useSharedValue(isFlipped ? 1 : 0);
  
  // Update animation when isFlipped prop changes
  useEffect(() => {
    flipProgress.value = withTiming(
      isFlipped ? 1 : 0, 
      { 
        duration: flipDuration,
        easing: Easing.inOut(Easing.ease),
      }
    );
  }, [isFlipped, flipDuration]);
  
  // Create animated styles for front and back sides
  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      flipProgress.value,
      [0, 1],
      [0, 180]
    );
    
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateValue}deg` },
      ],
      opacity: flipProgress.value >= 0.5 ? 0 : 1,
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    };
  });
  
  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      flipProgress.value,
      [0, 1],
      [180, 360]
    );
    
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateValue}deg` },
      ],
      opacity: flipProgress.value >= 0.5 ? 1 : 0,
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    };
  });
  
  const handleFlip = () => {
    if (onFlip) {
      onFlip();
    }
  };
  
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.container, containerStyle]}
      onPress={handleFlip}
    >
      <Animated.View style={[frontAnimatedStyle, frontStyle]}>
        {frontContent}
      </Animated.View>
      
      <Animated.View style={[backAnimatedStyle, backStyle]}>
        {backContent}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 200,
    position: 'relative',
  },
});

export default FlipCard;