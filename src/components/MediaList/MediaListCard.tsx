import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Typography from '../Typography';
import BFFavourite from '../Button/BFFavourite';
import styles from './media-list-style';
import { LineSpacer } from '../../components/Layout/Layout';

export interface MediaListCardProps {
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
}

const MediaListCard = ({
  id,
  image,
  name,
  dificulty,
  duration,
  onPress,
  handleNavigate
}: MediaListCardProps) => {
  return (
    <View>
      <BFFavourite onPress={onPress} isLargeCard={false} />
      <TouchableOpacity
        key={id}
        onPress={() => {
          if (handleNavigate) handleNavigate(id);
        }}
        style={styles.container}
      >
        <FastImage
          source={typeof image === 'number' ? image : { uri: image }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Typography
            fontFamily="trebleHeavy"
            uppercase
            maxLines={1}
            fontSize={14}
            style={styles.title}
          >
            {name}
          </Typography>
          <Typography fontFamily="trebleRegular" maxLines={1} fontSize={12} style={styles.subtitle}>
            {`${dificulty} · ${duration}`}
          </Typography>
          <LineSpacer />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const areEqual = (prevProps: MediaListCardProps, nextProps: MediaListCardProps) =>
  prevProps.name === nextProps.name;

export default React.memo(MediaListCard, areEqual);
