import { StyleSheet } from 'react-native';
import theme from '../../../../theme';

const styles: any = StyleSheet.create({
  clubAddress: {
    marginBottom: 4
  },
  clubIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4
  },
  icon: {
    marginRight: 8
  },
  clubDirectionsButton: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderColor: theme.colors.black,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default styles;
