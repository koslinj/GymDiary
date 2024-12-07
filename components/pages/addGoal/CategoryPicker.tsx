import { ThemedText, ThemedView } from "@/components/ThemedComponents";
import { Dispatch, FC, SetStateAction } from "react";

import chestIcon from "@/assets/icons/chestIcon.jpg";
import backIcon from "@/assets/icons/backIcon.jpg";
import bicepsIcon from "@/assets/icons/bicepsIcon.jpg";
import tricepsIcon from "@/assets/icons/tricepsIcon.jpg";
import shouldersIcon from "@/assets/icons/shouldersIcon.jpg";
import absIcon from "@/assets/icons/absIcon.jpg";
import legsIcon from "@/assets/icons/legsIcon.jpg";
import { Image, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

const categories = [
  { name: "Chest", icon: chestIcon },
  { name: "Back", icon: backIcon },
  { name: "Biceps", icon: bicepsIcon },
  { name: "Triceps", icon: tricepsIcon },
  { name: "Shoulders", icon: shouldersIcon },
  { name: "Abs", icon: absIcon },
  { name: "Legs", icon: legsIcon },
];


interface Props {
  category: string
  setCategory: Dispatch<SetStateAction<string>>
}

export const CategoryPicker: FC<Props> = ({ category, setCategory }) => {
  const { t } = useTranslation()

  return (
    <ThemedView className="flex-row flex-wrap justify-center items-start gap-x-5">
      {categories.map(cat => (
        <TouchableOpacity
          onPress={() => setCategory(cat.name)}
          key={cat.name}
          className={`border-2 border-transparent rounded-lg mt-2 p-1 ${category === cat.name && "border-black dark:border-white"}`}
        >
          <View className="rounded-xl overflow-hidden w-16 h-16 border-2 dark:border-white mx-auto">
            <Image source={cat.icon} alt={cat.name} className='w-full h-full' />
          </View>
          <ThemedText className={`text-center ${category === cat.name && "font-poppinsBold"}`}>{t(cat.name)}</ThemedText>
        </TouchableOpacity>
      ))}
    </ThemedView>
  );
};