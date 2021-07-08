import { StyleSheet } from 'react-native';
import { convertHexToRGBA } from '../../utils';
import theme from '../../theme';

const styles: any = StyleSheet.create({
  icon: {
    backgroundColor: theme.colors.primary.orange
  },
  iconInactive: {
    backgroundColor: convertHexToRGBA(theme.colors.black, 0.6),
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  large: {
    position: 'absolute',
    right: 8,
    top: 8,
    borderRadius: 20,
    zIndex: 1
  },
  small: {
    position: 'absolute',
    left: 35,
    top: 25,
    borderRadius: 100 / 2,
    zIndex: 1
  },
  gradient: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 100 / 2
  }
});

export default styles;
