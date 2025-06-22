import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRef, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { useRouter } from 'expo-router';

const CreateMonitoring = () => {
  const router = useRouter();
  const [tester, setTester] = useState('');
  const [scrollEnabled, setScrollEnabled] = useState(true);
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
              Form Monitoring
            </Text>

            {/* TextInput */}
            <Text className="mb-1 text-sm text-gray-600">Nama Penguji</Text>
            <TextInput
              value={tester}
              onChangeText={setTester}
              placeholder="masukkan nama penguji"
              className="mb-4 rounded-lg border border-gray-300 px-3 py-2"
            />

            <Button
              title="Lanjut ke Task Checklist"
              onPress={() => router.push('components/MonitoringTypeSelector')}
            />
          </View>
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

export default CreateMonitoring;
