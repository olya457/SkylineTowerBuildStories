import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SavedProvider } from './src/context/SavedContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SavedProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#1a2a6c" />
        <AppNavigator />
      </NavigationContainer>
    </SavedProvider>
  );
}