import { View, Modal, Pressable, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { ThemedText } from './ThemedComponents'

export const ConfirmationModal = ({ openModal, setOpenModal, title, desc, onConfirm }) => {
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
            <ThemedText className='text-3xl mb-6 font-poppinsBold text-center'>{title}</ThemedText>
            <ThemedText className='text-xl text-center'>{desc}</ThemedText>
            <View className="flex-row justify-between mt-6">
              <TouchableOpacity className="flex-1 p-2 bg-slate-200 dark:bg-slate-900 rounded-md mr-8" onPress={onConfirm}>
                <ThemedText className='text-center text-xl font-poppinsBold'>OK</ThemedText>
              </TouchableOpacity>
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
