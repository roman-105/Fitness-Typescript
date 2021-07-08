import React, { useState } from 'react';
import Typography from '../../../components/Typography';
import { IClubLesson, IClubLessonData } from '../../../store/models/club/clubModelAdapter';
import {
  SectionList,
  ViewToken,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View
} from 'react-native';
import { Container, Spacer } from '../../../components/Layout/Layout';
import {
  LESSON_CARD_HEIGHT,
  LESSON_HEADER_HEIGHT,
  LESSON_EMPTY_SECTION_ITEM_KEY
} from '../useLesson';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import LessonEmptyContent from '../../../assets/images/club/lesson/lesson_empty_content.png';
import styles from './lesson-list-styles';
import BFLessonCard from '../../../components/Card/Lesson/BFLessonCard';
import FastImage from 'react-native-fast-image';
import formatMessage from 'format-message';

interface LessonListProps {
  sections?: IClubLesson[];
  listRef: any;
  onViewableItemsChanged: (info: {
    viewableItems: Array<ViewToken>;
    changed: Array<ViewToken>;
  }) => void;
  onListScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onSelectItem: (lesson: IClubLessonData) => void;
  areFiltersApplied?: boolean;
}

const EmptyContent = ({ areFiltersApplied }: { areFiltersApplied?: boolean }) => {
  const noContentText: string[] = [formatMessage('No group classes available')];
  if (areFiltersApplied) noContentText.push(formatMessage('that match your search'));

  return (
    <View style={[styles.emptyContent, areFiltersApplied && styles.emptyContentFull]}>
      <FastImage style={styles.emptyContentImage} source={LessonEmptyContent} />
      <Typography align="center" type="regularbfa" fontSize={12}>
        {noContentText.join(', ')}
      </Typography>
    </View>
  );
};

const renderLessonItem = (
  { item }: { item: IClubLesson['data'][0] },
  onSelectItem: (lesson: IClubLessonData) => void
) => {
  if (item.key === LESSON_EMPTY_SECTION_ITEM_KEY) {
    return <EmptyContent />;
  }

  const lesson = item as IClubLessonData;

  return (
    <Container style={styles.cardContainer}>
      <BFLessonCard
        title={lesson.title}
        kind={lesson.kind}
        subtitle={lesson.formattedTime ?? ''}
        isInProgress={lesson.inProgress}
        onPress={() => onSelectItem(lesson)}
      />
    </Container>
  );
};

const LessonList = ({
  sections = [],
  listRef,
  onViewableItemsChanged,
  onListScroll,
  onSelectItem,
  areFiltersApplied
}: LessonListProps) => {
  const [listHeight, setListHeight] = useState<number>(0);

  if (sections.length === 0) {
    return <EmptyContent areFiltersApplied={areFiltersApplied} />;
  }

  return (
    <View onLayout={(e) => setListHeight(e.nativeEvent.layout.height)}>
      <SectionList
        ref={listRef}
        sections={sections}
        renderItem={(item) => renderLessonItem(item, onSelectItem)}
        // @ts-ignore
        getItemLayout={sectionListGetItemLayout({
          getItemHeight: () => LESSON_CARD_HEIGHT,
          getSectionHeaderHeight: (sectionIndex) => (sectionIndex === 0 ? 0 : LESSON_HEADER_HEIGHT)
        })}
        onViewableItemsChanged={onViewableItemsChanged}
        renderSectionHeader={({ section: { title } }) => {
          if (sections.findIndex((section) => section.title === title) === 0) return <></>;
          return (
            <Container style={styles.headerContainer}>
              <Typography fontFamily="trebleHeavy" fontSize={12}>
                {title}
              </Typography>
            </Container>
          );
        }}
        onScroll={onListScroll}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => {
          return <Spacer height={listHeight - LESSON_CARD_HEIGHT - LESSON_HEADER_HEIGHT} />;
        }}
        removeClippedSubviews
      />
    </View>
  );
};

const areEqual = (prevProps: LessonListProps, nextProps: LessonListProps) => {
  return JSON.stringify(prevProps.sections) === JSON.stringify(nextProps.sections);
};

export default React.memo(LessonList, areEqual);
