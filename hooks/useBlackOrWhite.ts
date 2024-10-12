import { useColorScheme } from "react-native";

export function useBlackOrWhite() {
  const isDark = useColorScheme() === 'dark'

  if(isDark) return "white"
  else return "black"
}