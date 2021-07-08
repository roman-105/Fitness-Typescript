import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const FAVORITE_CLUB_CARD_HEIGHT = 160;
export const FAVORITE_CLUB_CARD_WIDTH = 152;

const styles: any = StyleSheet.create({
  favoriteClubsContainer: {
    height: FAVORITE_CLUB_CARD_HEIGHT + 60
  },
  title: {
    marginLeft: theme.margins.external,
    marginTop: 16
  },
  favoriteClubCardContainer: {
    height: FAVORITE_CLUB_CARD_HEIGHT,
    width: FAVORITE_CLUB_CARD_WIDTH,
    margin: 8,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 1,
    shadowOffset: { width: 2, height: 2 }
  },
  favoriteClubCardHomeTag: {
    position: 'absolute',
    margin: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: theme.colors.primary.orange,
    zIndex: 99
  },
  favoriteClubCardImage: {
    height: FAVORITE_CLUB_CARD_HEIGHT / 2,
    width: FAVORITE_CLUB_CARD_WIDTH
  },
  favoriteClubCardContent: {
    height: 82,
    backgroundColor: theme.colors.primary.white,
    padding: 8,
    elevation: 2
  },
  firstFavoriteClubCard: {
    marginLeft: theme.margins.external
  },
  addFavoriteClubCardContainer: {
    height: FAVORITE_CLUB_CARD_HEIGHT,
    width: FAVORITE_CLUB_CARD_WIDTH,
    margin: 8,
    borderColor: theme.colors.secondary.powerPurple,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addFavoriteClubCardContent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  addFavoriteClubCardText: {
    marginTop: 8,
    color: theme.colors.secondary.powerPurple
  }
});

export default styles;
