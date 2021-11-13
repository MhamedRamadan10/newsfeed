import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, ScrollView, ActivityIndicator, Pressable, FlatList, RefreshControl } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Services } from './../../services'
import { useScroll } from './../../hooks'
import { Card } from './../../components'
import { G } from './../../core/Global'


export default function Newsfeed({ navigation }) {

  const [news, setNews] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [page, setPage] = useState(1)
  const [nextPageLoading, setNextPageLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const { isCloseToBottom } = useScroll()



  useEffect(()=> getNews(1) , [])

  const getNews = (page) => {
    setIsLoaded(false)
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


  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getNews(1)
      setRefreshing(false)
    });
  }, [])

  return (
    <LinearGradient colors={['#ededed', '#fff']} >
      <ScrollView onScroll={({nativeEvent})=> isCloseToBottom(nativeEvent) && getNextPage() }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

        {!isLoaded ?
          <ActivityIndicator style={{alignSelf:'center',height:G.H}} size="small" color={G.baseColor} />
           :
          <FlatList bounces={false}
            showsVerticalScrollIndicator={false} scrollEnabled={true}
            data={news}
            keyExtractor={(item, index)=> index.toString()}
            renderItem={({item})=> <Card item={item} onPress={()=>console.log('cwf')}/> }
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
