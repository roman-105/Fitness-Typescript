import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const WORKOUT_EMPTY_SECTION_ITEM_KEY = 'WORKOUT_EMPTY_SECTION_ITEM_KEY';

export type WorkoutFilterType = {
  key: string;
  value: any;
};

const useWorkout = () => {
  const [filters, setFilters] = useState<WorkoutFilterType[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState<undefined | 'CLUBS' | 'FILTERS'>();
  const dispatch: Dispatch = useDispatch();

  const {
    workoutsModel: {
      allWorkouts: {
        data,
        pagination: { page, pageSize, totalFilteredItems, totalItems }
      }
    },
    loading: {
      effects: {
        workoutsModel: { getAllWorkouts: isLoading }
      }
    }
  } = useSelector((state) => state);

  const computedTotalItems = filters.length > 0 ? totalFilteredItems : totalItems;

  const performSearch = useCallback(
    (pageParam: number, filtersParams: WorkoutFilterType[] = []) => {
      const filterObj = filtersParams.reduce((acc, key) => {
        if (typeof key.value === 'object' && key.value !== null && !Array.isArray(key.value)) {
          return {
            ...key.value
          };
        }
        return {
          ...acc,
          [key.key]: key.value
        };
      }, {});

      dispatch.workoutsModel.getAllWorkouts({
        location: 'Club',
        filters: filterObj,
        page: pageParam
      });
    },
    [dispatch]
  );

  // If no workouts are loaded -> request them
  useEffect(() => {
    if (!data) performSearch(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closePanel = useCallback(() => {
    setIsPanelOpen(undefined);
  }, []);

  const handleClickFiltersButton = useCallback(() => {
    setIsPanelOpen('FILTERS');
  }, []);

  const handleApplyFilters = useCallback(
    (filterParams: WorkoutFilterType[]) => {
      setFilters(filterParams);
      performSearch(0, filterParams);
    },
    [performSearch]
  );

  const onShowMore = useCallback(() => {
    if (computedTotalItems) {
      if ((page + 1) * pageSize < computedTotalItems) {
        performSearch(page + 1);
      }
    }
  }, [page, performSearch, computedTotalItems, pageSize]);

  return {
    data,
    page,
    isPanelOpen,
    computedTotalItems,
    filters,
    isLoading,
    handleClickFiltersButton,
    handleApplyFilters,
    closePanel,
    onShowMore
  };
};

export default useWorkout;
