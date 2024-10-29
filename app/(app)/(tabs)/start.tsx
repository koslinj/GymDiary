import { FontAwesome5 } from '@expo/vector-icons';
import { ThemedText, ThemedView } from '../../../components/ThemedComponents';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { useBlackOrWhite } from '@/hooks/useBlackOrWhite';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchWorkouts } from '@/api/workouts';
import { useQuery } from '@tanstack/react-query';
import { SimpleHistoryCard } from '@/components/pages/history/SimpleHistoryCard';

export default function Start() {
  const router = useRouter()
  const styles = useGlobalStyles()
  const iconColor = useBlackOrWhite()

  const { data: workouts, isLoading, isError, error } = useQuery<GymWorkoutSummary[]>(
    {
      queryKey: ['lastWorkout'],
      queryFn: () => fetchWorkouts(1),
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
    return <ThemedText>Error fetching workouts: {error.message}</ThemedText>
  }

  if (!workouts) {
    return <ThemedText>Error fetching workouts</ThemedText>
  }

  const latest = workouts.reduce((latestItem, currentItem) => {
    return new Date(currentItem.date) > new Date(latestItem.date) ? currentItem : latestItem;
  })

  return (
    <ThemedView className='flex-1' style={[styles.safeArea, styles.safeTabBar]}>
      <ThemedView className='flex-1'>
        <SimpleHistoryCard workout={latest} isStartPage={true} />
      </ThemedView>

      <ThemedView className='flex-row mb-4 pt-4 border-t-2 dark:border-white justify-center'>
        <ThemedView className='basis-1/2'>
          <TouchableOpacity className='mx-3 bg-slate-200 dark:bg-slate-700 items-center p-3 rounded-3xl'>
            <FontAwesome5 name="clipboard-list" size={70} color={iconColor} />
            <ThemedText className='mt-2 text-xl'>Routine</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        <ThemedView className='basis-1/2'>
          <TouchableOpacity
            onPress={() => router.push('/(screens)/quick')}
            className='mx-3 bg-slate-200 dark:bg-slate-700 items-center p-3 rounded-3xl'
          >
            <FontAwesome5 name="bolt" size={70} color={iconColor} />
            <ThemedText className='mt-2 text-xl'>Quick</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}