import { View, Modal, Pressable, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'

export const PageModal = ({ openModal, setOpenModal, children }) => {
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
            {children}
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  )
}
