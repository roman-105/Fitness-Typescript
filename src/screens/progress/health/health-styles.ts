import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const styles: any = StyleSheet.create({
  container: {
    marginHorizontal: theme.margins.external
  },
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.primary.white,
    marginVertical: 32,
    padding: 20,
    borderRadius: 2,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 1,
    shadowOffset: { width: 2, height: 2 },
    elevation: 2
  },
  app: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default styles;
