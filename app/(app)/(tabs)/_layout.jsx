import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TabBar } from '@/components/TabBar';

export default function TabLayout() {
  const isDark = useColorScheme() === 'dark' ? true : false

  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={props => <TabBar {...props} />}>
      <Tabs.Screen
        name="startRun"
        options={{
          title: "Start Run"
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="social"
        options={{
          title: 'Social',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile"
        }}
      />
    </Tabs>
  );
}