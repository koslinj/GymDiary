import { Slot, useRouter, useSegments } from "expo-router"
import { AuthContextProvider, useAuth } from "../context/authContext"
import { useEffect } from "react"
import { useFonts } from "expo-font";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const { isAuthenticated } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  const [fontsLoaded, error] = useFonts({
    'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf')
  });

  useEffect(() => {
    if (error) throw error
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, error]);

  useEffect(() => {
    if (fontsLoaded) {
      if (typeof isAuthenticated == 'undefined') return
      const inApp = segments[0] == '(app)'
      if (isAuthenticated && !inApp) {
        router.replace('(app)')
      } else if (isAuthenticated == false) {
        router.replace('signIn')
      }
    }
  }, [isAuthenticated, fontsLoaded])

  if (!fontsLoaded && !error) {
    return null;
  }

  return <Slot />
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <SafeAreaProvider>
        <MainLayout />
      </SafeAreaProvider>
    </AuthContextProvider>
  )
}
