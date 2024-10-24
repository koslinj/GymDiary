import { ExerciseIcon } from "@/components/ExerciseIcon";
import { MyPicker } from "@/components/MyPicker";
import { ThemedText, ThemedView } from "@/components/ThemedComponents";
import { Colors } from "@/constants/Colors";
import { useBlackOrWhite } from "@/hooks/useBlackOrWhite";
import { useSets } from "@/hooks/useSets";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { FC } from "react";
import { TouchableOpacity, View } from "react-native";

interface Props {
  length: number
  routeKey: string
  addSet: () => void
  removeSet: () => void
}

export const AddRemoveSets: FC<Props> = ({ length, routeKey, addSet, removeSet }) => {

  return (
    length > 1 ? (
      <ThemedView className='flex-row justify-between'>
        <TouchableOpacity onPress={addSet} className='flex-row items-center space-x-2'>
          <FontAwesome5 name="plus-circle" size={36} color={Colors.green600} />
          <ThemedText className='font-poppinsBold text-lg'>Add Set</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={removeSet} className='flex-row items-center space-x-2'>
          <FontAwesome5 name="minus-circle" size={36} color={Colors.red600} />
          <ThemedText className='font-poppinsBold text-lg'>Remove Set</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    ) : (
      <ThemedView className='flex-row justify-start'>
        <TouchableOpacity onPress={addSet} className='flex-row items-center space-x-2'>
          <FontAwesome5 name="plus-circle" size={36} color={Colors.green600} />
          <ThemedText className='font-poppinsBold text-lg'>Add Set</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    )
  )
}