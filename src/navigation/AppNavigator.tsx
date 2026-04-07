import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

import MainTabs           from './MainTabs';
import SplashScreen       from '../screens/SplashScreen';
import OnboardingScreen   from '../screens/OnboardingScreen';
import InfoScreen         from '../screens/InfoScreen';
import StoryDetailScreen  from '../screens/tabs/StoryDetailScreen';
import BlogDetailScreen   from '../screens/tabs/BlogDetailScreen';
import PlaceDetailScreen  from '../screens/tabs/PlaceDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash"      component={SplashScreen} />
      <Stack.Screen name="Onboarding"  component={OnboardingScreen} />
      <Stack.Screen name="Main"        component={MainTabs} />
      <Stack.Screen name="Info"        component={InfoScreen} />
      <Stack.Screen name="StoryDetail" component={StoryDetailScreen} />
      <Stack.Screen name="BlogDetail"  component={BlogDetailScreen} />
      <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
    </Stack.Navigator>
  );
}