import { Slot, SplashScreen, useRouter, useSegments } from "expo-router"
import { AuthContextProvider, useAuth } from "@/hooks/useAuth"
import { useEffect } from "react"
import { useFonts } from "expo-font";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Notifications from 'expo-notifications';
import * as TaskManager from "expo-task-manager";
import { NotificationProvider } from "@/hooks/NotificationContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

TaskManager.defineTask(
  BACKGROUND_NOTIFICATION_TASK,
  ({ data, error, executionInfo }) => {
    console.log("✅ Received a notification in the background!", {
      data,
      error,
      executionInfo,
    });
    // Do something with the notification data
  }
);

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

const queryClient = new QueryClient();

const MainLayout = () => {
  const { isAuthenticated } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  const [fontsLoaded, error] = useFonts({
    'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf')
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync()
    else return

    if (typeof isAuthenticated == 'undefined') return
    const inApp = segments[0] == '(app)'
    if (isAuthenticated && !inApp) {
      router.replace('/(app)')
    } else if (isAuthenticated == false) {
      router.replace('/signIn')
    }
  }, [isAuthenticated, fontsLoaded])

  if (!fontsLoaded) {
    return null;
  }

  return <Slot />
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <AuthContextProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <MainLayout />
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </AuthContextProvider>
      </NotificationProvider>
    </QueryClientProvider>
  )
}
