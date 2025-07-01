import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import WebView from 'react-native-webview';
import { FontAwesome } from '@expo/vector-icons';

export default function Guides(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showPdf, setShowPdf] = useState<boolean>(false);

  const pdfUrl = 'https://tan-jaymee-68.tiiny.site';

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-blue-600 p-4">
        <Text className="text-center text-xl font-bold text-white">Panduan Monitoring</Text>
      </View>

      {/* Error Message */}
      {error && (
        <View className="flex-1 items-center justify-center bg-red-100">
          <Text className="text-lg font-bold text-red-600">{error}</Text>
        </View>
      )}

      {/* Tombol hanya jika belum menampilkan PDF */}
      {!showPdf && (
        <View className="flex-1 items-center justify-center">
          <TouchableOpacity
            className="flex-row items-center rounded-lg bg-blue-500 px-4 py-2"
            onPress={() => setShowPdf(true)}>
            <FontAwesome name="file-pdf-o" size={20} color="white" />
            <Text className="ml-2 font-medium text-white">Lihat PDF</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* WebView untuk menampilkan PDF */}
      {showPdf && !error && (
        <>
          {isLoading && (
            <View className="absolute inset-0 z-10 items-center justify-center bg-white">
              <ActivityIndicator size="large" color="blue" />
              <Text className="mt-4 text-gray-500">Memuat PDF...</Text>
            </View>
          )}
          <WebView
            source={{ uri: pdfUrl }}
            style={{ flex: 1 }}
            startInLoadingState={true}
            onLoadEnd={() => setIsLoading(false)}
            onError={(syntheticEvent) => {
              console.log('WebView error:', syntheticEvent.nativeEvent);
              setError('Gagal memuat PDF');
            }}
          />
        </>
      )}
    </View>
  );
}
