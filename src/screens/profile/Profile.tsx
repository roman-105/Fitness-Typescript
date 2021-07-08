import React from 'react';
import { View, Text } from 'react-native';

const ProfileScreen = () => {
  return (
    <View testID="profile" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
  );
};

export default ProfileScreen;
