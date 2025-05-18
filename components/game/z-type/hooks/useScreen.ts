import { Dimensions } from 'react-native';

export const useScreen = () => {
  const SCREEN = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    playerAreaHeight: 60, // Height of player entity + margin
    wordPadding: 100, // Padding for word placement
  };

  return SCREEN;
};
