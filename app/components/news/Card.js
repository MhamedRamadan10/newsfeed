import React from 'react'
import { Text, Pressable, StyleSheet, ImageBackground } from 'react-native'
import ExpoFastImage from 'expo-fast-image'
import { G } from './../../core/Global'
import { LinearGradient } from 'expo-linear-gradient'

export default function Card({ item , onPress}) {

  return (
    <Pressable onPress={onPress} style={styles.wrap}>
      <ImageBackground style={styles.img} imageStyle={{ borderRadius: 12}} source={{uri:item.urlToImage}} >
        <LinearGradient colors={colors} style={styles.wrapTitle}>
          <Text style={styles.title}>{item.title}</Text>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  wrap:{borderRadius: 12,borderColor:'#ededed', borderWidth:1, margin:10, marginBottom:0},
  img:{width:'100%', height: G.H*.25, resizeMode:'cover',justifyContent:'flex-end'},
  title:{color:'#fff', padding:10, fontSize:20, paddingTop:20 },
  wrapTitle:{borderBottomLeftRadius:12, borderBottomRightRadius:12}
})

const colors = ['rgba(0, 0, 0, 0.0)','rgba(0, 0, 0, 0.2)','rgba(0, 0, 0, 0.4))','rgba(0, 0, 0, 0.6))', 'rgba(0, 0, 0, 0.8))']
