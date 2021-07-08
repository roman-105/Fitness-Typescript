import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LessonLivePlaceholder from '../../../assets/images/club/lesson/lesson_live_placeholder.png';
import LessonPlaceholder from '../../../assets/images/club/lesson/lesson_placeholder.png';
import Typography from '../../Typography';
import styles from './bf-lesson-card-styles';
import { IClubLessonData } from '../../../store/models/club/clubModelAdapter';
import formatMessage from 'format-message';

interface BFLessonCardProps {
  title: string;
  subtitle: string;
  kind: IClubLessonData['kind'];
  isInProgress?: boolean;
  onPress?: () => void;
}

const BFLessonCard = ({ title, kind, subtitle, isInProgress, onPress }: BFLessonCardProps) => {
  const isLiveLesson = kind === 'LGX';

  return (
    <TouchableOpacity
      style={[styles.container, isLiveLesson && styles.containerLive]}
      onPress={onPress}
    >
      <View style={styles.lessonImageContainer}>
        <FastImage
          style={[styles.lessonImage, isLiveLesson && styles.lessonImageLive]}
          source={isLiveLesson ? LessonLivePlaceholder : LessonPlaceholder}
        />
      </View>
      <View style={styles.lessonInfoContainer}>
        <Typography fontFamily="trebleHeavy" fontSize={14} lineHeight={20} maxLines={1}>
          {title}
        </Typography>
        <Typography type="regularbfa" fontSize={12} maxLines={1}>
          {subtitle}
        </Typography>
        {isInProgress && (
          <Typography
            style={[isLiveLesson ? styles.inProgressTextLive : styles.inProgressText]}
            fontFamily="trebleHeavy"
            fontSize={12}
            lineHeight={20}
            maxLines={1}
          >
            {formatMessage('In Progress')}
          </Typography>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default BFLessonCard;
