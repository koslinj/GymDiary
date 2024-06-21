import { TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { ThemedText } from '../ThemedComponents'

export const ConfirmButton = ({ loading, label, handlePress }) => {
  return (
    <TouchableOpacity
      className="bg-secondary-400 dark:bg-secondary-700 p-4 mt-4 rounded-md w-full mx-auto"
      onPress={handlePress}
    >
      {
        loading ? (
          <ActivityIndicator size={32} color={'white'} />
        ) : (
          <ThemedText className="text-2xl font-poppinsBold text-center">
            {label}
          </ThemedText>
        )
      }
    </TouchableOpacity>
  )
}
