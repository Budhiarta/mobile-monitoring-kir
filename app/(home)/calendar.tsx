import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';
import { AgendaItem, AgendaItems } from '../../services/taskService';
import taskService from '../../services/taskService';

const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [items, setItems] = useState<AgendaItems>({});

  const handleDayPress = async (day: { dateString: string }) => {
    const date = day.dateString;

    try {
      const checkedTasks = await taskService.getCheckedTaskByDate(date);

      // Set secara langsung tanpa merge agar tidak duplikat saat klik ulang
      setItems((prev) => ({
        ...prev,
        [date]: checkedTasks[date] || [],
      }));

      setSelectedDate(date);
    } catch (err) {
      console.error('❌ Error fetching agenda:', err);
    }
  };

  const renderItem = (item: AgendaItem, date: string) => (
    <View
      key={`${item.id}|${date}`}
      className="mb-5 rounded-2xl border border-gray-300 bg-white p-4 shadow-sm">
      {/* Header */}
      <View className="mb-3 border-b border-gray-200 pb-2">
        <Text className="text-base font-semibold text-blue-800">
          Penguji: <Text className="font-normal">{item.tester}</Text>
        </Text>
        <Text className="text-sm text-gray-700">Alat Uji: {item.device}</Text>
      </View>

      {/* Task Detail */}
      <View className="mb-3">
        {item.details?.map((detail, index) => (
          <Text key={`${item.id}-detail-${index}`} className="text-sm text-gray-800">
            • {detail}
          </Text>
        ))}
      </View>

      {/* Sumary */}
      {item.sumary ? (
        <View className="mb-3">
          <Text className="mb-1 text-sm text-gray-500">Ringkasan:</Text>
          <Text className="text-sm text-gray-700">{item.sumary}</Text>
        </View>
      ) : null}

      {/* Dokumentasi */}
      {item.documentation ? (
        <Image
          source={{ uri: item.documentation }}
          className="mb-3 h-48 w-full rounded-lg border border-gray-300 bg-gray-100"
          resizeMode="cover"
        />
      ) : null}

      {/* Signature */}
      {item.signature ? (
        <View>
          <Text className="mb-1 text-sm text-gray-500">Tanda Tangan:</Text>
          <Image
            source={{ uri: item.signature }}
            className="h-40 w-full rounded-lg border border-gray-300 bg-white"
            resizeMode="contain"
          />
        </View>
      ) : null}
    </View>
  );

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
                <Text className="text-gray-400">Tidak ada agenda hari ini.</Text>
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
            onPress={() => setSelectedDate(null)}
            className="mx-4 my-2 items-center rounded-lg bg-gray-200 py-3">
            <Text className="text-gray-800">← Kembali ke Kalender</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CalendarScreen;
