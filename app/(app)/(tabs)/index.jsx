import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../../context/authContext';

export default function HomeScreen() {
  const { logout } = useAuth()
  const handleLogout = async () => {
    await logout()
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-poppins">Home Screen</Text>
      <TouchableOpacity className="bg-secondary-200 mt-4 p-2 rounded-md" onPress={handleLogout}>
        <Text className="text-lg">Log out</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
