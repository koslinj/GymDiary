import { useState } from 'react';
import { ThemedText, ThemedView } from '../../../components/ThemedComponents';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { TouchableOpacity, useColorScheme, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColor } from '@/hooks/useColor';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';

const generateItems = (max: number) => {
  return Array.from({ length: max + 1 }, (_, index) => ({
    label: index.toString(),
    value: index,
  }));
};

export default function AddScreen() {
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const isDark = useColorScheme() === 'dark'
  const styles = useGlobalStyles()

  return (
    <ThemedView className="flex-1" style={styles.safeArea}>
      <ThemedView className='flex-row justify-center gap-x-8'>
        <View>
          <ThemedText className='text-center'>Hours</ThemedText>
          <WheelPickerExpo
            key={isDark ? 'dark1' : 'light1'}
            backgroundColor={useColor("#FFFFFF", Colors.slate900)}
            height={160}
            width={70}
            selectedStyle={{ borderColor: useColor("#000000", "#FFFFFF"), borderWidth: 2 }}
            renderItem={(props) => (<ThemedText className='text-xl'>{props.label}</ThemedText>)}
            initialSelectedIndex={hour}
            items={generateItems(10)}
            onChange={({ item }) => setHour(item.value)} />
        </View>
        <View>
          <ThemedText className='text-center'>Minutes</ThemedText>
          <WheelPickerExpo
            key={isDark ? 'dark2' : 'light2'}
            backgroundColor={useColor("#FFFFFF", Colors.slate900)}
            height={160}
            width={70}
            selectedStyle={{ borderColor: useColor("#000000", "#FFFFFF"), borderWidth: 2 }}
            renderItem={(props) => (<ThemedText className='text-xl'>{props.label}</ThemedText>)}
            initialSelectedIndex={minute}
            items={generateItems(60)}
            onChange={({ item }) => setMinute(item.value)} />
        </View>
        <View>
          <ThemedText className='text-center'>Seconds</ThemedText>
          <WheelPickerExpo
            key={isDark ? 'dark3' : 'light3'}
            backgroundColor={useColor("#FFFFFF", Colors.slate900)}
            height={160}
            width={70}
            selectedStyle={{ borderColor: useColor("#000000", "#FFFFFF"), borderWidth: 2 }}
            renderItem={(props) => (<ThemedText className='text-xl'>{props.label}</ThemedText>)}
            initialSelectedIndex={second}
            items={generateItems(60)}
            onChange={({ item }) => setSecond(item.value)} />
        </View>
      </ThemedView>
      <TouchableOpacity className='p-4 text-2xl bg-red-300' onPress={() => console.log(hour, minute, second)}>
        <ThemedText>Submit</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}
