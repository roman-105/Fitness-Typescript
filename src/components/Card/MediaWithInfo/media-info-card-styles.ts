import { StyleSheet } from 'react-native';
import theme from '../../../theme';

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
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  textContainer: {
    backgroundColor: theme.colors.blackOpacity,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 8
  }
});

export default styles;
