import { View, Text, Alert, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/authContext';
import { ThemedView } from '../components/ThemedComponents';

const SignUp = () => {
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
    <ThemedView style={{ paddingTop: insets.top }} lightClassName='bg-slate-200' className="flex-1 justify-center px-8">
      <TextInput
      className="p-2 border-2 rounded-md mb-3"
        value={email}
        placeholder='Email'
        autoCapitalize='none'
        onChangeText={(text) => setEmail(text)} />
      <TextInput
      className="p-2 border-2 rounded-md mb-3"
        value={password}
        secureTextEntry={true}
        placeholder='Password'
        autoCapitalize='none'
        onChangeText={(text) => setPassword(text)} />

      <View>
        {
          loading ? (
            <View style={{ alignItems: 'center' }}>
              <Text>Loading...</Text>
            </View>
          ) : (
            <TouchableOpacity className="bg-secondary p-3 rounded-md w-48 mx-auto" onPress={handleLogin}>
              <Text className="text-xl font-poppinsBold text-center">Sign Up!</Text>
            </TouchableOpacity>
          )
        }
      </View>

      <TouchableOpacity onPress={() => router.push('signIn')} className="bg-secondary/50 p-2 rounded-md mt-6 w-48 mx-auto">
        <Text className="text-lg text-center">Sign in</Text>
      </TouchableOpacity>

    </ThemedView >
  )
}

export default SignUp