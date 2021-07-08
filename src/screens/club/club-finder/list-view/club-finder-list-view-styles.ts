import { StyleSheet } from 'react-native';
import theme from '../../../../theme';
import { SEARCH_RESULTS_CONTAINER_HEIGHT } from '../club-finder-styles';

const styles: any = StyleSheet.create({
  emptyContentContainer: {
    overflow: 'hidden',
    flex: 1,
    paddingHorizontal: theme.margins.external,
    justifyContent: 'center'
  },
  searchResultsContainer: {
    height: SEARCH_RESULTS_CONTAINER_HEIGHT,
    paddingHorizontal: theme.margins.external,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  arrowIconUp: {
    transform: [{ rotate: '-90deg' }]
  },
  arrowIconDown: {
    transform: [{ rotate: '+90deg' }]
  },
  listContainer: {
    marginBottom: 16
  }
});

export default styles;
