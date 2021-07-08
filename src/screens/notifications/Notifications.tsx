import React from 'react';
import { View, Text } from 'react-native';

const NotificationsScreen = () => {
  return (
    <View
      testID="notifications"
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text>Notifications!</Text>
    </View>
  );
};

export default NotificationsScreen;
