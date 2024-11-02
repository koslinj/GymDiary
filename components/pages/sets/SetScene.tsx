import { ThemedView } from "@/components/ThemedComponents";
import { useSets } from "@/hooks/useSets";
import { FC, useEffect } from "react";
import { SetInput } from "./SetInput";
import { AddRemoveSets } from "./AddRemoveSets";

export const SetScene: FC<{ routeKey: string }> = ({ routeKey }) => {
  const { setsData, handleUpdateSet, handleAddSet, handleCopySet } = useSets();
  const numberOfSets = setsData[routeKey]?.length || 0;

  useEffect(() => {
    handleAddSet(routeKey)
    handleAddSet(routeKey)
  }, [])

  return (
    <ThemedView className="p-2">
      {Array.from({ length: numberOfSets }).map((_, setIndex) => (
        <SetInput
          key={setIndex}
          reps={setsData[routeKey]?.[setIndex]?.reps || ''}
          weight={setsData[routeKey]?.[setIndex]?.weight || ''}
          onRepsChange={(text) => handleUpdateSet(routeKey, setIndex, 'reps', text)}
          onWeightChange={(text) => handleUpdateSet(routeKey, setIndex, 'weight', text)}
          onCopy={() => handleCopySet(routeKey, setIndex)}
        />
      ))}
      <AddRemoveSets
        length={numberOfSets}
        routeKey={routeKey}
      />
    </ThemedView>
  );
};
