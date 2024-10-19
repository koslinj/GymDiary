import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { FC } from "react"
import { WorkoutDetails } from "./WorkoutDetails";
import { ScrollView } from "react-native";

interface Props {
  workout: GymWorkoutSummary
}

export const HistoryCard: FC<Props> = ({ workout }) => {
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
          <WorkoutDetails workoutId={workout.workoutId} />
        </ThemedView>
      </ScrollView>
    </ThemedView>
  )
}
