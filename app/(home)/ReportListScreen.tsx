import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getReportsData } from 'services/reportService';

type Report = {
  id: number;
  tester: string;
  Date: string;
  devicename: string;
  Documentation: string;
  Signature: string;
};

const ReportListScreen = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getReportsData();
        setReports(response); // pastikan response langsung array
      } catch (error) {
        console.error('❌ Gagal mengambil data report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const renderItem = ({ item }: { item: Report }) => {
    const formattedDate = new Date(item.Date).toLocaleDateString('id-ID');
    const cleanedSignature = item.Signature?.replace(/\r?\n|\r/g, '');

    return (
      <View className="mb-4 rounded-xl bg-white p-4 shadow-sm">
        <Text className="text-base font-semibold text-gray-800">Penguji: {item.tester}</Text>
        <Text className="text-sm text-gray-500">Tanggal: {formattedDate}</Text>
        <Text className="mb-2 text-sm text-gray-600">Alat: {item.devicename}</Text>

        {item.Documentation && (
          <Image
            source={{ uri: item.Documentation }}
            className="mb-3 h-40 w-full rounded-md border border-gray-200 bg-gray-50"
            resizeMode="cover"
          />
        )}

        {item.Signature && (
          <View className="mt-2">
            <Text className="text-sm text-gray-500">Tanda Tangan:</Text>
            <Image
              source={{ uri: item.Signature }}
              className="h-40 w-full rounded border border-gray-300"
              resizeMode="contain"
            />
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="mt-2 text-blue-600">Mengambil data laporan...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-4 pt-4">
      <Text className="mb-4 text-center text-2xl font-bold text-blue-700">Daftar Laporan</Text>

      {reports.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">Belum ada laporan yang tersedia.</Text>
        </View>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default ReportListScreen;
