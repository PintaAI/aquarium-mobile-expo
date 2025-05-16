import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Play, X, ChevronRight, ArrowLeft } from 'lucide-react-native';
import { iconWithClassName } from '../../lib/icons/iconWithClassName';
import { wordList, getRandomWords, Word } from './constants';
import { GameRoute } from '../../lib/game';
import { Button } from '../ui/button';

[Play, X, ChevronRight, ArrowLeft].forEach(iconWithClassName);

interface StartScreenProps {
  game: GameRoute;
  onStartGame: (level: number, words: Word[]) => void;
}

export const StartScreen = ({ game, onStartGame }: StartScreenProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const router = useRouter();

  const handlePlay = () => {
    const availableWords = wordList.filter(word => {
      if (selectedLevel <= 2) return word.word.length <= 1;
      if (selectedLevel <= 4) return word.word.length <= 2;
      return true;
    });
    const randomWords = getRandomWords(selectedLevel, availableWords.length);
    onStartGame(selectedLevel, randomWords);
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
                <View className="w-full flex gap-y-4 max-w-[200px]">
                  <Button 
                    className="w-full flex-row items-center gap-x-2" 
                    onPress={() => setShowOptions(true)}
                  >
                    <Play size={18} className="text-primary-foreground" />
                    <Text className="text-primary-foreground font-medium">Play</Text>
                  </Button>
                  <Button 
                    variant="secondary"
                    className="w-full flex-row items-center gap-x-2"
                    onPress={() => router.push('/')}
                  >
                    <X size={18} className="text-primary" />
                    <Text className="text-primary font-medium">Exit</Text>
                  </Button>
                </View>
              ) : (
                <View className="w-full flex gap-y-4">
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
                    <Text className="text-xs text-primary text-center">
                      {getWordLengthDesc(selectedLevel)}
                    </Text>
                  </View>

                  <View className="w-full items-center">
                    <View className="w-full max-w-[200px]">
                      <Button 
                        className="w-full flex-row items-center gap-x-2" 
                        onPress={handlePlay}
                      >
                        <ChevronRight size={18} className="text-primary-foreground" />
                        <Text className="text-primary-foreground font-medium">Start</Text>
                      </Button>
                      <Button 
                        variant="secondary" 
                        className="w-full mt-4 flex-row items-center gap-x-2"
                        onPress={() => setShowOptions(false)}
                      >
                        <ArrowLeft size={18} className="text-primary" />
                        <Text className="text-primary font-medium">Back</Text>
                      </Button>
                    </View>
                  </View>
                </View>
              )}
          </View>
        </View>
      </BlurView>
    </SafeAreaView>
  );
};

function getWordCount(level: number): number {
  // Get all possible words for this level using the same filter as getRandomWords
  const words = wordList.filter(word => {
    if (level <= 2) return word.word.length <= 1;
    if (level <= 4) return word.word.length <= 2;
    return true;
  });
  return words.length;
}

function getWordLengthDesc(level: number): string {
  if (level <= 2) return 'Easiest words';
  if (level <= 4) return 'Easy to medium words';
  return 'All difficulties';
}
