import { View } from 'react-native'
import React, { FC } from 'react'
import { ThemedText, ThemedView } from '@/components/ThemedComponents'
import { StarRatingDisplay } from 'react-native-star-rating-widget'

interface Props {
  rating: number
}

export const RatingPart: FC<Props> = ({ rating }) => {
  return (
    <View>
      <ThemedView className='bg-transparent flex-col items-center'>
        <ThemedText>Rating</ThemedText>
        <StarRatingDisplay
          rating={rating}
          color="rgb(234 179 8)"
        />
      </ThemedView>
    </View>
  )
}
