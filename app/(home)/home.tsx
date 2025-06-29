import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Home = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/(auth)');
  };

  return (
    <View className="flex h-full bg-white">
      {/* HEADER */}
      <View className="flex-row items-center justify-between bg-blue-400 px-8 py-4">
        <Image
          source={require('../../assets/logo1.png')}
          className="mr-2 h-12 w-12"
          resizeMode="contain"
        />
        <Text className="flex-1 text-center text-xl font-bold text-white">SIMATRA</Text>
        <Image
          source={require('../../assets/logo2.png')}
          className="ml-2 h-12 w-12"
          resizeMode="contain"
        />
      </View>

      {/* BODY */}
      <View className="flex-1 items-center justify-start bg-white pt-36">
        {/* Baris 1 */}
        <View className="mb-8 flex-row justify-center">
          <View className="mx-3 items-center">
            <Link href="/alatuji" asChild>
              <TouchableOpacity className="rounded-2xl bg-blue-400 p-5">
                <Fontisto name="recycle" size={48} color="white" />
              </TouchableOpacity>
            </Link>
            <Text className="mt-2 text-center text-gray-700">Alat Uji</Text>
          </View>

          <View className="mx-3 items-center">
            <Link href="/calendar" asChild>
              <TouchableOpacity className="rounded-2xl bg-blue-400 p-5">
                <FontAwesome name="calendar" size={48} color="white" />
              </TouchableOpacity>
            </Link>
            <Text className="mt-2 text-center text-gray-700">Kalender</Text>
          </View>
        </View>

        {/* Baris 2 */}
        <View className="mb-8 flex-row justify-center">
          <View className="mx-3 items-center">
            <Link href="/report" asChild>
              <TouchableOpacity className="rounded-2xl bg-blue-400 p-5">
                <MaterialCommunityIcons name="file-edit-outline" size={48} color="white" />
              </TouchableOpacity>
            </Link>
            <Text className="mt-2 text-center text-gray-700">Input Report</Text>
          </View>

          <View className="mx-3 items-center">
            <Link href="/guides" asChild>
              <TouchableOpacity className="rounded-2xl bg-blue-400 p-5">
                <MaterialCommunityIcons
                  name="file-document-multiple-outline"
                  size={48}
                  color="white"
                />
              </TouchableOpacity>
            </Link>
            <Text className="mt-2 text-center text-gray-700">Panduan</Text>
          </View>

          <View className="mx-3 items-center">
            <Link href="/sparePart" asChild>
              <TouchableOpacity className="rounded-2xl bg-blue-400 p-5">
                <FontAwesome name="gears" size={48} color="white" />
              </TouchableOpacity>
            </Link>
            <Text className="mt-2 text-center text-gray-700">Sparepart</Text>
          </View>
        </View>

        {/* Baris 3 */}
        <View className="mb-10 mt-4 items-center">
          <Link href="/ReportListScreen" asChild>
            <TouchableOpacity className="rounded-2xl bg-green-500 p-5">
              <Ionicons name="document-text-outline" size={48} color="white" />
            </TouchableOpacity>
          </Link>
          <Text className="mt-2 text-center text-gray-700">Hasil Report</Text>
        </View>
      </View>

      {/* Tombol Logout Paling Bawah Full Width */}
      <TouchableOpacity className="w-full bg-red-500 py-4" onPress={handleLogout}>
        <Text className="text-center text-lg font-bold text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
