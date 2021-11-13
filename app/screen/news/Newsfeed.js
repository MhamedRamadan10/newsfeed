import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, ActivityIndicator, Pressable, Image, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Services } from './../../services'
import { useScroll } from './../../hooks'
import { G } from './../../core/Global'
import ExpoFastImage from 'expo-fast-image'
// import {Image} from "react-native-expo-image-cache"

export default function Newsfeed({ navigation }) {

  const [news, setNews] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [page, setPage] = useState(1)
  const [nextPageLoading, setNextPageLoading] = useState(false)

  const { isCloseToBottom } = useScroll()



  useEffect(()=> getNews(1) , [])

  const getNews = (page) => {
    Services.getNews(`?country=us&category=business&page=${page}`, res => {
      if (res.status == 'ok') setNews(news.concat(res.articles))
      if (res.articles == 0) setNextPageLoading(false)
    })
    setIsLoaded(true)
  }

  const getNextPage = () => {
    const nextPage = page+1
    setPage(nextPage)
    setNextPageLoading(true)
    getNews(nextPage)
  }

  return (
    <LinearGradient colors={['#ededed', '#fff']} >
      <ScrollView onScroll={({nativeEvent})=> isCloseToBottom(nativeEvent) && getNextPage() }>
        {isLoaded &&
          <FlatList bounces={false}
            showsVerticalScrollIndicator={false} scrollEnabled={true}
            data={news}
            keyExtractor={(item, index)=> index.toString()}
            renderItem={({item})=> (
              <Pressable onPress={()=>console.log(item.title)}>
                <ExpoFastImage
                  style={{ width: 200, height: 200 }}
                  uri={item.urlToImage}
                  cacheKey={(Math.random () * 10000).toString()}
                />
                <Text>{item.title}</Text>
              </Pressable>
            )}
            extraData={news}
            removeClippedSubviews={true}
          />
        }



        <View style={{paddingBottom:30,marginBottom:20}}>
          <ActivityIndicator style={{alignSelf:'center'}} size="small" color={nextPageLoading?G.baseColor:'#fff'} />
        </View>

      </ScrollView>
    </LinearGradient>
  )
}
