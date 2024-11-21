import { deleteWorkout } from "@/api/workouts";
import { ThemedText } from "@/components/ThemedComponents"
import { useBlackOrWhite } from "@/hooks/useBlackOrWhite";
import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router";
import { FC, useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native"

interface Props {
  workout: GymWorkout
}

export const WorkoutDeleteButton: FC<Props> = ({ workout }) => {
  const router = useRouter()
  const iconColor = useBlackOrWhite()
  const queryClient = useQueryClient()
  const [removing, setRemoving] = useState(false)

  const invalidateMultipleQueries = async (keys: string[]) => {
    await Promise.all(keys.map((key) => queryClient.invalidateQueries({ queryKey: [key] })));
  };

  const handleDelete = async () => {
    setRemoving(true)
    const res = await deleteWorkout(workout.workoutId)
    await invalidateMultipleQueries(['workouts', 'lastWorkout', 'posts']);
    router.back()
  }

  return (
    <TouchableOpacity
      disabled={removing}
      onPress={handleDelete}
      className={`${removing && "opacity-50"} p-3 mt-12 mx-auto rounded-xl bg-red-500 flex-row space-x-4 items-center`}
    >
      <ThemedText className='text-2xl flex-shrink'>Delete this workout</ThemedText>
      {removing ? (
        <ActivityIndicator size="large" color={iconColor} />
      ) : (
        <Ionicons name="trash-sharp" size={40} color={iconColor} />
      )}
    </TouchableOpacity >
  )
}