import React, { useCallback, useRef, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { SocialPaginatedList } from "@/components/pages/social/SocialPaginatedList";
import { useGlobalStyles } from "@/hooks/useGlobalStyles";
import { Colors } from "@/constants/Colors";
import { ThemedText, ThemedView } from "@/components/ThemedComponents";
import { useBlackOrWhite } from "@/hooks/useBlackOrWhite";
import { useColor } from "@/hooks/useColor";
import { getComments } from "@/api/social";
import { useQuery } from "@tanstack/react-query";
import { ProfilePhoto } from "@/components/pages/profile/ProfilePhoto";
import { FloatingButton } from "@/components/pages/social/FloatingButton";
import { CommentInput } from "@/components/pages/social/CommentInput";

export default function Social() {
  const styles = useGlobalStyles()
  const sheetRef = useRef<BottomSheet>(null);
  const borderColor = useBlackOrWhite()
  const bgColor = useColor(Colors.slate200, Colors.slate800)
  const [currentPost, setCurrentPost] = useState<Post>()
  const [newComment, setNewComment] = useState("")

  const renderItem = useCallback(
    ({ item }: { item: PostComment }) => (
      <View className="mt-4 p-2 flex-row items-center space-x-3">
        <ProfilePhoto size="ICON" uri={item.profile_photo} />
        <View className="flex-shrink">
          <ThemedText className="opacity-60">{item.nickname}</ThemedText>
          <ThemedText className="text-lg">{item.description}</ThemedText>
        </View>
      </View>
    ),
    []
  );

  const openComments = useCallback((post: Post) => {
    setCurrentPost(post)
    sheetRef.current?.snapToIndex(0);
  }, []);

  const { data: comments, isLoading, isError, error } = useQuery<PostComment[]>({
    queryKey: ['postComments', currentPost?.post_id],
    queryFn: () => getComments(currentPost?.post_id as number),
    enabled: !!currentPost,
    refetchOnWindowFocus: false
  });

  if (isError) {
    return <ThemedText>Error fetching comments: {error.message}</ThemedText>
  }

  return (
    <GestureHandlerRootView className="bg-white dark:bg-slate-900 flex-1 px-2" style={styles.safeArea}>
      <FloatingButton />
      <SocialPaginatedList openComments={openComments} />

      <BottomSheet
        ref={sheetRef}
        snapPoints={['50%', '90%']}
        enableDynamicSizing={false}
        enablePanDownToClose={true}
        index={-1}
        backgroundStyle={{ backgroundColor: bgColor }}
        containerStyle={{ zIndex: 51 }}
        style={{ borderWidth: 2, borderColor: borderColor, borderRadius: 16 }}
        handleIndicatorStyle={{ backgroundColor: borderColor }}
      >
        <CommentInput newComment={newComment} setNewComment={setNewComment} currentPost={currentPost} />

        {isLoading ? (
          <ThemedView className="my-2 justify-center items-center bg-slate-200 dark:bg-slate-800">
            <ActivityIndicator size="large" />
          </ThemedView>
        ) : (
          <BottomSheetFlatList
            data={comments}
            keyExtractor={(i) => i.comment_id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 74 }}
          />
        )}
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
