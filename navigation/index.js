import React from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import UserStack from './userStack';
import AuthStack from './authStack';
import { NavigationContainer } from '@react-navigation/native';

export default function RootNavigation() {
  //Checks whether there was a user who was previously logged in through the same
  //device.
  const { user } = useAuthentication();

  return (<NavigationContainer>
    {user ? <UserStack /> : <AuthStack />}
  </NavigationContainer>)
  ;
}