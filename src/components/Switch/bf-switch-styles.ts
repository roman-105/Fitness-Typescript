import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles: any = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.secondary.powerPurple,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius
  },
  disabled: {
    opacity: 0.5
  },
  switch: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }]
  }
});

export default styles;
