import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { ActivityIndicator } from "react-native"
import { useQuery } from "@tanstack/react-query"
import { fetchPendingInvitations } from "@/api/friends"
import { PendingItem } from "@/components/pages/friends/PendingItem"
import { useTranslation } from "react-i18next"

export default function Pending() {
  const { t } = useTranslation()

  const { data: invitations, isLoading, isError, error } = useQuery<Friend[]>(
    {
      queryKey: ['pending'],
      queryFn: fetchPendingInvitations,
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
    return <ThemedText>{t('error_fetching_invitations')}: {error.message}</ThemedText>
  }

  if (!invitations) {
    return <ThemedText>{t('error_fetching_invitations')}</ThemedText>
  }

  return (
    <ThemedView className="flex-1 px-3">
      {invitations.map(item => <PendingItem key={item.user_id} friend={item} />)}
    </ThemedView >
  )
}

