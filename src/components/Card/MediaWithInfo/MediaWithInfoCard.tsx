import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Typography from '../../Typography';
import styles from './media-info-card-styles';
import BFFavourite from '../../Button/BFFavourite';

export interface MediaWithInfoCardProps {
  id?: string;
  picture?: {
    url?: string;
  };
  image?: string | undefined;
  name: string;
  dificulty?: string;
  level?: any;
  duration: string;
  onPress?: () => void;
  handleNavigate?: (id: string | undefined) => void;
  isFavouriteItem?: boolean;
}

const MediaWithInfoCard = ({
  id,
  image,
  name,
  dificulty,
  duration,
  onPress,
  handleNavigate,
  isFavouriteItem
}: MediaWithInfoCardProps) => {
  return (
    <View style={styles.infoContainer}>
      <BFFavourite isFavouriteItem={isFavouriteItem} onPress={onPress} isLargeCard={true} />
      <TouchableOpacity
        style={styles.touchableZone}
        onPress={() => {
          if (handleNavigate) handleNavigate(id);
        }}
      >
        <Image source={typeof image === 'number' ? image : { uri: image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Typography
            fontFamily="trebleHeavy"
            uppercase
            maxLines={2}
            fontSize={16}
            light={true}
            style={styles.title}
          >
            {name}
          </Typography>
          <Typography
            fontFamily="trebleRegular"
            maxLines={1}
            fontSize={11}
            light={true}
            style={styles.subtitle}
          >
            {`${dificulty} · ${duration}`}
          </Typography>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const areEqual = (prevProps: MediaWithInfoCardProps, nextProps: MediaWithInfoCardProps) =>
  prevProps.name === nextProps.name;

export default React.memo(MediaWithInfoCard, areEqual);
