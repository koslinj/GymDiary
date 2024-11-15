import { useState } from 'react';
import { ThemedText, ThemedView } from '../../../components/ThemedComponents';
import { ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { fetchExercises } from '@/api/exercises';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { RecordsExerciseItem } from '@/components/pages/records/RecordsExerciseItem';
import { FontAwesome6 } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function Records() {
  const router = useRouter();

  const { data: exercises, isLoading, isRefetching, isError, error } = useQuery<Exercise[]>(
    {
      queryKey: ['exercises', "inRecords"],
      queryFn: () => fetchExercises('All'),
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (isRefetching) {
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (isError) {
    return <ThemedText>Error fetching exercises: {error.message}</ThemedText>;
  }

  if (!exercises) {
    return <ThemedText>Error fetching exercises</ThemedText>;
  }

  return (
    <ThemedView className="flex-1 px-2">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ThemedView className='border-2 border-slate-400 rounded-xl p-3 mx-3 mt-2 mb-6 flex-row justify-center items-center space-x-6'>
          <FontAwesome6 name="circle-info" size={36} color={Colors.slate400} />
          <ThemedText className='text-lg text-slate-400'>Pick an exercise to see your records</ThemedText>
        </ThemedView>
        {exercises.map((item) => (
          <TouchableOpacity onPress={() => router.push(`/record/${item.name_exercise}`)} key={item.gym_exercise_id}>
            <RecordsExerciseItem exercise={item} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}