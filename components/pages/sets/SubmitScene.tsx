import { ThemedText, ThemedView } from "@/components/ThemedComponents";
import { useSets } from "@/hooks/useSets";

export const SubmitScene = () => {
  const { setsData } = useSets();

  console.log(setsData)

  return (
    <ThemedView className="p-2">
      <ThemedText>SUBMIT</ThemedText>
    </ThemedView>
  );
};
