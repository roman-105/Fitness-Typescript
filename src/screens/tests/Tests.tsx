import React from 'react';
import { View, Text } from 'react-native';

const TestsScreen = () => {
  return (
    <View testID="tests" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tests!</Text>
    </View>
  );
};

export default TestsScreen;
