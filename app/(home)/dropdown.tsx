import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import { useLocalSearchParams } from 'expo-router';
import api from 'services/api';

type MonitoringType = 'harian' | 'mingguan' | 'bulanan';

type Task = {
  id: number;
  activity: string;
  frequency: number;
  isChecked: boolean;
};

type FrequencyTasks = {
  [frequency: number]: Task[];
};

const getFrequencyFromType = (type: MonitoringType): number => {
  switch (type) {
    case 'harian':
      return 1;
    case 'mingguan':
      return 2;
    case 'bulanan':
      return 3;
    default:
      return 1;
  }
};

const DropdownScreen = () => {
  const { deviceId, monitoringId } = useLocalSearchParams();
  const [monitoringType, setMonitoringType] = useState<MonitoringType>('harian');
  const [allTasks, setAllTasks] = useState<FrequencyTasks>({});

  useEffect(() => {
    if (deviceId) {
      api
        .get(`/task/${deviceId}`)
        .then((res) => {
          const groupedTasks: FrequencyTasks = { 1: [], 2: [], 3: [] };

          res.data.forEach((task: any) => {
            const freq = task.frequency;
            groupedTasks[freq].push({ ...task, isChecked: false });
          });

          setAllTasks(groupedTasks);
        })
        .catch((err) => console.error('Gagal ambil task:', err));
    }
  }, [deviceId]);

  const frequency = getFrequencyFromType(monitoringType);
  const tasks = allTasks[frequency] || [];

  const toggleCheckbox = (id: number) => {
    setAllTasks((prev) => ({
      ...prev,
      [frequency]: prev[frequency].map((task) =>
        task.id === id ? { ...task, isChecked: !task.isChecked } : task
      ),
    }));
  };

  const handleSubmit = async () => {
    if (!monitoringId) {
      Alert.alert('Error', 'Monitoring ID tidak ditemukan');
      return;
    }

    const allCheckedTasks = Object.values(allTasks)
      .flat()
      .filter((task) => task.isChecked)
      .map((task) => ({
        taskId: task.id,
        monitoringId: parseInt(monitoringId as string),
        checked: true,
      }));

    if (allCheckedTasks.length === 0) {
      Alert.alert('Kosong', 'Tidak ada task yang dicentang');
      return;
    }

    try {
      await Promise.all(allCheckedTasks.map((task) => api.post('/task', task)));
      Alert.alert('Sukses', 'Semua task berhasil disimpan!');
    } catch (err) {
      console.error('Gagal simpan task:', err);
      Alert.alert('Gagal', 'Terjadi kesalahan saat menyimpan task');
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="mb-2 text-lg font-bold">Pilih Tipe Monitoring</Text>
      <View className="mb-4 rounded border border-gray-300">
        <Picker
          selectedValue={monitoringType}
          onValueChange={(itemValue) => setMonitoringType(itemValue as MonitoringType)}>
          <Picker.Item label="Harian" value="harian" />
          <Picker.Item label="Mingguan" value="mingguan" />
          <Picker.Item label="Bulanan" value="bulanan" />
        </Picker>
      </View>

      <Text className="mb-2 text-lg font-bold">Daftar Task</Text>

      {tasks.length === 0 ? (
        <Text className="mt-4 text-center italic text-gray-500">
          Tidak ada task untuk tipe monitoring ini.
        </Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-between border-b border-gray-200 py-3">
              <Text className="flex-1 pr-2 text-base">{item.activity}</Text>
              <Checkbox
                value={item.isChecked}
                onValueChange={() => toggleCheckbox(item.id)}
                color={item.isChecked ? '#2563eb' : undefined}
              />
            </View>
          )}
        />
      )}

      <TouchableOpacity onPress={handleSubmit} className="mt-6 rounded-lg bg-blue-600 p-3">
        <Text className="text-center font-bold text-white">Kirim</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DropdownScreen;
