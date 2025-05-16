import { GameEntities, GameEntity, Position, WordEntity } from './types';
import { useGameStore } from './store';
import { Dimensions } from 'react-native';
import { GAME_CONSTANTS } from '../constants'; // Import GAME_CONSTANTS

const { width } = Dimensions.get('window');

// Check if a word matches the current input
const checkWordMatch = (meaning: string, input: string) => {
  return meaning.toLowerCase() === input.toLowerCase();
};

// Generate new random position above screen
const getNewPosition = () => {
  return {
    x: Math.random() * (width - 100), // Keep word within screen width
    y: -100 - (Math.random() * 300) // Random position above screen
  };
};

// Calculate direction from word to player
const calculateDirection = (from: Position, to: Position) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return {
    x: dx / distance,
    y: dy / distance
  };
};

export const MovementSystem = (entities: GameEntities, { time }: { time: { delta: number } }) => {
  const { gameOver, setGameOver } = useGameStore.getState();

  // If game is over, don't process movement
  if (gameOver) {
    return entities;
  }

  const updatedEntities = { ...entities };
  const playerPos = {
    x: entities.player.position.x,
    y: useGameStore.getState().playerY // Use playerY from store
  };
  const delta = time.delta || 0.016;
  
  // Get current input from store
  const input = useGameStore.getState().input;
  const { setInput, addScore, level: currentLevel } = useGameStore.getState(); // Get addScore and level
  
  // First pass: find any word that matches input for focusing
  let foundMatch = false;
  const { setFocusedWordPosition, setPlayerRotation } = useGameStore.getState();

  Object.keys(updatedEntities).forEach((key) => {
    const entity = updatedEntities[key];
    if (entity.type === 'word') {
      const wordStartsWithInput = entity.wordData.meaning.toLowerCase().startsWith(input.toLowerCase());
      const shouldFocus = input !== '' && wordStartsWithInput && !foundMatch;
      
      if (shouldFocus) {
        foundMatch = true;
        // Calculate angle between player and word
        const dx = entity.position.x - playerPos.x;
        const dy = entity.position.y - playerPos.y;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90; // Subtract 90 degrees to make player point up by default
        setPlayerRotation(angle);
        setFocusedWordPosition(entity.position);
      }
      
      // Update focused state
      if (entity.focused !== shouldFocus) {
        updatedEntities[key] = {
          ...entity,
          focused: shouldFocus
        };
      }
    }
  });

  // Reset focused position if no word is focused
  if (!foundMatch) {
    setFocusedWordPosition(null);
    setPlayerRotation(0);
  }

  // Second pass: handle movement and matching
  Object.keys(updatedEntities).forEach((key) => {
    const entity = updatedEntities[key];
    if (entity.type === 'word') {
      // Check if word matches input exactly
      if (input && checkWordMatch(entity.wordData.meaning, input)) {
        addScore(1); // Add 1 point to score, potentially increasing level
        
        // Recalculate speed based on the potentially updated level
        const latestLevel = useGameStore.getState().level; // Get the most current level after addScore
        const baseSpeedForLevel = GAME_CONSTANTS.INITIAL_SPEED * (1 + (latestLevel - 1) * 0.2);
        const newSpeed = baseSpeedForLevel + (Math.random() * baseSpeedForLevel * 0.5);

        // Reset word position, speed and clear input
        updatedEntities[key] = {
          ...entity,
          position: getNewPosition(),
          speed: newSpeed, // Update speed
          focused: false
        };
        setInput(''); // Use resetInput from store if it's just clearing
        return; // Move to the next entity
      }
      
      // Move word towards player
      const direction = calculateDirection(entity.position, playerPos);
      const moveAmount = entity.speed * delta;
      const newPos = {
        x: entity.position.x + (direction.x * moveAmount),
        y: entity.position.y + (direction.y * moveAmount)
      };
      
      // Check for collision with player
      const collisionDistance = 50; // Adjust this value based on your game's needs
      const distanceToPlayer = Math.sqrt(
        Math.pow(newPos.x - playerPos.x, 2) + 
        Math.pow(newPos.y - playerPos.y, 2)
      );
      
      if (distanceToPlayer < collisionDistance) {
        setGameOver(true);
        return entities; // Stop processing on game over
      }
      
      // Update word position while preserving focus state
      if (updatedEntities[key].position !== newPos) {
        updatedEntities[key] = {
          ...entity,
          position: newPos
        };
      }
    }
  });
  
  return updatedEntities;
};
