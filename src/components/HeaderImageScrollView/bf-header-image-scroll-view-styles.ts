import { StyleSheet, Dimensions, Platform } from 'react-native';
import theme from '../../theme';
import { convertHexToRGBA } from '../../utils/index';

export const DEFAULT_FIXED_MIN_HEIGHT = 64;
export const DEFAULT_FIXED_MAX_HEIGHT = 300;

const styles: any = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: '100%',
    width: '100%'
  },
  fixedContainer: {
    height: DEFAULT_FIXED_MIN_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.margins.external
  },
  shadow: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    ...Platform.select({
      ios: {
        backgroundColor: theme.colors.primary.white,
        height: 55,
        shadowOffset: { width: 0, height: 5 },
        shadowColor: theme.colors.shadow,
        shadowOpacity: 0.3,
        shadowRadius: 3
      },
      android: {
        backgroundColor: 'transparent',
        height: DEFAULT_FIXED_MIN_HEIGHT,
        bottom: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 0,
        elevation: 1
      }
    })
  },
  fixedBackArrow: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    height: 32,
    width: 32,
    backgroundColor: convertHexToRGBA(theme.colors.black, 0.5)
  },
  fixedBackArrowActive: {
    backgroundColor: 'transparent'
  },
  fixedTextContainer: {
    flex: 1
  }
});

export default styles;
