import { useCallback, useEffect, useState } from 'react';
import { ThemedText, ThemedView } from '../../../components/ThemedComponents';
import axios from "@/config/axiosConfig"
import { ActivityIndicator, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { FriendItem } from '@/components/pages/friends/FriendItem';
import { useTranslation } from 'react-i18next';

export default function Friends() {
  const { t } = useTranslation()
  const [friends, setFriends] = useState()
  const router = useRouter()
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    const response = await axios.get(`/shared/getFriends`);
    const result = response.data
    setFriends(result.friends)
    setLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    setLoading(true)
    await fetchData();
    setRefreshing(false);
  };

  return (
    <ThemedView className="flex-1 px-1">

      <View className='flex-row justify-around items-center flex-wrap space-y-2 py-2'>
        <TouchableOpacity className='bg-slate-200 dark:bg-slate-700 p-3 rounded-xl w-40' onPress={() => { router.push('/(app)/(screens)/inviteUser') }}>
          <ThemedText className='text-xl text-center'>{t('invite')}</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity className='bg-slate-200 dark:bg-slate-700 p-3 rounded-xl w-40' onPress={() => { router.push('/(app)/(screens)/pending') }}>
          <ThemedText className='text-xl text-center'>{t('pending')}</ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <ActivityIndicator size={'large'} />
        ) : (
          friends.length > 0 ? (
            friends.map(item => <FriendItem key={item.user_id} item={item} />)
          ) : (
            <>
              <ThemedText className='text-2xl text-center mt-4'>{t('you_don_t_have_any_friends_')}</ThemedText>
              <TouchableOpacity
                onPress={() => router.push('/(app)/(screens)/inviteUser')}
              >
                <ThemedText className='text-2xl text-center mt-4 font-poppinsBold underline'>{t('you_can_add_some_here')}</ThemedText>
              </TouchableOpacity>
            </>
          )
        )}
      </ScrollView>
    </ThemedView>
  );
}