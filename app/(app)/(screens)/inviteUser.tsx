import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { useState } from "react"
import { TextInput } from "react-native"
import { useColor } from "@/hooks/useColor"
import { UsersToInviteList } from "@/components/pages/friends/UsersToInviteList"

export default function InviteUser() {
  const [search, setSearch] = useState("")
  const placeholderColor = useColor('#00000066', '#ffffff66')

  return (
    <ThemedView className="flex-1 px-3">
      <ThemedText className="text-2xl pt-4 mr-14">Search for user</ThemedText>
      <TextInput
        className="p-2 text-lg border-2 rounded-md mb-3 dark:border-white dark:text-white"
        placeholderTextColor={placeholderColor}
        value={search}
        placeholder='User nickname...'
        autoCapitalize='none'
        onChangeText={(text) => setSearch(text)}
      />
      <UsersToInviteList search={search} />

    </ThemedView >
  )
}

