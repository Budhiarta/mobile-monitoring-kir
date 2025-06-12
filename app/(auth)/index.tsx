import { useState } from 'react';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { login } from 'services/authService';

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    console.log('Tombol Login ditekan');
    try {
      const data = await login(name, password);
      console.log('Login Response:', data);
      Alert.alert('Login Berhasil', `Token: ${data.token}`);
      router.push('/(home)/home');
    } catch (error: any) {
      console.log('Login Error:', error.response?.data); //
      Alert.alert('Login Gagal', error.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 px-4">
      <View className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <Text className="mb-6 text-center text-2xl font-bold text-gray-800">Login</Text>

        <Text className="mb-1 text-sm text-gray-600">Email</Text>
        <TextInput
          placeholder="Email"
          className="mb-4 rounded-lg border border-blue-600 px-3 py-2"
          keyboardType="email-address"
          value={name}
          onChangeText={setName}
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
  );
}
