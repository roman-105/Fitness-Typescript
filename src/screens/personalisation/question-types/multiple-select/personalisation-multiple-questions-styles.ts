import { StyleSheet } from 'react-native';
import theme from '../../../../theme';

const CARD_SIZE = 72;

const styles: any = StyleSheet.create({
  container: {
    height: CARD_SIZE,
    justifyContent: 'center'
  },
  containerSelected: {
    backgroundColor: theme.colors.primary.asphaltGrey
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: CARD_SIZE
  },
  titleContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textSelected: {
    color: theme.colors.primary.white
  }
});

export default styles;
