import { WorkoutDetails } from '@/components/pages/history/WorkoutDetails';
import { ThemedView } from '@/components/ThemedComponents';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator } from 'react-native';

export default function Workout() {
  const { id } = useLocalSearchParams();

  if (!id) {
    return (
      <ThemedView className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" />
      </ThemedView>
    )
  }

  return (
    <WorkoutDetails workoutId={parseInt(id as string)} />
  );
}
