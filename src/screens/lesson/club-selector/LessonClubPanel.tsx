import React, { useCallback } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { BFSlidingUpPanel } from '../../../components/SlidingUpPanel';
import Typography from '../../../components/Typography';
import { useSelector, useDispatch } from 'react-redux';
import formatMessage from 'format-message';
import { IClub, IClubSingular } from '../../../store/models/club/clubModelAdapter';
import { CheckIcon, HearthIcon, HomeIcon } from '../../../components/Icon';
import theme from '../../../theme';
import styles from './lesson-club-panel-styles';
import { LineSpacer, Spacer } from '../../../components/Layout/Layout';
import { BFButton } from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../router/routes';

interface LessonClubPanelProps {
  selectedClub?: IClubSingular;
  isOpen: boolean;
  handleClosePanel: () => void;
  handleSelectClub: (club: IClub) => void;
}

const renderClubItem = (
  { item }: { item: IClub },
  onSelectClub: (club: IClub) => void,
  selectedClub?: IClubSingular
) => {
  const isSelected = item.clubId === selectedClub?.clubId;

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onSelectClub(item)}>
      <View style={styles.iconContainer}>
        {item.isHomeClub ? (
          <HomeIcon height={20} fill={theme.colors.primary.white} />
        ) : (
          <HearthIcon height={10} fill={theme.colors.primary.white} />
        )}
      </View>
      <View style={styles.contentContainer}>
        <Typography
          style={styles.contentTitle}
          type={isSelected ? 'h2' : 'regularbfa'}
          fontSize={14}
          lineHeight={20}
          maxLines={2}
        >
          {item.name}
        </Typography>
        {isSelected && <CheckIcon fill={theme.colors.secondary.energyGreen} />}
      </View>
    </TouchableOpacity>
  );
};

const LessonClubPanel = ({
  selectedClub,
  isOpen,
  handleSelectClub,
  handleClosePanel
}: LessonClubPanelProps) => {
  const { favoriteClubs } = useSelector((state) => state.clubModel);
  const dispatch: Dispatch = useDispatch();
  const navigation = useNavigation();

  const handleNavigateToClubFinder = useCallback(() => {
    const handlePressClubCard = (club: IClubSingular) => {
      dispatch.clubModel.setSingularClub(club);
      navigation.navigate(Routes.LessonSchedule);
    };

    handleClosePanel();
    navigation.navigate(Routes.ClubFinder, {
      onPressClubCard: handlePressClubCard
    });
  }, [navigation, dispatch, handleClosePanel]);

  return (
    <BFSlidingUpPanel isOpen={isOpen} onOverlayPress={handleClosePanel}>
      <Typography type="h2">{formatMessage('Clubs')}</Typography>
      <Spacer height={24} />
      {favoriteClubs && (
        <FlatList
          data={favoriteClubs}
          renderItem={(item) => renderClubItem(item, handleSelectClub, selectedClub)}
          ItemSeparatorComponent={() => <LineSpacer />}
        />
      )}
      <Spacer height={16} />
      <BFButton title={formatMessage('Search a club')} onPress={handleNavigateToClubFinder} />
    </BFSlidingUpPanel>
  );
};

export default LessonClubPanel;
