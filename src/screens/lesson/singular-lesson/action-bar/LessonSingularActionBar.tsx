import formatMessage from 'format-message';
import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { ShareIcon } from '../../../../components/Icon';
import Typography from '../../../../components/Typography';
import { IClubLessonSingular, IClubSingular } from '../../../../store/models/club';
import theme from '../../../../theme';
import { share } from '../../../../utils/share';
import styles from './lesson-singular-action-bar';

interface LessonSingularActionBarProps {
  lesson: IClubLessonSingular;
  club: IClubSingular;
}

const LessonSingularActionBar = ({ lesson, club }: LessonSingularActionBarProps) => {
  const handleOnShare = useCallback(() => {
    share('Lesson', `groupLesson/${club.clubId}/${lesson.id}`);
  }, [lesson, club]);

  return (
    <TouchableOpacity style={styles.actionBar} onPress={handleOnShare}>
      <ShareIcon fill={theme.colors.black} />
      <Typography style={styles.actionText} type="regularbfa">
        {formatMessage('Share')}
      </Typography>
    </TouchableOpacity>
  );
};

export default LessonSingularActionBar;
