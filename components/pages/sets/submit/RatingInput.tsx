import { Easing } from 'react-native'
import React, { FC } from 'react'
import { ThemedText, ThemedView } from '@/components/ThemedComponents'
import StarRating from 'react-native-star-rating-widget'
import { useTranslation } from 'react-i18next'

interface Props {
  rating: number,
  setRating: React.Dispatch<React.SetStateAction<number>>
}

export const RatingInput: FC<Props> = ({ rating, setRating }) => {
  const { t } = useTranslation()

  return (
    <ThemedView className='bg-transparent flex-col items-center my-4'>
      <ThemedText className="text-center font-poppinsBold text-xl">{t('rating')}</ThemedText>
      <StarRating
        animationConfig={{ delay: 0, duration: 100, scale: 1.1, easing: (num) => Easing.ease(num) }}
        enableHalfStar={false}
        starSize={48}
        onChange={(x) => setRating(x)}
        rating={rating}
        color="rgb(234 179 8)"
      />
    </ThemedView>
  )
}