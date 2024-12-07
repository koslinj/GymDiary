import { View, Modal, Pressable, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { ThemedText } from './ThemedComponents'
import { useTranslation } from 'react-i18next'

export const MyPicker = ({ openModal, setOpenModal, title, options, setOption }) => {
  const { t } = useTranslation()

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
              <TouchableOpacity onPress={() => handlePressOption(it)} className="bg-slate-200 dark:bg-slate-800 p-2 mt-4 rounded-md" key={it}>
                <ThemedText className='text-xl'>{t(it)}</ThemedText>
              </TouchableOpacity>
            ))}
            <TouchableOpacity className="mt-6 p-2 border-2 dark:border-white rounded-md" onPress={() => setOpenModal(false)}>
              <ThemedText className='text-center text-xl font-poppinsBold'>{t('close')}</ThemedText>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  )
}
