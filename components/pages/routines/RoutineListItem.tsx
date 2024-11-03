import { Image, TouchableOpacity } from 'react-native';
import { FC } from 'react';
import { ThemedText, ThemedView } from '@/components/ThemedComponents';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useBlackOrWhite } from '@/hooks/useBlackOrWhite';
import { useRouter } from 'expo-router';
import { getRoutineExercises } from '@/api/workouts';

interface Props {
  item: Routine
  removing: boolean
  routinesToRemove: Routine[]
  setRoutinesToRemove: React.Dispatch<React.SetStateAction<Routine[]>>
}

export const RoutineListItem: FC<Props> = ({ item, removing, routinesToRemove, setRoutinesToRemove }) => {
  const iconColor = useBlackOrWhite()
  const router = useRouter()

  const handlePressRoutine = async () => {
    let exercises = await getRoutineExercises(item.gym_routine_id)
    let exerciseNames = exercises.map(e => e.name_exercise)

    const serializedExercises = JSON.stringify(exerciseNames);
    router.push({
      pathname: '/(app)/(screens)/sets',
      params: { selectedExercises: serializedExercises },
    });
  }

  const toggleRoutineRemoval = (routine: Routine) => {
    setRoutinesToRemove(prev => {
      const exists = prev.find(r => r.gym_routine_id === routine.gym_routine_id);

      if (exists) {
        return prev.filter(r => r.gym_routine_id !== routine.gym_routine_id);
      } else {
        return [...prev, routine];
      }
    });
  };

  return removing ? (
    <ThemedView
      className={`${routinesToRemove.find(r => r.gym_routine_id === item.gym_routine_id) && 'bg-red-400 dark:bg-red-700'} flex-row justify-between items-center border-2 dark:border-white p-3 rounded-md mb-3`}
    >
      <ThemedText className='text-2xl font-poppinsBold'>{item.name_routine}</ThemedText>
      <TouchableOpacity onPress={() => toggleRoutineRemoval(item)}>
        <Ionicons name="trash-sharp" size={40} color={iconColor} />
      </TouchableOpacity>
    </ThemedView>
  ) : (
    <TouchableOpacity
      onPress={handlePressRoutine}
      className='flex-row justify-between items-center border-2 dark:border-white p-3 rounded-md mb-3'
    >
      <ThemedText className='text-2xl font-poppinsBold'>{item.name_routine}</ThemedText>
      <FontAwesome name="angle-double-right" size={40} color={iconColor} />
    </TouchableOpacity>
  )
};
