import { ThemedText } from "@/components/ThemedComponents"
import { Dispatch, FC, SetStateAction } from "react"
import { useTranslation } from "react-i18next"
import { TouchableOpacity, View } from "react-native"

interface Props {
  range: TimeRangeFilter
  setRange: Dispatch<SetStateAction<TimeRangeFilter>>
  setStartDate: Dispatch<SetStateAction<Date | undefined>>
  setEndDate: Dispatch<SetStateAction<Date | undefined>>
}

export const TimeRange: FC<Props> = ({ range, setRange, setStartDate, setEndDate }) => {
  const { t } = useTranslation()

  const getStyle = (localRange: TimeRangeFilter) => {
    return range === localRange
      ? "border-2 border-secondary-400 dark:border-secondary-700 bg-secondary-400 dark:bg-secondary-700"
      : "border-2 border-secondary-400 dark:border-secondary-700";
  };

  const handleRangeChange = (range: TimeRangeFilter) => {
    setRange(range);
    if (range !== "dates") {
      setStartDate(undefined);
      setEndDate(undefined);
    }
  };

  return (
    <View className="flex-row gap-x-2 gap-y-1 justify-center flex-wrap mt-1">
      <TouchableOpacity onPress={() => handleRangeChange("week")} className={`p-2 ${getStyle("week")} rounded-lg`}>
        <ThemedText className="text-lg">{t('week')}</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRangeChange("month")} className={`p-2 ${getStyle("month")} rounded-lg`}>
        <ThemedText className="text-lg">{t('month')}</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRangeChange("year")} className={`p-2 ${getStyle("year")} rounded-lg`}>
        <ThemedText className="text-lg">{t('year')}</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRangeChange("all")} className={`p-2 ${getStyle("all")} rounded-lg`}>
        <ThemedText className="text-lg">{t('all_time')}</ThemedText>
      </TouchableOpacity>
    </View>
  )
}