import { TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../../hooks/useAuth';
import { ThemedText, ThemedView } from '../../../components/ThemedComponents';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ConfirmationModal } from '../../../components/ConfirmationModal';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import axios from '@/config/axiosConfig'
import { ProfilePhoto } from '@/components/pages/profile/ProfilePhoto';
import { PageModal } from '@/components/PageModal';
import { UserInfoPage } from '@/components/pages/profile/UserInfoPage';
import { useRouter } from 'expo-router';
import { useColor } from '@/hooks/useColor';

export default function Profile() {
  const [openModal, setOpenModal] = useState(false)
  const [openPageModal, setOpenPageModal] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const styles = useGlobalStyles()
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
  }

  const fetchProfile = async () => {
    const res = await axios.get("/shared/userInfo");
    setUserInfo(res.data.data)
  }

  useEffect(() => {
    fetchProfile()
  }, [])


  return (
    <ThemedView style={styles.safeArea} className="flex-1">
      <ConfirmationModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title={'Log Out'}
        desc={'Are you sure you want to log out?'}
        onConfirm={handleLogout}
      />
      <PageModal
        openModal={openPageModal}
        setOpenModal={setOpenPageModal}
      >
        <UserInfoPage userInfo={userInfo} setOpenModal={setOpenPageModal} />
      </PageModal>
      <View className="w-full flex-row relative mb-14">
        <TouchableOpacity className='absolute left-3 top-1' onPress={() => setOpenPageModal(true)}>
          <ProfilePhoto uri={userInfo?.profile_photo} size='ICON' />
        </TouchableOpacity>

        <ThemedText className="flex-1 text-center text-3xl mt-4 font-poppinsBold">Profile</ThemedText>
        <TouchableOpacity className="absolute right-3 top-1" onPress={() => setOpenModal(true)}>
          <Ionicons
            name='exit-outline'
            size={44}
            color={useColor("#000", "#fff")}
          />
        </TouchableOpacity>
      </View>
      <View className='px-4 gap-y-4'>
        <TouchableOpacity
          onPress={() => { router.push("friends") }}
          className='bg-slate-200 dark:bg-slate-700 p-4 rounded-lg'
        >
          <ThemedText className='text-2xl text-center'>
            Friends
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { router.push("records") }}
          className='bg-slate-200 dark:bg-slate-700 p-4 rounded-lg'
        >
          <ThemedText className='text-2xl text-center'>
            Records
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}