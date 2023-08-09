import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Main = () => (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <App />
    </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => Main);
