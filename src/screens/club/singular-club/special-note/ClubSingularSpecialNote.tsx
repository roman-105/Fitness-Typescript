import React from 'react';
import { BFCollapsibleView } from '../../../../components/Collapsible';
import { View } from 'react-native';
import Typography from '../../../../components/Typography/Typography';
import styles from './club-singular-special-note-styles';

interface ClubSingularSpecialNoteProps {
  title: string;
  description: string;
}

const ClubSingularSpecialNote = ({ title, description }: ClubSingularSpecialNoteProps) => {
  return (
    <BFCollapsibleView
      style={styles.container}
      header={<Typography type="regularbfa">{title}</Typography>}
    >
      <View style={styles.fullTextContainer}>
        <Typography type="regularbfa">{description}</Typography>
      </View>
    </BFCollapsibleView>
  );
};

export default ClubSingularSpecialNote;
