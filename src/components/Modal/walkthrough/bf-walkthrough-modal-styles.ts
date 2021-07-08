import { StyleSheet, Dimensions, Platform } from 'react-native';
import theme from '../../../theme';
import { convertHexToRGBA } from '../../../utils/index';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

const MODAL_MARGIN = 28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000099'
  },
  touchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000099'
  },
  modalContainer: {
    backgroundColor: 'white',
    height: 248,
    paddingTop: MODAL_MARGIN,
    paddingHorizontal: MODAL_MARGIN,
    position: 'absolute',
    top: Dimensions.get('screen').height / 2 - 124,
    left: MODAL_MARGIN,
    right: MODAL_MARGIN
  },
  actions: {
    backgroundColor: theme.colors.secondary.powerPurple,
    paddingVertical: 8,
    paddingHorizontal: 12,
    position: 'relative',
    top: 8,
    left: 16
  },
  title: {
    paddingBottom: 8
  },
  dot: {
    backgroundColor: convertHexToRGBA(theme.colors.primary.asphaltGrey, 0.4),
    position: 'relative',
    right: Dimensions.get('screen').width / 2 - 105
  },
  dotActive: {
    backgroundColor: theme.colors.primary.orange,
    position: 'relative',
    right: Dimensions.get('screen').width / 2 - 105
  },
  profileIcon: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? StaticSafeAreaInsets.safeAreaInsetsTop : 0,
    left: 8
  },
  iconsContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? StaticSafeAreaInsets.safeAreaInsetsBottom : 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    right: 0,
    left: 0,
    width: Dimensions.get('screen').width + 4
  }
});

export default styles;
