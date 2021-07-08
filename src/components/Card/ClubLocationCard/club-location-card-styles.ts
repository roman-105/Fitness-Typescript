import { StyleSheet } from 'react-native';
import theme from '../../../theme';

export const CLUB_LOCATION_HEIGHT = 72;

const styles: any = StyleSheet.create({
  selectedClubInnerContainer: {
    marginVertical: theme.margins.gutters,
    flexDirection: 'row',
    height: CLUB_LOCATION_HEIGHT
  },
  selectedClubImage: {
    height: CLUB_LOCATION_HEIGHT,
    width: CLUB_LOCATION_HEIGHT,
    marginRight: theme.margins.gutters
  },
  selectedClubInfoContainer: {
    flex: 1,
    justifyContent: 'space-around'
  },
  selectedClubHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  selectedClubName: {
    maxWidth: '75%'
  },
  selectedClubTagsContainer: {
    flexDirection: 'row'
  },
  selectedClubTagSeparation: {
    marginLeft: 8
  }
});

export default styles;
