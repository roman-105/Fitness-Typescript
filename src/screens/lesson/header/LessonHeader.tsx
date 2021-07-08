import React, { useRef, useEffect } from 'react';
import { View, FlatList, Dimensions, Animated } from 'react-native';
import FlatCarousel from '../../../components/Carousels/FlatCarousel';
import Typography from '../../../components/Typography';
import styles from './lesson-header-styles';
import dayjs, { Dayjs } from 'dayjs';
import { TouchableOpacity } from 'react-native-gesture-handler';
import formatMessage from 'format-message';
import { Container } from '../../../components/Layout/Layout';
import {
  DAY_ITEM_CAROUSEL_WIDTH,
  HEADER_TITLE_HEIGHT,
  CLUB_SELECTOR_CONTAINER
} from './lesson-header-styles';
import { IClubLesson, IClubSingular } from '../../../store/models/club/clubModelAdapter';
import useTimingAnimation from '../../../utils/hooks/useTimingAnimation';
import LessonClubSelector from '../club-selector/LessonClubSelector';
import BFFilterButton from '../../../components/Button/filter/BFFilterButton';
import DateUtils from '../../../utils/dateUtils';

interface Date {
  key: string;
  value: Dayjs;
}

interface LessonHeaderProps {
  selectedDate: number;
  setSelectedDate: (index: number) => void;
  selectedFilters: any[];
  data?: IClubLesson[];
  scrollDirection: 'UP' | 'DOWN' | 'AT_TOP';
  selectedClub?: IClubSingular;
  onPressClubSelector: () => void;
  onPressFilterButton: () => void;
  isOpen: boolean;
}

const dates: Date[] = [];

for (let i = 0; i < 14; i++) {
  const currentDate = dayjs().add(i, 'days');
  dates.push({
    key: `date-${i}`,
    value: currentDate
  });
}

const renderHeaderCarouselItem = (
  { item, index }: { item: Date; index: number },
  selectedDate: number,
  setSelectedDate: (index: number) => void
) => {
  const isSelected = selectedDate === index;
  const textStyle = [
    styles.day,
    isSelected && styles.dayCarouselItemSelected,
    index === 0 && styles.dayCarouselItemCurrentDay
  ];

  return (
    <TouchableOpacity
      style={styles.dayCarouselItem}
      onPress={() => {
        setSelectedDate(index);
      }}
    >
      <Typography
        style={textStyle}
        lineHeight={22}
        fontFamily={isSelected || index === 0 ? 'trebleHeavy' : 'trebleRegular'}
        fontSize={12}
      >
        {DateUtils.formatDateToDayOfTheWeek(item.value)}
      </Typography>
      <Typography
        style={textStyle}
        lineHeight={22}
        fontFamily={isSelected || index === 0 ? 'trebleHeavy' : 'trebleRegular'}
        fontSize={12}
      >
        {item.value.date()}
      </Typography>
    </TouchableOpacity>
  );
};

const LessonHeader = ({
  selectedDate,
  setSelectedDate,
  selectedFilters,
  data,
  scrollDirection,
  selectedClub,
  onPressClubSelector,
  onPressFilterButton,
  isOpen
}: LessonHeaderProps) => {
  const dataCarouselRef = useRef<FlatList<Date>>();
  const animatedHeaderValue = useTimingAnimation({ toValue: scrollDirection === 'DOWN' ? 0 : 1 });

  useEffect(() => {
    dataCarouselRef.current?.scrollToIndex({
      index: selectedDate,
      animated: true,
      viewOffset: Dimensions.get('screen').width / 2 - DAY_ITEM_CAROUSEL_WIDTH / 2
    });
  }, [selectedDate]);

  return (
    <View
      style={[
        styles.container,
        scrollDirection !== 'AT_TOP' && styles.scrollingList,
        isOpen && styles.openPanel
      ]}
    >
      <Animated.View
        style={[
          styles.header,
          {
            height: animatedHeaderValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, HEADER_TITLE_HEIGHT]
            })
          }
        ]}
      >
        <Container style={styles.headerContainer}>
          <Typography fontFamily="trebleHeavy" uppercase fontSize={24}>
            {formatMessage('Group classes')}
          </Typography>

          <BFFilterButton numFilters={selectedFilters.length} onPress={onPressFilterButton} />
        </Container>
      </Animated.View>

      <FlatCarousel
        carouselRef={dataCarouselRef}
        data={dates}
        renderItem={(item) => renderHeaderCarouselItem(item, selectedDate, setSelectedDate)}
        itemWidth={DAY_ITEM_CAROUSEL_WIDTH}
        snapAlignment="start"
      />
      <Animated.View
        style={[
          {
            height: animatedHeaderValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, CLUB_SELECTOR_CONTAINER]
            })
          }
        ]}
      >
        <Container marginVertical={16} style={styles.clubSelectorContainer}>
          <Typography fontFamily="trebleHeavy" fontSize={12}>
            {data ? data[selectedDate].title : ''}
          </Typography>
          {selectedClub && (
            <LessonClubSelector selectedClub={selectedClub} onPress={onPressClubSelector} />
          )}
        </Container>
      </Animated.View>
    </View>
  );
};

export default LessonHeader;
