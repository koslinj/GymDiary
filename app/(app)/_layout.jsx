
import { FriendPageHeader } from '@/components/pages/friends/FriendPageHeader'
import { ThemedText, ThemedView } from '@/components/ThemedComponents'
import { useGlobalStyles } from '@/hooks/useGlobalStyles'
import { AntDesign } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'
import { TouchableOpacity, useColorScheme, View } from 'react-native'

const AppLayout = () => {
  const styles = useGlobalStyles();
  const theme = useColorScheme()
  const router = useRouter()

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name='(screens)/stats' options={{
        header: () => (
          <ThemedView lightClassName='bg-slate-300' darkClassName='bg-slate-800' style={[{ padding: 12 }, styles.safeArea]}>
            <View>
              <TouchableOpacity className="absolute z-10" onPress={() => { router.back() }}>
                <AntDesign color={theme === "light" ? "black" : "white"} name='arrowleft' size={42} />
              </TouchableOpacity>
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>Stats</ThemedText>
            </View>
          </ThemedView>
        )
      }} />
      <Stack.Screen name='(screens)/friends' options={{
        header: () => (
          <ThemedView lightClassName='bg-slate-300' darkClassName='bg-slate-800' style={[{ padding: 12 }, styles.safeArea]}>
            <View>
              <TouchableOpacity className="absolute z-10" onPress={() => { router.back() }}>
                <AntDesign color={theme === "light" ? "black" : "white"} name='arrowleft' size={42} />
              </TouchableOpacity>
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>Friends</ThemedText>
            </View>
          </ThemedView>
        )
      }} />
      <Stack.Screen name='(screens)/records' options={{
        header: () => (
          <ThemedView lightClassName='bg-slate-300' darkClassName='bg-slate-800' style={[{ padding: 12 }, styles.safeArea]}>
            <View>
              <TouchableOpacity className="absolute z-10" onPress={() => { router.back() }}>
                <AntDesign color={theme === "light" ? "black" : "white"} name='arrowleft' size={42} />
              </TouchableOpacity>
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>Records</ThemedText>
            </View>
          </ThemedView>
        )
      }} />
      <Stack.Screen name='(screens)/history' options={{
        header: () => (
          <ThemedView lightClassName='bg-slate-300' darkClassName='bg-slate-800' style={[{ padding: 12 }, styles.safeArea]}>
            <View>
              <TouchableOpacity className="absolute z-10" onPress={() => { router.back() }}>
                <AntDesign color={theme === "light" ? "black" : "white"} name='arrowleft' size={42} />
              </TouchableOpacity>
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>History</ThemedText>
            </View>
          </ThemedView>
        )
      }} />
      <Stack.Screen name='(screens)/quick' options={{
        header: () => (
          <ThemedView lightClassName='bg-slate-300' darkClassName='bg-slate-800' style={[{ padding: 12 }, styles.safeArea]}>
            <View>
              <TouchableOpacity className="absolute z-10" onPress={() => { router.back() }}>
                <AntDesign color={theme === "light" ? "black" : "white"} name='arrowleft' size={42} />
              </TouchableOpacity>
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>Choose exercises</ThemedText>
            </View>
          </ThemedView>
        )
      }} />
      <Stack.Screen name='(screens)/sets' options={{
        header: () => (
          <ThemedView lightClassName='bg-slate-300' darkClassName='bg-slate-800' style={[{ padding: 12 }, styles.safeArea]}>
            <View>
              <TouchableOpacity className="absolute z-10" onPress={() => { router.back() }}>
                <AntDesign color={theme === "light" ? "black" : "white"} name='arrowleft' size={42} />
              </TouchableOpacity>
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>Put sets data</ThemedText>
            </View>
          </ThemedView>
        )
      }} />
      <Stack.Screen name='(screens)/post' options={{
        header: () => (
          <ThemedView lightClassName='bg-slate-300' darkClassName='bg-slate-800' style={[{ padding: 12 }, styles.safeArea]}>
            <View>
              <TouchableOpacity className="absolute z-10" onPress={() => { router.back() }}>
                <AntDesign color={theme === "light" ? "black" : "white"} name='arrowleft' size={42} />
              </TouchableOpacity>
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>Post Details</ThemedText>
            </View>
          </ThemedView>
        )
      }} />
      <Stack.Screen name='(screens)/inviteUser' options={{
        header: () => (
          <ThemedView lightClassName='bg-slate-300' darkClassName='bg-slate-800' style={[{ padding: 12 }, styles.safeArea]}>
            <View>
              <TouchableOpacity className="absolute z-10" onPress={() => { router.back() }}>
                <AntDesign color={theme === "light" ? "black" : "white"} name='arrowleft' size={42} />
              </TouchableOpacity>
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>Invite User</ThemedText>
            </View>
          </ThemedView>
        )
      }} />
      <Stack.Screen
        name='(screens)/friend/[id]'
        options={({ route }) => {
          const { id } = route.params;
          return {
            header: () => (
              <FriendPageHeader id={id} theme={theme} router={router} />
            ),
          };
        }}
      />
    </Stack>
  )
}

export default AppLayout