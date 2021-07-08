import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const styles: any = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary.white,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    borderRadius: theme.borderRadius,
    width: '100%',
    maxHeight: 300
  },
  touchableZone: {
    height: '85%',
    justifyContent: 'space-between'
  },
  slashed: {
    borderBottomColor: theme.colors.primary.white,
    justifyContent: 'space-between'
  },
  infoContainer: {
    paddingHorizontal: 16,
    paddingTop: 6
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingBottom: 8,
    borderRadius: theme.borderRadius,
    marginHorizontal: 2,
    marginVertical: 2,
    borderBottomWidth: 1,
    borderColor: '#D6D6D6',
    textTransform: 'uppercase'
  },
  buttonText: {
    flex: 1
  },
  info: {
    marginHorizontal: 2,
    marginVertical: 2,
    opacity: 0.5
  },
  tag: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary.orange,
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 2,
    margin: 16
  },
  tagText: {
    color: 'white',
    fontFamily: theme.fonts.Argumentum.Regular,
    fontSize: 14,
    lineHeight: 17,
    marginTop: 4,
    marginBottom: 6,
    marginHorizontal: 8,
    top: 2,
    textTransform: 'uppercase'
  }
});

export default styles;
