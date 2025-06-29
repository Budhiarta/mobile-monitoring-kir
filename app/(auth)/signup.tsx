import { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { register } from 'services/authService';

export default function Register() {
  const router = useRouter();

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');

  const handleRegister = async () => {
    const requestData = {
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
      image: image.trim(),
    };

    console.log('Tombol Register ditekan');
    console.log('Data yang dikirim untuk register:', requestData);

    if (!requestData.username || !requestData.email || !requestData.password) {
      Alert.alert('Validasi Gagal', 'Nama, email, dan password wajib diisi.');
      return;
    }

    try {
      await register(requestData);
      Alert.alert('Registrasi Berhasil', 'Akun berhasil dibuat. Silakan login.');
      router.replace('/(auth)'); // Arahkan ke halaman login
    } catch (error: any) {
      const message =
        error.response?.data?.message === 'Email sudah terdaftar'
          ? 'Email sudah digunakan, silakan gunakan email lain.'
          : error.response?.data?.message || 'Terjadi kesalahan';
      Alert.alert('Registrasi Gagal', message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-gray-100">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
          className="px-4">
          <View className="mt-20 w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
            <Text className="mb-6 text-center text-2xl font-bold text-gray-800">Register</Text>

            <Text className="mb-1 text-sm text-gray-600">Name</Text>
            <TextInput
              placeholder="Enter your name"
              className="mb-4 rounded-lg border border-gray-300 px-3 py-2"
              value={username}
              onChangeText={setUserName}
            />

            <Text className="mb-1 text-sm text-gray-600">Email</Text>
            <TextInput
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              className="mb-4 rounded-lg border border-gray-300 px-3 py-2"
              value={email}
              onChangeText={setEmail}
            />

            <Text className="mb-1 text-sm text-gray-600">Password</Text>
            <TextInput
              placeholder="Enter your password"
              secureTextEntry
              className="mb-4 rounded-lg border border-gray-300 px-3 py-2"
              value={password}
              onChangeText={setPassword}
            />

            <Text className="mb-1 text-sm text-gray-600">Image URL (optional)</Text>
            <TextInput
              placeholder="https://example.com/photo.jpg"
              className="mb-6 rounded-lg border border-gray-300 px-3 py-2"
              value={image}
              onChangeText={setImage}
            />

            <Pressable className="rounded-lg bg-blue-600 py-3" onPress={handleRegister}>
              <Text className="text-center font-semibold text-white">Register</Text>
            </Pressable>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
