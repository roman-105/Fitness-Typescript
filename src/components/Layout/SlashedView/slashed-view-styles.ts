import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const styles: any = StyleSheet.create({
  triangleStart: {
    borderStyle: 'solid',
    borderBottomWidth: 25,
    borderBottomColor: theme.colors.ui.background,
    borderLeftWidth: 400,
    borderLeftColor: 'transparent',
    top: 1
  },
  triangleEnd: {
    borderStyle: 'solid',
    borderBottomWidth: 25,
    borderBottomColor: 'transparent',
    borderLeftWidth: 400,
    borderLeftColor: theme.colors.ui.background
  }
});

export default styles;
