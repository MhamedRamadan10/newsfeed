import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { NewsfeedNav } from './app/navigation'
import { StatusBar } from 'react-native'


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#ededed' barStyle="dark-content" />
      <NewsfeedNav />
    </NavigationContainer>
  )
}
