import { create } from 'zustand';

interface GameState {
  score: number;
  level: number;
  input: string;
  running: boolean;
  streak: number;
  gameOver: boolean;
  playerY: number; // Dynamic based on keyboard
  showStartScreen: boolean;
  focusedWordPosition: Position | null;
  playerRotation: number;
  isShooting: boolean; // Track shooting state
}

interface Position {
  x: number;
  y: number;
}

interface GameActions {
  setInput: (input: string) => void;
  resetInput: () => void;
  addScore: (points: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void; // Added for completeness
  setLevel: (level: number) => void;
  setPlayerY: (y: number) => void;
  setGameOver: (isGameOver: boolean) => void;
  resetGame: () => void; // Placeholder for full reset logic
  setRunning: (isRunning: boolean) => void; // Added for completeness
  setFocusedWordPosition: (position: Position | null) => void;
  setPlayerRotation: (rotation: number) => void;
  triggerShot: () => void; // Trigger shooting effect
}

export const useGameStore = create<GameState & GameActions>((set) => ({
  // Initial State
  score: 0,
  level: 1,
  input: '',
  running: false, // Game usually starts paused or on a start screen
  streak: 0,
  gameOver: false,
  playerY: 0, // Will be updated by useKeyboard hook
  showStartScreen: true,
  focusedWordPosition: null,
  playerRotation: 0,
  isShooting: false,

  // Actions
  setInput: (input) => set({ input }),
  resetInput: () => set({ input: '' }),
  addScore: (points) =>
    set((state) => {
      const newScore = state.score + points;
      let newLevel = state.level;
      // Assuming 'points' represents one correct word, or score directly tracks correct words.
      // Level increases every 10 points (i.e., 10 correct words if 1 point per word).
      if (newScore > 0 && newScore % 10 === 0 && newScore / 10 > state.level -1 ) { // ensure level only increases
        newLevel = state.level + 1;
      }
      return { score: newScore, level: newLevel };
    }),
  incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
  resetStreak: () => set({ streak: 0 }),
  setLevel: (level) => set({ level }),
  setPlayerY: (y) => set({ playerY: y }),
  setGameOver: (isGameOver) => set({ 
    gameOver: isGameOver, 
    running: !isGameOver && false
  }),
  resetGame: () =>
    set((state) => ({
      score: 0,
      input: '',
      running: false,
      streak: 0,
      gameOver: false,
      // Keep the current level
      level: state.level,
      // playerY will be set by keyboard hook, so no need to reset here explicitly unless desired
      showStartScreen: true,
      focusedWordPosition: null,
      playerRotation: 0,
    })),
  setRunning: (isRunning) => set({ 
    running: isRunning,
    showStartScreen: isRunning ? false : true
  }),
  setFocusedWordPosition: (position: Position | null) => set({ focusedWordPosition: position }),
  setPlayerRotation: (rotation: number) => set({ playerRotation: rotation }),
  triggerShot: () => {
    set({ isShooting: true });
    setTimeout(() => set({ isShooting: false }), 100); // Reset after 100ms
  },
}));

// Selector for convenience (optional, but good practice)
export const selectPlayerY = (state: GameState) => state.playerY;
export const selectSetPlayerY = (state: GameActions) => state.setPlayerY;
