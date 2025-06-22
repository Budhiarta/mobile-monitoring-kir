import { View } from 'react-native';
import SignatureInput from 'components/SignatureInput';

export default function MonitoringSignatureSection({ setSignature, setScrollEnabled }: any) {
  return (
    <View className="mb-4">
      <SignatureInput label="Paraf" onSigned={setSignature} onScrollToggle={setScrollEnabled} />
    </View>
  );
}
