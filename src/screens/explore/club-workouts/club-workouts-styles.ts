import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const styles: any = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1
  },
  orangeCarousel: {
    height: 322,
    backgroundColor: theme.colors.primary.orange,
    paddingLeft: 16
  },
  newLabel: {
    marginLeft: 8,
    marginTop: 16
  },
  title: {
    marginHorizontal: theme.margins.external,
    marginVertical: 16
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleContainer: {
    paddingTop: 20,
    paddingRight: theme.margins.external,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  sectionContainer: {
    marginLeft: theme.margins.external
  },
  text: {
    color: theme.colors.primary.asphaltGrey,
    opacity: 0.56
  },
  buttonContainer: {
    justifyContent: 'center',
    width: '100%',
    padding: theme.margins.external
  },
  button: {
    shadowColor: theme.colors.shadow,
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 1,
    elevation: 2
  }
});

export default styles;
