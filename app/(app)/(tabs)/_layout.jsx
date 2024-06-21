import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const isDark = useColorScheme() === 'dark' ? true : false

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: isDark ? '#000' : '#fff',
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={32}
              name={focused ? 'home' : 'home-outline'}
              color={isDark ? '#fff' : '#000'}
              style={{ opacity: focused ? 1 : 0.5 }} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={32}
              name={focused ? 'person' : 'person-outline'}
              color={isDark ? '#fff' : '#000'}
              style={{ opacity: focused ? 1 : 0.5 }} />
          ),
        }}
      />
    </Tabs>
  );
}