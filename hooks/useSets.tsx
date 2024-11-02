import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SetData {
  reps: string;
  weight: string;
}

interface SetsContextType {
  setsData: { [key: string]: SetData[] };
  handleAddSet: (routeKey: string) => void;
  handleCopySet: (routeKey: string, index: number) => void;
  handleRemoveSet: (routeKey: string) => void;
  handleUpdateSet: (routeKey: string, setIndex: number, field: 'reps' | 'weight', value: string) => void;
}

const SetsContext = createContext<SetsContextType | undefined>(undefined);

export const SetsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [setsData, setSetsData] = useState<{ [key: string]: SetData[] }>({});

  const handleAddSet = (routeKey: string) => {
    setSetsData((prev) => ({
      ...prev,
      [routeKey]: [...(prev[routeKey] || []), { reps: '', weight: '' }],
    }));
  };

  const handleCopySet = (routeKey: string, index: number) => {
    setSetsData((prev) => {
      const currentSets = prev[routeKey] || [];
      if (index < 0 || index >= currentSets.length) return prev;

      const copiedSet = { ...currentSets[index] };
      if(copiedSet.reps === '' || copiedSet.weight === '') return prev

      const targetIndex = currentSets.findIndex(
        (set) => set.reps === '' && set.weight === ''
      );

    const updatedSets = targetIndex !== -1
      ? currentSets.map((set, idx) => (idx === targetIndex ? copiedSet : set))
      : [...currentSets, copiedSet];

    return {
      ...prev,
      [routeKey]: updatedSets,
    };
    });
  };


  const handleRemoveSet = (routeKey: string) => {
    setSetsData((prev) => ({
      ...prev,
      [routeKey]: (prev[routeKey] || []).slice(0, -1),
    }));
  };

  const handleUpdateSet = (routeKey: string, setIndex: number, field: 'reps' | 'weight', value: string) => {
    setSetsData((prev) => {
      const updatedSets = [...(prev[routeKey] || [])];
      updatedSets[setIndex] = { ...updatedSets[setIndex], [field]: value };
      return {
        ...prev,
        [routeKey]: updatedSets,
      };
    });
  };

  return (
    <SetsContext.Provider value={{ setsData, handleAddSet, handleCopySet, handleRemoveSet, handleUpdateSet }}>
      {children}
    </SetsContext.Provider>
  );
};

export const useSets = () => {
  const context = useContext(SetsContext);
  if (!context) {
    throw new Error('useSets must be used within a SetsProvider');
  }
  return context;
};
