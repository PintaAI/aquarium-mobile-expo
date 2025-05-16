import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { wordList } from './constants';
import { GameRoute } from '../../lib/game';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface StartScreenProps {
  game: GameRoute;
  onStartGame: (level: number) => void;
}

export const StartScreen = ({ game, onStartGame }: StartScreenProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const router = useRouter();

  const handlePlay = () => {
    onStartGame(selectedLevel);
  };

  const GameIcon = game.icon;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <BlurView intensity={20} className="flex-1 absolute inset-0">
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-full items-center">
              <View className="mb-8">
                <GameIcon size={96} className="text-primary mx-auto mb-6" />
                <Text className="text-2xl font-bold text-primary text-center">
                  {game.name}
                </Text>
              </View>

              {!showOptions ? (
                <View className="w-full space-y-4">
                  <Button className="w-full" onPress={() => setShowOptions(true)}>
                    <Text className="text-primary-foreground font-medium">Play</Text>
                  </Button>
                  <Button 
                    variant="secondary"
                    className="w-full"
                    onPress={() => router.push('/')}
                  >
                    <Text className="text-primary font-medium">Exit</Text>
                  </Button>
                </View>
              ) : (
                <View className="w-full space-y-4">
                  <View className="mb-6">
                    <Text className="text-xl text-primary text-center mb-4">
                      Select Level
                    </Text>
                    <View className="flex-row flex-wrap justify-center gap-3">
                      {[1, 2, 3, 4, 5].map(level => (
                        <Pressable
                          key={level}
                          onPress={() => setSelectedLevel(level)}
                          className={`w-14 h-14 rounded-2xl items-center justify-center ${
                            selectedLevel === level
                              ? 'bg-primary'
                              : 'bg-card border-2 border-border'
                          }`}
                        >
                          <Text
                            className={`text-lg ${
                              selectedLevel === level ? 'text-primary-foreground' : 'text-primary'
                            }`}
                          >
                            {level}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>

                  <View className="mb-6">
                    <Text className="text-sm text-primary mb-2 text-center">
                      Level {selectedLevel} Words ({getWordCount(selectedLevel)} words)
                    </Text>
                    <Text className="text-xs text-secondary text-center">
                      {getWordLengthDesc(selectedLevel)}
                    </Text>
                  </View>

                  <Button className="w-full" onPress={handlePlay}>
                    <Text className="text-primary-foreground font-medium">Start</Text>
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="w-full"
                    onPress={() => setShowOptions(false)}
                  >
                    <Text className="text-primary font-medium">Back</Text>
                  </Button>
                </View>
              )}
          </View>
        </View>
      </BlurView>
    </SafeAreaView>
  );
};

function getWordCount(level: number): number {
  if (level <= 2) return wordList.filter(word => word.word.length <= 1).length;
  if (level <= 4) return wordList.filter(word => word.word.length <= 2).length;
  return wordList.length;
}

function getWordLengthDesc(level: number): string {
  if (level <= 2) return 'Single character words';
  if (level <= 4) return 'Up to 2 characters';
  return 'All word lengths';
}
