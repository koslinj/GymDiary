import { useState } from 'react';
import { ThemedText, ThemedView } from '../../../components/ThemedComponents';
import { TimeRange } from '@/components/pages/stats/TimeRange';
import { SummaryStats } from '@/components/pages/stats/SummaryStats';
import { MusclesChart } from '@/components/charts/MusclesChart';
import { ScrollView } from 'react-native';

export default function Stats() {
  const [range, setRange] = useState<TimeRangeFilter>("week");

  return (
    <ThemedView className="flex-1 px-3">
      <ScrollView>
        <TimeRange range={range} setRange={setRange} />
        <SummaryStats range={range} />
        <MusclesChart range={range} />
      </ScrollView>
    </ThemedView>
  );
}