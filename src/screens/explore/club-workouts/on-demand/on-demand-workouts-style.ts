import { StyleSheet } from 'react-native';
import theme from '../../../../theme';

const styles: any = StyleSheet.create({
  container: {
    marginHorizontal: theme.margins.external,
    marginTop: 16
  },
  titleContainer: {
    marginHorizontal: theme.margins.external,
    marginVertical: 16,
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row'
  },
  text: {
    color: theme.colors.primary.asphaltGrey,
    opacity: 0.56,
    marginBottom: 16,
    marginTop: 16
  }
});

export default styles;
