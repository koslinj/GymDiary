import { ThemedText, ThemedView } from "@/components/ThemedComponents";
import { Colors } from "@/constants/Colors";
import { useColor } from "@/hooks/useColor";
import { FC } from "react";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import WheelPickerExpo from "react-native-wheel-picker-expo";

const generateItems = (max: number) => {
  return Array.from({ length: max + 1 }, (_, index) => ({
    label: index.toString(),
    value: index,
  }));
};

interface Props {
  duration: { hour: number; minute: number; second: number }
  onChange: (type: Duration, value: number) => void
  setOpenPageModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const DurationWheelPicker: FC<Props> = ({ duration, onChange, setOpenPageModal }) => {
  const isDark = useColorScheme() === 'dark'

  return (
    <View>
      <ThemedText className="text-center font-poppinsBold text-xl mb-2">Set duration</ThemedText>
      <ThemedView className='flex-row justify-around bg-transparent'>
        {(['hour', 'minute', 'second'] as Duration[]).map((type) => (
          <View key={type}>
            <ThemedText className='text-center'>{type.charAt(0).toUpperCase() + type.slice(1)}</ThemedText>
            <WheelPickerExpo
              key={isDark ? `${type}dark` : `${type}light`}
              backgroundColor={useColor("#FFFFFF", Colors.slate700)}
              height={200}
              width={70}
              selectedStyle={{ borderColor: useColor("#000000", "#FFFFFF"), borderWidth: 2 }}
              renderItem={({ label }) => (<ThemedText className='text-2xl'>{label}</ThemedText>)}
              initialSelectedIndex={duration[type]}
              items={generateItems(type === 'hour' ? 10 : 60)}
              onChange={({ item }) => onChange(type, item.value)}
            />
          </View>
        ))}
      </ThemedView>
      <TouchableOpacity onPress={() => setOpenPageModal(false)} className="mt-5 p-2 border-2 rounded-xl dark:border-white">
        <ThemedText className="text-center font-poppinsBold text-xl">OK</ThemedText>
      </TouchableOpacity>
    </View>
  )
}