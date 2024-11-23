import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { ThemedText } from '@/components/ThemedComponents'
import { useTranslation } from 'react-i18next'

interface Props {
  workout: GymWorkout
}

export const DataPart: FC<Props> = ({ workout }) => {
  const { t } = useTranslation()

  return (
    <View className="flex-row items-center mt-2">
      <View className="flex-grow">
        <View className="flex-row items-center space-x-2">
          <ThemedText className="text-lg">{t('series_')}</ThemedText>
          <ThemedText className="text-xl font-poppinsBold">{workout.totalSets}</ThemedText>
        </View>
        <View className="flex-row items-center space-x-2">
          <ThemedText className="text-lg">{t('weight_')}</ThemedText>
          <ThemedText className="text-xl font-poppinsBold">{workout.totalVolume} kg</ThemedText>
        </View>
      </View>
      <ThemedText className="font-poppinsBold text-3xl text-center basis-1/2">{workout.duration}</ThemedText>
    </View>
  )
}