import { ThemedView } from "@/components/ThemedComponents";
import { useSets } from "@/hooks/useSets";
import { FC } from "react";
import { SetInput } from "./SetInput";
import { AddRemoveSets } from "./AddRemoveSets";

export const SetScene: FC<{ routeKey: string }> = ({ routeKey }) => {
  const { setsData, handleUpdateSet } = useSets();

  const numberOfSets = setsData[routeKey]?.length || 0;

  return (
    <ThemedView className="p-4">
      {Array.from({ length: numberOfSets }).map((_, setIndex) => (
        <SetInput
          key={setIndex}
          reps={setsData[routeKey]?.[setIndex]?.reps || ''}
          weight={setsData[routeKey]?.[setIndex]?.weight || ''}
          onRepsChange={(text) => handleUpdateSet(routeKey, setIndex, 'reps', text)}
          onWeightChange={(text) => handleUpdateSet(routeKey, setIndex, 'weight', text)}
        />
      ))}
      <AddRemoveSets
        length={numberOfSets}
        routeKey={routeKey}
      />
    </ThemedView>
  );
};
