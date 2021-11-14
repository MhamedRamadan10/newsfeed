import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewsfeedNav from './NewsfeedNav'
import SettingsNav from './SettingsNav'
import { MaterialCommunityIcons as Icon} from "@expo/vector-icons"

const Tab = createBottomTabNavigator();

export default function BottomTabsNav() {
  return (
    <Tab.Navigator initialRouteName="Newsfeed" screenOptions={{headerShown: false}} >
      <Tab.Screen name="Newsfeed" component={NewsfeedNav} options={{
          tabBarIcon: ({ color, size }) => ( <Icon name="home" color={color} size={size} /> ),
        }}/>
      <Tab.Screen name="Settings" component={SettingsNav} options={{
          tabBarIcon: ({ color, size }) => ( <Icon name="cog-outline" color={color} size={size} /> ),
        }}/>
    </Tab.Navigator>
  );
}
