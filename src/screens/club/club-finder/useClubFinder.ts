import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import type MapView from 'react-native-maps';
import debounce from 'lodash.debounce';
import { useSelector, useDispatch } from 'react-redux';
import { IClub } from '../../../store/models/club';
import {
  BF_CLUBS_MINIMUM_RESULTS,
  BF_SEARCH_MIN_CHARACTERS,
  BF_SEARCH_DEBOUNCE_DURATION
} from '../../../utils/constants';

const mapEdgePadding = 16;

interface useClubFinderProps {
  currentPosition?: {
    latitude: number;
    longitude: number;
  } | null;
  initialCoordinates?: {
    latitude: number;
    longitude: number;
  } | null;
}

const useClubFinder = ({ currentPosition, initialCoordinates }: useClubFinderProps) => {
  const [showSelectedClub, setShowSelectedClub] = useState<boolean>(false);
  const mapRef = useRef<MapView>();
  const dispatch: Dispatch = useDispatch();
  const [query, setQuery] = useState<string>('');
  const [hasPerfQuery, setHasPerfQuery] = useState<boolean>(false);
  const [isFullView, setIsFullView] = useState<boolean>(false);

  const {
    results,
    numResults,
    selectedClub
  }: { results?: IClub[]; numResults?: number; selectedClub?: IClub } = useSelector(
    (state) => state.clubModel.search
  );
  const homeClub: IClub | undefined = useSelector((state) =>
    state.clubModel.favoriteClubs?.find((club) => club.isHomeClub)
  );

  const toggleFullView = useCallback((value) => {
    setIsFullView(value);
  }, []);

  const debouncedSearch = useMemo(
    () =>
      debounce((input: string) => {
        setShowSelectedClub(false);
        dispatch.clubModel.searchClubs({ query: input });
        setHasPerfQuery(true);
      }, BF_SEARCH_DEBOUNCE_DURATION),
    [dispatch]
  );

  const handleChangeQuery = useCallback(
    (input: string) => {
      setHasPerfQuery(false);
      setQuery(input);
      debouncedSearch.cancel();
      if (input.length === 0) toggleFullView(false);
      if (input && input.length >= BF_SEARCH_MIN_CHARACTERS) debouncedSearch(input);
    },
    [debouncedSearch, toggleFullView]
  );

  useEffect(() => {
    if (hasPerfQuery && numResults && results) {
      if (numResults === 1) {
        results.map(
          (club) => (
            mapRef?.current?.animateToRegion({
              latitude: club.location.lat,
              longitude: club.location.lon,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }),
            2000
          )
        );
      } else {
        mapRef?.current?.fitToCoordinates(
          results.map((club) => ({
            latitude: club.location.lat,
            longitude: club.location.lon
          })),
          {
            edgePadding: {
              top: mapEdgePadding,
              bottom: mapEdgePadding,
              left: mapEdgePadding,
              right: mapEdgePadding
            }
          }
        );
      }
    }
  }, [hasPerfQuery, results, numResults]);

  // UserLocation | homeClubLocation | null
  const coordinates = useMemo(() => {
    if (currentPosition === undefined) return null;

    if (currentPosition) return currentPosition;
    if (homeClub) {
      return {
        latitude: homeClub.location.lat,
        longitude: homeClub.location.lon
      };
    }
    return null;
  }, [currentPosition, homeClub]);

  const handlePressMarker = useCallback(
    (club?: IClub) => {
      // Focus camera on club marker
      if (club)
        mapRef.current?.animateCamera({
          center: { latitude: club.location.lat, longitude: club.location.lon }
        });

      dispatch.clubModel.setSelectedClub(club);
      setShowSelectedClub(true);
    },
    [dispatch, mapRef]
  );

  const handleClearSelectedClub = useCallback(() => {
    setShowSelectedClub(false);
  }, []);

  useEffect(() => {
    if (coordinates === null) return;
    if (query.length === 0) {
      if (initialCoordinates) {
        dispatch.clubModel.searchClubs({
          latitude: initialCoordinates.latitude,
          longitude: initialCoordinates.longitude
        });
      } else if (coordinates) {
        dispatch.clubModel.searchClubs({
          latitude: coordinates.latitude,
          longitude: coordinates.longitude
        });
      }
    }
  }, [dispatch, coordinates, initialCoordinates, query]);

  useEffect(() => {
    const fitToNearbyClubs = async () => {
      if (
        !initialCoordinates &&
        query.length === 0 &&
        numResults &&
        results &&
        numResults >= BF_CLUBS_MINIMUM_RESULTS
      ) {
        const nearbyClubs = results.slice(0, BF_CLUBS_MINIMUM_RESULTS);
        const mapBoundaries = await mapRef.current?.getMapBoundaries();
        if (mapBoundaries && coordinates) {
          if (
            !nearbyClubs.every(
              (nearbyClub) =>
                nearbyClub.location.lat > mapBoundaries?.southWest.latitude &&
                nearbyClub.location.lat < mapBoundaries?.northEast.latitude &&
                nearbyClub.location.lon > mapBoundaries.southWest.longitude &&
                nearbyClub.location.lon < mapBoundaries.northEast.longitude
            )
          ) {
            mapRef?.current?.fitToCoordinates(
              [
                coordinates,
                ...nearbyClubs.map((nearbyClub) => ({
                  latitude: nearbyClub.location.lat,
                  longitude: nearbyClub.location.lon
                }))
              ],
              {
                edgePadding: {
                  top: mapEdgePadding,
                  bottom: mapEdgePadding,
                  left: mapEdgePadding,
                  right: mapEdgePadding
                }
              }
            );
          }
        }
      }
    };

    fitToNearbyClubs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numResults, query]);

  useEffect(() => {
    if (initialCoordinates) {
      // Reset values
      setQuery('');
      setIsFullView(false);
      setHasPerfQuery(false);

      mapRef?.current?.fitToCoordinates([{ ...initialCoordinates }], {
        edgePadding: {
          top: mapEdgePadding,
          bottom: mapEdgePadding,
          left: mapEdgePadding,
          right: mapEdgePadding
        }
      });
    }
  }, [initialCoordinates]);

  useEffect(() => {
    if (
      query.length <= BF_SEARCH_MIN_CHARACTERS &&
      coordinates &&
      numResults !== undefined &&
      numResults < BF_CLUBS_MINIMUM_RESULTS
    ) {
      dispatch.clubModel.searchClubs({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        skipRadius: true
      });
    }
  }, [numResults, coordinates, dispatch, query]);

  useEffect(() => {
    return () => {
      dispatch.clubModel.setSearchClubs(undefined);
    };
  }, [dispatch]);

  return {
    query,
    hasPerfQuery,
    mapRef,
    results,
    isFullView,
    coordinates,
    selectedClub,
    showSelectedClub,
    handlePressMarker,
    handleClearSelectedClub,
    handleChangeQuery,
    toggleFullView
  };
};

export default useClubFinder;
