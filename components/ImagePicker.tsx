import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type Props = {
  label?: string;
  onImageSelected?: (uri: string) => void;
};

export default function ImagePickerInput({ label = 'Dokumentasi', onImageSelected }: Props) {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const requestPermissions = async () => {
    const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
    const galleryPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!cameraPerm.granted || !galleryPerm.granted) {
      Alert.alert('Izin dibutuhkan', 'Aplikasi memerlukan akses kamera dan galeri.');
      return false;
    }

    return true;
  };

  const handlePickImage = async () => {
    const granted = await requestPermissions();
    if (!granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      if (onImageSelected) onImageSelected(uri);
    }
  };

  const handleTakePhoto = async () => {
    const granted = await requestPermissions();
    if (!granted) return;

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      if (onImageSelected) onImageSelected(uri);
    }
  };

  return (
    <View className="mb-4">
      <Text className="mb-1 text-sm text-gray-600">{label}</Text>

      <View className="flex-row space-x-2">
        <TouchableOpacity onPress={handlePickImage} className="flex-1">
          <View className="items-center rounded-lg border border-gray-300 bg-white px-3 py-2">
            <Text>Pilih dari Galeri</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleTakePhoto} className="flex-1">
          <View className="items-center rounded-lg border border-gray-300 bg-white px-3 py-2">
            <Text>Buka Kamera</Text>
          </View>
        </TouchableOpacity>
      </View>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: '100%', height: 200, marginTop: 10, borderRadius: 10 }}
          resizeMode="cover"
        />
      )}
    </View>
  );
}
