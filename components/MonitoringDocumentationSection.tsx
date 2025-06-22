import { View } from 'react-native';
import ImagePickerInput from 'components/ImagePicker';

export default function MonitoringDocumentationSection({
  imageUri,
  setImageUri,
}: {
  imageUri: string;
  setImageUri: (uri: string) => void;
}) {
  return (
    <View className="mb-4">
      <ImagePickerInput label="Dokumentasi" onImageSelected={setImageUri} />
    </View>
  );
}
