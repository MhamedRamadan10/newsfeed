import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Newsfeed, Single } from './../screen'


const Stack = createNativeStackNavigator()

export default function NewsfeedNav({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Newsfeed">
      <Stack.Screen name="Newsfeed" component={Newsfeed} options={{ headerShown: false }} />
      <Stack.Screen name="Single" component={Single} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
