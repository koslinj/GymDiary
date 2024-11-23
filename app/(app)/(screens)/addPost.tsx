import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { useState } from "react"
import { TextInput, TouchableOpacity, View } from "react-native"
import { useColor } from "@/hooks/useColor"
import { useLocalSearchParams, useRouter } from "expo-router"
import { HistoryCard } from "@/components/pages/history/HistoryCard"
import { FontAwesome5 } from "@expo/vector-icons"
import { useBlackOrWhite } from "@/hooks/useBlackOrWhite"
import { addPost } from "@/api/social"
import { useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"

export default function AddPost() {
  const { t } = useTranslation()
  const { desc: persistedDesc, workout } = useLocalSearchParams();
  const parsedWorkout: GymWorkoutSummary = workout ? JSON.parse(workout as string) : null

  const queryClient = useQueryClient()
  const router = useRouter()
  const [desc, setDesc] = useState(persistedDesc as string)
  const placeholderColor = useColor('#00000066', '#ffffff66')
  const iconColor = useBlackOrWhite()

  const handleSubmit = () => {
    addPost(parsedWorkout.workoutId, desc).then(() => {
      queryClient.invalidateQueries({ queryKey: ['posts'], refetchType: 'all' }).then(() => {
        router.replace('/social')
      });
    })
  }

  return (
    <ThemedView className="flex-1 px-3">
      <ThemedText className="text-2xl pt-4 mr-14">{t('put_a_description')}</ThemedText>
      <TextInput
        className="p-2 text-lg border-2 rounded-md mb-3 dark:border-white dark:text-white"
        placeholderTextColor={placeholderColor}
        value={desc}
        placeholder='Description...'
        autoCapitalize='none'
        onChangeText={(text) => setDesc(text)}
      />
      {parsedWorkout ? (
        <View>
          <View className="flex-row justify-between items-center -mb-10 pt-4">
            <ThemedText className="text-2xl">{t('picked_workout')}</ThemedText>
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: '/history',
                  params: { isPickingWorkout: 'true', desc: desc }
                });
              }}
            >
              <FontAwesome5 name="edit" size={36} color={iconColor} />
            </TouchableOpacity>
          </View>
          <HistoryCard workout={parsedWorkout} />
        </View>
      ) : (
        <View>
          <ThemedText className="text-2xl pt-4 mr-14">{t('pick_a_workout')}</ThemedText>
          <TouchableOpacity
            style={{ borderColor: placeholderColor }}
            className="border-2 rounded-md p-4"
            onPress={() => {
              router.replace({
                pathname: '/history',
                params: { isPickingWorkout: 'true', desc: desc }
              });
            }}
          >
            <ThemedText
              style={{ color: placeholderColor }}
              className="text-center text-lg"
            >{t('press_here_to_pick_a_workout')}</ThemedText>
          </TouchableOpacity>
        </View >
      )}

      <ThemedView className="flex-1 justify-end pb-6">
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!parsedWorkout}
          className={`bg-secondary-400 dark:bg-secondary-700 ${!parsedWorkout && 'bg-secondary-400/50 dark:bg-secondary-700/50'} p-4 rounded-xl`}
        >
          <ThemedText className={`font-poppinsBold text-2xl text-center ${!parsedWorkout && 'opacity-50'}`}>{t('submit')}</ThemedText>
        </TouchableOpacity>
      </ThemedView>

    </ThemedView >
  )
}

