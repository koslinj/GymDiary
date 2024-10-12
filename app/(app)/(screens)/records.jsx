import { useEffect, useState } from 'react';
import { ThemedText, ThemedView } from '../../../components/ThemedComponents';
import axios from "@/config/axiosConfig"
import { ActivityIndicator, RefreshControl, ScrollView, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function Records() {
  const [records, setRecords] = useState()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = async () => {
    const response = await axios.get(`/run/records/getRecords`);
    setRecords(response.data.records)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true);
    setLoading(true)
    await fetchData();
    setRefreshing(false);
  };

  return (
    <ThemedView className="flex-1 px-1">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <View>
            <View className='mx-auto my-4'>
              <FontAwesome5 name="trophy" size={120} color={Colors.gold} />
            </View>
            <View className='flex-1 items-center justify-center gap-y-6 my-auto'>
              <ThemedView className='flex justify-center items-center w-2/3 py-8 bg-slate-200 dark:bg-slate-700 rounded-xl'>
                <ThemedText className='text-4xl font-poppinsBold'>{records.longest_distance} km</ThemedText>
                <ThemedText>Longest distance</ThemedText>
              </ThemedView>
              <ThemedView className='flex justify-center items-center w-2/3 py-8 bg-slate-200 dark:bg-slate-700 rounded-xl'>
                <ThemedText className='text-4xl font-poppinsBold'>{records.highest_average_pulse}</ThemedText>
                <ThemedText>Highest average pulse</ThemedText>
              </ThemedView>
              <ThemedView className='flex justify-center items-center w-2/3 py-8 bg-slate-200 dark:bg-slate-700 rounded-xl'>
                <ThemedText className='text-4xl font-poppinsBold'>{records.longest_duration}</ThemedText>
                <ThemedText>Longest duration</ThemedText>
              </ThemedView>
            </View>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}