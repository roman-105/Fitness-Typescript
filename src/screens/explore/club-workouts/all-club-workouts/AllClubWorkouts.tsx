import React from 'react';
import AllClubWorkoutsList from './list/AllClubWorkoutsList';
import AllWorkoutsFilterPanelProps from './filter/AllClubWorkoutsFilterPanel';
import useWorkout from './useWorkout';

const AllClubWorkouts = () => {
  const {
    data,
    page,
    computedTotalItems,
    isPanelOpen,
    filters,
    isLoading,
    handleClickFiltersButton,
    handleApplyFilters,
    closePanel,
    onShowMore
  } = useWorkout();

  const toggleFavourite = () => {
    // TO DO => Handle toogle Favourite
  };

  return (
    <>
      <AllClubWorkoutsList
        selectedFilters={filters}
        data={data}
        page={page}
        totalItems={computedTotalItems ?? 0}
        onPressFilterButton={handleClickFiltersButton}
        areFiltersApplied={filters.length > 0}
        toggleFavourite={toggleFavourite}
        isLoading={isLoading}
        onShowMore={onShowMore}
      />
      <AllWorkoutsFilterPanelProps
        selectedFilters={filters}
        onApplyFilters={handleApplyFilters}
        handleClosePanel={closePanel}
        isOpen={isPanelOpen !== undefined}
      />
    </>
  );
};

export default AllClubWorkouts;
