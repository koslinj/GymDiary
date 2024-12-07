
import { fetchUserSummaryStats } from "@/api/stats"
import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { useQuery } from "@tanstack/react-query"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ActivityIndicator, View } from "react-native"

interface Props {
  range: TimeRangeFilter
  startDate: Date | undefined
  endDate: Date | undefined
}

export const SummaryStats: FC<Props> = ({ range, startDate, endDate }) => {
  const { t } = useTranslation()

  const { data: stats, isLoading, isError, error } = useQuery<Stats>(
    {
      queryKey: ['summaryStats', range, startDate, endDate],
      queryFn: () => fetchUserSummaryStats(range, startDate, endDate),
      refetchOnWindowFocus: false
    }
  );

  if (isLoading) {
    return (
      <ThemedView className='justify-center items-center p-8'>
        <ActivityIndicator size="large" />
      </ThemedView>
    )
  }

  if (isError) {
    if ((error as any).response?.status === 500) {
      return <ThemedText className="text-center">{t('wrong_input')}</ThemedText>;
    }
    return <ThemedText>{t('error_fetching_stats_info')}: {error.message}</ThemedText>
  }

  if (!stats) {
    return <ThemedText>{t('error_fetching_stats_info')}</ThemedText>
  }

  return (
    <View className='space-y-3'>
      <ThemedText className='text-center text-3xl font-poppinsBold mt-8'>{t('summary')}</ThemedText>
      <View>
        <ThemedText className='text-gray-400'>{t('total_volume')}</ThemedText>
        <ThemedText className='text-2xl font-poppinsBold -mt-2'>{stats.totalVolume.toFixed(2)} kg</ThemedText>
      </View>
      <View>
        <ThemedText className='text-gray-400'>{t('number_of_workouts')}</ThemedText>
        <ThemedText className='text-2xl font-poppinsBold -mt-2'>{stats.workoutSessions}</ThemedText>
      </View>
      <View>
        <ThemedText className='text-gray-400'>{t('total_sets')}</ThemedText>
        <ThemedText className='text-2xl font-poppinsBold -mt-2'>{stats.totalSets}</ThemedText>
      </View>
      <View>
        <ThemedText className='text-gray-400'>{t('total_time')}</ThemedText>
        <ThemedText className='text-2xl font-poppinsBold -mt-2'>{stats.totalDuration}</ThemedText>
      </View>
      <View>
        <ThemedText className='text-gray-400'>{t('average_rating')}</ThemedText>
        <ThemedText className='text-2xl font-poppinsBold -mt-2'>{stats.avgRating}</ThemedText>
      </View>
    </View>
  )
}