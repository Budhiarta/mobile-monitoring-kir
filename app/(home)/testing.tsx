import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRef, useState } from 'react';
import SignatureScreen from 'react-native-signature-canvas';
import { Dropdown } from 'react-native-paper-dropdown';
import { Provider as PaperProvider } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import ImagePickerInput from 'components/ImagePicker';
import SignatureInput from 'components/SignatureInput';
import { submitMonitoringData } from 'services/monitoring';

export default function Testing() {
  const [tester, setTester] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [notes, setNotes] = useState('');
  const [signature, setSignature] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const handleSubmit = async () => {
    if (!tester || !signature) {
      return Alert.alert('Validasi', 'Nama penguji dan tanda tangan wajib diisi');
    }

    try {
      const payload = {
        Tester: tester,
        deviceName: 'Gas Analyzer',
        MonitoringType: monitoringType,
        Documentation: imageUri,
        Status: status === 'true',
        Sumary: notes,
        Signature: signature, // ← pastikan ini isinya bukan ""
        Date: date.toISOString(),
      };

      const response = await submitMonitoringData(payload);
      Alert.alert('Sukses', 'Data monitoring berhasil dikirim!');
      console.log(response);
    } catch (error: any) {
      Alert.alert('Gagal', error.message);
    }

    console.log('Tester:', tester);
    console.log('monitoring tipe:', monitoringType);
    console.log('docum:', imageUri);
    console.log('status:', status);
    console.log('sumari:', notes);
    console.log('date:', date);
  };

  const [monitoringType, setMonitoringType] = useState<number | undefined>(undefined);
  const monitoringTypeData = [
    { label: 'Harian', value: '1' },
    { label: 'Mingguan', value: '2' },
    { label: 'Bulanan', value: '3' },
  ];

  const [status, setStatus] = useState<string>('true');
  const statusData = [
    { label: 'baik', value: 'true' },
    { label: 'rusak', value: 'false' },
  ];

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onPickerChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
    }
    setShowPicker(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
            <Text className="mb-6 text-center text-2xl font-bold text-gray-800">Gas Energizer</Text>

            {/* TextInput */}
            <Text className="mb-1 text-sm text-gray-600">Nama Penguji</Text>
            <TextInput
              value={tester}
              onChangeText={setTester}
              placeholder="masukkan nama penguji"
              className="mb-4 rounded-lg border border-gray-300 px-3 py-2"
            />

            <Text>Jenis Pengujian</Text>
            <Dropdown
              label={'jenis monitoring'}
              options={monitoringTypeData}
              placeholder="pilih jenis monitoring"
              value={monitoringType?.toString()}
              onSelect={(value) => setMonitoringType(value ? parseInt(value) : undefined)}
            />

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

            <ImagePickerInput
              label="Dokumentasi"
              onImageSelected={(uri) => console.log('Gambar dipilih:', uri)}
            />

            <Text className="mb-1 text-sm text-gray-600">Status Alat</Text>
            <Dropdown
              label={'Status monitoring'}
              options={statusData}
              placeholder="pilih status monitoring"
              value={status}
              onSelect={(value) => {
                if (value !== undefined) setStatus(value);
              }}
            />

            <Text className="mb-1 text-sm text-gray-600">Catatan</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="masukkan catatan"
              className="mb-6 min-h-[100px] rounded-lg border border-gray-300 px-3 py-2 align-top"
              multiline
            />

            <SignatureInput
              label="Paraf"
              onSigned={(base64) => {
                setSignature(base64); // ← simpan tanda tangan ke state
              }}
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
