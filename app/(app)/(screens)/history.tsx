import { HistoryPaginatedList } from '@/components/pages/history/HistoryPaginatedList';
import { ThemedView } from '../../../components/ThemedComponents';
import { useLocalSearchParams } from 'expo-router';
import { PickWorkoutList } from '@/components/pages/addPost/PickWorkoutList';

export default function History() {
  const { isPickingWorkout, desc } = useLocalSearchParams();

  return (
    <ThemedView className="flex-1 px-1">
      {isPickingWorkout ? (
        <PickWorkoutList desc={desc as string} />
      ) : (
        <HistoryPaginatedList />
      )}
    </ThemedView>
  );
}