import { ExerciseIcon } from "@/components/ExerciseIcon";
import { ThemedText, ThemedView } from "@/components/ThemedComponents";
import { useBlackOrWhite } from "@/hooks/useBlackOrWhite";
import { FontAwesome6 } from "@expo/vector-icons";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";

interface Props {
  exercise: Exercise
  toggleSelectExercise: (newName: string) => void
  selected: boolean
}

export const ExerciseItem: FC<Props> = ({ exercise, toggleSelectExercise, selected }) => {
  const { t } = useTranslation()
  const iconColor = useBlackOrWhite()

  return (
    <TouchableOpacity
      key={exercise.gym_exercise_id}
      onPress={() => toggleSelectExercise(exercise.name_exercise)}
      className='flex flex-row items-center space-x-4 mt-2 pr-12'
    >
      <ExerciseIcon exercise={exercise} />
      <ThemedText className="break-words text-xl flex-shrink">
        {t(exercise.name_exercise)}
      </ThemedText>
      <ThemedView className='bg-transparent absolute right-2'>
        {selected ? (
          <ThemedView className="rounded-full bg-green-600">
            <View className="scale-110">
              <FontAwesome6 name="circle-check" size={34} color={iconColor} />
            </View>
          </ThemedView>
        ) : (
          <View className="scale-110">
            <FontAwesome6 name="circle" size={34} color={iconColor} />
          </View>
        )}
      </ThemedView>
    </TouchableOpacity>
  )
}