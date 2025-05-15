import React from 'react';
import { Text } from 'react-native';
import { Position } from '../types';

interface PlayerProps {
  position: Position;
}

export const PlayerRenderer: React.FC<PlayerProps> = ({ position }) => {
  return (
    <Text 
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        fontSize: 24,
        color: '#4CAF50'
      }}
    >
      ⧊
    </Text>
  );
};
