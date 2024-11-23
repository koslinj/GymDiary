import { ActivityIndicator, View } from 'react-native'
import React, { FC } from 'react'
import { ThemedText, ThemedView } from '../../ThemedComponents'
import { useColor } from '@/hooks/useColor'
import { useQuery } from '@tanstack/react-query'
import { fetchSetsChart } from '@/api/friends'
import { LineChart } from 'react-native-gifted-charts'
import { useTranslation } from 'react-i18next'

interface Props {
  friend: FriendDetails
  friendId: string
}

export const SetsChart: FC<Props> = ({ friend, friendId }) => {
  const { t } = useTranslation()
  const textColor = useColor("black", "white")

  const { data: sets, isLoading, isError, error } = useQuery(
    {
      queryKey: ['setsChart', friendId],
      queryFn: () => fetchSetsChart(friendId),
      enabled: !!friendId,
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

  if (!sets) {
    return <ThemedText>{t('error_fetching_friend_info')}</ThemedText>
  }


  let max = -1
  const maxLength = Math.max(sets.friend.length, sets.my.length);

  const friendDiff = maxLength - sets.friend.length
  const friendSegment = friendDiff > 0 ? [{ startIndex: 0, endIndex: friendDiff, color: 'transparent' }] : []

  const myDiff = maxLength - sets.my.length
  const mySegment = myDiff > 0 ? [{ startIndex: 0, endIndex: myDiff, color: 'transparent' }] : []

  const friendData = Array.from({ length: maxLength }, (_, index) => ({
    value: index < maxLength - sets.friend.length
      ? 0
      : parseFloat(sets.friend[index - (maxLength - sets.friend.length)].toFixed(2)),
    hideDataPoint: index < maxLength - sets.friend.length
  }));

  const myData = Array.from({ length: maxLength }, (_, index) => ({
    value: index < maxLength - sets.my.length
      ? 0
      : parseFloat(sets.my[index - (maxLength - sets.my.length)].toFixed(2)),
    hideDataPoint: index < maxLength - sets.my.length
  }));


  friendData.forEach(i => { if (i.value > max) max = i.value })
  myData.forEach(i => { if (i.value > max) max = i.value })

  return (
    <ThemedView className='bg-transparent rounded-xl overflow-hidden py-2'>
      <ThemedText className='text-center text-2xl mb-6 font-poppinsBold'>{t('number_of_sets_in_last_workouts')}</ThemedText>
      <View className='flex-row justify-center gap-x-10'>
        <View className='flex-row gap-x-2'>
          <ThemedText>{t('you')}</ThemedText>
          <View className='h-5 w-5 rounded-full bg-[#ED6665]'></View>
        </View>
        <View className='flex-row gap-x-2'>
          <ThemedText>{friend.nickname}</ThemedText>
          <View className='h-5 w-5 rounded-full bg-[#177AD5]'></View>
        </View>
      </View>
      <View className='mx-auto'>
        <LineChart
          data={friendData}
          data2={myData}
          lineSegments={friendSegment}
          lineSegments2={mySegment}
          color1='#177AD5'
          color2='#ED6665'
          dataPointsRadius={7}
          thickness={1}
          dataPointsColor1='#177AD5'
          dataPointsColor2='#ED6665'
          yAxisTextStyle={{ color: textColor }}
          maxValue={max}
          noOfSections={5}
        />
      </View>
    </ThemedView>
  )
}
