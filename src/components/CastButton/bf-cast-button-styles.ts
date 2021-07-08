import { StyleSheet } from 'react-native';
import theme from '../../theme';

const CAST_BUTTON_SIZE = 48;

const styles: any = StyleSheet.create({
  castButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: CAST_BUTTON_SIZE,
    width: CAST_BUTTON_SIZE,
    borderRadius: 50,
    backgroundColor: theme.colors.primary.white
  },
  castButton: {
    height: CAST_BUTTON_SIZE,
    width: CAST_BUTTON_SIZE
  }
});

export default styles;
