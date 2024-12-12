
import { FriendPageHeader } from '@/components/pages/friends/FriendPageHeader'
import { ThemedText, ThemedView } from '@/components/ThemedComponents'
import { useGlobalStyles } from '@/hooks/useGlobalStyles'
import { AntDesign } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, useColorScheme, View } from 'react-native'

const AppLayout = () => {
  const { t } = useTranslation()
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
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>{t('stats')}</ThemedText>
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
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>{t('friends')}</ThemedText>
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
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>{t('records')}</ThemedText>
            </View>
          </ThemedView>
        )
      }} />
      <Stack.Screen name='(screens)/goals' options={{
        header: () => (
          <ThemedView lightClassName='bg-slate-300' darkClassName='bg-slate-800' style={[{ padding: 12 }, styles.safeArea]}>
            <View>
              <TouchableOpacity className="absolute z-10" onPress={() => { router.back() }}>
                <AntDesign color={theme === "light" ? "black" : "white"} name='arrowleft' size={42} />
              </TouchableOpacity>
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>{t('goals')}</ThemedText>
            </View>
          </ThemedView>
        )
      }} />
      <Stack.Screen name='(screens)/addGoal' options={{
        header: () => (
          <ThemedView lightClassName='bg-slate-300' darkClassName='bg-slate-800' style={[{ padding: 12 }, styles.safeArea]}>
            <View>
              <TouchableOpacity className="absolute z-10" onPress={() => { router.back() }}>
                <AntDesign color={theme === "light" ? "black" : "white"} name='arrowleft' size={42} />
              </TouchableOpacity>
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>{t('add_goal')}</ThemedText>
            </View>
          </ThemedView>
        )
      }} />
      <Stack.Screen name='(screens)/settings' options={{
        header: () => (
          <ThemedView lightClassName='bg-slate-300' darkClassName='bg-slate-800' style={[{ padding: 12 }, styles.safeArea]}>
            <View>
              <TouchableOpacity className="absolute z-10" onPress={() => { router.back() }}>
                <AntDesign color={theme === "light" ? "black" : "white"} name='arrowleft' size={42} />
              </TouchableOpacity>
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>{t('settings')}</ThemedText>
            </View>
          </ThemedView>
        )
      }} />
      <Stack.Screen name='(screens)/achievements' options={{
        header: () => (
          <ThemedView lightClassName='bg-slate-300' darkClassName='bg-slate-800' style={[{ padding: 12 }, styles.safeArea]}>
            <View>
              <TouchableOpacity className="absolute z-10" onPress={() => { router.back() }}>
                <AntDesign color={theme === "light" ? "black" : "white"} name='arrowleft' size={42} />
              </TouchableOpacity>
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>{t('achievements')}</ThemedText>
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
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>{t('history')}</ThemedText>
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
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>{t('choose_exercises')}</ThemedText>
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
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>{t('put_sets_data')}</ThemedText>
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
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>{t('post_details')}</ThemedText>
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
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>{t('invite_user')}</ThemedText>
            </View>
          </ThemedView>
        )
      }} />
      <Stack.Screen name='(screens)/pending' options={{
        header: () => (
          <ThemedView lightClassName='bg-slate-300' darkClassName='bg-slate-800' style={[{ padding: 12 }, styles.safeArea]}>
            <View>
              <TouchableOpacity className="absolute z-10" onPress={() => { router.back() }}>
                <AntDesign color={theme === "light" ? "black" : "white"} name='arrowleft' size={42} />
              </TouchableOpacity>
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>{t('pending')}</ThemedText>
            </View>
          </ThemedView>
        )
      }} />
      <Stack.Screen name='(screens)/routines' options={{
        header: () => (
          <ThemedView lightClassName='bg-slate-300' darkClassName='bg-slate-800' style={[{ padding: 12 }, styles.safeArea]}>
            <View>
              <TouchableOpacity className="absolute z-10" onPress={() => { router.dismissAll() }}>
                <AntDesign color={theme === "light" ? "black" : "white"} name='arrowleft' size={42} />
              </TouchableOpacity>
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>{t('routines')}</ThemedText>
            </View>
          </ThemedView>
        )
      }} />
      <Stack.Screen name='(screens)/addRoutine' options={{
        header: () => (
          <ThemedView lightClassName='bg-slate-300' darkClassName='bg-slate-800' style={[{ padding: 12 }, styles.safeArea]}>
            <View>
              <TouchableOpacity className="absolute z-10" onPress={() => { router.back() }}>
                <AntDesign color={theme === "light" ? "black" : "white"} name='arrowleft' size={42} />
              </TouchableOpacity>
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>{t('choose_exercises')}</ThemedText>
            </View>
          </ThemedView>
        )
      }} />
      <Stack.Screen name='(screens)/addPost' options={{
        header: () => (
          <ThemedView lightClassName='bg-slate-300' darkClassName='bg-slate-800' style={[{ padding: 12 }, styles.safeArea]}>
            <View>
              <TouchableOpacity className="absolute z-10" onPress={() => { router.back() }}>
                <AntDesign color={theme === "light" ? "black" : "white"} name='arrowleft' size={42} />
              </TouchableOpacity>
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>{t('add_post')}</ThemedText>
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
      <Stack.Screen
        name='(screens)/record/[name_exercise]'
        options={({ route }) => {
          const { name_exercise } = route.params;
          return {
            header: () => (
              <ThemedView lightClassName='bg-slate-300' darkClassName='bg-slate-800' style={[{ padding: 12 }, styles.safeArea]}>
                <View>
                  <TouchableOpacity className="absolute z-10" onPress={() => { router.back() }}>
                    <AntDesign color={theme === "light" ? "black" : "white"} name='arrowleft' size={42} />
                  </TouchableOpacity>
                  <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1 pl-8'>{t(decodeURIComponent(name_exercise))}</ThemedText>
                </View>
              </ThemedView>
            ),
          };
        }}
      />
      <Stack.Screen name='(screens)/workout/[id]' options={{
        header: () => (
          <ThemedView lightClassName='bg-slate-300' darkClassName='bg-slate-800' style={[{ padding: 12 }, styles.safeArea]}>
            <View>
              <TouchableOpacity className="absolute z-10" onPress={() => { router.back() }}>
                <AntDesign color={theme === "light" ? "black" : "white"} name='arrowleft' size={42} />
              </TouchableOpacity>
              <ThemedText className='text-3xl text-center font-poppinsBold translate-y-1'>{t('workout')}</ThemedText>
            </View>
          </ThemedView>
        )
      }} />
    </Stack>
  )
}

export default AppLayout