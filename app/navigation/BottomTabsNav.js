import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewsfeedNav from './NewsfeedNav'
import SettingsNav from './SettingsNav'
import { MaterialCommunityIcons as Icon} from "@expo/vector-icons"
import { G } from './../core/Global'
import I18n from 'react-native-i18n'

const Tab = createBottomTabNavigator();

export default function BottomTabsNav() {
  return (
    <Tab.Navigator initialRouteName="Newsfeed" screenOptions={{headerShown: false}} >
      <Tab.Screen name={I18n.t('newsfeed')} component={NewsfeedNav} options={{
          tabBarIcon: ({ color, size }) => ( <Icon name="home" color={color} size={size} /> ),
          tabBarActiveTintColor:G.baseColor
        }}/>
      <Tab.Screen name={I18n.t('settings')} component={SettingsNav} options={{
          tabBarIcon: ({ color, size }) => ( <Icon name="cog-outline" color={color} size={size} /> ),
          tabBarActiveTintColor:G.baseColor
        }}/>
    </Tab.Navigator>
  );
}
