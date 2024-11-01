import { Post } from '@/components/pages/social/Post';
import { ThemedView } from '@/components/ThemedComponents';
import { useLocalSearchParams } from 'expo-router';

export default function PostDetail() {
  const { post } = useLocalSearchParams();

  const parsed = JSON.parse(post as string)

  return (
    <ThemedView className='flex-1'>
      <Post post={parsed} />
    </ThemedView>
  );
}
