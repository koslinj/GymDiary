import axios from "@/config/axiosConfig";
import React, { useEffect } from 'react'
import { Tabs } from 'expo-router';
import { TabBar } from '@/components/navigation/TabBar';
import { useNotification } from '@/hooks/NotificationContext';
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const { expoPushToken } = useNotification()
  const { t } = useTranslation()

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
          title: t('start')
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: t('home')
        }}
      />
      <Tabs.Screen
        name="social"
        options={{
          title: t('social')
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('profile')
        }}
      />
    </Tabs>
  );
}