import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity, useColorScheme } from 'react-native';
import { ThemedText } from '../ThemedComponents';
import { useTranslation } from 'react-i18next';

export const PickDate = ({ value, show, onChange, setShowDatePicker, customText = "date_of_birth" }) => {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language;
  const isDark = useColorScheme() === 'dark'

  return (
    <>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        className="p-2 border-2 rounded-md mb-3 dark:border-white"
      >
        {value ? (
          <ThemedText>{value.toLocaleDateString(currentLanguage)}</ThemedText>
        ) : (
          <ThemedText className="text-lg opacity-40">{t(customText)}</ThemedText>
        )}
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          locale={currentLanguage}
          timeZoneName='GMT0'
          testID="dateTimePicker"
          value={value || new Date()}
          mode="date"
          display="spinner"
          onChange={onChange}
          positiveButton={{ textColor: isDark && 'white', label: 'OK' }}
          negativeButton={{ textColor: isDark && 'white', label: t('cancel') }}
        />
      )}
    </>
  )
}