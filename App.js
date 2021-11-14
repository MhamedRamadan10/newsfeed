import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { BottomTabsNav } from './app/navigation'
import { StatusBar, I18nManager } from 'react-native'
import './app/core/Interceptor'
import 'react-native-gesture-handler'

console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

export default function App() {

  I18nManager.forceRTL(false)

  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#ededed' barStyle="dark-content" />
      <BottomTabsNav />
    </NavigationContainer>
  )
}
