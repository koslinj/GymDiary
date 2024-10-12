import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { ProfilePhoto } from '../profile/ProfilePhoto'
import { ThemedText } from '@/components/ThemedComponents'
import { formatDate } from '@/utils/formating'

interface Props {
  friend: FriendDetails
}

export const FriendPageGeneralInfo:FC<Props> = ({friend}) => {
  return (
    <View className='gap-y-4'>
      <View className='mx-auto'>
        <ProfilePhoto uri={friend.profile_photo} size='BIG' />
      </View>
      <View>
        <ThemedText className='-mb-2'>Email:</ThemedText>
        <ThemedText className='text-lg font-poppinsBold'>{friend.email}</ThemedText>
      </View>
      <View>
        <ThemedText className='-mb-2'>Name:</ThemedText>
        <ThemedText className='text-lg font-poppinsBold'>{friend.nickname}</ThemedText>
      </View>
      <View>
        <ThemedText className='-mb-2'>Description:</ThemedText>
        <ThemedText className='text-lg font-poppinsBold'>{friend.description}</ThemedText>
      </View>
      <View>
        <ThemedText className='-mb-2'>Date of birth:</ThemedText>
        <ThemedText className='text-lg font-poppinsBold'>{formatDate(friend.date_of_birth)}</ThemedText>
      </View>
      <View>
        <ThemedText className='-mb-2'>Friends count:</ThemedText>
        <ThemedText className='text-lg font-poppinsBold'>{friend.friends_count}</ThemedText>
      </View>
      <View>
        <ThemedText className='-mb-2'>Created at:</ThemedText>
        <ThemedText className='text-lg font-poppinsBold'>{formatDate(friend.created_at)}</ThemedText>
      </View>
    </View>
  )
}
