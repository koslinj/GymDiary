import { WorkoutDataAccordion } from '@/components/pages/history/WorkoutDataAccordion';
import { Post } from '@/components/pages/social/Post';
import { DeleteButton } from '@/components/pages/social/post/DeleteButton';
import { ThemedText, ThemedView } from '@/components/ThemedComponents';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

export default function PostDetail() {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language;
  const { post } = useLocalSearchParams();
  const parsed: Post = JSON.parse(post as string)

  const formattedDate = new Date(parsed.workout.date).toLocaleString(currentLanguage, {
    dateStyle: 'long',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
  const formattedTime = new Date(parsed.workout.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })

  return (
    <ThemedView className='flex-1'>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <Post post={parsed} />
        <ThemedText className='text-3xl mt-8 font-poppinsBold text-center'>{t('workout')}:</ThemedText>
        <ThemedView className="flex-row justify-center space-x-4">
          <ThemedText className="text-lg">{formattedDate}</ThemedText>
          <ThemedText className="text-lg">{formattedTime}</ThemedText>
        </ThemedView>
        <ThemedView className="bg-slate-200 dark:bg-slate-700 m-3 mt-0 p-3 rounded-xl">
          <WorkoutDataAccordion workoutId={parsed.workout.workoutId} />
        </ThemedView>
        <DeleteButton post={parsed} />
      </ScrollView>
    </ThemedView>
  );
}
