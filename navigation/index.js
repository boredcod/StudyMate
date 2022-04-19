import React from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import UserStack from './userStack';
import AuthStack from './authStack';
import { NavigationContainer } from '@react-navigation/native';

export default function RootNavigation() {
  const { user } = useAuthentication();

  return (<NavigationContainer>
    {user ? <UserStack /> : <AuthStack />}
  </NavigationContainer>)
  ;
}