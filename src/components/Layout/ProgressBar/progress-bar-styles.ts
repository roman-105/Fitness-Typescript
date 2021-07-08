import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const styles: any = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.ui.logan,
    paddingTop: 0,
    height: 2,
    borderRadius: theme.borderRadius,
    marginBottom: 20
  },
  progress: {
    backgroundColor: theme.colors.primary.orange,
    height: '100%',
    borderRadius: theme.borderRadius
  }
});

export default styles;
