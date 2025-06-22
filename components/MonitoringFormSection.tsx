import { View, Text, TouchableOpacity } from 'react-native';
import MonitoringScreen from 'components/MonitoringTypeSelector';

export default function MonitoringSelectorSection({ monitoringType, setMonitoringType }: any) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm text-gray-600">Jenis Pengujian</Text>
      <MonitoringScreen
        monitoringType={monitoringType}
        onMonitoringTypeChange={setMonitoringType}
        tasks={[]}
        setTasks={function (tasks: { id: number; name: string; isChecked: boolean }[]): void {
          throw new Error('Function not implemented.');
        }}
      />
    </View>
  );
}
