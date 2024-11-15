import { ThemedText, ThemedView } from "@/components/ThemedComponents"
import { FC, useState } from "react"
import { HeaviestWeight } from "./HeaviestWeight";
import { MostReps } from "./MostReps";
import { ScrollView } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface Props {
  name_exercise: string
}

export const RecordDetails: FC<Props> = ({ name_exercise }) => {
  const [noData, setNoData] = useState(false)

  return (
    <ThemedView className="flex-1 px-3">
      <ScrollView contentContainerStyle={{ display: 'flex', justifyContent: 'space-around', flexGrow: 1 }}>
        <HeaviestWeight setNoData={setNoData} name_exercise={name_exercise} />
        <MostReps setNoData={setNoData} name_exercise={name_exercise} />
        {noData && (
          <ThemedView className='border-2 border-slate-400 rounded-xl p-3 mx-3 flex-row justify-center items-center space-x-6'>
            <FontAwesome6 name="circle-info" size={36} color={Colors.slate400} />
            <ThemedText className='text-lg text-slate-400 flex-shrink'>There is no data for this exercise</ThemedText>
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  )
}
