import type { LucideIcon } from 'lucide-react-native';
import { iconWithClassName } from './iconWithClassName';

export function withGameIcon(icon: LucideIcon) {
  iconWithClassName(icon);
  return icon;
}
