import React from 'react';
import Typography from '../../../components/Typography';
import { TouchableOpacity, View } from 'react-native';
import formatMessage from 'format-message';
import styles from './personalisation-header-styles';
import { ArrowLeftIcon } from '../../../components/Icon';
import theme from '../../../theme';

interface PersonalisationHeaderProps {
  step: number;
  total: number;
  onBackPress: () => void;
  onSkipPress: () => void;
}

const PersonalisationHeader = ({
  step,
  total,
  onBackPress,
  onSkipPress
}: PersonalisationHeaderProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackPress}>
        <ArrowLeftIcon fill={theme.colors.black} />
      </TouchableOpacity>
      <View style={styles.headerContent}>
        <Typography type="regularbfa">{`${formatMessage('Step {step} / {total}', {
          step,
          total
        })}`}</Typography>
        <TouchableOpacity style={styles.skipButton} onPress={onSkipPress}>
          <Typography type="regularbfa">{formatMessage('Skip')}</Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PersonalisationHeader;
