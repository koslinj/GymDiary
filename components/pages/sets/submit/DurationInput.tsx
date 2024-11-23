import { ThemedText, ThemedView } from '@/components/ThemedComponents';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';

interface Props {
  duration: { hour: number; minute: number; second: number }
  setOpenPageModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const DurationInput: FC<Props> = ({ duration, setOpenPageModal }) => {
  const { t } = useTranslation()

  return (
    <ThemedView className='my-4'>
      <ThemedText className="text-center font-poppinsBold text-xl">{t('duration')}</ThemedText>
      <TouchableOpacity className='bg-slate-200 dark:bg-slate-700 p-4 rounded-xl border-2 dark:border-white' onPress={() => setOpenPageModal(true)}>
        <ThemedText className='text-4xl text-center -mb-2'>
          {`${duration.hour.toString().padStart(2, '0')}:${duration.minute.toString().padStart(2, '0')}:${duration.second.toString().padStart(2, '0')}`}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};
