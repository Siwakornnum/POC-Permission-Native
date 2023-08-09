import React, { useEffect, useState } from 'react';
import {
  AppState,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Platform
} from 'react-native';

import { WebView } from 'react-native-webview';
import MultitaskBlur from 'react-native-multitask-blur';
import { disallowScreenshot } from 'react-native-screen-capture';
import { BlurView } from "@react-native-community/blur";




export default function App() {

  const [BlurPatformAndroid, setBlurPatformAndroid] = useState<boolean>(false)

  useEffect(() => {
    MultitaskBlur.blur()
    disallowScreenshot(true);

    if(Platform.OS === 'android') {
      const blurEventListener = AppState.addEventListener('blur', () => {
        setBlurPatformAndroid(true)
      });
      const focusEventListener = AppState.addEventListener('focus', () => {
        setBlurPatformAndroid(false)
      });

      
      return () => {
        focusEventListener && focusEventListener.remove();
        blurEventListener && blurEventListener.remove();
      };
    }
  }, [])


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden />
      <View style={styles.container}>
        {/* <WebView source={{ uri: 'https://www.magicboxsolution.com/' }} /> */}
        <WebView source={{ uri: 'https://ifwd.fwd.co.th/' }} />
        {BlurPatformAndroid && <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="white"
        />}
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
