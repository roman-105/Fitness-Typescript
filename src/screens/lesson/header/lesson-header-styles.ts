import { StyleSheet } from 'react-native';
import { convertHexToRGBA } from '../../../utils/index';
import theme from '../../../theme';

export const DAY_ITEM_CAROUSEL_WIDTH = 64;

export const HEADER_TITLE_HEIGHT = 48;
export const CLUB_SELECTOR_CONTAINER = 64;

export const HEADER_HEIGHT =
  DAY_ITEM_CAROUSEL_WIDTH + HEADER_TITLE_HEIGHT + CLUB_SELECTOR_CONTAINER;

const styles: any = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  header: {
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  scrollingList: {
    backgroundColor: theme.colors.primary.white,
    marginBottom: 5,
    paddingBottom: 8,
    shadowColor: theme.colors.shadow,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 1,
    elevation: 2
  },
  day: {
    color: convertHexToRGBA(theme.colors.primary.asphaltGrey, 0.72)
  },
  dayCarouselItem: {
    height: 40,
    width: DAY_ITEM_CAROUSEL_WIDTH,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dayCarouselItemCurrentDay: {
    color: theme.colors.primary.orange
  },
  dayCarouselItemSelected: {
    color: theme.colors.primary.asphaltGrey
  },
  clubSelectorContainer: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerContainer: {
    marginVertical: 8,
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  openPanel: {
    elevation: 0
  }
});

export default styles;
