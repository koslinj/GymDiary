import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";

export const icon = {
  start: (props: any) => <FontAwesome6 name="play-circle" size={28} {...props} />,
  index: (props: any) => <Feather name='home' size={28} {...props} />,
  social: (props: any) => <Ionicons name="chatbubble-ellipses-outline" size={30} {...props} />,
  profile: (props: any) => <Feather name='user' size={28} {...props} />
}