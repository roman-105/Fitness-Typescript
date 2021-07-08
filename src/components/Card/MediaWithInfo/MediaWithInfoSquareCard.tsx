import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import Typography from '../../Typography';
import styles from './media-info-square-card-styles';
import BFFavourite from '../../Button/BFFavourite';

export interface MediaWithInfoSquareCardProps {
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

const MediaWithInfoSquareCard = ({
  id,
  image,
  name,
  dificulty,
  duration,
  onPress,
  handleNavigate,
  isFavouriteItem
}: MediaWithInfoSquareCardProps) => {
  return (
    <View style={styles.infoContainer}>
      <BFFavourite isFavouriteItem={isFavouriteItem} onPress={onPress} isLargeCard={true} />
      <TouchableOpacity
        style={styles.touchableZone}
        onPress={() => {
          if (handleNavigate) handleNavigate(id);
        }}
      >
        <FastImage
          style={styles.image}
          source={typeof image === 'number' ? image : { uri: image }}
        />
        <View style={styles.textContainer}>
          <Typography
            fontFamily="trebleHeavy"
            uppercase
            maxLines={2}
            fontSize={12}
            light={true}
            style={styles.title}
          >
            {name}
          </Typography>
          <Typography fontFamily="trebleRegular" maxLines={2} fontSize={10} light={true}>
            {`${dificulty} · ${duration}`}
          </Typography>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const areEqual = (
  prevProps: MediaWithInfoSquareCardProps,
  nextProps: MediaWithInfoSquareCardProps
) => prevProps.name === nextProps.name;

export default React.memo(MediaWithInfoSquareCard, areEqual);
