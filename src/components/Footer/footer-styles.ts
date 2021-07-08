import { StyleSheet } from 'react-native';
import theme from '../../theme';
import { convertHexToRGBA } from '../../utils';

export default StyleSheet.create({
  footerContainer: {
    backgroundColor: theme.colors.primary.white,
    paddingHorizontal: 20,
    paddingVertical: 16
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: convertHexToRGBA(theme.colors.primary.asphaltGrey, 0.32),
    borderRadius: 2,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8
  },
  childrenContainer: {
    marginTop: 14
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    marginLeft: 8
  }
});
