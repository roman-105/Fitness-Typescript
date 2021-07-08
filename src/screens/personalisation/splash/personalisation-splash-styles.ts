import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const styles: any = StyleSheet.create({
  image: {
    height: 280,
    marginBottom: 20
  },
  scrollContainer: {
    height: 50,
    justifyContent: 'flex-start'
  },
  subTitle: {
    marginTop: 8
  },
  smallText: {
    marginTop: 12,
    color: theme.colors.primary.asphaltGrey,
    opacity: 0.5
  }
});

export default styles;
