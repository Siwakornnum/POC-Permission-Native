import React, { useEffect, useState } from 'react';
import {
  AppState,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Platform,
  AccessibilityInfo,
  Button
} from 'react-native';

import { WebView } from 'react-native-webview';

// Disable ScreenShot and Blur Screen in ios
import { disallowScreenshot } from 'react-native-screen-capture';
import MultitaskBlur from 'react-native-multitask-blur';

// Blur Screen in Android 
import { BlurView } from "@react-native-community/blur";
import { UnAllowAccessibilityMode } from './src/components/UnAllowAccessibilityMode/UnAllowAccessibilityMode';

// Check root or jailbreak 
import JailMonkey from 'jail-monkey'


import analytics from '@react-native-firebase/analytics'



export default function App() {

  const [BlurPatformAndroid, setBlurPatformAndroid] = useState<boolean>(false)
  const [accessibilityPatformAndroid, setAccessibilityPatformAndroid] = useState<boolean>(false)

  useEffect(() => {
    MultitaskBlur.blur()
    disallowScreenshot(true);

    if (JailMonkey.isJailBroken()) {
      console.log('bad device')
      // Alternative behaviour for jail-broken/rooted devices.
    } else {
      console.log('good device')
    }

    if (Platform.OS === 'android') {
      const blurEventListener = AppState.addEventListener('blur', () => {
        setBlurPatformAndroid(true)
      });
      const focusEventListener = AppState.addEventListener('focus', () => {
        setBlurPatformAndroid(false)
      });

      checkAccessibilityEnabled()

      return () => {
        focusEventListener && focusEventListener.remove();
        blurEventListener && blurEventListener.remove();
      };
    }
  }, [BlurPatformAndroid])


  const checkAccessibilityEnabled = async () => {
    const isEnabled = await AccessibilityInfo.isScreenReaderEnabled();
    setAccessibilityPatformAndroid(isEnabled)
  };

  if (accessibilityPatformAndroid) return <UnAllowAccessibilityMode />

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden />
      <View style={styles.container}>
        <WebView
          source={{ uri: 'https://scbclportal.sit.fwd.co.th/login?redirect=/dashboard' }}
          incognito={true}
        />

        {BlurPatformAndroid && <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="white"
        />}
      </View>
      <Button
        title="Add To Basket"
        onPress={async () =>
          await analytics().logEvent('basket', {
            id: 3745092,
            item: 'mens grey t-shirt',
            description: ['round neck', 'long sleeved'],
            size: 'L',
          })
        }
      />
      <Button
        title="Press me"
        // Logs in the firebase analytics console as "select_content" event
        // only accepts the two object properties which accept strings.
        onPress={async () =>
          await analytics().logSelectContent({
            content_type: 'clothing',
            item_id: 'abcd',
          })
        }
      />
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
