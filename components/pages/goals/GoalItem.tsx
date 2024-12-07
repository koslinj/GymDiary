import { deleteGoal } from "@/api/goals";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { ThemedText, ThemedView } from "@/components/ThemedComponents";
import { Colors } from "@/constants/Colors";
import { useBlackOrWhite } from "@/hooks/useBlackOrWhite";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, TouchableOpacity, View } from "react-native";
import * as Progress from 'react-native-progress';
import chestIcon from "@/assets/icons/chestIcon.jpg";
import backIcon from "@/assets/icons/backIcon.jpg";
import bicepsIcon from "@/assets/icons/bicepsIcon.jpg";
import tricepsIcon from "@/assets/icons/tricepsIcon.jpg";
import shouldersIcon from "@/assets/icons/shouldersIcon.jpg";
import absIcon from "@/assets/icons/absIcon.jpg";
import legsIcon from "@/assets/icons/legsIcon.jpg";

const icons: Record<string, any> = {
  Chest: chestIcon,
  Back: backIcon,
  Biceps: bicepsIcon,
  Triceps: tricepsIcon,
  Shoulders: shouldersIcon,
  Abs: absIcon,
  Legs: legsIcon,
};

interface Props {
  goal: GymGoal
}

export const GoalItem: FC<Props> = ({ goal }) => {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language;
  const iconColor = useBlackOrWhite()

  const queryClient = useQueryClient()

  const [removing, setRemoving] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const handleDelete = async () => {
    setRemoving(true)
    const res = await deleteGoal(goal.gym_goal_id)
    await queryClient.invalidateQueries({ queryKey: ['goals'], refetchType: 'all' })
  }

  let lineColor = Colors.red600;
  if (goal.percent > 40 && goal.percent < 80) lineColor = Colors.amber600;
  if (goal.percent >= 80) lineColor = Colors.green600;

  const formattedCreatedDate = new Date(goal.create_date).toLocaleString(currentLanguage, {
    dateStyle: 'short',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
  const formattedFinishDate = new Date(goal.finish_date).toLocaleString(currentLanguage, {
    dateStyle: 'short',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });

  return (
    <ThemedView className="rounded-lg p-3 bg-slate-200 dark:bg-slate-700 mt-3 space-y-4">
      <ThemedText className="text-xl font-poppinsBold text-center mx-12">{goal.title}</ThemedText>
      <ThemedText className="text-xl text-center">{goal.description}</ThemedText>
      <View className="flex-row items-center justify-between">
        <ThemedText className="text-xl">{formattedCreatedDate}</ThemedText>
        <AntDesign name="arrowright" size={50} color={iconColor} />
        <ThemedText className="text-xl">{formattedFinishDate}</ThemedText>
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row flex-shrink items-center space-x-2">
          <ThemedView className='rounded-full overflow-hidden w-16 h-16 border-2 dark:border-white'>
            <Image
              className='w-full h-full'
              source={icons[goal.type]}
              alt={`${goal.type} icon`}
            />
          </ThemedView>
          <ThemedText className="text-xl flex-shrink font-poppinsBold">{t(goal.type)}</ThemedText>
        </View>
        <View className="p-2 px-3 rounded-xl border-2 dark:border-white">
          <View className="flex-row justify-center items-center space-x-2 flex-shrink">
            <ThemedText className="text-3xl font-poppinsBold text-center">{goal.current_goal}</ThemedText>
            <ThemedText className="text-xl">{t('of')}</ThemedText>
            <ThemedText className="text-3xl font-poppinsBold text-center">{goal.goal}</ThemedText>
          </View>
          <ThemedText className="text-center text-lg text-slate-500 dark:text-slate-300 -my-2">{t('sets2')}</ThemedText>
        </View>
      </View>

      <View className="py-2">
        <View className="flex-row justify-between items-center">
          <ThemedText className="text-slate-500 dark:text-slate-300 text-lg">{t('progress')}</ThemedText>
          <ThemedText className="text-slate-500 dark:text-slate-300 text-lg">{goal.percent.toFixed(2)}%</ThemedText>
        </View>
        <Progress.Bar progress={goal.percent / 100} width={null} height={10} borderRadius={99} color={lineColor} />
      </View>

      <TouchableOpacity
        disabled={removing}
        onPress={() => setOpenModal(true)}
        className={`${removing && "opacity-50"} absolute right-2 -top-1`}
      >
        <Ionicons name="trash-sharp" size={40} color={iconColor} />
      </TouchableOpacity>

      <ConfirmationModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title={t('delete_goal')}
        desc={t('delete_goal_confirmation')}
        onConfirm={handleDelete}
      />
    </ThemedView>
  );
};