import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { register } from 'services/authService';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');

  const handleRegister = async () => {
    const requestData = { name, email, password, image };
    console.log('Data yang dikirim untuk register:', requestData);

    try {
      const data = await register(requestData);
      Alert.alert('Registrasi Berhasil', 'Akun berhasil dibuat');
    } catch (error: any) {
      const message =
        error.response?.data?.message === 'Email sudah terdaftar'
          ? 'Email sudah digunakan, silakan gunakan email lain.'
          : error.response?.data?.message || 'Terjadi kesalahan';

      Alert.alert('Registrasi Gagal', message);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
      className="bg-gray-100 px-4">
      <View className="mt-20 w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <Text className="mb-6 text-center text-2xl font-bold text-gray-800">Register</Text>

        <Text className="mb-1 text-sm text-gray-600">Name</Text>
        <TextInput
          placeholder="Enter your name"
          className="mb-4 rounded-lg border border-gray-300 px-3 py-2"
          value={name}
          onChangeText={setName}
        />

        <Text className="mb-1 text-sm text-gray-600">Email</Text>
        <TextInput
          placeholder="Enter your email"
          className="mb-4 rounded-lg border border-gray-300 px-3 py-2"
          keyboardType="email-address"
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
  );
}
