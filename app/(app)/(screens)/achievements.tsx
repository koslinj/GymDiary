import { fetchGymAchievements, fetchSocialAchievements } from "@/api/achievements";
import { AchievementItem } from "@/components/pages/achievements/AchievementItem";
import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { useQueries } from "@tanstack/react-query";
import { ActivityIndicator, ScrollView } from "react-native";

export default function Achievements() {

  const results = useQueries({
    queries: [
      {
        queryKey: ['gymAchievements'],
        queryFn: fetchGymAchievements,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ['socialAchievements'],
        queryFn: fetchSocialAchievements,
        refetchOnWindowFocus: false,
      }
    ]
  });

  const isLoading = results.some(result => result.isLoading);
  const isError = results.some(result => result.isError);
  const gymAchievements = results[0].data;
  const socialAchievements = results[1].data;
  const errorMessages = results
    .filter(result => result.isError)
    .map(result => result.error?.message)
    .join(", ");

  if (isLoading) {
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (isError) {
    return <ThemedText>Error fetching achievements: {errorMessages}</ThemedText>;
  }

  if (!gymAchievements || !socialAchievements) {
    return <ThemedText>Error fetching achievements</ThemedText>;
  }

  console.log(gymAchievements, socialAchievements);

  return (
    <ThemedView className="flex-1">
      <ScrollView contentContainerStyle={{paddingBottom: 20, paddingHorizontal: 12}}>
        <ThemedText className="text-2xl text-center mt-2 font-poppinsBold text-slate-500">Gym</ThemedText>
        {gymAchievements.map((item: GymAchievement) => (
          <AchievementItem
            key={item.users_gym_achievement_id}
            achievement={item}
          />
        ))}
        <ThemedText className="text-2xl text-center mt-8 font-poppinsBold text-slate-500">Social</ThemedText>
        {socialAchievements.map((item: SocialAchievement) => (
          <AchievementItem
            key={item.users_social_achievement_id}
            achievement={item}
          />
        ))}
      </ScrollView>
    </ThemedView>
  )
}

