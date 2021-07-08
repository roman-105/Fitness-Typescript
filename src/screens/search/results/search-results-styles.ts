import { StyleSheet } from 'react-native';
import theme from '../../../theme';

export const SEARCH_CONTENT_RESULT_CARD_HEIGHT = 56;

const styles: any = StyleSheet.create({
  lightText: {
    color: theme.colors.primary.asphaltGrey,
    opacity: 0.5
  },
  blockHeader: {
    marginBottom: 16
  },
  appResultsContainer: {
    marginBottom: 24
  },
  appResultItemContainer: {
    height: 48,
    backgroundColor: theme.colors.primary.white,
    borderRadius: 2,
    alignItems: 'center',
    borderBottomColor: theme.colors.ui.grey,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  appResultItemLabel: {
    lineHeight: 18
  },
  contentHeaderContainer: {
    backgroundColor: theme.colors.primary.white,
    paddingVertical: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contentResultCard: {
    height: SEARCH_CONTENT_RESULT_CARD_HEIGHT
  },
  contentResults: {
    marginBottom: 16
  },
  contentResultContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  contentResultInnerContainer: {
    flex: 1,
    marginHorizontal: 16,
    height: 56,
    justifyContent: 'space-evenly'
  },
  contentResultImage: {
    height: 56,
    width: 56
  }
});

export default styles;
