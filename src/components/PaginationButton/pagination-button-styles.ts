import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary.white,
    justifyContent: 'center',
    height: 48,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 8
  }
});
