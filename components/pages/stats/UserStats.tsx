import { fetchUserInfo } from "@/api/stats";
import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { calculateDaysPassed } from "@/utils/calculations";
import { useQuery } from "@tanstack/react-query"
import { ActivityIndicator, View } from "react-native"
import { ProfilePhoto } from "../profile/ProfilePhoto";
import { useTranslation } from "react-i18next";

export const UserStats = () => {
  const { t } = useTranslation()
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
    return <ThemedText>{t('error_fetching_user_info')}: {error.message}</ThemedText>
  }

  if (!userInfo) {
    return <ThemedText>{t('error_fetching_user_info')}</ThemedText>
  }

  return (
    <View>
      <ThemedText className='text-center text-3xl font-poppinsBold mt-10'>{t('account')}</ThemedText>
      <View className="mx-auto">
        <ProfilePhoto size="BIG" uri={userInfo.profile_photo} />
      </View>
      <View className="items-center mt-4">
        <ThemedText className='text-gray-400 text-lg'>{t('number_of_friends')}</ThemedText>
        <ThemedText className='text-2xl font-poppinsBold -mt-2'>{userInfo.friends_count}</ThemedText>
      </View>
      <View className="items-center mt-4">
        <ThemedText className='text-gray-400 text-lg'>{t('days_on_the_platform')}</ThemedText>
        <ThemedText className='text-2xl font-poppinsBold -mt-2'>{calculateDaysPassed(userInfo.created_at)}</ThemedText>
      </View>
      <View className="items-center mt-8">
        <ThemedText className='text-3xl font-poppinsBold -mt-2'>{t('keep_going_')}</ThemedText>
      </View>
    </View>
  )
}