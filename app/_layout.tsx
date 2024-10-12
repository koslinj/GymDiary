import { Slot, SplashScreen, useRouter, useSegments } from "expo-router"
import { AuthContextProvider, useAuth } from "@/hooks/useAuth"
import { useEffect } from "react"
import { useFonts } from "expo-font";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
      <AuthContextProvider>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <MainLayout />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
