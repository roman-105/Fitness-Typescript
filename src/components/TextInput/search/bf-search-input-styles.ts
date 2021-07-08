import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const styles: any = StyleSheet.create({
  inputContainer: {
    backgroundColor: theme.colors.ui.background,
    width: '100%',
    fontSize: 16,
    fontFamily: theme.fonts.Argumentum.Regular,
    color: theme.colors.primary.asphaltGrey,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: theme.colors.shadow,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1,
    borderLeftColor: theme.colors.primary.orange,
    borderLeftWidth: 2
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 0,
    height: 56,
    color: theme.colors.primary.asphaltGrey,
    fontFamily: theme.fonts.Argumentum.Regular,
    fontSize: 16,
    alignItems: 'center'
  },
  clearIconContainer: {
    padding: 16
  }
});

export default styles;
