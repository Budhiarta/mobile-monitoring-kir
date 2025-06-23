import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, ListRenderItem } from 'react-native';
import api from '../../services/api';

// Tipe data sesuai Prisma model
type SparePart = {
  id: number;
  name: string;
  qty: number;
};

const CadanganScreen = () => {
  const [spareParts, setSpareParts] = useState<SparePart[]>([]);
  const [jumlahUpdate, setJumlahUpdate] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await api.get('/spareParts');
    setSpareParts(res.data);
  };

  const handleTambah = (id: number) => {
    setJumlahUpdate((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleKurang = (id: number) => {
    setJumlahUpdate((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const handleSimpan = async () => {
    await api.put('/sparePart', jumlahUpdate);
    setJumlahUpdate({});
    fetchData();
  };

  const renderItem: ListRenderItem<SparePart> = ({ item }) => {
    const jumlah = jumlahUpdate[item.id] || 0;

    return (
      <View className="border-b border-gray-300 py-4">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-lg font-bold">{item.name}</Text>
            <Text className="text-gray-700">Qty saat ini: {item.qty}</Text>
          </View>

          <View className="flex-row items-center">
            <TouchableOpacity
              className={`rounded bg-blue-500 px-3 py-1 ${jumlah <= 0 ? 'opacity-50' : ''}`}
              onPress={() => handleKurang(item.id)}
              disabled={jumlah <= 0}>
              <Text className="text-lg font-bold text-white">-</Text>
            </TouchableOpacity>

            <Text className="mx-4 text-base">{jumlah}</Text>

            <TouchableOpacity
              className="rounded bg-blue-500 px-3 py-1"
              onPress={() => handleTambah(item.id)}>
              <Text className="text-lg font-bold text-white">+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="mb-4 mt-8 text-center text-2xl font-bold text-blue-700">
        Komponen Cadangan
      </Text>
      <FlatList
        data={spareParts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <View className="mt-4">
        <Button title="Simpan Perubahan" onPress={handleSimpan} />
      </View>
    </View>
  );
};

export default CadanganScreen;
