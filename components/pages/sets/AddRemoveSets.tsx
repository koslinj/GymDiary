import { ThemedText, ThemedView } from "@/components/ThemedComponents";
import { Colors } from "@/constants/Colors";
import { useSets } from "@/hooks/useSets";
import { FontAwesome5 } from "@expo/vector-icons";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";

interface Props {
  length: number
  routeKey: string
}

export const AddRemoveSets: FC<Props> = ({ length, routeKey }) => {
  const { t } = useTranslation()
  const { handleAddSet, handleRemoveSet } = useSets();

  return (
    length > 1 ? (
      <ThemedView className='flex-row justify-between'>
        <TouchableOpacity onPress={() => handleAddSet(routeKey)} className='flex-row items-center space-x-2'>
          <FontAwesome5 name="plus-circle" size={36} color={Colors.green600} />
          <ThemedText className='font-poppinsBold text-lg'>{t('add_set')}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRemoveSet(routeKey)} className='flex-row items-center space-x-2'>
          <FontAwesome5 name="minus-circle" size={36} color={Colors.red600} />
          <ThemedText className='font-poppinsBold text-lg'>{t('remove_set')}</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    ) : (
      <ThemedView className='flex-row justify-start'>
        <TouchableOpacity onPress={() => handleAddSet(routeKey)} className='flex-row items-center space-x-2'>
          <FontAwesome5 name="plus-circle" size={36} color={Colors.green600} />
          <ThemedText className='font-poppinsBold text-lg'>{t('add_set')}</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    )
  )
}