import { View, Text, TextInput } from 'react-native';
import { Dropdown } from 'react-native-paper-dropdown';

const statusOptions = [
  { label: 'Baik', value: 'true' },
  { label: 'Rusak', value: 'false' },
];

export default function MonitoringStatusNoteSection({ status, setStatus, notes, setNotes }: any) {
  return (
    <View>
      <Text className="mb-1 text-sm text-gray-600">Status Alat</Text>
      <Dropdown
        label="Status monitoring"
        options={statusOptions}
        placeholder="Pilih status monitoring"
        value={status}
        onSelect={(value) => {
          if (value !== undefined) setStatus(value);
        }}
      />

      <Text className="mb-1 mt-4 text-sm text-gray-600">Catatan</Text>
      <TextInput
        value={notes}
        onChangeText={setNotes}
        multiline
        placeholder="Masukkan catatan"
        className="mb-4 min-h-[100px] rounded-lg border border-gray-300 px-3 py-2"
      />
    </View>
  );
}
