import { ExerciseIcon } from "@/components/ExerciseIcon";
import { ThemedText, ThemedView } from "@/components/ThemedComponents";
import { useBlackOrWhite } from "@/hooks/useBlackOrWhite";
import { FontAwesome6 } from "@expo/vector-icons";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

interface Props {
  exercise: Exercise
}

export const RecordsExerciseItem: FC<Props> = ({ exercise }) => {
  const { t } = useTranslation()
  const iconColor = useBlackOrWhite()

  return (
    <View className='flex flex-row items-center space-x-4 mb-6 pr-12 border-y-2 dark:border-white'>
      <ExerciseIcon exercise={exercise} />
      <ThemedText className="break-words text-xl flex-shrink">
        {t(exercise.name_exercise)}
      </ThemedText>
      <ThemedView className='bg-transparent absolute right-2'>
        <FontAwesome6 name="angles-right" size={34} color={iconColor} />
      </ThemedView>
    </View>
  )
}