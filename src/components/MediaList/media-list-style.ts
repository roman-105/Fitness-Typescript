import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 8,
    marginBottom: 8
  },
  image: {
    height: 80,
    width: 80,
    resizeMode: 'cover'
  },
  textContainer: {
    height: 80,
    paddingHorizontal: theme.margins.external,
    width: '80%'
  },
  title: {
    marginTop: 22
  },
  subtitle: {
    color: theme.colors.primary.asphaltGrey,
    opacity: 0.56,
    marginTop: 4,
    marginBottom: 22
  },
  loaderContainer: {
    height: 56
  },
  loader: {
    transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }]
  }
});

export default styles;
