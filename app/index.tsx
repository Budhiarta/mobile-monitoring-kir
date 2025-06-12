import { Link } from 'expo-router';
import { View, Text, TextInput } from 'react-native';

export default function index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl text-red-600"> Hello </Text>

      <Link href="/(auth)">Login Page</Link>
      <Link href="/(auth)/signup">Regis Page</Link>
      <Link href="/(home)/testing">Testing</Link>
      <Link href="/(home)/guides">Pdf reader</Link>
      <Link href="/(home)/home">home</Link>
      <Link href="/(home)/device">alat uji</Link>
      <Link href="/(home)/dropdown">task dropdown</Link>
      <Link href="/(home)/calendar">calendar</Link>
    </View>
  );
}
