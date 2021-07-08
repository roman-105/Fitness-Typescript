import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles: any = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.secondary.powerPurple,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  disabled: {
    opacity: 0.5
  },
  wider: {
    padding: 16
  },
  white: {
    backgroundColor: theme.colors.primary.white
  },
  whiteText: {
    color: theme.colors.primary.asphaltGrey
  },
  text: {
    fontSize: 16,
    color: theme.colors.primary.white
  },
  withIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default styles;
