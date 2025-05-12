// app/game/z-type/systems/gameLogic.ts
import { GameEngineUpdateEventOptionType } from 'react-native-game-engine';
import { useGameStore } from '../store/gameStore';
import { GAME_CONSTANTS } from '../utils/constants';

let spawnTimer = 0;

const GameLogicSystem = (entities: any, { time, dispatch, screen }: GameEngineUpdateEventOptionType) => {
  const {
    addWord,
    incrementLevel,
    updateSpawnInterval,
    currentLevel,
    wordsCleared,
    spawnInterval,
    isGameOver,
  } = useGameStore.getState();

  if (isGameOver) {
    return entities;
  }

  // --- Word Spawning ---
  spawnTimer += time.delta;
  if (spawnTimer >= spawnInterval) {
    spawnTimer = 0; // Reset timer

    // Spawn a new word at a random x position near the top
    // Ensure screen dimensions are available
    const screenWidth = screen?.width ?? 300; // Provide a default or handle missing screen object
    const x = Math.random() * (screenWidth - 50) + 25; // Avoid edges
    const y = -50; // Start above screen
    addWord(x, y);
  }

  // --- Level Progression ---
  // Check if level needs to be incremented
  // Note: This check might be better placed right after a word is cleared,
  // potentially triggered by an event from KeyboardSystem or by observing wordsCleared directly.
  // For simplicity now, we check based on wordsCleared count.

  // Calculate the number of words required to *reach* the *next* level.
  const wordsNeededForNextLevel = currentLevel * GAME_CONSTANTS.LEVEL.WORDS_PER_LEVEL;

  // Check if the player has cleared enough words to potentially level up.
  if (wordsCleared >= wordsNeededForNextLevel) {
     // Calculate the number of words required to *reach* the *current* level.
     // This helps ensure we only level up once per threshold crossing.
     const wordsNeededForCurrentLevel = (currentLevel - 1) * GAME_CONSTANTS.LEVEL.WORDS_PER_LEVEL;

     // Only increment level if the words cleared count is beyond the requirement for the *current* level.
     // This prevents incrementing multiple levels if wordsCleared jumps significantly.
     if (wordsCleared > wordsNeededForCurrentLevel) {
        console.log(`Level Up! Reached level ${currentLevel + 1}`);
        incrementLevel();
        updateSpawnInterval(); // Decrease spawn interval for next level
     }
  }


  return entities;
};

export default GameLogicSystem;
