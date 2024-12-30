import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { ThemedText, ThemedView } from '../../../components/ThemedComponents';
import { useRouter } from 'expo-router';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useColor } from '@/hooks/useColor';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchWorkouts } from '@/api/workouts';
import { HistoryCard } from '@/components/pages/history/HistoryCard';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
  const { t } = useTranslation()
  const router = useRouter();
  const styles = useGlobalStyles();
  const iconColor = useColor("black", "white");

  const [refreshing, setRefreshing] = useState(false);

  const { data: workouts, isLoading, isFetching, isError, error, refetch } = useQuery<GymWorkoutSummary[]>(
    {
      queryKey: ['lastWorkout'],
      queryFn: () => fetchWorkouts(1),
      refetchOnWindowFocus: false,
    }
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isError) {
    return <ThemedText>{t('error_fetching_workouts')}: {error.message}</ThemedText>;
  }

  const latest = workouts?.reduce((latestItem, currentItem) => {
    return new Date(currentItem.date) > new Date(latestItem.date) ? currentItem : latestItem;
  }, workouts[0] || null);

  return (
    <ThemedView style={styles.safeArea} className="flex-1">
      <ScrollView
        contentContainerStyle={[{ flexGrow: 1 }, styles.safeTabBar]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ThemedView className="flex-1">
          {(isLoading || isFetching) ? (
            <ThemedView className="mx-4 p-4 h-[240px] rounded-xl items-center justify-center" lightClassName="bg-slate-200" darkClassName="bg-slate-700">
              <ActivityIndicator size="large" />
            </ThemedView>
          ) : latest ? (
            <TouchableOpacity onPress={() => router.push(`/workout/${latest.workoutId}`)}>
              <HistoryCard workout={latest} homeScreen={true} />
            </TouchableOpacity>
          ) : (
            <ThemedView className="mx-4 p-4 h-[240px] rounded-xl justify-center items-center" lightClassName="bg-slate-200" darkClassName="bg-slate-700">
              <ThemedText className="text-3xl text-center">{t('there_will_appear_your_last_training_')}</ThemedText>
            </ThemedView>
          )}

          <ThemedView className="flex-row mt-4">
            <ThemedView className="flex-1 aspect-square pl-4 pr-2 pb-4">
              <TouchableOpacity
                onPress={() => router.push("/(app)/history")}
                className="bg-slate-200 dark:bg-slate-700 flex-1 rounded-xl justify-center items-center"
              >
                <FontAwesome5 name="history" size={70} color={iconColor} />
                <ThemedText className="text-xl absolute bottom-1">{t('history')}</ThemedText>
              </TouchableOpacity>
            </ThemedView>

            <ThemedView className="flex-1 aspect-square pl-2 pr-4 pb-4">
              <TouchableOpacity
                onPress={() => router.push("/(app)/stats")}
                className="bg-slate-200 dark:bg-slate-700 flex-1 rounded-xl justify-center items-center"
              >
                <Ionicons name="stats-chart" size={70} color={iconColor} />
                <ThemedText className="text-xl absolute bottom-1">{t('stats')}</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>

          <ThemedView className="flex-row">
            <ThemedView className="flex-1 aspect-square pl-4 pr-2 pb-6">
              <TouchableOpacity
                onPress={() => router.push("/(app)/(screens)/quick")}
                className="bg-slate-200 dark:bg-slate-700 flex-1 rounded-xl justify-center items-center"
              >
                <FontAwesome5 name="bolt" size={70} color={iconColor} />
                <ThemedText className="text-xl absolute bottom-1">{t('quick')}</ThemedText>
              </TouchableOpacity>
            </ThemedView>

            <ThemedView className="flex-1 aspect-square pl-2 pr-4 pb-6">
              <TouchableOpacity
                onPress={() => router.push("/(app)/(screens)/goals")}
                className="bg-slate-200 dark:bg-slate-700 flex-1 rounded-xl justify-center items-center"
              >
                <Feather name="target" size={70} color={iconColor} />
                <ThemedText className="text-xl absolute bottom-1">{t('goals')}</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>

          <StatusBar style="auto" />
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}
