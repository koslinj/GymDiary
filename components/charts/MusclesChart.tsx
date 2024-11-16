import { ActivityIndicator, View } from 'react-native'
import React, { FC } from 'react'
import { useColor } from '@/hooks/useColor'
import { useQuery } from '@tanstack/react-query'
import { PieChart } from 'react-native-gifted-charts'
import { Colors } from '@/constants/Colors'
import { fetchMusclesChart } from '@/api/stats'
import { ThemedText, ThemedView } from '../ThemedComponents'

const getCategoryColor = (index: number) => {
  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#8DFF33", "#FF33E4"];
  return colors[index % colors.length];
};

const getDataForPieChart = (data: any) => {
  return Object.keys(data).map((category, index) => ({
    value: data[category].sets,
    color: getCategoryColor(index),
    label: `${category};${data[category].percent}`,
  }));
};

interface Props {
  range: TimeRangeFilter
}

export const MusclesChart: FC<Props> = ({ range }) => {
  const bgColor = useColor(Colors.slate200, Colors.slate700)

  const { data: muscles, isLoading, isError, error } = useQuery(
    {
      queryKey: ['musclesChart'],
      queryFn: () => fetchMusclesChart(range),
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
    return <ThemedText>Error fetching user info: {error.message}</ThemedText>
  }

  if (!muscles) {
    return <ThemedText>Error fetching user info</ThemedText>
  }

  const myData = getDataForPieChart(muscles)

  return (
    <ThemedView className='bg-transparent rounded-xl overflow-hidden pb-1'>
      <ThemedText className='text-center text-2xl mb-2 font-poppinsBold'>Muscle groups</ThemedText>

      <View className='items-center'>
        <PieChart
          innerCircleColor={bgColor}
          radius={100}
          data={myData}
        />
        <View className='flex-row flex-wrap justify-center gap-x-8 mt-4'>
          {myData.map(item => (
            <View key={item.label} className="flex-row space-x-2 items-center flex-wrap">
              <View style={{ backgroundColor: item.color }} className="w-6 h-6" />
              <View>
                <ThemedText className='leading-[18px]'>{item.label.split(';')[0]}:</ThemedText>
                <ThemedText className="font-poppinsBold leading-[18px]">{item.label.split(';')[1]}</ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ThemedView>
  )
}
