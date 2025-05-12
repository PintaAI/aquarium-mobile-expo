import * as React from 'react';
import { TextInput, View } from 'react-native';

export function GameInput() {
  return (
    <View className='px-2'>
      <TextInput 
        className="w-full h-10 px-2 text-center text-primary rounded-lg bg-card border border-input"
        placeholder="Type here..."
        placeholderTextColor="#666"
        autoCorrect={false}
        autoCapitalize="none"
      />
    </View>
  );
}
