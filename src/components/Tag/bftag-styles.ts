import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles: any = StyleSheet.create({
  tagContainer: {
    backgroundColor: theme.colors.primary.jerseyGrey,
    height: 24,
    paddingVertical: 2,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tagContainerOrange: {
    backgroundColor: theme.colors.primary.orange,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginRight: 5
  },
  text: {
    color: theme.colors.primary.white
  }
});

export default styles;
