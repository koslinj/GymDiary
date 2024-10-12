import { ThemedText, ThemedView } from '../../../components/ThemedComponents';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';

export default function StartRun() {
  const styles = useGlobalStyles()

  return (
    <ThemedView className='flex-1' style={[styles.safeArea, styles.safeTabBar]}>
      <ThemedText>AAAA</ThemedText>
    </ThemedView>
  );
}