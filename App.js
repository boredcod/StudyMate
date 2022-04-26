import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from '@react-navigation/native';
import './config/firebase';
import RootNavigation from './navigation';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

export default function App() {
  let [fontsLoaded] = useFonts({
    'FredokaOne-Regular': require('./assets/fonts/FredokaOne-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (<View>
      <Text>Fonts Loading</Text>
    </View>);
  }
  return (
    <ThemeProvider>
      <RootNavigation />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
