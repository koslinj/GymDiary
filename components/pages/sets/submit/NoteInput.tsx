import { ThemedText } from '@/components/ThemedComponents';
import { useColor } from '@/hooks/useColor';
import React, { useState, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput, View } from 'react-native';

interface Props {
  note: string
  setNote: React.Dispatch<React.SetStateAction<string>>
}

export const NoteInput: FC<Props> = ({ note, setNote }) => {
  const { t } = useTranslation()

  return (
    <View className="my-4">
      <ThemedText className="text-center font-poppinsBold text-xl">{t('note')}</ThemedText>
      <TextInput
        multiline={true}
        numberOfLines={4}
        placeholder={t('note') + "..."}
        className="p-2 text-lg border-2 rounded-md mb-3 dark:border-white dark:text-white"
        placeholderTextColor={useColor('#00000066', '#ffffff66')}
        value={note?.toString()}
        onChangeText={(text) => setNote(text)}
        textAlignVertical='top'
      />
    </View>
  );
};
