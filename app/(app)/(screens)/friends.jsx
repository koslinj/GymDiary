import { useEffect, useState } from 'react';
import { ThemedText, ThemedView } from '../../../components/ThemedComponents';
import axios from "@/config/axiosConfig"
import { ActivityIndicator, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { FriendItem } from '@/components/pages/friends/FriendItem';

export default function Friends() {
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

  useEffect(() => {
    fetchData()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true);
    setLoading(true)
    await fetchData();
    setRefreshing(false);
  };

  return (
    <ThemedView className="flex-1 px-1">

      <TouchableOpacity className='bg-slate-200 dark:bg-slate-700 p-4 my-4 rounded-xl' onPress={() => {router.push('/(app)/(screens)/inviteUser')}}>
        <ThemedText className='text-2xl text-center'>Invite users</ThemedText>
      </TouchableOpacity>

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
              <ThemedText className='text-2xl text-center mt-4'>You don't have any friends.</ThemedText>
              <TouchableOpacity
                onPress={() => router.push('/(app)/(screens)/inviteUser')}
              >
                <ThemedText className='text-2xl text-center mt-4 font-poppinsBold underline'>You can add some here</ThemedText>
              </TouchableOpacity>
            </>
          )
        )}
      </ScrollView>
    </ThemedView>
  );
}