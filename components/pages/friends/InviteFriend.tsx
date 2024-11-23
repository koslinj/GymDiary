import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { FC, useState } from "react"
import { ActivityIndicator, TextInput, TouchableOpacity } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { useBlackOrWhite } from "@/hooks/useBlackOrWhite"
import { useColor } from "@/hooks/useColor"
import { useQuery } from "@tanstack/react-query"
import { fetchUsersToInvite } from "@/api/friends"
import { UsersToInviteList } from "./UsersToInviteList"
import { useTranslation } from "react-i18next"

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const InviteFriend: FC<Props> = ({ setOpenModal }) => {
  const { t } = useTranslation()
  const [search, setSearch] = useState("")
  const placeholderColor = useColor('#00000066', '#ffffff66')
  const iconColor = useBlackOrWhite()

  return (
    <ThemedView className="bg-transparent">
      <TouchableOpacity className='absolute -right-1 -top-1' onPress={() => setOpenModal(false)}>
        <AntDesign name="close" size={40} color={iconColor} />
      </TouchableOpacity>
      <ThemedText className="text-2xl font-poppinsBold mb-6 mr-14">{t('search_for_user')}</ThemedText>
      <TextInput
        className="p-2 text-lg border-2 rounded-md mb-3 dark:border-white dark:text-white"
        placeholderTextColor={placeholderColor}
        value={search}
        placeholder='User nickname...'
        autoCapitalize='none'
        onChangeText={(text) => setSearch(text)}
      />
      <ThemedView className="z-50">
        <UsersToInviteList search={search} />
      </ThemedView>

    </ThemedView >
  )
}

