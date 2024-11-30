import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { useState } from "react"
import { Platform, ScrollView, TextInput, TouchableOpacity } from "react-native"
import { useColor } from "@/hooks/useColor"
import { useRouter } from "expo-router"
import { useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { PickDate } from "@/components/auth/PickDate"
import { addGoal } from "@/api/goals"
import { MyToast } from "@/components/MyToast"
import { CategoryPicker } from "@/components/pages/addGoal/CategoryPicker"
import { NumberInput } from "@/components/pages/addGoal/NumberInput"

export default function AddGoal() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const router = useRouter()

  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [goal, setGoal] = useState(1)
  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const placeholderColor = useColor('#00000066', '#ffffff66')

  const handleSubmit = () => {
    if (isNaN(goal) || goal < 1 || category === '' || title.length <= 0 || desc.length <= 0) {
      setToastMessage('Please check all inputs, because one of them is invalid!')
      setShowToast(true)
      return
    }

    const payload = {
      title,
      description: desc,
      goal: goal,
      finish_date: date.toISOString().slice(0, 10),
      type: category
    }
    addGoal(payload).then(() => {
      queryClient.invalidateQueries({ queryKey: ['goals'], refetchType: 'all' }).then(() => {
        router.back()
      });
    })
  }

  const onDateChange = (event: any, selectedDate: any) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (event.type !== 'dismissed') {
      setDate(selectedDate)
    }
  };

  return (
    <>
      <ThemedView className="flex-1">
        <ScrollView contentContainerStyle={{ paddingHorizontal: 12, flexGrow: 1 }}>
          <ThemedText className="text-2xl">{t('category')}</ThemedText>
          <CategoryPicker category={category} setCategory={setCategory} />
          <ThemedText className="text-2xl pt-1 mr-14">{t('title')}</ThemedText>
          <TextInput
            className="p-2 text-lg border-2 rounded-md mb-2 dark:border-white dark:text-white"
            placeholderTextColor={placeholderColor}
            value={title}
            placeholder={`${t('title')}...`}
            autoCapitalize='none'
            onChangeText={(text) => setTitle(text)}
          />
          <ThemedText className="text-2xl pt-4 mr-14">{t('description')}</ThemedText>
          <TextInput
            className="p-2 text-lg border-2 rounded-md mb-2 dark:border-white dark:text-white"
            placeholderTextColor={placeholderColor}
            value={desc}
            placeholder={`${t('description')}...`}
            autoCapitalize='none'
            onChangeText={(text) => setDesc(text)}
          />
          <ThemedText className="text-2xl pt-4 mr-14">{t('goal')} ({t('number_of_sets')})</ThemedText>
          <NumberInput value={goal} setValue={setGoal} />
          <ThemedText className="text-2xl pt-4 mr-14">{t('finish_date')}</ThemedText>
          <PickDate value={date} show={showDatePicker} onChange={onDateChange} setShowDatePicker={setShowDatePicker} />

          <ThemedView className="flex-1 justify-end pb-6">
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={desc === ""}
              className={`bg-secondary-400 dark:bg-secondary-700 ${desc === '' && 'bg-secondary-400/50 dark:bg-secondary-700/50'} p-4 rounded-xl`}
            >
              <ThemedText className={`font-poppinsBold text-2xl text-center ${desc === '' && 'opacity-50'}`}>{t('submit')}</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ScrollView>
      </ThemedView >

      <MyToast
        openToast={showToast}
        setOpenToast={setShowToast}
        duration={4000}
      >
        <>
          <ThemedText className="text-2xl mb-2 font-poppinsBold text-center">{t('error')}</ThemedText>
          <ThemedText className="text-2xl mt-3 text-center">{toastMessage}</ThemedText>
        </>
      </MyToast>
    </>
  )
}

