import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles: any = StyleSheet.create({
  clubContainer: {
    minHeight: '100%',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  headerContainer: {
    marginHorizontal: theme.margins.external
  },
  favoriteClubsContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  clubFinderContainer: { height: 150 },
  clubFinderImage: {
    height: 150,
    width: '100%'
  },
  clubFinderButtonContainer: {
    position: 'absolute',
    height: 150,
    justifyContent: 'center',
    width: '100%',
    padding: theme.margins.external
  },
  clubFinderButton: {
    shadowColor: theme.colors.shadow,
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 1
  }
});

export default styles;
