import React, { FC, useState, useCallback } from 'react';
import { FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllPostsInfinite } from '@/api/social';
import { Post } from './Post';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { ThemedView } from '@/components/ThemedComponents';

interface Props {
  openComments: (post: Post) => void;
}

export const SocialPaginatedList: FC<Props> = ({ openComments }) => {
  const styles = useGlobalStyles();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['posts'],
    queryFn: getAllPostsInfinite,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
  });

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  if (isLoading) {
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const gymPosts = data?.pages.flatMap((page) => 
    page.posts.filter((item: any) => item.type === 'gym')
  );

  return (
    <FlatList
      contentContainerStyle={styles.safeTabBar}
      data={gymPosts}
      renderItem={({ item }) => (
        <Post key={item.post_id} post={item} openComments={openComments} />
      )}
      keyExtractor={(item) => item.post_id.toString()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="large" /> : null}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
    />
  );
};
