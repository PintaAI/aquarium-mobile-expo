import { Gamepad2, Brain } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { withGameIcon } from './icons/GameIcon';

export interface GameRoute {
  name: string;
  route: string;
  icon: LucideIcon;
}

export const games: GameRoute[] = [
  {
    name: 'Z-type',
    route: '/game/z-type',
    icon: withGameIcon(Gamepad2),
  },
  {
    name: 'Flashcard',
    route: '/game/flashcard',
    icon: withGameIcon(Brain),
  },
];
