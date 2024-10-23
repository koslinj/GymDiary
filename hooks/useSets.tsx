import React, { createContext, useContext, useState } from 'react';

interface Set {
  reps: string;
  weight: string;
}

interface SetsContextType {
  sets: { [key: string]: Set[] };
  addSet: (exercise: string) => void;
  removeSet: (exercise: string) => void;
  updateSet: (exercise: string, index: number, field: 'reps' | 'weight', value: string) => void;
}

const SetsContext = createContext<SetsContextType | undefined>(undefined);

export const SetsProvider: React.FC<{ children: React.ReactNode; exercises: string[] }> = ({ children, exercises }) => {
  const [sets, setSets] = useState<{ [key: string]: Set[] }>(
    exercises.reduce((acc, name) => {
      acc[name] = [{ reps: '', weight: '' }];
      return acc;
    }, {} as { [key: string]: Set[] })
  );

  const addSet = (exercise: string) => {
    setSets(prevSets => ({
      ...prevSets,
      [exercise]: [...prevSets[exercise], { reps: '', weight: '' }],
    }));
  };

  const removeSet = (exercise: string) => {
    setSets(prevSets => ({
      ...prevSets,
      [exercise]: prevSets[exercise].slice(0, -1),
    }));
  };

  const updateSet = (exercise: string, index: number, field: 'reps' | 'weight', value: string) => {
    setSets(prevSets => {
      const updatedSets = [...prevSets[exercise]];
      updatedSets[index][field] = value;
      return {
        ...prevSets,
        [exercise]: updatedSets,
      };
    });
  };

  return (
    <SetsContext.Provider value={{ sets, addSet, removeSet, updateSet }}>
      {children}
    </SetsContext.Provider>
  );
};

export const useSets = () => {
  const context = useContext(SetsContext);
  if (!context) {
    throw new Error('useSets must be used within an SetsProvider');
  }
  return context;
};
