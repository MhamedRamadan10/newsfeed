import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Settings } from './../screen'


const Stack = createNativeStackNavigator()

export default function SettingsNav({ navigation }) {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
