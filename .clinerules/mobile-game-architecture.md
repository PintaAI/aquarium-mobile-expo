## Brief overview
These guidelines outline the architectural and development preferences for mobile game development using React Native/Expo with TypeScript, particularly focusing on modular game architecture and component organization.

## Project structure
- Group features by domain in dedicated subdirectories (e.g., app/game/z-type)
- Organize game code into distinct categories:
  - entities/ - Core game objects and their properties
  - systems/ - Game logic and behavior handlers
  - components/ - React components for rendering
  - hooks/ - Custom React hooks for shared functionality
  - store/ - Game state management
  - utils/ - Constants and helper functions

## Development workflow
- Use TypeScript for type safety and better development experience
- Follow a modular ECS-like architecture for game development
- Leverage React hooks for managing component-level state and effects
- Implement game state management using dedicated stores

## Coding style
- Use functional components with TypeScript
- Apply NativeWind/Tailwind for styling React Native components
- Keep business logic separate from rendering logic via systems/entities pattern
- Implement responsive layouts accounting for mobile-specific concerns (keyboard height, screen dimensions)

## Technical preferences
- React Native with Expo for cross-platform mobile development
- TypeScript for enhanced type safety
- NativeWind for styling
- Custom hooks for reusable logic
- Clear separation between game logic and UI components

## Testing strategy
- Isolate game logic in systems and entities for easier testing
- Create separate renderers for game objects to maintain rendering flexibility
