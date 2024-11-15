import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { useQuery } from "@tanstack/react-query";
import { FC } from "react"
import { ActivityIndicator, View } from "react-native";
import { fetchMostRepsChart } from "@/api/records";
import { LineChart } from "react-native-gifted-charts";
import { useColor } from "@/hooks/useColor";

interface Props {
  name_exercise: string
  setNoData: React.Dispatch<React.SetStateAction<boolean>>
}

export const MostReps: FC<Props> = ({ name_exercise, setNoData }) => {
  const textColor = useColor("black", "white")
  const chartColor = useColor("#ffbf1b", "#bb4f02")

  const { data: reps, isLoading, isError, error } = useQuery<GymSet[]>(
    {
      queryKey: ['mostRepsChart', name_exercise],
      queryFn: () => fetchMostRepsChart(name_exercise),
      enabled: !!name_exercise,
      refetchOnWindowFocus: false
    }
  );

  if (isLoading) {
    return (
      <ThemedView className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" />
      </ThemedView>
    )
  }

  if (isError) {
    return <ThemedText>Error fetching reps info: {error.message}</ThemedText>
  }

  if (!reps) {
    return <ThemedText>Error fetching reps info</ThemedText>
  }

  if(reps.length === 0){
    setNoData(true)
    return null
  }

  const best = reps.reduce((prev: GymSet, curr: GymSet) => {
    if (curr.reps > prev.reps || (curr.reps === prev.reps && curr.weight > prev.weight)) {
      return curr;
    }
    return prev;
  }, { weight: 0, reps: 0 });

  const chartData = reps.map(item => ({ value: item.reps }))

  let max = -1
  let min = Number.MAX_VALUE
  chartData.forEach(i => { if (i.value > max) max = i.value })
  chartData.forEach(i => { if (i.value < min) min = i.value })


  return (
    <ThemedView className="bg-slate-200 dark:bg-slate-700 m-3 rounded-xl">
      <ThemedText className="text-center text-2xl my-2">Most reps in a set</ThemedText>
      <View className="mx-auto">
        <LineChart
          data={chartData}
          color1={chartColor}
          dataPointsColor1={chartColor}
          thickness={3}
          dataPointsRadius={5}
          yAxisTextStyle={{ color: textColor }}
          maxValue={max - min}
          yAxisOffset={min}
          noOfSections={5}
        />
      </View>
      <ThemedText className="text-center text-2xl -mt-2 mb-1">{best.weight} kg x <ThemedText className="font-poppinsBold">{best.reps}</ThemedText></ThemedText>
    </ThemedView>
  )
}
