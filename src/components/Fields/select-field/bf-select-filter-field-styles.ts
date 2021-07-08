import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const styles: any = StyleSheet.create({
  filterTitle: {
    marginBottom: 8,
    marginTop: 16
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  filterItemContainer: {
    height: 32,
    padding: 8,
    paddingHorizontal: 8,
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
  containerIcon: {
    width: 74,
    marginRight: 8,
    height: 96
  },
  filterItemContainerIcon: {
    height: 74,
    padding: 16,
    backgroundColor: theme.colors.primary.jerseyGrey,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;
