import { fetchWorkoutDetails } from "@/api/workouts";
import { Accordion } from "@/components/Accordion";
import { ExerciseIcon } from "@/components/ExerciseIcon";
import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { useQuery } from "@tanstack/react-query";
import { FC } from "react"
import { ActivityIndicator, ScrollView } from "react-native";

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
      <ThemedView className='flex-1 justify-center items-center'>
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
  const formattedDate = new Date(workout.date).toLocaleString('en-GB', {
    dateStyle: 'long',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
  const formattedTime = new Date(workout.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })

  return (
    <ThemedView className="flex-1">
      <ThemedView className="flex-row justify-center space-x-4">
        <ThemedText className="text-lg">{formattedDate}</ThemedText>
        <ThemedText className="text-lg">{formattedTime}</ThemedText>
      </ThemedView>
      <ScrollView>
        <ThemedView className="bg-slate-200 dark:bg-slate-700 m-3 mt-0 p-3 rounded-xl">
          <Accordion accordionData={accordionData} />
        </ThemedView>
      </ScrollView>
    </ThemedView>
  )
}
