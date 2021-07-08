import { StyleSheet } from 'react-native';
import theme from '../../theme';
export default StyleSheet.create({
  input: {
    height: 52,
    alignItems: 'center',
    flexDirection: 'row',
    fontFamily: theme.fonts.Heading.Double,
    fontSize: 14,
    backgroundColor: theme.colors.primary.jerseyGrey,
    margin: 1
  },
  passtext: {
    flex: 1,
    fontFamily: theme.fonts.Heading.Double,
    fontSize: 14
  },
  padding: {
    paddingHorizontal: 16
  }
});
