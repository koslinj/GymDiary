import { FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchWorkoutsInfinite } from '@/api/workouts';
import { HistoryCard } from '../history/HistoryCard';
import { useRouter } from 'expo-router';
import { FC } from 'react';

interface Props {
  desc: string
}

export const PickWorkoutList: FC<Props> = ({ desc }) => {
  const router = useRouter()

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['workouts'],
    queryFn: ({ pageParam = 1, queryKey }) => {
      return fetchWorkoutsInfinite(pageParam)
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
  });

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handlePickWorkout = (workout: GymWorkoutSummary) => {
    router.replace({
      pathname: '/addPost',
      params: { workout: JSON.stringify(workout), desc: desc }
    });
  }

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 40 }}
      data={data?.pages.flatMap((page) => page.workouts)}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePickWorkout(item)}>
          <HistoryCard key={item.workoutId} workout={item} />
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.workoutId.toString()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0}
      ListFooterComponent={(isLoading || isFetchingNextPage) ? <ActivityIndicator size={'large'} /> : null}
    />
  );
};
