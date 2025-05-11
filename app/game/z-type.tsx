import * as React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';

export default function ZTypeGame() {
  return (
    <View className='flex-1 justify-center items-center p-6 bg-background'>
      <Text className='text-xl font-bold'>Z-Type Game</Text>
      <Text className='mt-2 text-muted-foreground'>Coming soon...</Text>
    </View>
  );
}
