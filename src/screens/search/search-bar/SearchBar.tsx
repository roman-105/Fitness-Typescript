import React, { useMemo } from 'react';
import { View, Animated } from 'react-native';
import debounce from 'lodash.debounce';
import styles from './search-bar-styles';
import Typography from '../../../components/Typography/Typography';
import formatMessage from 'format-message';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from '../../../components/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BFSearchInput from '../../../components/TextInput/search/BFSearchInput';
import theme from '../../../theme';
import { BF_SEARCH_DEBOUNCE_DURATION, BF_SEARCH_MIN_CHARACTERS } from '../../../utils/constants';
import useTimingAnimation from '../../../utils/hooks/useTimingAnimation';

const SEARCH_HEADER_HEIGHT = 64;

interface SearchBarProps {
  hideHeader: boolean;
  onClearQuery: Function;
  selectedContentKey?: string;
  onClearSelectedContent: () => void;
  isLoading?: boolean;
}

const SearchBar = ({
  hideHeader,
  onClearQuery,
  selectedContentKey,
  onClearSelectedContent,
  isLoading
}: SearchBarProps) => {
  const dispatch: Dispatch = useDispatch();
  const { query } = useSelector((state) => state.fullSearchModel);

  const animatedHeaderHeight = useTimingAnimation({ toValue: hideHeader ? 1 : 0 });

  const debouncedSearch = useMemo(
    () => debounce(dispatch.fullSearchModel.search, BF_SEARCH_DEBOUNCE_DURATION),
    [dispatch]
  );

  return (
    <View
      style={[styles.searchBarContainer, selectedContentKey && styles.searchBarContainerSelected]}
    >
      <Animated.View
        style={{
          height: animatedHeaderHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [SEARCH_HEADER_HEIGHT, 0]
          })
        }}
      >
        <Typography uppercase fontFamily="trebleHeavy" fontSize={24} lineHeight={34}>
          {formatMessage('Search')}
        </Typography>
      </Animated.View>

      <BFSearchInput
        value={query}
        placeholder={formatMessage('How can we help you?')}
        clearable
        onChangeText={(newValue: string) => {
          dispatch.fullSearchModel.setQuery(newValue);
          if (newValue === '') {
            dispatch.fullSearchModel.setResults({ appResults: null, contentResults: null });
            onClearQuery();
          }
          debouncedSearch.cancel();
          if (newValue.length >= BF_SEARCH_MIN_CHARACTERS) debouncedSearch();
        }}
      />
      {selectedContentKey && !isLoading && (
        <View style={styles.selectedContentKeyContainer}>
          <TouchableOpacity onPress={onClearSelectedContent}>
            <CloseIcon fill={theme.colors.primary.asphaltGrey} />
          </TouchableOpacity>
          <Typography
            style={styles.selectedContentKeyLabel}
            uppercase
            fontFamily="trebleHeavy"
            fontSize={16}
          >
            {selectedContentKey}
          </Typography>
        </View>
      )}
    </View>
  );
};

export default SearchBar;
