import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Home = () => {
  return (
    <View className="flex h-full bg-white">
      {/* HEADER */}
      <View className="flex-row items-center justify-between bg-blue-400 px-8 py-4">
        {/* Logo kiri */}
        <Image
          source={require('../../assets/logo1.png')}
          className="mr-2 h-12 w-12"
          resizeMode="contain"
        />

        {/* Title tengah */}
        <Text className="flex-1 text-center text-xl font-bold text-white">SIMANTRA</Text>

        {/* Logo kanan */}
        <Image
          source={require('../../assets/logo2.png')}
          className="ml-2 h-12 w-12"
          resizeMode="contain"
        />
      </View>

      <View className="flex h-full items-center justify-center bg-white">
        <View className="flex-row space-x-10 p-4 pb-20">
          <Link href="/testing" asChild>
            <TouchableOpacity className="mr-7 rounded-2xl bg-blue-400 p-5">
              <Fontisto name="recycle" size={48} color="white" />
            </TouchableOpacity>
          </Link>

          <TouchableOpacity className="rounded-2xl bg-blue-400 p-5">
            <FontAwesome name="calendar" size={48} color="white" />
          </TouchableOpacity>
        </View>
        {/* Baris pertama (3 icon) */}
        <View className="mb-8 flex-row space-x-10">
          <TouchableOpacity className="mr-5 rounded-2xl bg-blue-400 p-5">
            <MaterialCommunityIcons name="file-edit-outline" size={48} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="mr-5 rounded-2xl bg-blue-400 p-5">
            <MaterialCommunityIcons name="file-document-multiple-outline" size={48} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="rounded-2xl bg-blue-400 p-5">
            <FontAwesome name="gears" size={48} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;
