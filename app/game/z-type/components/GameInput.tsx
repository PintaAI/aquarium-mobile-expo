import React, { useState, useEffect } from 'react';
import { TextInput, View } from 'react-native';
import { useGameStore } from '../store/gameStore';

export function GameInput() {
  const [input, setInput] = useState('');
  const { words, removeWord, setTargetedWord } = useGameStore();

  const checkMatches = (text: string) => {
    const typedWord = text.trim().toLowerCase();
    let bestMatch = { id: '', matchLength: 0 };
    
    // Find the best partial match
    for (const [id, entity] of Object.entries(words)) {
      const meaning = entity.meaning.toLowerCase();
      if (meaning === typedWord) {
        removeWord(id);
        setInput('');
        setTargetedWord('', 0);
        return;
      }
      
      // Check for partial match
      let matchLength = 0;
      while (matchLength < typedWord.length && matchLength < meaning.length 
             && meaning[matchLength] === typedWord[matchLength]) {
        matchLength++;
      }
      
      if (matchLength > bestMatch.matchLength) {
        bestMatch = { id, matchLength };
      }
    }
    
    // Update targeted word with best partial match
    setTargetedWord(bestMatch.id, bestMatch.matchLength);
  };

  const handleChangeText = (text: string) => {
    setInput(text);
    if (text.trim() === '') {
      setTargetedWord('', 0);
    } else {
      checkMatches(text);
    }
  };

  return (
    <View className='px-2'>
      <TextInput 
        className="w-full h-10 px-2 text-center text-primary rounded-lg bg-card border border-input"
        placeholder="Type here..."
        placeholderTextColor="#666"
        autoCorrect={false}
        autoCapitalize="none"
        value={input}
        onChangeText={handleChangeText}
      />
    </View>
  );
}
