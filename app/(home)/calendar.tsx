import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';
import { ScrollView } from 'react-native-gesture-handler';
import taskService, { AgendaItem, AgendaItems } from '../../services/taskService';

const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [items, setItems] = useState<AgendaItems>({});

  const handleDayPress = async (day: { dateString: string }) => {
    const date = day.dateString;

    const checkedTasks = await taskService.getCheckedTaskByDate(date);

    setItems((prev) => ({ ...prev, ...checkedTasks }));
    setSelectedDate(date);
  };

  const renderItem = (item: AgendaItem, date: string) => {
    const itemKey = `${item.id}|${date}`;

    return (
      <View
        key={itemKey}
        className="mb-2 overflow-hidden rounded-xl border border-gray-200 bg-white"
        style={{ minHeight: item.height || 80 }}>
        <View className="rounded-t-xl bg-blue-100 p-4">
          <Text className="font-bold text-blue-800">Nama Penguji: {item.tester}</Text>
          <Text className="text-blue-800">alat uji: {item.device}</Text>
        </View>

        <View className="bg-gray-50 px-4 py-2">
          {item.details.map((detail, index) => (
            <Text key={`${item.id}-detail-${index}`} className="mb-1 text-sm text-gray-700">
              - {detail}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      {!selectedDate ? (
        <Calendar
          onDayPress={handleDayPress}
          markedDates={Object.keys(items).reduce(
            (acc, date) => {
              acc[date] = { marked: true, dotColor: 'blue' };
              return acc;
            },
            {} as Record<string, any>
          )}
        />
      ) : (
        <>
          <Agenda
            items={items}
            selected={selectedDate}
            renderItem={(item: AgendaItem) => renderItem(item, selectedDate)}
            renderEmptyDate={() => (
              <View className="p-4">
                <Text className="text-gray-400">Tidak ada agenda hari ini</Text>
              </View>
            )}
            onDayPress={handleDayPress}
            theme={{
              agendaDayTextColor: 'black',
              agendaDayNumColor: 'black',
              agendaTodayColor: 'red',
              agendaKnobColor: '#2c3e50',
            }}
          />

          <TouchableOpacity
            className="mx-4 my-2 items-center rounded-lg bg-gray-200 py-3"
            onPress={() => setSelectedDate(null)}>
            <Text className="text-gray-800">← Kembali ke Kalender</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CalendarScreen;
