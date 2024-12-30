import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { ThemedText, ThemedView } from '../../../components/ThemedComponents';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { useBlackOrWhite } from '@/hooks/useBlackOrWhite';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchWorkouts } from '@/api/workouts';
import { useQuery } from '@tanstack/react-query';
import { SimpleHistoryCard } from '@/components/pages/history/SimpleHistoryCard';
import { Colors } from '@/constants/Colors';
import { useTranslation } from 'react-i18next';

export default function Start() {
  const { t } = useTranslation()
  const router = useRouter()
  const styles = useGlobalStyles()
  const iconColor = useBlackOrWhite()

  const { data: workouts, isLoading, isRefetching, isError, error } = useQuery<GymWorkoutSummary[]>(
    {
      queryKey: ['lastWorkout'],
      queryFn: () => fetchWorkouts(1),
      refetchOnWindowFocus: false
    }
  );

  if (isRefetching) {
    return (
      <ThemedView className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" />
      </ThemedView>
    )
  }

  if (isLoading) {
    return (
      <ThemedView className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" />
      </ThemedView>
    )
  }

  if (isError) {
    return <ThemedText>{t('error_fetching_workouts')}: {error.message}</ThemedText>
  }

  if (!workouts) {
    return <ThemedText>{t('error_fetching_workouts')}</ThemedText>
  }

  const latest = workouts.reduce((latestItem, currentItem) => {
    return new Date(currentItem.date) > new Date(latestItem.date) ? currentItem : latestItem;
  }, workouts[0] || null)

  return (
    <ThemedView className='flex-1' style={[styles.safeArea, styles.safeTabBar]}>
      <ThemedView className='flex-1'>
        {latest ? (
          <SimpleHistoryCard workout={latest} isStartPage={true} />
        ) : (
          <ThemedView className='border-2 border-slate-400 rounded-xl p-3 mx-3 mt-2 mb-6 flex-row justify-center items-center space-x-6'>
            <FontAwesome6 name="circle-info" size={36} color={Colors.slate400} />
            <ThemedText className='text-lg text-slate-400 flex-shrink'>{t('there_will_appear_your_last_workout_details_unfort')}</ThemedText>
          </ThemedView>
        )}
      </ThemedView>

      <ThemedView className='flex-row mb-4 pt-4 border-t-2 dark:border-white justify-center'>
        <ThemedView className='basis-1/2'>
          <TouchableOpacity
            onPress={() => router.push('/(screens)/routines')}
            className='mx-3 bg-slate-200 dark:bg-slate-700 items-center p-3 rounded-3xl'
          >
            <FontAwesome5 name="clipboard-list" size={70} color={iconColor} />
            <ThemedText className='mt-2 text-xl'>{t('routine')}</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        <ThemedView className='basis-1/2'>
          <TouchableOpacity
            onPress={() => router.push('/(screens)/quick')}
            className='mx-3 bg-slate-200 dark:bg-slate-700 items-center p-3 rounded-3xl'
          >
            <FontAwesome5 name="bolt" size={70} color={iconColor} />
            <ThemedText className='mt-2 text-xl'>{t('quick')}</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}