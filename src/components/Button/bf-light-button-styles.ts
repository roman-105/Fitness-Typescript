import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles: any = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    elevation: 2,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  disabled: {
    opacity: 0.5
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 14
  },
  text: {
    fontSize: 16,
    color: theme.colors.primary.asphaltGrey
  },
  withIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  aditionalInfo: {
    color: theme.colors.primary.asphaltGrey,
    opacity: 0.56,
    paddingLeft: 8
  }
});

export default styles;
