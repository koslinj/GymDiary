import { ThemedText, ThemedView } from "@/components/ThemedComponents";
import { FC } from "react";
import { ProfilePhoto } from "../profile/ProfilePhoto";
import { View } from "react-native";
import { IconsPart } from "./post/IconsPart";
import { RatingPart } from "./post/RatingPart";
import { LinkPart } from "./post/LinkPart";
import { DataPart } from "./post/DataPart";

interface Props {
  post: Post
  openComments?: (post: Post) => void
}

export const Post: FC<Props> = ({ post, openComments }) => {

  const formattedDate = new Date(post.creation_time).toLocaleString('en-GB', {
    dateStyle: 'long',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
  const formattedTime = new Date(post.creation_time).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })

  return !openComments ? (
    <ThemedView className="bg-transparent rounded-xl p-3">
      <View className="flex-row justify-center space-x-3">
        <ThemedText className="text-lg">{formattedDate}</ThemedText>
        <ThemedText className="text-lg opacity-60 text-center">{formattedTime}</ThemedText>
      </View>
      <View className="items-center flex-row space-x-2">
        <ProfilePhoto size="ICON" uri={post.profile_photo} />
        <ThemedText className="text-lg">{post.nickname}</ThemedText>
      </View>
      <ThemedText className='text-center text-xl mb-3 italic'>{post.description}</ThemedText>
      <DataPart post={post} />
      <RatingPart rating={post.workout.rating} />
    </ThemedView>
  ) : (
    <ThemedView className="bg-slate-200 dark:bg-slate-700 rounded-xl p-3 mb-5">
      <LinkPart post={post} />
      <View className="flex-row justify-center space-x-3">
        <ThemedText className="text-lg">{formattedDate}</ThemedText>
        <ThemedText className="text-lg opacity-60 text-center">{formattedTime}</ThemedText>
      </View>
      <View className="items-center flex-row space-x-2">
        <ProfilePhoto size="ICON" uri={post.profile_photo} />
        <ThemedText className="text-lg">{post.nickname}</ThemedText>
      </View>
      <ThemedText className='text-center text-xl mb-3 italic'>{post.description}</ThemedText>
      <DataPart post={post} />
      <RatingPart rating={post.workout.rating} />
      <IconsPart openComments={openComments} post={post} />
    </ThemedView>
  )
};
