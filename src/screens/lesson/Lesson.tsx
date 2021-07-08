import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LessonHeader from './header/LessonHeader';
import useLesson from './useLesson';
import LessonList from './list/LessonList';
import BFLoader from '../../components/Loader/BFLoader';
import LessonClubPanel from './club-selector/LessonClubPanel';
import LessonFilterPanel from './filter/LessonFilterPanel';

const Lesson = () => {
  const {
    sections,
    scrollDirection,
    selectedClub,
    filters,
    isLoading,
    isPanelOpen,
    listRef,
    selectedDate,
    handleOnViewableItemsChanged,
    handleSelectDate,
    handleOpenClubSelector,
    handleClickFiltersButton,
    handleOnListScroll,
    handleSelectClub,
    handleSelectLesson,
    handleApplyFilters,
    closePanel
  } = useLesson();

  const dispatch: Dispatch = useDispatch();
  const favoriteClubs = useSelector((state) => state.clubModel.favoriteClubs);

  useEffect(() => {
    if (favoriteClubs) {
      dispatch.clubModel.setSingularClub(
        favoriteClubs?.find((favoriteClub) => favoriteClub.isHomeClub)
      );
    }
  }, [dispatch, favoriteClubs]);

  if (!favoriteClubs) {
    return <BFLoader />;
  }

  return (
    <>
      <LessonHeader
        scrollDirection={scrollDirection}
        selectedDate={selectedDate}
        selectedFilters={filters}
        data={sections}
        setSelectedDate={handleSelectDate}
        onPressClubSelector={handleOpenClubSelector}
        onPressFilterButton={handleClickFiltersButton}
        selectedClub={selectedClub}
        isOpen={isPanelOpen !== undefined}
      />
      {!isLoading ? (
        <LessonList
          areFiltersApplied={filters.length > 0}
          sections={sections}
          listRef={listRef}
          onViewableItemsChanged={handleOnViewableItemsChanged}
          onListScroll={handleOnListScroll}
          onSelectItem={handleSelectLesson}
        />
      ) : (
        <BFLoader />
      )}
      <LessonClubPanel
        selectedClub={selectedClub}
        isOpen={isPanelOpen === 'CLUBS'}
        handleSelectClub={handleSelectClub}
        handleClosePanel={closePanel}
      />
      <LessonFilterPanel
        isOpen={isPanelOpen === 'FILTERS'}
        selectedFilters={filters}
        handleClosePanel={closePanel}
        onApplyFilters={handleApplyFilters}
      />
    </>
  );
};

export default Lesson;
