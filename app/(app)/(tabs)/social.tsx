import { ThemedText, ThemedView } from '../../../components/ThemedComponents';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';


export default function AddScreen() {
  const styles = useGlobalStyles()

  return (
    <ThemedView className="flex-1" style={styles.safeArea}>
      <ThemedText className='text-2xl text-center'>SOCIAL</ThemedText>
    </ThemedView>
  );
}
