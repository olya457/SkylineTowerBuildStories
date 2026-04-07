import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../types';

import StoriesScreen from '../screens/tabs/StoriesScreen';
import BlogScreen from '../screens/tabs/BlogScreen';
import LocationsScreen from '../screens/tabs/LocationsScreen';
import MapScreen from '../screens/tabs/MapScreen';
import FactsScreen from '../screens/tabs/FactsScreen';
import SavedScreen from '../screens/tabs/SavedScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: Record<keyof TabParamList, any> = {
  Stories: require('../assets/icons/stories.png'),
  Blog: require('../assets/icons/blog.png'),
  Locations: require('../assets/icons/locations.png'),
  Map: require('../assets/icons/map.png'),
  Facts: require('../assets/icons/facts.png'),
  Saved: require('../assets/icons/saved.png'),
};

function TabIcon({
  name,
  focused,
  iconWrapSize,
  iconSize,
  isVerySmall,
}: {
  name: keyof TabParamList;
  focused: boolean;
  iconWrapSize: number;
  iconSize: number;
  isVerySmall: boolean;
}) {
  return (
    <View
      style={[
        styles.iconWrap,
        {
          width: iconWrapSize,
          height: iconWrapSize,
          borderRadius: isVerySmall ? 10 : 12,
        },
        focused && styles.iconWrapActive,
      ]}
    >
      <Image
        source={ICONS[name]}
        style={[
          styles.icon,
          {
            width: iconSize,
            height: iconSize,
            tintColor: focused ? '#FFD700' : '#8899bb',
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

export default function MainTabs() {
  const { width, height } = useWindowDimensions();

  const isSmall = height < 760;
  const isVerySmall = height < 700;

  const bottomOffset = Platform.OS === 'ios' ? 20 : 30;
  const tabBarHeight = isVerySmall ? 58 : isSmall ? 62 : 68;
  const iconWrapSize = isVerySmall ? 36 : isSmall ? 40 : 44;
  const iconSize = isVerySmall ? 18 : isSmall ? 20 : 22;
  const borderRadius = isVerySmall ? 22 : 26;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          left: 0,
          width: width,
          bottom: bottomOffset,
          height: tabBarHeight,
          backgroundColor: '#1a2a6c',
          borderTopWidth: 0,
          borderWidth: 1,
          borderColor: '#2a3a7c',
          borderRadius: borderRadius,
          paddingHorizontal: isVerySmall ? 6 : isSmall ? 8 : 10,
          paddingTop: 0,
          paddingBottom: 0,
          elevation: 12,
          shadowColor: '#000000',
          shadowOpacity: 0.22,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          overflow: 'hidden',
        },
        tabBarItemStyle: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 0,
          marginVertical: 0,
        },
        tabBarIconStyle: {
          width: iconWrapSize,
          height: iconWrapSize,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 0,
        },
        tabBarIcon: ({ focused }) => (
          <TabIcon
            name={route.name as keyof TabParamList}
            focused={focused}
            iconWrapSize={iconWrapSize}
            iconSize={iconSize}
            isVerySmall={isVerySmall}
          />
        ),
      })}
    >
      <Tab.Screen name="Stories" component={StoriesScreen} />
      <Tab.Screen name="Blog" component={BlogScreen} />
      <Tab.Screen name="Locations" component={LocationsScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Facts" component={FactsScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconWrapActive: {
    borderWidth: 1.5,
    borderColor: '#FFD700',
    backgroundColor: 'rgba(255,215,0,0.08)',
  },

  icon: {},
});