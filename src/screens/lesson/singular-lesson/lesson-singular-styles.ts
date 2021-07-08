import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const styles: any = StyleSheet.create({
  defaultTag: {
    position: 'absolute',
    bottom: 16,
    left: 20,
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: theme.colors.primary.orange,
    zIndex: 99
  },
  mainDataComponentRow: {
    flexDirection: 'row',
    marginBottom: 4
  },
  liveTag: {
    backgroundColor: theme.colors.refreshColors.mintGreen
  },
  floatingButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  membershipWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme.colors.refreshColors.mintGreen,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 16
  },
  membershipText: {
    flex: 1
  }
});

export default styles;
