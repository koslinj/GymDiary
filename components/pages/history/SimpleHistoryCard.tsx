import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { FC } from "react"
import { WorkoutDataAccordion } from "./WorkoutDataAccordion";
import { ScrollView } from "react-native";
import { useTranslation } from "react-i18next";

interface Props {
  workout: GymWorkoutSummary
  isStartPage?: boolean
}

export const SimpleHistoryCard: FC<Props> = ({ workout, isStartPage = false }) => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language;

  const formattedDate = new Date(workout.date).toLocaleString(currentLanguage, {
    dateStyle: 'long',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
  const formattedTime = new Date(workout.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })

  return (
    <ThemedView className={isStartPage ? "flex-1" : undefined}>
      <ThemedView className="flex-row justify-center space-x-4">
        <ThemedText className="text-lg">{formattedDate}</ThemedText>
        <ThemedText className="text-lg">{formattedTime}</ThemedText>
      </ThemedView>
      <ScrollView>
        <ThemedView className="bg-slate-200 dark:bg-slate-700 m-3 mt-0 p-3 rounded-xl">
          <WorkoutDataAccordion workoutId={workout.workoutId} />
        </ThemedView>
      </ScrollView>
    </ThemedView>
  )
}
