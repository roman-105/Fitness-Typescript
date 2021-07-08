import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const styles: any = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    borderColor: theme.colors.primary.asphaltGrey,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  buttonText: {
    flex: 1
  },
  icon: {
    marginLeft: 8,
    transform: [{ rotate: '90deg' }]
  }
});

export default styles;
