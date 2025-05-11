import * as React from 'react';
import { View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { games } from '~/lib/game';
import {
  Card,
  CardContent,
  CardDescription, 
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Text } from '~/components/ui/text';


export default function Screen() {
  

  return (
    <View className='flex-1 justify-center items-center gap-2 p-6 bg-secondary/30'>
      <Card className='w-full max-w-sm p-6 rounded-xl '>
        <CardHeader >
          <CardTitle className='font-semibold text-center'>Games</CardTitle>
        </CardHeader>
        <CardDescription className='flex flex-col items-center '>
          <Text className='text-center text-sm text-muted-foreground'>
            Choose your favorite game to play
          </Text>
        </CardDescription>
        <CardContent className='flex flex-row flex-wrap justify-center gap-4'>
          {games.map((game) => (
            <Pressable
              key={game.route}
              onPress={() => router.push(game.route as any)}
              className='flex flex-col items-center p-4 rounded-lg bg-card hover:bg-card/80 active:bg-card/60'
            >
              <View className='mb-2'>
                <game.icon size={24} className="text-foreground" />
              </View>
              <Text className='text-sm font-medium'>{game.name}</Text>
            </Pressable>
          ))}
        </CardContent>
      </Card>
    </View>
  );
}
