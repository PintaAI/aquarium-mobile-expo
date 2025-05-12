import { WordEntity } from "../entities/word";
import { GAME_CONSTANTS } from "../utils/constants";
import { useGameStore } from "../store/gameStore"; // Import the store

const COLLISION_DISTANCE = 30; // Adjust this value based on visual testing

const MovementSystem = (entities: any, { dispatch }: { dispatch: any }) => {
  const player = entities.player;
  const { currentLevel } = useGameStore.getState(); // Get current level from store

  // Calculate base speed for the current level
  const currentBaseSpeed = GAME_CONSTANTS.SPEED.BASE * (1 + (currentLevel - 1) * GAME_CONSTANTS.SPEED.LEVEL_MULTIPLIER);

  // Move each word towards the player
  Object.keys(entities).forEach(key => {
    if (key.startsWith('word')) {
      const word = entities[key] as WordEntity;

      // Calculate the specific speed for this word based on current level and its variation
      const currentWordSpeed = currentBaseSpeed + word.speedVariation;

      // Calculate direction vector
      const dx = player.position.x - word.position.x;
      const dy = player.position.y - word.position.y;
      
      // Normalize the vector
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 0) {
        // Move word towards player with its calculated dynamic speed
        word.position.x += (dx / distance) * currentWordSpeed;
        word.position.y += (dy / distance) * currentWordSpeed;
        
        // Check for collision with player
        if (distance < COLLISION_DISTANCE) {
          dispatch({ type: 'game-over' });
        }
      }
    }
  });

  return entities;
};

export default MovementSystem;
