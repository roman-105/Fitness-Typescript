import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowRightIcon } from '../../../components/Icon';
import Typography from '../../../components/Typography';
import { SEARCH_RESULT_TYPES } from '../../../store/models/full-search/fullSearchModel';
import styles from './search-results-styles';
import { Routes } from '../../../router/routes';
import placeholderImage from '../../../assets/images/placeholder/img_placeholder-square.png';
import formatMessage from 'format-message';
import FastImage from 'react-native-fast-image';
import theme from '../../../theme';
import BFPaginatedList from '../../../components/List/BFPaginatedList';
import { LineSpacer } from '../../../components/Layout/Layout';
import { SEARCH_CONTENT_RESULT_CARD_HEIGHT } from './search-results-styles';
import {
  IFullSearchContent,
  FullSearchCardInfoType
} from '../../../store/models/full-search/fullSearchAdapter';

interface Data<T> {
  item: T & { type: SEARCH_RESULT_TYPES; contentType: keyof IFullSearchContent };
  isShowingAll?: boolean;
  index: number;
}

const renderBlockHeader = ({ item }: Data<{ title: string }>) => {
  return (
    <View style={styles.blockHeader}>
      <Typography fontFamily="trebleHeavy" fontSize={12} lineHeight={14} style={styles.lightText}>
        {item.title}
      </Typography>
    </View>
  );
};

const appResultsLookUp: Record<string, string> = {
  Progress: formatMessage('View your progress'),
  Coach: formatMessage('Check your coach area?'),
  'Home Workouts': formatMessage('View all Home workouts'),
  'Club Workouts': formatMessage('View all Club workouts'),
  Programs: formatMessage('View all Programs'),
  'Trainings On-demand': formatMessage('View all audio/video guided trainings'),
  Nutrition: formatMessage('View all Nutrition content'),
  Lifestyle: formatMessage('View all Lifestyle content'),
  Clubs: formatMessage('View all club info'),
  Settings: formatMessage('Go to your settings'),
  Profile: formatMessage('View your profile')
};

const renderAppResults = ({ item }: Data<{ values: { name: string }[] }>, navigation: any) => {
  const handleNavigate = ({ value }: { value: { name: string } }) => {
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.Main }]
    });
    navigation.navigate(value.name.toUpperCase());
  };
  return (
    <View style={styles.appResultsContainer}>
      {item.values.map((value) => (
        <TouchableOpacity onPress={() => handleNavigate({ value })}>
          <View style={styles.appResultItemContainer}>
            <Typography fontFamily="trebleHeavy" fontSize={12} style={styles.appResultItemLabel}>
              {appResultsLookUp[value.name]}
            </Typography>
            <ArrowRightIcon fill={theme.colors.primary.orange} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const renderContentHeader = ({
  item
}: Data<{ title: string; onSeeAll?: () => void; results: any[] }>) => {
  return (
    <View style={styles.contentHeaderContainer}>
      <Typography fontFamily="trebleHeavy" fontSize={12} lineHeight={16} capitalize>
        {item.title}
      </Typography>
      {item.onSeeAll && (
        <TouchableOpacity onPress={item.onSeeAll}>
          <Typography
            style={styles.lightText}
            type="regularbfa"
            fontSize={12}
            lineHeight={16}
          >{`${formatMessage('See All')} (${item.results.length})`}</Typography>
        </TouchableOpacity>
      )}
    </View>
  );
};

const ContentResultCard = ({
  image,
  title,
  subtitle
}: {
  image?: string;
  title: string;
  subtitle?: string;
}) => {
  return (
    <TouchableOpacity style={styles.contentResultCard} onPress={() => {}}>
      <View style={styles.contentResultContainer}>
        <FastImage
          style={styles.contentResultImage}
          source={image ? { uri: image } : placeholderImage}
        />
        <View style={styles.contentResultInnerContainer}>
          {subtitle && subtitle !== '' ? (
            <Typography style={styles.lightText} type="regularbfa" fontSize={12} lineHeight={12}>
              {subtitle}
            </Typography>
          ) : null}
          <Typography fontFamily="trebleHeavy" fontSize={14} lineHeight={14} maxLines={1} uppercase>
            {title}
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const renderContentCard = ({ item }: Data<{ values: { cardInfo: FullSearchCardInfoType }[] }>) => {
  return (
    <View style={styles.contentResults}>
      {item.values.map((contentItem) => (
        <>
          <ContentResultCard
            image={contentItem.cardInfo.image}
            title={contentItem.cardInfo.title}
            subtitle={contentItem.cardInfo.subtitle}
          />
          <LineSpacer marginVertical={8} />
        </>
      ))}
    </View>
  );
};

const renderAllContentItem = ({
  item
}: {
  item: { data: any; cardInfo: FullSearchCardInfoType };
}) => {
  return (
    <ContentResultCard
      image={item.cardInfo.image}
      title={item.cardInfo.title}
      subtitle={item.cardInfo.subtitle}
    />
  );
};

const renderAllContentResults = ({ item }: Data<{ values: any[] }>) => {
  return (
    <BFPaginatedList
      items={item.values}
      contentType={item.contentType}
      renderItem={(_item) => renderAllContentItem({ item: _item.item })}
      itemHeight={SEARCH_CONTENT_RESULT_CARD_HEIGHT}
      showSeparator
      initialItems={12}
    />
  );
};

const renderDataLookUp: Record<SEARCH_RESULT_TYPES, (data: Data<any>, navigation: any) => any> = {
  [SEARCH_RESULT_TYPES.BLOCK_HEADER]: renderBlockHeader,
  [SEARCH_RESULT_TYPES.APP_RESULTS]: renderAppResults,
  [SEARCH_RESULT_TYPES.CONTENT_HEADER]: renderContentHeader,
  [SEARCH_RESULT_TYPES.CONTENT_RESULTS]: renderContentCard,
  [SEARCH_RESULT_TYPES.CONTENT_RESULTS_PAGINATED]: renderAllContentResults
};

const renderResults = (data: Data<{}>, navigation: any) => {
  return renderDataLookUp[data.item.type](data, navigation);
};

export default renderResults;
