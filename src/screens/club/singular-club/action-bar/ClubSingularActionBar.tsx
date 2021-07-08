import React, { useCallback } from 'react';
import { IClubSingular } from '../../../../store/models/club/clubModelAdapter';
import { Container } from '../../../../components/Layout/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { HearthIcon, HearthOutlinedIcon, ShareIcon } from '../../../../components/Icon';
import { TouchableOpacity } from 'react-native';
import theme from '../../../../theme';
import Typography from '../../../../components/Typography';
import formatMessage from 'format-message';
import styles from './club-singular-action-bar-styles';
import { share } from '../../../../utils/share';

const ClubSingularActionBar = ({ club }: { club: IClubSingular }) => {
  const favoriteClubs = useSelector((state) => state.clubModel.favoriteClubs);
  const isLoadingFavorite = useSelector((state) => state.loading.effects.clubModel.toggleFavorite);
  const dispatch: Dispatch = useDispatch();

  const isFavorite =
    favoriteClubs?.find((favoriteClub) => favoriteClub.clubId === club.clubId) !== undefined;

  const handlePressOnFavorite = useCallback(() => {
    dispatch.clubModel.toggleFavorite({ club });
  }, [club, dispatch]);

  const handleOnShare = useCallback(() => {
    share('Club', `club/${club.clubId}`, club.clubImage?.url);
  }, [club]);

  return (
    <Container style={styles.container}>
      {!club.isHomeClub && (
        <TouchableOpacity
          style={styles.actionContainer}
          onPress={handlePressOnFavorite}
          disabled={isLoadingFavorite}
        >
          {isFavorite ? (
            <HearthIcon fill={theme.colors.primary.orange} />
          ) : (
            <HearthOutlinedIcon fill={theme.colors.black} />
          )}
          <Typography style={styles.actionText} type="regularbfa">
            {isFavorite ? formatMessage('Favourited') : formatMessage('Favourite')}
          </Typography>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.actionContainer} onPress={handleOnShare}>
        <ShareIcon fill={theme.colors.black} />
        <Typography style={styles.actionText} type="regularbfa">
          {formatMessage('Share')}
        </Typography>
      </TouchableOpacity>
    </Container>
  );
};

export default ClubSingularActionBar;
