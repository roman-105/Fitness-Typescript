import { StyleSheet } from 'react-native';
import theme from '../../theme';

const MODAL_MARGIN = 28;

const styles: any = StyleSheet.create({
  modal: {
    backgroundColor: '#00000099',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer: {
    backgroundColor: 'white',
    minWidth: '80%',
    maxWidth: '80%',
    padding: MODAL_MARGIN
  },
  title: {
    paddingBottom: 8
  },
  modalFooter: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginTop: MODAL_MARGIN / 2
  },
  actions: {
    marginLeft: MODAL_MARGIN,
    backgroundColor: theme.colors.secondary.powerPurple,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  actionText: {
    fontFamily: theme.fonts.Argumentum.Regular,
    fontSize: 16
  }
});

export default styles;
