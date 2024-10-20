import { fetchWorkoutDetails } from "@/api/workouts";
import { Accordion } from "@/components/Accordion";
import { ExerciseIcon } from "@/components/ExerciseIcon";
import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { useQuery } from "@tanstack/react-query";
import { FC } from "react"
import { ActivityIndicator } from "react-native";

interface Props {
  workoutId: number
}

export const WorkoutDetails: FC<Props> = ({ workoutId }) => {

  const { data: workout, isLoading, isError, error } = useQuery<GymWorkout>(
    {
      queryKey: ['workoutDetails', workoutId],
      queryFn: () => fetchWorkoutDetails(workoutId),
      refetchOnWindowFocus: false
    }
  );

  if (isLoading) {
    return (
      <ThemedView className='bg-slate-200 dark:bg-slate-700 justify-center items-center'>
        <ActivityIndicator size="large" />
      </ThemedView>
    )
  }

  if (isError) {
    return <ThemedText>Error fetching workout: {error.message}</ThemedText>
  }

  if (!workout) {
    return <ThemedText>Error fetching workout</ThemedText>
  }

  const accordionData = workout.workoutData.map(ex => ({
    title: (
      <ThemedText className="text-2xl py-2 underline font-poppinsBold">{ex.exerciseName}</ThemedText>
    ),
    content: ex.sets.map(set => `${set.reps} x ${set.weight}`)
  }))


  return (
    <Accordion accordionData={accordionData} />
  )
}
