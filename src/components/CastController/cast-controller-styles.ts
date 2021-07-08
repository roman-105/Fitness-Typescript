import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../theme';

const styles: any = StyleSheet.create({
  backgroundContainer: {
    height: Dimensions.get('screen').height
  },
  topLine: {
    position: 'absolute',
    height: '30%',
    left: -40,
    top: -4,
    borderBottomLeftRadius: 180,
    borderColor: theme.colors.primary.white,
    opacity: 0.5,
    borderWidth: 4,
    width: Dimensions.get('screen').width + 200
  },
  bottomLine: {
    position: 'absolute',
    height: '60%',
    right: -40,
    bottom: 0,
    borderTopRightRadius: 180,
    borderColor: theme.colors.primary.white,
    opacity: 0.5,
    borderWidth: 4,
    width: Dimensions.get('screen').width + 200
  },
  headerTop: {
    height: '10%'
  },
  closeButton: {
    padding: 20
  },
  innerContainers: {
    maxWidth: 300,
    alignSelf: 'center'
  },
  innerTopContainer: {
    height: '45%',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  innerBottomContainer: {
    height: '45%',
    justifyContent: 'space-between',
    paddingVertical: 20
  },
  mediaTitle: {
    color: theme.colors.primary.white
  },
  image: {
    width: 180,
    height: 180
  },
  progressBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    fontSize: 12
  },
  durationText: {
    color: theme.colors.primary.white
  },
  bottomControls: {
    marginTop: 24
  },
  actionsContainer: {
    height: 56,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  castConnectionBottomButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  castConnectionBottomButtonText: {
    color: theme.colors.primary.white,
    marginHorizontal: 8
  }
});

export default styles;
