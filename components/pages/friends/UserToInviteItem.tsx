import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { FC } from "react"
import { TouchableOpacity } from "react-native"
import { ProfilePhoto } from "../profile/ProfilePhoto"
import { MaterialIcons } from "@expo/vector-icons"
import { useBlackOrWhite } from "@/hooks/useBlackOrWhite"
import { sendInvitation } from "@/api/friends"
import { useQueryClient } from "@tanstack/react-query"

interface Props {
  item: Friend
}

export const UserToInviteItem: FC<Props> = ({ item }) => {
  const queryClient = useQueryClient();

  const handleInvite = async (userId: number) => {
    await sendInvitation(userId);
    queryClient.invalidateQueries({ queryKey: ['usersToInvite'] });
  };

  return (
    <ThemedView className="bg-transparent flex-row items-center justify-between mt-3">
      <ProfilePhoto uri={item.profile_photo} size="ICON" />
      <ThemedText className="text-xl font-poppinsBold">{item.nickname}</ThemedText>
      <TouchableOpacity onPress={() => handleInvite(item.user_id)}>
        <MaterialIcons name="person-add" size={44} color={useBlackOrWhite()} />
      </TouchableOpacity>
    </ThemedView>
  )
}

