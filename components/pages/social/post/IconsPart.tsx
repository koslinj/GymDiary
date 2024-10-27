import { View, TouchableOpacity, Animated } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { AntDesign, Octicons } from '@expo/vector-icons'
import { ThemedText } from '@/components/ThemedComponents'
import { useBlackOrWhite } from '@/hooks/useBlackOrWhite'
import { likePost, unlikePost } from '@/api/social'

interface Props {
  post: Post
  openComments: (post: Post) => void
}

export const IconsPart: FC<Props> = ({ post, openComments }) => {
  const iconColor = useBlackOrWhite();
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [loading, setLoading] = useState(false)
  const [likeData, setLikeData] = useState({
    isLike: post.isLike,
    likesCount: post.likesCount,
  });

  const animateHeart = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.3,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleHeartPress = async () => {
    if (loading) return

    const newIsLike = !likeData.isLike;
    const newLikesCount = newIsLike ? likeData.likesCount + 1 : likeData.likesCount - 1;

    setLikeData({
      isLike: newIsLike,
      likesCount: newLikesCount,
    });

    animateHeart()

    setLoading(true)
    try {
      newIsLike ? await likePost(post.post_id) : await unlikePost(post.post_id)
    } catch (error) {
      console.error("Error updating like status:", error);

      setLikeData({
        isLike: !newIsLike,
        likesCount: newIsLike ? newLikesCount - 1 : newLikesCount + 1
      });
    } finally {
      setLoading(false)
    }
  };

  return (
    <View className="flex-row mt-4">
      <View className="flex-row space-x-3 items-center">
        <TouchableOpacity onPress={handleHeartPress} disabled={loading}>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <AntDesign
              name={likeData.isLike ? "heart" : "hearto"}
              size={34}
              color={likeData.isLike ? "red" : iconColor}
            />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity>
          <ThemedText numberOfLines={1} ellipsizeMode="tail" className="text-lg max-w-[80px] pr-8">
            {likeData.likesCount}
          </ThemedText>
        </TouchableOpacity>
      </View>
      <View className="flex-row space-x-3 items-center">
        <TouchableOpacity onPress={() => openComments(post)}>
          <Octicons name="comment" size={34} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity>
          <ThemedText numberOfLines={1} ellipsizeMode="tail" className="text-lg max-w-[80px] pr-8">
            {post.commentsCount}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};
