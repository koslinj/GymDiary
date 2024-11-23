import { ActivityIndicator, View } from 'react-native'
import React, { FC } from 'react'
import { ThemedText, ThemedView } from '../../ThemedComponents'
import { useColor } from '@/hooks/useColor'
import { useQuery } from '@tanstack/react-query'
import { fetchMusclesChart } from '@/api/friends'
import { PieChart } from 'react-native-gifted-charts'
import { Colors } from '@/constants/Colors'
import { useTranslation } from 'react-i18next'

interface Props {
  friend: FriendDetails
  friendId: string
}

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

export const MusclesChart: FC<Props> = ({ friend, friendId }) => {
  const { t } = useTranslation()
  const bgColor = useColor(Colors.slate200, Colors.slate700)

  const { data: muscles, isLoading, isError, error } = useQuery(
    {
      queryKey: ['musclesChart', friendId],
      queryFn: () => fetchMusclesChart(friendId),
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

  if (!muscles) {
    return <ThemedText>{t('error_fetching_friend_info')}</ThemedText>
  }

  const myData = getDataForPieChart(muscles.my)
  const friendData = getDataForPieChart(muscles.friend)


  return (
    <ThemedView className='bg-transparent rounded-xl overflow-hidden pb-1'>
      <ThemedText className='text-center text-2xl mb-2 font-poppinsBold'>{t('muscle_groups')}</ThemedText>
      <View className='flex-row justify-between'>
        <View className='flex-shrink'>
        <ThemedText className='text-center text-lg'>{t('you')}</ThemedText>
          <PieChart
            innerCircleColor={bgColor}
            radius={70}
            data={myData}
          />
          <View>
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
        <View className='flex-shrink'>
          <ThemedText className='text-center text-lg'>{friend.nickname}</ThemedText>
          <PieChart
            innerCircleColor={bgColor}
            radius={70}
            data={friendData}
          />
          <View>
            {friendData.map(item => (
              <View key={item.label} className="flex-row space-x-2 items-center">
                <View style={{ backgroundColor: item.color }} className="w-6 h-6" />
                <View>
                  <ThemedText className='leading-[18px]'>{item.label.split(';')[0]}:</ThemedText>
                  <ThemedText className="font-poppinsBold leading-[18px]">{item.label.split(';')[1]}</ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ThemedView>
  )
}
