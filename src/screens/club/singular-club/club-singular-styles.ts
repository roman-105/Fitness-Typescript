import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const styles: any = StyleSheet.create({
  titleContainer: {
    marginVertical: 20
  },
  basicInfoContainer: {
    marginTop: 24
  },
  homeClubTag: {
    position: 'absolute',
    bottom: 16,
    left: 20,
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: theme.colors.primary.orange,
    zIndex: 99
  },
  floatingButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
});

export default styles;
