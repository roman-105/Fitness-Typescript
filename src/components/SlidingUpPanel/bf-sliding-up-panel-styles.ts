import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../theme';
import { convertHexToRGBA } from '../../utils/index';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

export const PANEL_HEIGHT =
  Dimensions.get('screen').height -
  (StaticSafeAreaInsets.safeAreaInsetsTop + StaticSafeAreaInsets.safeAreaInsetsBottom + 48);
export const OPACITY_BACKGROUND = convertHexToRGBA(theme.colors.primary.asphaltGrey, 0.6);

const styles: any = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 99,
    height: 0,
    width: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent'
  },
  containerOpen: {
    backgroundColor: OPACITY_BACKGROUND,
    height: '100%',
    width: '100%'
  },
  innerOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: '100%',
    bottom: PANEL_HEIGHT,
    zIndex: 999
  },
  animatedContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 0,
    bottom: 0,
    backgroundColor: OPACITY_BACKGROUND,
    zIndex: 999
  },
  contentContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: theme.colors.primary.white,
    flex: 1,
    zIndex: 9999,
    padding: theme.margins.external
  },
  contentTopMarkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  contentTopMark: {
    marginTop: -20,
    borderRadius: 20,
    backgroundColor: theme.colors.primary.jerseyGrey,
    width: 40,
    height: 4
  }
});

export default styles;
