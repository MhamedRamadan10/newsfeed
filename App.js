import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { BottomTabsNav } from './app/navigation'
import { StatusBar, I18nManager } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import I18n from 'react-native-i18n'
import AppLoading from 'expo-app-loading'
import AppContext  from './app/context/AppContext'
import { ar, en } from './app/translations'
import './app/core/Interceptor'
import 'react-native-gesture-handler'

import { AppearanceProvider, useColorScheme } from "react-native-appearance"
import { DefaultTheme, DarkTheme } from "@react-navigation/native"
import { useTheme } from '@react-navigation/native'
import * as Linking from 'expo-linking'


I18n.fallbacks = true
I18n.translations = {en, ar}

console.disableYellowBox = true
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed']

const prefix = Linking.createURL('/')

export default function App() {

  const [ isDark, setIsDark ] = useState(null)
  const [ isReady, setReady ] = useState(false)
  const scheme = useColorScheme()

  const { colors } = useTheme()
  const linking = { prefixes: ['exp://127.0.0.1:19000'],};

  useEffect(()=> init(), [])

  const init = async () => {
    const lang = await AsyncStorage.getItem('@app-lang')
    console.log('lang', lang);
    if (lang) {
      let forceRTL = lang == 'ar'? true : false
      await I18nManager.forceRTL(forceRTL)
      I18n.locale = lang
    }else {
      await AsyncStorage.setItem('@app-lang', 'en')
      I18n.locale = 'en'
      I18nManager.forceRTL(false)
      forceUpdate()
    }

    const storedTheme = await AsyncStorage.getItem('@app-theme')
    storedTheme ? setIsDark(storedTheme=='dark') : setIsDark(scheme === 'dark')
  }

  if (!isReady)
  return  <AppLoading startAsync={init} onFinish={()=> setReady(true)} onError={console.warn}/>

  return (
    <AppContext.Provider value={{isDark, setIsDark }}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme } linking={linking}>
        <StatusBar backgroundColor={isDark ? '#000' : '#ededed'} barStyle={isDark ? 'light-content' : 'dark-content'} />
        <BottomTabsNav />
      </NavigationContainer>
    </AppContext.Provider>
  )
}
