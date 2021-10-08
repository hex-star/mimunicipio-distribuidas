import { configureFonts, DefaultTheme } from 'react-native-paper';
import fontConfig from './Fonts';

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  roundness: 30,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4169E1',
    secondary: '#f1c40f',
    accent: '#f1c40f',
    favorite: '#BADA55',
    cancelButton: '#a4c639',
    iconColor: '#808080',
  },
};

export default theme;
