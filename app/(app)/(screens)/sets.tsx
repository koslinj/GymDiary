import { SetsContainer } from '@/components/pages/sets/SetsContainer';
import { SetsProvider } from '@/hooks/useSets';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function Sets() {
  const { t } = useTranslation()
  const { selectedExercises } = useLocalSearchParams()
  const parsedExercises: string[] = JSON.parse(selectedExercises as string);

  const routes = parsedExercises.map(name => (
    { key: name, title: t(name) }
  ));

  return (
    <SetsProvider>
      <SetsContainer routes={routes} />
    </SetsProvider>
  );
}
