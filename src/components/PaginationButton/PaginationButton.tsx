import React from 'react';
import { View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import Typography from '../Typography';
import styles from './pagination-button-styles';
import formatMessage from 'format-message';

export interface PaginationButtonProps {
  content: string;
  onPress: () => void;
  hasMore: boolean;
  hide?: boolean;
}

function PaginationButton({
  content,
  onPress,
  hide,
  hasMore
}: PaginationButtonProps): JSX.Element | null {
  if (hide) return null;

  const handleOnPress = () => {
    setTimeout(function () {
      onPress();
    }, 200);
  };

  if (hasMore) {
    return (
      <Ripple onPress={handleOnPress} style={styles.button} testID="pagination-button-ripple">
        <Typography fontFamily="regular" fontSize={14}>
          {formatMessage('Show more')}
        </Typography>
      </Ripple>
    );
  } else {
    return (
      <View style={styles.container}>
        <Typography fontFamily="regular" fontSize={14}>
          {formatMessage('There are no more {content} to show.', { content })}
        </Typography>
      </View>
    );
  }
}

export default PaginationButton;
