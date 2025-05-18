import { View, Text, Button } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import { useRef } from 'react';

type Props = {
  label?: string;
  onSigned?: (base64: string) => void;
  onScrollToggle?: (enabled: boolean) => void;
};

export default function SignatureInput({ label, onSigned, onScrollToggle }: Props) {
  const ref = useRef<any>();

  const handleOK = (signature: string) => {
    onSigned?.(signature);
  };

  const handleClear = () => {
    ref.current?.clearSignature();
  };

  const handleUndo = () => {
    ref.current?.undoSignature();
  };

  return (
    <View className="mb-6">
      <Text className="mb-4 text-xl font-bold">{label}</Text>

      <View
        className="h-64 w-full overflow-hidden rounded-lg border-2 border-dashed border-gray-400 bg-white"
        pointerEvents="box-none">
        <SignatureScreen
          ref={ref}
          onOK={handleOK}
          autoClear={false}
          onBegin={() => onScrollToggle?.(false)}
          onEnd={() => onScrollToggle?.(true)}
          webStyle={`
            .m-signature-pad {
              box-shadow: none;
              border: none;
              margin: 0;
            }
            .m-signature-pad--body {
              border: none;
            }
            .m-signature-pad--footer {
              display: none;
            }
          `}
        />
      </View>

      <View className="mt-4 flex-row space-x-2">
        <Button title="Clear" onPress={handleClear} />
        <Button title="Undo" onPress={handleUndo} />
        <Button title="Simpan Paraf" onPress={() => ref.current.readSignature()} />
      </View>
    </View>
  );
}
