import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // install jika belum
import Checkbox from 'expo-checkbox';

type MonitoringType = 'harian' | 'mingguan' | 'bulanan';

type Task = {
  id: number;
  name: string;
  isChecked: boolean;
};

const MonitoringScreen = () => {
  const [monitoringType, setMonitoringType] = useState<MonitoringType>('harian');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const dummyTasks: Record<MonitoringType, Task[]> = {
      harian: [
        { id: 1, name: 'Cek suhu', isChecked: false },
        { id: 2, name: 'Periksa air', isChecked: false },
      ],
      mingguan: [
        { id: 3, name: 'Bersihkan filter', isChecked: false },
        { id: 4, name: 'Kalibrasi alat', isChecked: false },
      ],
      bulanan: [{ id: 5, name: 'Perawatan sistem', isChecked: false }],
    };

    setTasks(dummyTasks[monitoringType]);
  }, [monitoringType]);

  const toggleCheckbox = (id: number) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, isChecked: !task.isChecked } : task))
    );
  };

  const handleSubmit = () => {
    // Kirim payload ke backend
    const payload = tasks.map((task) => ({
      taskId: task.id,
      isChecked: task.isChecked,
    }));

    console.log('Payload:', payload);
    // fetch('/api/submit-task', { method: "POST", body: JSON.stringify(payload) })
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="mb-2 text-lg font-bold">Pilih Tipe Monitoring</Text>
      <View className="mb-4 rounded border border-gray-300">
        <Picker
          selectedValue={monitoringType}
          onValueChange={(itemValue) => setMonitoringType(itemValue)}>
          <Picker.Item label="Harian" value="harian" />
          <Picker.Item label="Mingguan" value="mingguan" />
          <Picker.Item label="Bulanan" value="bulanan" />
        </Picker>
      </View>

      <Text className="mb-2 text-lg font-bold">Daftar Task</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between border-b border-gray-200 py-3">
            <Text className="text-base">{item.name}</Text>
            <Checkbox
              value={item.isChecked}
              onValueChange={() => toggleCheckbox(item.id)}
              color={item.isChecked ? '#2563eb' : undefined}
            />
          </View>
        )}
      />

      <TouchableOpacity onPress={handleSubmit} className="mt-6 rounded-lg bg-blue-600 p-3">
        <Text className="text-center font-bold text-white">Kirim</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MonitoringScreen;
