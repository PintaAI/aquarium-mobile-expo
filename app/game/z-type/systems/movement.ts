import { WordEntity } from "../entities/word";
import { GAME_CONSTANTS } from "../utils/constants";

const COLLISION_DISTANCE = 30; // Adjust this value based on visual testing

const MovementSystem = (entities: any, { dispatch }: { dispatch: any }) => {
  const player = entities.player;
  
  // Move each word towards the player
  Object.keys(entities).forEach(key => {
    if (key.startsWith('word')) {
      const word = entities[key] as WordEntity;
      
      // Initialize speed if not set
      if (!word.speed) {
        const level = 4; // This will be replaced with actual level later
        const baseSpeed = GAME_CONSTANTS.SPEED.BASE * (1 + (level - 1) * GAME_CONSTANTS.SPEED.LEVEL_MULTIPLIER);
        word.speed = baseSpeed + (Math.random() * GAME_CONSTANTS.SPEED.VARIATION);
      }
      
      // Calculate direction vector
      const dx = player.position.x - word.position.x;
      const dy = player.position.y - word.position.y;
      
      // Normalize the vector
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 0) {
        // Move word towards player with its unique speed
        word.position.x += (dx / distance) * word.speed;
        word.position.y += (dy / distance) * word.speed;
        
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
