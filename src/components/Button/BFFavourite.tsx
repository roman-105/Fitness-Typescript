import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './bf-favourite-styles';
import { HearthIcon } from '../Icon';
import theme from '../../theme';

const BFFavourite = (props: {
  isFavouriteItem?: boolean;
  onPress?: () => void;
  isLargeCard: boolean;
}) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(props.isFavouriteItem || false);

  return (
    <TouchableOpacity
      style={[!isFavourite && styles.iconInactive, props.isLargeCard ? styles.large : styles.small]}
      onPress={() => {
        if (props.onPress) props.onPress();
        setIsFavourite(!isFavourite);
      }}
    >
      {isFavourite ? (
        <LinearGradient
          colors={theme.colors.refreshColors.brightOrangeGradient}
          style={styles.gradient}
        >
          <HearthIcon fill="white" height={10} />
        </LinearGradient>
      ) : (
        <HearthIcon fill="white" height={10} />
      )}
    </TouchableOpacity>
  );
};

export default BFFavourite;
