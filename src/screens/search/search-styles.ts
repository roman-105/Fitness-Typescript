import { StyleSheet } from 'react-native';
import theme from '../../theme';
import { convertHexToRGBA } from '../../utils';

const styles: any = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary.white,
    flex: 1
  },
  noResultsContainer: {
    marginTop: 60,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  noResultsText: {
    textAlign: 'center'
  },
  noResultsHelpLinkContainer: {
    paddingHorizontal: 18,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: convertHexToRGBA(theme.colors.primary.asphaltGrey, 0.32)
  },
  noResultsHelpLinkTouchable: {
    flexDirection: 'row'
  },
  noResultsHelpLinkInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  noResultsHelpLinkText: {
    marginLeft: 8,
    lineHeight: 14
  }
});

export default styles;
