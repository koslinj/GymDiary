import { FC } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useBlackOrWhite } from "@/hooks/useBlackOrWhite";
import { addComment } from "@/api/social";
import { useQueryClient } from "@tanstack/react-query";
import { useColor } from "@/hooks/useColor";
import { useTranslation } from "react-i18next";

interface Props {
  newComment: string
  setNewComment: React.Dispatch<React.SetStateAction<string>>
  currentPost: Post | undefined
}

export const CommentInput: FC<Props> = ({ newComment, setNewComment, currentPost }) => {
  const { t } = useTranslation()
  const iconColor = useBlackOrWhite()
  const placeholderColor = useColor('#00000066', '#ffffff66')
  const queryClient = useQueryClient()

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      Alert.alert(t('comment_not_empty'));
      return;
    }

    try {
      await addComment(currentPost?.post_id as number, newComment.trim())
      setNewComment("")
      await queryClient.invalidateQueries({ queryKey: ['postComments', currentPost?.post_id] })
      await queryClient.invalidateQueries({ queryKey: ['posts'] })
    } catch (err) {
      Alert.alert(t('error_adding_comment'), err?.toString());
    }
  };

  return (
    <View>
      <TextInput
        onSubmitEditing={handleAddComment}
        placeholder={t('write_a_comment')}
        value={newComment}
        onChangeText={setNewComment}
        placeholderTextColor={placeholderColor}
        className="p-2 bg-white dark:bg-slate-700 rounded-md mb-2 text-black dark:text-white mx-3 text-lg"
      />
      <TouchableOpacity onPress={handleAddComment} className="absolute right-5 top-[7px]">
        <MaterialCommunityIcons name="send" size={30} color={iconColor} />
      </TouchableOpacity>
    </View>
  )
};
