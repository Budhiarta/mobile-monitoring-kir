import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import api from 'services/api';

// Tipe untuk data device
type Device = {
  id: number;
  devicename: string;
};

const DeviceListScreen = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await api.get<Device[]>('/devices');
        setDevices(response.data);
      } catch (err) {
        setError('Gagal mengambil data device');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="mb-4 text-center text-2xl font-bold text-blue-700">List Alat Uji</Text>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mb-3 rounded-xl bg-gray-100 p-4 shadow">
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/(home)/testing',
                  params: { deviceId: item.id.toString() },
                })
              }>
              <Text className="text-base text-gray-800">{item.devicename}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default DeviceListScreen;
