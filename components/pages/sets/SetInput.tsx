import { ThemedText, ThemedView } from '@/components/ThemedComponents';
import { useColor } from '@/hooks/useColor';
import { MaterialIcons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

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
        className=" p-2 dark:text-white bg-slate-200 dark:bg-slate-700 rounded-2xl w-14 text-2xl text-right"
      />
      <ThemedText className='font-poppinsBold text-lg'>X</ThemedText>
      <View className='items-center flex-row'>
        <TextInput
          value={weight}
          onChangeText={onWeightChange}
          placeholder="0"
          placeholderTextColor={placeholderColor}
          keyboardType="numeric"
          className="p-2 dark:text-white bg-slate-200 dark:bg-slate-700 rounded-2xl w-24 text-2xl pr-6 text-right"
        />
        <ThemedText style={{ color: placeholderColor }} className='-ml-[20px]'>kg</ThemedText>
      </View>
      <ThemedText className='font-poppinsBold text-lg pl-1'>=</ThemedText>
      <ThemedView className='border-b-2 dark:border-white flex-grow flex-row items-end justify-end space-x-1'>
        <ThemedText className='text-2xl'>{parseFloat(reps) * parseFloat(weight)}</ThemedText>
        <ThemedText style={{color: placeholderColor}}>kg</ThemedText>
      </ThemedView>
      <TouchableOpacity>
        <MaterialIcons name="content-copy" size={30} color={placeholderColor} />
      </TouchableOpacity>
    </View>
  )
});
