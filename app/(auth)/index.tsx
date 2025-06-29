import { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Link } from 'expo-router';
import { login } from 'services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      Alert.alert('Error', 'Email dan password tidak boleh kosong');
      return;
    }

    try {
      console.log('Tombol Login ditekan');
      const data = await login(trimmedEmail, trimmedPassword);
      console.log('Login Response:', data);
      Alert.alert('Login Berhasil', 'Selamat datang!');
      router.replace('/(home)/home'); // prevent back to login
    } catch (error: any) {
      console.log('Login Error:', error?.response?.data || error.message);
      Alert.alert('Login Gagal', error?.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-gray-100">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 items-center justify-center px-4">
          <View className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
            <Text className="mb-6 text-center text-2xl font-bold text-gray-800">Login</Text>

            <Text className="mb-1 text-sm text-gray-600">Email</Text>
            <TextInput
              placeholder="Email"
              className="mb-4 rounded-lg border border-blue-600 px-3 py-2"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text className="mb-1 text-sm text-gray-600">Password</Text>
            <TextInput
              placeholder="Enter your password"
              secureTextEntry
              className="mb-6 rounded-lg border border-gray-300 px-3 py-2"
              value={password}
              onChangeText={setPassword}
            />

            <Link href="/signup" asChild>
              <Text className="pb-4 text-blue-600 underline">Belum punya akun?</Text>
            </Link>

            <Pressable className="rounded-lg bg-blue-600 py-3" onPress={handleLogin}>
              <Text className="text-center font-semibold text-white">Login</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
