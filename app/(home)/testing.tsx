import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Dropdown } from 'react-native-paper-dropdown';
import { Provider as PaperProvider } from 'react-native-paper';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import ImagePickerInput from 'components/ImagePicker';
import SignatureInput from 'components/SignatureInput';
import { submitMonitoringData } from 'services/monitoring';
import api from 'services/api';

type MonitoringType = 1 | 2 | 3;

export default function Testing() {
  const { deviceId } = useLocalSearchParams();
  console.log('Device ID:', deviceId);
  const router = useRouter();

  const [tester, setTester] = useState('');
  const [notes, setNotes] = useState('');
  const [signature, setSignature] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [monitoringType, setMonitoringType] = useState<MonitoringType>(1);
  const [status, setStatus] = useState<string>('true');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const statusData = [
    { label: 'baik', value: 'true' },
    { label: 'rusak', value: 'false' },
  ];

  const toggleDatePicker = () => setShowPicker(!showPicker);

  const onPickerChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
    }
    setShowPicker(false);
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const handleSubmit = async () => {
    if (!tester || !signature || !deviceId) {
      return Alert.alert('Validasi', 'Nama penguji, deviceId, dan tanda tangan wajib diisi');
    }

    try {
      const payload = {
        Tester: tester,
        DeviceId: parseInt(deviceId as string),
        MonitoringType: monitoringType,
        Documentation: imageUri,
        Status: status === 'true',
        Sumary: notes,
        Signature: signature,
        Date: date.toISOString(),
      };

      const monitoringRes = await api.post('/monitoring', payload);
      const monitoringId = monitoringRes.data.id;

      Alert.alert('Sukses', 'Data monitoring berhasil dikirim!');

      // Arahkan ke dropdown dengan deviceId dan monitoringId
      router.push({
        pathname: '/(home)/dropdown',
        params: {
          deviceId: deviceId.toString(),
          monitoringId: monitoringId.toString(),
        },
      });
    } catch (error: any) {
      console.error(error);
      Alert.alert('Gagal', error.message || 'Terjadi kesalahan');
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

            {/* Nama Penguji */}
            <Text className="mb-1 text-sm text-gray-600">Nama Penguji</Text>
            <TextInput
              value={tester}
              onChangeText={setTester}
              placeholder="masukkan nama penguji"
              className="mb-4 rounded-lg border border-gray-300 px-3 py-2"
            />

            {/* ID Alat */}
            <Text className="mb-1 text-sm text-gray-600">ID Device</Text>
            <TextInput
              value={deviceId?.toString()}
              editable={false}
              className="mb-4 rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-gray-500"
            />

            {/* Tanggal Pengujian */}
            <Text className="mb-1 mt-4 text-sm text-gray-600">Tanggal Pengujian</Text>
            <TouchableOpacity onPress={toggleDatePicker}>
              <View className="rounded-lg border border-gray-300 bg-white px-3 py-2">
                <Text>{formatDate(date)}</Text>
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

            {/* Dokumentasi */}
            <ImagePickerInput label="Dokumentasi" onImageSelected={(uri) => setImageUri(uri)} />

            {/* Status */}
            <Text className="mb-1 text-sm text-gray-600">Status Alat</Text>
            <Dropdown
              label="Status monitoring"
              options={statusData}
              placeholder="pilih status monitoring"
              value={status}
              onSelect={(value) => {
                if (value !== undefined) setStatus(value);
              }}
            />

            {/* Catatan */}
            <Text className="mb-1 text-sm text-gray-600">Catatan</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="masukkan catatan"
              className="mb-6 min-h-[100px] rounded-lg border border-gray-300 px-3 py-2 align-top"
              multiline
            />

            {/* Tanda Tangan */}
            <SignatureInput
              label="Paraf"
              onSigned={(base64) => setSignature(base64)}
              onScrollToggle={(enabled) => setScrollEnabled(enabled)}
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
