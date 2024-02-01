import React from 'react';
import { Text, View } from 'react-native';

type Props = {}

export  const UnAllowAccessibilityMode = (props: Props) => {
  return (
    <View>
        <Text>Please Disable Accessibilty and Close the app and open it again.</Text>
    </View>
  )
}
