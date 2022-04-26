import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'; 

import HomeScreen from '../screens/Home';
import UserBoard  from '../screens/UserBoard';
import FriendsPage from '../screens/FriendsPage';
import FriendsSearch from '../screens/FriendsSearch';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function UserStack() {
  return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Board" component={UserBoard} />
        <Drawer.Screen name="FriendsPage" component={FriendsPage}/>
        <Drawer.Screen name="Profile Search" component={FriendsSearch}/>
      </Drawer.Navigator>
  );
}