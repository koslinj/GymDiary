import { useBlackOrWhite } from "@/hooks/useBlackOrWhite";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export const FloatingButton = () => {
  const router = useRouter()
  const iconColor = useBlackOrWhite()

  return (
    <TouchableOpacity
      style={{ elevation: 3 }}
      className='bg-secondary-400 dark:bg-secondary-700 absolute bottom-[82px] z-50 right-2 w-16 h-16 rounded-full justify-center items-center aspect-square'
      onPress={() => { router.push('/(app)/(screens)/addPost') }}
    >
      <FontAwesome5 name="plus" size={30} color={iconColor} />
    </TouchableOpacity>
  )
}