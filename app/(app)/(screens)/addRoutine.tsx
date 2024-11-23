import { useState } from 'react';
import { ThemedText, ThemedView } from "@/components/ThemedComponents";
import { ActivityIndicator, ScrollView, TouchableOpacity, Button, TextInput } from 'react-native';
import { fetchExercises } from '@/api/exercises';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CategorySelect } from "@/components/pages/quick/CategorySelect";
import { AntDesign } from "@expo/vector-icons";
import { useBlackOrWhite } from "@/hooks/useBlackOrWhite";
import { ExerciseItem } from '@/components/pages/quick/ExerciseItem';
import { addRoutine } from '@/api/workouts';
import { PageModal } from '@/components/PageModal';
import { useColor } from '@/hooks/useColor';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function AddRoutine() {
  const { t } = useTranslation()
  const placeholderColor = useColor('#00000066', '#ffffff66')
  const iconColor = useBlackOrWhite();
  const [openModal, setOpenModal] = useState(false);
  const [openPageModal, setOpenPageModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [name, setName] = useState<string>('');

  const router = useRouter()
  const queryClient = useQueryClient()

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

  const showRoutineSubmitModal = () => {
    setOpenPageModal(true)
  };

  const handleSubmit = async () => {
    await addRoutine(name, selectedExercises)
    await queryClient.invalidateQueries({ queryKey: ['routines'] })
    router.replace('/(screens)/routines')
  }

  if (isLoading) {
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (isError) {
    return <ThemedText>{t('error_fetching_exercises')}: {error.message}</ThemedText>;
  }

  if (!exercises) {
    return <ThemedText>{t('error_fetching_exercises')}</ThemedText>;
  }

  return (
    <>
      <PageModal
        openModal={openPageModal}
        setOpenModal={setOpenPageModal}
      >
        <ThemedText className='text-2xl font-poppinsBold text-center mb-3'>{t('new_routine')}</ThemedText>
        <ThemedText className='text-xl text-slate-400 italic'>{t('name_of_routine_')}</ThemedText>
        <TextInput
          className="p-2 text-lg border-2 rounded-md mb-3 dark:border-white dark:text-white"
          placeholderTextColor={placeholderColor}
          value={name}
          placeholder='Routine name...'
          autoCapitalize='none'
          onChangeText={(text) => setName(text)}
        />
        <ThemedText className='text-xl text-slate-400 italic mt-2'>{t('selected_exercises_')}</ThemedText>
        {selectedExercises.length > 6 ? (
          <>
            {selectedExercises.slice(0, 6).map(e => <ThemedText key={e} className='text-xl mt-1'>{e}</ThemedText>)}
            <ThemedText className='text-xl italic text-center mt-1 text-slate-400'>{t('and_more_')}</ThemedText>
          </>
        ) : (
          selectedExercises.map(e => <ThemedText key={e} className='text-xl mt-1'>{e}</ThemedText>)
        )}
        <TouchableOpacity
          className="bg-secondary-400 dark:bg-secondary-700 p-3 mt-3 rounded-md w-full mx-auto"
          onPress={handleSubmit}
        >
          <ThemedText className='text-xl text-center font-poppinsBold'>{t('submit')}</ThemedText>
        </TouchableOpacity>
      </PageModal>

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
            <ExerciseItem key={item.gym_exercise_id} exercise={item} toggleSelectExercise={toggleSelectExercise} selected={selectedExercises.includes(item.name_exercise)} />
          ))}
        </ScrollView>
      </ThemedView>

      <TouchableOpacity className='bg-slate-300 dark:bg-slate-800' disabled={selectedExercises.length === 0} onPress={showRoutineSubmitModal}>
        <ThemedText className={`text-2xl p-4 font-poppinsBold text-center ${selectedExercises.length === 0 && 'opacity-30'}`}>{t('proceed_routine_creation')}</ThemedText>
      </TouchableOpacity>
    </>
  )
}