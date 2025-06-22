import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRef, useState } from 'react';
import MonitoringScreen from 'components/MonitoringTypeSelector';
import { Provider as PaperProvider } from 'react-native-paper';
const TypeSelection = () => {
  type MonitoringType = 'harian' | 'mingguan' | 'bulanan';
  const [monitoringType, setMonitoringType] = useState<MonitoringType>('harian');
  const [scrollEnabled, setScrollEnabled] = useState(true);
  return (
    <PaperProvider>
      <View className="flex-1 bg-gray-100 px-4">
        {/* Tempatkan MonitoringScreen di dalam ScrollView */}
        <MonitoringScreen
          monitoringType={monitoringType}
          onMonitoringTypeChange={setMonitoringType}
          tasks={[]}
          setTasks={() => {}}
        />

        {/* Tambahan konten di bawahnya jika ada */}
        <Text className="mt-4 text-base text-gray-700">Konten tambahan di bawah sini</Text>
      </View>
    </PaperProvider>
  );
};

export default TypeSelection;
