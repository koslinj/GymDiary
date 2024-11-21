import { FlatList, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchWorkoutsInfinite } from '@/api/workouts';
import { HistoryCard } from './HistoryCard';
import { useCallback, useState } from 'react';
import { ThemedView } from '@/components/ThemedComponents';

export const HistoryPaginatedList = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data,
    isLoading,
    isRefetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['workouts'],
    queryFn: fetchWorkoutsInfinite,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
  });

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isRefetching) {
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 40 }}
      data={data?.pages.flatMap((page) => page.workouts)}
      renderItem={({ item }) => (
        <TouchableOpacity key={item.workoutId} onPress={() => router.push(`/workout/${item.workoutId}`)}>
          <HistoryCard workout={item} />
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.workoutId.toString()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0}
      ListFooterComponent={(isLoading || isFetchingNextPage) ? <ActivityIndicator size={'large'} /> : null}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
    />
  );
};
