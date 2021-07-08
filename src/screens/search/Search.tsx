import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import styles from './search-styles';
import formatMessage from 'format-message';
import renderResults from './results/render-results';
import { useNavigation } from '@react-navigation/native';
import SearchBar from './search-bar/SearchBar';
import Typography from '../../components/Typography/Typography';
import { ExternalIcon, HelpIcon } from '../../components/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { findAllIndexes } from '../../utils/utils';
import useSearch from './useSearch';
import { SEARCH_RESULT_TYPES } from '../../store/models/full-search/fullSearchModel';
import { ISelectedContent } from './useSearch';
import BFLoader from '../../components/Loader/BFLoader';
import { Container } from '../../components/Layout/Layout';
import theme from '../../theme';
import { BF_SEARCH_MIN_CHARACTERS } from '../../utils/constants';

interface IRenderResultList {
  listRef: any;
  combinedData: any[] | null;
  selectedContent: ISelectedContent | null;
  setIsScrolling: (condition: boolean) => void;
  navigation: any;
}

const renderResultList = ({
  listRef,
  combinedData,
  selectedContent,
  setIsScrolling,
  navigation
}: IRenderResultList) => {
  if (!combinedData && !selectedContent) {
    return;
  }

  if (selectedContent) {
    return (
      <FlatList
        ref={listRef}
        showsVerticalScrollIndicator={false}
        scrollEnabled={(selectedContent?.data.length ?? 0) > 0}
        keyExtractor={(item) => item.contentType}
        onScroll={(event) => {
          const scrollOffset = event.nativeEvent.contentOffset.y;
          if (
            listRef?.current?._listRef._scrollMetrics.contentLength >
            Dimensions.get('screen').height
          )
            setIsScrolling(scrollOffset > 0);
        }}
        data={selectedContent.data}
        renderItem={({ ...data }) => renderResults(data, navigation)}
      />
    );
  }

  return (
    <>
      <FlatList
        ref={listRef}
        showsVerticalScrollIndicator={false}
        scrollEnabled={(combinedData?.length ?? 0) > 0}
        keyExtractor={(item) => item.key ?? item.title}
        onScroll={(event) => {
          const scrollOffset = event.nativeEvent.contentOffset.y;
          if (
            listRef?.current?._listRef._scrollMetrics.contentLength >
            Dimensions.get('screen').height
          )
            setIsScrolling(scrollOffset > 0);
        }}
        data={combinedData}
        renderItem={({ ...data }) => renderResults(data, navigation)}
        stickyHeaderIndices={
          combinedData && findAllIndexes(combinedData, 'type', SEARCH_RESULT_TYPES.CONTENT_HEADER)
        }
      />
    </>
  );
};

const SearchScreen = () => {
  const navigation = useNavigation();
  const {
    isScrolling,
    isLoading,
    combinedData,
    listRef,
    selectedContent,
    query,
    handleClearQuery,
    handleClearSelectedContent,
    setIsScrolling
  } = useSearch();

  return (
    <Container testID="search" style={styles.container}>
      <SearchBar
        hideHeader={isScrolling}
        onClearQuery={handleClearQuery}
        selectedContentKey={selectedContent?.title}
        onClearSelectedContent={handleClearSelectedContent}
        isLoading={isLoading}
      />
      {query?.length > 0 && query?.length < BF_SEARCH_MIN_CHARACTERS && (
        <View style={styles.noResultsContainer}>
          <Typography align="center" type="regularbfa" lineHeight={36}>
            {formatMessage('Please enter more than 2 characters to perform the search.')}
          </Typography>
        </View>
      )}
      {isLoading ? (
        <BFLoader />
      ) : combinedData?.length === 0 && query?.length >= BF_SEARCH_MIN_CHARACTERS ? (
        <View style={styles.noResultsContainer}>
          <Typography align="center" type="regularbfa" lineHeight={36}>
            {formatMessage('Bummer...\nNo results were found.\nTry another search!')}
          </Typography>
          <TouchableOpacity style={styles.noResultsHelpLinkTouchable} onPress={() => {}}>
            <View style={styles.noResultsHelpLinkContainer}>
              <View style={styles.noResultsHelpLinkInnerContainer}>
                <HelpIcon />
                <Typography
                  style={styles.noResultsHelpLinkText}
                  fontSize={12}
                  lineHeight={14}
                  fontFamily="trebleHeavy"
                >
                  {formatMessage('Help')}
                </Typography>
              </View>
              <ExternalIcon strokeWidth={2} stroke={theme.colors.primary.asphaltGrey} />
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        renderResultList({
          listRef,
          combinedData,
          selectedContent,
          setIsScrolling,
          navigation
        })
      )}
    </Container>
  );
};

export default SearchScreen;
