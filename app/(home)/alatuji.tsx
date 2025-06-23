import React from 'react';
import { View, Text, FlatList } from 'react-native';

const devices = [
  'Gas Analizer',
  'Smoke Tester',
  'Axle Ply Detector',
  'Side Slip',
  'Head Light Tester',
  'Speedometer Tester',
  'Brake Axle Load Tester',
  'Sound Level Tester',
  'Tint Tester',
  'Depth Thread/Kedalaman',
];

const DeviceListScreen = () => {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="mb-4 text-center text-2xl font-bold text-blue-700">List Alat Uji</Text>
      <FlatList
        data={devices}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="mb-3 rounded-xl bg-gray-100 p-4 shadow">
            <Text className="text-base text-gray-800">{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default DeviceListScreen;
