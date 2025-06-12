import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';
import { ScrollView } from 'react-native-gesture-handler';

type CustomAgendaItem = {
  id: string;
  name: string;
  details: string[];
  height?: number;
};

type AgendaItems = Record<string, CustomAgendaItem[]>;

const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const [items, setItems] = useState<AgendaItems>({
    '2025-06-12': [
      {
        id: 'gas-analyzer',
        name: 'Gas Analyzer',
        details: ['✅ Sudah dibersihkan', '✅ Sudah melakukan pengecekan', 'fak'],
      },
      {
        id: 'panel-check',
        name: 'Panel Listrik',
        details: ['✅ Koneksi ground sudah oke, sudah dibersihkan'],
      },
    ],
  });

  const renderItem = (item: CustomAgendaItem, date: string | null) => {
    const itemKey = `${item.name}|${date}`;
    const isExpanded = expandedItem === itemKey;

    return (
      <View className="mb-2 rounded-xl border border-gray-200 bg-white">
        <TouchableOpacity
          className="rounded-t-xl bg-blue-100 p-4"
          onPress={() => setExpandedItem(isExpanded ? null : itemKey)}>
          <Text className="font-bold text-blue-800">{item.name}</Text>
        </TouchableOpacity>

        {isExpanded && (
          <View className="rounded-b-xl bg-gray-50 px-4 py-2">
            {item.details.map((detail, index) => (
              <Text key={index} className="mb-1 text-sm text-gray-700">
                {detail}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      {!selectedDate ? (
        // Tampilan awal: Kalender biasa
        <Calendar
          onDayPress={(day: { dateString: any }) => {
            const date = day.dateString;

            // Inisialisasi jika belum ada data
            if (!items[date]) {
              setItems((prev) => ({ ...prev, [date]: [] }));
            }

            setSelectedDate(date);
            setExpandedItem(null);
          }}
          markedDates={{
            ...Object.keys(items).reduce(
              (acc, date) => {
                acc[date] = { marked: true, dotColor: 'blue' };
                return acc;
              },
              {} as Record<string, any>
            ),
          }}
        />
      ) : (
        // Tampilan setelah klik tanggal: Agenda
        <>
          <Agenda
            items={items}
            selected={selectedDate}
            renderItem={(item: CustomAgendaItem) => renderItem(item, selectedDate)}
            renderEmptyDate={() => (
              <View className="p-4">
                <Text className="text-gray-400">Tidak ada agenda hari ini</Text>
              </View>
            )}
            onDayPress={(day: { dateString: any }) => {
              const date = day.dateString;
              if (!items[date]) {
                setItems((prev) => ({ ...prev, [date]: [] }));
              }
              setSelectedDate(date);
              setExpandedItem(null);
            }}
            theme={{
              agendaDayTextColor: 'black',
              agendaDayNumColor: 'black',
              agendaTodayColor: 'red',
              agendaKnobColor: '#2c3e50',
            }}
          />

          {/* Tombol kembali ke tampilan kalender */}
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
