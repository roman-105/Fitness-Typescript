import React, { useState, useCallback } from 'react';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import { TriggeringView } from 'react-native-image-header-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';
import theme from '../../theme';
import { ArrowLeftIcon } from '../Icon';
import Typography from '../Typography';
import styles from './bf-header-image-scroll-view-styles';
import {
  DEFAULT_FIXED_MIN_HEIGHT,
  DEFAULT_FIXED_MAX_HEIGHT
} from './bf-header-image-scroll-view-styles';

const FixedForegroundInactive = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={styles.fixedContainer}>
      <TouchableOpacity onPress={onPress} style={styles.fixedBackArrow}>
        <ArrowLeftIcon fill={theme.colors.primary.white} />
      </TouchableOpacity>
    </View>
  );
};

const FixedForegroundActive = ({ onPress, title }: { onPress: () => void; title: string }) => {
  return (
    <View style={styles.fixedContainer}>
      <View style={styles.shadow} />
      <TouchableOpacity
        onPress={onPress}
        style={[styles.fixedBackArrow, styles.fixedBackArrowActive]}
      >
        <ArrowLeftIcon fill={theme.colors.primary.asphaltGrey} />
      </TouchableOpacity>
      <View style={styles.fixedTextContainer}>
        <Typography maxLines={1} type="regularbfa">
          {title}
        </Typography>
      </View>
    </View>
  );
};

interface BFHeaderImageScrollViewProps {
  imageSource: Source | number;
  minHeight?: number;
  maxHeight?: number;
  fixedTitle?: string;
  TagComponent?: React.ReactNode;
  TitleComponent: React.ReactNode;
  children: React.ReactNode;
}

const BFHeaderImageScrollView = ({
  imageSource,
  minHeight = DEFAULT_FIXED_MIN_HEIGHT,
  maxHeight = DEFAULT_FIXED_MAX_HEIGHT,
  TagComponent,
  fixedTitle = '',
  TitleComponent,
  children
}: BFHeaderImageScrollViewProps) => {
  const [isFixedHeader, setIsFixedHeader] = useState<boolean>(false);
  const navigation = useNavigation();

  const handleOnBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* @ts-ignore */}
      <HeaderImageScrollView
        minHeight={minHeight}
        maxHeight={maxHeight}
        style={styles.container}
        disableHeaderGrow
        overlayColor={theme.colors.primary.white}
        maxOverlayOpacity={1}
        minOverlayOpacity={0}
        showsVerticalScrollIndicator={false}
        renderHeader={() => (
          <>
            <FastImage style={styles.image} source={imageSource} />
            {TagComponent}
          </>
        )}
        renderFixedForeground={() =>
          isFixedHeader ? (
            <FixedForegroundActive onPress={handleOnBack} title={fixedTitle} />
          ) : (
            <FixedForegroundInactive onPress={handleOnBack} />
          )
        }
      >
        <TriggeringView onTouchTop={() => setIsFixedHeader(!isFixedHeader)}>
          {TitleComponent}
        </TriggeringView>
        {children}
      </HeaderImageScrollView>
    </View>
  );
};

export default BFHeaderImageScrollView;
