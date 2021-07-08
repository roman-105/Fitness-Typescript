import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FilterIcon } from '../../Icon';
import Typography from '../../Typography';
import styles from './bf-filter-button-styles';
import theme from '../../../theme';

interface BFFilterButtonProps {
  numFilters?: number;
  onPress: (filters: any) => void;
}

const BFFilterButton = ({ numFilters, onPress }: BFFilterButtonProps) => {
  return (
    <TouchableOpacity style={styles.filterContainer} onPress={onPress}>
      <View style={styles.filterIcon}>
        <FilterIcon fill={theme.colors.primary.white} />
        {numFilters ? (
          <View style={styles.filterBadge}>
            <Typography fontFamily="trebleRegular" fontSize={8} style={styles.filterBadgeNumber}>
              {`${numFilters}`}
            </Typography>
          </View>
        ) : (
          <></>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default BFFilterButton;
