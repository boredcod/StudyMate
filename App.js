import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from '@react-navigation/native';
import './config/firebase';
import RootNavigation from './navigation';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
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
