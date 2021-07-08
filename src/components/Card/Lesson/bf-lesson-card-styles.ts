import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const LESSON_CARD_HEIGHT = 72;

const LESSON_LIVE_CARD_WIDTH = 50;
const LESSON_LIVE_CARD_HEIGHT = 41;

const styles: any = StyleSheet.create({
  container: {
    height: LESSON_CARD_HEIGHT,
    overflow: 'hidden',
    flexDirection: 'row',
    borderRightWidth: 2,
    borderRightColor: theme.colors.primary.orange
  },
  containerLive: {
    borderRightColor: theme.colors.refreshColors.mintGreen
  },
  lessonImageContainer: {
    height: LESSON_CARD_HEIGHT,
    width: LESSON_CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lessonImage: {
    height: '100%',
    width: '100%'
  },
  lessonImageLive: {
    height: LESSON_LIVE_CARD_HEIGHT,
    width: LESSON_LIVE_CARD_WIDTH
  },
  lessonInfoContainer: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center'
  },
  inProgressText: {
    color: theme.colors.primary.orange
  },
  inProgressTextLive: {
    color: theme.colors.refreshColors.mintGreen
  }
});

export default styles;
