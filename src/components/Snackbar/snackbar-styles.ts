import theme from '../../theme';
import { Platform, StyleSheet } from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

const styles: any = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    padding: 12,
    paddingBottom: 12 + (Platform.OS === 'ios' ? StaticSafeAreaInsets.safeAreaInsetsBottom : 0),
    width: '100%'
  },
  snackbar: {
    padding: 6,
    backgroundColor: theme.colors.primary.asphaltGrey,
    borderRadius: theme.borderRadius,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 6
  },
  icon: {
    padding: 8,
    top: 1
  },
  text: {
    padding: 8
  }
});

export default styles;
