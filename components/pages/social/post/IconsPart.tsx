import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { FontAwesome6, Octicons } from '@expo/vector-icons'
import { ThemedText } from '@/components/ThemedComponents'
import { useBlackOrWhite } from '@/hooks/useBlackOrWhite'

interface Props {
  post: Post
}

export const IconsPart: FC<Props> = ({ post }) => {
  const iconColor = useBlackOrWhite()

  return (
    <View className="flex-row space-x-6 mt-4">
      <View className="flex-row space-x-1 items-center">
        <FontAwesome6 name="heart" size={34} color={iconColor} />
        <ThemedText className="text-lg">{post.likesCount}</ThemedText>
      </View>
      <View className="flex-row space-x-1 items-center">
        <Octicons name="comment" size={34} color={iconColor} />
        <ThemedText className="text-lg">{post.likesCount}</ThemedText>
      </View>
    </View>
  )
}