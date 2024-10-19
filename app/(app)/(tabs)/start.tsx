import { FontAwesome5 } from '@expo/vector-icons';
import { ThemedText, ThemedView } from '../../../components/ThemedComponents';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { useBlackOrWhite } from '@/hooks/useBlackOrWhite';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function StartRun() {
  const router = useRouter()
  const styles = useGlobalStyles()
  const iconColor = useBlackOrWhite()

  return (
    <ThemedView className='flex-1 justify-end' style={[styles.safeArea, styles.safeTabBar]}>

      <ThemedView className='flex-row mb-4 justify-center'>
        <ThemedView className='basis-1/2'>
          <TouchableOpacity className='mx-3 bg-slate-200 dark:bg-slate-700 items-center p-3 rounded-3xl'>
            <FontAwesome5 name="clipboard-list" size={70} color={iconColor} />
            <ThemedText className='mt-2 text-xl'>Routine</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        <ThemedView className='basis-1/2'>
          <TouchableOpacity
          onPress={() => router.push('/(screens)/quick')}
          className='mx-3 bg-slate-200 dark:bg-slate-700 items-center p-3 rounded-3xl'
          >
            <FontAwesome5 name="bolt" size={70} color={iconColor} />
            <ThemedText className='mt-2 text-xl'>Quick</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}