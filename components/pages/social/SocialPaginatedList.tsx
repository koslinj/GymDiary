import React, { FC, useState, useCallback } from 'react';
import { FlatList, ActivityIndicator, RefreshControl, TextInput } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllPostsInfinite } from '@/api/social';
import { Post } from './Post';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { ThemedText, ThemedView } from '@/components/ThemedComponents';
import { useTranslation } from 'react-i18next';
import { useColor } from '@/hooks/useColor';

interface Props {
  openComments: (post: Post) => void;
}

export const SocialPaginatedList: FC<Props> = ({ openComments }) => {
  const { t } = useTranslation()
  const styles = useGlobalStyles();
  const placeholderColor = useColor('#00000066', '#ffffff66')
  const [search, setSearch] = useState("")

  const [refreshing, setRefreshing] = useState(false);

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['posts', search],
    queryFn: ({ pageParam = 1, queryKey }) => {
      const [_, search] = queryKey
      return getAllPostsInfinite(pageParam, search)
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

  if (isError) {
    return <ThemedText>{t('error_fetching_posts')}</ThemedText>
  }

  const gymPosts = data?.pages.flatMap((page) =>
    page.posts.filter((item: any) => item.type === 'gym')
  );

  return (
    <FlatList
      ListHeaderComponent={
        <TextInput
          className="p-2 text-lg border-2 rounded-md mb-3 dark:border-white dark:text-white"
          placeholderTextColor={placeholderColor}
          value={search}
          placeholder={`${t('user_nickname')}...`}
          autoCapitalize='none'
          onChangeText={(text) => setSearch(text)}
        />
      }
      contentContainerStyle={styles.safeTabBar}
      data={gymPosts}
      renderItem={({ item }) => (
        <Post key={item.post_id} post={item} openComments={openComments} />
      )}
      keyExtractor={(item) => item.post_id.toString()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="large" /> : null}
      ListEmptyComponent={
        isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <ThemedText className="text-center text-2xl font-poppinsBold">{t('no_posts')}</ThemedText>
        )
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
    />
  );
};
