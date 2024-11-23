import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { FC } from "react"
import { View } from "react-native";
import { DataPart } from "./parts/DataPart";
import { RatingPart } from "./parts/RatingPart";
import { useTranslation } from "react-i18next";

interface Props {
  workout: GymWorkoutSummary
  homeScreen?: boolean
}

export const HistoryCard: FC<Props> = ({ workout, homeScreen }) => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language;

  const formattedDate = new Date(workout.date).toLocaleString(currentLanguage, {
    dateStyle: 'long',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
  const formattedTime = new Date(workout.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })

  return (
    <ThemedView className={`${!homeScreen && 'mt-12'} mx-4 p-4 min-h-[240px] rounded-xl`} lightClassName="bg-slate-200" darkClassName="bg-slate-700">
      <View className="flex-row justify-center space-x-3 mb-3">
        <ThemedText className="text-lg">{formattedDate}</ThemedText>
        <ThemedText className="text-lg opacity-60 text-center">{formattedTime}</ThemedText>
      </View>
      <ThemedText className="text-center text-2xl font-poppinsBold">{workout.planName}</ThemedText>
      {!homeScreen && workout.note && <ThemedText className="text-center mb-2" darkClassName="text-slate-400" lightClassName="text-slate-500">{workout.note}</ThemedText>}
      <DataPart workout={workout} />
      <View className="mt-4">
        <RatingPart rating={workout.rating} />
      </View>
    </ThemedView>
  )
}
