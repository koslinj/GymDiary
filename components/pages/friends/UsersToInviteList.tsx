import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { FC } from "react"
import { ActivityIndicator, FlatList } from "react-native"
import { useQuery } from "@tanstack/react-query"
import { fetchUsersToInvite } from "@/api/friends"
import { UserToInviteItem } from "./UserToInviteItem"
import { useTranslation } from "react-i18next"

interface Props {
  search: string
}

export const UsersToInviteList: FC<Props> = ({ search }) => {
  const { t } = useTranslation()
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
    return <ThemedText>{t('error_fetching_friend_info')}: {error.message}</ThemedText>
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

