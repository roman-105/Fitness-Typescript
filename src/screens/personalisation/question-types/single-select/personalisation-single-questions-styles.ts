import { StyleSheet } from 'react-native';
import theme from '../../../../theme';

const ICON_IMAGE_SIZE = 24;

const styles: any = StyleSheet.create({
  container: {
    paddingVertical: 16
  },
  firstRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconImage: {
    height: ICON_IMAGE_SIZE,
    width: ICON_IMAGE_SIZE,
    marginRight: theme.margins.gutters
  }
});

export default styles;
