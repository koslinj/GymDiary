import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { FC } from "react"
import { ProfilePhoto } from "../profile/ProfilePhoto"
import { TouchableOpacity, View } from "react-native"
import { Feather } from "@expo/vector-icons"
import { Colors } from "@/constants/Colors"
import { useQueryClient } from "@tanstack/react-query"
import { acceptInvitation } from "@/api/friends"

interface Props {
  friend: Friend
}

export const PendingItem: FC<Props> = ({ friend }) => {
  const queryClient = useQueryClient();

  const handleAccept = async () => {
    await acceptInvitation(friend.user_id)
    await queryClient.invalidateQueries({ queryKey: ['pending'] });
  }

  return (
    <ThemedView className="flex-row mt-3">
      <View className="flex-row items-center space-x-2 space-y-2 flex-shrink">
        <ProfilePhoto size="ICON" uri={friend.profile_photo} />
        <ThemedText className="text-lg flex-shrink">{friend.nickname}</ThemedText>
      </View>
      <View className="flex-grow flex-row items-center justify-end space-x-6">
        <TouchableOpacity onPress={handleAccept}>
          <Feather name="check-circle" size={40} color={Colors.green600} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="x-circle" size={40} color={Colors.red600} />
        </TouchableOpacity>
      </View>
    </ThemedView>
  )
}
