import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { ProfilePhoto } from '../profile/ProfilePhoto'
import { ThemedText } from '@/components/ThemedComponents'
import { formatDate } from '@/utils/formating'
import { useTranslation } from 'react-i18next'

interface Props {
  friend: FriendDetails
}

export const FriendPageGeneralInfo:FC<Props> = ({friend}) => {
  const { t } = useTranslation()

  return (
    <View className='gap-y-4'>
      <View className='mx-auto'>
        <ProfilePhoto uri={friend.profile_photo} size='BIG' />
      </View>
      <View>
        <ThemedText className='-mb-2'>{t('email_')}</ThemedText>
        <ThemedText className='text-lg font-poppinsBold'>{friend.email}</ThemedText>
      </View>
      <View>
        <ThemedText className='-mb-2'>{t('name_')}</ThemedText>
        <ThemedText className='text-lg font-poppinsBold'>{friend.nickname}</ThemedText>
      </View>
      <View>
        <ThemedText className='-mb-2'>{t('description_')}</ThemedText>
        <ThemedText className='text-lg font-poppinsBold'>{friend.description}</ThemedText>
      </View>
      <View>
        <ThemedText className='-mb-2'>{t('date_of_birth_')}</ThemedText>
        <ThemedText className='text-lg font-poppinsBold'>{formatDate(friend.date_of_birth)}</ThemedText>
      </View>
      <View>
        <ThemedText className='-mb-2'>{t('friends_count_')}</ThemedText>
        <ThemedText className='text-lg font-poppinsBold'>{friend.friends_count}</ThemedText>
      </View>
      <View>
        <ThemedText className='-mb-2'>{t('created_at_')}</ThemedText>
        <ThemedText className='text-lg font-poppinsBold'>{formatDate(friend.created_at)}</ThemedText>
      </View>
    </View>
  )
}
