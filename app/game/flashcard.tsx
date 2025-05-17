import * as React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import FlipCard from '~/components/game/FlipCard';
import { useState } from 'react';

export default function FlashcardGame() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <View className='flex-1 justify-center items-center p-6 bg-background'>
      <Text className='text-xl font-bold mb-6'>Flashcard Game</Text>
      
      <FlipCard
        isFlipped={isFlipped}
        onFlip={handleFlip}
        frontContent={
          <View className="bg-primary rounded-xl p-6 justify-center items-center">
            <Text className="text-2xl font-bold text-primary-foreground">Question</Text>
            <Text className="text-lg text-primary-foreground mt-2">What is React Native?</Text>
            <Text className="text-sm text-primary-foreground/70 mt-4">Tap to flip</Text>
          </View>
        }
        backContent={
          <View className="bg-secondary rounded-xl p-6 justify-center items-center">
            <Text className="text-2xl font-bold text-secondary-foreground">Answer</Text>
            <Text className="text-lg text-secondary-foreground mt-2 text-center">
              A framework for building native apps using React
            </Text>
            <Text className="text-sm text-secondary-foreground/70 mt-4">Tap to flip back</Text>
          </View>
        }
        containerStyle={{ width: 320, height: 220 }}
        frontStyle={{ width: '100%', height: '100%' }}
        backStyle={{ width: '100%', height: '100%' }}
      />
      
      <View className="mt-8">
        <Text className='text-muted-foreground text-center'>
          This is a basic example of a flashcard component.{'\n'}
          You can tap the card to flip it.
        </Text>
      </View>
    </View>
  );
}
