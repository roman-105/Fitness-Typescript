import { StyleSheet } from 'react-native';
import theme from '../../../../theme';

const styles: any = StyleSheet.create({
  container: {
    marginTop: 24
  },
  field: {
    backgroundColor: theme.colors.primary.jerseyGrey,
    height: 56,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginBottom: 4,
    borderRadius: theme.borderRadius
  }
});

export default styles;
