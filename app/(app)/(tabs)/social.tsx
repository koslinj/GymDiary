import { SocialPaginatedList } from '@/components/pages/social/SocialPaginatedList';
import { ThemedText, ThemedView } from '../../../components/ThemedComponents';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';

export default function Social() {
  const styles = useGlobalStyles()

  return (
    <ThemedView className="flex-1 px-2" style={styles.safeArea}>
      <SocialPaginatedList />
    </ThemedView>
  );
}
