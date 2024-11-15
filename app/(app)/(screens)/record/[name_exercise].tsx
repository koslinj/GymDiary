import { WorkoutDetails } from '@/components/pages/history/WorkoutDetails';
import { RecordDetails } from '@/components/pages/records/RecordDetails';
import { ThemedView } from '@/components/ThemedComponents';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator } from 'react-native';

export default function Record() {
  const { name_exercise } = useLocalSearchParams();

  if (!name_exercise) {
    return (
      <ThemedView className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" />
      </ThemedView>
    )
  }

  return (
    <RecordDetails name_exercise={name_exercise as string} />
  );
}
