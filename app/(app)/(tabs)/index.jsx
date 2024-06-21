import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../../context/authContext';
import { ProgressChart } from '../../../components/ProgressChart';
import { ThemedText, ThemedView } from '../../../components/ThemedComponents';

export default function HomeScreen() {
  const { logout } = useAuth()
  const handleLogout = async () => {
    await logout()
  }

  return (
    <ThemedView className="flex-1 items-center justify-center">
      <ThemedText className="text-xl font-poppins">Home Screen</ThemedText>
      <TouchableOpacity className="bg-secondary-400 dark:bg-secondary-700 mt-4 p-2 rounded-md" onPress={handleLogout}>
      <ThemedText className="text-lg font-poppins">Log out</ThemedText>
      </TouchableOpacity>
      <ProgressChart />
      <StatusBar style="auto" />
    </ThemedView>
  );
}
