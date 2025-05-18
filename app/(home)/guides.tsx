import { View, Text, ActivityIndicator, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';

export default function Guides(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showPdf, setShowPdf] = useState<boolean>(false);

  const pdfUrl = 'https://www.pdf995.com/samples/pdf.pdf';
  const localPdfPath = FileSystem.documentDirectory + 'dummy.pdf';

  // Function to download PDF
  const downloadPdf = async () => {
    try {
      const fileUri = await FileSystem.downloadAsync(pdfUrl, localPdfPath);
      setError(null);
      alert('PDF berhasil di-download!');
    } catch (err) {
      console.log('Error downloading PDF:', err);
      setError('Gagal mendownload PDF');
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      {error && (
        <View className="flex-1 items-center justify-center bg-red-100">
          <Text className="text-lg font-bold text-red-600">{error}</Text>
        </View>
      )}

      <View className="mt-4 flex-1 items-center justify-center">
        <Button title="View PDF" onPress={() => setShowPdf(true)} />
        <Button title="Download PDF" onPress={downloadPdf} color="#007BFF" />
      </View>

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
