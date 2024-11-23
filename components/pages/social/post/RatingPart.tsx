import { View } from 'react-native'
import React, { FC } from 'react'
import { ThemedText, ThemedView } from '@/components/ThemedComponents'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import { useTranslation } from 'react-i18next'

interface Props {
  rating: number
}

export const RatingPart: FC<Props> = ({ rating }) => {
  const { t } = useTranslation()

  return (
    <View>
      <ThemedView className='bg-transparent flex-col items-center'>
        <ThemedText>{t('rating')}</ThemedText>
        <StarRatingDisplay
          rating={rating}
          color="rgb(234 179 8)"
        />
      </ThemedView>
    </View>
  )
}
