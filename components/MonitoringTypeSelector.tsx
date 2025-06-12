import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';

type MonitoringType = 'harian' | 'mingguan' | 'bulanan';

type MonitoringProps = {
  monitoringType: MonitoringType;
  onMonitoringTypeChange: (type: MonitoringType) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
};

type Task = {
  id: number;
  name: string;
  isChecked: boolean;
};

const MonitoringScreen = ({ monitoringType, onMonitoringTypeChange }: MonitoringProps) => {
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

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="mb-2 text-lg font-bold">Pilih Tipe Monitoring</Text>
      <View className="mb-4 rounded border border-gray-300">
        <Picker
          selectedValue={monitoringType}
          onValueChange={(itemValue) => onMonitoringTypeChange(itemValue)}>
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
    </View>
  );
};

export default MonitoringScreen;
