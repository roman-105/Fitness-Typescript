import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NativeScrollEvent, NativeSyntheticEvent, SectionList, ViewToken } from 'react-native';
import { IClub, IClubLessonData } from '../../store/models/club/clubModelAdapter';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../router/routes';

export const LESSON_CARD_HEIGHT = 80;
export const LESSON_HEADER_HEIGHT = 50;
export const LESSON_EMPTY_SECTION_ITEM_KEY = 'LESSON_EMPTY_SECTION_ITEM_KEY';

const SCROLL_DELTA = 15;

export type LessonFilterType = {
  key: string;
  value: any;
};

const useLesson = () => {
  const navigation = useNavigation();
  const dispatch: Dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<'UP' | 'DOWN' | 'AT_TOP'>('AT_TOP');
  const [filters, setFilters] = useState<LessonFilterType[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState<undefined | 'CLUBS' | 'FILTERS'>();

  const listRef = useRef<SectionList>();
  const listOffsetRef = useRef<number>(0);

  const {
    clubModel: { lessons, singularClub: selectedClub },
    loading: {
      effects: {
        clubModel: { getClubLessons: isLoading }
      }
    }
  } = useSelector((state) => state);

  const sections = useMemo(() => {
    if (lessons) {
      return lessons.map((lesson) => ({
        ...lesson,
        data: lesson.data.length === 0 ? [{ key: LESSON_EMPTY_SECTION_ITEM_KEY }] : lesson.data
      }));
    }
  }, [lessons]);

  const performSearch = useCallback(() => {
    if (selectedClub) {
      const filterObj = filters.reduce((acc, key) => {
        if (typeof key.value === 'object' && key.value !== null && !Array.isArray(key.value)) {
          return {
            ...acc,
            ...key.value
          };
        }
        return {
          ...acc,
          [key.key]: key.value
        };
      }, {});

      dispatch.clubModel.getClubLessons({ clubId: selectedClub.clubId, filters: filterObj });
    }
  }, [selectedClub, dispatch, filters]);

  useEffect(() => {
    performSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClub, dispatch, filters]);

  const handleSelectDate = useCallback((index: number) => {
    listRef.current?.scrollToLocation({
      sectionIndex: index,
      itemIndex: 0,
      viewOffset: 0,
      animated: true,
      viewPosition: 0
    });
  }, []);

  const handleOnViewableItemsChanged = useCallback(
    (info: { viewableItems: Array<ViewToken>; changed: Array<ViewToken> }) => {
      if (lessons) {
        const index = lessons.findIndex((item) => {
          return item.title === info.viewableItems.find((v) => v.index !== null)?.section?.title;
        });

        if (index !== -1) {
          setSelectedDate(index);
        }
      }
    },
    [lessons]
  );

  const handleOnListScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (listOffsetRef.current !== undefined) {
      const currentOffset = event.nativeEvent.contentOffset.y;

      if (currentOffset > 0) {
        const diff = currentOffset - (listOffsetRef.current || 0);

        listOffsetRef.current = currentOffset;

        // If is at bottom
        if (
          currentOffset >
          event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height
        ) {
          return setScrollDirection('DOWN');
        }

        // If is scrolling
        if (Math.abs(diff) >= SCROLL_DELTA) {
          return setScrollDirection(diff >= 0 ? 'DOWN' : 'UP');
        }
        return;
      }
      setScrollDirection('AT_TOP');
    }
  }, []);

  const closePanel = useCallback(() => {
    setIsPanelOpen(undefined);
  }, []);

  const handleOpenClubSelector = useCallback(() => {
    setIsPanelOpen('CLUBS');
  }, []);

  const handleClickFiltersButton = useCallback(() => {
    setIsPanelOpen('FILTERS');
  }, []);

  const handleSelectClub = useCallback(
    (club: IClub) => {
      dispatch.clubModel.setSingularClub(club);
      closePanel();
    },
    [closePanel, dispatch]
  );

  const handleApplyFilters = useCallback((filterParams: LessonFilterType[]) => {
    return setFilters(filterParams);
  }, []);

  const handleSelectLesson = useCallback(
    (lesson: IClubLessonData) => {
      dispatch.clubModel.setSingularLesson(lesson);
      navigation.navigate(Routes.LessonSingular);
    },
    [dispatch, navigation]
  );

  return {
    sections,
    scrollDirection,
    isPanelOpen,
    selectedClub,
    filters,
    isLoading,
    selectedDate,
    listRef,
    setSelectedDate,
    handleSelectDate,
    handleOnViewableItemsChanged,
    handleOpenClubSelector,
    handleClickFiltersButton,
    handleSelectClub,
    handleSelectLesson,
    handleApplyFilters,
    performSearch,
    closePanel,
    handleOnListScroll
  };
};

export default useLesson;
