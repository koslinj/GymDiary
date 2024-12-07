import { ActivityIndicator, View } from 'react-native'
import React, { FC } from 'react'
import { useColor } from '@/hooks/useColor'
import { useQuery } from '@tanstack/react-query'
import { PieChart } from 'react-native-gifted-charts'
import { Colors } from '@/constants/Colors'
import { fetchMusclesChart } from '@/api/stats'
import { ThemedText, ThemedView } from '../ThemedComponents'
import { useTranslation } from 'react-i18next'

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
  startDate: Date | undefined
  endDate: Date | undefined
}

export const MusclesChart: FC<Props> = ({ range, startDate, endDate }) => {
  const { t } = useTranslation()
  const bgColor = useColor(Colors.slate200, Colors.slate700)

  const { data: muscles, isLoading, isError, error } = useQuery(
    {
      queryKey: ['musclesChart', range, startDate, endDate],
      queryFn: () => fetchMusclesChart(range, startDate, endDate),
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
    if ((error as any).response?.status === 500) {
      return <ThemedText className="text-center">{t('wrong_input')}</ThemedText>;
    }
    return <ThemedText>{t('error_fetching_user_info')}: {error.message}</ThemedText>
  }

  if (!muscles) {
    return <ThemedText>{t('error_fetching_user_info')}</ThemedText>
  }
  console.log(muscles)
  const myData = getDataForPieChart(muscles)

  return (
    <ThemedView className='bg-transparent'>
      <ThemedText className='text-center text-3xl mb-2 mt-8 font-poppinsBold'>{t('muscle_groups')}</ThemedText>

      <View className='items-center'>
        {myData.length > 0 ? (
          <>
            <PieChart
              innerCircleColor={bgColor}
              radius={100}
              data={myData}
            />
            <View className='flex-row flex-wrap justify-center gap-x-8 mt-4'>
              {myData.map(item => (
                <View key={item.label} className="flex-row space-x-2 items-center flex-wrap">
                  <View style={{ backgroundColor: item.color }} className="w-8 h-8" />
                  <View>
                    <ThemedText className='text-[16px] leading-[20px]'>{t(item.label.split(';')[0])}:</ThemedText>
                    <ThemedText className="font-poppinsBold text-[16px] leading-[20px]">{item.label.split(';')[1]}</ThemedText>
                  </View>
                </View>
              ))}
            </View>
          </>
        ) : (
          <ThemedText>{t('no_data')}</ThemedText>
        )}
      </View>
    </ThemedView>
  )
}
