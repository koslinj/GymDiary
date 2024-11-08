import { ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText, ThemedView } from '../../../components/ThemedComponents';
import { useRouter } from 'expo-router';
import { fetchRoutines, removeRoutine } from '@/api/workouts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useBlackOrWhite } from '@/hooks/useBlackOrWhite';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { RoutineListItem } from '@/components/pages/routines/RoutineListItem';

export default function Routines() {
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const [removing, setRemoving] = useState(false)
  const [routinesToRemove, setRoutinesToRemove] = useState<Routine[]>([])
  const queryClient = useQueryClient()

  const { data: routines, isLoading, isError, error } = useQuery<Routine[]>(
    {
      queryKey: ['routines'],
      queryFn: fetchRoutines,
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

  if (isError) {
    return <ThemedText>Error fetching routines: {error.message}</ThemedText>;
  }

  if (!routines) {
    return <ThemedText>Error fetching routines</ThemedText>;
  }

  const handleRemove = async () => {
    setOpenModal(false)
    setRemoving(false)
    setRoutinesToRemove([])
    await Promise.all(
      routinesToRemove.map(routine => removeRoutine(routine.gym_routine_id))
    )
    await queryClient.invalidateQueries({ queryKey: ['routines'] })
  }

  return (
    <ThemedView className="flex-1">
      <ConfirmationModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title={'Removing routines'}
        desc={'Are you sure you want to remove these routines?'}
        onConfirm={handleRemove}
      />

      <ThemedView className='px-3 flex-grow flex-shrink'>
        <TouchableOpacity className='bg-slate-200 dark:bg-slate-700 my-3 p-3 rounded-xl' onPress={() => { router.push('/(app)/(screens)/addRoutine') }}>
          <ThemedText className='text-xl text-center'>Add routine</ThemedText>
        </TouchableOpacity>
        {removing ? (
          <TouchableOpacity className='bg-red-500 dark:bg-red-800 mb-8 p-3 rounded-xl' onPress={() => { setRemoving(false) }}>
            <ThemedText className='text-xl text-center'>Cancel</ThemedText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity className='bg-slate-200 dark:bg-slate-700 mb-8 p-3 rounded-xl' onPress={() => { setRemoving(true) }}>
            <ThemedText className='text-xl text-center'>Remove routine</ThemedText>
          </TouchableOpacity>
        )}
        <ScrollView>
          {routines.length > 0 ? (
            routines.map(item => <RoutineListItem key={item.gym_routine_id} item={item} removing={removing} routinesToRemove={routinesToRemove} setRoutinesToRemove={setRoutinesToRemove} />)
          ) : (
            <>
              <ThemedText className='text-2xl text-center mt-4'>You don't have any routines.</ThemedText>
              <TouchableOpacity
                onPress={() => router.push('/(app)/(screens)/addRoutine')}
              >
                <ThemedText className='text-2xl text-center mt-4 font-poppinsBold underline'>You can add some here</ThemedText>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </ThemedView>

      {removing && (
        <TouchableOpacity className='bg-slate-300 dark:bg-slate-800 border-t-2 border-slate-500' disabled={routinesToRemove.length === 0} onPress={() => setOpenModal(true)}>
          <ThemedText className={`text-2xl p-4 font-poppinsBold text-center ${routinesToRemove.length === 0 && 'opacity-30'}`}>Remove</ThemedText>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
}