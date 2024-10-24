import { View, Text, Modal, Pressable, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { ThemedText } from './ThemedComponents'

export const MyPicker = ({ openModal, setOpenModal, title, options, setOption }) => {
  const handlePressOption = (opt) => {
    setOption(opt)
    setOpenModal(false)
  }
  return (
    <Modal
      visible={openModal}
      statusBarTranslucent={true}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setOpenModal(false)}
    >
      <Pressable onPress={() => setOpenModal(false)}
        className="flex-1 justify-center items-center bg-[#00000077]">
        <TouchableWithoutFeedback>
          <View className="w-[90%] p-4 rounded-lg bg-white dark:bg-slate-700">
            <ThemedText className='text-3xl font-poppinsBold text-center'>{title}</ThemedText>
            {options.map(it => (
              <TouchableOpacity onPress={() => handlePressOption(it)} className="bg-slate-800 p-2 mt-4 rounded-md" key={it}>
                <ThemedText className='text-xl'>{it}</ThemedText>
              </TouchableOpacity>
            ))}
            <View className="flex-row justify-between mt-6">
              <TouchableOpacity className="flex-1 p-2 bg-slate-200 dark:bg-slate-900 rounded-md" onPress={() => setOpenModal(false)}>
                <ThemedText className='text-center text-xl font-poppinsBold'>Close</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  )
}
