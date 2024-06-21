import { Alert, TextInput, TouchableOpacity, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/authContext';
import { ThemedText, ThemedView } from '../components/ThemedComponents';
import { ConfirmButton } from '../components/auth/ConfirmButton';

const SignIn = () => {
  let isDark = useColorScheme() === 'dark' ? true : false;
  const insets = useSafeAreaInsets();
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
    <ThemedView style={{ paddingTop: insets.top }} className="flex-1 justify-center px-8">
      <ThemedText
        className='py-2 text-5xl font-poppinsBold text-center -translate-y-12'
      >
        GymDiary
      </ThemedText>
      <ThemedText
        className='py-2 text-3xl font-poppinsBold text-center'
      >
        Welcome Back!
      </ThemedText>
      <TextInput
        className="p-3 text-lg border-2 rounded-md mb-3 dark:border-white dark:text-white"
        placeholderTextColor={isDark ? '#d0d0d0' : '#828282'}
        value={email}
        placeholder='Email'
        autoCapitalize='none'
        onChangeText={(text) => setEmail(text)} />
      <TextInput
        className="p-3 text-lg border-2 rounded-md mb-3 dark:border-white dark:text-white"
        placeholderTextColor={isDark ? '#d0d0d0' : '#828282'}
        value={password}
        secureTextEntry={true}
        placeholder='Password'
        autoCapitalize='none'
        onChangeText={(text) => setPassword(text)} />

      <ConfirmButton loading={loading} label={'Sign In!'} handlePress={handleLogin} />

      <TouchableOpacity
        onPress={() => router.push('signUp')}
        className="bg-secondary-400/60 dark:bg-secondary-700/60 p-2 rounded-md mt-5 w-40 mx-auto"
      >
        <ThemedText className="text-lg text-center">Sign up</ThemedText>
      </TouchableOpacity>

    </ThemedView >
  )
}

export default SignIn