import { ThemedText, ThemedView } from '../../../components/ThemedComponents';
import CountryFlag from "react-native-country-flag";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';

export const LanguagePicker = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]);

  const changeLanguage = async (lang: string) => {
    await AsyncStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  };

  return (
    <ThemedView className="flex-1 px-2 mt-4">
      <View className='flex-row justify-between items-center'>
        <ThemedText className='text-2xl basis-1/2'>{t("language")}:</ThemedText>
        <View className='basis-1/2'>
          <TouchableOpacity
            className={`bg-slate-200 dark:bg-slate-700 py-2 rounded-lg flex-row gap-x-2 items-center dark:border-white ${currentLanguage === 'pl-PL' && 'border-2'}`}
            onPress={() => changeLanguage('pl-PL')}
          >
            <CountryFlag isoCode="pl" size={40} />
            <ThemedText className='text-center text-lg max-w-[130px]'>{t('polish')}</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            className={`bg-slate-200 dark:bg-slate-700 py-2 rounded-lg flex-row gap-x-2 items-center dark:border-white mt-4 ${currentLanguage === 'en-GB' && 'border-2'}`}
            onPress={() => changeLanguage('en-GB')}
          >
            <CountryFlag isoCode="gb" size={40} />
            <ThemedText className='text-center text-lg max-w-[130px]'>{t('english')}</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}
