import React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';

export interface PlayerProps {
  position: { x: number; y: number };
}

export const PlayerRenderer: React.FC<PlayerProps> = ({ position }) => {
  return (
    <View style={{
      position: 'absolute',
      left: position.x,
      top: position.y,
      transform: [{ translateX: -10 }], // Center the player
    }}>
      <Text className="text-2xl text-primary">▲</Text>
    </View>
  );
};
