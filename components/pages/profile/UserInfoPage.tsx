import { ThemedText, ThemedView } from "@/components/ThemedComponents";
import { FC } from "react";
import { ProfilePhoto } from "./ProfilePhoto";
import { AntDesign } from "@expo/vector-icons";
import { useBlackOrWhite } from "@/hooks/useBlackOrWhite";
import { TouchableOpacity, View } from "react-native";
import { useColor } from "@/hooks/useColor";
import { formatDate } from "@/utils/formating";

interface Props {
  userInfo: UserInfo
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserInfoPage: FC<Props> = ({ userInfo, setOpenModal }) => {

  return (
    <ThemedView className="bg-transparent pt-2 items-center gap-y-3">
      <TouchableOpacity className='absolute -right-1 -top-1' onPress={() => setOpenModal(false)}>
        <AntDesign name="close" size={40} color={useBlackOrWhite()} />
      </TouchableOpacity>
      <ProfilePhoto uri={userInfo.profile_photo} size="BIG" />
      <View className="items-center">
        <ThemedText className={`-mb-2 ${useColor("text-slate-500", "text-slate-300")}`}>Nickname</ThemedText>
        <ThemedText className="font-poppinsBold text-3xl">{userInfo.nickname}</ThemedText>
      </View>
      <View className="items-center">
        <ThemedText className={`-mb-2 ${useColor("text-slate-500", "text-slate-300")}`}>Email</ThemedText>
        <ThemedText className="text-2xl">{userInfo.email}</ThemedText>
      </View>
      <View className="items-center">
        <ThemedText className={`-mb-2 ${useColor("text-slate-500", "text-slate-300")}`}>Description</ThemedText>
        <ThemedText className="italic text-2xl">{userInfo.description}</ThemedText>
      </View>
      <View className="items-center">
        <ThemedText className={`-mb-2 ${useColor("text-slate-500", "text-slate-300")}`}>Date of birth</ThemedText>
        <ThemedText className="text-xl">{formatDate(userInfo.date_of_birth)}</ThemedText>
      </View>
      <View className="items-center">
        <ThemedText className={`-mb-2 ${useColor("text-slate-500", "text-slate-300")}`}>Friends count</ThemedText>
        <ThemedText className=" font-poppinsBold text-2xl">{userInfo.friends_count}</ThemedText>
      </View>
      <ThemedText className={`-mb-2 ${useColor("text-slate-500", "text-slate-300")}`}>Created at {formatDate(userInfo.created_at)}</ThemedText>
    </ThemedView>
  )
}