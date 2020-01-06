/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  Text,
  StatusBar, View,
} from 'react-native';

const App: React.FC = () => {
  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#321' }}>
      <StatusBar barStyle="dark-content" />
      <Text>
        hello world
      </Text>
    </View>
  );
};

export default App;
