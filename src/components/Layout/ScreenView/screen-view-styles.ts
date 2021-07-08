import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const styles: any = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary.white,
    paddingTop: 0,
    padding: theme.margins.external,
    flex: 1
  },
  scrollContainer: {
    flexGrow: 1
  },
  safeArea: {
    flex: 1
  },
  progressBar: {}
});

const stylesFullWidth: any = StyleSheet.create({
  container: {
    padding: 0
  },
  progressBar: {
    marginHorizontal: theme.margins.external
  }
});

export default styles;
export { stylesFullWidth };
