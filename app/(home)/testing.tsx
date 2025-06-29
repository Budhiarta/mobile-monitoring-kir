import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-paper-dropdown';
import { format } from 'date-fns';

import ImagePickerInput from 'components/ImagePicker';
import SignatureInput from 'components/SignatureInput';
import api from 'services/api';

type MonitoringType = 1 | 2 | 3;
type StatusValue = 'true' | 'false';

const statusOptions = [
  { label: 'baik', value: 'true' },
  { label: 'rusak', value: 'false' },
];

export default function Testing() {
  const { deviceId } = useLocalSearchParams<{ deviceId: string }>();
  const router = useRouter();

  const [tester, setTester] = useState('');
  const [notes, setNotes] = useState('');
  const [signature, setSignature] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [monitoringType, setMonitoringType] = useState<MonitoringType>(1);
  const [status, setStatus] = useState<StatusValue>('true');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => setShowPicker((prev) => !prev);

  const onPickerChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      console.log('📆 Tanggal Dipilih (Local):', selectedDate.toString());
      setDate(selectedDate);
    }
    setShowPicker(false);
  };

  const formatDisplayDate = (date: Date) =>
    date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

  const handleSubmit = async () => {
    if (!tester || !signature || !deviceId) {
      return Alert.alert('Validasi', 'Nama penguji, deviceId, dan tanda tangan wajib diisi');
    }

    const formattedDate = format(date, 'yyyy-MM-dd');
    console.log('📤 Tanggal Dikirim (yyyy-MM-dd):', formattedDate);

    try {
      const payload = {
        Tester: tester,
        DeviceId: parseInt(deviceId),
        MonitoringType: monitoringType,
        Documentation: imageUri,
        Status: status === 'true',
        Sumary: notes,
        Signature: signature,
        Date: formattedDate, // <- Kirim hanya yyyy-MM-dd
      };

      const response = await api.post('/monitoring', payload);
      const monitoringId = response.data.id;

      Alert.alert('Sukses', 'Data monitoring berhasil dikirim!');
      router.push({
        pathname: '/(home)/dropdown',
        params: {
          deviceId: deviceId.toString(),
          monitoringId: monitoringId.toString(),
        },
      });
    } catch (error: any) {
      console.error('❌ Gagal Submit:', error.response?.data || error);
      Alert.alert('Gagal', error.message || 'Terjadi kesalahan saat mengirim data');
    }
  };

  return (
    <PaperProvider>
      <View className="flex-1 bg-gray-100 px-4">
        <ScrollView
          scrollEnabled={scrollEnabled}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 20,
          }}>
          <View className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
            <Text className="mb-6 text-center text-2xl font-bold text-gray-800">
              Monitoring Alat Uji
            </Text>

            <Text className="mb-1 text-sm text-gray-600">Nama Penguji</Text>
            <TextInput
              value={tester}
              onChangeText={setTester}
              placeholder="Masukkan nama penguji"
              className="mb-4 rounded-lg border border-gray-300 px-3 py-2"
            />

            <Text className="mb-1 text-sm text-gray-600">ID Device</Text>
            <TextInput
              value={deviceId}
              editable={false}
              className="mb-4 rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-gray-500"
            />

            <Text className="mb-1 mt-4 text-sm text-gray-600">Tanggal Pengujian</Text>
            <TouchableOpacity onPress={toggleDatePicker}>
              <View className="rounded-lg border border-gray-300 bg-white px-3 py-2">
                <Text>{formatDisplayDate(date)}</Text>
              </View>
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onPickerChange}
              />
            )}

            <ImagePickerInput label="Dokumentasi" onImageSelected={setImageUri} />

            <Text className="mb-1 text-sm text-gray-600">Status Alat</Text>
            <Dropdown
              label="Status monitoring"
              options={statusOptions}
              value={status}
              onSelect={(value) => {
                if (value === 'true' || value === 'false') {
                  setStatus(value);
                }
              }}
            />

            <Text className="mb-1 text-sm text-gray-600">Catatan</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Masukkan catatan"
              multiline
              className="mb-6 min-h-[100px] rounded-lg border border-gray-300 px-3 py-2 align-top"
            />

            <SignatureInput
              label="Paraf"
              onSigned={setSignature}
              onScrollToggle={setScrollEnabled}
            />
          </View>
        </ScrollView>

        <TouchableOpacity onPress={handleSubmit} className="mt-4 rounded-xl bg-blue-600 px-4 py-3">
          <Text className="text-center text-base font-semibold text-white">Submit</Text>
        </TouchableOpacity>
      </View>
    </PaperProvider>
  );
}
