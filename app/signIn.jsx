import { Alert, Keyboard, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import { ThemedText, ThemedView } from '@/components/ThemedComponents';
import { ConfirmButton } from '@/components/auth/ConfirmButton';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { useTranslation } from 'react-i18next';

const SignIn = () => {
  const { t } = useTranslation()
  let isDark = useColorScheme() === 'dark' ? true : false;
  const styles = useGlobalStyles()
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (password === '' || email === '') {
      Alert.alert('Sign In', 'You need to provide email and password!')
      return
    }

    setLoading(true)
    const res = await login(email, password)
    setLoading(false)
    if (!res.success) {
      Alert.alert('Sign In', res.msg)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ThemedView style={styles.safeArea} className="p-8 flex-grow justify-center">
          <ThemedText
            className='mt-2 py-2 text-5xl font-poppinsBold text-center '
          >{t('gymdiary')}</ThemedText>
          <ThemedText
            className='py-2 text-3xl font-poppinsBold text-center'
          >{t('welcome_back_')}</ThemedText>
          <TextInput
            className="p-2 text-lg border-2 rounded-md mb-3 dark:border-white dark:text-white"
            placeholderTextColor={isDark ? '#ffffff66' : '#00000066'}
            value={email}
            placeholder='Email'
            autoCapitalize='none'
            onChangeText={(text) => setEmail(text)} />
          <TextInput
            className="p-2 text-lg border-2 rounded-md mb-3 dark:border-white dark:text-white"
            placeholderTextColor={isDark ? '#ffffff66' : '#00000066'}
            value={password}
            secureTextEntry={true}
            placeholder='Password'
            autoCapitalize='none'
            onChangeText={(text) => setPassword(text)} />

          <ConfirmButton loading={loading} label={'Sign In!'} handlePress={handleLogin} />

          <TouchableOpacity
            onPress={() => router.push('signUp')}
            className="bg-secondary-400/60 dark:bg-secondary-700/60 p-2 rounded-md mt-4 w-40 mx-auto"
          >
            <ThemedText className="text-lg text-center">{t('sign_up')}</ThemedText>
          </TouchableOpacity>

        </ThemedView >
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

export default SignIn