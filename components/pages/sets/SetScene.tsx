import { ThemedView } from "@/components/ThemedComponents";
import { useSets } from "@/hooks/useSets";
import { FC } from "react";
import { SetInput } from "./SetInput";
import { AddRemoveSets } from "./AddRemoveSets";

export const SetScene: FC<{ routeKey: string }> = ({ routeKey }) => {
  const { numberOfSets, setsData, handleAddSet, handleRemoveSet, handleUpdateSet } = useSets();

  return (
    <ThemedView className="p-4">
      {Array.from({ length: numberOfSets[routeKey] || 0 }).map((_, setIndex) => (
        <SetInput
          key={setIndex}
          reps={setsData[routeKey]?.[setIndex]?.reps || ''}
          weight={setsData[routeKey]?.[setIndex]?.weight || ''}
          onRepsChange={(text) => handleUpdateSet(routeKey, setIndex, 'reps', text)}
          onWeightChange={(text) => handleUpdateSet(routeKey, setIndex, 'weight', text)}
        />
      ))}
      <AddRemoveSets
        length={numberOfSets[routeKey] || 0}
        routeKey={routeKey}
        addSet={() => handleAddSet(routeKey)}
        removeSet={() => handleRemoveSet(routeKey)}
      />
    </ThemedView>
  );
}