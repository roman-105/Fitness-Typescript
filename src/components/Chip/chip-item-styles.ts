import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles: any = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: theme.colors.shadow,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1,
    borderRadius: 24
  },
  selected: {
    backgroundColor: theme.colors.primary.orange
  }
});

export default styles;
