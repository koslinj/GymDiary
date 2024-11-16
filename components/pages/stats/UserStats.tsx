import { fetchUserInfo } from "@/api/stats";
import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { calculateDaysPassed } from "@/utils/calculations";
import { useQuery } from "@tanstack/react-query"
import { ActivityIndicator, View } from "react-native"
import { ProfilePhoto } from "../profile/ProfilePhoto";

export const UserStats = () => {

  const { data: userInfo, isLoading, isError, error } = useQuery<UserInfo>(
    {
      queryKey: ['userInfo'],
      queryFn: () => fetchUserInfo(),
      refetchOnWindowFocus: false
    }
  );

  if (isLoading) {
    return (
      <ThemedView className='justify-center items-center p-8'>
        <ActivityIndicator size="large" />
      </ThemedView>
    )
  }

  if (isError) {
    return <ThemedText>Error fetching user info: {error.message}</ThemedText>
  }

  if (!userInfo) {
    return <ThemedText>Error fetching user info</ThemedText>
  }

  return (
    <View>
      <ThemedText className='text-center text-3xl font-poppinsBold mt-10'>Account</ThemedText>
      <View className="mx-auto">
        <ProfilePhoto size="BIG" uri={userInfo.profile_photo} />
      </View>
      <View className="items-center mt-4">
        <ThemedText className='text-gray-400 text-lg'>Number of friends</ThemedText>
        <ThemedText className='text-2xl font-poppinsBold -mt-2'>{userInfo.friends_count}</ThemedText>
      </View>
      <View className="items-center mt-4">
        <ThemedText className='text-gray-400 text-lg'>Days on the platform</ThemedText>
        <ThemedText className='text-2xl font-poppinsBold -mt-2'>{calculateDaysPassed(userInfo.created_at)}</ThemedText>
      </View>
      <View className="items-center mt-8">
        <ThemedText className='text-3xl font-poppinsBold -mt-2'>Keep going!</ThemedText>
      </View>
    </View>
  )
}