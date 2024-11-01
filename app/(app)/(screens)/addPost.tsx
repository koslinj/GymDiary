import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { useState } from "react"
import { TextInput } from "react-native"
import { useColor } from "@/hooks/useColor"

export default function AddPost() {
  const [desc, setDesc] = useState("")
  const placeholderColor = useColor('#00000066', '#ffffff66')

  return (
    <ThemedView className="flex-1 px-3">
      <ThemedText className="text-2xl pt-4 mr-14">Put a description</ThemedText>
      <TextInput
        className="p-2 text-lg border-2 rounded-md mb-3 dark:border-white dark:text-white"
        placeholderTextColor={placeholderColor}
        value={desc}
        placeholder='Description...'
        autoCapitalize='none'
        onChangeText={(text) => setDesc(text)}
      />

    </ThemedView >
  )
}

