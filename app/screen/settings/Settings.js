import React, { useEffect, useState, useContext } from 'react'
import { View, Text, ScrollView, ActivityIndicator, Pressable, I18nManager, Switch } from 'react-native'
import { MaterialCommunityIcons as Icon} from "@expo/vector-icons"
import AsyncStorage from '@react-native-async-storage/async-storage'
import I18n from 'react-native-i18n'
import { LinearGradient } from 'expo-linear-gradient'
import { Popup } from './../../components'
import { G } from './../../core/Global'
import { reloadAsync } from 'expo-updates'
import useIsDark from './../../hooks/useIsDark'



export default function Settings({ navigation }) {

  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(true)
  const [isEnabled, setIsEnabled] = useState(false)

  const { isDark, setIsDark, colors } = useIsDark()

    useEffect(()=>setIsEnabled(isDark),[])

  const changeLang = async() => {
    if (I18n.locale == 'en') {
      await AsyncStorage.setItem('@app-lang', 'ar')
      await I18nManager.forceRTL(true)
    }else {
      await AsyncStorage.setItem('@app-lang', 'en')
      await I18nManager.forceRTL(false)
    }
    setTimeout(async () => await reloadAsync(), 100)
  }

  const toggleTheme = async() => {
    setIsEnabled(!isEnabled)
    setIsDark(!isDark)
    let theme = !isDark ? 'dark' : 'light'
    await AsyncStorage.setItem('@app-theme', theme)
  }

  return (
    <LinearGradient colors={isDark?[colors.background, colors.card]:['#ededed', '#fff']} >
      <ScrollView style={{minHeight:G.H, paddingHorizontal:10}}>
        <Text style={{fontSize:20, textAlign:'center', paddingVertical:10, color:colors.text }}>{I18n.t('settings')}</Text>

        <Pressable onPress={()=>setIsOpen(true)} style={{flexDirection:'row', justifyContent:'space-between', backgroundColor:isDark?colors.card:'#fff', borderRadius:12, marginTop:G.H*.02, padding:15, paddingHorizontal:20}}>
          <View style={{flexDirection:'row'}}>
            <View style={{alignSelf:'center', backgroundColor:'#ededed', height:42,width:42,borderRadius:12, justifyContent:'center'}}>
              <Icon name='translate' style={{alignSelf:'center', fontSize:25, color:'#3B93D1'}}/>
            </View>
            <Text style={{color:isDark?colors.text:'#6d6e71', fontSize:16, marginHorizontal:10, alignSelf:'center'}}>{I18n.t('changeLanguage')}</Text>
          </View>
        </Pressable>

        <Pressable onPress={()=>toggleTheme()} style={{flexDirection:'row', justifyContent:'space-between', backgroundColor:isDark?colors.card:'#fff', borderRadius:12, marginTop:G.H*.02, padding:15, paddingHorizontal:20}}>
          <View style={{flexDirection:'row'}}>
            <Switch onValueChange={toggleTheme} value={isEnabled} />

            <Text style={{color:isDark?colors.text:'#6d6e71', fontSize:16, marginHorizontal:10, alignSelf:'center'}}>{I18n.t('darkMode')}</Text>
          </View>
        </Pressable>

      </ScrollView>

      <Popup
        show={isOpen}
        setShow={setIsOpen}
        content={<Text style={{fontSize:20, textAlign:'center', color:colors.text, marginVertical:15}}>{I18n.t('changeLanguageQu')}</Text>}
        onSubmit={changeLang}
      />
    </LinearGradient>
  )
}
