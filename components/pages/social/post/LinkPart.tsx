import React, { FC } from 'react'
import { Feather } from '@expo/vector-icons'
import { useBlackOrWhite } from '@/hooks/useBlackOrWhite'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'

interface Props {
  post: Post
}

export const LinkPart: FC<Props> = ({ post }) => {
  const router = useRouter()
  const iconColor = useBlackOrWhite()

  const showDetails = () => {
    router.push({
      pathname: "/post",
      params: { post: JSON.stringify(post) },
    })
  }

  return (
    <TouchableOpacity className="absolute right-0 p-1" onPress={showDetails}>
      <Feather name="external-link" size={34} color={iconColor} />
    </TouchableOpacity>
  )
}