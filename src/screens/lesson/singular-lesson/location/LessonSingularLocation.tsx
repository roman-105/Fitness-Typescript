import React, { useCallback } from 'react';
import formatMessage from 'format-message';
import Typography from '../../../../components/Typography';
import { IClubSingular } from '../../../../store/models/club/clubModelAdapter';
import ClubLocationCard from '../../../../components/Card/ClubLocationCard/ClubLocationCard';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../../router/routes';

interface LessonSingularLocationProps {
  club: IClubSingular;
}

const LessonSingularLocation = ({ club }: LessonSingularLocationProps) => {
  const navigation = useNavigation();

  const handlePressClub = useCallback(() => {
    if (club) navigation.navigate(Routes.ClubSingular);
  }, [navigation, club]);

  return (
    <>
      <Typography fontFamily="trebleHeavy" uppercase>
        {formatMessage('Location')}
      </Typography>
      <ClubLocationCard club={club} onPress={handlePressClub} />
    </>
  );
};

export default LessonSingularLocation;
