import { ThemedText, ThemedView } from "@/components/ThemedComponents";
import { Colors } from "@/constants/Colors";
import { useBlackOrWhite } from "@/hooks/useBlackOrWhite";
import { FontAwesome6 } from "@expo/vector-icons";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import * as Progress from 'react-native-progress';

interface Props {
  achievement: GymAchievement | SocialAchievement
}

export const AchievementItem: FC<Props> = ({ achievement }) => {
  const { t } = useTranslation()
  const iconColor = useBlackOrWhite()

  let icon = <FontAwesome6 name="medal" size={40} color={iconColor} />
  if (achievement.type === "workouts") {
    icon = <FontAwesome6 name="dumbbell" size={40} color={iconColor} />
  } else if (achievement.type === "friends") {
    icon = <FontAwesome6 name="people-group" size={40} color={iconColor} />
  }

  let lineColor = Colors.red600;
  if (achievement.percent > 40 && achievement.percent < 80) lineColor = Colors.amber600;
  if (achievement.percent >= 80) lineColor = Colors.green600;

  return (
    <ThemedView className="rounded-lg p-3 bg-slate-200 dark:bg-slate-700 mt-3">
      <ThemedText className="text-xl font-poppinsBold text-center">{achievement.title}</ThemedText>
      <View className="flex-row space-x-4 items-center">
        {icon}
        <ThemedText className="text-xl flex-shrink">{achievement.goal} {achievement.type}</ThemedText>
      </View>
      <View className="py-2">
        <View className="flex-row justify-between items-center">
          <ThemedText className="text-slate-500 dark:text-slate-300 text-lg">{t('progress')}</ThemedText>
          <ThemedText className="text-slate-500 dark:text-slate-300 text-lg">{achievement.percent.toFixed(2)}%</ThemedText>
        </View>
        <Progress.Bar progress={achievement.percent / 100} width={null} height={10} borderRadius={99} color={lineColor} />
      </View>
    </ThemedView>
  );
};