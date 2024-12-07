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
import { useTranslation } from 'react-i18next';

export default function Profile() {
  const { t } = useTranslation()
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
        title={t('log_out')}
        desc={t('log_out_confirmation')}
        onConfirm={handleLogout}
      />
      <PageModal
        openModal={openPageModal}
        setOpenModal={setOpenPageModal}
      >
        <UserInfoPage userInfo={userInfo} setOpenModal={setOpenPageModal} />
      </PageModal>
      <View className="w-full flex-row relative mb-14">
        <TouchableOpacity className='absolute left-3 top-1 z-10' onPress={() => setOpenPageModal(true)}>
          <ProfilePhoto uri={userInfo?.profile_photo} size='ICON' />
        </TouchableOpacity>

        <ThemedText className="flex-1 text-center text-3xl mt-4 font-poppinsBold">{t('profile')}</ThemedText>
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
          <ThemedText className='text-2xl text-center'>{t('friends')}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { router.push("records") }}
          className='bg-slate-200 dark:bg-slate-700 p-4 rounded-lg'
        >
          <ThemedText className='text-2xl text-center'>{t('records')}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { router.push("achievements") }}
          className='bg-slate-200 dark:bg-slate-700 p-4 rounded-lg'
        >
          <ThemedText className='text-2xl text-center'>{t('achievements')}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { router.push("goals") }}
          className='bg-slate-200 dark:bg-slate-700 p-4 rounded-lg'
        >
          <ThemedText className='text-2xl text-center'>{t('goals')}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { router.push("history") }}
          className='bg-slate-200 dark:bg-slate-700 p-4 rounded-lg'
        >
          <ThemedText className='text-2xl text-center'>{t('history')}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { router.push("stats") }}
          className='bg-slate-200 dark:bg-slate-700 p-4 rounded-lg'
        >
          <ThemedText className='text-2xl text-center'>{t('stats')}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { router.push("settings") }}
          className='bg-slate-200 dark:bg-slate-700 p-4 rounded-lg'
        >
          <ThemedText className='text-2xl text-center'>{t('settings')}</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}