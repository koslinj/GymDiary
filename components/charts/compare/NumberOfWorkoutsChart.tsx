import { ActivityIndicator, View } from 'react-native'
import React, { FC } from 'react'
import { ThemedText, ThemedView } from '../../ThemedComponents'
import { useColor } from '@/hooks/useColor'
import { useQuery } from '@tanstack/react-query'
import { fetchNumberOfWorkoutsChart } from '@/api/friends'
import { BarChart } from 'react-native-gifted-charts'

interface Props {
  friend: FriendDetails
  friendId: string
}

export const NumberOfWorkoutsChart: FC<Props> = ({ friend, friendId }) => {
  const textColor = useColor("black", "white")

  const { data: workouts, isLoading, isError, error } = useQuery(
    {
      queryKey: ['numberOfWorkouts', friendId],
      queryFn: () => fetchNumberOfWorkoutsChart(friendId),
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

  if (!workouts) {
    return <ThemedText>Error fetching friend info</ThemedText>
  }

  const barData: any[] = [];
  let max = 0

  workouts.friend.forEach((friendItem: any, index: number) => {
    const myItem = workouts.my[index];

    if (friendItem.count > max) max = friendItem.count
    if (myItem.count > max) max = myItem.count
    // Add a bar for 'friend'
    barData.push({
      value: friendItem.count,
      label: new Date(friendItem.month).toLocaleString('en-US', { month: "2-digit" }),
      spacing: 2,
      labelWidth: 26,
      labelTextStyle: { color: textColor },
      frontColor: '#177AD5', // Color for friend
    });

    // Add a bar for 'my'
    barData.push({
      value: myItem.count,
      frontColor: '#ED6665', // Color for my
    });
  });

  return (
    <ThemedView className='bg-transparent rounded-xl overflow-hidden py-2'>
      <ThemedText className='text-center text-2xl mb-6 font-poppinsBold'>Number of workouts</ThemedText>
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
        <BarChart
          data={barData}
          barWidth={10}
          spacing={24}
          roundedTop
          roundedBottom
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{ color: textColor }}
          noOfSections={4}
          maxValue={max}
        />
      </View>
    </ThemedView>
  )
}
