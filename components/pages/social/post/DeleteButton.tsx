import { deletePost } from "@/api/social";
import { fetchUserInfo } from "@/api/stats";
import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { useBlackOrWhite } from "@/hooks/useBlackOrWhite";
import { Ionicons } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router";
import { FC, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native"

interface Props {
  post: Post
}

export const DeleteButton: FC<Props> = ({ post }) => {
  const router = useRouter()
  const iconColor = useBlackOrWhite()
  const queryClient = useQueryClient()
  const [removing, setRemoving] = useState(false)

  const { data: userInfo, isLoading, isError, error } = useQuery<UserInfo>(
    {
      queryKey: ['userInfo'],
      queryFn: () => fetchUserInfo(),
      refetchOnWindowFocus: false
    }
  );

  if (isLoading) {
    return (
      <ThemedView className='justify-center items-center p-8'>
        <ActivityIndicator size="large" />
      </ThemedView>
    )
  }

  if (isError) {
    return <ThemedText>Error fetching user info: {error.message}</ThemedText>
  }

  if (!userInfo) {
    return <ThemedText>Error fetching user info</ThemedText>
  }

  const handleDelete = async () => {
    setRemoving(true)
    const res = await deletePost(post.post_id)
    await queryClient.invalidateQueries({ queryKey: ['posts'] })
    router.back()
  }

  const isMyPost = post.user_id === userInfo.user_id

  if (!isMyPost) {
    return null
  }

  return (
    <TouchableOpacity
      disabled={removing}
      onPress={handleDelete}
      className={`${removing && "opacity-50"} p-3 mt-12 mx-auto rounded-xl bg-red-500 flex-row space-x-4 items-center`}
    >
      <ThemedText className='text-2xl flex-shrink'>Delete this post</ThemedText>
      {removing ? (
        <ActivityIndicator size="large" color={iconColor} />
      ) : (
        <Ionicons name="trash-sharp" size={40} color={iconColor} />
      )}
    </TouchableOpacity >
  )
}