import { fetchFriendInfo } from '@/api/friends';
import { FriendPageGeneralInfo } from '@/components/pages/friends/FriendPageGeneralInfo';
import { ThemedText, ThemedView } from '@/components/ThemedComponents';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';

export default function FriendDetail() {
  const { id } = useLocalSearchParams();

  const { data: friend, isLoading, isError, error } = useQuery<FriendDetails>(
    {
      queryKey: ['friendInfo', id],
      queryFn: () => fetchFriendInfo(parseInt(id as string)),
      enabled: !!id,
      refetchOnWindowFocus: false
    }
  );

  if (isLoading) {
    return (
      <ThemedView className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" />
      </ThemedView>
    )
  }

  if (isError) {
    return <ThemedText>Error fetching friend info: {error.message}</ThemedText>
  }

  if (!friend) {
    return <ThemedText>Error fetching friend info</ThemedText>
  }

  return (
    <ThemedView className='flex-1'>
      <ScrollView contentContainerStyle={{ padding: 8 }}>
        <FriendPageGeneralInfo friend={friend} />
        <View className='mt-3'>
          <ThemedText className='text-center font-poppinsBold text-5xl leading-[70px] -mb-4'>VS</ThemedText>

        </View>
      </ScrollView>
    </ThemedView>
  );
}
