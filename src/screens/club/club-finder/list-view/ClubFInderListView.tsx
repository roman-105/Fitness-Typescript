import React, { useCallback } from 'react';
import formatMessage from 'format-message';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ChevronRight } from '../../../../components/Icon';
import Typography from '../../../../components/Typography';
import { IClub } from '../../../../store/models/club';
import theme from '../../../../theme';
import styles from './club-finder-list-view-styles';
import ClubLocationCard from '../../../../components/Card/ClubLocationCard/ClubLocationCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../../router/routes';
import BFPaginatedList from '../../../../components/List/BFPaginatedList';
import BFLoader from '../../../../components/Loader/BFLoader';
import { BF_DEFAULT_PAGINATION } from '../../../../utils/constants';
import { Container } from '../../../../components/Layout/Layout';
import { CLUB_LOCATION_CARD_HEIGHT } from '../../../../components/Card/ClubLocationCard/ClubLocationCard';

interface ClubFinderListViewProps {
  data?: IClub[];
  isFullView: boolean;
  onPress: () => void;
  onPressClubCard?: (club: IClub) => void;
}

const ClubFinderListView = ({
  data,
  isFullView,
  onPress,
  onPressClubCard
}: ClubFinderListViewProps) => {
  const dispatch: Dispatch = useDispatch();
  const isSearching = useSelector((state) => state.loading.effects.clubModel.searchClubs);
  const navigation = useNavigation();

  const handleNavigateToClubDetails = useCallback(
    (club: IClub) => {
      dispatch.clubModel.setSingularClub(club);
      navigation.navigate(Routes.ClubSingular);
    },
    [navigation, dispatch]
  );

  // Searching state
  if (isFullView && isSearching) {
    return <BFLoader />;
  }

  // No results state
  if (!data || data?.length === 0) {
    return (
      <View style={styles.emptyContentContainer}>
        <Typography type="regularbfa">
          {formatMessage('Bummer... No results were found. Try another search!')}
        </Typography>
      </View>
    );
  }

  return (
    <>
      <TouchableOpacity style={styles.searchResultsContainer} onPress={onPress}>
        <Typography type="regularbfa">
          {formatMessage(
            `{
      count, plural,
        one {# Result}
      other {# Results}
            }`,
            { count: data.length }
          )}
        </Typography>
        <ChevronRight
          style={!isFullView ? styles.arrowIconUp : styles.arrowIconDown}
          fill={theme.colors.primary.asphaltGrey}
        />
      </TouchableOpacity>
      <BFPaginatedList
        style={styles.listContainer}
        items={data}
        itemHeight={CLUB_LOCATION_CARD_HEIGHT}
        contentType="clubs"
        initialItems={BF_DEFAULT_PAGINATION.CLUB_FINDER_LIST_VIEW.initialItems}
        renderItem={({ item }) => (
          <Container>
            <ClubLocationCard
              club={item}
              onPress={
                onPressClubCard
                  ? () => onPressClubCard(item)
                  : () => handleNavigateToClubDetails(item)
              }
            />
          </Container>
        )}
      />
    </>
  );
};

export default ClubFinderListView;
