import { StyleSheet } from 'react-native';

const styles: any = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: 150
  },
  mask: {
    zIndex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    paddingHorizontal: '30%',
    justifyContent: 'space-between',
    alignContent: 'center'
  }
});

export default styles;
