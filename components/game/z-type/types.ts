import React from 'react';
import { Word } from './constants';
import { GameEngine as RNGameEngine } from 'react-native-game-engine';

export interface GameEngine extends RNGameEngine {
  swap?: (entities: GameEntities) => void;
}


export interface Position {
  x: number;
  y: number;
}

export interface WordEntity {
  type: 'word';
  wordData: Word;
  position: Position;
  speed: number;
  focused: boolean;
  renderer: ({ position, wordData, focused }: { 
    position: Position;
    wordData: Word;
    focused: boolean;
  }) => React.JSX.Element;
}

export interface PlayerEntity {
  type: 'player';
  position: Position;
  renderer: ({ position }: { position: Position }) => React.JSX.Element;
}

export type GameEntity = WordEntity | PlayerEntity;

export type GameEntities = {
  [key: string]: GameEntity;
};
