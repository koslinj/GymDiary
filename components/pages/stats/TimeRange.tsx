import { ThemedText } from "@/components/ThemedComponents"
import { Dispatch, FC, SetStateAction } from "react"
import { useTranslation } from "react-i18next"
import { TouchableOpacity, View } from "react-native"

interface Props {
  range: TimeRangeFilter
  setRange: Dispatch<SetStateAction<TimeRangeFilter>>
}

export const TimeRange: FC<Props> = ({ range, setRange }) => {
  const { t } = useTranslation()

  const getStyle = (localRange: TimeRangeFilter) => {
    return range === localRange
      ? "border-2 border-secondary-400 dark:border-secondary-700 bg-secondary-400 dark:bg-secondary-700"
      : "border-2 border-secondary-400 dark:border-secondary-700";
  };


  return (
    <View className="flex-row gap-2 justify-between flex-wrap mt-2">
      <TouchableOpacity onPress={() => setRange("week")} className={`p-2 ${getStyle("week")} rounded-lg`}>
        <ThemedText className="text-xl">{t('week')}</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRange("month")} className={`p-2 ${getStyle("month")} rounded-lg`}>
        <ThemedText className="text-xl">{t('month')}</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRange("year")} className={`p-2 ${getStyle("year")} rounded-lg`}>
        <ThemedText className="text-xl">{t('year')}</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRange("all")} className={`p-2 ${getStyle("all")} rounded-lg`}>
        <ThemedText className="text-xl">{t('all_time')}</ThemedText>
      </TouchableOpacity>
    </View>
  )
}