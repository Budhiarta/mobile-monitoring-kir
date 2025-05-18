import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { VictoryPie } from 'victory-native';

// Enum jenis monitoring
enum MonitoringType {
  Harian = 'harian',
  Mingguan = 'mingguan',
  Bulanan = 'bulanan',
}

// Konfigurasi warna & persen tiap jenis monitoring
const monitoringConfig = {
  [MonitoringType.Harian]: { color: '#3685cd', percent: 90, label: 'Harian' },
  [MonitoringType.Mingguan]: { color: '#34d399', percent: 60, label: 'Mingguan' },
  [MonitoringType.Bulanan]: { color: '#fbbf24', percent: 40, label: 'Bulanan' },
};

// List device (dummy)
type DeviceItem = {
  id: string;
  name: string;
  monitoringType: MonitoringType;
};

const devices: DeviceItem[] = [
  { id: '1', name: 'Device A', monitoringType: MonitoringType.Harian },
  { id: '2', name: 'Device B', monitoringType: MonitoringType.Mingguan },
  { id: '3', name: 'Device C', monitoringType: MonitoringType.Bulanan },
];

const alatUji = () => {
  const handlePress = (device: DeviceItem) => {
    Alert.alert('Device clicked', `Kamu klik ${device.name}`);
    // atau nanti navigasi ke detail screen
  };

  const renderItem = ({ item }: { item: DeviceItem }) => {
    const config = monitoringConfig[item.monitoringType];

    return (
      <TouchableOpacity
        onPress={() => handlePress(item)}
        activeOpacity={0.7} // efek opacity saat ditekan
        className="mb-3 rounded-xl border border-gray-200 bg-white p-4 shadow">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-base font-semibold text-gray-800">{item.name}</Text>
            <Text className="text-sm text-gray-500">{config.label}</Text>
          </View>

          {/* Donut Chart */}
          <VictoryPie
            data={[
              { x: 'Progress', y: config.percent },
              { x: 'Remaining', y: 100 - config.percent },
            ]}
            width={80}
            height={80}
            innerRadius={25}
            colorScale={[config.color, '#e0e0e0']}
            labels={() => null}
            padAngle={1} // kecil saja biar smooth
            cornerRadius={5}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="mb-4 text-xl font-bold text-gray-800">Device List</Text>
      <FlatList data={devices} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
};

export default alatUji;
