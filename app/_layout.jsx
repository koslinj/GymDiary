import { Slot, useRouter, useSegments } from "expo-router"
import { AuthContextProvider, useAuth } from "../context/authContext"
import { useEffect } from "react"
import { useFonts } from "expo-font";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const MainLayout = () => {
  const { isAuthenticated } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  const [fontsLoaded, error] = useFonts({
    'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf')
  });

  useEffect(() => {
    if (typeof isAuthenticated == 'undefined') return
    const inApp = segments[0] == '(app)'
    if (isAuthenticated && !inApp) {
      router.replace('(app)')
    } else if (isAuthenticated == false) {
      router.replace('signIn')
    }
  }, [isAuthenticated])

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
