import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles: any = StyleSheet.create({
  photo: {
    width: '100%',
    borderTopLeftRadius: theme.borderRadius,
    borderTopRightRadius: theme.borderRadius,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginBottom: -1
  },
  triangle: {
    borderStyle: 'solid',
    borderBottomWidth: 25,
    borderBottomColor: theme.colors.primary.white,
    borderLeftWidth: 400,
    borderLeftColor: 'transparent'
  }
});

export default styles;
