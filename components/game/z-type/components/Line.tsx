import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useGameStore } from '../store';
import { Position } from '../types';

const ANIMATION_CONFIG = {
  IDLE_OPACITY: 0,
  SHOT_OPACITY: 1,
  HIDDEN_OPACITY: 0,
  FADE_DURATION: 100,
  SHOT_DURATION: 50,
} as const;

interface LineProps {
  startPosition: Position;
  endPosition: Position;
  opacity: Animated.Value;
}

const useLineAnimation = (hasInput: boolean, isShooting: boolean) => {
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: hasInput ? ANIMATION_CONFIG.IDLE_OPACITY : ANIMATION_CONFIG.HIDDEN_OPACITY,
      duration: ANIMATION_CONFIG.FADE_DURATION,
      useNativeDriver: true,
    }).start();
  }, [hasInput]);

  React.useEffect(() => {
    if (isShooting) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: ANIMATION_CONFIG.SHOT_OPACITY,
          duration: ANIMATION_CONFIG.SHOT_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: ANIMATION_CONFIG.IDLE_OPACITY,
          duration: ANIMATION_CONFIG.SHOT_DURATION,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isShooting]);

  return opacity;
};

const calculateLineProperties = (startPos: Position, endPos: Position) => {
  const dx = endPos.x + 12 - startPos.x;
  const dy = endPos.y + 32 - startPos.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return { length, angle };
};

const Line: React.FC<LineProps> = ({ startPosition, endPosition, opacity }) => {
  const { length, angle } = calculateLineProperties(startPosition, endPosition);

  return (
    <Animated.View
      style={[
        styles.line,
        {
          left: startPosition.x + 12,
          top: startPosition.y + 12,
          width: length,
          opacity,
          transform: [{ rotate: `${angle}deg` }],
        },
      ]}
    />
  );
};

interface LineRendererProps {
  player: Position;
}

export const LineRenderer: React.FC<LineRendererProps> = ({ player }) => {
  const { focusedWordPosition, isShooting, input } = useGameStore((state) => ({
    focusedWordPosition: state.focusedWordPosition,
    isShooting: state.isShooting,
    input: state.input,
  }));

  const opacity = useLineAnimation(input.length > 0, isShooting);

  if (!focusedWordPosition) return null;

  return (
    <Line
      startPosition={player}
      endPosition={focusedWordPosition}
      opacity={opacity}
    />
  );
};

const styles = StyleSheet.create({
  line: {
    position: 'absolute',
    height: 2,
    backgroundColor: 'rgb(76, 175, 80)',
    transformOrigin: '0 0',
  },
});
