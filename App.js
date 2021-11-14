import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { BottomTabsNav } from './app/navigation'
import { StatusBar, I18nManager } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import I18n from 'react-native-i18n'
import AppLoading from 'expo-app-loading'
import { ar, en } from './app/translations'
import './app/core/Interceptor'
import 'react-native-gesture-handler'
import { useForceUpdate } from './app/hooks'

I18n.fallbacks = true
I18n.translations = {en, ar}

console.disableYellowBox = true
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed']

export default function App() {

  const [ isReady, setReady ] = useState(false)
  const { forceUpdate } = useForceUpdate()

  useEffect(()=> init(), [])

  const init = async () => {
    const lang = await AsyncStorage.getItem('@app-lang')
    console.log('lang', lang);
    if (lang) {
      let forceRTL = lang == 'ar'? true : false
      await I18nManager.forceRTL(forceRTL)
      I18n.locale = lang

      console.log('forceRTL',forceRTL)

      forceUpdate()
      setReady(true)
    }else {
      await AsyncStorage.setItem('@app-lang', 'en')
      I18n.locale = 'en'
      I18nManager.forceRTL(false)
      forceUpdate()
    }
  }

  if (!isReady)
  return  <AppLoading startAsync={init} onFinish={()=> setReady(true)} onError={console.warn}/>

  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#ededed' barStyle="dark-content" />
      <BottomTabsNav />
    </NavigationContainer>
  )
}
