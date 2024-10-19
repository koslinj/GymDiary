import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useGlobalStyles = () => {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    safeArea: {
      paddingTop: insets.top,
    },
    safeTabBar: {
      paddingBottom: 74
    }
  });
};