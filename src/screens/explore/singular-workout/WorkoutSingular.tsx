import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import { Center } from '../../../components/Layout/Layout';
import Typography from '../../../components/Typography';
import styles from './workout-singular-styles';
import BFLoader from '../../../components/Loader/BFLoader';
import FlatScroll from '../../../components/Layout/FlatScroll/FlatScroll';
import { FooterFromConfig } from '../../../components/Footer';
import { useNavigation } from '@react-navigation/native';
import { BFVideo } from '../../../components/Video';
import { BFCastButton } from '../../../components/CastButton';
import BFTag from '../../../components/Tag/BFTag';
import useScrollHeaderShadow from '../../../utils/hooks/useScrollHeaderShadow';

interface WorkoutSingularProps {
  route?: {
    params?: {
      key?: string;
    };
  };
}

const WorkoutSingular = ({ route }: WorkoutSingularProps) => {
  const workoutId = route?.params?.key;
  const screenFooter = useSelector((state) => state.screenModel.screens.Home);
  const navigation = useNavigation();
  const { scroll } = useScrollHeaderShadow({ navigation: navigation });

  const {
    workoutsModel: { singularWorkout },
    loading: {
      effects: {
        workoutsModel: { getSingularWorkout: isLoading }
      }
    }
  } = useSelector((state) => state);
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    if (workoutId) {
      dispatch.workoutsModel.getSingularWorkout({ ids: workoutId });
    }
  }, [workoutId, dispatch]);

  if (isLoading || !singularWorkout) {
    return (
      <Center>
        <BFLoader style={{ width: 10 }} />
      </Center>
    );
  }

  const videoMock = {
    contentUrl:
      'https://platform.vixyvideo.com/p/380/sp/38000/playManifest/entryId/0_00c0h6zf/format/url/protocol/https',
    streamDuration: 35,
    metadata: {
      images: [
        {
          url:
            'https://static.cdn.vixyvideo.com/p/380/sp/38000/thumbnail/entry_id/0_00c0h6zf/version/100022'
        }
      ],
      title: 'STRETCH RACK CHEST'
    }
  };

  const items = [
    <View testID="workout" style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
      <Typography type="h2" style={styles.titleContainer}>
        {singularWorkout[0].name}
      </Typography>
      <View style={styles.tagContainer}>
        {singularWorkout[0].type.map((element) => {
          return <BFTag key={element.name} title={element.name} orangeColor={true} />;
        })}
      </View>
      <Typography fontFamily="trebleRegular" fontSize={11} style={styles.smallText}>
        {`${singularWorkout[0].level?.map((i: any) => i.title)} · ${
          singularWorkout[0].duration || '30 min'
        } · ${singularWorkout[0].location?.name}`}
      </Typography>
      <Typography fontFamily="trebleRegular" fontSize={11} style={styles.smallText}>
        {singularWorkout[0].administrativeTitle}
      </Typography>
      <Typography fontSize={14} lineHeight={16} style={styles.subtitle} fontFamily="trebleRegular">
        {singularWorkout[0].description}
      </Typography>
    </View>,

    <BFVideo video={videoMock.contentUrl} />,
    <BFCastButton media={videoMock} />,
    <FooterFromConfig
      config={screenFooter?.bottomButtons}
      navigation={navigation}
      dispatch={dispatch}
    />
  ];

  return <FlatScroll style={styles.container} data={items} onScroll={scroll} />;
};

export default WorkoutSingular;
