import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icon library populer

const Home = () => {
  return (
    <View className="flex h-full items-center justify-center bg-white">
      {/* Baris pertama (3 icon) */}
      <View className="mb-6 flex-row space-x-8">
        <Ionicons name="home-outline" size={40} color="black" />
        <Ionicons name="heart-outline" size={40} color="black" />
        <Ionicons name="settings-outline" size={40} color="black" />
      </View>

      {/* Baris kedua (2 icon) */}
      <View className="flex-row space-x-8">
        <Ionicons name="chatbubble-outline" size={40} color="black" />
        <Ionicons name="person-outline" size={40} color="black" />
      </View>
    </View>
  );
};

export default Home;
