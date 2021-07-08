import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const styles: any = StyleSheet.create({
  filterTitle: {
    marginVertical: 8
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  filterItemContainer: {
    height: 32,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: theme.colors.primary.jerseyGrey
  },
  filterItemContainerSelected: {
    backgroundColor: theme.colors.primary.orange
  },
  filterTextSelected: {
    color: theme.colors.primary.white
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  field: {
    marginBottom: 16
  }
});

export default styles;
