import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { NewsfeedNav } from './app/navigation'
import { StatusBar } from 'react-native'
import './app/core/Interceptor'
import 'react-native-gesture-handler'

console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#ededed' barStyle="dark-content" />
      <NewsfeedNav />
    </NavigationContainer>
  )
}
