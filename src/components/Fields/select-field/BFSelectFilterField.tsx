import React, { useCallback, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import Typography from '../../Typography';
import styles from './bf-select-filter-field-styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import formatMessage from 'format-message';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../../theme';
import { iconLookup } from '../../Icon/index';

export type FilterTypeValue = {
  key: string;
  value: any;
  text?: string;
  iconActive?:
    | 'allFilters'
    | 'getFit'
    | 'getStronger'
    | 'performance'
    | 'shapeAndTone'
    | 'weightLoss';
  iconInactive?:
    | 'allFilters'
    | 'getFit'
    | 'getStronger'
    | 'performance'
    | 'shapeAndTone'
    | 'weightLoss';
};

interface BFSelectFilterField<T extends FilterTypeValue> {
  style?: ViewStyle;
  name: string;
  label: string;
  values: T[];
  includeAllOption?: boolean;
  isMultipleSelect?: boolean;
  selectedFilters: T[];
  onSelectFilter: (filters: FilterTypeValue[]) => void;
}

const allOption: FilterTypeValue = {
  key: 'all',
  value: undefined,
  text: formatMessage('All')
};

const FilterContentIcon = ({
  isSelected,
  data
}: {
  isSelected: boolean;
  data: FilterTypeValue;
}) => {
  const IconActiveComponent = data.iconActive ? iconLookup[data.iconActive] : null;
  const IconInactiveComponent = data.iconInactive ? iconLookup[data.iconInactive] : null;

  return isSelected ? (
    <View style={styles.containerIcon}>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={theme.colors.refreshColors.brightOrangeGradient}
        style={styles.filterItemContainerIcon}
      >
        {IconActiveComponent && <IconActiveComponent />}
      </LinearGradient>
      {data.text && (
        <Typography fontFamily="trebleHeavy" fontSize={8} lineHeight={16} align={'center'}>
          {data.text}
        </Typography>
      )}
    </View>
  ) : (
    <View style={styles.containerIcon}>
      <View style={styles.filterItemContainerIcon}>
        {IconInactiveComponent && <IconInactiveComponent />}
      </View>
      {data.text && (
        <Typography fontFamily="trebleRegular" fontSize={8} lineHeight={16} align={'center'}>
          {data.text}
        </Typography>
      )}
    </View>
  );
};

const FilterContent = ({ isSelected, data }: { isSelected: boolean; data: FilterTypeValue }) => {
  if (isSelected) {
    return (
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={theme.colors.refreshColors.brightOrangeGradient}
        style={styles.filterItemContainer}
      >
        {data.text && (
          <Typography
            style={styles.filterTextSelected}
            fontFamily="trebleHeavy"
            fontSize={12}
            lineHeight={16}
          >
            {data.text}
          </Typography>
        )}
      </LinearGradient>
    );
  }

  return data.text ? (
    <View style={[styles.filterItemContainer, { paddingHorizontal: 8 + data.text.length / 2 }]}>
      <Typography type="regularbfa" fontSize={12} lineHeight={16}>
        {data.text}
      </Typography>
    </View>
  ) : (
    <></>
  );
};

const BFSelectFilterField = <T extends FilterTypeValue>({
  name,
  style,
  label,
  includeAllOption,
  selectedFilters,
  isMultipleSelect,
  onSelectFilter,
  values
}: BFSelectFilterField<T>) => {
  const finalFilters = [...values];

  if (includeAllOption) {
    finalFilters.unshift(allOption as T);
  }

  const numFiltersSelected = useMemo(() => {
    const currentFilter = selectedFilters.find((selectedFilter) => selectedFilter.key === name);

    return isMultipleSelect ? currentFilter?.value.length : currentFilter?.value ? 1 : 0;
  }, [selectedFilters, isMultipleSelect, name]);

  const handleAddSingleFilter = useCallback(
    (filter: FilterTypeValue) => {
      const activeFilter = selectedFilters.find(
        (selectedFilter) => selectedFilter.key === name && selectedFilter.value === filter.value
      );

      const filteredFilters = selectedFilters.filter(
        (selectedFilter) => selectedFilter.key !== name
      );

      if (!filter.value) return onSelectFilter(filteredFilters);

      if (activeFilter) {
        onSelectFilter(filteredFilters);
      } else {
        onSelectFilter([...filteredFilters, { key: name, value: filter.value }]);
      }
    },
    [name, selectedFilters, onSelectFilter]
  );

  const handleAddMultipleFilter = useCallback(
    (filter: FilterTypeValue) => {
      const activeFilter = selectedFilters.find((selectedFilter) => selectedFilter.key === name);

      const filteredFilters = selectedFilters.filter(
        (selectedFilter) => selectedFilter.key !== name
      );

      if (!filter.value) return onSelectFilter(filteredFilters);

      if (!activeFilter)
        return onSelectFilter([...filteredFilters, { key: name, value: [filter.value] }]);

      if (activeFilter.value.length === 1) {
        const newValue = [...activeFilter.value, filter.value];
        return onSelectFilter(
          activeFilter.value.includes(filter.value)
            ? filteredFilters
            : [...filteredFilters, { key: activeFilter.key, value: newValue }]
        );
      }

      if (activeFilter.value.includes(filter.value)) {
        const newValue = activeFilter.value.filter((a: any) => a !== filter.value);
        return onSelectFilter([...filteredFilters, { key: activeFilter.key, value: newValue }]);
      }

      const newValue = [...activeFilter.value, filter.value];
      return onSelectFilter([...filteredFilters, { key: activeFilter.key, value: newValue }]);
    },
    [name, selectedFilters, onSelectFilter]
  );

  return (
    <View style={style}>
      <Typography style={styles.filterTitle} fontFamily="trebleHeavy" fontSize={14}>
        {`${label} ${
          numFiltersSelected && numFiltersSelected !== 0 ? `(${numFiltersSelected})` : ''
        }`}
      </Typography>
      <View style={styles.filterContainer}>
        {finalFilters.map((filter) => {
          const isSelected =
            selectedFilters.find((selectedFilter) => {
              if (isMultipleSelect)
                return selectedFilter.key === name && selectedFilter.value.includes(filter.value);
              return selectedFilter.key === name && selectedFilter.value === filter.value;
            }) !== undefined ||
            (filter.value === undefined &&
              selectedFilters.find((selectedFilter) => selectedFilter.key === name) === undefined);

          return (
            <TouchableOpacity
              key={filter.key}
              onPress={() =>
                isMultipleSelect ? handleAddMultipleFilter(filter) : handleAddSingleFilter(filter)
              }
            >
              {filter?.iconActive ? (
                <FilterContentIcon isSelected={isSelected} data={filter} />
              ) : (
                <FilterContent isSelected={isSelected} data={filter} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BFSelectFilterField;
