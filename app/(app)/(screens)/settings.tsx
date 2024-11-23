import { ThemedView } from '../../../components/ThemedComponents';
import { LanguagePicker } from '@/components/pages/settings/LanguagePicker';

export default function Settings() {

  return (
    <ThemedView className="flex-1">
      <LanguagePicker />
    </ThemedView>
  );
}