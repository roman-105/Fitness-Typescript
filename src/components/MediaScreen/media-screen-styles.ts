import { StyleSheet } from 'react-native';

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  gif: {
    width: '100%',
    height: undefined,
    aspectRatio: 1 / 1
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 3 / 2
  },
  video: {
    flex: 1,
    backgroundColor: '#111'
  }
});

export default styles;
