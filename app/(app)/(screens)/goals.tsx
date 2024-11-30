import { useQuery } from '@tanstack/react-query';
import { ThemedText, ThemedView } from '../../../components/ThemedComponents';
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';
import { fetchGoals } from '@/api/goals';
import { GoalItem } from '@/components/pages/goals/GoalItem';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useBlackOrWhite } from '@/hooks/useBlackOrWhite';

export default function Goals() {
  const { t } = useTranslation()
  const iconColor = useBlackOrWhite()
  const router = useRouter()
  const { data: goals, isLoading, isError, error } = useQuery<GymGoal[]>(
    {
      queryKey: ['goals'],
      queryFn: fetchGoals,
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
    return <ThemedText>{t('error_fetching_goals')}: {error.message}</ThemedText>
  }

  if (!goals) {
    return <ThemedText>{t('error_fetching_goals')}</ThemedText>
  }

  return (
    <ThemedView className="flex-1">
      <View className='border-b-2 dark:border-white pb-3'>
        <TouchableOpacity
          className='bg-slate-200 dark:bg-slate-700 p-3 rounded-xl mt-2 flex-row justify-center items-center space-x-4'
          onPress={() => { router.push('/(app)/(screens)/addGoal') }}
        >
          <ThemedText className='text-xl text-center'>{t('add_goal')}</ThemedText>
          <MaterialIcons name="add-task" size={30} color={iconColor} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 32, paddingHorizontal: 12 }}>
        {goals.map(goal => (<GoalItem key={goal.gym_goal_id} goal={goal} />))}
      </ScrollView>
    </ThemedView>
  );
}