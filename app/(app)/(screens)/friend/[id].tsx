import { fetchFriendInfo, removeFriend } from '@/api/friends';
import { DurationChart } from '@/components/charts/compare/DurationChart';
import { MusclesChart } from '@/components/charts/compare/MusclesChart';
import { NumberOfWorkoutsChart } from '@/components/charts/compare/NumberOfWorkoutsChart';
import { SetsChart } from '@/components/charts/compare/SetsChart';
import { PageModal } from '@/components/PageModal';
import { FriendPageGeneralInfo } from '@/components/pages/friends/FriendPageGeneralInfo';
import { ThemedText, ThemedView } from '@/components/ThemedComponents';
import { useColor } from '@/hooks/useColor';
import { FontAwesome, FontAwesome6, Ionicons, Octicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';

export default function FriendDetail() {
  const { t } = useTranslation()
  const router = useRouter()
  const { id } = useLocalSearchParams();
  const iconColor = useColor("black", "white")

  const [openNumberOfWorkoutsChart, setOpenNumberOfWorkoutsChart] = useState(false)
  const [openMusclesChart, setOpenMusclesChart] = useState(false)
  const [openSetsChart, setOpenSetsChart] = useState(false)
  const [openDurationChart, setOpenDurationChart] = useState(false)

  const handleRemoveFriend = async () => {
    await removeFriend(parseInt(id as string));
    router.back()
  };

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
    return <ThemedText>{t('error_fetching_friend_info')}: {error.message}</ThemedText>
  }

  if (!friend) {
    return <ThemedText>{t('error_fetching_friend_info')}</ThemedText>
  }

  return (
    <ThemedView className='flex-1'>
      <PageModal
        openModal={openNumberOfWorkoutsChart}
        setOpenModal={setOpenNumberOfWorkoutsChart}
      >
        <NumberOfWorkoutsChart friend={friend} friendId={id as string} />
      </PageModal>
      <PageModal
        openModal={openMusclesChart}
        setOpenModal={setOpenMusclesChart}
      >
        <MusclesChart friend={friend} friendId={id as string} />
      </PageModal>
      <PageModal
        openModal={openSetsChart}
        setOpenModal={setOpenSetsChart}
      >
        <SetsChart friend={friend} friendId={id as string} />
      </PageModal>
      <PageModal
        openModal={openDurationChart}
        setOpenModal={setOpenDurationChart}
      >
        <DurationChart friend={friend} friendId={id as string} />
      </PageModal>

      <ScrollView contentContainerStyle={{ padding: 8 }}>
        <FriendPageGeneralInfo friend={friend} />
        <View className='mt-3'>
          <ThemedText className='text-center font-poppinsBold text-5xl leading-[70px] -mb-4'>{t('vs')}</ThemedText>

          <ThemedView className="flex-row">
            <ThemedView className="flex-1 aspect-square p-4">
              <TouchableOpacity
                onPress={() => { setOpenNumberOfWorkoutsChart(true) }}
                className="bg-slate-200 dark:bg-slate-700 flex-1 rounded-xl justify-center items-center"
              >
                <FontAwesome name="check-square-o" size={70} color={iconColor} />
                <ThemedText className="text-xl absolute bottom-1">{t('workouts')}</ThemedText>
              </TouchableOpacity>
            </ThemedView>

            <ThemedView className="flex-1 aspect-square p-4">
              <TouchableOpacity
                onPress={() => { setOpenMusclesChart(true) }}
                className="bg-slate-200 dark:bg-slate-700 flex-1 rounded-xl justify-center items-center"
              >
                <Ionicons name="body" size={70} color={iconColor} />
                <ThemedText className="text-xl absolute bottom-1">{t('muscles')}</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>

          <ThemedView className="flex-row">
            <ThemedView className="flex-1 aspect-square p-4">
              <TouchableOpacity
                onPress={() => { setOpenSetsChart(true) }}
                className="bg-slate-200 dark:bg-slate-700 flex-1 rounded-xl justify-center items-center"
              >
                <Octicons name="number" size={70} color={iconColor} />
                <ThemedText className="text-xl absolute bottom-1">{t('sets')}</ThemedText>
              </TouchableOpacity>
            </ThemedView>

            <ThemedView className="flex-1 aspect-square p-4">
              <TouchableOpacity
                onPress={() => { setOpenDurationChart(true) }}
                className="bg-slate-200 dark:bg-slate-700 flex-1 rounded-xl justify-center items-center"
              >
                <FontAwesome6 name="clock-four" size={70} color={iconColor} />
                <ThemedText className="text-xl absolute bottom-1">{t('duration')}</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>

        </View>
        <TouchableOpacity
          onPress={handleRemoveFriend}
          className="m-4 bg-red-500 rounded-xl p-3 justify-center items-center"
        >
          <ThemedText className="text-lg">{t('remove_friend')}</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}
