import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'; 

import HomeScreen from '../screens/Home';
import UserBoard  from '../screens/UserBoard';
import FriendsPage from '../screens/FriendsPage';
import FriendsSearch from '../screens/FriendsSearch';

const Drawer = createDrawerNavigator();

export default function UserStack() {
  //Navigation stack for the logged in user.
  return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Board" component={UserBoard} />
        <Drawer.Screen name="FriendsPage" component={FriendsPage}/>
        <Drawer.Screen name="Profile Search" component={FriendsSearch}/>
      </Drawer.Navigator>
  );
}