import React, { useState } from 'react';
import { Alert, Keyboard, Platform, ScrollView, TouchableOpacity, TouchableWithoutFeedback, } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import { ThemedText, ThemedView } from '../components/ThemedComponents';
import { ConfirmButton } from '../components/auth/ConfirmButton';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { UploadFile } from '@/components/auth/UploadFile';
import { MyToast } from '@/components/MyToast';
import { AuthTextInput } from '@/components/auth/AuthTextInput';
import { PickDate } from '@/components/auth/PickDate';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
  const { t } = useTranslation()
  const styles = useGlobalStyles();
  const router = useRouter();
  const { register, uploadProfileImage } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: '',
    description: '',
    date: null,
  });

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (event.type !== 'dismissed') {
      setFormData((prevData) => ({
        ...prevData,
        date: selectedDate
      }));
    }
  };

  const handleRegister = async () => {
    const { email, password, nickname, description, date } = formData;
    if (!email || !password || !nickname || !description || !date || !file) {
      Alert.alert(t('sign_up'), 'All fields are required!');
      return;
    }

    try {
      setLoading(true);
      const uniqueFilename = `${Date.now()}_${file.fileName}`;

      const registerResponse = await register(
        email,
        password,
        nickname,
        description,
        uniqueFilename,
        date.toISOString().slice(0, 10)
      );
      const uploadingResponse = await uploadProfileImage(uniqueFilename, file)

      setShowToast(true);
    } catch (error) {
      Alert.alert(t('sign_up'), error.message || 'Unexpected error');
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ThemedView style={styles.safeArea} className="p-8 flex-grow justify-center">
            <ThemedText className="mt-2 py-2 text-5xl font-poppinsBold text-center">{t('gymdiary')}</ThemedText>
            <ThemedText className="py-2 text-3xl font-poppinsBold text-center">{t('join_us_')}</ThemedText>

            <AuthTextInput
              placeholder={t('email')}
              value={formData.email}
              field="email"
              onChange={handleInputChange}
            />
            <AuthTextInput
              placeholder={t('password')}
              value={formData.password}
              field="password"
              onChange={handleInputChange}
            />
            <AuthTextInput
              placeholder={t('nickname')}
              value={formData.nickname}
              field="nickname"
              onChange={handleInputChange}
            />
            <AuthTextInput
              placeholder={t('description')}
              value={formData.description}
              field="description"
              onChange={handleInputChange}
            />
            <PickDate value={formData.date} show={showDatePicker} onChange={onDateChange} setShowDatePicker={setShowDatePicker} />
            <UploadFile file={file} setFile={setFile} />

            <ConfirmButton loading={loading} label={t('sign_up') + '!'} handlePress={handleRegister} />
            <TouchableOpacity
              onPress={() => router.push('signIn')}
              className="bg-secondary-400/60 dark:bg-secondary-700/60 p-2 rounded-md mt-4 w-40 mx-auto"
            >
              <ThemedText className="text-lg text-center">{t('sign_in')}</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ScrollView>
      </TouchableWithoutFeedback>

      <MyToast
        openToast={showToast}
        setOpenToast={setShowToast}
        duration={4000}
      >
        <>
          <ThemedText className="text-2xl mb-2 font-poppinsBold text-center">{t('successfully_registered')}</ThemedText>
          <ThemedText className="text-lg text-center mb-8">{t('you_can_now_sign_in_')}</ThemedText>
          <TouchableOpacity
            onPress={() => router.push('signIn')}
          >
            <ThemedText className="text-3xl font-poppinsBold text-center underline">{t('go_to_sign_in')}</ThemedText>
          </TouchableOpacity>
        </>
      </MyToast>
    </>
  );
};

export default SignUp;
