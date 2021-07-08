import React from 'react';
import BFSelectorButton from '../../../components/Button/selector/BFSelectorButton';
import styles from './lesson-club-selector-styles';
import { View } from 'react-native';
import { IClubSingular } from '../../../store/models/club/clubModelAdapter';

interface LessonClubSelector {
  selectedClub?: IClubSingular;
  onPress: () => void;
}

const LessonClubSelector = ({ selectedClub, onPress }: LessonClubSelector) => {
  return (
    <View style={styles.clubSelectorButton}>
      <BFSelectorButton title={selectedClub?.name ?? ''} onPress={onPress} />
    </View>
  );
};

export default LessonClubSelector;
