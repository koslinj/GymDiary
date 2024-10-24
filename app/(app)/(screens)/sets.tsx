import { SetsContainer } from '@/components/pages/sets/SetsContainer';
import { SetsProvider } from '@/hooks/useSets';
import { useLocalSearchParams } from 'expo-router';

export default function Sets() {
  const { selectedExercises } = useLocalSearchParams()
  const parsedExercises: string[] = JSON.parse(selectedExercises as string);

  const routes = parsedExercises.map(name => (
    { key: name, title: name }
  ));

  return (
    <SetsProvider>
      <SetsContainer routes={routes} />
    </SetsProvider>
  );
}
