import { ThemedText, ThemedView } from '@/components/ThemedComponents';
import React, { FC, useState } from 'react';
import { Platform, TouchableOpacity, useColorScheme } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';

interface Props {
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
}

export const DateInput: FC<Props> = ({ date, setDate }) => {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const isDark = useColorScheme() === 'dark'

  const onDateChange = (event: any, selectedDate: any) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (event.type !== 'dismissed') {
      setDate(selectedDate)
    }
  };

  return (
    <ThemedView className='my-4'>
      <ThemedText className="text-center font-poppinsBold text-xl">{t('date')}</ThemedText>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        className="p-2 border-2 rounded-md mb-3 dark:border-white"
      >
        <ThemedText>{date.toLocaleDateString(currentLanguage, { dateStyle: 'full' })}</ThemedText>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          locale={currentLanguage}
          testID="datePicker"
          value={date}
          mode="date"
          display="spinner"
          onChange={onDateChange}
          positiveButton={{ textColor: isDark ? 'white' : 'black', label: 'OK' }}
          negativeButton={{ textColor: isDark ? 'white' : 'black', label: t('cancel') }}
        />
      )}
    </ThemedView>
  );
};
