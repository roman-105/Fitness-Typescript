import React, { useState, useEffect } from 'react';
import formatMessage from 'format-message';
import { View } from 'react-native';
import { BFButton } from '../../../../../components/Button';
import { Spacer } from '../../../../../components/Layout/Layout';
import BFSlidingUpPanel from '../../../../../components/SlidingUpPanel/BFSlidingUpPanel';
import Typography from '../../../../../components/Typography';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { workoutFilters, filterDataType } from './workout-filter';
import styles from './all-workouts-filter-panel-styles';
import { WorkoutFilterType } from '../useWorkout';
import BFSelectFilterField from '../../../../../components/Fields/select-field/BFSelectFilterField';

interface AllWorkoutsFilterPanelProps {
  isOpen: boolean;
  handleClosePanel: () => void;
  selectedFilters: WorkoutFilterType[];
  onApplyFilters: (filterParams: WorkoutFilterType[]) => void;
}

const renderFilterItem = (
  { item }: { item: filterDataType },
  selectedFilters: WorkoutFilterType[],
  handleSelectFilter: (filter: WorkoutFilterType[]) => void
) => {
  return (
    <BFSelectFilterField
      name={item.key}
      label={formatMessage(item.label)}
      values={item.values}
      selectedFilters={selectedFilters}
      onSelectFilter={handleSelectFilter}
      includeAllOption={item.includeAllOption}
      isMultipleSelect={item.isMultipleChoice}
    />
  );
};

const AllWorkoutsFilterPanel = ({
  isOpen,
  selectedFilters,
  handleClosePanel,
  onApplyFilters
}: AllWorkoutsFilterPanelProps) => {
  const [currentFilters, setCurrentFilters] = useState<WorkoutFilterType[]>([]);

  useEffect(() => {
    setCurrentFilters(selectedFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <BFSlidingUpPanel isOpen={isOpen} onOverlayPress={handleClosePanel}>
      <View style={styles.headerContainer}>
        <Typography type="h2">{formatMessage('Filters')}</Typography>
        {currentFilters.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              handleClosePanel();
              if (selectedFilters.length !== 0) onApplyFilters([]);
            }}
          >
            <Typography type="regularbfa" fontSize={12}>
              {formatMessage('Reset')}
            </Typography>
          </TouchableOpacity>
        )}
      </View>
      <Spacer height={16} />
      <FlatList
        data={workoutFilters}
        renderItem={(item) => renderFilterItem(item, currentFilters, setCurrentFilters)}
      />
      <Spacer height={16} />
      {currentFilters.length > 0 && (
        <BFButton
          title={formatMessage('Apply filters')}
          onPress={() => {
            handleClosePanel();
            onApplyFilters(currentFilters);
          }}
        />
      )}
    </BFSlidingUpPanel>
  );
};

export default AllWorkoutsFilterPanel;
