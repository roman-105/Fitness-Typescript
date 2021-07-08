import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles: any = StyleSheet.create({
  button: {
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: theme.colors.primary.white,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    marginLeft: 18,
    flex: 1
  },
  icon: {
    marginRight: 24
  },
  secondIcon: {
    marginLeft: 22
  }
});

export default styles;
