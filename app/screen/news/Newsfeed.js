import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, ActivityIndicator, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Services } from './../../services'

export default function Newsfeed({ navigation }) {

  const [news, setNews] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [page, setPage] = useState(1)



  useEffect(()=> getNews() , [])

  const getNews = () => {
    Services.getNews(`?country=us&category=business&page=${page}`, res => setNews(res.articles) )
    setIsLoaded(true)
  }

  return (
    <LinearGradient colors={['#ededed', '#fff']} >
      <ScrollView >
        {isLoaded && news.map((e,k)=>(
          <Pressable key={k} onPress={()=>console.log(e.title)}>
            <Text>{e.title}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </LinearGradient>
  )
}
