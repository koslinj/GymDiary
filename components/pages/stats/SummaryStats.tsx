
import { fetchUserSummaryStats } from "@/api/stats"
import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { useQuery } from "@tanstack/react-query"
import { FC } from "react"
import { ActivityIndicator, View } from "react-native"

interface Props {
  range: TimeRangeFilter
}

export const SummaryStats: FC<Props> = ({ range }) => {

  const { data: stats, isLoading, isError, error } = useQuery<Stats>(
    {
      queryKey: ['summaryStats', range],
      queryFn: () => fetchUserSummaryStats(range),
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
    return <ThemedText>Error fetching stats info: {error.message}</ThemedText>
  }

  if (!stats) {
    return <ThemedText>Error fetching stats info</ThemedText>
  }

  return (
    <View className='space-y-3'>
      <ThemedText className='text-center text-3xl font-poppinsBold mt-8'>Summary</ThemedText>
      <View>
        <ThemedText className='text-gray-400'>Total volume</ThemedText>
        <ThemedText className='text-2xl font-poppinsBold -mt-2'>{stats.totalVolume.toFixed(2)} kg</ThemedText>
      </View>
      <View>
        <ThemedText className='text-gray-400'>Number of workouts</ThemedText>
        <ThemedText className='text-2xl font-poppinsBold -mt-2'>{stats.workoutSessions}</ThemedText>
      </View>
      <View>
        <ThemedText className='text-gray-400'>Total sets</ThemedText>
        <ThemedText className='text-2xl font-poppinsBold -mt-2'>{stats.totalSets}</ThemedText>
      </View>
      <View>
        <ThemedText className='text-gray-400'>Total time</ThemedText>
        <ThemedText className='text-2xl font-poppinsBold -mt-2'>{stats.totalDuration}</ThemedText>
      </View>
      <View>
        <ThemedText className='text-gray-400'>Average rating</ThemedText>
        <ThemedText className='text-2xl font-poppinsBold -mt-2'>{stats.avgRating}</ThemedText>
      </View>
    </View>
  )
}