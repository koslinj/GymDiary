import { fetchWorkoutDetails } from "@/api/workouts";
import { Accordion } from "@/components/Accordion";
import { ExerciseIcon } from "@/components/ExerciseIcon";
import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { useQuery } from "@tanstack/react-query";
import { FC } from "react"
import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";

interface Props {
  workoutId: number
}

export const WorkoutDataAccordion: FC<Props> = ({ workoutId }) => {
  const { t } = useTranslation()
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
    return <ThemedText>{t('error_fetching_workout')}: {error.message}</ThemedText>
  }

  if (!workout) {
    return <ThemedText>{t('error_fetching_workout')}</ThemedText>
  }

  const accordionData = workout.workoutData.map(ex => ({
    title: (
      <ThemedText className="text-2xl py-2 underline font-poppinsBold flex-shrink">{t(ex.exerciseName)}</ThemedText>
    ),
    content: ex.sets.map(set => `${set.reps} x ${set.weight} kg`)
  }))


  return (
    <Accordion accordionData={accordionData} />
  )
}
