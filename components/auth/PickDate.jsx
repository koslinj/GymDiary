import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity, useColorScheme } from 'react-native';
import { ThemedText } from '../ThemedComponents';
import { useTranslation } from 'react-i18next';

export const PickDate = ({ value, show, onChange, setShowDatePicker }) => {
  const { t } = useTranslation()
  const isDark = useColorScheme() === 'dark'

  return (
    <>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        className="p-2 border-2 rounded-md mb-3 dark:border-white"
      >
        {value ? (
          <ThemedText>{value.toLocaleDateString('pl-PL')}</ThemedText>
        ) : (
          <ThemedText className="text-lg opacity-40">{t('date_of_birth')}</ThemedText>
        )}
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          timeZoneName='GMT0'
          testID="dateTimePicker"
          value={value || new Date('2000-01-01')}
          mode="date"
          display="spinner"
          onChange={onChange}
          positiveButton={{ textColor: isDark && 'white', label: 'OK' }}
          negativeButton={{ textColor: isDark && 'white', label: 'Cancel' }}
        />
      )}
    </>
  )
}