import { TextInput, useColorScheme } from "react-native";

export const AuthTextInput = ({ placeholder, value, field, onChange }) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <TextInput
      className="p-2 text-lg border-2 rounded-md mb-3 dark:border-white dark:text-white"
      placeholderTextColor={isDark ? '#ffffff66' : '#00000066'}
      autoCapitalize="none"
      placeholder={placeholder}
      value={value}
      secureTextEntry={field === "password"}
      onChangeText={(text) => onChange(field, text)}
    />
  )
}