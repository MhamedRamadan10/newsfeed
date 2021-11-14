import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, ScrollView, ActivityIndicator, Pressable, FlatList, RefreshControl } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Services } from './../../services'
import { useScroll } from './../../hooks'
import { Card, SearchBar } from './../../components'
import { G } from './../../core/Global'
import I18n from 'react-native-i18n'


export default function Newsfeed({ navigation }) {

  const [news, setNews] = useState([])
  const [filteredNews, setFilteredNews] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [page, setPage] = useState(1)
  const [nextPageLoading, setNextPageLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const { isCloseToBottom } = useScroll()



  useEffect(()=> getNews(1) , [])

  // useEffect(()=> getNews(1) , [])

  const getNews = (page) => {
    setIsLoaded(false)
    Services.getNews(`?category=business&page=${page}&language=${I18n.locale}`, res => {
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

      <ScrollView onScroll={({nativeEvent})=> isCloseToBottom(nativeEvent) && filteredNews.length==0 && getNextPage() }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        nestedScrollEnabled={true}>

        <SearchBar news={news} setNews={setFilteredNews} />

        {!isLoaded ?
          <ActivityIndicator style={{alignSelf:'center',height:G.H}} size="small" color={G.baseColor} />
          :
          filteredNews == 'no result' ?
          <Text style={{alignSelf:'center',height:G.H}}> no result</Text>
          :
          <FlatList bounces={false}
            showsVerticalScrollIndicator={false} scrollEnabled={true}
            data={filteredNews.length == 0 ? news : filteredNews}
            keyExtractor={(item, index)=> index.toString()}
            renderItem={({item})=> <Card item={item} onPress={()=>navigation.navigate('Single',{item})}/> }
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
