import { HistoryPaginatedList } from '@/components/pages/history/HistoryPaginatedList';
import { ThemedView } from '../../../components/ThemedComponents';

export default function History() {

  return (
    <ThemedView className="flex-1 flex-row px-1">
      <HistoryPaginatedList />
    </ThemedView>
  );
}