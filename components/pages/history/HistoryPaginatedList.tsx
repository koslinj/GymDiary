import { FlatList, ActivityIndicator, TouchableOpacity, RefreshControl, View, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchWorkoutsInfinite } from '@/api/workouts';
import { HistoryCard } from './HistoryCard';
import { useCallback, useState } from 'react';
import { ThemedView } from '@/components/ThemedComponents';
import { PickDate } from '@/components/auth/PickDate';

export const HistoryPaginatedList = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const onStartDateChange = (event: any, selectedDate: any) => {
    setShowStartDatePicker(Platform.OS === 'ios');
    if (event.type !== 'dismissed') {
      setStartDate(selectedDate)
    }
  };

  const onEndDateChange = (event: any, selectedDate: any) => {
    setShowEndDatePicker(Platform.OS === 'ios');
    if (event.type !== 'dismissed') {
      setEndDate(selectedDate)
    }
  };

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
    queryKey: ['workouts', startDate, endDate],
    queryFn: ({ pageParam = 1, queryKey }) => {
      const [_, startDate, endDate] = queryKey
      return fetchWorkoutsInfinite(pageParam, startDate, endDate)
    },
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
      ListHeaderComponent={
        <View className='flex-row justify-between mx-2 flex-wrap items-center'>
          <PickDate
            value={startDate}
            show={showStartDatePicker}
            onChange={onStartDateChange}
            setShowDatePicker={setShowStartDatePicker}
            customText='start_date'
          />
          <PickDate
            value={endDate}
            show={showEndDatePicker}
            onChange={onEndDateChange}
            setShowDatePicker={setShowEndDatePicker}
            customText='end_date'
          />
        </View>
      }
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
