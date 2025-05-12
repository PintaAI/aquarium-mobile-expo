const KeyboardSystem = (entities: any) => {
  const player = entities.player;
  if (player) {
    const baseHeight = player.gameHeight - 135; // Base height from bottom
    const adjustedHeight = baseHeight - player.keyboardHeight; // Adjust for keyboard
    player.position.y = adjustedHeight;
  }
  return entities;
};

export default KeyboardSystem;
