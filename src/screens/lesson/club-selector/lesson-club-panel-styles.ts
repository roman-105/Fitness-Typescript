import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const ICON_SIZE = 24;
const ITEM_SIZE = 56;

const styles: any = StyleSheet.create({
  itemContainer: {
    height: ITEM_SIZE,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  iconContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: theme.colors.primary.orange
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contentTitle: {
    flexWrap: 'wrap',
    flex: 1,
    paddingHorizontal: 8
  }
});

export default styles;
