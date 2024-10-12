import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { FC } from "react"
import { TouchableOpacity } from "react-native"
import { ProfilePhoto } from "../profile/ProfilePhoto"
import { useRouter } from "expo-router"

interface Props {
  item: Friend
}

export const FriendItem: FC<Props> = ({ item }) => {
  const router = useRouter()

  return (
    <TouchableOpacity
      onPress={() => router.push(`/friend/${item.user_id}`)}
      className="flex-row mt-4"
    >
      <ProfilePhoto uri={item.profile_photo} size="ICON" />
      <ThemedView className="px-4 flex-1">
        <ThemedText className="text-xl font-poppinsBold">{item.nickname}</ThemedText>
        <ThemedText className="flex-wrap" numberOfLines={2}>{item.description}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  )
}

