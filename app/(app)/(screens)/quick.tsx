import { useState } from 'react';
import { ThemedText, ThemedView } from "@/components/ThemedComponents";
import { ActivityIndicator, ScrollView, TouchableOpacity, Button } from 'react-native';
import { fetchExercises } from '@/api/exercises';
import { useQuery } from '@tanstack/react-query';
import { ExerciseIcon } from '@/components/ExerciseIcon';
import { CategorySelect } from "@/components/pages/quick/CategorySelect";
import { AntDesign } from "@expo/vector-icons";
import { useBlackOrWhite } from "@/hooks/useBlackOrWhite";
import { useRouter } from 'expo-router';

export default function Quick() {
  const iconColor = useBlackOrWhite();
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  const router = useRouter();

  const { data: exercises, isLoading, isError, error } = useQuery<Exercise[]>(
    {
      queryKey: ['exercises', selectedCategory],
      queryFn: () => fetchExercises(selectedCategory),
      refetchOnWindowFocus: false,
    }
  );

  const toggleSelectExercise = (newName: string) => {
    setSelectedExercises((prevSelected) =>
      prevSelected.includes(newName)
        ? prevSelected.filter((e) => e !== newName)
        : [...prevSelected, newName]
    );
  };

  const goToNextPage = () => {
    const serializedExercises = JSON.stringify(selectedExercises);
    router.push({
      pathname: '/(app)/(screens)/series',
      params: { selectedExercises: serializedExercises },
    });
  };

  if (isLoading) {
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
    <>
      <ThemedView className="flex-1 p-2">
        <TouchableOpacity
          className="flex-row justify-between rounded-md border-2 p-2 dark:border-white"
          onPress={() => setOpenModal(true)}>
          <ThemedText className="text-2xl">{selectedCategory}</ThemedText>
          <AntDesign name="caretdown" size={24} color={iconColor} />
        </TouchableOpacity>
        <CategorySelect
          setSelectedCategory={setSelectedCategory}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {exercises.map((item) => (
            <TouchableOpacity
              key={item.gym_exercise_id}
              onPress={() => toggleSelectExercise(item.name_exercise)}
              className={`flex flex-row items-center space-x-4 mt-2 ${selectedExercises.includes(item.name_exercise) ? 'bg-gray-300' : ''
                }`}>
              <ExerciseIcon exercise={item} />
              <ThemedText className="break-words text-xl flex-shrink">
                {item.name_exercise}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </ThemedView>
      
      <TouchableOpacity className='bg-slate-300 dark:bg-slate-800' disabled={selectedExercises.length === 0} onPress={goToNextPage}>
        <ThemedText className={`text-2xl p-4 font-poppinsBold text-center ${selectedExercises.length === 0 && 'opacity-30'}`}>Next</ThemedText>
      </TouchableOpacity>
    </>
  )
}