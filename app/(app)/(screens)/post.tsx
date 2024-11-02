import { WorkoutDataAccordion } from '@/components/pages/history/WorkoutDataAccordion';
import { Post } from '@/components/pages/social/Post';
import { ThemedText, ThemedView } from '@/components/ThemedComponents';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';

export default function PostDetail() {
  const { post } = useLocalSearchParams();
  const parsed: Post = JSON.parse(post as string)

  const formattedDate = new Date(parsed.workout.date).toLocaleString('en-GB', {
    dateStyle: 'long',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
  const formattedTime = new Date(parsed.workout.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })

  return (
    <ThemedView className='flex-1'>
      <ScrollView>
        <Post post={parsed} />
        <ThemedText className='text-3xl mt-8 font-poppinsBold text-center'>Workout:</ThemedText>
        <ThemedView className="flex-row justify-center space-x-4">
          <ThemedText className="text-lg">{formattedDate}</ThemedText>
          <ThemedText className="text-lg">{formattedTime}</ThemedText>
        </ThemedView>
        <ThemedView className="bg-slate-200 dark:bg-slate-700 m-3 mt-0 p-3 rounded-xl">
          <WorkoutDataAccordion workoutId={parsed.workout.workoutId} />
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}
