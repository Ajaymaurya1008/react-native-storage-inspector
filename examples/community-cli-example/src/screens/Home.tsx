import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import type { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Storage Inspector CLI Example</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Storage')}
      >
        <Text style={styles.buttonText}>Open Storage Inspector</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
