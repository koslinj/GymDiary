import { ActivityIndicator, View } from 'react-native'
import React, { FC } from 'react'
import { ThemedText, ThemedView } from '../ThemedComponents'
import { useColor } from '@/hooks/useColor'
import { useQuery } from '@tanstack/react-query'
import { fetchDurationChart } from '@/api/friends'
import { LineChart } from 'react-native-gifted-charts'
import { getDurationFromSeconds, getSecondsFromDuration } from '@/utils/calculations'

interface Props {
  friend: FriendDetails
  friendId: string
}

export const DurationChart: FC<Props> = ({ friend, friendId }) => {
  const textColor = useColor("black", "white")

  const { data: durations, isLoading, isError, error } = useQuery(
    {
      queryKey: ['durationChart', friendId],
      queryFn: () => fetchDurationChart(friendId),
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
    return <ThemedText>Error fetching friend info: {error.message}</ThemedText>
  }

  if (!durations) {
    return <ThemedText>Error fetching friend info</ThemedText>
  }

  let max = -1
  const maxLength = Math.max(durations.friend.length, durations.my.length);

  let friendData = durations.friend
  let myData = durations.my

  const friendDiff = maxLength - durations.friend.length
  const friendSegment = friendDiff > 0 ? [{ startIndex: 0, endIndex: friendDiff, color: 'transparent' }] : []

  const myDiff = maxLength - durations.my.length
  const mySegment = myDiff > 0 ? [{ startIndex: 0, endIndex: myDiff, color: 'transparent' }] : []

  const friendSeconds = durations.friend.map((item: string) => getSecondsFromDuration(item))
  const mySeconds = durations.my.map((item: string) => getSecondsFromDuration(item))

  friendData = Array.from({ length: maxLength }, (_, index) => ({
    value: index < maxLength - friendSeconds.length
      ? 0
      : friendSeconds[index - (maxLength - friendSeconds.length)],
    hideDataPoint: index < maxLength - friendSeconds.length
  }));

  myData = Array.from({ length: maxLength }, (_, index) => ({
    value: index < maxLength - mySeconds.length
      ? 0
      : mySeconds[index - (maxLength - mySeconds.length)],
    hideDataPoint: index < maxLength - mySeconds.length
  }));


  friendData.forEach((i: { value: number }) => { if (i.value > max) max = i.value })
  myData.forEach((i: { value: number }) => { if (i.value > max) max = i.value })

  return (
    <ThemedView className='bg-transparent rounded-xl overflow-hidden py-2'>
      <ThemedText className='text-center text-2xl mb-6 font-poppinsBold'>Last workouts duration</ThemedText>
      <View className='flex-row justify-center gap-x-10'>
        <View className='flex-row gap-x-2'>
          <ThemedText>You</ThemedText>
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
          yAxisLabelWidth={60}
          formatYLabel={(label) => getDurationFromSeconds(parseInt(label))}
          maxValue={max}
          noOfSections={4}
        />
      </View>
    </ThemedView>
  )
}
