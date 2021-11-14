import React, {useEffect, useState} from 'react'
import { Text, TextInput, View, StyleSheet } from 'react-native'
import { MaterialCommunityIcons as Icon} from "@expo/vector-icons"
import { useForceUpdate } from './../../hooks'

export default function Card({ news, setNews}) {
  const [value, setValue] = useState('')

  const { forceUpdate } = useForceUpdate()


  const filter = (e) => {
    const tempArray = [...news];
    setValue(e)
    if (e == '') setNews([])
    const arr = tempArray.filter(e=> e.title.toLowerCase().includes(value))
    e != '' && arr.length == 0 ? setNews('no result') : setNews(arr)
    forceUpdate()
  }

  const clear = () => {
    setValue('')
    setNews([])
  }

  return (
    <View style={styles.wrap}>
      <TextInput
        style={styles.input}
        onChangeText={(e)=>filter(e)}
        value={value}
        placeholder="Filter news"
      />
      {value!='' && <Icon name='close' onPress={clear} style={{fontSize:18, alignSelf:'center', color:'#666'}}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap:{flexDirection:'row',justifyContent:'space-between' ,borderRadius: 30,borderColor:'#ededed', borderWidth:1, margin:10, marginBottom:0, backgroundColor:'#fff', padding:10, paddingHorizontal:20},
  input:{color:'#666',minWidth:'80%'}
})
