import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { FC, useState } from "react"
import { ActivityIndicator, FlatList, TextInput, TouchableOpacity } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { useBlackOrWhite } from "@/hooks/useBlackOrWhite"
import { useColor } from "@/hooks/useColor"
import { useQuery } from "@tanstack/react-query"
import { fetchUsersToInvite } from "@/api/friends"
import { FriendItem } from "./FriendItem"
import { UserToInviteItem } from "./UserToInviteItem"
import { ScrollView } from "react-native-gesture-handler"

interface Props {
  search: string
}

export const UsersToInviteList: FC<Props> = ({ search }) => {

  const { data: users, isLoading, isError, error } = useQuery<Friend[]>(
    {
      queryKey: ['usersToInvite', search],
      queryFn: () => fetchUsersToInvite(search),
      enabled: search !== "",
      refetchOnWindowFocus: false
    }
  );

  if (isLoading) {
    return (
      <ThemedView className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" />
      </ThemedView>
    )
  }

  if (isError) {
    return <ThemedText>Error fetching friend info: {error.message}</ThemedText>
  }

  return (
    <FlatList
      data={users}
      keyExtractor={item => item.user_id.toString()}
      renderItem={({ item }) => <UserToInviteItem item={item} />}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  )
}

