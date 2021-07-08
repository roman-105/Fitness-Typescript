import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const styles: any = StyleSheet.create({
  card: {
    height: 208,
    flex: 1,
    marginBottom: 2
  },
  overlay: {
    backgroundColor: theme.colors.blackOpacity,
    height: 208,
    paddingTop: 80,
    paddingLeft: theme.margins.external
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default styles;
