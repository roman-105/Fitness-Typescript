import { StyleSheet } from 'react-native';
import theme from '../../../theme';
import { convertHexToRGBA } from '../../../utils/index';

const styles: any = StyleSheet.create({
  picker: {
    height: 120
  },
  optionWrapper: {
    flexDirection: 'row'
  },
  placeholder: {
    opacity: 0.5
  },
  decorationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  modal: {
    backgroundColor: convertHexToRGBA(theme.colors.black, 0.6),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer: {
    backgroundColor: theme.colors.primary.white,
    minWidth: '80%',
    padding: 24
  },
  action: {
    alignSelf: 'flex-end'
  }
});

export default styles;
