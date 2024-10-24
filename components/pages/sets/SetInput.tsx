import { ThemedText } from '@/components/ThemedComponents';
import { useColor } from '@/hooks/useColor';
import React, { memo } from 'react';
import { TextInput, View } from 'react-native';

interface SetInputProps {
  reps: string;
  weight: string;
  onRepsChange: (text: string) => void;
  onWeightChange: (text: string) => void;
}

export const SetInput = memo(({ reps, weight, onRepsChange, onWeightChange }: SetInputProps) => {
  const placeholderColor = useColor('#00000066', '#ffffff66')

  return (
    <View className="mb-4 flex-row items-center space-x-2">
      <TextInput
        value={reps}
        onChangeText={onRepsChange}
        placeholder="0"
        placeholderTextColor={placeholderColor}
        keyboardType="numeric"
        className="border p-2 dark:text-white bg-slate-200 dark:bg-slate-700 rounded-2xl w-14 text-2xl text-right"
      />
      <ThemedText className='font-poppinsBold text-lg'>X</ThemedText>
      <View className='items-center flex-row'>
        <TextInput
          value={weight}
          onChangeText={onWeightChange}
          placeholder="0"
          placeholderTextColor={placeholderColor}
          keyboardType="numeric"
          className="border p-2 dark:text-white bg-slate-200 dark:bg-slate-700 rounded-2xl w-28 text-2xl pr-8 text-right"
        />
        <ThemedText style={{color: placeholderColor}} className='-ml-6'>kg</ThemedText>
      </View>
    </View>
  )
});
