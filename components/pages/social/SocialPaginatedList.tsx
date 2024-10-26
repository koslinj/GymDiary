import { FlatList, ActivityIndicator, } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '@/api/social';
import { ThemedText, ThemedView } from '@/components/ThemedComponents';
import { Post } from './Post';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';

export const SocialPaginatedList = () => {
  const styles = useGlobalStyles()

  const { data: posts, isLoading, isError, error } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: getAllPosts,
    refetchOnWindowFocus: false
  });

  if (isLoading) {
    return (
      <ThemedView className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" />
      </ThemedView>
    )
  }

  if (isError) {
    return <ThemedText>Error fetching posts: {error.message}</ThemedText>
  }

  if (!posts) {
    return <ThemedText>Error fetching posts</ThemedText>
  }

  const gymPosts = posts.filter((item) => item.type === 'gym')

  return (
    <FlatList
      contentContainerStyle={styles.safeTabBar}
      data={gymPosts}
      renderItem={({ item }) => (
        <Post key={item.post_id} post={item} />
      )}
      keyExtractor={(item) => item.post_id.toString()}
      ListFooterComponent={isLoading ? <ActivityIndicator size={'large'} /> : null}
    />
  );
};
