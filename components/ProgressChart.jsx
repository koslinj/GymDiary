import { View, useColorScheme } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { ThemedText } from "./ThemedComponents";

export const ProgressChart = () => {
  let colorScheme = useColorScheme();
  let isDark = colorScheme === 'dark' ? true : false
  let colors
  if (isDark) {
    colors = [
      '#2262FF',
      'gray'
    ]
  } else {
    colors = [
      '#177AD5',
      'lightgray'
    ]
  }
  const pieData = [
    { value: 70, color: colors[0] },
    { value: 30, color: colors[1] }
  ];
  return (
    <View>
      <PieChart
        innerCircleColor={isDark ? 'rgb(15 23 42)': 'white'}
        showGradient
        gradientCenterColor={isDark ? 'rgb(15 23 42)': 'white'}
        radius={100}
        donut
        innerRadius={60}
        data={pieData}
        centerLabelComponent={() => {
          return <ThemedText className="font-poppinsBold translate-x-1 translate-y-1" style={{ fontSize: 32 }}>70%</ThemedText>;
        }}
      />
    </View>
  );
}