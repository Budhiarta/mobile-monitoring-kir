import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export default function MonitoringDateSection({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
    }
    setShowPicker(false);
  };

  return (
    <View className="mb-4">
      <Text className="mb-1 text-sm text-gray-600">Tanggal Pengujian</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <View className="rounded-lg border border-gray-300 bg-white px-3 py-2">
          <Text>{date.toLocaleDateString('id-ID')}</Text>
        </View>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker mode="date" display="spinner" value={date} onChange={handleDateChange} />
      )}
    </View>
  );
}
