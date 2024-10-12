import { useColorScheme } from "react-native";

export function useColor(light: string, dark: string) {
  const isDark = useColorScheme() === 'dark'

  if(isDark) return dark
  else return light
}