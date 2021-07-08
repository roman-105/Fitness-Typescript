import React, { useState, useEffect } from 'react';
import formatMessage from 'format-message';
import { BFButton } from '../../../components/Button';
import { Spacer } from '../../../components/Layout/Layout';
import BFSlidingUpPanel from '../../../components/SlidingUpPanel/BFSlidingUpPanel';
import Typography from '../../../components/Typography';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { lessonFilters, filterDataType } from './lesson-filters';
import { View } from 'react-native';
import styles from './lesson-filter-panel-styles';
import { LessonFilterType } from '../useLesson';
import BFSelectFilterField from '../../../components/Fields/select-field/BFSelectFilterField';

interface LessonFilterPanelProps {
  isOpen: boolean;
  handleClosePanel: () => void;
  selectedFilters: LessonFilterType[];
  onApplyFilters: (filterParams: LessonFilterType[]) => void;
}

const renderFilterItem = (
  { item }: { item: filterDataType },
  selectedFilters: LessonFilterType[],
  handleSelectFilter: (filter: LessonFilterType[]) => void
) => {
  return (
    <BFSelectFilterField
      style={styles.field}
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

const LessonFilterPanel = ({
  isOpen,
  selectedFilters,
  handleClosePanel,
  onApplyFilters
}: LessonFilterPanelProps) => {
  const [currentFilters, setCurrentFilters] = useState<LessonFilterType[]>([]);

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
      <Spacer height={24} />
      <FlatList
        data={lessonFilters}
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

export default LessonFilterPanel;
