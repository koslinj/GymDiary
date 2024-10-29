import { FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { HistoryCard } from './HistoryCard';
import { useRouter } from 'expo-router';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchWorkouts, fetchWorkoutsInfinite } from '@/api/workouts';

export const HistoryPaginatedList = () => {
  const router = useRouter();

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['workouts'],
    queryFn: fetchWorkoutsInfinite,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
  });

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 40 }}
      data={data?.pages.flatMap((page) => page.workouts)}
      renderItem={({ item }) => (
        <HistoryCard key={item.workoutId} workout={item} />
      )}
      keyExtractor={(item) => item.workoutId.toString()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0}
      ListFooterComponent={(isLoading || isFetchingNextPage) ? <ActivityIndicator size={'large'} /> : null}
    />
  );
};
