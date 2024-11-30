import React, { Dispatch, FC, SetStateAction } from 'react'
import { ThemedView } from '../../ThemedComponents'
import { TextInput, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useBlackOrWhite } from '@/hooks/useBlackOrWhite'

interface Props {
  value: number
  setValue: Dispatch<SetStateAction<number>>
}

export const NumberInput: FC<Props> = ({ value, setValue }) => {
  const iconColor = useBlackOrWhite()

  const handleNumberChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '')
    const parsed = parseInt(cleaned, 10)
    if (!isNaN(parsed)) {
      setValue(parsed)
    } else {
      setValue(0)
    }
  }

  const increment = () => {
    setValue(prev => prev + 1)
  }

  const decrement = () => {
    setValue(prev => {
      if (prev <= 0) return prev
      else return prev - 1
    })
  }

  return (
    <ThemedView className='flex-row gap-x-2 mx-auto'>
      <TouchableOpacity onPress={decrement}>
        <AntDesign name="leftcircleo" size={50} color={iconColor} />
      </TouchableOpacity>
      <TextInput
        inputMode='numeric'
        value={value.toString()}
        onChangeText={handleNumberChange}
        className="font-poppinsBold dark:text-white text-2xl border-2 dark:border-white px-2 rounded-md w-16 text-center"
      />
      <TouchableOpacity onPress={increment}>
        <AntDesign name="rightcircleo" size={50} color={iconColor} />
      </TouchableOpacity>
    </ThemedView>
  )
}