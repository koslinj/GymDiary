import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, View, useColorScheme } from 'react-native';
import { useAuth } from '../../../context/authContext';
import { ThemedText, ThemedView } from '../../../components/ThemedComponents';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { MyModal } from '../../../components/MyModal';

export default function Profile() {
  const [openModal, setOpenModal] = useState(false)
  const isDark = useColorScheme() === 'dark' ? true : false
  const insets = useSafeAreaInsets();
  const { logout } = useAuth()
  const handleLogout = async () => {
    await logout()
  }

  return (
    <ThemedView style={{ paddingTop: insets.top }} className="flex-1 items-center">
      <MyModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title={'Log Out'}
        desc={'Are you sure you want to log out?'}
        onConfirm={handleLogout}
      />
      <View className="w-full flex-row relative">
        <ThemedText className="flex-1 text-center text-3xl font-poppins">Profile</ThemedText>
        <TouchableOpacity className="absolute right-3 top-1" onPress={() => setOpenModal(true)}>
          <Ionicons
            name='exit-outline'
            size={44}
            color={isDark ? '#fff' : '#000'}
          />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </ThemedView>
  );
}