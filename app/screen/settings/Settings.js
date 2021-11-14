import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, ActivityIndicator, Pressable } from 'react-native'
import { MaterialCommunityIcons as Icon} from "@expo/vector-icons"
import AsyncStorage from '@react-native-async-storage/async-storage'
import I18n from 'react-native-i18n'
import { LinearGradient } from 'expo-linear-gradient'
import { Popup } from './../../components'
import { G } from './../../core/Global'
import { reloadAsync } from 'expo-updates'



export default function Settings({ navigation }) {

  const [isOpen, setIsOpen] = useState(false)

  const changeLang = async() => {
    I18n.locale == 'en' ?  await AsyncStorage.setItem('@app-lang', 'ar') : await AsyncStorage.setItem('@app-lang', 'en')
    setTimeout(async () => await reloadAsync(), 100)
  }

  return (
    <LinearGradient colors={['#ededed', '#fff']} >
      <ScrollView style={{minHeight:G.H, paddingHorizontal:10}}>
        <Text style={{fontSize:20, textAlign:'center', paddingVertical:10, }}>{I18n.t('settings')}</Text>

        <Pressable onPress={()=>setIsOpen(true)} style={{flexDirection:'row', justifyContent:'space-between', backgroundColor:'#fff', borderRadius:12, marginTop:G.H*.02, padding:15, paddingHorizontal:20}}>
          <View style={{flexDirection:'row'}}>
            <View style={{alignSelf:'center', backgroundColor:'#ededed', height:42,width:42,borderRadius:12, justifyContent:'center'}}>
              <Icon name='translate' style={{alignSelf:'center', fontSize:25, color:'#3B93D1'}}/>
            </View>
            <Text style={{color:'#6d6e71', fontSize:16, marginHorizontal:10, alignSelf:'center'}}>{I18n.t('changeLanguage')}</Text>
          </View>
        </Pressable>

      </ScrollView>

      <Popup
        show={isOpen}
        setShow={setIsOpen}
        content={<Text style={{fontSize:20, textAlign:'center', marginVertical:15}}>{I18n.t('changeLanguageQu')}</Text>}
        onSubmit={changeLang}
      />
    </LinearGradient>
  )
}
