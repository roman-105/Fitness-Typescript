import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const styles: any = StyleSheet.create({
  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary.white,
    paddingHorizontal: theme.margins.external
  },
  headerContent: {
    marginLeft: theme.margins.gutters,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  skipButton: {
    opacity: 0.8
  }
});

export default styles;
