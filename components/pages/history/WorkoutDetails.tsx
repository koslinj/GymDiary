import { fetchWorkoutDetails } from "@/api/workouts";
import { Accordion } from "@/components/Accordion";
import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { useQuery } from "@tanstack/react-query";
import { FC } from "react"
import { ActivityIndicator, ScrollView, View } from "react-native";
import { DataPart } from "../social/post/DataPart";
import { RatingPart } from "./parts/RatingPart";
import { WorkoutDeleteButton } from "./WorkoutDeleteButton";
import { useTranslation } from "react-i18next";

interface Props {
  workoutId: number
}

export const WorkoutDetails: FC<Props> = ({ workoutId }) => {
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
      <ThemedView className='flex-1 justify-center items-center'>
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
    <ThemedView className="flex-1 px-3">
      <ScrollView>
        <ThemedView className="flex-row justify-center space-x-4 mb-3">
          <ThemedText className="text-lg">{formattedDate}</ThemedText>
          <ThemedText className="text-lg">{formattedTime}</ThemedText>
        </ThemedView>
        <ThemedText className="text-center text-2xl font-poppinsBold">{workout.planName}</ThemedText>
        {workout.note && <ThemedText className="text-center my-2" darkClassName="text-slate-400" lightClassName="text-slate-500">{workout.note}</ThemedText>}
        <DataPart workout={workout} />
        <View className="my-4">
          <RatingPart rating={workout.rating} />
        </View>
        <ThemedView className="bg-slate-200 dark:bg-slate-700 my-3 mt-0 p-3 rounded-xl">
          <Accordion accordionData={accordionData} />
        </ThemedView>
        <WorkoutDeleteButton workout={workout} />
      </ScrollView>
    </ThemedView>
  )
}
