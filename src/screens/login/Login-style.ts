import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  padding: {
    paddingHorizontal: 20,
    paddingBottom: 8
  },
  spacebetween: {
    flex: 1,
    justifyContent: 'space-between'
  },
  imageContainer: {
    height: 185
  },
  image: {
    height: '100%',
    width: '100%'
  },
  alignCenter: {
    alignSelf: 'center'
  },
  alignEnd: {
    marginBottom: 16,
    alignSelf: 'flex-end'
  },
  header: {
    marginTop: 16,
    marginBottom: 8
  },
  inputs: {
    marginTop: 24,
    marginBottom: 10
  },
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  errorText: {
    color: theme.colors.ui.red,
    marginBottom: 8
  }
});

export default styles;
