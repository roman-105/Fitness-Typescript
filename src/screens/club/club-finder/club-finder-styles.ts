import { StyleSheet } from 'react-native';
import theme from '../../../theme';

export const SELECTED_CLUB_CONTAINER_HEIGHT = 104;
export const SEARCH_RESULTS_CONTAINER_HEIGHT = 64;

const styles: any = StyleSheet.create({
  map: {
    width: '100%',
    flex: 1
  },
  container: {
    height: '100%'
  },
  titleContainer: {
    marginHorizontal: theme.margins.external,
    marginVertical: 16
  },
  searchContainer: {
    position: 'absolute',
    zIndex: 9999,
    top: 64,
    left: 0,
    right: 0,
    margin: 20
  },
  selectedClubContainer: {
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: theme.colors.primary.white
  },
  resultsContainer: {
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    position: 'absolute',
    flex: 1,
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    backgroundColor: theme.colors.primary.white
  },
  resultsContainerFullView: {
    shadowOpacity: 0
  }
});

export default styles;
