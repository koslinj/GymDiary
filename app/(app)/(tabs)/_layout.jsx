import axios from "@/config/axiosConfig";
import React, { useEffect } from 'react'
import { Tabs } from 'expo-router';
import { TabBar } from '@/components/navigation/TabBar';
import { useNotification } from '@/hooks/NotificationContext';

export default function TabLayout() {
  const { expoPushToken } = useNotification()

  useEffect(() => {
    const updateToken = async () => {
      const response = await axios.post(`/shared/setPushToken`, {push_token: expoPushToken});
    }

    updateToken()
  }, [])

  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={props => <TabBar {...props} />}>
      <Tabs.Screen
        name="start"
        options={{
          title: "Start"
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