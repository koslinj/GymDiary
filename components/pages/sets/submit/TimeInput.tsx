import { ThemedText, ThemedView } from '@/components/ThemedComponents';
import React, { FC, useState } from 'react';
import { Platform, TouchableOpacity, useColorScheme } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';

interface Props {
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
}

export const TimeInput: FC<Props> = ({ date, setDate }) => {
  const { t } = useTranslation()
  const [showTimePicker, setShowTimePicker] = useState(false);
  const isDark = useColorScheme() === 'dark'

  const onTimeChange = (event: any, selectedDate: any) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (event.type !== 'dismissed') {
      setDate(selectedDate)
    }
  };

  return (
    <ThemedView className='my-4'>
      <ThemedText className="text-center font-poppinsBold text-xl">{t('time')}</ThemedText>
      <TouchableOpacity
        onPress={() => setShowTimePicker(true)}
        className="p-2 border-2 rounded-md mb-3 dark:border-white"
      >
        <ThemedText>{date.toLocaleTimeString(undefined, { timeStyle: 'short' })}</ThemedText>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          testID="timePicker"
          value={date}
          mode="time"
          display="spinner"
          minuteInterval={5}
          onChange={onTimeChange}
          positiveButton={{ textColor: isDark ? 'white' : 'black', label: 'OK' }}
          negativeButton={{ textColor: isDark ? 'white' : 'black', label: t('cancel') }}
        />
      )}
    </ThemedView>
  );
};
