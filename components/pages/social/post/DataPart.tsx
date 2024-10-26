import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { ThemedText } from '@/components/ThemedComponents'

interface Props {
  post: Post
}

export const DataPart: FC<Props> = ({ post }) => {

  return (
    <View className="flex-row items-center mt-2">
      <View className="flex-grow">
        <View className="flex-row items-center space-x-2">
          <ThemedText className="text-lg">Series:</ThemedText>
          <ThemedText className="text-xl font-poppinsBold">{post.workout.totalSets}</ThemedText>
        </View>
        <View className="flex-row items-center space-x-2">
          <ThemedText className="text-lg">Weight:</ThemedText>
          <ThemedText className="text-xl font-poppinsBold">{post.workout.totalVolume} kg</ThemedText>
        </View>
      </View>
      <ThemedText className="font-poppinsBold text-3xl text-center basis-1/2">{post.workout.duration}</ThemedText>
    </View>
  )
}