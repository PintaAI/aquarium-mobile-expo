import React from 'react';
import { Text, View } from 'react-native';
import { Position } from '../types';
import { useGameStore } from '../store';

interface PlayerProps {
  position: Position;
}

export const PlayerRenderer: React.FC<PlayerProps> = ({ position }) => {
  const rotation = useGameStore((state) => state.playerRotation);
  
  return (
    <View
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [
          { rotate: `${rotation}deg` }
        ]
      }}
    >
      <Text 
        style={{
          fontSize: 24,
          color: '#4CAF50',
        }}
      >
        ⧊
      </Text>
    </View>
  );
};
