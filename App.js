import React from 'react';
import { SafeAreaView } from 'react-native';
import { RootNavigator } from "./App/navigation"

export default () => {
  return (
    <SafeAreaView>
      <RootNavigator />
    </SafeAreaView>
  )
}
