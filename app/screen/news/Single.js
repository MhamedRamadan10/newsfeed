import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, ScrollView, StyleSheet, Pressable, FlatList, StatusBar,ImageBackground } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Services } from './../../services'
import { useScroll } from './../../hooks'
import { G } from './../../core/Global'
import { MaterialCommunityIcons as Icon} from "@expo/vector-icons"
import moment from 'moment'
import I18n from 'react-native-i18n'
import useIsDark from './../../hooks/useIsDark'


export default function Single({ route, navigation }) {

  const [item, setitem] = useState([])

  const { isDark, setIsDark, colors } = useIsDark()

  useEffect(()=> setitem(route.params.item) , [])

  return (
    <LinearGradient colors={isDark?[colors.background, colors.card]:['#ededed', '#fff']} >
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <ScrollView >
        <ImageBackground style={styles.img} source={{uri:item.urlToImage}}  >
          <Icon name={I18n.locale=='en'?'arrow-left':'arrow-right'} style={styles.back} onPress={()=>navigation.goBack()}/>
          <LinearGradient colors={colorsGradient} style={styles.wrapTitle}>
            <Text style={styles.title}>{item.title}</Text>
          </LinearGradient>
        </ImageBackground>

        <View style={[styles.section,{backgroundColor:colors.background}]}>
          <View style={{flexDirection:'row', justifyContent:'space-around', marginVertical:10}}>
            <Text style={[styles.tag]}>{item.author}</Text>
            <Text style={[styles.date,{color:colors.text}]}>{moment(item.publishedAt).calendar()}</Text>
          </View>
          <Text style={{color:colors.text, fontSize:16, paddingHorizontal:15}}>{item.description}</Text>
        </View>

      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  img:{width:'100%', height: G.H*.4, resizeMode:'cover',justifyContent:'space-between'},
  section:{borderTopRightRadius:35,borderTopLeftRadius:35, marginTop:-30, minHeight:G.H*.8},
  title:{color:'#fff', padding:10, fontSize:20, paddingTop:20,paddingBottom:45 },
  tag:{backgroundColor:'#ededed', padding:4, paddingHorizontal:20, margin:10, borderRadius:12},
  date:{fontSize:12, color:'#999',padding:4, paddingHorizontal:20, margin:10, borderRadius:12},
  back:{fontSize:35,backgroundColor:'rgba(0, 0, 0, 0.2)', alignSelf:'flex-start', color:'#fff', padding:10, marginTop:30},
})
const colorsGradient = ['rgba(0, 0, 0, 0.0)','rgba(0, 0, 0, 0.2)','rgba(0, 0, 0, 0.4))','rgba(0, 0, 0, 0.6))', 'rgba(0, 0, 0, 0.8))']
