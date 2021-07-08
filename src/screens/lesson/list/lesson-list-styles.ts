import { StyleSheet } from 'react-native';
import { HEADER_HEIGHT } from '../header/lesson-header-styles';
import { LESSON_CARD_HEIGHT, LESSON_HEADER_HEIGHT } from '../useLesson';

const styles: any = StyleSheet.create({
  cardContainer: {
    height: LESSON_CARD_HEIGHT,
    justifyContent: 'center'
  },
  headerContainer: {
    height: LESSON_HEADER_HEIGHT,
    paddingTop: 16,
    justifyContent: 'center'
  },
  emptyContent: {
    maxWidth: '60%',
    height: LESSON_CARD_HEIGHT,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  emptyContentImage: {
    height: 48,
    width: 48
  },
  emptyContentFull: {
    flex: 1,
    marginBottom: HEADER_HEIGHT / 2
  }
});

export default styles;
