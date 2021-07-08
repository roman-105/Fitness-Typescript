import React, { useEffect } from 'react';
import FlatScroll from '../../components/Layout/FlatScroll/FlatScroll';
import { useDispatch, useSelector } from 'react-redux';
import { FooterFromConfig } from '../../components/Footer';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { BFVideo } from '../../components/Video';
import { BFCastButton } from '../../components/CastButton';
import useScrollHeaderShadow from '../../utils/hooks/useScrollHeaderShadow';

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

const ProgramsScreen = () => {
  const dispatch = useDispatch();
  const screenFooter = useSelector((state) => state.screenModel.screens.Explore);
  const navigation = useNavigation();
  const { scroll } = useScrollHeaderShadow({ navigation: navigation.dangerouslyGetParent() });

  useEffect(() => {
    dispatch.screenModel.fetch();
  }, [dispatch]);

  const items = [
    <View testID="programs" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Programs!</Text>
    </View>,

    <BFVideo video={videoMock.contentUrl} />,
    <BFCastButton media={videoMock} />,
    <FooterFromConfig
      config={screenFooter?.bottomButtons}
      navigation={navigation}
      dispatch={dispatch}
    />
  ];

  return <FlatScroll data={items} onScroll={scroll} />;
};

export default ProgramsScreen;
