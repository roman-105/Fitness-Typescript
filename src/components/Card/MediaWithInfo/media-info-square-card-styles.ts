import { StyleSheet } from 'react-native';

export const size = 206;

const styles: any = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '100%',
    flex: 1
  },
  touchableZone: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between'
  },
  image: {
    width: size,
    height: size
  },
  title: {
    paddingTop: 8,
    marginBottom: 4
  }
});

export default styles;
