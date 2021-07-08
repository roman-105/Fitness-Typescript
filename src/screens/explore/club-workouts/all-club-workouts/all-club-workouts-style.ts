import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../../../theme';

const styles: any = StyleSheet.create({
  container: {
    height: 96
  },
  titleContainer: {
    marginHorizontal: theme.margins.external,
    marginVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  text: {
    color: theme.colors.primary.asphaltGrey,
    opacity: 0.56,
    marginLeft: theme.margins.external,
    marginBottom: 16
  },
  emptyContent: {
    height: Dimensions.get('window').height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    paddingTop: 8,
    width: 200
  }
});

export default styles;
