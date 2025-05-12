import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { useGameStore } from '../store/gameStore';

export function GameInput() {
  const [input, setInput] = useState('');
  const { words, removeWord } = useGameStore();

  const checkMatches = (text: string) => {
    const typedWord = text.trim().toLowerCase();
    
 
    
    for (const [id, entity] of Object.entries(words)) {
      
      if (entity.meaning.toLowerCase() === typedWord) {
        
        removeWord(id);
        setInput('');
        break;
      }
    }
  };

  const handleChangeText = (text: string) => {
    setInput(text);
    checkMatches(text);
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
