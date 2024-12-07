import { useState } from 'react';
import { ThemedText, ThemedView } from '../../../components/ThemedComponents';
import { TimeRange } from '@/components/pages/stats/TimeRange';
import { SummaryStats } from '@/components/pages/stats/SummaryStats';
import { MusclesChart } from '@/components/charts/MusclesChart';
import { Platform, ScrollView, View } from 'react-native';
import { UserStats } from '@/components/pages/stats/UserStats';
import { PickDate } from '@/components/auth/PickDate';

export default function Stats() {
  const [range, setRange] = useState<TimeRangeFilter>("week");

  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const onStartDateChange = (event: any, selectedDate: any) => {
    setShowStartDatePicker(Platform.OS === 'ios');
    if (event.type !== 'dismissed') {
      setStartDate(selectedDate)
      setRange("dates")
    }
  };

  const onEndDateChange = (event: any, selectedDate: any) => {
    setShowEndDatePicker(Platform.OS === 'ios');
    if (event.type !== 'dismissed') {
      setEndDate(selectedDate)
      setRange("dates")
    }
  };

  return (
    <ThemedView className="flex-1 px-3">
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <TimeRange range={range} setRange={setRange} setStartDate={setStartDate} setEndDate={setEndDate} />
        <View className='flex-row justify-between mx-2 mt-1 flex-wrap items-center'>
          <PickDate
            value={startDate}
            show={showStartDatePicker}
            onChange={onStartDateChange}
            setShowDatePicker={setShowStartDatePicker}
            customText='start_date'
          />
          <PickDate
            value={endDate}
            show={showEndDatePicker}
            onChange={onEndDateChange}
            setShowDatePicker={setShowEndDatePicker}
            customText='end_date'
          />
        </View>
        <SummaryStats range={range} startDate={startDate} endDate={endDate} />
        <MusclesChart range={range} startDate={startDate} endDate={endDate} />
        <UserStats />
      </ScrollView>
    </ThemedView>
  );
}