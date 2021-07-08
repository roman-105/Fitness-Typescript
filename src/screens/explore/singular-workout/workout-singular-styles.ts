import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const styles: any = StyleSheet.create({
  container: {
    height: '100%'
  },
  titleContainer: {
    marginLeft: theme.margins.external,
    marginTop: 16
  },
  subtitle: {
    marginLeft: theme.margins.external,
    marginRight: theme.margins.external,
    marginTop: 16
  },
  smallText: {
    color: theme.colors.primary.asphaltGrey,
    opacity: 0.56,
    marginTop: 8,
    marginLeft: theme.margins.external
  },
  tagContainer: {
    marginHorizontal: theme.margins.external,
    marginTop: 12,
    marginBottom: 8,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1
  }
});

export default styles;
