import React, { useMemo, useCallback, useRef } from 'react';
import { View, Animated, LayoutRectangle } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Typography from '../../../components/Typography';
import styles from './club-finder-styles';
import formatMessage from 'format-message';
import ClubMarker from '../../../assets/images/club/club_marker.png';
import ClubMarkerSmall from '../../../assets/images/club/club_marker_small.png';
import ClubSelectedMarker from '../../../assets/images/club/club_selected_marker.png';
import useCurrentLocation from '../../../utils/hooks/useCurrentLocation';
import useClubFinder from './useClubFinder';
import useTimingAnimation from '../../../utils/hooks/useTimingAnimation';
import {
  SELECTED_CLUB_CONTAINER_HEIGHT,
  SEARCH_RESULTS_CONTAINER_HEIGHT
} from './club-finder-styles';
import { IClub, IClubSingular } from '../../../store/models/club/clubModelAdapter';
import ClubLocationCard from '../../../components/Card/ClubLocationCard/ClubLocationCard';
import { BFSearchInput } from '../../../components/TextInput/search';
import { BF_SEARCH_MIN_CHARACTERS } from '../../../utils/constants';
import ClubFinderListView from './list-view/ClubFInderListView';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../router/routes';
import { useDispatch } from 'react-redux';
import { Container } from '../../../components/Layout/Layout';

const getMarkerImage = (club: IClub, showSelectedClub: boolean, selectedClub?: IClub) => {
  if (showSelectedClub && selectedClub) {
    return selectedClub.clubId === club.clubId ? ClubSelectedMarker : ClubMarkerSmall;
  }
  return ClubMarker;
};

const LATITUDE_DELTA = 0.25;
const LONGITUDE_DELTA = 0.25;

interface ClubFinderProps {
  route?: {
    params?: {
      preSelectedClub?: IClubSingular;
      onPressClubCard?: (club: IClub) => void;
    };
  };
}

const ClubFinder = ({ route }: ClubFinderProps) => {
  const preSelectedClub = route?.params?.preSelectedClub;
  const initialCoordinates:
    | { latitude: number; longitude: number }
    | undefined
    | null = useMemo(() => {
    return (
      preSelectedClub && {
        latitude: preSelectedClub.location.lat,
        longitude: preSelectedClub.location.lon
      }
    );
  }, [preSelectedClub]);

  const onPressClubCard = route?.params?.onPressClubCard;

  const { currentPosition } = useCurrentLocation({});
  const dispatch: Dispatch = useDispatch();
  const navigation = useNavigation();
  const mapLayout = useRef<LayoutRectangle>();

  const {
    query,
    hasPerfQuery,
    isFullView,
    mapRef,
    coordinates,
    results,
    selectedClub,
    showSelectedClub,
    handlePressMarker,
    handleClearSelectedClub,
    handleChangeQuery,
    toggleFullView
  } = useClubFinder({ currentPosition, initialCoordinates });

  const handleNavigateToClubDetails = useCallback(() => {
    if (selectedClub) {
      dispatch.clubModel.setSingularClub(selectedClub);
      navigation.navigate(Routes.ClubSingular);
    }
  }, [navigation, dispatch, selectedClub]);

  const animatedShowSelectedValue = useTimingAnimation({ toValue: showSelectedClub ? 1 : 0 });

  const animatedQueryResultsValue = useTimingAnimation({
    toValue: isFullView
      ? 2
      : !showSelectedClub && hasPerfQuery && results && query.length >= BF_SEARCH_MIN_CHARACTERS
      ? 1
      : 0
  });

  const animatedSearchBarValue = useTimingAnimation({
    toValue: isFullView ? 1 : 0
  });

  const initialRegion = useMemo(() => {
    if (coordinates)
      return {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };
    if (initialCoordinates)
      return {
        latitude: initialCoordinates.latitude,
        longitude: initialCoordinates.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };
  }, [coordinates, initialCoordinates]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Typography type="h2">{formatMessage('Club Finder')}</Typography>
      </View>
      <MapView
        onLayout={(e) => (mapLayout.current = e.nativeEvent.layout)}
        onPress={handleClearSelectedClub}
        // @ts-ignore
        ref={mapRef}
        style={styles.map}
        showsUserLocation={currentPosition !== null}
        initialRegion={initialRegion}
      >
        {query.length === 0 && preSelectedClub && (
          <Marker
            stopPropagation
            identifier={preSelectedClub.clubId}
            key={preSelectedClub.clubId}
            onPress={() => {
              handlePressMarker(preSelectedClub);
            }}
            image={getMarkerImage(preSelectedClub, showSelectedClub, selectedClub)}
            coordinate={{
              latitude: preSelectedClub.location.lat,
              longitude: preSelectedClub.location.lon
            }}
          />
        )}
        {results &&
          results.map((club) => {
            return (
              <Marker
                stopPropagation
                identifier={club.clubId}
                key={club.clubId}
                onPress={() => {
                  handlePressMarker(club);
                }}
                image={getMarkerImage(club, showSelectedClub, selectedClub)}
                coordinate={{
                  latitude: club.location.lat,
                  longitude: club.location.lon
                }}
              />
            );
          })}
      </MapView>

      <Animated.View
        style={[
          styles.searchContainer,
          {
            top: animatedSearchBarValue.interpolate({
              inputRange: [0, 1],
              outputRange: [SEARCH_RESULTS_CONTAINER_HEIGHT, -20]
            })
          }
        ]}
      >
        <BFSearchInput
          value={query}
          onChangeText={handleChangeQuery}
          placeholder={formatMessage('Search by name or postcode')}
          clearable
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.selectedClubContainer,
          {
            height: animatedShowSelectedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, SELECTED_CLUB_CONTAINER_HEIGHT]
            })
          }
        ]}
      >
        {selectedClub && (
          <Container>
            <ClubLocationCard
              club={selectedClub}
              onPress={
                onPressClubCard ? () => onPressClubCard(selectedClub) : handleNavigateToClubDetails
              }
            />
          </Container>
        )}
      </Animated.View>
      {mapLayout.current && (
        <Animated.View
          style={[
            styles.resultsContainer,
            isFullView && styles.resultsContainerFullView,
            {
              height: animatedQueryResultsValue.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [0, SEARCH_RESULTS_CONTAINER_HEIGHT, mapLayout.current.height]
              })
            }
          ]}
        >
          <ClubFinderListView
            isFullView={isFullView}
            data={results}
            onPressClubCard={onPressClubCard}
            onPress={() => toggleFullView(!isFullView)}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default ClubFinder;
