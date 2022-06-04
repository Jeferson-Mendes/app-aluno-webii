import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/login';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/index.routes';
import { AuthProvider } from './src/contexts/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  return (
    <NavigationContainer fallback={<Text>Loading...</Text>}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
